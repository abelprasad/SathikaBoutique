export interface ProductImage {
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface ProductVariant {
  _id: string;
  size: string;
  color: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  images: string[];
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: 'Clothing' | 'Accessories' | 'Handmade';
  images: ProductImage[];
  variants: ProductVariant[];
  basePrice: number;
  tags: string[];
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  status: string;
  results: number;
  total: number;
  page: number;
  pages: number;
  data: Product[];
}

export interface SingleProductResponse {
  status: string;
  data: Product;
}
