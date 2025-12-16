import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { ArrowRight, ShoppingBag, Sparkles, Heart } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-ruby/5 via-brand-gold/10 to-brand-champagne/20 overflow-hidden border-b-4 border-brand-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px] lg:min-h-[700px] py-12 lg:py-0">
            {/* Text Content */}
            <div className="space-y-8 lg:pr-8 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/20 rounded-full border-2 border-brand-gold shadow-md">
                <Sparkles className="h-5 w-5 text-brand-ruby" />
                <span className="text-sm font-semibold text-brand-ruby">Premium Fashion & Accessories</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-black leading-tight">
                Discover Timeless
                <span className="block text-brand-ruby mt-2">Elegance</span>
              </h1>

              <p className="text-xl md:text-2xl text-black leading-relaxed">
                Curated collection of premium clothing, exquisite accessories, and handmade treasures
                crafted with care and attention to detail.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/products">
                  <Button size="lg" className="group w-full sm:w-auto">
                    Shop Collection
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Learn Our Story
                  </Button>
                </Link>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-brand-champagne/30">
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-display font-bold text-brand-ruby">500+</div>
                  <div className="text-sm text-black font-medium">Premium Items</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-display font-bold text-brand-ruby">100%</div>
                  <div className="text-sm text-black font-medium">Authentic</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-display font-bold text-brand-ruby">24/7</div>
                  <div className="text-sm text-black font-medium">Support</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative order-1 lg:order-2">
              <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-brand-gold">
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ruby/30 via-transparent to-brand-gold/10 z-10"></div>
                <Image
                  src="/hero.png"
                  alt="Elegant Saree Collection - Sathika Boutique"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-brand-gold/40 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-brand-ruby/30 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-black mb-4">
              Explore Our Collections
            </h2>
            <p className="text-lg text-black font-medium">
              Each piece tells a story of craftsmanship and elegance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Clothing Category */}
            <Link href="/products?category=Clothing" className="group">
              <div className="relative overflow-hidden rounded-lg border-4 border-brand-gold hover:border-brand-ruby transition-all duration-300 bg-white shadow-lg hover:shadow-2xl">
                <div className="aspect-square bg-gradient-to-br from-brand-ruby/20 via-brand-gold/15 to-brand-champagne/20 flex items-center justify-center border-b-4 border-brand-gold">
                  <div className="w-32 h-32 rounded-full bg-brand-ruby shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ShoppingBag className="h-16 w-16 text-white" />
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-2xl font-display font-bold text-brand-ruby mb-2">
                    Clothing
                  </h3>
                  <p className="text-charcoal mb-4">
                    Elegant dresses, sarees, and fashion pieces
                  </p>
                  <span className="text-brand-ruby font-bold group-hover:underline inline-flex items-center text-lg">
                    Shop Now <ArrowRight className="ml-1 h-5 w-5" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Accessories Category */}
            <Link href="/products?category=Accessories" className="group">
              <div className="relative overflow-hidden rounded-lg border-4 border-brand-gold hover:border-brand-ruby transition-all duration-300 bg-white shadow-lg hover:shadow-2xl">
                <div className="aspect-square bg-gradient-to-br from-brand-gold/25 via-brand-ruby/10 to-brand-champagne/20 flex items-center justify-center border-b-4 border-brand-gold">
                  <div className="w-32 h-32 rounded-full bg-brand-gold shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Sparkles className="h-16 w-16 text-white" />
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-2xl font-display font-bold text-brand-gold mb-2">
                    Accessories
                  </h3>
                  <p className="text-charcoal mb-4">
                    Jewelry, bags, and finishing touches
                  </p>
                  <span className="text-brand-ruby font-bold group-hover:underline inline-flex items-center text-lg">
                    Shop Now <ArrowRight className="ml-1 h-5 w-5" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Handmade Category */}
            <Link href="/products?category=Handmade" className="group">
              <div className="relative overflow-hidden rounded-lg border-4 border-brand-gold hover:border-brand-ruby transition-all duration-300 bg-white shadow-lg hover:shadow-2xl">
                <div className="aspect-square bg-gradient-to-br from-brand-ruby/20 via-brand-gold/15 to-brand-champagne/20 flex items-center justify-center border-b-4 border-brand-gold">
                  <div className="w-32 h-32 rounded-full bg-brand-crimson shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Heart className="h-16 w-16 text-white" />
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-2xl font-display font-bold text-brand-ruby mb-2">
                    Handmade
                  </h3>
                  <p className="text-charcoal mb-4">
                    Unique, artisan-crafted treasures
                  </p>
                  <span className="text-brand-ruby font-bold group-hover:underline inline-flex items-center text-lg">
                    Shop Now <ArrowRight className="ml-1 h-5 w-5" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-brand-ruby/5 to-brand-gold/5 border-y-4 border-brand-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h2 className="text-4xl font-display font-bold text-brand-ruby">
              Why Choose Sathika Boutique
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="space-y-3 bg-white p-6 rounded-xl border-4 border-brand-gold shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-brand-ruby to-brand-crimson rounded-full flex items-center justify-center mx-auto shadow-xl">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold text-brand-ruby">Premium Quality</h3>
                <p className="text-charcoal font-medium">
                  Every piece is carefully selected for exceptional quality and craftsmanship
                </p>
              </div>
              <div className="space-y-3 bg-white p-6 rounded-xl border-4 border-brand-gold shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-brand-gold to-brand-champagne rounded-full flex items-center justify-center mx-auto shadow-xl">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold text-brand-gold">Handcrafted with Love</h3>
                <p className="text-charcoal font-medium">
                  Supporting artisans and celebrating traditional craftsmanship
                </p>
              </div>
              <div className="space-y-3 bg-white p-6 rounded-xl border-4 border-brand-gold shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-brand-ruby to-brand-crimson rounded-full flex items-center justify-center mx-auto shadow-xl">
                  <ShoppingBag className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold text-brand-ruby">Curated Collection</h3>
                <p className="text-charcoal font-medium">
                  Thoughtfully curated pieces that blend elegance with modern style
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-4xl font-display font-bold text-black">
            Ready to Discover Your Style?
          </h2>
          <p className="text-xl text-black font-medium">
            Browse our complete collection and find pieces that speak to your unique elegance
          </p>
          <Link href="/products">
            <Button size="lg" className="group">
              Explore All Products
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
