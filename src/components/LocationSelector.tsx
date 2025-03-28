import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

const INDIAN_CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat',
  'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
  'Bhopal', 'Visakhapatnam', 'Noida', 'Gurgaon', 'Kochi'
];

export function LocationSelector() {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Attempt to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
            );
            const data = await response.json();
            const city = data.city;
            if (city && INDIAN_CITIES.includes(city)) {
              setSelectedCity(city);
            } else {
              setSelectedCity('Mumbai'); // Default to Mumbai if city not in list
            }
          } catch (error) {
            console.error('Error fetching location:', error);
            setSelectedCity('Mumbai');
          }
        },
        () => {
          setSelectedCity('Mumbai');
        }
      );
    } else {
      setSelectedCity('Mumbai');
    }
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200 shadow-sm transition-colors"
      >
        <MapPin className="w-3.5 h-3.5" />
        <span>{selectedCity || 'Select City'}</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-1 w-48 py-1 bg-white rounded-lg shadow-lg border border-gray-200 z-20 max-h-64 overflow-y-auto">
            {INDIAN_CITIES.map((city) => (
              <button
                key={city}
                onClick={() => {
                  setSelectedCity(city);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 ${
                  selectedCity === city ? 'text-blue-500 font-medium' : 'text-gray-700'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}