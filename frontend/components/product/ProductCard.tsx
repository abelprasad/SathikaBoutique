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
        <div style={{ marginBottom: '12px' }}>
          {primaryImage ? (
            <img
              src={primaryImage.url}
              alt={primaryImage.alt || product.name}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          ) : (
            <div style={{ padding: '20px', backgroundColor: '#e5e7eb' }}>
              <span style={{ color: '#9ca3af' }}>No image</span>
            </div>
          )}
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-1">{product.category}</p>
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-pink-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">
              {formatPrice(lowestPrice)}
            </span>
            {hasDiscount && product.variants[0].compareAtPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.variants[0].compareAtPrice)}
              </span>
            )}
          </div>
          {product.variants.length > 1 && (
            <p className="text-xs text-gray-500 mt-1">
              {product.variants.length} variants available
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
