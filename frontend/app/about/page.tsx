import Link from 'next/link';
import { Button } from '@/components/ui';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
            About Sathika Boutique
          </h1>
          <p className="text-xl text-gray-600">
            Where elegance meets craftsmanship
          </p>
        </div>

        {/* Story Section */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="mb-8">
            <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
              Our Story
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Founded with a passion for unique, handcrafted fashion, Sathika Boutique brings together
              carefully curated pieces that tell a story. Each item in our collection is selected with
              attention to quality, style, and sustainability.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We believe that fashion should be both beautiful and meaningful. That's why we work
              closely with talented artisans and designers to offer you pieces that are as unique
              as you are.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Quality First</h3>
                <p className="text-gray-700 text-sm">
                  Every piece is carefully selected and inspected to ensure the highest quality standards.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Sustainable Fashion</h3>
                <p className="text-gray-700 text-sm">
                  We prioritize eco-friendly materials and ethical production practices.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Artisan Support</h3>
                <p className="text-gray-700 text-sm">
                  We partner with local artisans, supporting their craft and communities.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
              What We Offer
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-pink-600 mr-2">✓</span>
                <span>Curated collection of clothing, accessories, and handmade items</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 mr-2">✓</span>
                <span>Unique pieces you won't find in mainstream stores</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 mr-2">✓</span>
                <span>Quality craftsmanship with attention to detail</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 mr-2">✓</span>
                <span>Secure online shopping with fast shipping</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 mr-2">✓</span>
                <span>Excellent customer service and easy returns</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-pink-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
            Ready to Explore Our Collection?
          </h2>
          <p className="text-gray-700 mb-6">
            Discover unique pieces that reflect your personal style
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg">
                Shop Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
