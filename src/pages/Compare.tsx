import { useEffect, useState } from 'react';
import { Scale } from 'lucide-react';
import { CompareTable } from '../components/compare/CompareTable';
import { CompareService } from '../lib/CompareService';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

export function Compare() {
  // const { compareList, removeFromCompare } = usePropertyStore();
    const [compareList, setWishlist] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWishlist = async () => {
          try {
            const { data: { session } } = await supabase.auth.getSession();
    
            if (!session?.user) {
              setError('User not logged in');
              setLoading(false);
              return;
            }
    
            const userId = session.user.id;
            const fetchedWishlist = await CompareService.getCompare(userId);
    
            // Make sure fetchedWishlist is an array
            setWishlist(Array.isArray(fetchedWishlist) ? fetchedWishlist : []);
          } catch (err) {
            console.error(err);
            setError('Failed to load wishlist');
          } finally {
            setLoading(false);
          }
        };
    
        fetchWishlist();
      }, []);

      const handleRemove = async (propertyId: string) => {
        const { data: { session } } = await supabase.auth.getSession();
        const userId = session?.user.id;
        if (userId) {
          try {
            await CompareService.removeItemsFromCompare(userId, [propertyId]);
            const newWishlist = await CompareService.getCompare(userId);
            setWishlist(newWishlist);
            toast.success("Property successfully removed from Compare List")
          } catch (err) {
            setError('Failed to remove item from compare list');
          }
        }
        window.dispatchEvent(new Event('compareUpdated'));
      };
    
      if (loading) {
        return (
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="text-center py-12">
                <p className="text-gray-500">Loading...</p>
              </div>
            </div>
          </div>
        );
      }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Scale className="w-6 h-6 text-blue-500" />
          <h1 className="text-2xl font-bold">Compare Properties</h1>
        </div>

        {compareList.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No properties to compare</p>
          </div>
        ) : (
          <CompareTable 
            propertyIds={compareList} 
            onRemove={handleRemove} 
          />
          // compareList.toString()
        )}
      </div>
    </div>
  );
}