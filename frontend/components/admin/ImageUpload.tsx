'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useAdminStore } from '@/store/adminStore';

interface ImageData {
  url: string;
  alt: string;
  isPrimary: boolean;
  file?: File;
}

interface ImageUploadProps {
  images: ImageData[];
  onChange: (images: ImageData[]) => void;
  maxImages?: number;
}

export default function ImageUpload({
  images,
  onChange,
  maxImages = 10,
}: ImageUploadProps) {
  const { token } = useAdminStore();
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    await uploadFiles(files);
  };

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    await uploadFiles(files);
  };

  const uploadFiles = async (files: File[]) => {
    if (!token) {
      alert('You must be logged in to upload images');
      return;
    }

    if (images.length + files.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    // Filter only image files
    const imageFiles = files.filter((file) =>
      file.type.startsWith('image/')
    );

    if (imageFiles.length === 0) {
      alert('Please select image files only');
      return;
    }

    setUploading(true);

    try {
      const uploadedImages: ImageData[] = [];

      for (const file of imageFiles) {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/upload/image`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        const data = await response.json();

        if (data.success) {
          uploadedImages.push({
            url: data.data.url,
            alt: file.name.split('.')[0],
            isPrimary: images.length === 0 && uploadedImages.length === 0,
          });
        } else {
          console.error('Upload failed:', data.message);
          alert(`Failed to upload ${file.name}`);
        }
      }

      onChange([...images, ...uploadedImages]);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);

    // If removing primary image, make first image primary
    if (images[index].isPrimary && newImages.length > 0) {
      newImages[0].isPrimary = true;
    }

    onChange(newImages);
  };

  const setPrimaryImage = (index: number) => {
    const newImages = images.map((img, i) => ({
      ...img,
      isPrimary: i === index,
    }));
    onChange(newImages);
  };

  const updateAlt = (index: number, alt: string) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], alt };
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 bg-gray-50'
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-gray-500" />
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700 mb-1">
              Drop images here or click to upload
            </p>
            <p className="text-sm text-gray-500">
              PNG, JPG, WebP or GIF (max 20MB each)
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Maximum {maxImages} images • First image will be primary
            </p>
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || images.length >= maxImages}
          >
            {uploading ? 'Uploading...' : 'Select Images'}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative group border-2 rounded-lg overflow-hidden ${
                image.isPrimary
                  ? 'border-primary-500'
                  : 'border-gray-200'
              }`}
            >
              {/* Image */}
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                {image.url ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${image.url}`}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                )}
              </div>

              {/* Primary Badge */}
              {image.isPrimary && (
                <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  Primary
                </div>
              )}

              {/* Actions Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                {!image.isPrimary && (
                  <button
                    type="button"
                    onClick={() => setPrimaryImage(index)}
                    className="px-3 py-1 bg-white text-gray-900 rounded text-sm font-medium hover:bg-gray-100"
                  >
                    Set Primary
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Alt Text Input */}
              <div className="p-2 bg-white">
                <input
                  type="text"
                  value={image.alt}
                  onChange={(e) => updateAlt(index, e.target.value)}
                  placeholder="Image description"
                  className="w-full text-xs px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
