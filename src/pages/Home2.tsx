// // // // import { useState, useEffect } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { TabSelector } from '../components/TabSelector';
// // // // import { ChatTab } from '../components/ChatTab';
// // // // import { SearchTab } from '../components/SearchTab';
// // // // import { PremadeQuestions } from '../components/PremadeQuestions';
// // // // import { LocationSelector } from '../components/LocationSelector';
// // // // import { Logo } from '../components/home/Logo';
// // // // import { propertyService } from '../lib/propertyService';
// // // // import { PropertyGrid } from '../components/property/PropertyGrid';
// // // // import { HomeChatButton } from '../components/chat/HomeChatButton';
// // // // import { Award } from 'lucide-react';
// // // // import { Property } from '../types';
// // // // import { PropertyCard } from '../components/property/PropertyCard';
// // // // import { RandomNewsCard } from '../components/news/RandomNewsCard';

// // // // type FeedItemType = 'news' | 'property' | 'grid';

// // // // interface FeedItem {
// // // //   type: FeedItemType;
// // // //   content: any;
// // // // }

// // // // export function Home() {
// // // //   const [activeTab, setActiveTab] = useState<'search' | 'report'>('search');
// // // //   const navigate = useNavigate();
// // // //   const [properties, setProperties] = useState<Property[]>([]);
// // // //   const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [page, setPage] = useState(1);
// // // //   const [lastType, setLastType] = useState<FeedItemType | null>(null);

// // // //   useEffect(() => {
// // // //     const fetchProperties = async () => {
// // // //       try {
// // // //         const props: Property[] = await propertyService.searchProperties("Mumbai");
// // // //         setProperties(props);
// // // //       } catch (error) {
// // // //         console.error("Error fetching properties:", error);
// // // //       }
// // // //     };

// // // //     fetchProperties();
// // // //   }, []);

// // // //   const getNextType = (types: FeedItemType[], lastUsedType: FeedItemType | null): FeedItemType => {
// // // //     const availableTypes = types.filter(type => type !== lastUsedType);
// // // //     return availableTypes[Math.floor(Math.random() * availableTypes.length)];
// // // //   };

// // // //   const generateFeedItem = (props: Property[], lastUsedType: FeedItemType | null): FeedItem | null => {
// // // //     const types: FeedItemType[] = ['news', 'property', 'grid'];
// // // //     const nextType = getNextType(types, lastUsedType);

// // // //     switch (nextType) {
// // // //       case 'news':
// // // //         return { type: 'news', content: null };
// // // //       case 'property':
// // // //         if (props.length > 0) {
// // // //           const randomProperty = props[Math.floor(Math.random() * props.length)];
// // // //           return { type: 'property', content: randomProperty };
// // // //         }
// // // //         break;
// // // //       case 'grid':
// // // //         if (props.length > 0) {
// // // //           const randomProperties = props
// // // //             .sort(() => 0.5 - Math.random())
// // // //             .slice(0, 4);
// // // //           return { type: 'grid', content: randomProperties };
// // // //         }
// // // //         break;
// // // //     }
// // // //     return null;
// // // //   };

// // // //   const handleScroll = () => {
// // // //     if (
// // // //       window.innerHeight + document.documentElement.scrollTop
// // // //       === document.documentElement.offsetHeight
// // // //     ) {
// // // //       if (!loading && feedItems.length > 0) {
// // // //         setLoading(true);
// // // //         setPage(prev => prev + 1);

// // // //         const newItem = generateFeedItem(properties, feedItems[feedItems.length - 1].type);
// // // //         if (newItem) {
// // // //           setFeedItems(prev => [...prev, newItem]);
// // // //           setLastType(newItem.type);
// // // //         }

// // // //         setLoading(false);
// // // //       }
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     window.addEventListener('scroll', handleScroll);
// // // //     return () => window.removeEventListener('scroll', handleScroll);
// // // //   }, [loading, properties, feedItems]);

// // // //   useEffect(() => {
// // // //     if (properties.length > 0) {
// // // //       const firstItem = generateFeedItem(properties, null);
// // // //       if (firstItem) {
// // // //         setFeedItems([firstItem]);
// // // //         setLastType(firstItem.type);
// // // //       }
// // // //     }
// // // //   }, [properties]);

// // // //   const handleSearch = (query: string) => {
// // // //     navigate('/chat', { state: { initialQuery: query } });
// // // //   };

// // // //   const renderFeedItem = (item: FeedItem, index: number) => {
// // // //     switch (item.type) {
// // // //       case 'news':
// // // //         return <RandomNewsCard key={`news-${index}`} />;
// // // //       case 'property':
// // // //         return (
// // // //           <div key={`property-${index}`} className="mb-6">
// // // //             <PropertyCard propertyId={item.content.id} />
// // // //           </div>
// // // //         );
// // // //       case 'grid':
// // // //         return (
// // // //           <div key={`grid-${index}`} className="mb-6">
// // // //             <div className="flex items-center gap-1 mb-2 text-gray-600">
// // // //               <Award className="w-4 h-4" />
// // // //               <span className="text-sm font-semibold">Featured Properties</span>
// // // //             </div>
// // // //             <PropertyGrid properties={item.content} maxInitialDisplay={4} />
// // // //           </div>
// // // //         );
// // // //       default:
// // // //         return null;
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="min-h-50 flex flex-col items-center justify-center bg-white px-4 w-full">
// // // //       <div className="text-center mb-4 mt-[50px]">
// // // //         <Logo size={10} layout="col" />
// // // //         <div className="flex items-center justify-center gap-2 mt-4">
// // // //           <LocationSelector />
// // // //         </div>
// // // //       </div>

