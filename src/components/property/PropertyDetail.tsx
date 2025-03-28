import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PropertyStats } from './PropertyStats';
import { PropertyHeader } from './PropertyHeader';
import { PropertyActions } from './PropertyActions';
import { PropertyGraph } from '../report/PropertyGraph';
import { PropertyDescriptionCard } from '../report/PropertyDescriptionCard';
import { usePropertyStore } from '../../store/propertyStore';
import { PropertyTabs } from './PropertyTabs';
import PropertyGallery from './PropertyGallery';
import OverviewCard from '../report/OverviewCardProps';
import FloorPlan from '../report/FloorPlan';
import Amenities from '../report/Amenities';
import FAQ from '../report/FAQ';
import { PropertyChatButton } from '../chat/PropertyChatButton';
import { Property, PropertyImageMetadata } from '../../types';
import { NeighborhoodMap } from './NeighborhoodMap';
import { PropertyScore } from '../report/PropertyScore';
import mockPriceTendData from '../../mockData/priceTendData';
import LocationOverview from '../report/LocationOverview';
import DeveloperOverview from '../report/DeveloperOverview';
import PropertyOverview from '../report/PropertyOverview';
import { FetchDetailsError, FetchDetailsResult, fetchPropertyDetails } from '../../lib/property-detail';
import { convertToCroreAndLakh } from '../../lib/utils';
import { fetchPropertyImages } from '../../utils/propertyUtils';


