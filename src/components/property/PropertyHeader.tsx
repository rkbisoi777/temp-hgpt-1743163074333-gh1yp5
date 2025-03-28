import { MapPin } from 'lucide-react';
import { Property } from '../../types';
import { convertToCroreAndLakh } from '../../lib/utils';

interface PropertyHeaderProps {
  property: Property;
}

export function PropertyHeader({ property }: PropertyHeaderProps) {
  return (
    <div className="space-y-1.5 px-2">
      <h1 className="md:text-3xl sm:text-2xl text-2xl font-bold break-words">{property.title}</h1>
      <p className="md:text-2xl sm:text-xl text-xl font-bold text-blue-600">
        {/* ₹{`${property.price_min.toLocaleString()} - ${property.price_max.toLocaleString()}`} */}
         {`${convertToCroreAndLakh(property.price_min)} - ${convertToCroreAndLakh(property.price_max)}`}
      </p>
      <div className="flex items-center text-gray-600 text-sm">
        <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
        <span className="break-words">{property.location}</span>
      </div>
    </div>
  );
}