// // // //       <div className="w-full max-w-6xl">
// // // //         <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
// // // //         <div className="flex items-center justify-center">
// // // //           <p className="text-sm text-gray-600 mb-2">
// // // //             {activeTab === 'search'
// // // //               ? 'Let HouseGPT help you find the perfect match!'
// // // //               : 'Discover the best match for your property needs!'}
// // // //           </p>
// // // //         </div>
// // // //         {activeTab === 'search' ? (
// // // //           <>
// // // //             <div className="sticky top-16 bg-transparent z-50">
// // // //               <ChatTab onSubmit={handleSearch} />
// // // //             </div>
// // // //             <PremadeQuestions onQuestionClick={handleSearch} />
// // // //             <div className="my-4 text-gray-500">
// // // //               <div className="flex items-center gap-1 mb-2 text-gray-600">
// // // //                 <Award className="w-4 h-4" />
// // // //                 <span className="text-sm font-semibold">Top Properties in Mumbai</span>
// // // //               </div>
// // // //               {properties && <PropertyGrid properties={properties} maxInitialDisplay={8} />}

// // // //               {/* Dynamic Feed */}
// // // //               <div className="mt-8">
// // // //                 {feedItems.map((item, index) => renderFeedItem(item, index))}
// // // //               </div>

// // // //               {loading && (
// // // //                 <div className="text-center py-4">
// // // //                   <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </>
// // // //         ) : (
// // // //           <>
// // // //             {properties && 
// // // //             <SearchTab preloadedProperties={properties} />}
// // // //           </>
// // // //         )}
// // // //       </div>
// // // //       <HomeChatButton onSubmit={handleSearch} />
// // // //     </div>
// // // //   );
// // // // }

// // // import { useState, useEffect, useRef, useCallback } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { TabSelector } from '../components/TabSelector';
// // // import { ChatTab } from '../components/ChatTab';
// // // import { SearchTab } from '../components/SearchTab';
// // // import { PremadeQuestions } from '../components/PremadeQuestions';
// // // import { LocationSelector } from '../components/LocationSelector';
// // // import { Logo } from '../components/home/Logo';
// // // import { propertyService } from '../lib/propertyService';
// // // import { PropertyGrid } from '../components/property/PropertyGrid';
// // // import { HomeChatButton } from '../components/chat/HomeChatButton';
// // // import { Award, Loader } from 'lucide-react';
// // // import { Property } from '../types';
// // // import { PropertyCard } from '../components/property/PropertyCard';
// // // import { RandomNewsCard } from '../components/news/RandomNewsCard';

// // // type FeedItemType = 'news' | 'property' | 'grid';

// // // interface FeedItem {
// // //   type: FeedItemType;
// // //   content: any;
// // //   id: string; // Unique identifier for each feed item
// // // }

// // // export function Home() {
// // //   const [activeTab, setActiveTab] = useState<'search' | 'report'>('search');
// // //   const navigate = useNavigate();
// // //   const [properties, setProperties] = useState<Property[]>([]);
// // //   const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [hasMore, setHasMore] = useState(true);
// // //   const [location, setLocation] = useState("Mumbai");
// // //   const [lastType, setLastType] = useState<FeedItemType | null>(null);

// // //   // Observer for infinite scrolling
// // //   const observer = useRef<IntersectionObserver | null>(null);
// // //   const loadingRef = useCallback(
// // //     (node: HTMLDivElement | null) => {
// // //       if (loading) return;
// // //       if (observer.current) observer.current.disconnect();

// // //       observer.current = new IntersectionObserver(entries => {
// // //         if (entries[0].isIntersecting && hasMore) {
// // //           loadMoreItems();
// // //         }
// // //       });

// // //       if (node) observer.current.observe(node);
// // //     },
// // //     [loading, hasMore]
// // //   );

// // //   // Initial property fetch
// // //   useEffect(() => {
// // //     const fetchProperties = async () => {
// // //       try {
// // //         setLoading(true);
// // //         const props: Property[] = await propertyService.searchProperties(location);
// // //         setProperties(props);
// // //         setLoading(false);
// // //       } catch (error) {
// // //         console.error("Error fetching properties:", error);
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchProperties();
// // //   }, [location]);

// // //   // Generate feed when properties are loaded
// // //   useEffect(() => {
// // //     if (properties.length > 0 && feedItems.length === 0) {
// // //       initializeFeed();
// // //     }
// // //   }, [properties]);

// // //   const initializeFeed = () => {
// // //     const initialItems: FeedItem[] = [];

// // //     // Generate first 5 items for initial feed
// // //     for (let i = 0; i < 5; i++) {
// // //       const newItem = generateFeedItem(properties, 
// // //         initialItems.length > 0 ? initialItems[initialItems.length - 1].type : null);

// // //       if (newItem) {
// // //         initialItems.push({
// // //           ...newItem,
// // //           id: `feed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
// // //         });
// // //         setLastType(newItem.type);
// // //       }
// // //     }

// // //     setFeedItems(initialItems);
// // //   };

// // //   const loadMoreItems = useCallback(() => {
// // //     if (loading || !hasMore) return;

// // //     setLoading(true);

// // //     // Simulate network delay
// // //     setTimeout(() => {
// // //       const newItems: FeedItem[] = [];

// // //       // Generate 3 more items each time
// // //       for (let i = 0; i < 3; i++) {
// // //         const newItem = generateFeedItem(properties, 
// // //           newItems.length > 0 ? newItems[newItems.length - 1].type : 
// // //           feedItems.length > 0 ? feedItems[feedItems.length - 1].type : null);

// // //         if (newItem) {
// // //           newItems.push({
// // //             ...newItem,
// // //             id: `feed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
// // //           });
// // //           setLastType(newItem.type);
// // //         }
// // //       }

