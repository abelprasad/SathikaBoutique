import express from 'express';
import {
  getAllProducts,
  getFeaturedProducts,
  getProductBySlug,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} from '../controllers/productController';
import { authenticateAdmin } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/featured', getFeaturedProducts);
router.get('/categories', getCategories);
router.get('/slug/:slug', getProductBySlug);
router.get('/:id', getProductById);

// Admin routes (protected with authentication)
router.post('/', authenticateAdmin, createProduct);
router.put('/:id', authenticateAdmin, updateProduct);
router.delete('/:id', authenticateAdmin, deleteProduct);

export default router;
