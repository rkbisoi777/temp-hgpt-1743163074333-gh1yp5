import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Property } from '../types';
import { PropertyCard } from '../components/property/PropertyCard';
import { ArrowLeft, Filter } from 'lucide-react';
import { PropertyFilter } from '../components/property/PropertyFilter'; 
import { applyPropertyFilter } from '../utils/filterProperties'; 

interface PropertiesProps {
  fromHome?: boolean;
  preloadedProperties?: Property[];
}

export function Properties({ fromHome = false, preloadedProperties }: PropertiesProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[] | null>(null);
  const [filteredProperties, setFilteredProperties] = useState<Property[] | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 100000], 
    furnished: false,
    bedrooms: 0, 
  });

  useEffect(() => {
    if (fromHome && preloadedProperties) {
      setProperties(preloadedProperties);
      setFilteredProperties(preloadedProperties);
    } else if (location.state?.properties) {
      const props = location.state.properties as Property[];
      setProperties(props);
      setFilteredProperties(props);
    } else {
      navigate('/');
    }
  }, [fromHome, preloadedProperties, location.state?.properties, navigate]);

  const applyFilters = () => {
    if (properties) {
      const filtered = applyPropertyFilter(properties, filters);
      setFilteredProperties(filtered);
      setFilterOpen(false);
    }
  };

  const closeFilter = () => {
    setFilterOpen(false);
  };

  if (!properties) {
    return null; 
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {!fromHome && (
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-500 mb-6"
          aria-label="Go back to previous page"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProperties &&
          filteredProperties.length > 0 &&
          filteredProperties.map((property) => (
            <PropertyCard key={property.id} propertyId={property.id} />
          ))}
        {filteredProperties && filteredProperties.length === 0 && (
          <p>No properties found with the selected filters.</p>
        )}
      </div>

      <button
        onClick={() => setFilterOpen(true)}
        className="fixed bottom-4 left-4 bg-white text-blue-600 border border-gray-200 rounded-full p-3 shadow-lg hover:bg-gray-50"
        aria-label="Open filter options"
      >
        <Filter  className='w-5 h-5' />
      </button>

      {filterOpen && (
        <PropertyFilter
          filters={filters}
          setFilters={setFilters}
          applyFilters={applyFilters}
          closeFilter={closeFilter}
        />
      )}
    </div>
  );
}
