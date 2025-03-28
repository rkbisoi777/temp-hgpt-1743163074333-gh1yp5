import React from 'react';

interface PropertyFilterProps {
  filters: {
    priceRange: number[];
    furnished: boolean;
    bedrooms: number;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    priceRange: number[];
    furnished: boolean;
    bedrooms: number;
  }>>;
  applyFilters: () => void;
  closeFilter: () => void;
}

export const PropertyFilter: React.FC<PropertyFilterProps> = ({
  filters,
  setFilters,
  applyFilters,
  closeFilter,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Filter Properties</h2>

        {/* Price Range Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Price Range</label>
          <div className="flex gap-2 mt-2">
            <input
              type="number"
              value={filters.priceRange[0]}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  priceRange: [parseInt(e.target.value), prev.priceRange[1]],
                }))
              }
              className="w-1/2 border rounded px-2 py-1"
              placeholder="Min"
            />
            <input
              type="number"
              value={filters.priceRange[1]}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  priceRange: [prev.priceRange[0], parseInt(e.target.value)],
                }))
              }
              className="w-1/2 border rounded px-2 py-1"
              placeholder="Max"
            />
          </div>
        </div>

        {/* Furnished Filter */}
        <div className="mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.furnished}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, furnished: e.target.checked }))
              }
              className="rounded"
            />
            Furnished
          </label>
        </div>

        {/* Bedrooms Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Bedrooms</label>
          <select
            value={filters.bedrooms}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, bedrooms: parseInt(e.target.value) }))
            }
            className="w-full border rounded px-2 py-1"
          >
            <option value={0}>Any</option>
            <option value={1}>1 BHK</option>
            <option value={2}>2 BHK</option>
            <option value={3}>3 BHK</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={closeFilter}
            className="px-4 py-2 text-gray-500 border border-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={applyFilters}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
