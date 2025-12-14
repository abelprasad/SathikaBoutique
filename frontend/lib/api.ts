import axios from 'axios';
import type { ProductsResponse, SingleProductResponse } from '@/types/product';
import type { CartResponse, AddToCartRequest } from '@/types/cart';
import type {
  AuthResponse,
  CurrentAdminResponse,
  LogoutResponse,
  LoginRequest,
  RegisterRequest
} from '@/types/admin';

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

// Admin Auth API calls
export const adminAuthApi = {
  // Login admin
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  },

  // Register admin
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/register', data);
    return response.data;
  },

  // Get current admin
  getCurrentAdmin: async (token: string): Promise<CurrentAdminResponse> => {
    const response = await api.get('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  // Logout admin
  logout: async (token: string): Promise<LogoutResponse> => {
    const response = await api.post(
      '/api/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
};

// Admin Product API calls (authenticated)
export const adminProductApi = {
  // Create product
  create: async (token: string, productData: any): Promise<any> => {
    const response = await api.post('/api/products', productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  // Update product
  update: async (token: string, productId: string, productData: any): Promise<any> => {
    const response = await api.put(`/api/products/${productId}`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  // Delete product
  delete: async (token: string, productId: string): Promise<any> => {
    const response = await api.delete(`/api/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

export default api;