// // //       setFeedItems(prev => [...prev, ...newItems]);
// // //       setLoading(false);

// // //       // Always maintain hasMore as true to ensure content never ends
// // //       setHasMore(true);
// // //     }, 800); // Added delay to make loading more visible
// // //   }, [loading, hasMore, properties, feedItems]);

// // //   const getNextType = (types: FeedItemType[], lastUsedType: FeedItemType | null): FeedItemType => {
// // //     // Prevent same type from appearing consecutively
// // //     const availableTypes = types.filter(type => type !== lastUsedType);
// // //     return availableTypes[Math.floor(Math.random() * availableTypes.length)];
// // //   };

// // //   const generateFeedItem = (props: Property[], lastUsedType: FeedItemType | null): FeedItem | null => {
// // //     const types: FeedItemType[] = ['news', 'property', 'grid'];
// // //     const nextType = getNextType(types, lastUsedType);

// // //     switch (nextType) {
// // //       case 'news':
// // //         return { type: 'news', content: null, id: '' };
// // //       case 'property':
// // //         if (props.length > 0) {
// // //           // Get a random property that hasn't been used recently
// // //           const randomIndex = Math.floor(Math.random() * props.length);
// // //           const randomProperty = props[randomIndex];
// // //           return { type: 'property', content: randomProperty, id: '' };
// // //         }
// // //         break;
// // //       case 'grid':
// // //         if (props.length > 0) {
// // //           // Get random properties for grid view
// // //           const randomProperties = [...props]
// // //             .sort(() => 0.5 - Math.random())
// // //             .slice(0, 4);
// // //           return { type: 'grid', content: randomProperties, id: '' };
// // //         }
// // //         break;
// // //     }

// // //     // Fallback to news if we can't create the other types
// // //     return { type: 'news', content: null, id: '' };
// // //   };

// // //   const handleSearch = (query: string) => {
// // //     navigate('/chat', { state: { initialQuery: query } });
// // //   };

// // //   const handleLocationChange = (newLocation: string) => {
// // //     setLocation(newLocation);
// // //     setFeedItems([]);
// // //     setLastType(null);
// // //   };

// // //   const renderFeedItem = (item: FeedItem) => {
// // //     switch (item.type) {
// // //       case 'news':
// // //         return <RandomNewsCard key={item.id} />;
// // //       case 'property':
// // //         return (
// // //           <div key={item.id} className="mb-6 animate-fadeIn">
// // //             <PropertyCard propertyId={item.content.id} />
// // //           </div>
// // //         );
// // //       case 'grid':
// // //         return (
// // //           <div key={item.id} className="mb-6 animate-fadeIn">
// // //             <div className="flex items-center gap-1 mb-2 text-gray-600">
// // //               <Award className="w-4 h-4" />
// // //               <span className="text-sm font-semibold">Featured Properties</span>
// // //             </div>
// // //             <PropertyGrid properties={item.content} maxInitialDisplay={7} />
// // //           </div>
// // //         );
// // //       default:
// // //         return null;
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 w-full">
// // //       <div className="text-center mb-4 mt-[50px]">
// // //         <Logo size={10} layout="col" />
// // //         <div className="flex items-center justify-center gap-2 mt-4">
// // //           {/* Use LocationSelector without custom props that aren't defined */}
// // //           <LocationSelector />
// // //         </div>
// // //       </div>

// // //       <div className="w-full max-w-6xl">
// // //         <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
// // //         <div className="flex items-center justify-center">
// // //           <p className="text-sm text-gray-600 mb-2">
// // //             {activeTab === 'search'
// // //               ? 'Let HouseGPT help you find the perfect match!'
// // //               : 'Discover the best match for your property needs!'}
// // //           </p>
// // //         </div>
// // //         {activeTab === 'search' ? (
// // //           <>
// // //             <div className="sticky top-16 bg-transparent z-50">
// // //               <ChatTab onSubmit={handleSearch} />
// // //             </div>
// // //             <PremadeQuestions onQuestionClick={handleSearch} />

// // //             {properties.length > 0 && (
// // //               <div className="my-4 text-gray-500">
// // //                 <div className="flex items-center gap-1 mb-2 text-gray-600">
// // //                   <Award className="w-4 h-4" />
// // //                   <span className="text-sm font-semibold">Top Properties in {location}</span>
// // //                 </div>
// // //                 <PropertyGrid properties={properties.slice(0, 8)} maxInitialDisplay={8} />
// // //               </div>
// // //             )}

// // //             {/* Dynamic Feed with Infinite Scrolling */}
// // //             <div className="mt-8">
// // //               {feedItems.map(item => renderFeedItem(item))}

// // //               {/* Loading indicator that triggers more content */}
// // //               <div 
// // //                 ref={loadingRef} 
// // //                 className="flex justify-center items-center py-8"
// // //               >
// // //                 {loading && (
// // //                   <div className="flex flex-col items-center gap-2">
// // //                     <Loader className="w-6 h-6 animate-spin text-blue-500" />
// // //                     <p className="text-sm text-gray-500">Loading more content...</p>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </>
// // //         ) : (
// // //           <>
// // //             {properties && 
// // //             <SearchTab preloadedProperties={properties} />}
// // //           </>
// // //         )}
// // //       </div>
// // //       <HomeChatButton onSubmit={handleSearch} />
// // //     </div>
// // //   );
// // // }

