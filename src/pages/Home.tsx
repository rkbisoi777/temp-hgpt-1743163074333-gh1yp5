import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TabSelector } from '../components/TabSelector';
import { ChatTab } from '../components/ChatTab';
import { SearchTab } from '../components/SearchTab';
import { PremadeQuestions } from '../components/PremadeQuestions';
import { LocationSelector } from '../components/LocationSelector';
import { Logo } from '../components/home/Logo';
import { propertyService } from '../lib/propertyService';
import { PropertyGrid } from '../components/property/PropertyGrid';
import { HomeChatButton } from '../components/chat/HomeChatButton';
import { Award } from 'lucide-react';
import { Property } from '../types';
import { News } from './News';


export function Home() {
  const [activeTab, setActiveTab] = useState<'search' | 'report'>('search');
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const props: Property[] = await propertyService.searchProperties("Mumbai");
        setProperties(props);
        // console.log(props)
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const handleSearch = (query: string) => {
    navigate('/chat', { state: { initialQuery: query } });
  };



  return (
    <div className="min-h-50 flex flex-col items-center justify-center bg-white px-4 w-full">
      <div className="text-center mb-4 mt-[50px]">
        <Logo size={10} layout="col" />
        <div className="flex items-center justify-center gap-2 mt-4">
          <LocationSelector />
        </div>
      </div>

      <div className="w-full max-w-full">
        <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex items-center justify-center">
          <p className="text-sm text-gray-600 mb-2">
            {activeTab === 'search'
              ? 'Let HouseGPT help you find the perfect match!'
              : 'Discover the best match for your property needs!'}
          </p>
        </div>
        {activeTab === 'search' ? (
          <>
            <div className="bg-transparent z-50">
              <ChatTab onSubmit={handleSearch} />
            </div>
            <PremadeQuestions onQuestionClick={handleSearch} />
            <div className="my-4 text-gray-500">
              <div className="flex items-center gap-1 mb-2 text-gray-600">
                <Award className="w-4 h-4" />
                <span className="text-sm font-semibold">Top Properties in Mumbai</span>
              </div>

              {properties && <PropertyGrid properties={properties} maxInitialDisplay={8} />}
              <News />
            </div>
          </>
        ) : (
          <>
            {properties && 
            <SearchTab preloadedProperties={properties} />}

          </>
        )}



      </div>
      <HomeChatButton onSubmit={handleSearch} />
    </div>
  );
}

