// interface PropertyTabsProps {
//   activeTab: string;
//   onTabClick: (tab: string) => void;
// }

// export function PropertyTabs({ activeTab, onTabClick }: PropertyTabsProps) {
//   return (
//     <div className="border border-gray-200 rounded-md mb-2 px-2 py-1.5 overflow-x-auto scrollbar-hide z-45">
//       <nav className="flex space-x-2">
//         <button
//           className={`py-1 px-2 text-sm font-medium ${
//             activeTab === 'OverviewCard' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
//           }`}
//           onClick={() => onTabClick('OverviewCard')}
//         >
//           Overview
//         </button>
        
//         <button
//           className={`py-1 px-2 text-sm font-medium min-w-20 ${
//             activeTab === 'FloorPlan' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
//           }`}
//           onClick={() => onTabClick('FloorPlan')}
//         >
//           Floor Plan
//         </button>
        
//         <button
//           className={`py-1 px-2 text-sm font-medium min-w-20 ${
//             activeTab === 'NearbyFacilities' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
//           }`}
//           onClick={() => onTabClick('NearbyFacilities')}
//         >
//           Nearby
//         </button>
        
//         <button
//           className={`py-1 px-2 text-sm font-medium min-w-20 ${
//             activeTab === 'NeighborhoodMap' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
//           }`}
//           onClick={() => onTabClick('NeighborhoodMap')}
//         >
//           Map View
//         </button>
        
//         <button
//           className={`py-1 px-2 text-sm font-medium ${
//             activeTab === 'PropertyGallery' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
//           }`}
//           onClick={() => onTabClick('PropertyGallery')}
//         >
//           Gallery
//         </button>
        
//         <button
//           className={`py-1 px-2 text-sm font-medium ${
//             activeTab === 'Amenities' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
//           }`}
//           onClick={() => onTabClick('Amenities')}
//         >
//           Amenities
//         </button>
        
//         <button
//           className={`py-1 px-2 text-sm font-medium ${
//             activeTab === 'FAQ' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
//           }`}
//           onClick={() => onTabClick('FAQ')}
//         >
//           FAQs
//         </button>
        
//         <button
//           className={`py-1 px-2 text-sm font-medium min-w-24 ${
//             activeTab === 'PropertyGraph' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
//           }`}
//           onClick={() => onTabClick('PropertyGraph')}
//         >
//           Price Trends
//         </button>
        
//         <button
//           className={`py-1 px-2 text-sm font-medium ${
//             activeTab === 'LocalityStats' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
//           }`}
//           onClick={() => onTabClick('LocalityStats')}
//         >
//           Locality
//         </button>
//       </nav>
//     </div>
//   );
// }

import React from "react";

interface PropertyTabsProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

export function PropertyTabs({ activeTab, onTabClick }: PropertyTabsProps) {
  const tabsContainerRef = React.useRef<HTMLDivElement>(null);
  const activeTabRef = React.useRef<HTMLButtonElement>(null);

  // Center the active tab
  React.useEffect(() => {
    if (tabsContainerRef.current && activeTabRef.current) {
      const container = tabsContainerRef.current;
      const activeTabElement = activeTabRef.current;
      
      // Calculate the center position
      const containerWidth = container.offsetWidth;
      const tabWidth = activeTabElement.offsetWidth;
      const tabLeft = activeTabElement.offsetLeft;
      
      // Center the tab in the container
      container.scrollLeft = tabLeft - containerWidth / 2 + tabWidth / 2;
    }
  }, [activeTab]);

  return (
    <div 
      ref={tabsContainerRef}
      className="border border-gray-200 rounded-md mb-2 px-2 py-1.5 overflow-x-auto scrollbar-hide z-40"
    >
      <nav className="flex space-x-2">
      <button
          ref={activeTab === 'PropertyScore' ? activeTabRef : null}
          className={`py-1 px-2 text-sm font-medium min-w-32 ${
            activeTab === 'PropertyScore' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
          }`}
          onClick={() => onTabClick('PropertyScore')}
        >
          HouseGPT Score
        </button>

        <button
          ref={activeTab === 'OverviewCard' ? activeTabRef : null}
          className={`py-1 px-2 text-sm font-medium ${
            activeTab === 'OverviewCard' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
          }`}
          onClick={() => onTabClick('OverviewCard')}
        >
          Overview
        </button>
        
        <button
          ref={activeTab === 'FloorPlan' ? activeTabRef : null}
          className={`py-1 px-2 text-sm font-medium min-w-20 ${
            activeTab === 'FloorPlan' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
          }`}
          onClick={() => onTabClick('FloorPlan')}
        >
          Floor Plan
        </button>
        
        {/* <button
          ref={activeTab === 'NearbyFacilities' ? activeTabRef : null}
          className={`py-1 px-2 text-sm font-medium min-w-20 ${
            activeTab === 'NearbyFacilities' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
          }`}
          onClick={() => onTabClick('NearbyFacilities')}
        >
          Nearby
        </button> */}

        {/* <button
          ref={activeTab === 'LocationOverview' ? activeTabRef : null}
          className={`py-1 px-2 text-sm font-medium min-w-40 ${
            activeTab === 'LocationOverview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
          }`}
          onClick={() => onTabClick('LocationOverview')}
        >
          Location Overview
        </button> */}
        
        <button
          ref={activeTab === 'NeighborhoodMap' ? activeTabRef : null}
          className={`py-1 px-2 text-sm font-medium ${
            activeTab === 'NeighborhoodMap' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
          }`}
          onClick={() => onTabClick('NeighborhoodMap')}
        >
          Locality
        </button>
        
        <button
          ref={activeTab === 'PropertyGallery' ? activeTabRef : null}
          className={`py-1 px-2 text-sm font-medium ${
            activeTab === 'PropertyGallery' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
          }`}
          onClick={() => onTabClick('PropertyGallery')}
        >
          Gallery
        </button>

        {/* <button
          ref={activeTab === 'LocalityStats' ? activeTabRef : null}
          className={`py-1 px-2 text-sm font-medium ${
            activeTab === 'LocalityStats' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
          }`}
          onClick={() => onTabClick('LocalityStats')}
        >
          Locality
        </button> */}
        
        <button
          ref={activeTab === 'Amenities' ? activeTabRef : null}
          className={`py-1 px-2 text-sm font-medium ${
            activeTab === 'Amenities' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
          }`}
          onClick={() => onTabClick('Amenities')}
        >
          Amenities
        </button>
        
        <button
          ref={activeTab === 'PropertyGraph' ? activeTabRef : null}
          className={`py-1 px-2 text-sm font-medium min-w-24 ${
            activeTab === 'PropertyGraph' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
          }`}
          onClick={() => onTabClick('PropertyGraph')}
        >
          Price Trends
        </button>
        
        <button
          ref={activeTab === 'FAQ' ? activeTabRef : null}
          className={`py-1 px-2 text-sm font-medium ${
            activeTab === 'FAQ' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
          }`}
          onClick={() => onTabClick('FAQ')}
        >
          FAQs
        </button>
        
      </nav>
    </div>
  );
}