// // import { useState, useEffect, useRef, useCallback } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { TabSelector } from '../components/TabSelector';
// // import { ChatTab } from '../components/ChatTab';
// // import { SearchTab } from '../components/SearchTab';
// // import { PremadeQuestions } from '../components/PremadeQuestions';
// // import { LocationSelector } from '../components/LocationSelector';
// // import { Logo } from '../components/home/Logo';
// // import { propertyService } from '../lib/propertyService';
// // import { PropertyGrid } from '../components/property/PropertyGrid';
// // import { HomeChatButton } from '../components/chat/HomeChatButton';
// // import { Award, Loader } from 'lucide-react';
// // import { Property } from '../types';
// // import { PropertyCard } from '../components/property/PropertyCard';
// // import { RandomNewsCard } from '../components/news/RandomNewsCard';

// // type FeedItemType = 'news' | 'property' | 'grid';

// // interface FeedItem {
// //     type: FeedItemType;
// //     content: any;
// //     id: string; // Unique identifier for each feed item
// // }

// // export function Home() {
// //     const [activeTab, setActiveTab] = useState<'search' | 'report'>('search');
// //     const navigate = useNavigate();
// //     const [properties, setProperties] = useState<Property[]>([]);
// //     const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
// //     const [loading, setLoading] = useState(false);
// //     const [hasMore, setHasMore] = useState(true);
// //     const [location, setLocation] = useState("Mumbai");
// //     const [lastType, setLastType] = useState<FeedItemType | null>(null);

// //     // Observer for infinite scrolling
// //     const observer = useRef<IntersectionObserver | null>(null);
// //     const loadingRef = useCallback(
// //         (node: HTMLDivElement | null) => {
// //             if (loading) return;
// //             if (observer.current) observer.current.disconnect();

// //             observer.current = new IntersectionObserver(entries => {
// //                 if (entries[0].isIntersecting && hasMore) {
// //                     loadMoreItems();
// //                 }
// //             });

// //             if (node) observer.current.observe(node);
// //         },
// //         [loading, hasMore]
// //     );

// //     // Initial property fetch
// //     useEffect(() => {
// //         const fetchProperties = async () => {
// //             try {
// //                 setLoading(true);
// //                 const props: Property[] = await propertyService.searchProperties(location);
// //                 setProperties(props);
// //                 setLoading(false);
// //             } catch (error) {
// //                 console.error("Error fetching properties:", error);
// //                 setLoading(false);
// //             }
// //         };

// //         fetchProperties();
// //     }, [location]);

// //     // Generate feed when properties are loaded
// //     useEffect(() => {
// //         if (properties.length > 0 && feedItems.length === 0) {
// //             initializeFeed();
// //         }
// //     }, [properties]);

// //     const initializeFeed = () => {
// //         const initialItems: FeedItem[] = [];

// //         // Generate first 5 items for initial feed
// //         for (let i = 0; i < 5; i++) {
// //             const newItem = generateFeedItem(properties,
// //                 initialItems.length > 0 ? initialItems[initialItems.length - 1].type : null);

// //             if (newItem) {
// //                 initialItems.push({
// //                     ...newItem,
// //                     id: `feed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
// //                 });
// //                 setLastType(newItem.type);
// //             }
// //         }

// //         setFeedItems(initialItems);
// //     };

// //     const loadMoreItems = useCallback(() => {
// //         if (loading || !hasMore) return;

// //         setLoading(true);

// //         // Simulate network delay
// //         setTimeout(() => {
// //             const newItems: FeedItem[] = [];

// //             // Generate 3 more items each time
// //             for (let i = 0; i < 3; i++) {
// //                 const newItem = generateFeedItem(properties,
// //                     newItems.length > 0 ? newItems[newItems.length - 1].type :
// //                         feedItems.length > 0 ? feedItems[feedItems.length - 1].type : null);

// //                 if (newItem) {
// //                     newItems.push({
// //                         ...newItem,
// //                         id: `feed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
// //                     });
// //                     setLastType(newItem.type);
// //                 }
// //             }

// //             setFeedItems(prev => [...prev, ...newItems]);
// //             setLoading(false);

// //             // Always maintain hasMore as true to ensure content never ends
// //             setHasMore(true);
// //         }, 800); // Added delay to make loading more visible
// //     }, [loading, hasMore, properties, feedItems]);

// //     const getNextType = (types: FeedItemType[], lastUsedType: FeedItemType | null): FeedItemType => {
// //         // Prevent same type from appearing consecutively
// //         const availableTypes = types.filter(type => type !== lastUsedType);
// //         return availableTypes[Math.floor(Math.random() * availableTypes.length)];
// //     };

// //     const generateFeedItem = (props: Property[], lastUsedType: FeedItemType | null): FeedItem | null => {
// //         const types: FeedItemType[] = ['news', 'property', 'grid'];
// //         const nextType = getNextType(types, lastUsedType);

// //         switch (nextType) {
// //             case 'news':
// //                 return { type: 'news', content: null, id: '' };
// //             case 'property':
// //                 if (props.length > 0) {
// //                     // Get a random property that hasn't been used recently
// //                     const randomIndex = Math.floor(Math.random() * props.length);
// //                     const randomProperty = props[randomIndex];
// //                     return { type: 'property', content: randomProperty, id: '' };
// //                 }
// //                 break;
// //             case 'grid':
// //                 if (props.length > 0) {
// //                     // Get random properties for grid view - INCREASED TO AT LEAST 7
// //                     const gridSize = Math.max(7, Math.min(props.length, 8));
// //                     const randomProperties = [...props]
// //                         .sort(() => 0.5 - Math.random())
// //                         .slice(0, gridSize);
// //                     return { type: 'grid', content: randomProperties, id: '' };
// //                 }
// //                 break;
// //         }

// //         // Fallback to news if we can't create the other types
// //         return { type: 'news', content: null, id: '' };
// //     };

// //     const handleSearch = (query: string) => {
// //         navigate('/chat', { state: { initialQuery: query } });
// //     };

