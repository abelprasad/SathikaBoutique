import { Router, Request, Response } from 'express';
import { upload, deleteFile } from '../middleware/upload';
import { authenticateAdmin } from '../middleware/auth';
import path from 'path';

const router = Router();

// Upload single image
router.post(
  '/image',
  authenticateAdmin,
  upload.single('image'),
  (req: Request, res: Response) => {
    try {
      if (!req.file) {
        res.status(400).json({
          success: false,
          message: 'No file uploaded',
        });
        return;
      }

      // Return the file path that can be used in the frontend
      const imageUrl = `/uploads/products/${req.file.filename}`;

      res.status(200).json({
        success: true,
        message: 'Image uploaded successfully',
        data: {
          filename: req.file.filename,
          url: imageUrl,
          size: req.file.size,
          mimetype: req.file.mimetype,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to upload image',
      });
    }
  }
);

// Upload multiple images
router.post(
  '/images',
  authenticateAdmin,
  upload.array('images', 10), // Max 10 images
  (req: Request, res: Response) => {
    try {
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        res.status(400).json({
          success: false,
          message: 'No files uploaded',
        });
        return;
      }

      const uploadedImages = files.map((file) => ({
        filename: file.filename,
        url: `/uploads/products/${file.filename}`,
        size: file.size,
        mimetype: file.mimetype,
      }));

      res.status(200).json({
        success: true,
        message: `${files.length} image(s) uploaded successfully`,
        data: uploadedImages,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to upload images',
      });
    }
  }
);

// Delete image
router.delete('/image/:filename', authenticateAdmin, (req: Request, res: Response) => {
  try {
    const { filename } = req.params;

    // Validate filename to prevent directory traversal
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      res.status(400).json({
        success: false,
        message: 'Invalid filename',
      });
      return;
    }

    deleteFile(filename);

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete image',
    });
  }
});

export default router;
