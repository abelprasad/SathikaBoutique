import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-display font-bold text-primary-400 mb-4">
              Sathika Boutique
            </h3>
            <p className="text-secondary-300 text-sm">
              Premium clothing, accessories, and handmade items crafted with care.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=Clothing" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  Clothing
                </Link>
              </li>
              <li>
                <Link href="/products?category=Accessories" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/products?category=Handmade" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  Handmade
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-white mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:info@sathikaboutique.com" className="text-secondary-300 hover:text-primary-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-secondary-300 hover:text-primary-400 transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-700 mt-8 pt-8 text-center">
          <p className="text-secondary-400 text-sm">
            © {currentYear} Sathika Boutique. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
