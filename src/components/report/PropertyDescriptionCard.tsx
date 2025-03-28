import React, { useState } from 'react';

interface PropertyDescriptionCardProps {
  title?: string;
  description?: string;
}

export function PropertyDescriptionCard({ title, description }: PropertyDescriptionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const defaultTitle = 'Sample Property Title';
  const defaultDescription = 'This is a sample property description. It gives a brief overview of the property, highlighting its key features and amenities. Click read more to see the full details of the property description.';

  return (
    <div className="rounded-lg border border-gray-300 bg-white shadow-lg overflow-hidden p-3 mt-4">
      <h2 className="text-lg font-bold mb-2">{title || defaultTitle}</h2>
      <p className="text-gray-700 text-sm">
        {isExpanded ? (description || defaultDescription) : `${(description || defaultDescription).slice(0, 300)}...`}
      </p>
      <div className="flex justify-end">
        <button
        onClick={toggleReadMore}
        className="mt-2 text-blue-500 text-xs hover:underline focus:outline-none"
      >
        {isExpanded ? 'Read Less' : 'Read More'}
      </button>
      </div>
      
    </div>
  );
}