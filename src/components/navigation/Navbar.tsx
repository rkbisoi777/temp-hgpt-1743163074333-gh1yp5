// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Heart, Scale, User } from 'lucide-react';
// import { useAuthStore } from '../../store/authStore';
// import { NavbarIcon } from './NavbarIcon';
// import { ProfileSidebar } from '../profile/ProfileSidebar';
// import { useToken } from '../TokenContext';
// import { toast } from 'react-hot-toast';
// import { TokenService } from '../../lib/tokenService';
// import { supabase } from '../../lib/supabaseClient';
// import { WishlistService } from '../../lib/WishlistService';
// import { CompareService } from '../../lib/CompareService';
// import { useModal } from '../LoginModalContext';

// const formatTokens = (tokens: number): string => {
//   if (tokens >= 1000) {
//     const formatted = (tokens / 1000).toFixed(1);
//     return formatted.endsWith('.0') ? `${Math.floor(tokens / 1000)}K` : `${formatted}K`;
//   }
//   return tokens.toString();
// };

// const TOKEN_REFRESH_EVENT = "refreshTokens";

// export function Navbar() {
//   const { user } = useAuthStore();
//   const [showProfileSidebar, setShowProfileSidebar] = useState(false);
//   const [tkn, setTkn] = useState<number>(0);
//   const { tokens } = useToken();
//   const [wishlistCount, setWishlistCount] = useState(0);
//   const [compareCount, setCompareCount] = useState(0);
//   const { openLoginModal } = useModal();

//   useEffect(() => {
//     const fetchCounts = async () => {
//       if (user?.id) {
//         const wishlistItems = await WishlistService.getWishlist(user.id);
//         const compareItems = await CompareService.getCompare(user.id);
//         setWishlistCount(wishlistItems.length);
//         setCompareCount(compareItems.length);
//       }
//     };

//     fetchCounts();
//     // Set up event listeners for updates
//     window.addEventListener('wishlistUpdated', fetchCounts);
//     window.addEventListener('compareUpdated', fetchCounts);

//     return () => {
//       window.removeEventListener('wishlistUpdated', fetchCounts);
//       window.removeEventListener('compareUpdated', fetchCounts);
//     };
//   }, [user]);

//   useEffect(() => {
//     if (tokens <= 2000 && !user) {
//       toast('Sign up now to get 5,000 more tokens!');
//     }
//   }, [tokens, user]);

//   useEffect(() => {
//     const fetchTokens = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       if (session?.user.id) {
//         const tkns = await TokenService.fetchUserTokens(session?.user.id);
//         setTkn(tkns.available_tokens);
//       }
//     };

//     fetchTokens();

//     // Listen for the refresh event
//     const handleTokenRefresh = () => fetchTokens();
//     window.addEventListener(TOKEN_REFRESH_EVENT, handleTokenRefresh);

//     return () => {
//       window.removeEventListener(TOKEN_REFRESH_EVENT, handleTokenRefresh);
//     };

//   }, [user]);

//   useEffect(() => {
//     const fetchTokens = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       if (!session?.user?.id) return;

//       const lastFetch = localStorage.getItem("last_token_fetch");
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);

//       if (lastFetch && new Date(lastFetch) >= today) {
//         return;
//       }

//       let tkns = await TokenService.fetchUserTokens(session.user.id);
//       if (tkns?.last_updated) {
//         const lastUpdatedDate = new Date(tkns.last_updated);

//         if (lastUpdatedDate < today) {
//           await TokenService.resetUserTokens(session.user.id);
//           tkns = await TokenService.fetchUserTokens(session.user.id);
//         }

//         setTkn(tkns);
//         localStorage.setItem("last_token_fetch", today.toISOString());
//       }
//     };

//     fetchTokens();
//   }, []); 

//   return (
//     <nav>
//       <div className="flex items-center gap-3">
//       {user && (<p className="font-semibold text-blue-500 text-sm mt-[1px]">
//           <i className="fas fa-coins mr-1.5"></i>
//           {!user ? formatTokens(tokens) : formatTokens(tkn)}
//         </p>)}

//         {user ? (
//           <>
//             {user?.role === 'user' && (
//               <Link to="/wishlist">
//                 <NavbarIcon 
//                   icon={Heart} 
//                   count={wishlistCount}
//                   isActive={wishlistCount > 0}
//                   type='wishlist'
//                 />
//               </Link>
//             )}
//             {user?.role === 'user' && (
//               <Link to="/compare">
//                 <NavbarIcon 
//                   icon={Scale} 
//                   count={compareCount}
//                   isActive={compareCount > 0}
//                   type='compare'
//                 />
//               </Link>
//             )}
//             <button onClick={() => setShowProfileSidebar(true)}>
//             <div className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
//               <User className={`w-5 h-5 text-blue-500`} fill={`currentColor`}/>
//             </div>
//             </button>
//           </>
//         ) : (
//           // <Link to="/login">
//             <button onClick={openLoginModal} className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm px-3 py-1.5 rounded-lg">
//               Login
//             </button>
//           // </Link>
//         )}
//       </div>

