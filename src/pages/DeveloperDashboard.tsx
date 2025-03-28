import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Property } from '../types';
import { Developer } from '../types/auth';
import { Building, Plus, Settings, BarChart2 } from 'lucide-react';
import { PropertyCard } from '../components/property/PropertyCard';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

export function DeveloperDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeListings: 0,
    totalViews: 0,
    inquiries: 0
  });

  useEffect(() => {
    const fetchDeveloperData = async () => {
      try {
        if (!user || user.role !== 'developer') {
          navigate('/');
          return;
        }

        // Fetch developer profile
        const { data: developerData, error: developerError } = await supabase
          .from('developers')
          .select('*')
          .eq('id', user.id)
          .single();

        if (developerError) throw developerError;
        setDeveloper(developerData);

        // Fetch properties with developer_name matching the user's ID
        const { data: propertiesData, error: propertiesError } = await supabase
          .from('properties')
          .select('*')
          .eq('developer_id', user.id)
          .order('created_at', { ascending: false });

        if (propertiesError) throw propertiesError;
        
        // Ensure propertiesData is not null before setting
        const validProperties = propertiesData || [];
        setProperties(validProperties);

        // Update stats
        setStats({
          totalProperties: validProperties.length,
          activeListings: validProperties.filter(p => p.status === 'Active').length,
          totalViews: Math.floor(Math.random() * 1000), // Mock data
          inquiries: Math.floor(Math.random() * 100) // Mock data
        });

      } catch (error) {
        console.error('Error fetching developer data:', error);
        toast.error('Failed to load dashboard data');
      }
    };

    fetchDeveloperData();
  }, [navigate, user]);

  const handleAddProperty = () => {
    if (user?.role === 'developer') {
      navigate('/developer/add-property');
    } else {
      toast.error('You must be logged in as a developer to add properties');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">{developer?.company_name || 'Developer Dashboard'}</h1>
            <p className="text-gray-600">Manage your properties and view insights</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAddProperty}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Plus className="w-4 h-4" />
              Add Property
            </button>
            <button
              onClick={() => navigate('/developer/settings')}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <Building className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Properties</p>
                <p className="text-2xl font-bold">{stats.totalProperties}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <BarChart2 className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Active Listings</p>
                <p className="text-2xl font-bold">{stats.activeListings}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <i className="fas fa-eye w-8 h-8 text-purple-500 flex items-center justify-center text-xl" />
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-2xl font-bold">{stats.totalViews}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <i className="fas fa-envelope w-8 h-8 text-orange-500 flex items-center justify-center text-xl" />
              <div>
                <p className="text-sm text-gray-600">Inquiries</p>
                <p className="text-2xl font-bold">{stats.inquiries}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Properties List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Your Properties</h2>
            <button
              onClick={() => navigate('/developer/properties')}
              className="text-blue-500 text-sm hover:underline"
            >
              View All
            </button>
          </div>
          
          {properties.length === 0 ? (
            <div className="text-center py-8">
              <Building className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No properties listed yet</p>
              <button
                onClick={handleAddProperty}
                className="mt-2 text-blue-500 hover:underline"
              >
                Add your first property
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map(property => (
                <PropertyCard key={property.id} propertyId={property.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}