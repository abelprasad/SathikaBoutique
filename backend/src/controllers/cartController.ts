import { Request, Response } from 'express';
import { Cart } from '../models/Cart';
import { Product } from '../models/Product';

// Get cart by session ID
export const getCart = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    let cart = await Cart.findOne({ sessionId }).populate(
      'items.productId',
      'name slug images basePrice variants'
    );

    if (!cart) {
      // Create new cart if doesn't exist
      cart = await Cart.create({
        sessionId,
        items: [],
      });
    }

    res.status(200).json({
      status: 'success',
      data: cart,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Add item to cart
export const addToCart = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const { productId, variantId, quantity = 1 } = req.body;

    // Validate product and variant exist
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found',
      });
    }

    const variant = product.variants.find(
      (v: any) => v._id.toString() === variantId
    );
    if (!variant) {
      return res.status(404).json({
        status: 'error',
        message: 'Product variant not found',
      });
    }

    // Check stock
    if (variant.stock < quantity) {
      return res.status(400).json({
        status: 'error',
        message: `Only ${variant.stock} item(s) available in stock`,
        availableStock: variant.stock,
      });
    }

    let cart = await Cart.findOne({ sessionId });

    if (!cart) {
      cart = await Cart.create({
        sessionId,
        items: [{ productId, variantId, quantity, addedAt: new Date() }],
        lastActivity: new Date(),
      });
    } else {
      // Check if item already exists in cart
      const existingItemIndex = cart.items.findIndex(
        (item) =>
          item.productId.toString() === productId &&
          item.variantId.toString() === variantId
      );

      if (existingItemIndex > -1) {
        // Update quantity
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        cart.items.push({
          productId,
          variantId,
          quantity,
          addedAt: new Date(),
        });
      }

      cart.lastActivity = new Date();
      await cart.save();
    }

    // Populate and return
    cart = await Cart.findOne({ sessionId }).populate(
      'items.productId',
      'name slug images basePrice variants'
    );

    res.status(200).json({
      status: 'success',
      data: cart,
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Update cart item quantity
export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const { sessionId, itemId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({
        status: 'error',
        message: 'Quantity must be at least 1',
      });
    }

    const cart = await Cart.findOne({ sessionId });

    if (!cart) {
      return res.status(404).json({
        status: 'error',
        message: 'Cart not found',
      });
    }

    const item = cart.items.find((i: any) => i._id?.toString() === itemId);
    if (!item) {
      return res.status(404).json({
        status: 'error',
        message: 'Item not found in cart',
      });
    }

    // Check stock
    const product = await Product.findById(item.productId);
    if (product) {
      const variant = product.variants.find(
        (v: any) => v._id.toString() === item.variantId.toString()
      );
      if (variant && variant.stock < quantity) {
        return res.status(400).json({
          status: 'error',
          message: `Only ${variant.stock} item(s) available in stock`,
          availableStock: variant.stock,
        });
      }
    }

    item.quantity = quantity;
    cart.lastActivity = new Date();
    await cart.save();

    const updatedCart = await Cart.findOne({ sessionId }).populate(
      'items.productId',
      'name slug images basePrice variants'
    );

    res.status(200).json({
      status: 'success',
      data: updatedCart,
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Remove item from cart
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const { sessionId, itemId } = req.params;

    const cart = await Cart.findOne({ sessionId });

    if (!cart) {
      return res.status(404).json({
        status: 'error',
        message: 'Cart not found',
      });
    }

    cart.items = cart.items.filter((item: any) => item._id?.toString() !== itemId);
    cart.lastActivity = new Date();
    await cart.save();

    const updatedCart = await Cart.findOne({ sessionId }).populate(
      'items.productId',
      'name slug images basePrice variants'
    );

    res.status(200).json({
      status: 'success',
      data: updatedCart,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Clear cart
export const clearCart = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    const cart = await Cart.findOne({ sessionId });

    if (!cart) {
      return res.status(404).json({
        status: 'error',
        message: 'Cart not found',
      });
    }

    cart.items = [];
    cart.lastActivity = new Date();
    await cart.save();

    res.status(200).json({
      status: 'success',
      data: cart,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
