import React, { useState } from 'react';

const allAmenities = [
  { icon: 'fas fa-building', label: 'Parking' },
  { icon: 'fas fa-ruler-combined', label: 'Swimming Pool' },
  { icon: 'fas fa-cogs', label: 'Gym' },
  { icon: 'fas fa-th-large', label: 'Club House' },
  { icon: 'fas fa-calendar-day', label: 'Play Area' },
  { icon: 'fas fa-dollar-sign', label: 'Security' },
  { icon: 'fas fa-calendar-check', label: 'Power Backup' },
  { icon: 'fas fa-file-alt', label: 'Community Hall' },
  { icon: 'fas fa-tree', label: 'Garden' },
  { icon: 'fas fa-car', label: 'Covered Parking' },
  { icon: 'fas fa-wifi', label: 'Wi-Fi Enabled Zone' },
  { icon: 'fas fa-utensils', label: 'Cafeteria' },
  { icon: 'fas fa-leaf', label: 'Eco-Friendly Design' },
  { icon: 'fas fa-heartbeat', label: 'Health Club' },
  { icon: 'fas fa-shopping-cart', label: 'Retail Outlets' },
];

interface AmenitiesProps {
  amenitiesList: string[];
}

const Amenities: React.FC<AmenitiesProps> = ({ amenitiesList }) => {
  const [showAll, setShowAll] = useState(false);
  
  // Filter the amenities
  const filteredAmenities = allAmenities.filter(amenity => amenitiesList.includes(amenity.label));
  
  const itemsPerRow = 4;
  const rowsToShow = 3;
  const initialVisibleCount = itemsPerRow * rowsToShow;

  const visibleAmenities = showAll ? filteredAmenities : filteredAmenities.slice(0, initialVisibleCount);

  return (
    <div className="rounded-lg border border-gray-300 bg-white shadow-lg overflow-hidden min-h-44 mt-4">
      <h2 className="text-lg font-bold text-gray-800 mb-3 ml-4 mt-2">Project Amenities</h2>
      <div className="px-4 pb-3">
        <div className="grid grid-cols-4 gap-4" style={{ gridTemplateRows: `repeat(${rowsToShow}, auto)` }}>
          {visibleAmenities.map((amenity, index) => (
            <div className="flex flex-col items-center text-center p-1 -mb-2" key={index}>
              <i className={`${amenity.icon} text-lg text-gray-600`} aria-hidden="true"></i>
              <span
                className="block w-16 text-xs font-medium text-gray-600 text-center break-words leading-tight truncate-aminities"
                title={amenity.label}
              >
                {amenity.label}
              </span>
            </div>
          ))}

          {filteredAmenities.length > initialVisibleCount && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex flex-row items-center justify-center text-center text-blue-600 hover:text-blue-800 transition font-medium mb-0.5 mt-1"
              style={{ gridColumn: 'span 4', gridRowEnd: `span 1` }}
            >
              <i className={`fas ${showAll ? 'fa-minus-circle' : 'fa-plus-circle'} text-xs mr-1`}></i>
              <span className="text-xs mb-[1px]">{showAll ? 'View Less' : 'View More'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Amenities;