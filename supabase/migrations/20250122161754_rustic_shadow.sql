/*
  # Enhanced Property Details Schema

  1. New Columns
    - property_name
    - developer_name
    - property_type
    - status
    - amenities (jsonb)
    - possession_date
    - furnishing_status
    - property_url
    - latitude
    - longitude
    - images (jsonb)
    - contact_details (jsonb)
    - nearby_landmarks
    - availability
    - tags (jsonb)
    - area

  2. Security
    - Maintains existing RLS policies
*/

ALTER TABLE properties
ADD COLUMN IF NOT EXISTS property_name text,
ADD COLUMN IF NOT EXISTS developer_name text,
ADD COLUMN IF NOT EXISTS property_type text,
ADD COLUMN IF NOT EXISTS status text,
ADD COLUMN IF NOT EXISTS amenities jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS possession_date date,
ADD COLUMN IF NOT EXISTS furnishing_status text,
ADD COLUMN IF NOT EXISTS property_url text,
ADD COLUMN IF NOT EXISTS latitude numeric,
ADD COLUMN IF NOT EXISTS longitude numeric,
ADD COLUMN IF NOT EXISTS images jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS contact_details jsonb,
ADD COLUMN IF NOT EXISTS nearby_landmarks text,
ADD COLUMN IF NOT EXISTS availability integer,
ADD COLUMN IF NOT EXISTS tags jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS area numeric;