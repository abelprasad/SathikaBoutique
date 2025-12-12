import mongoose, { Schema, Document } from 'mongoose';

interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  variantId: mongoose.Types.ObjectId;
  name: string;
  sku: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  image: string;
}

interface ICustomer {
  email: string;
  name: string;
  phone: string;
}

interface IShipping {
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  method: 'standard' | 'express';
  cost: number;
}

interface IPayment {
  method: 'stripe';
  stripePaymentIntentId: string;
  status: 'pending' | 'paid' | 'failed';
  paidAt?: Date;
}

interface IPricing {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
}

export interface IOrder extends Document {
  orderNumber: string;
  customer: ICustomer;
  items: IOrderItem[];
  shipping: IShipping;
  payment: IPayment;
  pricing: IPricing;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  variantId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  sku: { type: String, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

const OrderSchema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    customer: {
      email: { type: String, required: true },
      name: { type: String, required: true },
      phone: { type: String, required: true },
    },
    items: [OrderItemSchema],
    shipping: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true, default: 'US' },
      method: { type: String, enum: ['standard', 'express'], required: true },
      cost: { type: Number, required: true },
    },
    payment: {
      method: { type: String, enum: ['stripe'], required: true },
      stripePaymentIntentId: { type: String, required: true },
      status: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending',
      },
      paidAt: { type: Date },
    },
    pricing: {
      subtotal: { type: Number, required: true },
      shipping: { type: Number, required: true },
      tax: { type: Number, required: true },
      discount: { type: Number, default: 0 },
      total: { type: Number, required: true },
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
OrderSchema.index({ orderNumber: 1 });
OrderSchema.index({ 'customer.email': 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ createdAt: -1 });

export const Order = mongoose.model<IOrder>('Order', OrderSchema);
