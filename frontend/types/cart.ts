import { Product } from './product';

export interface CartItem {
  _id?: string;
  productId: string | Product;
  variantId: string;
  quantity: number;
  addedAt: Date;
}

export interface Cart {
  _id: string;
  sessionId: string;
  items: CartItem[];
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartResponse {
  status: string;
  data: Cart;
}

export interface AddToCartRequest {
  productId: string;
  variantId: string;
  quantity: number;
}
