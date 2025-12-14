const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const ProductSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', ProductSchema);

async function hideProducts() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  const imagesToHide = [
    'maxi-skirt-1.jpg',
    'silk-blouse-1.jpg',
    'leather-tote-1.jpg',
    'wool-scarf-1.jpg',
    'beaded-necklace-1.jpg'
  ];

  for (const img of imagesToHide) {
    const result = await Product.updateMany(
      { 'images.url': { $regex: img } },
      { $set: { status: 'draft' } }
    );
    console.log(`✓ Hidden products with ${img}: ${result.modifiedCount} updated`);
  }

  await mongoose.disconnect();
  console.log('\nDone! Demo products are now hidden.');
}

hideProducts().catch(console.error);
