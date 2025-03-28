import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Developer } from '../types/auth';
import { Property } from '../types';
import { PropertyCard } from '../components/property/PropertyCard';
import { Globe, MapPin, Building } from 'lucide-react';
import { DeveloperChatButton } from '../components/chat/DeveloperChatButton';
import EmailChangePopup from '../components/auth/EmailChangeComponent';
import { useAuthStore } from '../store/authStore';

export function DeveloperProfile() {
  const { id } = useParams<{ id: string }>();
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchDeveloperData = async () => {
      try {
        const { data: developerData, error: developerError } = await supabase
          .from('developers')
          .select('*')
          .eq('id', id)
          .single();

        if (developerError) throw developerError;
        setDeveloper(developerData);

        const { data: propertiesData, error: propertiesError } = await supabase
          .from('properties')
          .select('*')
          .eq('developer_id', id);

        if (propertiesError) throw propertiesError;
        setProperties(propertiesData);
      } catch (error) {
        console.error('Error fetching developer data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchDeveloperData();
    }
  }, [id]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!developer) {
    return <div className="min-h-screen flex items-center justify-center">Developer not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
      {user?.role == 'developer' && user.id === id && (<div className='flex justify-end mb-2'>
          <EmailChangePopup />
        </div>)}
        
        {/* Developer Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-start gap-6">
            <div className="w-32 h-32 bg-white border border-gray-200 rounded-lg overflow-hidden">
              {developer.logo_url ? (
                <img
                  src={developer.logo_url}
                  alt={developer.company_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Building className="w-12 h-12" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{developer.company_name}</h1>
              <p className="text-gray-600 mb-4">{developer.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Globe className="w-4 h-4" />
                  <a href={developer.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                    {developer.website}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>Since {developer.established_year}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold text-blue-500">{properties.length}</p>
            <p className="text-gray-600">Total Projects</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold text-green-500">{developer.completed_projects}</p>
            <p className="text-gray-600">Completed</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold text-orange-500">{developer.ongoing_projects}</p>
            <p className="text-gray-600">Ongoing</p>
          </div>
        </div>

        {/* Properties */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Properties by {developer.company_name}</h2>
          
          {properties.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No properties listed yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map(property => (
                <PropertyCard key={property.id} propertyId={property.id} />
              ))}
            </div>
          )}
        </div>
      </div>

      <DeveloperChatButton developer={developer} />
    </div>
  );
}