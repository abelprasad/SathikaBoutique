import mongoose, { Schema, Document } from 'mongoose';

interface IImage {
  url: string;
  alt: string;
  isPrimary: boolean;
}

interface IVariant {
  size: string;
  color: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  images: string[];
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  category: string;
  images: IImage[];
  variants: IVariant[];
  basePrice: number;
  tags: string[];
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  seo: {
    metaTitle?: string;
    metaDescription?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ImageSchema = new Schema({
  url: { type: String, required: true },
  alt: { type: String, required: true },
  isPrimary: { type: Boolean, default: false },
});

const VariantSchema = new Schema({
  size: { type: String, required: true },
  color: { type: String, required: true },
  sku: { type: String, required: true },
  price: { type: Number, required: true },
  compareAtPrice: { type: Number },
  stock: { type: Number, required: true, default: 0 },
  images: [{ type: String }],
});

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Clothing', 'Accessories', 'Handmade'],
    },
    images: [ImageSchema],
    variants: [VariantSchema],
    basePrice: { type: Number, required: true },
    tags: [{ type: String }],
    featured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    seo: {
      metaTitle: { type: String },
      metaDescription: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
ProductSchema.index({ slug: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ status: 1 });
ProductSchema.index({ featured: 1 });

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