// //     const renderFeedItem = (item: FeedItem) => {
// //         switch (item.type) {
// //             case 'news':
// //                 return <RandomNewsCard key={item.id} />;
// //             case 'property':
// //                 return (
// //                     <div key={item.id} className="mb-6 animate-fadeIn">
// //                         <PropertyCard propertyId={item.content.id} />
// //                     </div>
// //                 );
// //             case 'grid':
// //                 return (
// //                     <div key={item.id} className="mb-6 animate-fadeIn">
// //                         <div className="flex items-center gap-1 mb-2 text-gray-600">
// //                             <Award className="w-4 h-4" />
// //                             <span className="text-sm font-semibold">Featured Properties</span>
// //                         </div>
// //                         <PropertyGrid properties={item.content} maxInitialDisplay={item.content.length} />
// //                     </div>
// //                 );
// //             default:
// //                 return null;
// //         }
// //     };

// //     return (
// //         <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 w-full">
// //             <div className="text-center mb-4 mt-[50px]">
// //                 <Logo size={10} layout="col" />
// //                 <div className="flex items-center justify-center gap-2 mt-4">
// //                     <LocationSelector />
// //                 </div>
// //             </div>

// //             <div className="w-full max-w-6xl">
// //                 <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
// //                 <div className="flex items-center justify-center">
// //                     <p className="text-sm text-gray-600 mb-2">
// //                         {activeTab === 'search'
// //                             ? 'Let HouseGPT help you find the perfect match!'
// //                             : 'Discover the best match for your property needs!'}
// //                     </p>
// //                 </div>
// //                 {activeTab === 'search' ? (
// //                     <>
// //                         <div className="sticky top-16 bg-white z-50 py-2 shadow-sm">
// //                             <ChatTab onSubmit={handleSearch} />
// //                         </div>
// //                         <PremadeQuestions onQuestionClick={handleSearch} />
// //                         <div className="my-4 text-gray-500">
// //                             <div className="flex items-center gap-1 mb-2 text-gray-600">
// //                                 <Award className="w-4 h-4" />
// //                                 <span className="text-sm font-semibold">Top Properties in Mumbai</span>
// //                             </div>

// //                             {properties && <PropertyGrid properties={properties} maxInitialDisplay={8} />}

// //                         </div>

// //                         {/* {properties.length > 0 && (
// //                             <div className="my-4 text-gray-500">
// //                                 <div className="flex items-center gap-1 mb-2 text-gray-600">
// //                                 <Award className="w-4 h-4" />
// //                                 <span className="text-sm font-semibold">Top Properties in {location}</span>
// //                                 </div>
// //                                 <PropertyGrid 
// //                                 properties={properties.slice(0, 8)} 
// //                                 maxInitialDisplay={8} 
// //                                 />
// //                             </div>
// //                             )} */}

// //                         {/* Dynamic Feed with Infinite Scrolling */}
// //                         <div className="mt-8">
// //                             {feedItems.map(item => renderFeedItem(item))}

// //                             {/* Loading indicator that triggers more content */}
// //                             <div
// //                                 ref={loadingRef}
// //                                 className="flex justify-center items-center py-8"
// //                             >
// //                                 {loading && (
// //                                     <div className="flex flex-col items-center gap-2">
// //                                         <Loader className="w-6 h-6 animate-spin text-blue-500" />
// //                                         <p className="text-sm text-gray-500">Loading more content...</p>
// //                                     </div>
// //                                 )}
// //                             </div>
// //                         </div>
// //                     </>
// //                 ) : (
// //                     <>
// //                         {properties &&
// //                             <SearchTab preloadedProperties={properties} />}
// //                     </>
// //                 )}
// //             </div>
// //             <HomeChatButton onSubmit={handleSearch} />
// //         </div>
// //     );
// // }


// import { useState, useEffect, useRef, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { TabSelector } from '../components/TabSelector';
// import { ChatTab } from '../components/ChatTab';
// import { SearchTab } from '../components/SearchTab';
// import { PremadeQuestions } from '../components/PremadeQuestions';
// import { LocationSelector } from '../components/LocationSelector';
// import { Logo } from '../components/home/Logo';
// import { propertyService } from '../lib/propertyService';
// import { PropertyGrid } from '../components/property/PropertyGrid';
// import { HomeChatButton } from '../components/chat/HomeChatButton';
// import { Award, Loader } from 'lucide-react';
// import { Property } from '../types';
// import { PropertyCard } from '../components/property/PropertyCard';
// import { RandomNewsCard } from '../components/news/RandomNewsCard';

// type FeedItemType = 'news' | 'property' | 'grid';

// interface FeedItem {
//     type: FeedItemType;
//     content: any;
//     id: string; // Unique identifier for each feed item
// }

// export function Home() {
//     const [activeTab, setActiveTab] = useState<'search' | 'report'>('search');
//     const navigate = useNavigate();
//     const [properties, setProperties] = useState<Property[]>([]);
//     const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [hasMore, setHasMore] = useState(true);
//     const [location, setLocation] = useState("Mumbai");
//     const [lastType, setLastType] = useState<FeedItemType | null>(null);
//     // Keep track of the most recent types to avoid repeating more than twice
//     const [recentTypes, setRecentTypes] = useState<FeedItemType[]>([]);

//     // Observer for infinite scrolling
//     const observer = useRef<IntersectionObserver | null>(null);
//     const loadingRef = useCallback(
//         (node: HTMLDivElement | null) => {
//             if (loading) return;
//             if (observer.current) observer.current.disconnect();

//             observer.current = new IntersectionObserver(entries => {
//                 if (entries[0].isIntersecting && hasMore) {
//                     loadMoreItems();
//                 }
//             });

