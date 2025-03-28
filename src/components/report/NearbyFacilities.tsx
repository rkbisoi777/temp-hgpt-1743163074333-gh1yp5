import { useEffect, useState } from "react";

// Define the structure of a facility
interface Facility {
  id: string; // Unique identifier for each facility
  name: string;
  rating: number; // Rating for the facility (could be 1-5 or similar)
  distance: string;
}

// Define the props type for NearbyFacilities
interface NearbyFacilitiesProps {
  propertyId: string;
}

// Define the structure for the facilities state
interface Facilities {
  school: Facility[];
  gym: Facility[];
  hospital: Facility[];
  playground: Facility[];
  "train station": Facility[];
  "bus stop": Facility[];
}

export function NearbyFacilities({ propertyId }: NearbyFacilitiesProps) {
  // Correctly type the facilities state
  const [facilities, setFacilities] = useState<Facilities>({
    school: [
      { id: '1', name: 'XYZ School', rating: 4.5, distance: '500m' },
      { id: '2', name: 'ABC International School', rating: 4.2, distance: '1km' },
    ],
    gym: [
      { id: '3', name: 'ABC Gym', rating: 4.2, distance: '300m' },
      { id: '4', name: 'Powerhouse Fitness', rating: 4.6, distance: '800m' },
    ],
    hospital: [
      { id: '5', name: 'City Hospital', rating: 3.8, distance: '1km' },
      { id: '6', name: 'Green Valley Medical Center', rating: 4.0, distance: '2km' },
    ],
    playground: [
      { id: '7', name: 'Central Playground', rating: 4.0, distance: '700m' },
      { id: '8', name: 'City Park Playground', rating: 4.3, distance: '1.2km' },
    ],
    "train station": [
      { id: '9', name: 'Main Train Station', rating: 4.6, distance: '2km' },
      { id: '10', name: 'Eastside Train Station', rating: 4.0, distance: '1.5km' },
    ],
    "bus stop": [
      { id: '11', name: 'Bus Stop 5', rating: 4.0, distance: '200m' },
      { id: '12', name: 'Bus Stop 10', rating: 3.9, distance: '450m' },
    ],
  });

  // Correctly type the selectedTab to be one of the keys of the facilities object
  const [selectedTab, setSelectedTab] = useState<keyof Facilities>("school"); // Default to 'school'

  useEffect(() => {
    // Mock fetch facilities data (replace with an actual API call later)
  }, [propertyId]);

  // List of all available types for the tabs
  const tabTypes: (keyof Facilities)[] = ['school', 'gym', 'hospital', 'playground', 'train station', 'bus stop'];

  return (
    <div className="rounded-lg border border-gray-300 bg-white shadow-lg overflow-hidden p-3 mt-4">
      <h2 className="text-lg font-semibold mb-2">Nearby Facilities</h2>

      {/* Tab buttons for switching facility types */}
      <div className="flex space-x-2 mb-4 h-8 text-sm">
    {tabTypes.map((type) => (
      <button
        key={type}
        onClick={() => setSelectedTab(type)}
        className={`px-2 py-1 border rounded ${
          selectedTab === type ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </button>
    ))}
  </div>

      {/* List the facilities of the selected type */}
      <div className="text-sm">
         <ul>
        {facilities[selectedTab].map((facility) => (
          <li key={facility.id} className="mb-2">
            <div className="font-semibold">{facility.name}</div>
            <div>Rating: {facility.rating} stars</div>
            <div>Distance: {facility.distance}</div>
          </li>
        ))}
      </ul>
      </div>
     
    </div>
  );
}
