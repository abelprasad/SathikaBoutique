import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { ArrowRight, ShoppingBag, Sparkles, Heart } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-ivory via-brand-champagne/30 to-brand-gold/20 overflow-hidden border-b border-brand-gold/30 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-gold/10 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[700px] lg:min-h-[800px] py-16 lg:py-24">
            {/* Text Content */}
            <div className="space-y-10 lg:pr-12 order-2 lg:order-1">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-brand-gold/40">
                <Sparkles className="h-5 w-5" style={{ color: '#C9A24D' }} />
                <span className="text-sm font-semibold tracking-wide" style={{ color: '#8B1E2D' }}>PREMIUM FASHION & ACCESSORIES</span>
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] tracking-tight">
                <span className="text-black">Discover</span>
                <br />
                <span className="text-black">Timeless</span>
                <br />
                <span className="bg-gradient-to-r from-brand-ruby to-brand-crimson bg-clip-text text-transparent" style={{
                  backgroundImage: 'linear-gradient(to right, #8B1E2D, #B23A48)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Elegance</span>
              </h1>

              <p className="text-xl md:text-2xl text-charcoal/80 leading-relaxed font-light max-w-xl">
                Curated collection of premium clothing, exquisite accessories, and handmade treasures
                crafted with care and attention to detail.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 pt-6">
                <Link href="/products">
                  <button className="group relative px-10 py-5 bg-gradient-to-r from-[#8B1E2D] to-[#B23A48] text-white text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden w-full sm:w-auto">
                    <span className="relative z-10 flex items-center justify-center">
                      Shop Collection
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#B23A48] to-[#8B1E2D] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </Link>
                <Link href="/about">
                  <button className="px-10 py-5 bg-white/90 backdrop-blur-sm text-[#8B1E2D] text-lg font-semibold rounded-xl border-2 border-[#C9A24D] shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 w-full sm:w-auto">
                    Learn Our Story
                  </button>
                </Link>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-8 pt-12 mt-12 border-t border-brand-gold/20">
                <div className="text-center lg:text-left space-y-2">
                  <div className="text-3xl font-display font-bold" style={{ color: '#8B1E2D' }}>500+</div>
                  <div className="text-sm text-charcoal/70 font-medium uppercase tracking-wider">Premium Items</div>
                </div>
                <div className="text-center lg:text-left space-y-2">
                  <div className="text-3xl font-display font-bold" style={{ color: '#8B1E2D' }}>100%</div>
                  <div className="text-sm text-charcoal/70 font-medium uppercase tracking-wider">Authentic</div>
                </div>
                <div className="text-center lg:text-left space-y-2">
                  <div className="text-3xl font-display font-bold" style={{ color: '#8B1E2D' }}>24/7</div>
                  <div className="text-sm text-charcoal/70 font-medium uppercase tracking-wider">Support</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative order-1 lg:order-2">
              <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] ring-1 ring-[#C9A24D]/30">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-[#C9A24D]/10 z-10"></div>
                <Image
                  src="/hero.png"
                  alt="Elegant Saree Collection - Sathika Boutique"
                  fill
                  className="object-cover transform hover:scale-105 transition-transform duration-700"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-[#C9A24D]/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-[#8B1E2D]/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white via-ivory to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl md:text-6xl font-display font-bold text-black tracking-tight">
              Explore Our Collections
            </h2>
            <p className="text-xl text-charcoal/70 font-light max-w-2xl mx-auto">
              Each piece tells a story of craftsmanship and elegance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Clothing Category */}
            <Link href="/products?category=Clothing" className="group">
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgba(139,30,45,0.3)] transition-all duration-500 hover:-translate-y-2">
                <div className="aspect-square bg-gradient-to-br from-[#8B1E2D]/10 via-[#C9A24D]/10 to-[#E6D3A3]/20 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#8B1E2D]/5"></div>
                  <div className="w-36 h-36 rounded-full bg-gradient-to-br from-[#8B1E2D] to-[#B23A48] shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10">
                    <ShoppingBag className="h-20 w-20 text-white" />
                  </div>
                </div>
                <div className="p-8 bg-gradient-to-b from-white to-ivory/50">
                  <h3 className="text-3xl font-display font-bold mb-3" style={{ color: '#8B1E2D' }}>
                    Clothing
                  </h3>
                  <p className="text-charcoal/70 mb-5 text-lg font-light">
                    Elegant dresses, sarees, and fashion pieces
                  </p>
                  <span className="font-bold group-hover:gap-3 inline-flex items-center text-lg transition-all" style={{ color: '#8B1E2D' }}>
                    Shop Now <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Accessories Category */}
            <Link href="/products?category=Accessories" className="group">
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgba(201,162,77,0.3)] transition-all duration-500 hover:-translate-y-2">
                <div className="aspect-square bg-gradient-to-br from-[#C9A24D]/10 via-[#E6D3A3]/20 to-white flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#C9A24D]/5"></div>
                  <div className="w-36 h-36 rounded-full bg-gradient-to-br from-[#C9A24D] to-[#E6D3A3] shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10">
                    <Sparkles className="h-20 w-20 text-white" />
                  </div>
                </div>
                <div className="p-8 bg-gradient-to-b from-white to-ivory/50">
                  <h3 className="text-3xl font-display font-bold mb-3" style={{ color: '#C9A24D' }}>
                    Accessories
                  </h3>
                  <p className="text-charcoal/70 mb-5 text-lg font-light">
                    Jewelry, bags, and finishing touches
                  </p>
                  <span className="font-bold group-hover:gap-3 inline-flex items-center text-lg transition-all" style={{ color: '#8B1E2D' }}>
                    Shop Now <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Handmade Category */}
            <Link href="/products?category=Handmade" className="group">
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgba(178,58,72,0.3)] transition-all duration-500 hover:-translate-y-2">
                <div className="aspect-square bg-gradient-to-br from-[#B23A48]/10 via-[#8B1E2D]/5 to-[#E6D3A3]/10 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#B23A48]/5"></div>
                  <div className="w-36 h-36 rounded-full bg-gradient-to-br from-[#B23A48] to-[#8B1E2D] shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10">
                    <Heart className="h-20 w-20 text-white" />
                  </div>
                </div>
                <div className="p-8 bg-gradient-to-b from-white to-ivory/50">
                  <h3 className="text-3xl font-display font-bold mb-3" style={{ color: '#8B1E2D' }}>
                    Handmade
                  </h3>
                  <p className="text-charcoal/70 mb-5 text-lg font-light">
                    Unique, artisan-crafted treasures
                  </p>
                  <span className="font-bold group-hover:gap-3 inline-flex items-center text-lg transition-all" style={{ color: '#8B1E2D' }}>
                    Shop Now <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
