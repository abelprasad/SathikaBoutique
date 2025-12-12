'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import { useRouter } from 'next/navigation';
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
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2 text-gray-500">
            <li>
              <a href="/" className="hover:text-pink-600">
                Home
              </a>
            </li>
            <li>/</li>
            <li>
              <a href="/products" className="hover:text-pink-600">
                Products
              </a>
            </li>
            <li>/</li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              {primaryImage ? (
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                  <span className="text-gray-400 absolute inset-0 flex items-center justify-center text-sm">
                    {product.name}
                  </span>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery (future enhancement) */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((image, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded cursor-pointer hover:opacity-75">
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                      {index + 1}
                    </div>
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
            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Variant Selection */}
            {product.variants.length > 1 && (
              <div className="mb-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                              ? 'border-pink-600 bg-pink-50 text-pink-600'
                              : isAvailable
                              ? 'border-gray-300 hover:border-pink-600'
                              : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                ? 'border-pink-600 bg-pink-50 text-pink-600'
                                : 'border-gray-300 hover:border-pink-600'
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
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="h-5 w-5" />
                    <span className="font-medium">
                      {selectedVariant.stock > 10
                        ? 'In Stock'
                        : `Only ${selectedVariant.stock} left!`}
                    </span>
                  </div>
                ) : (
                  <div className="text-red-600 font-medium">Out of Stock</div>
                )}
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="mb-6">
              <div className="flex gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-20"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    &nbsp;
                  </label>
                  <Button
                    onClick={handleAddToCart}
                    disabled={!selectedVariant || selectedVariant.stock < 1 || addingToCart}
                    isLoading={addingToCart}
                    className="w-full"
                    size="lg"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>

              {/* Success Message */}
              {addedToCart && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>Added to cart successfully!</span>
                  <button
                    onClick={() => router.push('/cart')}
                    className="ml-auto text-green-700 hover:text-green-900 font-medium underline"
                  >
                    View Cart
                  </button>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="border-t pt-6">
              <h3 className="font-medium text-gray-900 mb-2">Product Details</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex">
                  <dt className="text-gray-600 w-24">SKU:</dt>
                  <dd className="text-gray-900">{selectedVariant?.sku}</dd>
                </div>
                <div className="flex">
                  <dt className="text-gray-600 w-24">Category:</dt>
                  <dd className="text-gray-900">{product.category}</dd>
                </div>
                {product.tags.length > 0 && (
                  <div className="flex">
                    <dt className="text-gray-600 w-24">Tags:</dt>
                    <dd className="text-gray-900">{product.tags.join(', ')}</dd>
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
