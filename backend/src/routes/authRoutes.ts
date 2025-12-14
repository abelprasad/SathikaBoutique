import express from 'express';
import {
  registerAdmin,
  loginAdmin,
  getCurrentAdmin,
  logoutAdmin
} from '../controllers/authController';
import { authenticateAdmin } from '../middleware/auth';

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new admin
 * @access  Public (should be restricted in production)
 * @note    Consider protecting this route or disabling it after initial setup
 */
router.post('/register', registerAdmin);

/**
 * @route   POST /api/auth/login
 * @desc    Login admin and get JWT token
 * @access  Public
 */
router.post('/login', loginAdmin);

/**
 * @route   GET /api/auth/me
 * @desc    Get current authenticated admin details
 * @access  Private (requires authentication)
 */
router.get('/me', authenticateAdmin, getCurrentAdmin);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout admin
 * @access  Private (requires authentication)
 */
router.post('/logout', authenticateAdmin, logoutAdmin);

export default router;