//             if (node) observer.current.observe(node);
//         },
//         [loading, hasMore]
//     );

//     // Initial property fetch
//     useEffect(() => {
//         const fetchProperties = async () => {
//             try {
//                 setLoading(true);
//                 const props: Property[] = await propertyService.searchProperties(location);
//                 setProperties(props);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching properties:", error);
//                 setLoading(false);
//             }
//         };

//         fetchProperties();
//     }, [location]);

//     // Generate feed when properties are loaded
//     useEffect(() => {
//         if (properties.length > 0 && feedItems.length === 0) {
//             initializeFeed();
//         }
//     }, [properties]);

//     const initializeFeed = () => {
//         const initialItems: FeedItem[] = [];
//         const initialRecentTypes: FeedItemType[] = [];

//         // Generate first 5 items for initial feed
//         for (let i = 0; i < 5; i++) {
//             const newItem = generateFeedItem(
//                 properties,
//                 initialItems.length > 0 ? initialItems[initialItems.length - 1].type : null,
//                 initialRecentTypes
//             );

//             if (newItem) {
//                 initialItems.push({
//                     ...newItem,
//                     id: `feed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
//                 });
                
//                 // Update recent types
//                 initialRecentTypes.push(newItem.type);
//                 if (initialRecentTypes.length > 5) {
//                     initialRecentTypes.shift(); // Keep only the 5 most recent types
//                 }
                
//                 setLastType(newItem.type);
//             }
//         }

//         setFeedItems(initialItems);
//         setRecentTypes(initialRecentTypes);
//     };

//     const loadMoreItems = useCallback(() => {
//         if (loading || !hasMore) return;

//         setLoading(true);

//         // Simulate network delay
//         setTimeout(() => {
//             const newItems: FeedItem[] = [];
//             const currentRecentTypes = [...recentTypes];

//             // Generate 3 more items each time
//             for (let i = 0; i < 3; i++) {
//                 const newItem = generateFeedItem(
//                     properties,
//                     newItems.length > 0 ? newItems[newItems.length - 1].type :
//                         feedItems.length > 0 ? feedItems[feedItems.length - 1].type : null,
//                     currentRecentTypes
//                 );

//                 if (newItem) {
//                     newItems.push({
//                         ...newItem,
//                         id: `feed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
//                     });
                    
//                     // Update recent types
//                     currentRecentTypes.push(newItem.type);
//                     if (currentRecentTypes.length > 5) {
//                         currentRecentTypes.shift(); // Keep only the 5 most recent types
//                     }
                    
//                     setLastType(newItem.type);
//                 }
//             }

//             setFeedItems(prev => [...prev, ...newItems]);
//             setRecentTypes(currentRecentTypes);
//             setLoading(false);

//             // Always maintain hasMore as true to ensure content never ends
//             setHasMore(true);
//         }, 800); // Added delay to make loading more visible
//     }, [loading, hasMore, properties, feedItems, recentTypes]);

//     const getNextType = (types: FeedItemType[], lastUsedType: FeedItemType | null, recentTypesList: FeedItemType[]): FeedItemType => {
//         // Check for types that appear more than twice in the recent list
//         const typeCounts = recentTypesList.reduce((acc, type) => {
//             acc[type] = (acc[type] || 0) + 1;
//             return acc;
//         }, {} as Record<FeedItemType, number>);
        
//         // Filter out types that already appear twice or more in recent items
//         // Also prevent consecutive repetition
//         const availableTypes = types.filter(type => 
//             type !== lastUsedType && 
//             (!typeCounts[type] || typeCounts[type] < 2)
//         );
        
//         // If we have available types that meet our criteria, use one of them
//         if (availableTypes.length > 0) {
//             return availableTypes[Math.floor(Math.random() * availableTypes.length)];
//         }
        
//         // If all types appear twice or more, just prevent consecutive repetition
//         const nonConsecutiveTypes = types.filter(type => type !== lastUsedType);
//         return nonConsecutiveTypes[Math.floor(Math.random() * nonConsecutiveTypes.length)];
//     };

//     const generateFeedItem = (props: Property[], lastUsedType: FeedItemType | null, recentTypesList: FeedItemType[]): FeedItem | null => {
//         const types: FeedItemType[] = ['news', 'property', 'grid'];
//         const nextType = getNextType(types, lastUsedType, recentTypesList);

//         switch (nextType) {
//             case 'news':
//                 return { type: 'news', content: null, id: '' };
//             case 'property':
//                 if (props.length > 0) {
//                     // Get a random property that hasn't been used recently
//                     const randomIndex = Math.floor(Math.random() * props.length);
//                     const randomProperty = props[randomIndex];
//                     return { type: 'property', content: randomProperty, id: '' };
//                 }
//                 break;
//             case 'grid':
//                 if (props.length > 0) {
//                     // Get random properties for grid view - INCREASED TO AT LEAST 7
//                     const gridSize = Math.max(7, Math.min(props.length, 8));
//                     const randomProperties = [...props]
//                         .sort(() => 0.5 - Math.random())
//                         .slice(0, gridSize);
//                     return { type: 'grid', content: randomProperties, id: '' };
//                 }
//                 break;
//         }

//         // Fallback to news if we can't create the other types
//         return { type: 'news', content: null, id: '' };
//     };

//     const handleSearch = (query: string) => {
//         navigate('/chat', { state: { initialQuery: query } });
//     };

