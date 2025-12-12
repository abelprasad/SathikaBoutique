'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/product/ProductCard';
import { Select, Button, Spinner } from '@/components/ui';
import { productApi } from '@/lib/api';
import type { Product } from '@/types/product';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [sort, setSort] = useState('-createdAt');

  useEffect(() => {
    fetchProducts();
  }, [page, category, sort]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productApi.getAll({
        category: category || undefined,
        sort,
        page,
        limit: 12,
      });
      setProducts(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Shop All Products
          </h1>
          <p className="text-gray-600">
            Discover our collection of {total} beautiful items
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Category"
              value={category}
              onChange={handleCategoryChange}
              options={[
                { value: '', label: 'All Categories' },
                { value: 'Clothing', label: 'Clothing' },
                { value: 'Accessories', label: 'Accessories' },
                { value: 'Handmade', label: 'Handmade' },
              ]}
            />

            <Select
              label="Sort By"
              value={sort}
              onChange={handleSortChange}
              options={[
                { value: '-createdAt', label: 'Newest First' },
                { value: 'basePrice', label: 'Price: Low to High' },
                { value: '-basePrice', label: 'Price: High to Low' },
                { value: 'name', label: 'Name: A to Z' },
              ]}
            />

            <div className="flex items-end">
              <Button
                variant="ghost"
                onClick={() => {
                  setCategory('');
                  setSort('-createdAt');
                  setPage(1);
                }}
                className="w-full"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner size="lg" />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products found</p>
            <Button
              variant="primary"
              onClick={() => {
                setCategory('');
                setSort('-createdAt');
              }}
              className="mt-4"
            >
              View All Products
            </Button>
          </div>
        )}

        {/* Pagination */}
        {!loading && products.length > 0 && (
          <div className="mt-8 flex justify-center gap-2">
            <Button
              variant="secondary"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span className="flex items-center px-4 text-gray-700">
              Page {page} of {Math.ceil(total / 12)}
            </span>
            <Button
              variant="secondary"
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= Math.ceil(total / 12)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
