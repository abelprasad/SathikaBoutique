'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { Button, Input, Spinner } from '@/components/ui';
import { CreditCard, Lock, ShoppingBag, CheckCircle, MapPin, Mail, User, Phone } from 'lucide-react';

interface ShippingInfo {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

interface PaymentInfo {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getItemCount, clearCart } = useCartStore();
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [loading, setLoading] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);

  const subtotal = getSubtotal();
  const shippingCost = shippingMethod === 'standard' ? 10 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('review');
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Here you would integrate with your backend API to process the order
    // For now, we'll just clear the cart and redirect to a success page
    clearCart();
    router.push('/order-confirmation');
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-ivory via-white to-ivory py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-display font-bold mb-4" style={{ color: '#8B1E2D' }}>
            Secure Checkout
          </h1>
          <div className="flex items-center justify-center gap-2 text-charcoal/70">
            <Lock className="h-5 w-5" style={{ color: '#C9A24D' }} />
            <span className="text-sm font-medium">SSL Encrypted • Secure Payment</span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A24D]/20 to-[#C9A24D]/20 -z-10"></div>
            {['shipping', 'payment', 'review'].map((s, index) => {
              const isActive = step === s;
              const isCompleted = (step === 'payment' && s === 'shipping') || (step === 'review' && s !== 'review');
              return (
                <div key={s} className="flex flex-col items-center relative">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                      isCompleted
                        ? 'bg-gradient-to-br from-[#8B1E2D] to-[#B23A48] text-white shadow-lg'
                        : isActive
                        ? 'bg-gradient-to-br from-[#C9A24D] to-[#E6D3A3] text-white shadow-lg scale-110'
                        : 'bg-white border-2 border-[#C9A24D]/30 text-charcoal/50'
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="h-5 w-5" /> : index + 1}
                  </div>
                  <span className={`text-xs mt-2 font-medium uppercase tracking-wider ${
                    isActive ? 'text-[#8B1E2D]' : 'text-charcoal/50'
                  }`}>
                    {s}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Shipping Information */}
            {step === 'shipping' && (
              <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-8 border border-[#C9A24D]/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B1E2D] to-[#B23A48] flex items-center justify-center shadow-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-display font-bold" style={{ color: '#8B1E2D' }}>
                    Shipping Information
                  </h2>
                </div>

                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">Email Address</label>
                    <Input
                      type="email"
                      required
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-2">First Name</label>
                      <Input
                        type="text"
                        required
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-2">Last Name</label>
                      <Input
                        type="text"
                        required
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">Address</label>
                    <Input
                      type="text"
                      required
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-2">City</label>
                      <Input
                        type="text"
                        required
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-2">State</label>
                      <Input
                        type="text"
                        required
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                        placeholder="NY"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-2">ZIP Code</label>
                      <Input
                        type="text"
                        required
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                        placeholder="10001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-2">Phone</label>
                      <Input
                        type="tel"
                        required
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Shipping Method */}
                  <div className="pt-6 border-t border-[#C9A24D]/20">
                    <h3 className="text-lg font-bold text-charcoal mb-4">Shipping Method</h3>
                    <div className="space-y-3">
                      <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        shippingMethod === 'standard'
                          ? 'border-[#8B1E2D] bg-[#8B1E2D]/5'
                          : 'border-[#C9A24D]/30 hover:border-[#C9A24D]'
                      }`}>
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shipping"
                            value="standard"
                            checked={shippingMethod === 'standard'}
                            onChange={(e) => setShippingMethod(e.target.value as 'standard')}
                            className="w-5 h-5"
                          />
                          <div>
                            <div className="font-semibold text-charcoal">Standard Shipping</div>
                            <div className="text-sm text-charcoal/70">3-5 business days</div>
                          </div>
                        </div>
                        <span className="font-bold" style={{ color: '#8B1E2D' }}>$10.00</span>
                      </label>

                      <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        shippingMethod === 'express'
                          ? 'border-[#8B1E2D] bg-[#8B1E2D]/5'
                          : 'border-[#C9A24D]/30 hover:border-[#C9A24D]'
                      }`}>
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shipping"
                            value="express"
                            checked={shippingMethod === 'express'}
                            onChange={(e) => setShippingMethod(e.target.value as 'express')}
                            className="w-5 h-5"
                          />
                          <div>
                            <div className="font-semibold text-charcoal">Express Shipping</div>
                            <div className="text-sm text-charcoal/70">1-2 business days</div>
                          </div>
                        </div>
                        <span className="font-bold" style={{ color: '#8B1E2D' }}>$25.00</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-[#8B1E2D] to-[#B23A48] text-white text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {/* Payment Information */}
            {step === 'payment' && (
              <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-8 border border-[#C9A24D]/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B1E2D] to-[#B23A48] flex items-center justify-center shadow-lg">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-display font-bold" style={{ color: '#8B1E2D' }}>
                    Payment Information
                  </h2>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">Card Number</label>
                    <Input
                      type="text"
                      required
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">Cardholder Name</label>
                    <Input
                      type="text"
                      required
                      value={paymentInfo.cardName}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-2">Expiry Date</label>
                      <Input
                        type="text"
                        required
                        value={paymentInfo.expiryDate}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-2">CVV</label>
                      <Input
                        type="text"
                        required
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep('shipping')}
                      className="flex-1 py-4 bg-white border-2 border-[#C9A24D] text-[#8B1E2D] text-lg font-bold rounded-xl hover:bg-[#C9A24D]/10 transition-all"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-4 bg-gradient-to-r from-[#8B1E2D] to-[#B23A48] text-white text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                      Review Order
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Order Review */}
            {step === 'review' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-8 border border-[#C9A24D]/20">
                  <h2 className="text-2xl font-display font-bold mb-6" style={{ color: '#8B1E2D' }}>
                    Review Your Order
                  </h2>

                  {/* Shipping Info Review */}
                  <div className="mb-6 pb-6 border-b border-[#C9A24D]/20">
                    <h3 className="font-bold text-charcoal mb-3">Shipping Address</h3>
                    <p className="text-charcoal/70">
                      {shippingInfo.firstName} {shippingInfo.lastName}<br />
                      {shippingInfo.address}<br />
                      {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}<br />
                      {shippingInfo.phone}<br />
                      {shippingInfo.email}
                    </p>
                    <button
                      onClick={() => setStep('shipping')}
                      className="text-[#8B1E2D] text-sm font-semibold mt-2 hover:underline"
                    >
                      Edit
                    </button>
                  </div>

                  {/* Payment Info Review */}
                  <div className="mb-6">
                    <h3 className="font-bold text-charcoal mb-3">Payment Method</h3>
                    <p className="text-charcoal/70">
                      Card ending in {paymentInfo.cardNumber.slice(-4)}<br />
                      {paymentInfo.cardName}
                    </p>
                    <button
                      onClick={() => setStep('payment')}
                      className="text-[#8B1E2D] text-sm font-semibold mt-2 hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full py-5 bg-gradient-to-r from-[#8B1E2D] to-[#B23A48] text-white text-xl font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="h-6 w-6" />
                      Place Order - {formatPrice(total)}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-6 border border-[#C9A24D]/20 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <ShoppingBag className="h-6 w-6" style={{ color: '#8B1E2D' }} />
                <h2 className="text-xl font-display font-bold" style={{ color: '#8B1E2D' }}>
                  Order Summary
                </h2>
              </div>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                {items.map((item) => {
                  const product = item.productId as any;
                  const variant = product?.variants?.find((v: any) => v._id === item.variantId);
                  const primaryImage = product?.images?.find((img: any) => img.isPrimary) || product?.images?.[0];

                  return (
                    <div key={item._id} className="flex gap-3">
                      <div className="w-16 h-16 bg-ivory rounded-lg overflow-hidden flex-shrink-0">
                        {primaryImage && (
                          <img
                            src={primaryImage.url}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-charcoal truncate">{product?.name}</h4>
                        <p className="text-xs text-charcoal/70">
                          {variant?.size && `Size: ${variant.size}`}
                          {variant?.size && variant?.color && ' • '}
                          {variant?.color && `${variant.color}`}
                        </p>
                        <p className="text-sm font-semibold mt-1" style={{ color: '#8B1E2D' }}>
                          {formatPrice(variant?.price || 0)} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pricing Summary */}
              <div className="space-y-3 pt-6 border-t border-[#C9A24D]/20">
                <div className="flex justify-between text-charcoal/70">
                  <span>Subtotal ({getItemCount()} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-charcoal/70">
                  <span>Shipping</span>
                  <span>{formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-charcoal/70">
                  <span>Tax (8%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-3 border-t border-[#C9A24D]/20">
                  <span className="text-charcoal">Total</span>
                  <span style={{ color: '#8B1E2D' }}>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-[#C9A24D]/20">
                <div className="flex items-center justify-center gap-2 text-xs text-charcoal/70 mb-2">
                  <Lock className="h-4 w-4" style={{ color: '#C9A24D' }} />
                  <span>Secure SSL Encryption</span>
                </div>
                <div className="flex justify-center gap-4 text-xs text-charcoal/50">
                  <span>🔒 Safe</span>
                  <span>📦 Insured</span>
                  <span>↩️ Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
