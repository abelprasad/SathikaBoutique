import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { cartApi } from '@/lib/api';
import { toast } from '@/store/toastStore';
import type { Cart, CartItem } from '@/types/cart';
import type { Product, ProductVariant } from '@/types/product';

// Retry logic with exponential backoff
const retryWithBackoff = async <T,>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  baseDelay = 1000
): Promise<T> => {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxAttempts - 1) {
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
};

interface CartStore {
  sessionId: string;
  items: CartItem[];
  loading: boolean;

  // Actions
  initializeCart: () => Promise<void>;
  addItem: (product: Product, variant: ProductVariant, quantity: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getItemCount: () => number;
  getSubtotal: () => number;
}

// Generate or retrieve session ID
const getSessionId = (): string => {
  if (typeof window === 'undefined') return '';

  let sessionId = localStorage.getItem('cart_session_id');
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('cart_session_id', sessionId);
  }
  return sessionId;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      sessionId: '',
      items: [],
      loading: false,

      initializeCart: async () => {
        const sessionId = getSessionId();
        set({ sessionId, loading: true });

        try {
          const response = await retryWithBackoff(() => cartApi.get(sessionId));
          set({ items: response.data.items, loading: false });
        } catch (error) {
          console.error('Failed to initialize cart:', error);
          toast.error('Unable to load cart. Please refresh the page.');
          set({ loading: false });
        }
      },

      addItem: async (product: Product, variant: ProductVariant, quantity: number) => {
        const { sessionId } = get();
        if (!sessionId) {
          await get().initializeCart();
          return get().addItem(product, variant, quantity);
        }

        set({ loading: true });

        try {
          const response = await retryWithBackoff(() =>
            cartApi.addItem(sessionId, {
              productId: product._id,
              variantId: variant._id,
              quantity,
            })
          );
          set({ items: response.data.items, loading: false });
          toast.success('Item added to cart!');
        } catch (error: any) {
          console.error('Failed to add item to cart:', error);
          const errorMessage = error?.response?.data?.message || 'Failed to add item to cart';
          toast.error(errorMessage);
          set({ loading: false });
          throw error;
        }
      },

      updateQuantity: async (itemId: string, quantity: number) => {
        const { sessionId, items } = get();
        if (!sessionId) return;

        // Store previous state for rollback
        const previousItems = [...items];

        // Optimistic update
        const optimisticItems = items.map(item =>
          item._id === itemId ? { ...item, quantity } : item
        );
        set({ items: optimisticItems, loading: false });

        try {
          const response = await retryWithBackoff(() =>
            cartApi.updateItem(sessionId, itemId, quantity)
          );
          set({ items: response.data.items, loading: false });
        } catch (error: any) {
          console.error('Failed to update quantity:', error);
          // Rollback on failure
          set({ items: previousItems, loading: false });
          const errorMessage = error?.response?.data?.message || 'Failed to update quantity';
          toast.error(errorMessage);
          throw error;
        }
      },

      removeItem: async (itemId: string) => {
        const { sessionId, items } = get();
        if (!sessionId) return;

        // Store previous state for rollback
        const previousItems = [...items];

        // Optimistic update
        const optimisticItems = items.filter(item => item._id !== itemId);
        set({ items: optimisticItems, loading: false });

        try {
          const response = await retryWithBackoff(() =>
            cartApi.removeItem(sessionId, itemId)
          );
          set({ items: response.data.items, loading: false });
          toast.success('Item removed from cart');
        } catch (error: any) {
          console.error('Failed to remove item:', error);
          // Rollback on failure
          set({ items: previousItems, loading: false });
          const errorMessage = error?.response?.data?.message || 'Failed to remove item';
          toast.error(errorMessage);
          throw error;
        }
      },

      clearCart: async () => {
        const { sessionId, items } = get();
        if (!sessionId) return;

        // Store previous state for rollback
        const previousItems = [...items];

        // Optimistic update
        set({ items: [], loading: false });

        try {
          await retryWithBackoff(() => cartApi.clear(sessionId));
          toast.success('Cart cleared');
        } catch (error: any) {
          console.error('Failed to clear cart:', error);
          // Rollback on failure
          set({ items: previousItems, loading: false });
          const errorMessage = error?.response?.data?.message || 'Failed to clear cart';
          toast.error(errorMessage);
          throw error;
        }
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          // Handle both populated and non-populated product data
          const product = item.productId as any;
          if (product && product.variants) {
            const variant = product.variants.find((v: any) => v._id === item.variantId);
            if (variant) {
              return total + variant.price * item.quantity;
            }
          }
          return total;
        }, 0);
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        sessionId: state.sessionId,
        items: state.items
      }),
    }
  )
);
