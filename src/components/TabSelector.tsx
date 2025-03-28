import React from 'react';
import { Search, MessageCircle } from 'lucide-react';

interface TabSelectorProps {
  activeTab: 'search' | 'report';
  onTabChange: (tab: 'search' | 'report') => void;
}

export function TabSelector({ activeTab, onTabChange }: TabSelectorProps) {
  return (
    <div className="flex justify-center mb-2">
      <div className="bg-gray-100 p-1 rounded-full flex items-center text-sm">
        <button
          onClick={() => onTabChange('search')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${
            activeTab === 'search'
              ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <i className="fas fa-message"></i>
          
          {/* <span>Search</span> */}
        </button>
        <button
          onClick={() => onTabChange('report')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${
            activeTab === 'report'
              ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <i className="fas fa-city"></i>
          {/* <Search className="w-3.5 h-3.5" /> */}
          {/* <span>Properties</span> */}
        </button>
      </div>
    </div>
  );
}