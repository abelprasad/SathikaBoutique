'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import ImageUpload from '@/components/admin/ImageUpload';
import { Plus, X, AlertCircle } from 'lucide-react';
import type { Product } from '@/types/product';

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
}

interface Variant {
  size: string;
  color: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
}

export default function ProductForm({
  initialData,
  onSubmit,
  isLoading = false,
}: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    category: initialData?.category || 'Clothing',
    basePrice: initialData?.basePrice || 0,
    tags: initialData?.tags?.join(', ') || '',
    featured: initialData?.featured || false,
    status: initialData?.status || 'draft',
    metaTitle: initialData?.seo?.metaTitle || '',
    metaDescription: initialData?.seo?.metaDescription || '',
  });

  const [variants, setVariants] = useState<Variant[]>(
    initialData?.variants || [
      {
        size: 'M',
        color: 'Black',
        sku: '',
        price: 0,
        stock: 0,
      },
    ]
  );

  const [images, setImages] = useState<
    { url: string; alt: string; isPrimary: boolean }[]
  >(initialData?.images || []);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-generate slug from name
  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
    }));
  };

  // Add variant
  const addVariant = () => {
    setVariants([
      ...variants,
      {
        size: 'M',
        color: 'Black',
        sku: '',
        price: formData.basePrice,
        stock: 0,
      },
    ]);
  };

  // Remove variant
  const removeVariant = (index: number) => {
    if (variants.length > 1) {
      setVariants(variants.filter((_, i) => i !== index));
    }
  };

  // Update variant
  const updateVariant = (index: number, field: keyof Variant, value: any) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    setVariants(updated);
  };

  // Validate form
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.slug.trim()) newErrors.slug = 'Slug is required';
    if (!formData.description.trim())
      newErrors.description = 'Description is required';
    if (formData.basePrice <= 0)
      newErrors.basePrice = 'Price must be greater than 0';

    // Validate variants
    variants.forEach((variant, index) => {
      if (!variant.sku.trim())
        newErrors[`variant_${index}_sku`] = 'SKU is required';
      if (variant.price <= 0)
        newErrors[`variant_${index}_price`] = 'Price must be greater than 0';
      if (variant.stock < 0)
        newErrors[`variant_${index}_stock`] = 'Stock cannot be negative';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const productData = {
      name: formData.name,
      slug: formData.slug,
      description: formData.description,
      category: formData.category,
      basePrice: Number(formData.basePrice),
      tags: formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t),
      featured: formData.featured,
      status: formData.status,
      variants: variants.map((v) => ({
        size: v.size,
        color: v.color,
        sku: v.sku,
        price: Number(v.price),
        compareAtPrice: v.compareAtPrice ? Number(v.compareAtPrice) : undefined,
        stock: Number(v.stock),
        images: [],
      })),
      images: images,
      seo: {
        metaTitle: formData.metaTitle || formData.name,
        metaDescription:
          formData.metaDescription ||
          formData.description.substring(0, 160),
      },
    };

    await onSubmit(productData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g., Summer Floral Dress"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.name}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug *
            </label>
            <Input
              type="text"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              placeholder="summer-floral-dress"
            />
            {errors.slug && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.slug}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              URL-friendly version of the product name
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Describe your product..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.description}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <Select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
              <option value="Handmade">Handmade</option>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Base Price ($) *
            </label>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={formData.basePrice}
              onChange={(e) =>
                setFormData({ ...formData, basePrice: Number(e.target.value) })
              }
              placeholder="0.00"
            />
            {errors.basePrice && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.basePrice}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <Input
              type="text"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              placeholder="summer, casual, cotton (comma separated)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <Select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </Select>
          </div>

          <div className="flex items-center">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-600"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">
                Featured Product
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Product Images */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Product Images
        </h2>
        <ImageUpload images={images} onChange={setImages} maxImages={10} />
      </div>

      {/* Variants */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Product Variants
          </h2>
          <Button type="button" variant="ghost" size="sm" onClick={addVariant}>
            <Plus className="w-4 h-4 mr-2" />
            Add Variant
          </Button>
        </div>

        <div className="space-y-4">
          {variants.map((variant, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg relative"
            >
              {variants.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size
                  </label>
                  <Input
                    type="text"
                    value={variant.size}
                    onChange={(e) =>
                      updateVariant(index, 'size', e.target.value)
                    }
                    placeholder="M"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color
                  </label>
                  <Input
                    type="text"
                    value={variant.color}
                    onChange={(e) =>
                      updateVariant(index, 'color', e.target.value)
                    }
                    placeholder="Black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SKU *
                  </label>
                  <Input
                    type="text"
                    value={variant.sku}
                    onChange={(e) =>
                      updateVariant(index, 'sku', e.target.value)
                    }
                    placeholder="DRESS-M-BLK"
                  />
                  {errors[`variant_${index}_sku`] && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors[`variant_${index}_sku`]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($) *
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={variant.price}
                    onChange={(e) =>
                      updateVariant(index, 'price', Number(e.target.value))
                    }
                    placeholder="0.00"
                  />
                  {errors[`variant_${index}_price`] && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors[`variant_${index}_price`]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Compare At Price ($)
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={variant.compareAtPrice || ''}
                    onChange={(e) =>
                      updateVariant(
                        index,
                        'compareAtPrice',
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock *
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={variant.stock}
                    onChange={(e) =>
                      updateVariant(index, 'stock', Number(e.target.value))
                    }
                    placeholder="0"
                  />
                  {errors[`variant_${index}_stock`] && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors[`variant_${index}_stock`]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEO */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          SEO Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Title
            </label>
            <Input
              type="text"
              value={formData.metaTitle}
              onChange={(e) =>
                setFormData({ ...formData, metaTitle: e.target.value })
              }
              placeholder={formData.name || 'Product meta title'}
            />
            <p className="mt-1 text-sm text-gray-500">
              Recommended: 50-60 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Description
            </label>
            <textarea
              value={formData.metaDescription}
              onChange={(e) =>
                setFormData({ ...formData, metaDescription: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Brief description for search engines"
            />
            <p className="mt-1 text-sm text-gray-500">
              Recommended: 150-160 characters
            </p>
          </div>
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => window.history.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isLoading
              ? 'Saving...'
              : initialData
              ? 'Update Product'
              : 'Create Product'}
          </Button>
        </div>
      </div>
    </form>
  );
}
