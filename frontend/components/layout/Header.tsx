'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import { useCartStore } from '@/store/cartStore';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { initializeCart, getItemCount } = useCartStore();
  const cartItemCount = getItemCount();

  useEffect(() => {
    initializeCart();
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-display font-bold text-pink-600">
              Sathika Boutique
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/products"
              className="text-gray-700 hover:text-pink-600 transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/products?category=Clothing"
              className="text-gray-700 hover:text-pink-600 transition-colors"
            >
              Clothing
            </Link>
            <Link
              href="/products?category=Accessories"
              className="text-gray-700 hover:text-pink-600 transition-colors"
            >
              Accessories
            </Link>
            <Link
              href="/products?category=Handmade"
              className="text-gray-700 hover:text-pink-600 transition-colors"
            >
              Handmade
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-pink-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-pink-600 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-pink-600 transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link
                href="/products"
                className="text-gray-700 hover:text-pink-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/products?category=Clothing"
                className="text-gray-700 hover:text-pink-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Clothing
              </Link>
              <Link
                href="/products?category=Accessories"
                className="text-gray-700 hover:text-pink-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accessories
              </Link>
              <Link
                href="/products?category=Handmade"
                className="text-gray-700 hover:text-pink-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Handmade
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-pink-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-pink-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
