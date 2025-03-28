export interface User {
  id: string;
  phone: string;
  email?: string;
  name?: string;
  role?: 'user' | 'developer' | 'admin';
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface ProfileUpdate {
  name?: string;
  phone?: string;
}

export interface Developer {
  id: string;
  company_name: string;
  description?: string;
  logo_url?: string;
  website?: string;
  established_year?: number;
  total_projects: number;
  completed_projects: number;
  ongoing_projects: number;
  specializations: string[];
  certifications: string[];
  social_media: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  created_at: string;
  updated_at: string;
}