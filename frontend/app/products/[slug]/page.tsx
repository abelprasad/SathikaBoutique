'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { productApi } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import { Button, Badge, Spinner, Select } from '@/components/ui';
import { ShoppingCart, Check } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import type { Product, ProductVariant } from '@/types/product';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addItem } = useCartStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [resolvedParams.slug]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productApi.getBySlug(resolvedParams.slug);
      setProduct(response.data);
      // Set first variant as default
      if (response.data.variants.length > 0) {
        setSelectedVariant(response.data.variants[0]);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product || !selectedVariant) return;

    try {
      setAddingToCart(true);
      await addItem(product, selectedVariant, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000); // Hide success message after 3s
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Button onClick={() => router.push('/products')}>
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const hasDiscount = selectedVariant?.compareAtPrice && selectedVariant.compareAtPrice > selectedVariant.price;

  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2 text-charcoal font-medium">
            <li>
              <a href="/" className="hover:text-brand-ruby transition-colors">
                Home
              </a>
            </li>
            <li>/</li>
            <li>
              <a href="/products" className="hover:text-brand-ruby transition-colors">
                Products
              </a>
            </li>
            <li>/</li>
            <li className="text-brand-ruby font-semibold">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative aspect-square bg-ivory rounded-lg overflow-hidden mb-4 border-4 border-brand-gold shadow-xl">
              {primaryImage ? (
                <Image
                  src={primaryImage.url}
                  alt={primaryImage.alt || product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-ivory">
                  <span className="text-warmGrey">No image</span>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((image, index) => (
                  <div key={index} className="relative aspect-square bg-ivory rounded border-2 border-brand-gold overflow-hidden cursor-pointer hover:border-brand-ruby transition-all shadow-md hover:shadow-lg">
                    <Image
                      src={image.url}
                      alt={image.alt || `${product.name} ${index + 1}`}
                      fill
                      sizes="(max-width: 1024px) 25vw, 12.5vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              <Badge variant="default">{product.category}</Badge>
              {product.featured && <Badge variant="info">Featured</Badge>}
              {hasDiscount && <Badge variant="danger">Sale</Badge>}
            </div>

            <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  {selectedVariant && formatPrice(selectedVariant.price)}
                </span>
                {hasDiscount && selectedVariant?.compareAtPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(selectedVariant.compareAtPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-charcoal mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Variant Selection */}
            {product.variants.length > 1 && (
              <div className="mb-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Size
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[...new Set(product.variants.map((v) => v.size))].map((size) => {
                      const variant = product.variants.find((v) => v.size === size);
                      const isSelected = selectedVariant?.size === size;
                      const isAvailable = variant && variant.stock > 0;

                      return (
                        <button
                          key={size}
                          onClick={() => variant && setSelectedVariant(variant)}
                          disabled={!isAvailable}
                          className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                            isSelected
                              ? 'border-brand-ruby bg-brand-ruby text-white'
                              : isAvailable
                              ? 'border-brand-champagne hover:border-brand-gold'
                              : 'border-brand-champagne/50 bg-ivory text-warmGrey cursor-not-allowed'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Color Selection */}
                {[...new Set(product.variants.map((v) => v.color))].length > 1 && (
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Color
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[...new Set(product.variants.map((v) => v.color))].map((color) => {
                        const isSelected = selectedVariant?.color === color;
                        return (
                          <button
                            key={color}
                            onClick={() => {
                              const variant = product.variants.find((v) => v.color === color);
                              if (variant) setSelectedVariant(variant);
                            }}
                            className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                              isSelected
                                ? 'border-brand-ruby bg-brand-ruby text-white'
                                : 'border-brand-champagne hover:border-brand-gold'
                            }`}
                          >
                            {color}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Stock Status */}
            {selectedVariant && (
              <div className="mb-6">
                {selectedVariant.stock > 0 ? (
                  <div className="flex items-center gap-2 text-brand-gold">
                    <Check className="h-5 w-5" />
                    <span className="font-medium">
                      {selectedVariant.stock > 10
                        ? 'In Stock'
                        : `Only ${selectedVariant.stock} left!`}
                    </span>
                  </div>
                ) : (
                  <div className="text-brand-ruby font-medium">Out of Stock</div>
                )}
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="mb-6 bg-ivory p-6 rounded-lg border-2 border-brand-gold shadow-lg">
              <div className="mb-4">
                <label className="block text-sm font-medium text-black mb-2">
                  Quantity
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border-2 border-brand-champagne rounded-lg px-4 py-3 w-full focus:border-brand-gold focus:outline-none text-lg"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant || selectedVariant.stock < 1 || addingToCart}
                className="w-full bg-brand-ruby text-white text-xl font-bold py-4 px-6 rounded-lg shadow-md hover:bg-brand-crimson disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                style={{ minHeight: '60px' }}
              >
                <ShoppingCart className="h-6 w-6 mr-3" />
                {addingToCart ? 'Adding to Cart...' : 'Add to Cart'}
              </button>

              {/* Success Message */}
              {addedToCart && (
                <div className="mt-4 bg-brand-gold/20 border-2 border-brand-gold text-black px-4 py-3 rounded-lg flex items-center gap-2">
                  <Check className="h-5 w-5 text-brand-gold" />
                  <span className="font-medium">Added to cart successfully!</span>
                  <button
                    onClick={() => router.push('/cart')}
                    className="ml-auto text-brand-ruby hover:text-brand-crimson font-semibold underline"
                  >
                    View Cart
                  </button>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="border-t-2 border-brand-gold pt-6 bg-brand-champagne/10 p-4 rounded-lg">
              <h3 className="font-bold text-brand-ruby mb-3 text-lg">Product Details</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex">
                  <dt className="text-charcoal font-semibold w-24">SKU:</dt>
                  <dd className="text-black">{selectedVariant?.sku}</dd>
                </div>
                <div className="flex">
                  <dt className="text-charcoal font-semibold w-24">Category:</dt>
                  <dd className="text-brand-ruby font-medium">{product.category}</dd>
                </div>
                {product.tags.length > 0 && (
                  <div className="flex">
                    <dt className="text-charcoal font-semibold w-24">Tags:</dt>
                    <dd className="text-black">{product.tags.join(', ')}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
