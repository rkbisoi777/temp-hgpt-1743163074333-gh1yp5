/*
  # Add Developer Schema and Relationships

  1. New Tables
    - `developers` table for storing developer profiles
    - Links to auth.users and properties tables
  
  2. Changes
    - Add developer_name to properties table
    - Add RLS policies for developers
*/

-- Create developers table
CREATE TABLE IF NOT EXISTS developers (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  company_name text NOT NULL,
  description text,
  logo_url text,
  website text,
  established_year integer,
  total_projects integer DEFAULT 0,
  completed_projects integer DEFAULT 0,
  ongoing_projects integer DEFAULT 0,
  specializations jsonb DEFAULT '[]'::jsonb,
  certifications jsonb DEFAULT '[]'::jsonb,
  social_media jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add developer_name to properties
ALTER TABLE properties
ADD COLUMN IF NOT EXISTS developer_name uuid REFERENCES developers(id);

-- Enable RLS
ALTER TABLE developers ENABLE ROW LEVEL SECURITY;

-- Policies for developers table
CREATE POLICY "Developers can view their own profile"
  ON developers
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Developers can update their own profile"
  ON developers
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Public can view all developers"
  ON developers
  FOR SELECT
  TO public
  USING (true);

-- Update properties policies for developers
CREATE POLICY "Developers can insert their own properties"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = developer_name);

CREATE POLICY "Developers can update their own properties"
  ON properties
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = developer_name);

CREATE POLICY "Developers can delete their own properties"
  ON properties
  FOR DELETE
  TO authenticated
  USING (auth.uid() = developer_name);

-- Add custom type for user roles
CREATE TYPE user_role AS ENUM ('user', 'developer', 'admin');

-- Add role column to auth.users
ALTER TABLE auth.users
ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'user'::user_role;