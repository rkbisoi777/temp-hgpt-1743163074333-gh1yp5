import React, { useState } from 'react';

interface FloorPlanTab {
  label: string;
  image2D: string;
  image3D: string;
}

const FloorPlan: React.FC = () => {
  // Define the tabs and their images for 2D and 3D views
  const tabs: FloorPlanTab[] = [
    {
      label: '1BHK',
      image2D: 'https://media.istockphoto.com/id/1288292255/photo/residential-building-blueprint-plan-real-estate-housing-project-construction-concept.jpg?s=1024x1024&w=is&k=20&c=8frNLuC-FniyIt_b1N1yY7aTig5gSw3X7w-F2d-fsTI=',
      image3D: 'https://media.istockphoto.com/id/1095889910/photo/3d-floor-plan-of-a-residential-unit.jpg?s=1024x1024&w=is&k=20&c=ZTpq6PnYRJtvB9mk2wcM2E-N4VFFRucy_fIfqxPL27I=',
    },
    {
      label: '2BHK',
      image2D: '/images/2bhk_2d.png',
      image3D: '/images/2bhk_3d.png',
    },
    {
      label: '3BHK',
      image2D: '/images/3bhk_2d.png',
      image3D: '/images/3bhk_3d.png',
    },
  ];

  // Track the active tab and view mode (2D/3D)
  const [activeTab, setActiveTab] = useState<number>(0);
  const [is3D, setIs3D] = useState<boolean>(false);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  const handleViewToggle = () => {
    setIs3D(!is3D);
  };

  return (
    <div className="rounded-lg border border-gray-300 bg-white shadow-lg overflow-hidden p-3 mt-4">
       <h3 className="text-lg font-semibold">Floor Plan View</h3>
      <div className="tabs flex space-x-4 mb-4 border-b">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            className={`tab-btn py-2 px-4 font-semibold ${
              activeTab === index ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'
            }`}
            onClick={() => handleTabChange(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-end mb-4">
       
        <label className="inline-flex items-center cursor-pointer">
          <span className="mr-2 text-sm">2D</span>
          <div className="relative">
            <input
              type="checkbox"
              checked={is3D}
              onChange={handleViewToggle}
              className="hidden"
            />
            <div className="w-10 h-5 bg-gray-300 rounded-full shadow-inner"></div>
            <div
              className={`absolute top-0 left-0 w-5 h-5 bg-blue-500 rounded-full transition-all ${
                is3D ? 'transform translate-x-5' : ''
              }`}
            ></div>
          </div>
          <span className="ml-2 text-sm">3D</span>
        </label>
      </div>

      <div className="floor-plan-image">
        <img
          src={is3D ? tabs[activeTab].image3D : tabs[activeTab].image2D}
          alt={`${tabs[activeTab].label} floor plan`}
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default FloorPlan;