//     const renderFeedItem = (item: FeedItem) => {
//         switch (item.type) {
//             case 'news':
//                 return <RandomNewsCard key={item.id} />;
//             case 'property':
//                 return (
//                     <div key={item.id} className="mb-6 animate-fadeIn">
//                         <PropertyCard propertyId={item.content.id} />
//                     </div>
//                 );
//             case 'grid':
//                 return (
//                     <div key={item.id} className="mb-6 animate-fadeIn">
//                         <div className="flex items-center gap-1 mb-2 text-gray-600">
//                             <Award className="w-4 h-4" />
//                             <span className="text-sm font-semibold">Featured Properties</span>
//                         </div>
//                         <PropertyGrid properties={item.content} maxInitialDisplay={item.content.length} />
//                     </div>
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 w-full">
//             <div className="text-center mb-4 mt-[50px]">
//                 <Logo size={10} layout="col" />
//                 <div className="flex items-center justify-center gap-2 mt-4">
//                     <LocationSelector />
//                 </div>
//             </div>

//             <div className="w-full max-w-6xl">
//                 <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
//                 <div className="flex items-center justify-center">
//                     <p className="text-sm text-gray-600 mb-2">
//                         {activeTab === 'search'
//                             ? 'Let HouseGPT help you find the perfect match!'
//                             : 'Discover the best match for your property needs!'}
//                     </p>
//                 </div>
//                 {activeTab === 'search' ? (
//                     <>
//                         <div className="sticky top-16 bg-transparent z-50 ">
//                             <ChatTab onSubmit={handleSearch} />
//                         </div>
//                         <PremadeQuestions onQuestionClick={handleSearch} />
//                         <div className="my-4 text-gray-500">
//                             <div className="flex items-center gap-1 mb-2 text-gray-600">
//                                 <Award className="w-4 h-4" />
//                                 <span className="text-sm font-semibold">Top Properties in Mumbai</span>
//                             </div>

//                             {properties && <PropertyGrid properties={properties} maxInitialDisplay={8} />}

//                         </div>

//                         {/* Dynamic Feed with Infinite Scrolling */}
//                         <div className="mt-8">
//                             {feedItems.map(item => renderFeedItem(item))}

//                             {/* Loading indicator that triggers more content */}
//                             <div
//                                 ref={loadingRef}
//                                 className="flex justify-center items-center py-8"
//                             >
//                                 {loading && (
//                                     <div className="flex flex-col items-center gap-2">
//                                         <Loader className="w-6 h-6 animate-spin text-blue-500" />
//                                         <p className="text-sm text-gray-500">Loading more content...</p>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </>
//                 ) : (
//                     <>
//                         {properties &&
//                             <SearchTab preloadedProperties={properties} />}
//                     </>
//                 )}
//             </div>
//             <HomeChatButton onSubmit={handleSearch} />
//         </div>
//     );
// }

import { useState, useEffect, useRef, useCallback } from 'react';
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
import { Award, Loader } from 'lucide-react';
import { Property } from '../types';
import { PropertyCard } from '../components/property/PropertyCard';
import { RandomNewsCard } from '../components/news/RandomNewsCard';

type FeedItemType = 'news' | 'property' | 'grid';

interface FeedItem {
    type: FeedItemType;
    content: any;
    id: string; // Unique identifier for each feed item
}

