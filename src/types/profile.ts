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