import { Bed, Square } from 'lucide-react';
import { Property } from '../../types';

interface PropertyStatsProps {
  property: Property;
}

export function PropertyStats({ property }: PropertyStatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm px-2">
      <div className="flex items-center">
        <Bed className="w-5 h-5 mr-2 text-gray-500" />
        <div>
          <p className="text-sm text-gray-500">Bedrooms</p>
          <span>{`${property.bedrooms_min} - ${property.bedrooms_max}`}</span>
        </div>
      </div>
      {/* <div className="flex items-center">
        <Bath className="w-5 h-5 mr-2 text-gray-500" />
        <div>
          <p className="text-sm text-gray-500">Bathrooms</p>
          <p className="font-semibold">{property.bathrooms}</p>
        </div>
      </div> */}
      <div className="flex items-center col-span-2 sm:col-span-1">
        <Square className="w-5 h-5 mr-2 text-gray-500" />
        <div>
          <p className="text-sm text-gray-500">Square Feet</p>
          <span>{`${property.sqft_min} - ${property.sqft_max}`}</span>
        </div>
      </div>
    </div>
  );
}