export function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPropertyById } = usePropertyStore();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('OverviewCard');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [propertyOverview, setPropertyOverview] = useState<FetchDetailsResult>();
  const [propertyOverviewString, setPropertyOverviewString] = useState<string>();

  // Section Refs
  const graphRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const overviewRef = useRef<HTMLDivElement | null>(null);
  const descriptionRef = useRef<HTMLDivElement | null>(null);
  const floorPlanRef = useRef<HTMLDivElement | null>(null);
  const locationOverviewRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const amenitiesRef = useRef<HTMLDivElement | null>(null);
  const faqRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const scoreRef = useRef<HTMLDivElement | null>(null);
  const [propertyImages, setPropertyImages] = useState<PropertyImageMetadata[]>([]);

  // Track all section refs in a map for easy access
  const sectionRefs = {
    OverviewCard: overviewRef,
    FloorPlan: floorPlanRef,
    LocationOverview: locationOverviewRef,
    NeighborhoodMap: mapRef,
    PropertyGallery: galleryRef,
    Amenities: amenitiesRef,
    FAQ: faqRef,
    PropertyGraph: graphRef,
    LocalityStats: statsRef
  };

  useEffect(() => {
    const fetchProperty = async () => {
      if (id) {
        try {
          const data = await getPropertyById(id);
          if (data) {

            const images = await fetchPropertyImages(id);
            setPropertyImages(images);

            setProperty({
              ...data,
              id: data.id,
              title: data.title,
              price_min: data.price_min,
              price_max: data.price_max,
              location: data.location,
              bedrooms_min: data.bedrooms_min,
              bedrooms_max: data.bedrooms_max,
              sqft_min: data.sqft_min,
              sqft_max: data.sqft_max,
              description: data.description,
              latitude: data.latitude,
              longitude: data.longitude,
              developer_name: data.developer_name,
              area: data.area,
              ai_overview: data.ai_overview,
              amenities: data.amenities
            });
            if (data.ai_overview === null || data.ai_overview === '') {
              try {
                const propOverview: FetchDetailsResult | FetchDetailsError = await fetchPropertyDetails({
                  ...data,
                  id: data.id,
                  title: data.title,
                  price_min: data.price_min,
                  price_max: data.price_max,
                  location: data.location,
                  bedrooms_min: data.bedrooms_min,
                  bedrooms_max: data.bedrooms_max,
                  sqft_min: data.sqft_min,
                  sqft_max: data.sqft_max,
                  description: data.description,
                  latitude: data.latitude,
                  longitude: data.longitude,
                  developer_name: data.developer_name,
                  area: data.area
                });
                setPropertyOverview(propOverview as FetchDetailsResult)
                setPropertyOverviewString(JSON.stringify(propOverview))
              } catch (e) {
                console.error('Error fetching property overview from Gemini:', e);
              }
            } else {
              setPropertyOverview(JSON.parse(data.ai_overview) as FetchDetailsResult)
              setPropertyOverviewString(data.ai_overview)
            }
          }
        } catch (error) {
          console.error('Error fetching property:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProperty();
  }, [id, getPropertyById]);

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

  // Set up Intersection Observer to track which section is visible
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50% 0px', 
      threshold: 0.05 
    };

    // Create observers for each section
    Object.entries(sectionRefs).forEach(([tabId, ref]) => {
      if (ref.current) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveTab(tabId);
            }
          });
        }, observerOptions);

        observer.observe(ref.current);
        observers.push(observer);
      }
    });

    // Clean up observers on component unmount
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [property]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading property details...</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Property not found</div>
      </div>
    );
  }

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    const ref = sectionRefs[tab as keyof typeof sectionRefs];
    ref?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="max-w-full mx-auto p-4 space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-row justify-start">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="md:text-2xl sm:text-xl text-xl font-bold break-words ml-2">{property.title}</h1>
          </div>
          
          <PropertyActions property={property} />
        </div>

        <div className="aspect-video w-full max-h-[400px] md:max-h-[550px] lg:max-h-[720px] rounded-lg overflow-hidden border border-gray-300">
          <div className="relative w-full h-full">
            {propertyImages.map((image, index) => (
              <div key={image.id} className="absolute top-0 left-0 w-full h-full">
                <img
                  src={image.public_url || ''}
                  alt={image.label || property.title}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                  loading="lazy"
                />
                {index === currentImageIndex && image.label && (
                  <div className="absolute top-2 right-2 text-white text-[10px] font-semibold bg-black bg-opacity-50 rounded-xl px-1.5 py-0.5">
                    {image.label}
                  </div>
                )}
              </div>
            ))}
            <div className="absolute bottom-2 right-2 text-white text-[10px] font-semibold bg-black bg-opacity-50 rounded-xl px-1.5 py-0.5">
              {currentImageIndex + 1}/{propertyImages.length}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <PropertyHeader property={property} />
          {/* <PropertyStats property={property} /> */}
        </div>

        <div className="sticky top-16 z-50 bg-white rounded-md shadow-md">
          <PropertyTabs activeTab={activeTab} onTabClick={handleTabClick} />
        </div>

        <div>
          <div ref={scoreRef}>
            <PropertyScore propertyScore={(propertyOverview as unknown as FetchDetailsResult).propertyScores} />
          </div>
          <div ref={descriptionRef}>
            {/* <PropertyDescriptionCard title={property.title} description={property.description} /> */}
            <PropertyOverview property={property} propertyOverview={propertyOverview?.propertyDetails?.propertyOverview || ''} />
          </div>
          <div ref={overviewRef}>
            <OverviewCard
              projectName={property.title}
              projectArea={` ${property.area} acres`}
              sizes={`${property.sqft_min} - ${property.sqft_max} sq.ft.`}
              projectSize="2 Buildings - 760 units"
              launchDate={`${property.launch_date}`}
              avgPrice={`${convertToCroreAndLakh(property.avg_price)}`}
              possessionStarts={`${property.possession_start}`}
              configurations="1, 2 BHK Apartments"
              reraId={property.RERA}
            />
          </div>

          <div ref={floorPlanRef}>
            <FloorPlan />
          </div>

          {/* <div ref={locationOverviewRef}>
            <LocationOverview location={property.location} locationOverview={propertyOverview?.locationDetails?.locationOverview || ''} />
          </div> */}

          <div ref={mapRef}>
            <LocationOverview location={property.location} locationOverview={propertyOverview?.locationDetails?.locationOverview || ''} />
            <NeighborhoodMap
              latitude={property.latitude || 19.0760}
              longitude={property.longitude || 72.8777}
              propertyTitle={property.title}
            />
          </div>

          <div ref={galleryRef}>
            <PropertyGallery images={[]} />
          </div>

          {/* <div ref={statsRef}>
            <LocalityStats propertyId={property.id} />
          </div> */}

          <div ref={amenitiesRef}>
            <Amenities amenitiesList={property.amenities} />
          </div>

          <div ref={graphRef}>
            <PropertyGraph propertyId={property.id} data={mockPriceTendData} />
          </div>

          <div ref={faqRef}>
            <DeveloperOverview devloperOverview={propertyOverview?.developerDetails.developerOverview || ''} developer={property.developer_name} />
            {/* <FAQ /> */}
          </div>

          {/* <p>
            {propertyOverviewString}
          </p> */}
        </div>
      </div>

      <PropertyChatButton property={property} />
    </>
  );
}