'use client';

import Link from 'next/link';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';

export default function OrderConfirmationPage() {
  // In a real app, you'd get the order details from the URL params or API
  const orderNumber = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-ivory via-white to-ivory py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Icon */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#8B1E2D] to-[#B23A48] shadow-2xl mb-6 animate-bounce">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-display font-bold mb-4" style={{ color: '#8B1E2D' }}>
            Order Confirmed!
          </h1>
          <p className="text-xl text-charcoal/70 font-light">
            Thank you for your purchase
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-8 border border-[#C9A24D]/20 mb-8">
          <div className="text-center mb-8 pb-8 border-b border-[#C9A24D]/20">
            <p className="text-sm text-charcoal/70 mb-2">Order Number</p>
            <p className="text-3xl font-display font-bold" style={{ color: '#8B1E2D' }}>
              {orderNumber}
            </p>
          </div>

          {/* Order Status */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A24D] to-[#E6D3A3] flex items-center justify-center flex-shrink-0 shadow-lg">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-charcoal mb-1">Confirmation Email Sent</h3>
                <p className="text-sm text-charcoal/70">
                  We've sent a confirmation email with your order details and tracking information.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B1E2D] to-[#B23A48] flex items-center justify-center flex-shrink-0 shadow-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-charcoal mb-1">Processing Your Order</h3>
                <p className="text-sm text-charcoal/70">
                  Your order is being prepared for shipment. You'll receive tracking information within 24-48 hours.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-gradient-to-br from-[#8B1E2D]/5 to-[#C9A24D]/5 rounded-2xl p-8 mb-8 border border-[#C9A24D]/20">
          <h2 className="text-2xl font-display font-bold mb-4" style={{ color: '#8B1E2D' }}>
            What Happens Next?
          </h2>
          <ul className="space-y-3 text-charcoal/70">
            <li className="flex items-start gap-3">
              <span className="font-bold" style={{ color: '#8B1E2D' }}>1.</span>
              <span>You'll receive an order confirmation email shortly</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold" style={{ color: '#8B1E2D' }}>2.</span>
              <span>Your order will be carefully prepared and quality checked</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold" style={{ color: '#8B1E2D' }}>3.</span>
              <span>You'll receive a shipping confirmation with tracking details</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold" style={{ color: '#8B1E2D' }}>4.</span>
              <span>Your order will arrive within 3-5 business days (standard shipping)</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/products" className="flex-1">
            <button className="w-full py-4 bg-gradient-to-r from-[#8B1E2D] to-[#B23A48] text-white text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
              Continue Shopping
              <ArrowRight className="h-5 w-5" />
            </button>
          </Link>
          <Link href="/" className="flex-1">
            <button className="w-full py-4 bg-white border-2 border-[#C9A24D] text-[#8B1E2D] text-lg font-bold rounded-xl hover:bg-[#C9A24D]/10 transition-all">
              Back to Home
            </button>
          </Link>
        </div>

        {/* Help Section */}
        <div className="text-center mt-12 pt-8 border-t border-[#C9A24D]/20">
          <p className="text-sm text-charcoal/70 mb-2">
            Need help with your order?
          </p>
          <Link href="/contact" className="text-[#8B1E2D] font-semibold hover:underline">
            Contact our support team
          </Link>
        </div>
      </div>
    </div>
  );
}
