import { supabase } from "../lib/supabaseClient";

export const fetchPropertyImages = async (propertyId: string) => {
  try {
    const { data, error } = await supabase
      .from('property_images_metadata')
      .select('*')
      .eq('property_id', propertyId)
      .order('created_at', { ascending: true }); // Optional: order by creation time

    if (error) {
      console.error('Error fetching property images:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching property images:', error);
    return [];
  }
};


export const fetchPropertyMainImages = async (propertyId: string) => {
  try {
    const { data, error } = await supabase
      .from('property_images_metadata')
      .select('*')
      .eq('property_id', propertyId)
      .eq('label', 'main')
      .order('created_at', { ascending: true }); // Optional: order by creation time

    if (error) {
      console.error('Error fetching property images:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching property images:', error);
    return [];
  }
};