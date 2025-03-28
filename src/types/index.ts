export interface Property {
  id: string;
  title: string;
  price_min: number;
  price_max: number;
  location: string;
  bedrooms_min: number,
  bedrooms_max: number,
  sqft_min: number;
  sqft_max: number;
  imageUrl: string;
  description: string;
  created_at: string;
  updated_at: string;
  latitude: number;
  longitude: number;
  developer_name: string;
  area: number;
  RERA: string;
  launch_date: Date;
  possession_start: Date;
  avg_price:number;
  ai_overview: string;
  amenities: string[]
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  properties?: Property[];
}


export interface PropertyImageMetadata {
  id: string;
  property_id: string;
  label: string | null;
  file_path: string;
  public_url: string;
  original_name: string;
  file_size: number;
  created_at?: string;
}