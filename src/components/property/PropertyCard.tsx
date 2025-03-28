import { Bed, Square, MapPin, Heart, Scale } from 'lucide-react';
import { Property, PropertyImageMetadata } from '../../types';
import { Link } from 'react-router-dom';
import { usePropertyStore } from '../../store/propertyStore';
import toast from 'react-hot-toast';
import ProgressBar from '../ProgressBar';
import { convertToCroreAndLakh, extractIndianCity } from '../../lib/utils';
import { useEffect, useState, useCallback } from 'react';
import { fetchPropertyImages } from '../../utils/propertyUtils';

// Skeleton Loader Component
const SkeletonCard = () => (
  <div className="animate-pulse bg-gray-200 rounded-lg w-full h-80"></div>
);

interface PropertyCardProps {
  propertyId: string;
}

export function PropertyCard({ propertyId }: PropertyCardProps) {
  const {
    addToWishlist,
    removeFromWishlist,
    addToCompare,
    removeFromCompare,
    isInWishlist,
    isInCompareList,
    getPropertyById,
  } = usePropertyStore();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [inWishlist, setInWishlist] = useState<boolean>(false);
  const [inCompareList, setInCompareList] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [propertyImages, setPropertyImages] = useState<PropertyImageMetadata[]>([]);


  // Fetch property details
  const fetchProperty = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const prop = await getPropertyById(propertyId);
      if (prop) {
        const images = await fetchPropertyImages(propertyId);
        setPropertyImages(images);
        setProperty(prop);
      }
    } catch (err) {
      setError('Failed to load property. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [propertyId, getPropertyById]);

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  useEffect(() => {
    if (propertyImages) {
      const images = Object.values(propertyImages).filter(Boolean);
      if (images.length > 0) {
        const interval = setInterval(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
      }
    }
  }, [property]);

  // Check wishlist & compare list status
  useEffect(() => {
    const checkStatus = async () => {
      setInWishlist(await isInWishlist(propertyId));
      setInCompareList(await isInCompareList(propertyId));
    };
    checkStatus();
  }, [propertyId, isInWishlist, isInCompareList]);

  const handleWishlistClick = async () => {
    if (inWishlist) {
      await removeFromWishlist(propertyId);
      toast.success('Removed from wishlist');
    } else if (property) {
      const added = await addToWishlist(property);
      if (added) {
        toast.success('Added to wishlist');
      } else {
        toast.error('Wishlist list is full (max 15 properties)');
      }
    }
    setInWishlist((prev) => !prev);
    window.dispatchEvent(new Event('wishlistUpdated')); 
  };

  const handleCompareClick = async () => {
    if (inCompareList) {
      await removeFromCompare(propertyId);
      toast.success('Removed from compare list');
    } else if (property) {
      const added = await addToCompare(property);
      if (added) {
        toast.success('Added to compare list');
      } else {
        toast.error('Compare list is full (max 5 properties)');
      }
    }
    setInCompareList((prev) => !prev);
    window.dispatchEvent(new Event('compareUpdated'));
  };

  if (loading) return <SkeletonCard />;
  if (error)
    return (
      <div className="text-red-600 text-center p-4">
        {error}
        <button
          onClick={fetchProperty}
          className="ml-2 text-blue-500 underline"
        >
          Retry
        </button>
      </div>
    );

  return property ? (
    <Link to={`/property/${property.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 relative w-full h-80">
        <div className="relative w-full h-full">
          {/* Image Slider */}
          <div className="relative w-full h-full">
            {propertyImages.map((image, index) => (
              <div key={image.id} className="absolute top-0 left-0 w-full h-full">
                <img
                  src={image.public_url || ''}
                  alt={image.label || property.title}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Current Image Number / Total Images */}
          <div className="absolute bottom-2 right-2 text-white text-[10px] font-semibold bg-black bg-opacity-50 rounded-xl px-1.5 py-0.5">
            {currentImageIndex + 1}/{propertyImages.length}
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-between p-3 text-white">
            {/* Wishlist & Compare Buttons */}
            <div className="absolute flex flex-col top-2 right-2 space-y-2">
            <button
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  handleWishlistClick();
                }}
                className={`p-1 rounded-full transition-colors ${
                  inWishlist ? 'bg-red-100 bg-opacity-50 text-red-500' : 'bg-black bg-opacity-20 text-white hover:bg-gray-200'
                }`}
                title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                aria-label="Like property"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'text-[#ff0000]': 'text-white'}`} fill={inWishlist ? '#FF0000' : 'none'} />
              </button>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  handleCompareClick();
                }}
                className={`p-1 rounded-full transition-colors ${
                  inCompareList ? 'bg-blue-100 bg-opacity-50 text-blue-500' : 'bg-black bg-opacity-20 text-white hover:bg-gray-200'
                }`}
                title={inCompareList ? 'Remove from compare' : 'Add to compare'}
                aria-label="Compare property"
              >
                <Scale className={`w-5 h-5 ${inCompareList ? 'text-[#00a6f4]': 'text-white'}`} fill={inCompareList ? '#00a6f4' : 'none'} />
              </button>
            </div>

            {/* Property Details */}
            <div className="absolute bottom-2 left-2 text-xs space-y-2">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full p-1">
                  <img
                    src="https://i.postimg.cc/cHgZjqp8/output-onlinepngtools.png"
                    alt="HouseGPT"
                    className="w-4 h-4"
                  />
                </div>
                <span className="ml-2 text-lg font-semibold">{property.title}</span>
              </div>
              <div className="flex flex-row gap-2">
                <div className="text-sm font-bold text-sky-600 bg-white px-2 rounded bg-opacity-80">
                {`${convertToCroreAndLakh(property.price_min)} - ${convertToCroreAndLakh(property.price_max)}`}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm font-semibold">{extractIndianCity(property.location)}</span>
                </div>
              </div>
              <div className="flex flex-row space-x-3 text-white">
                <div className="flex items-center font-semibold">
                  <Bed className="w-5 h-5 mr-1" />
                  {property.bedrooms_min == property.bedrooms_max ? (<span>{`${property.bedrooms_min}`}</span>) : (<span>{`${property.bedrooms_min} - ${property.bedrooms_max}`}</span>)}
                </div>
                <div className="flex items-center font-semibold">
                  <Square className="w-5 h-5 mr-1" />
                  <span>{`${property.sqft_min} - ${property.sqft_max} sqft`}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <ProgressBar propertyId={propertyId}  />
          </div>
        </div>
      </div>
    </Link>
  ) : null;
}
