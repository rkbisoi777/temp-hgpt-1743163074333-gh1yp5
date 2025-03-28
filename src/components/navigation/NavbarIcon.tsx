import { LucideIcon } from 'lucide-react';

interface NavbarIconProps {
  icon: LucideIcon;
  count?: number;
  isActive?: boolean;
  type: string;
}

export function NavbarIcon({ icon: Icon, count, isActive, type }: NavbarIconProps) {
  return (
    <div className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
      {type !== 'wishlist' ? (
        <Icon className={`w-5 h-5 text-blue-500`} fill={`${isActive ? 'currentColor': 'none'}`}/>
      ):(
        <Icon className={`w-5 h-5 text-red-500`} fill={`${isActive ? 'currentColor': 'none'}`}/>
      )}
      {typeof count !== 'undefined' && count > 0 && (
        <span className={`absolute -top-0.5 -right-0.5 ${(type === 'wishlist') ?'bg-red-500':'bg-blue-500'}  text-white text-xs rounded-full w-[18px] h-[18px] flex items-center justify-center text-[10px]`}>
          {count}
        </span>
      )}
    </div>
  );
}