//       <ProfileSidebar
//         isOpen={showProfileSidebar}
//         onClose={() => setShowProfileSidebar(false)}
//       />
//     </nav>
//   );
// }

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, NewspaperIcon, Scale, User } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { NavbarIcon } from './NavbarIcon';
import { ProfileSidebar } from '../profile/ProfileSidebar';
import { useToken } from '../TokenContext';
import { toast } from 'react-hot-toast';
import { TokenService } from '../../lib/tokenService';
import { supabase } from '../../lib/supabaseClient';
import { WishlistService } from '../../lib/WishlistService';
import { CompareService } from '../../lib/CompareService';
import { useModal } from '../LoginModalContext';

const formatTokens = (tokens: number): string => {
  if (tokens >= 1000) {
    const formatted = (tokens / 1000).toFixed(1);
    return formatted.endsWith('.0') ? `${Math.floor(tokens / 1000)}K` : `${formatted}K`;
  }
  return tokens.toString();
};

const TOKEN_REFRESH_EVENT = "refreshTokens";

export function Navbar() {
  const { user } = useAuthStore();
  const [showProfileSidebar, setShowProfileSidebar] = useState(false);
  const [tkn, setTkn] = useState<number>(0);
  const { tokens } = useToken();
  const [wishlistCount, setWishlistCount] = useState(0);
  const [compareCount, setCompareCount] = useState(0);
  const { openLoginModal } = useModal();
  const location = useLocation();
  const isNewsActive = location.pathname === "/news";


  useEffect(() => {
    const fetchCounts = async () => {
      if (user?.id && user?.role === 'user') {
        const wishlistItems = await WishlistService.getWishlist(user.id);
        const compareItems = await CompareService.getCompare(user.id);
        setWishlistCount(wishlistItems.length);
        setCompareCount(compareItems.length);
      }
    };

    fetchCounts();
    window.addEventListener('wishlistUpdated', fetchCounts);
    window.addEventListener('compareUpdated', fetchCounts);

    return () => {
      window.removeEventListener('wishlistUpdated', fetchCounts);
      window.removeEventListener('compareUpdated', fetchCounts);
    };
  }, [user]);

  useEffect(() => {
    if (tokens <= 2000 && !user) {
      toast('Sign up now to get 5,000 more tokens!');
    }
  }, [tokens, user]);

  useEffect(() => {
    const fetchTokens = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user.id) {
        const tkns = await TokenService.fetchUserTokens(session?.user.id);
        setTkn(tkns.available_tokens);
      }
    };

    fetchTokens();

    const handleTokenRefresh = () => fetchTokens();
    window.addEventListener(TOKEN_REFRESH_EVENT, handleTokenRefresh);

    return () => {
      window.removeEventListener(TOKEN_REFRESH_EVENT, handleTokenRefresh);
    };
  }, [user]);

  useEffect(() => {
    const fetchTokens = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) return;

      const lastFetch = localStorage.getItem("last_token_fetch");
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (lastFetch && new Date(lastFetch) >= today) {
        return;
      }

      let tkns = await TokenService.fetchUserTokens(session.user.id);
      if (tkns?.last_updated) {
        const lastUpdatedDate = new Date(tkns.last_updated);

        if (lastUpdatedDate < today) {
          await TokenService.resetUserTokens(session.user.id);
          tkns = await TokenService.fetchUserTokens(session.user.id);
        }

        setTkn(tkns);
        localStorage.setItem("last_token_fetch", today.toISOString());
      }
    };

    fetchTokens();
  }, []);

  return (
    <nav>
      <div className="flex items-center gap-2">
        {user && (<p className="font-semibold text-blue-500 text-sm mt-[1px]">
          <i className="fas fa-coins mr-1.5"></i>
          {!user ? formatTokens(tokens) : formatTokens(tkn)}
        </p>)}

        {/* <Link
          to="/news"
          className={`text-blue-500 p-1 -mr-2 rounded-md  ${isNewsActive ? "" : ""
            }`}
        >
          <NewspaperIcon  className='h-5 w-5'/>
        </Link> */}

        {user ? (
          <>
            {user?.role === 'user' && (
              <Link to="/wishlist">
                <NavbarIcon
                  icon={Heart}
                  count={wishlistCount}
                  isActive={wishlistCount > 0}
                  type='wishlist'
                />
              </Link>
            )}
            {user?.role === 'user' && (
              <Link to="/compare">
                <NavbarIcon
                  icon={Scale}
                  count={compareCount}
                  isActive={compareCount > 0}
                  type='compare'
                />
              </Link>
            )}
            <button onClick={() => setShowProfileSidebar(true)}>
              <div className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                <User className={`w-5 h-5 text-blue-500`} fill={`currentColor`} />
              </div>
            </button>
          </>
        ) : (
          <button onClick={openLoginModal} className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm px-3 py-1.5 rounded-lg ml-2">
            Login
          </button>
        )}
      </div>

      <ProfileSidebar
        isOpen={showProfileSidebar}
        onClose={() => setShowProfileSidebar(false)}
      />
    </nav>
  );
}