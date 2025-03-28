// import React from 'react';
// import { Property } from '../../types';
// import { PROPERTY_FEATURES } from '../../constants/propertyFeatures';

// interface CompareTableBodyProps {
//   properties: string[];
// }

// export function CompareTableBody({ properties }: CompareTableBodyProps) {
//   return (
//     <tbody>
//       {PROPERTY_FEATURES.map(({ label, key }) => (
//         <tr key={key} className="border-t">
//           <td className="p-4 font-medium bg-gray-50">{label}</td>
//           {properties.map(property => (
//             <td key={property.id} className="p-4">
//               {key === 'price' 
//                 ? `$${property[key].toLocaleString()}`
//                 : property[key]}
//             </td>
//           ))}
//         </tr>
//       ))}
//     </tbody>
//   );
// }

import { useEffect, useState } from 'react';
import { Property } from '../../types';
import { PROPERTY_FEATURES } from '../../constants/propertyFeatures';
import { usePropertyStore } from '../../store/propertyStore';

interface CompareTableBodyProps {
  propertyIds: string[];
}

export function CompareTableBody({ propertyIds }: CompareTableBodyProps) {
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
            return prop ?? null; // Handle null cases
          })
        );

        // Filter out null values
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

  if (loading) {
    return (
      <tbody>
        <tr>
          <td colSpan={propertyIds.length + 1} className="p-4 text-center">
            Loading properties...
          </td>
        </tr>
      </tbody>
    );
  }

  if (error) {
    return (
      <tbody>
        <tr>
          <td colSpan={propertyIds.length + 1} className="p-4 text-center text-red-500">
            {error}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {PROPERTY_FEATURES.map(({ label, key }) => (
        <tr key={key} className="border-t">
          <td className="p-4 font-medium bg-gray-50">{label}</td>
          {properties.map((property) => (
            <td key={property.id} className="p-4">
              {key === 'price_min' && typeof property[key] === 'number'
                ? `$${property[key].toLocaleString()}`
                : String(property[key] ?? 'N/A')}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
