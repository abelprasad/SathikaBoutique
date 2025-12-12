import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Product } from '../models/Product';

dotenv.config();

const sampleProducts = [
  {
    name: 'Floral Summer Dress',
    slug: 'floral-summer-dress',
    description:
      'Beautiful floral summer dress perfect for warm weather. Made with breathable cotton fabric and featuring a flattering A-line silhouette.',
    category: 'Clothing',
    images: [
      {
        url: '/uploads/products/floral-dress-1.jpg',
        alt: 'Floral Summer Dress - Front View',
        isPrimary: true,
      },
      {
        url: '/uploads/products/floral-dress-2.jpg',
        alt: 'Floral Summer Dress - Side View',
        isPrimary: false,
      },
    ],
    variants: [
      {
        size: 'S',
        color: 'Pink',
        sku: 'FSD-PINK-S',
        price: 4999,
        compareAtPrice: 6999,
        stock: 10,
        images: [],
      },
      {
        size: 'M',
        color: 'Pink',
        sku: 'FSD-PINK-M',
        price: 4999,
        compareAtPrice: 6999,
        stock: 15,
        images: [],
      },
      {
        size: 'L',
        color: 'Pink',
        sku: 'FSD-PINK-L',
        price: 4999,
        compareAtPrice: 6999,
        stock: 8,
        images: [],
      },
    ],
    basePrice: 4999,
    tags: ['summer', 'dress', 'floral', 'casual'],
    featured: true,
    status: 'published',
    seo: {
      metaTitle: 'Floral Summer Dress | Sathika Boutique',
      metaDescription: 'Shop our beautiful floral summer dress. Perfect for any occasion.',
    },
  },
  {
    name: 'Handmade Leather Tote Bag',
    slug: 'handmade-leather-tote-bag',
    description:
      'Elegant handcrafted leather tote bag. Spacious interior with multiple pockets for organization. Perfect for work or daily use.',
    category: 'Accessories',
    images: [
      {
        url: '/uploads/products/leather-tote-1.jpg',
        alt: 'Leather Tote Bag',
        isPrimary: true,
      },
    ],
    variants: [
      {
        size: 'One Size',
        color: 'Brown',
        sku: 'LTB-BRN-OS',
        price: 8999,
        stock: 5,
        images: [],
      },
      {
        size: 'One Size',
        color: 'Black',
        sku: 'LTB-BLK-OS',
        price: 8999,
        stock: 7,
        images: [],
      },
    ],
    basePrice: 8999,
    tags: ['handmade', 'leather', 'tote', 'bag', 'accessories'],
    featured: true,
    status: 'published',
  },
  {
    name: 'Bohemian Maxi Skirt',
    slug: 'bohemian-maxi-skirt',
    description:
      'Flowing bohemian-style maxi skirt with beautiful print. Comfortable elastic waist and made with premium fabric.',
    category: 'Clothing',
    images: [
      {
        url: '/uploads/products/maxi-skirt-1.jpg',
        alt: 'Bohemian Maxi Skirt',
        isPrimary: true,
      },
    ],
    variants: [
      {
        size: 'S',
        color: 'Multi',
        sku: 'BMS-MULTI-S',
        price: 3999,
        stock: 12,
        images: [],
      },
      {
        size: 'M',
        color: 'Multi',
        sku: 'BMS-MULTI-M',
        price: 3999,
        stock: 18,
        images: [],
      },
      {
        size: 'L',
        color: 'Multi',
        sku: 'BMS-MULTI-L',
        price: 3999,
        stock: 10,
        images: [],
      },
    ],
    basePrice: 3999,
    tags: ['bohemian', 'maxi', 'skirt', 'casual'],
    featured: false,
    status: 'published',
  },
  {
    name: 'Knitted Wool Scarf',
    slug: 'knitted-wool-scarf',
    description:
      'Cozy hand-knitted wool scarf. Perfect for cold weather. Soft and warm with beautiful pattern.',
    category: 'Handmade',
    images: [
      {
        url: '/uploads/products/wool-scarf-1.jpg',
        alt: 'Knitted Wool Scarf',
        isPrimary: true,
      },
    ],
    variants: [
      {
        size: 'One Size',
        color: 'Beige',
        sku: 'KWS-BEI-OS',
        price: 2999,
        stock: 20,
        images: [],
      },
      {
        size: 'One Size',
        color: 'Gray',
        sku: 'KWS-GRY-OS',
        price: 2999,
        stock: 15,
        images: [],
      },
    ],
    basePrice: 2999,
    tags: ['handmade', 'knitted', 'scarf', 'wool', 'winter'],
    featured: true,
    status: 'published',
  },
  {
    name: 'Silk Evening Blouse',
    slug: 'silk-evening-blouse',
    description:
      'Elegant silk blouse perfect for evening events. Luxurious fabric with delicate details and comfortable fit.',
    category: 'Clothing',
    images: [
      {
        url: '/uploads/products/silk-blouse-1.jpg',
        alt: 'Silk Evening Blouse',
        isPrimary: true,
      },
    ],
    variants: [
      {
        size: 'S',
        color: 'Champagne',
        sku: 'SEB-CHA-S',
        price: 5999,
        stock: 8,
        images: [],
      },
      {
        size: 'M',
        color: 'Champagne',
        sku: 'SEB-CHA-M',
        price: 5999,
        stock: 10,
        images: [],
      },
      {
        size: 'L',
        color: 'Champagne',
        sku: 'SEB-CHA-L',
        price: 5999,
        stock: 5,
        images: [],
      },
    ],
    basePrice: 5999,
    tags: ['silk', 'blouse', 'evening', 'elegant'],
    featured: false,
    status: 'published',
  },
  {
    name: 'Beaded Statement Necklace',
    slug: 'beaded-statement-necklace',
    description:
      'Stunning handmade beaded necklace. A perfect statement piece for any outfit. Unique design with high-quality beads.',
    category: 'Accessories',
    images: [
      {
        url: '/uploads/products/beaded-necklace-1.jpg',
        alt: 'Beaded Statement Necklace',
        isPrimary: true,
      },
    ],
    variants: [
      {
        size: 'One Size',
        color: 'Gold',
        sku: 'BSN-GLD-OS',
        price: 3499,
        stock: 12,
        images: [],
      },
      {
        size: 'One Size',
        color: 'Silver',
        sku: 'BSN-SLV-OS',
        price: 3499,
        stock: 15,
        images: [],
      },
    ],
    basePrice: 3499,
    tags: ['handmade', 'beaded', 'necklace', 'jewelry', 'accessories'],
    featured: true,
    status: 'published',
  },
];

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI not defined');
    }

    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully seeded ${sampleProducts.length} products`);

    mongoose.connection.close();
    console.log('👋 Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
