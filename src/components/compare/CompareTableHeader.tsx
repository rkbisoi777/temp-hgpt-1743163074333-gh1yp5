import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Property } from '../../types';
import { usePropertyStore } from '../../store/propertyStore';

interface CompareTableHeaderProps {
  propertyIds: string[];
  onRemove: (id: string) => void;
}

export function CompareTableHeader({ propertyIds, onRemove }: CompareTableHeaderProps) {
  const { getPropertyById } = usePropertyStore();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedProperties = await Promise.all(
          propertyIds.map(async (propertyId) => {
            const prop = await getPropertyById(propertyId);
            return prop ?? null; // Ensure null values are handled
          })
        );

        // Filter out null values before updating the state
        setProperties(fetchedProperties.filter((prop): prop is Property => prop !== null));
      } catch (err) {
        setError('Failed to load properties');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [propertyIds, getPropertyById]);

  return (
    <thead>
      <tr>
        <th className="p-4 text-left bg-gray-50">Features</th>
        {properties.map((property) => (
          <th key={property.id} className="p-4 min-w-[250px]">
            <div className="relative">
              <button
                onClick={() => onRemove(property.id)}
                className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-100 hover:text-red-500"
              >
                <X className='size-4' />
              </button>
              <img
                src={property.imageUrl}
                alt={property.title}
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
              <h3 className="font-semibold">{property.title}</h3>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
