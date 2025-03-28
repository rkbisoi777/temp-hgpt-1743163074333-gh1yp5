import React, { useState } from 'react';

interface PropertyGalleryProps {
  images?: string[];
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images }) => {
  const defaultImages = [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1600",
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1600",
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1600"
  ];

  const galleryImages = images && images.length > 0 ? images : defaultImages;

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const showPrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1));
  };

  const showNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1));
  };

  return (
     <div className="rounded-lg border border-gray-300 bg-white shadow-lg overflow-hidden p-3 mt-4">
       <h2 className="text-lg font-semibold mb-2">Property Gallery</h2>
    <div className="w-full max-w-3xl mx-auto">
      {/* Image Slider */}
      <div className=" overflow-hidden">
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4">
          {galleryImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Property image ${index + 1}`}
              className="w-full h-64 object-cover snap-center cursor-pointer rounded-lg border border-gray-300"
              onClick={() => openModal(index)}
            />
          ))}
        </div>
        <div className="text-center mt-2 text-gray-600">
          {galleryImages.length} {galleryImages.length === 1 ? 'Image' : 'Images'}
        </div>
      </div>

      {/* Fullscreen Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            <i className="fas fa-times"></i>
          </button>
          <button
            onClick={showPrevImage}
            className="absolute left-4 text-white text-4xl z-10"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="flex flex-col items-center">
            <img
              src={galleryImages[currentIndex]}
              alt={`Fullscreen Property Image ${currentIndex + 1}`}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
            />
            <div className="text-white mt-2">
              {currentIndex + 1} / {galleryImages.length}
            </div>
          </div>
          <button
            onClick={showNextImage}
            className="absolute right-4 text-white text-4xl z-10"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
     </div>
  );
};

export default PropertyGallery;


