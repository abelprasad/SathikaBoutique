import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { cartApi } from '@/lib/api';
import type { Cart, CartItem } from '@/types/cart';
import type { Product, ProductVariant } from '@/types/product';

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
          const response = await cartApi.get(sessionId);
          set({ items: response.data.items, loading: false });
        } catch (error) {
          console.error('Failed to initialize cart:', error);
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
          const response = await cartApi.addItem(sessionId, {
            productId: product._id,
            variantId: variant._id,
            quantity,
          });
          set({ items: response.data.items, loading: false });
        } catch (error) {
          console.error('Failed to add item to cart:', error);
          set({ loading: false });
          throw error;
        }
      },

      updateQuantity: async (itemId: string, quantity: number) => {
        const { sessionId } = get();
        if (!sessionId) return;

        set({ loading: true });

        try {
          const response = await cartApi.updateItem(sessionId, itemId, quantity);
          set({ items: response.data.items, loading: false });
        } catch (error) {
          console.error('Failed to update quantity:', error);
          set({ loading: false });
          throw error;
        }
      },

      removeItem: async (itemId: string) => {
        const { sessionId } = get();
        if (!sessionId) return;

        set({ loading: true });

        try {
          const response = await cartApi.removeItem(sessionId, itemId);
          set({ items: response.data.items, loading: false });
        } catch (error) {
          console.error('Failed to remove item:', error);
          set({ loading: false });
          throw error;
        }
      },

      clearCart: async () => {
        const { sessionId } = get();
        if (!sessionId) return;

        set({ loading: true });

        try {
          await cartApi.clear(sessionId);
          set({ items: [], loading: false });
        } catch (error) {
          console.error('Failed to clear cart:', error);
          set({ loading: false });
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
