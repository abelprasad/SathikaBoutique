import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin';
import { AuthRequest } from '../middleware/auth';

/**
 * Generate JWT token for admin
 */
const generateToken = (adminId: string, email: string, role: string): string => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign(
    { id: adminId, email, role },
    jwtSecret,
    { expiresIn: '7d' } // Token expires in 7 days
  );
};

/**
 * Register a new admin (restricted - should be protected or disabled in production)
 * POST /api/auth/register
 */
export const registerAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, role } = req.body;

    // Validate required fields
    if (!email || !password || !name) {
      res.status(400).json({
        success: false,
        message: 'Email, password, and name are required'
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
      return;
    }

    // Validate password strength
    if (password.length < 8) {
      res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long'
      });
      return;
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      res.status(400).json({
        success: false,
        message: 'Admin with this email already exists'
      });
      return;
    }

    // Create new admin
    const admin = new Admin({
      email: email.toLowerCase(),
      password,
      name,
      role: role || 'admin' // Default to 'admin' role
    });

    await admin.save();

    // Generate token
    const token = generateToken(admin._id.toString(), admin.email, admin.role);

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      data: {
        admin: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role
        },
        token
      }
    });
  } catch (error) {
    console.error('Register admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register admin',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Login admin
 * POST /api/auth/login
 */
export const loginAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
      return;
    }

    // Find admin by email
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
      return;
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
      return;
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate token
    const token = generateToken(admin._id.toString(), admin.email, admin.role);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        admin: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
          lastLogin: admin.lastLogin
        },
        token
      }
    });
  } catch (error) {
    console.error('Login admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to login',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get current authenticated admin
 * GET /api/auth/me
 */
export const getCurrentAdmin = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.admin) {
      res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
      return;
    }

    // Fetch full admin details (excluding password)
    const admin = await Admin.findById(req.admin.id).select('-password');

    if (!admin) {
      res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        admin: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
          lastLogin: admin.lastLogin
        }
      }
    });
  } catch (error) {
    console.error('Get current admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get admin details',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Logout admin (client-side token removal, server can optionally blacklist token)
 * POST /api/auth/logout
 */
export const logoutAdmin = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // In a JWT-based system, logout is typically handled client-side by removing the token
    // Optionally, you could implement token blacklisting here

    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to logout',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
