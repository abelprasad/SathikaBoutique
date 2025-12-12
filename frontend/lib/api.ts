import axios from 'axios';
import type { ProductsResponse, SingleProductResponse } from '@/types/product';
import type { CartResponse, AddToCartRequest } from '@/types/cart';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Product API calls
export const productApi = {
  // Get all products with filters
  getAll: async (params?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    page?: number;
    limit?: number;
    search?: string;
    featured?: boolean;
  }): Promise<ProductsResponse> => {
    const response = await api.get('/api/products', { params });
    return response.data;
  },

  // Get featured products
  getFeatured: async (limit?: number): Promise<ProductsResponse> => {
    const response = await api.get('/api/products/featured', {
      params: { limit },
    });
    return response.data;
  },

  // Get single product by slug
  getBySlug: async (slug: string): Promise<SingleProductResponse> => {
    const response = await api.get(`/api/products/slug/${slug}`);
    return response.data;
  },

  // Get categories
  getCategories: async (): Promise<{ status: string; data: string[] }> => {
    const response = await api.get('/api/products/categories');
    return response.data;
  },
};

// Cart API calls
export const cartApi = {
  // Get cart by session ID
  get: async (sessionId: string): Promise<CartResponse> => {
    const response = await api.get(`/api/cart/${sessionId}`);
    return response.data;
  },

  // Add item to cart
  addItem: async (
    sessionId: string,
    item: AddToCartRequest
  ): Promise<CartResponse> => {
    const response = await api.post(`/api/cart/${sessionId}/items`, item);
    return response.data;
  },

  // Update cart item quantity
  updateItem: async (
    sessionId: string,
    itemId: string,
    quantity: number
  ): Promise<CartResponse> => {
    const response = await api.put(
      `/api/cart/${sessionId}/items/${itemId}`,
      { quantity }
    );
    return response.data;
  },

  // Remove item from cart
  removeItem: async (
    sessionId: string,
    itemId: string
  ): Promise<CartResponse> => {
    const response = await api.delete(`/api/cart/${sessionId}/items/${itemId}`);
    return response.data;
  },

  // Clear cart
  clear: async (sessionId: string): Promise<CartResponse> => {
    const response = await api.delete(`/api/cart/${sessionId}`);
    return response.data;
  },
};

export default api;
