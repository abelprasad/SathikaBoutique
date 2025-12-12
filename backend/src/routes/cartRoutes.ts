import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cartController';

const router = express.Router();

// Cart routes
router.get('/:sessionId', getCart);
router.post('/:sessionId/items', addToCart);
router.put('/:sessionId/items/:itemId', updateCartItem);
router.delete('/:sessionId/items/:itemId', removeFromCart);
router.delete('/:sessionId', clearCart);

export default router;
