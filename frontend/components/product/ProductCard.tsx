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
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
          {primaryImage ? (
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              <span className="text-gray-400 absolute inset-0 flex items-center justify-center text-sm">
                {product.name}
              </span>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400 text-sm">No image</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            {product.featured && (
              <Badge variant="info" className="shadow-md">
                Featured
              </Badge>
            )}
            {hasDiscount && (
              <Badge variant="danger" className="shadow-md">
                Sale
              </Badge>
            )}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
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
