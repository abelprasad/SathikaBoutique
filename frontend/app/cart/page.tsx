'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { Button, Spinner } from '@/components/ui';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const { items, loading, initializeCart, updateQuantity, removeItem, clearCart, getItemCount, getSubtotal } = useCartStore();

  useEffect(() => {
    initializeCart();
  }, []);

  const handleUpdateQuantity = async (itemId: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;

    try {
      await updateQuantity(itemId, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeItem(itemId);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const handleClearCart = async () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      try {
        await clearCart();
      } catch (error) {
        console.error('Failed to clear cart:', error);
      }
    }
  };

  if (loading && items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <Button onClick={() => router.push('/products')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const estimatedShipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const estimatedTax = subtotal * 0.08; // 8% tax estimate
  const total = subtotal + estimatedShipping + estimatedTax;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {getItemCount()} {getItemCount() === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const product = item.productId as any;
              const variant = product?.variants?.find((v: any) => v._id === item.variantId);

              if (!product || !variant) return null;

              return (
                <div key={item._id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-gray-400 text-center px-2">
                          {product.name}
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <Link
                            href={`/products/${product.slug}`}
                            className="font-medium text-gray-900 hover:text-pink-600"
                          >
                            {product.name}
                          </Link>
                          <p className="text-sm text-gray-600 mt-1">
                            {variant.size && <span>Size: {variant.size}</span>}
                            {variant.size && variant.color && <span> • </span>}
                            {variant.color && <span>Color: {variant.color}</span>}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            SKU: {variant.sku}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {formatPrice(variant.price)}
                          </p>
                          {variant.compareAtPrice && (
                            <p className="text-sm text-gray-500 line-through">
                              {formatPrice(variant.compareAtPrice)}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleUpdateQuantity(item._id, item.quantity, -1)}
                            disabled={loading || item.quantity <= 1}
                            className="p-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-gray-900 font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item._id, item.quantity, 1)}
                            disabled={loading || item.quantity >= variant.stock}
                            className="p-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                          {variant.stock < 5 && (
                            <span className="text-sm text-orange-600 ml-2">
                              Only {variant.stock} left
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => handleRemoveItem(item._id)}
                          disabled={loading}
                          className="text-red-600 hover:text-red-700 disabled:opacity-50"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Clear Cart */}
            <div className="flex justify-end">
              <Button
                variant="ghost"
                onClick={handleClearCart}
                disabled={loading}
              >
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>
                    {estimatedShipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      formatPrice(estimatedShipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Estimated Tax</span>
                  <span>{formatPrice(estimatedTax)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {subtotal < 100 && (
                <p className="text-sm text-gray-600 mb-4">
                  Add {formatPrice(100 - subtotal)} more for free shipping!
                </p>
              )}

              <Button
                onClick={() => router.push('/checkout')}
                className="w-full mb-3"
                size="lg"
              >
                Proceed to Checkout
              </Button>

              <Button
                variant="secondary"
                onClick={() => router.push('/products')}
                className="w-full"
              >
                Continue Shopping
              </Button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-xs text-gray-600 text-center mb-3">
                  Secure checkout powered by Stripe
                </p>
                <div className="flex justify-center gap-4 text-gray-400">
                  <span className="text-xs">🔒 Secure</span>
                  <span className="text-xs">📦 Free Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
