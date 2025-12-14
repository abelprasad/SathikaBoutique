'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import ProductForm from '@/components/admin/ProductForm';
import { adminProductApi } from '@/lib/api';
import { useAdminStore } from '@/store/adminStore';
import { ArrowLeft } from 'lucide-react';

export default function NewProductPage() {
  const router = useRouter();
  const { token } = useAdminStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (productData: any) => {
    if (!token) {
      alert('You must be logged in to create products');
      return;
    }

    setIsLoading(true);
    try {
      const response = await adminProductApi.create(token, productData);

      if (response.status === 'success') {
        alert('Product created successfully!');
        router.push('/admin/products');
      } else {
        alert('Failed to create product');
      }
    } catch (error: any) {
      console.error('Error creating product:', error);
      const errorMessage =
        error.response?.data?.message || 'Failed to create product';
      alert(errorMessage);
    } finally {
      setIsLoading(false);
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
            <h1 className="text-3xl font-bold text-gray-900">
              Add New Product
            </h1>
            <p className="mt-2 text-gray-600">
              Create a new product for your store
            </p>
          </div>

          {/* Form */}
          <ProductForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
