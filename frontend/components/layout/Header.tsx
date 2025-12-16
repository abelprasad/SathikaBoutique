'use client';

import Link from 'next/link';
import Image from 'next/image';
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
    <header className="bg-gradient-to-r from-ivory via-brand-champagne/20 to-ivory shadow-md sticky top-0 z-50 border-b-4 border-brand-gold">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="border-2 border-brand-gold rounded-full p-1">
              <Image
                src="/logo.png"
                alt="Sathika Boutique"
                width={50}
                height={50}
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-display font-bold text-brand-ruby hidden sm:block group-hover:text-brand-crimson transition-colors">
              Sathika Boutique
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/products"
              className="text-black font-semibold hover:text-brand-ruby transition-colors border-b-2 border-transparent hover:border-brand-gold pb-1"
            >
              Shop
            </Link>
            <Link
              href="/products?category=Clothing"
              className="text-black font-semibold hover:text-brand-ruby transition-colors border-b-2 border-transparent hover:border-brand-gold pb-1"
            >
              Clothing
            </Link>
            <Link
              href="/products?category=Accessories"
              className="text-black font-semibold hover:text-brand-ruby transition-colors border-b-2 border-transparent hover:border-brand-gold pb-1"
            >
              Accessories
            </Link>
            <Link
              href="/products?category=Handmade"
              className="text-black font-semibold hover:text-brand-ruby transition-colors border-b-2 border-transparent hover:border-brand-gold pb-1"
            >
              Handmade
            </Link>
            <Link
              href="/about"
              className="text-black font-semibold hover:text-brand-ruby transition-colors border-b-2 border-transparent hover:border-brand-gold pb-1"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-black font-semibold hover:text-brand-ruby transition-colors border-b-2 border-transparent hover:border-brand-gold pb-1"
            >
              Contact
            </Link>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative group">
              <div className="p-2 rounded-full border-2 border-transparent group-hover:border-brand-gold transition-all">
                <ShoppingCart className="h-6 w-6 text-brand-ruby group-hover:text-brand-crimson transition-colors" />
              </div>
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-brand-ruby text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow-md">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border-2 border-brand-gold hover:bg-brand-gold/20 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-brand-ruby" />
              ) : (
                <Menu className="h-6 w-6 text-brand-ruby" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t-2 border-brand-gold bg-white/80">
            <div className="flex flex-col space-y-3">
              <Link
                href="/products"
                className="text-black font-semibold hover:text-brand-ruby hover:bg-brand-gold/10 transition-colors py-2 px-3 rounded-lg border-l-4 border-transparent hover:border-brand-ruby"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/products?category=Clothing"
                className="text-black font-semibold hover:text-brand-ruby hover:bg-brand-gold/10 transition-colors py-2 px-3 rounded-lg border-l-4 border-transparent hover:border-brand-ruby"
                onClick={() => setMobileMenuOpen(false)}
              >
                Clothing
              </Link>
              <Link
                href="/products?category=Accessories"
                className="text-black font-semibold hover:text-brand-ruby hover:bg-brand-gold/10 transition-colors py-2 px-3 rounded-lg border-l-4 border-transparent hover:border-brand-ruby"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accessories
              </Link>
              <Link
                href="/products?category=Handmade"
                className="text-black font-semibold hover:text-brand-ruby hover:bg-brand-gold/10 transition-colors py-2 px-3 rounded-lg border-l-4 border-transparent hover:border-brand-ruby"
                onClick={() => setMobileMenuOpen(false)}
              >
                Handmade
              </Link>
              <Link
                href="/about"
                className="text-black font-semibold hover:text-brand-ruby hover:bg-brand-gold/10 transition-colors py-2 px-3 rounded-lg border-l-4 border-transparent hover:border-brand-ruby"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-black font-semibold hover:text-brand-ruby hover:bg-brand-gold/10 transition-colors py-2 px-3 rounded-lg border-l-4 border-transparent hover:border-brand-ruby"
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
