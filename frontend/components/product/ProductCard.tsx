import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const lowestPrice = Math.min(...product.variants.map((v) => v.price));
  const hasDiscount = product.variants.some((v) => v.compareAtPrice);

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="group cursor-pointer transform transition-all duration-500 hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-2xl transition-all duration-500 mb-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)] group-hover:shadow-[0_20px_60px_rgba(139,30,45,0.25)] ring-1 ring-[#C9A24D]/20 group-hover:ring-[#8B1E2D]/40">
          <div className="relative aspect-square bg-gradient-to-br from-ivory to-white overflow-hidden">
            {primaryImage ? (
              <img
                src={primaryImage.url}
                alt={primaryImage.alt || product.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-warmGrey text-sm">No image</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Badges */}
          {(product.featured || hasDiscount) && (
            <div className="absolute top-2 right-2 flex flex-col gap-2">
              {product.featured && (
                <Badge variant="info" className="text-white shadow-lg border-2 border-white" style={{ backgroundColor: '#C9A24D' }}>
                  Featured
                </Badge>
              )}
              {hasDiscount && (
                <Badge variant="danger" className="text-white shadow-lg border-2 border-white" style={{ backgroundColor: '#8B1E2D' }}>
                  Sale
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-3 bg-gradient-to-b from-white to-ivory/30 p-4 rounded-b-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: '#8B1E2D' }}>{product.category}</p>
          <h3 className="font-display text-lg font-semibold text-black mb-2 line-clamp-2 transition-colors group-hover:text-[#8B1E2D] leading-snug">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-3">
            <span className="font-display font-bold text-2xl" style={{ color: '#8B1E2D' }}>
              {formatPrice(lowestPrice)}
            </span>
            {hasDiscount && product.variants[0].compareAtPrice && (
              <span className="text-base line-through font-light" style={{ color: '#6E6E6E' }}>
                {formatPrice(product.variants[0].compareAtPrice)}
              </span>
            )}
          </div>
          {product.variants.length > 1 && (
            <p className="text-xs font-medium opacity-70" style={{ color: '#C9A24D' }}>
              {product.variants.length} variants available
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
