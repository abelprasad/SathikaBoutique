'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import ProductForm from '@/components/admin/ProductForm';
import { productApi, adminProductApi } from '@/lib/api';
import { useAdminStore } from '@/store/adminStore';
import Spinner from '@/components/ui/Spinner';
import { ArrowLeft } from 'lucide-react';
import type { Product } from '@/types/product';

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { token } = useAdminStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productApi.getAll({ _id: id, status: 'all' });
        if (response.status === 'success' && response.data.length > 0) {
          setProduct(response.data[0]);
        } else {
          // Try getting by ID directly
          try {
            const idResponse: any = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products/${id}`
            );
            const data = await idResponse.json();
            if (data.status === 'success') {
              setProduct(data.data);
            } else {
              alert('Product not found');
              router.push('/admin/products');
            }
          } catch {
            alert('Product not found');
            router.push('/admin/products');
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        alert('Failed to load product');
        router.push('/admin/products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id, router]);

  const handleSubmit = async (productData: any) => {
    if (!token) {
      alert('You must be logged in to update products');
      return;
    }

    setIsSaving(true);
    try {
      const response = await adminProductApi.update(
        token,
        id,
        productData
      );

      if (response.status === 'success') {
        alert('Product updated successfully!');
        router.push('/admin/products');
      } else {
        alert('Failed to update product');
      }
    } catch (error: any) {
      console.error('Error updating product:', error);
      const errorMessage =
        error.response?.data?.message || 'Failed to update product';
      alert(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <button
              onClick={() => router.back()}
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
            <p className="mt-2 text-gray-600">Update product information</p>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <Spinner size="lg" />
              <p className="mt-4 text-gray-600">Loading product...</p>
            </div>
          ) : product ? (
            <ProductForm
              initialData={product}
              onSubmit={handleSubmit}
              isLoading={isSaving}
            />
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <p className="text-gray-600">Product not found</p>
            </div>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
