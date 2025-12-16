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
      <div className="group cursor-pointer">
        {/* Image Container */}
        <div
          className="relative overflow-hidden rounded-lg transition-all duration-300 mb-3 shadow-md group-hover:shadow-xl"
          style={{
            border: '4px solid #C9A24D'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#8B1E2D'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = '#C9A24D'}
        >
          <div className="relative aspect-square bg-ivory">
            {primaryImage ? (
              <img
                src={primaryImage.url}
                alt={primaryImage.alt || product.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-warmGrey text-sm">No image</span>
              </div>
            )}
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
        <div>
          <p className="text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: '#8B1E2D' }}>{product.category}</p>
          <h3 className="font-display text-base font-semibold text-black mb-2 line-clamp-2 transition-colors group-hover:text-[#8B1E2D]">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg" style={{ color: '#8B1E2D' }}>
              {formatPrice(lowestPrice)}
            </span>
            {hasDiscount && product.variants[0].compareAtPrice && (
              <span className="text-sm line-through" style={{ color: '#6E6E6E' }}>
                {formatPrice(product.variants[0].compareAtPrice)}
              </span>
            )}
          </div>
          {product.variants.length > 1 && (
            <p className="text-xs font-medium mt-1" style={{ color: '#C9A24D' }}>
              {product.variants.length} variants available
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
