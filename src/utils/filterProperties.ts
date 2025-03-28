// utils/filterProperties.ts

import { Property } from '../types';

interface FilterCriteria {
  priceRange: number[];
  furnished: boolean;
  bedrooms: number;
}

export const applyPropertyFilter = (
  properties: Property[],
  filters: FilterCriteria
): Property[] => {
  return properties.filter((property) => {
    const matchesPrice =
      property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1];
    const matchesFurnished =
      filters.furnished ? property.description.toLowerCase().includes('furnished') : true;
    const matchesBedrooms =
      filters.bedrooms > 0 ? property.bedrooms === filters.bedrooms : true;

    return matchesPrice && matchesFurnished && matchesBedrooms;
  });
};
