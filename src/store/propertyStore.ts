// import { create } from 'zustand';
// import type { Property } from '../types/database';
// import { propertyService } from '../lib/propertyService';

// interface PropertyStore {
//   properties: Property[];
//   isLoading: boolean;
//   error: string | null;
//   wishlist: Property[];
//   compareList: Property[];
//   fetchProperties: () => Promise<void>;
//   searchProperties: (query: string) => Promise<Property[]>;
//   getPropertyById: (id: string) => Promise<Property | null>;
//   addToWishlist: (property: Property) => void;
//   removeFromWishlist: (propertyId: string) => void;
//   addToCompare: (property: Property) => boolean;
//   removeFromCompare: (propertyId: string) => void;
//   isInWishlist: (propertyId: string) => boolean;
//   isInCompareList: (propertyId: string) => boolean;
// }

// export const usePropertyStore = create<PropertyStore>((set, get) => ({
//   properties: [],
//   isLoading: false,
//   error: null,
//   wishlist: [],
//   compareList: [],

//   fetchProperties: async () => {
//     try {
//       set({ isLoading: true, error: null });
//       const properties = await propertyService.getAllProperties();
//       set({ properties });
//     } catch (error) {
//       set({ error: (error as Error).message });
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   searchProperties: async (query) => {
//     try {
//       set({ isLoading: true, error: null });
//       const properties = await propertyService.searchProperties(query);
//       return properties;
//     } catch (error) {
//       set({ error: (error as Error).message });
//       return [];
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   getPropertyById: async (id) => {
//     try {
//       set({ isLoading: true, error: null });
//       const property = await propertyService.getPropertyById(id);
//       return property;
//     } catch (error) {
//       set({ error: (error as Error).message });
//       return null;
//     } finally {
//       set({ isLoading: false });
//     }
//   },
  
//   addToWishlist: (property) => {
//     set((state) => ({
//       wishlist: state.wishlist.some(p => p.id === property.id) 
//         ? state.wishlist 
//         : [...state.wishlist, property]
//     }));
//   },
  
//   removeFromWishlist: (propertyId) => {
//     set((state) => ({
//       wishlist: state.wishlist.filter(p => p.id !== propertyId)
//     }));
//   },
  
//   addToCompare: (property) => {
//     const { compareList } = get();
//     if (compareList.length >= 5) return false;
    
//     set((state) => ({
//       compareList: state.compareList.some(p => p.id === property.id)
//         ? state.compareList
//         : [...state.compareList, property]
//     }));
//     return true;
//   },
  
//   removeFromCompare: (propertyId) => {
//     set((state) => ({
//       compareList: state.compareList.filter(p => p.id !== propertyId)
//     }));
//   },
  
//   isInWishlist: (propertyId) => {
//     return get().wishlist.some(p => p.id === propertyId);
//   },
  
//   isInCompareList: (propertyId) => {
//     return get().compareList.some(p => p.id === propertyId);
//   }
// }));


import { create } from 'zustand';
import { propertyService } from '../lib/propertyService';
import { WishlistService } from '../lib/WishlistService';
import { CompareService } from '../lib/CompareService';
import { supabase } from '../lib/supabaseClient';
import { Property } from '../types';


interface PropertyStore {
  properties: Property[];
  isLoading: boolean;
  error: string | null;
  wishlist: Property[];
  compareList: Property[];
  fetchProperties: () => Promise<void>;
  searchProperties: (query: string) => Promise<Property[]>;
  getPropertyById: (id: string) => Promise<Property | null>;
  addToWishlist: (property: Property) => Promise<boolean>;
  removeFromWishlist: (propertyId: string) => void;
  addToCompare: (property: Property) => Promise<boolean>;
  removeFromCompare: (propertyId: string) => void;
  isInWishlist: (propertyId: string) => Promise<boolean>;
  isInCompareList: (propertyId: string) => Promise<boolean>;
}

export const usePropertyStore = create<PropertyStore>((set) => ({
  properties: [],
  isLoading: false,
  error: null,
  wishlist: [],
  compareList: [],

  // Fetch properties
  fetchProperties: async () => {
    try {
      set({ isLoading: true, error: null });
      const properties = await propertyService.getAllProperties();
      set({ properties });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  // Search properties
  searchProperties: async (query) => {
    try {
      set({ isLoading: true, error: null });
      const properties = await propertyService.searchProperties(query);
      return properties;
    } catch (error) {
      set({ error: (error as Error).message });
      return [];
    } finally {
      set({ isLoading: false });
    }
  },

  // Get property by ID
  getPropertyById: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const property = await propertyService.getPropertyById(id);
      return property;
    } catch (error) {
      set({ error: (error as Error).message });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
  
  // Add to wishlist
  addToWishlist: async (property: Property): Promise<boolean> => { 
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user.id
    if(userId){
      try {
        const wList = await WishlistService.getWishlist(userId);
        if (wList.length >= 15) return false; // Limit to 15 properties
        const updatedWishlist = await WishlistService.addItemsToWishlist(userId, [property.id]);
        set({wishlist: updatedWishlist});
        return true;
      } catch (error) {
        set({ error: 'Failed to add property to wishlist' });
        return false;
      }
    }
    return false;
    
  },
  
  // Remove from wishlist
  removeFromWishlist: async (propertyId) => {
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user.id
    if(userId){
      try {
        const updatedWishlist = await WishlistService.removeItemsFromWishlist(userId, [propertyId]);
        set({ wishlist: updatedWishlist });
      } catch (error) {
        set({ error: 'Failed to remove property from wishlist' });
      }
    }
  },

  // Add to compare
  addToCompare: async (property: Property): Promise<boolean> => {
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user.id
    
    if(userId){
      try {
        const compareList = await CompareService.getCompare(userId);
        // const compareCount = Array.isArray(compareList.length)
        if (compareList.length >= 5) return false; // Limit to 5 properties
        const updatedCompareList = await CompareService.addItemsToCompare(userId, [property.id]);
        set({ compareList: updatedCompareList });
        return true;
      } catch (error) {
        set({ error: 'Failed to add property to compare list' });
        return false;
      }
    }

    return false;
    
  },

  // Remove from compare
  removeFromCompare: async (propertyId) => {
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user.id
    if(userId){
      try {
        const updatedCompareList = await CompareService.removeItemsFromCompare(userId, [propertyId]);
        set({ compareList: updatedCompareList });
      } catch (error) {
        set({ error: 'Failed to remove property from compare list' });
      }
    }
  },

  // Check if property is in wishlist
  isInWishlist: async(propertyId) => {
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user.id
    if(userId){
      try {
        const isExist = await WishlistService.doesItemExist(userId, propertyId);
        if(isExist) return true;
        
      }catch (error) {
        set({ error: 'Failed to remove property from compare list' });
      }
    }
    return false
  },

  // Check if property is in compare list
  isInCompareList: async(propertyId) => {
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user.id
    if(userId){
      try {
        const isExist = await CompareService.doesItemExist(userId, propertyId);
        if(isExist) return true;
        
      }catch (error) {
        set({ error: 'Failed to remove property from compare list' });
      }
    }
    return false
  }
}));
