'use client';

import Link from 'next/link';
import Image from 'next/image';
import { m } from 'framer-motion';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui';
import { memo } from 'react';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const lowestPrice = Math.min(...product.variants.map((v) => v.price));
  const hasDiscount = product.variants.some((v) => v.compareAtPrice);

  return (
    <Link href={`/products/${product.slug}`}>
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="group cursor-pointer"
      >
        {/* Image Container */}
        <m.div
          className="relative overflow-hidden rounded-2xl mb-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)] group-hover:shadow-[0_20px_60px_rgba(139,30,45,0.25)] ring-1 ring-[#C9A24D]/20 group-hover:ring-[#8B1E2D]/40"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative aspect-square bg-gradient-to-br from-ivory to-white overflow-hidden">
            {primaryImage ? (
              <m.div
                className="absolute inset-0"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={primaryImage.url}
                  alt={primaryImage.alt || product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
              </m.div>
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
                <m.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Badge variant="info" className="text-white shadow-lg border-2 border-white" style={{ backgroundColor: '#C9A24D' }}>
                    Featured
                  </Badge>
                </m.div>
              )}
              {hasDiscount && (
                <m.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                >
                  <Badge variant="danger" className="text-white shadow-lg border-2 border-white" style={{ backgroundColor: '#8B1E2D' }}>
                    Sale
                  </Badge>
                </m.div>
              )}
            </div>
          )}
        </m.div>

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
      </m.div>
    </Link>
  );
}

export default memo(ProductCard);
