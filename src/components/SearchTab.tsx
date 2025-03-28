import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Properties } from '../pages/Properties';
import { Property } from '../types';
import { propertyService } from '../lib/propertyService';

interface SearchTabProps {
  preloadedProperties?: Property[];
}

export function SearchTab({ preloadedProperties }: SearchTabProps) {
  const [query, setQuery] = useState('');
  const [properties, setProperties] = useState<Property[]>(preloadedProperties || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const results = await propertyService.searchProperties(query);
      setProperties(results);
    } catch (err) {
      console.error('Error searching properties:', err);
      setError('Failed to fetch properties. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="sticky top-16 bg-transparent z-50">
      <form onSubmit={handleSubmit} className="w-full">
      
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find🔍 your perfect👌 dream💭 House🏡!"
            className="flex-1 px-3 py-2 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
        
      </form>
      </div>

      {/* Display spinner when loading */}
      {loading && (
        <div className="flex justify-center items-center mt-6">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {!loading && <Properties fromHome={true} preloadedProperties={properties} />}
    </div>
  );
}
