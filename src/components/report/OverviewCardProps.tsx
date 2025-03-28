import React from 'react';

interface OverviewCardProps {
  projectName: string;
  projectArea: string;
  sizes: string;
  projectSize: string;
  launchDate: string;
  avgPrice: string;
  possessionStarts: string;
  configurations: string;
  reraId: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  projectName,
  projectArea,
  sizes,
  projectSize,
  launchDate,
  avgPrice,
  possessionStarts,
  configurations,
  reraId,
}) => {
  return (
    <div className="rounded-lg border border-gray-300 bg-white shadow-lg overflow-hidden mt-4">
      <div className="p-4">
        <div className='flex flex-row justify-between'>
          <h2 className="text-lg font-bold text-gray-800 mb-2">{projectName} Overview</h2>


        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-2">
          <div className="space-y-1">
            <div className="flex justify-start items-center">
              <i className="fas fa-building h-5 w-5 text-gray-600 ml-2"></i>
              <div className='flex flex-col ml-2'>
                <span className="font-semibold text-gray-600">Project Area</span>
                <span className="text-gray-800 flex items-center">
                  {projectArea}
                </span>
              </div>

            </div>
            <div className="flex justify-start items-center">
              <i className="fas fa-ruler-combined h-5 w-5 text-gray-600 ml-2"></i>
              <div className='flex flex-col ml-2'>
                <span className="font-semibold text-gray-600">Sizes</span>
                <span className="text-gray-800 flex items-center">
                  {sizes}

                </span>
              </div>
            </div>
            <div className="flex justify-start items-center">
              <i className="fas fa-cogs h-5 w-5 text-gray-600 ml-2"></i>
              <div className='flex flex-col ml-2'>
                <span className="font-semibold text-gray-600">Configurations</span>
                <span className="text-gray-800 flex items-center">
                  {configurations}

                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-start items-center">
              <i className="fas fa-th-large h-5 w-5 text-gray-600 ml-2"></i>
              <div className='flex flex-col ml-2'>
                <span className="font-semibold text-gray-600">Project Size</span>
                <span className="text-gray-800 flex items-center">
                  {projectSize}

                </span>
              </div>
            </div>
            <div className="flex justify-start items-center">
              <i className="fas fa-calendar-day h-5 w-5 text-gray-600 ml-2"></i>
              <div className='flex flex-col ml-2'>
                <span className="font-semibold text-gray-600">Launch Date</span>
                <span className="text-gray-800 flex items-center">
                  {launchDate}

                </span>
              </div>
            </div>
            <div className="flex justify-start items-center">
              <i className="fas fa-dollar-sign h-5 w-5 text-gray-600 ml-2"></i>
              <div className='flex flex-col ml-2'>
                <span className="font-semibold text-gray-600">Avg. Price</span>
                <span className="text-gray-800 flex items-center">
                  {avgPrice}

                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-start items-center">
              <i className="fas fa-calendar-check h-5 w-5 text-gray-600 ml-2"></i>
              <div className='flex flex-col ml-2'>
                <span className="font-semibold text-gray-600">Possession Starts</span>
                <span className="text-gray-800 flex items-center">
                  {possessionStarts}

                </span>
              </div>
            </div>
            <div className="flex justify-start items-center">
              <i className="fas fa-file-alt h-5 w-5 text-gray-600 ml-2"></i>
              <div className='flex flex-col ml-2'>
                <span className="font-semibold text-gray-600">RERA ID</span>
                <span className="text-gray-800 flex items-center">
                  {reraId}

                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-4 flex flex-wrap justify-center items-center gap-4">
        <button className="bg-blue-200 text-blue-700 px-2 py-1 h-8 rounded text-sm flex items-center">
          <i className="fas fa-download h-5 w-5 text-blue-600 mr-2 mt-1"></i>
          Download Brochure
        </button>
        <button className="bg-blue-200 text-blue-700 px-2 py-1 h-8 rounded text-sm">Save</button>
        <button className="bg-blue-200 text-blue-700 px-2 py-1 h-8 rounded text-sm">Share</button>
        <button className="bg-blue-600 text-white px-3 py-1 h-8 rounded hover:bg-blue-700">
          Ask For Details
        </button>
      </div>
    </div>
  );
};

export default OverviewCard;
