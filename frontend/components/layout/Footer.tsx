import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-white via-brand-champagne/10 to-brand-gold/10 border-t-4 border-brand-gold shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="border-2 border-brand-gold rounded-full p-1">
                <Image
                  src="/logo.png"
                  alt="Sathika Boutique"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-display font-bold text-brand-ruby">
                Sathika Boutique
              </h3>
            </div>
            <p className="text-black text-sm font-medium">
              Premium clothing, accessories, and handmade items crafted with care.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-bold text-brand-ruby mb-4 text-lg">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-black hover:text-brand-ruby transition-colors text-sm font-medium">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=Clothing" className="text-black hover:text-brand-ruby transition-colors text-sm font-medium">
                  Clothing
                </Link>
              </li>
              <li>
                <Link href="/products?category=Accessories" className="text-black hover:text-brand-ruby transition-colors text-sm font-medium">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/products?category=Handmade" className="text-black hover:text-brand-ruby transition-colors text-sm font-medium">
                  Handmade
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-brand-ruby mb-4 text-lg">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-black hover:text-brand-ruby transition-colors text-sm font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-black hover:text-brand-ruby transition-colors text-sm font-medium">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-black hover:text-brand-ruby transition-colors text-sm font-medium">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-black hover:text-brand-ruby transition-colors text-sm font-medium">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-black hover:text-brand-ruby transition-colors text-sm font-medium">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="font-bold text-brand-ruby mb-4 text-lg">Connect</h4>
            <div className="flex space-x-3 mb-4">
              <a href="#" className="p-2 rounded-full bg-white border-2 border-brand-gold hover:bg-brand-gold hover:border-brand-ruby transition-all">
                <Facebook className="h-5 w-5 text-brand-ruby" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white border-2 border-brand-gold hover:bg-brand-gold hover:border-brand-ruby transition-all">
                <Instagram className="h-5 w-5 text-brand-ruby" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white border-2 border-brand-gold hover:bg-brand-gold hover:border-brand-ruby transition-all">
                <Twitter className="h-5 w-5 text-brand-ruby" />
              </a>
              <a href="mailto:info@sathikaboutique.com" className="p-2 rounded-full bg-white border-2 border-brand-gold hover:bg-brand-gold hover:border-brand-ruby transition-all">
                <Mail className="h-5 w-5 text-brand-ruby" />
              </a>
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-black hover:text-brand-ruby transition-colors text-sm font-medium">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-black hover:text-brand-ruby transition-colors text-sm font-medium">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-brand-gold mt-8 pt-8 text-center">
          <p className="text-black text-sm font-semibold">
            © {currentYear} Sathika Boutique. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
