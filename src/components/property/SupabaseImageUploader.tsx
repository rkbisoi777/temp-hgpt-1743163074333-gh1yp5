import React, { useState, useCallback, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Trash } from 'lucide-react';

interface ImageMetadata {
  id?: number;
  propertyId: string;
  label: string;
  file?: File;
  previewUrl: string;
  uploadPath?: string;
  publicUrl?: string;
  uploadError?: string;
  isExisting?: boolean;
}

const SupabaseImageUploader: React.FC<{ propertyId: string }> = ({ propertyId }) => {
  const [images, setImages] = useState<ImageMetadata[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch existing images when component mounts
  useEffect(() => {
    const fetchExistingImages = async () => {
      try {
        setLoading(true);
        // Fetch existing images for this property
        const { data, error } = await supabase
          .from('property_images_metadata')
          .select('*')
          .eq('property_id', propertyId);

        if (error) throw error;

        // Transform existing images to match ImageMetadata interface
        const existingImages: ImageMetadata[] = data.map(img => ({
          id: img.id,
          propertyId: img.property_id,
          label: img.label,
          previewUrl: img.public_url,
          uploadPath: img.file_path,
          publicUrl: img.public_url,
          isExisting: true
        }));

        setImages(existingImages);
      } catch (error) {
        console.error('Error fetching existing images:', error);
        alert('Failed to load existing images');
      } finally {
        setLoading(false);
      }
    };

    fetchExistingImages();
  }, [propertyId]);

  const handleImageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files);
      
      // Validate file sizes
      const validFiles = fileArray.filter(file => {
        if (file.size > 2 * 1024 * 1024) {
          alert(`File ${file.name} is too large. Maximum size is 2MB.`);
          return false;
        }
        return true;
      });

      // Limit total number of images to 10
      const remainingSlots = 10 - images.length;
      const newFiles = validFiles.slice(0, remainingSlots);

      // Create upload images with preview URLs and empty label
      const newImages: ImageMetadata[] = newFiles.map(file => ({
        propertyId,
        file,
        label: '',
        previewUrl: URL.createObjectURL(file),
        isExisting: false
      }));

      setImages(prevImages => [...prevImages, ...newImages]);

      // Reset file input
      event.target.value = '';
    }
  }, [images, propertyId]);

  const updateImageLabel = (image: ImageMetadata, label: string) => {
    setImages(prevImages => 
      prevImages.map((img) => 
        img === image ? { ...img, label} : img
      )
    );
  };

  const handleDeleteExistingImage = async (image: ImageMetadata) => {
    if (!image.id) return;

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('propertyimages')
        .remove([image.uploadPath!]);

      // Delete from metadata table
      const { error: dbError } = await supabase
        .from('property_images_metadata')
        .delete()
        .eq('id', image.id);

      if (storageError || dbError) {
        throw (storageError || dbError);
      }

      // Remove from local state
      setImages(prevImages => prevImages.filter(img => img.id !== image.id));
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image');
    }
  };

  const handleRemoveNewImage = useCallback((index: number) => {
    const imageToRemove = images[index];
    
    // Revoke object URL to free memory
    URL.revokeObjectURL(imageToRemove.previewUrl);

    // Remove the image from the list
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  }, [images]);

  const uploadImages = async () => {
    setUploading(true);
    
    const uploadPromises = images.filter(img => !img.isExisting).map(async (image) => {
      if (image.uploadPath) return image; // Skip already uploaded images

      try {
        // Validate label
        if (!image.label.trim()) {
          throw new Error('Label is required for each image');
        }

        // Validate file size again (double-check)
        if (image.file && image.file.size > 2 * 1024 * 1024) {
          throw new Error('File size must be under 2MB');
        }

        // Generate a unique filename
        const fileExt = image.file?.name.split('.').pop();
        const fileName = `${image.propertyId}_${Math.random().toString(36).substr(2)}.${fileExt}`;
        const filePath = `propertyimages/${image.propertyId}/${fileName}`;

        // Upload to Supabase storage
        const { error } = await supabase.storage
          .from('propertyimages')
          .upload(filePath, image.file!, {
            metadata: {
              propertyId: image.propertyId,
              label: image.label,
              originalName: image.file?.name
            }
          });

        if (error) throw error;

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('propertyimages')
          .getPublicUrl(filePath);

        // Store metadata in a separate table
        const { error: metadataError } = await supabase
          .from('property_images_metadata')
          .insert({
            property_id: image.propertyId,
            label: image.label,
            file_path: filePath,
            public_url: urlData?.publicUrl,
            original_name: image.file?.name,
            file_size: image.file?.size
          });

        if (metadataError) throw metadataError;

        return {
          ...image,
          isExisting: true,
          uploadPath: filePath,
          publicUrl: urlData?.publicUrl
        };
      } catch (error) {
        return {
          ...image,
          uploadError: error instanceof Error ? error.message : 'Upload failed'
        };
      }
    });

    // Wait for all uploads to complete
    const uploadedImages = await Promise.all(uploadPromises);
    setImages(prevImages => 
      prevImages.map(img => 
        uploadedImages.find(uploaded => uploaded.previewUrl === img.previewUrl) || img
      )
    );
    setUploading(false);
    setIsModalOpen(false);
  };

  if (loading) {
    return <div className="p-4 text-center">Loading images...</div>;
  }

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors shadow-md"
      >
        Upload Images
      </button>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Modal Content */}
          <div 
            className="bg-white rounded-lg p-6 w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upload Property Images</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
            </div>

            {/* Existing Images Section */}
            {images.filter(img => img.isExisting).length > 0 && (
              <div className="mb-6">
                <h3 className="text-md font-semibold mb-2">Existing Images</h3>
                <div className="flex space-x-4 overflow-x-auto pb-4">
                  {images.filter(img => img.isExisting).map((image, index) => (
                    <div key={`existing-${index}`} className="relative group w-32 flex-shrink-0">
                      <img 
                        src={image.previewUrl} 
                        alt={`Existing image ${index + 1}`} 
                        className="w-32 h-32 object-cover rounded border-2 border-green-500" 
                      />
                      <button
                        onClick={() => handleDeleteExistingImage(image)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full 
                                   opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        aria-label="Delete image"
                      >
                        <Trash className='h-4 w-4'/>
                      </button>
                      <input 
                        type="text"
                        placeholder="Enter image label"
                        value={image.label}
                        onChange={(e) => updateImageLabel(image, e.target.value)}
                        className="w-full border p-1 rounded mt-2 text-sm"
                        required
                      />
                      {/* <div className="mt-2 text-sm text-center truncate">{image.label}</div> */}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Images Section */}
            {images.filter(img => !img.isExisting).length > 0 && (
              <div className="mb-6">
                <h3 className="text-md font-semibold mb-2">New Images</h3>
                <div className="flex space-x-4 overflow-x-auto pb-4">
                  {images.filter(img => !img.isExisting).map((image, index) => (
                    <div key={`new-${index}`} className="relative group w-32 flex-shrink-0">
                      <img 
                        src={image.previewUrl} 
                        alt={`New image ${index + 1}`} 
                        className="w-32 h-32 object-cover rounded border-2 border-blue-500" 
                      />
                      <button
                        onClick={() => handleRemoveNewImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full 
                                   opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        aria-label="Remove image"
                      >
                        ✕
                      </button>
                      <input 
                        type="text"
                        placeholder="Enter image label"
                        value={image.label}
                        onChange={(e) => updateImageLabel(image, e.target.value)}
                        className="w-full border p-1 rounded mt-2 text-sm"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* File Input */}
            <div className="flex items-center space-x-4 mb-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="flex-grow file:mr-4 file:rounded file:border-0 file:bg-blue-50 file:px-4 file:py-2 
                           file:text-blue-700 hover:file:bg-blue-100"
                disabled={images.length >= 10}
              />
              {images.length >= 10 && (
                <p className="text-red-500 text-sm">
                  Maximum of 10 images reached
                </p>
              )}
            </div>

            {/* Upload Button */}
            {images.filter(img => !img.isExisting).length > 0 && (
              <button
                onClick={uploadImages}
                disabled={uploading || images.some(img => !img.isExisting && !img.label.trim())}
                className="w-full bg-blue-500 text-white p-2 rounded 
                           hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
              >
                {uploading ? 'Uploading...' : 'Upload New Images'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SupabaseImageUploader;