import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface ProfileMenuItemProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  to?: string;
  className?: string;
}

export function ProfileMenuItem({ 
  icon: Icon, 
  label, 
  onClick, 
  to, 
  className = ''
}: ProfileMenuItemProps) {
  const baseClasses = `flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors ${className}`;
  
  if (to) {
    return (
      <Link to={to} className={baseClasses} onClick={onClick}>
        <Icon className="w-5 h-5" />
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <button className={baseClasses} onClick={onClick}>
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}