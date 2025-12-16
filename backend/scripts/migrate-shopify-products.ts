import axios from 'axios';
import fs from 'fs';
import path from 'path';
import https from 'https';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from '../src/models/Product';

dotenv.config();

// Shopify credentials
const SHOPIFY_STORE = process.env.SHOPIFY_STORE || 'sathika.myshopify.com';
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN || '';
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION || '2024-01';

if (!SHOPIFY_ACCESS_TOKEN) {
  console.error('ERROR: SHOPIFY_ACCESS_TOKEN environment variable is required');
  process.exit(1);
}

// Shopify API client
const shopifyAPI = axios.create({
  baseURL: `https://${SHOPIFY_STORE}/admin/api/${SHOPIFY_API_VERSION}`,
  headers: {
    'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
    'Content-Type': 'application/json',
  },
});

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads/products');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Download image from URL
async function downloadImage(url: string, filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const filePath = path.join(uploadsDir, filename);
    const file = fs.createWriteStream(filePath);

    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(`/uploads/products/${filename}`);
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {});
      reject(err);
    });
  });
}

// Generate slug from product title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Fetch all products from Shopify
async function fetchShopifyProducts(): Promise<any[]> {
  try {
    console.log('Fetching products from Shopify...');
    const response = await shopifyAPI.get('/products.json', {
      params: { limit: 250 } // Max limit per request
    });

    console.log(`Found ${response.data.products.length} products`);
    return response.data.products;
  } catch (error: any) {
    console.error('Error fetching products:', error.response?.data || error.message);
    throw error;
  }
}

// Transform Shopify product to our schema
async function transformProduct(shopifyProduct: any): Promise<any> {
  try {
    console.log(`\nProcessing: ${shopifyProduct.title}`);

    // Download images
    const images = [];
    for (let i = 0; i < shopifyProduct.images.length; i++) {
      const img = shopifyProduct.images[i];
      // Remove query parameters from URL before getting extension
      const urlWithoutQuery = img.src.split('?')[0];
      const ext = path.extname(urlWithoutQuery) || '.jpg';
      const filename = `${generateSlug(shopifyProduct.title)}-${Date.now()}-${i}${ext}`;

      try {
        const localPath = await downloadImage(img.src, filename);
        images.push({
          url: localPath,
          alt: img.alt || shopifyProduct.title,
          isPrimary: i === 0,
        });
        console.log(`  ✓ Downloaded image ${i + 1}/${shopifyProduct.images.length}`);
      } catch (err: any) {
        console.error(`  ✗ Failed to download image: ${err.message}`);
      }
    }

    // Transform variants
    const variants = shopifyProduct.variants.map((variant: any) => ({
      sku: variant.sku || `SKU-${variant.id}`,
      price: parseFloat(variant.price) || 0,
      compareAtPrice: variant.compare_at_price ? parseFloat(variant.compare_at_price) : undefined,
      stock: variant.inventory_quantity || 0,
      size: variant.option1 || 'One Size',
      color: variant.option2 || 'Default',
      images: [],
    }));

    // Calculate base price (minimum variant price)
    const basePrice = Math.min(...variants.map((v: any) => v.price));

    // Determine category from product type or tags
    let category = 'Clothing'; // Default
    const productType = shopifyProduct.product_type?.toLowerCase() || '';
    const tagsLower = shopifyProduct.tags?.toLowerCase() || '';

    if (productType.includes('accessor') || tagsLower.includes('accessor')) {
      category = 'Accessories';
    } else if (productType.includes('handmade') || tagsLower.includes('handmade')) {
      category = 'Handmade';
    } else if (productType.includes('clothing') || tagsLower.includes('clothing')) {
      category = 'Clothing';
    }

    // Extract tags
    const tags = shopifyProduct.tags ? shopifyProduct.tags.split(',').map((t: string) => t.trim()) : [];

    // Create product object
    const product = {
      name: shopifyProduct.title,
      slug: generateSlug(shopifyProduct.title),
      description: shopifyProduct.body_html?.replace(/<[^>]*>/g, '') || 'Premium quality product', // Strip HTML
      category,
      images,
      variants,
      basePrice,
      tags,
      featured: shopifyProduct.tags?.toLowerCase().includes('featured') || false,
      status: shopifyProduct.status === 'active' ? 'published' : 'draft',
      seo: {
        metaTitle: shopifyProduct.title,
        metaDescription: shopifyProduct.body_html?.replace(/<[^>]*>/g, '').substring(0, 160) || shopifyProduct.title,
      },
    };

    return product;
  } catch (error: any) {
    console.error(`Error transforming product ${shopifyProduct.title}:`, error.message);
    throw error;
  }
}

// Main migration function
async function migrateProducts(): Promise<void> {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sathika-boutique');
    console.log('✓ Connected to MongoDB\n');

    // Fetch products from Shopify
    const shopifyProducts = await fetchShopifyProducts();

    if (shopifyProducts.length === 0) {
      console.log('No products found in Shopify store');
      return;
    }

    // Migrate each product
    let successCount = 0;
    let failCount = 0;

    for (const shopifyProduct of shopifyProducts) {
      try {
        // Check if product already exists (by slug or name)
        const slug = generateSlug(shopifyProduct.title);
        const existingProduct = await Product.findOne({
          $or: [{ slug }, { name: shopifyProduct.title }]
        });

        if (existingProduct) {
          console.log(`⊗ Skipping "${shopifyProduct.title}" - already exists`);
          continue;
        }

        // Transform and save product
        const productData = await transformProduct(shopifyProduct);
        const product = new Product(productData);
        await product.save();

        console.log(`✓ Imported: ${shopifyProduct.title}`);
        successCount++;
      } catch (error: any) {
        console.error(`✗ Failed to import "${shopifyProduct.title}":`, error.message);
        failCount++;
      }
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('MIGRATION COMPLETE');
    console.log('='.repeat(50));
    console.log(`✓ Successfully imported: ${successCount} products`);
    console.log(`✗ Failed: ${failCount} products`);
    console.log(`⊗ Skipped (already exist): ${shopifyProducts.length - successCount - failCount} products`);
    console.log('='.repeat(50) + '\n');

  } catch (error: any) {
    console.error('\n❌ Migration failed:', error.message);
    throw error;
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run migration
migrateProducts()
  .then(() => {
    console.log('\n✓ Migration script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Migration script failed:', error);
    process.exit(1);
  });
