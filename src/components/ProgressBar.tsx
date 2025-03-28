import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { Property } from '../types';

// Previous interfaces remain the same
interface UserProfile {
  id: string;
  budget: number;
  preferredLocation: string;
  bedrooms: number;
  propertyType: string;
}


interface ProgressBarProps {
  propertyId: string;
  className?: string;
}

const MATCHING_WEIGHTS = {
  budget: 40,
  location: 30,
  bedrooms: 20,
  propertyType: 10,
} as const;

const ProgressBar: React.FC<ProgressBarProps> = ({ propertyId, className = '' }) => {
  const [percentage, setPercentage] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Set up auth state listener
  useEffect(() => {
    // Get initial auth state
    supabase.auth.getUser().then(({ data: { user } }) => {
      setCurrentUser(user);
    });

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setCurrentUser(session?.user ?? null);
      
      // Reset states when user logs out
      if (event === 'SIGNED_OUT') {
        setPercentage(null);
        setError(null);
      }
      
      // Fetch data when user logs in
      if (event === 'SIGNED_IN') {
        fetchData();
      }
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch data when propertyId changes or when user state changes
  useEffect(() => {
    if (currentUser) {
      fetchData();
    }
  }, [propertyId, currentUser]);

  const fetchData = async () => {
    if (!currentUser) {
      setPercentage(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const [userProfile, property] = await Promise.all([
        fetchUserProfile(currentUser.id),
        fetchProperty(propertyId)
      ]);

      const score = calculateMatchingScore(userProfile, property);
      setPercentage(score);
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
      setError(error instanceof Error ? error.message : 'Unknown error');
      setPercentage(null);
    } finally {
      setLoading(false);
    }
  };

  // Rest of the helper functions remain the same
  const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !data) throw new Error('User profile not found');
    return data as UserProfile;
  };

  const fetchProperty = async (id: string): Promise<Property> => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) throw new Error('Property not found');
    return data as Property;
  };

  // Scoring functions remain the same
  const calculateMatchingScore = (profile: UserProfile, property: Property): number => {
    const scores = {
      budget: calculateBudgetScore(profile.budget, property.price_min),
      location: calculateLocationScore(profile.preferredLocation, property.location),
      bedrooms: calculateBedroomsScore(profile.bedrooms, property.bedrooms_min),
      // propertyType: calculatePropertyTypeScore(profile.propertyType, property.type)
    };

    const totalWeight = Object.values(MATCHING_WEIGHTS).reduce((sum, weight) => sum + weight, 0);
    const weightedScore = Object.entries(scores).reduce((sum, [key, score]) => {
      return sum + (score * MATCHING_WEIGHTS[key as keyof typeof MATCHING_WEIGHTS]);
    }, 0);

    return Math.round((weightedScore / totalWeight) * 100);
  };

  const calculateBudgetScore = (userBudget: number, propertyPrice: number): number => {
    if (propertyPrice <= userBudget) return 1;
    const budgetDifference = Math.abs(propertyPrice - userBudget);
    return budgetDifference / userBudget <= 0.1 ? 0.5 : 0;
  };

  const calculateLocationScore = (preferred: string, actual: string): number => {
    return preferred === actual ? 1 : 0.3;
  };

  const calculateBedroomsScore = (preferred: number, actual: number): number => {
    if (preferred === actual) return 1;
    return Math.abs(preferred - actual) === 1 ? 0.6 : 0;
  };

  const calculatePropertyTypeScore = (preferred: string, actual: string): number => {
    return preferred === actual ? 1 : 0.5;
  };

  const getColorClass = (score: number | null): string => {
    if (score === null) return 'bg-red-200';
    if (score === 0) return 'bg-red-500';
    if (score <= 25) return 'bg-red-600';
    if (score <= 50) return 'bg-orange-500';
    if (score <= 75) return 'bg-green-400';
    return 'bg-green-800';
  };

  return (
    <div className={`relative w-2/3 bg-gray-500 rounded-full shadow-lg ${className}`}>
      <div
        className={`${getColorClass(percentage)} h-4 rounded-full transition-all duration-500`}
        style={{ width: `${percentage ?? 0}%` }}
        role="progressbar"
        aria-valuenow={percentage ?? 0}
        aria-valuemin={0}
        aria-valuemax={100}
      />
      <div className="absolute inset-0 flex items-center justify-center text-[11px] font-medium text-white">
        {!currentUser ? 'Login for Match %' : 
          loading ? 'Calculating...' : 
          percentage !== null ? `${percentage}% Match` : 
          'No Score'}
      </div>
    </div>
  );
};

export default ProgressBar;