export function Home() {
    const [activeTab, setActiveTab] = useState<'search' | 'report'>('search');
    const navigate = useNavigate();
    const [properties, setProperties] = useState<Property[]>([]);
    const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [location, setLocation] = useState("Mumbai");
    const [lastType, setLastType] = useState<FeedItemType | null>(null);
    // Keep track of the most recent types to avoid repeating more than twice
    const [recentTypes, setRecentTypes] = useState<FeedItemType[]>([]);
    // Counter for tracking grid frequency
    const [itemsSinceLastGrid, setItemsSinceLastGrid] = useState(0);

    // Observer for infinite scrolling
    const observer = useRef<IntersectionObserver | null>(null);
    const loadingRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && hasMore) {
                    loadMoreItems();
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    // Initial property fetch
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                const props: Property[] = await propertyService.searchProperties(location);
                setProperties(props);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching properties:", error);
                setLoading(false);
            }
        };

        fetchProperties();
    }, [location]);

    // Generate feed when properties are loaded
    useEffect(() => {
        if (properties.length > 0 && feedItems.length === 0) {
            initializeFeed();
        }
    }, [properties]);

    const initializeFeed = () => {
        const initialItems: FeedItem[] = [];
        const initialRecentTypes: FeedItemType[] = [];
        let gridCounter = 0;

        // Generate first 5 items for initial feed
        for (let i = 0; i < 5; i++) {
            const newItem = generateFeedItem(
                properties,
                initialItems.length > 0 ? initialItems[initialItems.length - 1].type : null,
                initialRecentTypes,
                gridCounter
            );

            if (newItem) {
                initialItems.push({
                    ...newItem,
                    id: `feed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
                });
                
                // Update recent types
                initialRecentTypes.push(newItem.type);
                if (initialRecentTypes.length > 5) {
                    initialRecentTypes.shift(); // Keep only the 5 most recent types
                }
                
                setLastType(newItem.type);
                
                // Update grid counter
                if (newItem.type === 'grid') {
                    gridCounter = 0;
                } else {
                    gridCounter++;
                }
            }
        }

        setFeedItems(initialItems);
        setRecentTypes(initialRecentTypes);
        setItemsSinceLastGrid(gridCounter);
    };

    const loadMoreItems = useCallback(() => {
        if (loading || !hasMore) return;

        setLoading(true);

        // Simulate network delay
        setTimeout(() => {
            const newItems: FeedItem[] = [];
            const currentRecentTypes = [...recentTypes];
            let gridCounter = itemsSinceLastGrid;

            // Generate 3 more items each time
            for (let i = 0; i < 3; i++) {
                const newItem = generateFeedItem(
                    properties,
                    newItems.length > 0 ? newItems[newItems.length - 1].type :
                        feedItems.length > 0 ? feedItems[feedItems.length - 1].type : null,
                    currentRecentTypes,
                    gridCounter
                );

                if (newItem) {
                    newItems.push({
                        ...newItem,
                        id: `feed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
                    });
                    
                    // Update recent types
                    currentRecentTypes.push(newItem.type);
                    if (currentRecentTypes.length > 5) {
                        currentRecentTypes.shift(); // Keep only the 5 most recent types
                    }
                    
                    setLastType(newItem.type);
                    
                    // Update grid counter
                    if (newItem.type === 'grid') {
                        gridCounter = 0;
                    } else {
                        gridCounter++;
                    }
                }
            }

            setFeedItems(prev => [...prev, ...newItems]);
            setRecentTypes(currentRecentTypes);
            setItemsSinceLastGrid(gridCounter);
            setLoading(false);

            // Always maintain hasMore as true to ensure content never ends
            setHasMore(true);
        }, 800); // Added delay to make loading more visible
    }, [loading, hasMore, properties, feedItems, recentTypes, itemsSinceLastGrid]);

    const getNextType = (
        types: FeedItemType[], 
        lastUsedType: FeedItemType | null, 
        recentTypesList: FeedItemType[],
        itemsAfterLastGrid: number
    ): FeedItemType => {
        // Decide if we should show a grid (around every 10 items)
        const shouldShowGrid = itemsAfterLastGrid >= 5;
        
        // If we've gone ~10 items without a grid, force a grid type
        if (shouldShowGrid) {
            return 'grid';
        }
        
        // Otherwise exclude grid from available types
        const availableTypes: FeedItemType[] = ['news', 'property'];
        
        // Check for types that appear more than twice in the recent list
        const typeCounts = recentTypesList.reduce((acc, type) => {
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {} as Record<FeedItemType, number>);
        
        // Filter out types that already appear twice or more in recent items
        // And prevent consecutive repetition
        const filteredTypes = availableTypes.filter(type => 
            type !== lastUsedType && 
            (!typeCounts[type] || typeCounts[type] < 2)
        );
        
        // If we have available types that meet our criteria, use one of them
        if (filteredTypes.length > 0) {
            return filteredTypes[Math.floor(Math.random() * filteredTypes.length)];
        }
        
        // If all types appear twice or more, just prevent consecutive repetition
        const nonConsecutiveTypes = availableTypes.filter(type => type !== lastUsedType);
        return nonConsecutiveTypes[Math.floor(Math.random() * nonConsecutiveTypes.length)];
    };

    const generateFeedItem = (
        props: Property[], 
        lastUsedType: FeedItemType | null, 
        recentTypesList: FeedItemType[],
        itemsAfterLastGrid: number
    ): FeedItem | null => {
        const types: FeedItemType[] = ['news', 'property', 'grid'];
        const nextType = getNextType(types, lastUsedType, recentTypesList, itemsAfterLastGrid);

        switch (nextType) {
            case 'news':
                return { type: 'news', content: null, id: '' };
            case 'property':
                if (props.length > 0) {
                    // Get a random property that hasn't been used recently
                    const randomIndex = Math.floor(Math.random() * props.length);
                    const randomProperty = props[randomIndex];
                    return { type: 'property', content: randomProperty, id: '' };
                }
                break;
            case 'grid':
                if (props.length > 0) {
                    // Get random properties for grid view - INCREASED TO AT LEAST 7
                    const gridSize = Math.max(7, Math.min(props.length, 8));
                    const randomProperties = [...props]
                        .sort(() => 0.5 - Math.random())
                        .slice(0, gridSize);
                    return { type: 'grid', content: randomProperties, id: '' };
                }
                break;
        }

        // Fallback to news if we can't create the other types
        return { type: 'news', content: null, id: '' };
    };

    const handleSearch = (query: string) => {
        navigate('/chat', { state: { initialQuery: query } });
    };

    const renderFeedItem = (item: FeedItem) => {
        switch (item.type) {
            case 'news':
                return <RandomNewsCard key={item.id} />;
            case 'property':
                return (
                    <div key={item.id} className="mb-6 animate-fadeIn">
                        <PropertyCard propertyId={item.content.id} />
                    </div>
                );
            case 'grid':
                return (
                    <div key={item.id} className="mb-6 animate-fadeIn">
                        <div className="flex items-center gap-1 mb-2 text-gray-600">
                            <Award className="w-4 h-4" />
                            <span className="text-sm font-semibold">Featured Properties</span>
                        </div>
                        <PropertyGrid properties={item.content} maxInitialDisplay={item.content.length} />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 w-full">
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
                        <div className="bg-transparent">
                            <ChatTab onSubmit={handleSearch} />
                        </div>
                        <PremadeQuestions onQuestionClick={handleSearch} />
                        <div className="my-4 text-gray-500 z-48">
                            <div className="flex items-center gap-1 mb-2 text-gray-600">
                                <Award className="w-4 h-4" />
                                <span className="text-sm font-semibold">Top Properties in Mumbai</span>
                            </div>

                            {properties && <PropertyGrid properties={properties} maxInitialDisplay={8} />}

                        </div>

                        {/* Dynamic Feed with Infinite Scrolling */}
                        <div className="mt-8">
                            {feedItems.map(item => renderFeedItem(item))}

                            {/* Loading indicator that triggers more content */}
                            <div
                                ref={loadingRef}
                                className="flex justify-center items-center py-8"
                            >
                                {loading && (
                                    <div className="flex flex-col items-center gap-2">
                                        <Loader className="w-6 h-6 animate-spin text-blue-500" />
                                        <p className="text-sm text-gray-500">Loading more content...</p>
                                    </div>
                                )}
                            </div>
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