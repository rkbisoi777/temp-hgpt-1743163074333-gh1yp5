import { useState, useEffect } from 'react';
import { PropertyCard } from '../components/property/PropertyCard';
import { Heart, Trash } from 'lucide-react';
import { WishlistService } from '../lib/WishlistService';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

export function Wishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);
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
        const fetchedWishlist = await WishlistService.getWishlist(userId);

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
        await WishlistService.removeItemsFromWishlist(userId, [propertyId]);
        const newWishlist = await WishlistService.getWishlist(userId);
        setWishlist(newWishlist);
        toast.success("Property successfully removed from Wishlist")
      } catch (err) {
        setError('Failed to remove item from wishlist');
      }
    }
    window.dispatchEvent(new Event('wishlistUpdated')); 
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
          <Heart className="w-6 h-6 text-red-500" />
          <h1 className="text-2xl font-bold">My Wishlist</h1>
        </div>

        {error && (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {Array.isArray(wishlist) && wishlist.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Your wishlist is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map(propertyId => (
              <div key={propertyId} className="relative">
                <PropertyCard key={propertyId} propertyId={propertyId} />
                <button
                  onClick={() => handleRemove(propertyId)}
                  className="absolute top-0 mt-2 right-1 mr-1 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition"
                >
                  <Trash className='size-5' />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
