import { supabase } from "./supabaseClient";


export interface Profile {
  id: string;
  full_name?: string;
  email: string;
  phone_number?: string;
  profile_picture?: string;
  location?: string;
  buy_or_rent?: "Buy" | "Rent";
  property_type?: string;
  budget?: number;
  city?: string;
  locality?: string;
  transport?: string;
  configuration?: string;
  readiness?: string;
  amenities?: string[];
  facilities?: string;
  gated?: boolean;
  environment?: string[];
  appreciation?: number;
  insights?: string;
  additional_info?: string;
  decision_time?: string;
  created_at?: string;
}

export const ProfileService = {
  async createProfile(profile: Profile) {
    const { data, error } = await supabase.from("profiles").insert(profile).select().single();
    if (error) throw error;
    return data;
  },

  async getProfile(id: string) {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single();
    if (error) throw error;
    return data;
  },

  async updateProfile(id: string, updates: Partial<Profile>) {
    const { data, error } = await supabase.from("profiles").update(updates).eq("id", id).select().single();
    if (error) throw error;
    return data;
  },

  async deleteProfile(id: string) {
    const { error } = await supabase.from("profiles").delete().eq("id", id);
    if (error) throw error;
    return true;
  },
};