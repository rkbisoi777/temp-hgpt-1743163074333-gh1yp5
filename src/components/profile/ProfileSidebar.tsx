import { X, User, Heart, Scale, LogOut, Plus, LayoutDashboard } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { ProfileMenuItem } from './ProfileMenuItem';
import { useNavigate } from 'react-router-dom';

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileSidebar({ isOpen, onClose }: ProfileSidebarProps) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  const handleProfileClick = () => {
    if(user?.role === 'developer'){
      navigate(`/developer/${user.id}`)
    }else{
      navigate('/profile');
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Profile</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="font-medium">{user?.name || user?.email}</p>
              <p className="text-sm text-gray-500">{user?.phone}</p>
            </div>
          </div>

          <div className="space-y-1">
            <ProfileMenuItem 
              icon={User} 
              label="My Profile" 
              onClick={handleProfileClick}
            />
             {user?.role == 'user' && (<ProfileMenuItem 
              icon={Heart} 
              label="Wishlist" 
              onClick={onClose} 
              to="/wishlist"
            />)}
             {user?.role == 'user' && (<ProfileMenuItem 
              icon={Scale} 
              label="Compare" 
              onClick={onClose} 
              to="/compare"
            />)}
            {user?.role == 'developer' && (<ProfileMenuItem 
              icon={LayoutDashboard} 
              label="Dashboard" 
              onClick={onClose} 
              to="/developer/dashboard"
            />)}
            {user?.role == 'developer' && (<ProfileMenuItem 
              icon={Plus} 
              label="Add Property" 
              onClick={onClose} 
              to="/developer/add-property"
            />)}
            <ProfileMenuItem 
              icon={LogOut} 
              label="Logout" 
              onClick={handleLogout} 
              className="text-red-500 hover:bg-red-50"
            />
          </div>
        </div>
      </div>
    </>
  );
}