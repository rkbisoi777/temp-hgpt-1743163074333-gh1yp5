// import React, { useState, useEffect } from "react";
// import { useAuthStore } from "../store/authStore";
// import { ProfileService } from "../lib/profileService";
// import { PhoneInput } from "../components/auth/PhoneInput";
// import { toast } from "react-hot-toast";
// import { Edit } from 'lucide-react';

// interface Profile {
//   id: string;
//   full_name?: string;
//   email: string;
//   phone_number?: string;
//   profile_picture?: string;
//   location?: string;
//   buy_or_rent?: "Buy" | "Rent";
//   property_type?: string;
//   budget?: number;
//   city?: string;
//   locality?: string;
//   transport?: string;
//   configuration?: string;
//   readiness?: string;
//   amenities?: string[];
//   facilities?: string;
//   gated?: boolean;
//   environment?: string[];
//   appreciation?: number;
//   insights?: string;
//   additional_info?: string;
//   decision_time?: string;
//   created_at?: string;
// }

// export function Profile() {
//   const { user } = useAuthStore();
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         if (user?.id) {
//           const profileData = await ProfileService.getProfile(user.id);
//           setProfile(profileData);
//         }
//       } catch (error) {
//         toast.error("Failed to load profile");
//       }
//     };

//     fetchProfileData();
//   }, [user]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setProfile((prev: any) => prev ? { ...prev, [name]: value } : prev);
//   };

//   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setProfile((prev: any) => prev ? { ...prev, gated: e.target.checked } : prev);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!profile) return;

//     setIsLoading(true);
//     try {
//       await ProfileService.updateProfile(user!.id, profile);
//       setIsEditing(false);
//       toast.success("Profile updated successfully");
//     } catch (error) {
//       toast.error("Failed to update profile");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!profile) {
//     return <p className="text-center">Loading profile...</p>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-4 py-8">
//       <div className="flex flex-row justify-between">
//       <h1 className="text-2xl font-bold mb-6">My Profile</h1>
//       <button type="button" onClick={() => setIsEditing(true)} className="px-2 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 h-8"><Edit className="size-4"/></button>
//       </div>
      

//       <form onSubmit={handleSubmit} className={`space-y-4 rounded-lg border ${isEditing ? 'border-blue-500 p-4' : ''}`}>
//         {/* Email (Non-editable) */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//           <input type="email" value={profile.email} disabled className="w-full px-4 py-2 border rounded-lg bg-gray-50" />
//         </div>

//         {/* Full Name */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//           <input type="text" name="full_name" value={profile.full_name || ""} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-2 border rounded-lg" />
//         </div>

//         {/* Phone Number */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//           <PhoneInput value={profile.phone_number || ""} onChange={(value) => setProfile((prev) => prev ? { ...prev, phone_number: value } : prev)} disabled={!isEditing} />
//         </div>

//         {/* Buy or Rent */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Buy or Rent</label>
//           <select name="buy_or_rent" value={profile.buy_or_rent || "Buy"} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-2 border rounded-lg">
//             <option value="Buy">Buy</option>
//             <option value="Rent">Rent</option>
//           </select>
//         </div>

//         {/* Property Type */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
//           <input type="text" name="property_type" value={profile.property_type || ""} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-2 border rounded-lg" />
//         </div>

//         {/* Budget */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
//           <input type="number" name="budget" value={profile.budget || ""} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-2 border rounded-lg" />
//         </div>

//         {/* Gated Community */}
//         <div className="flex items-center">
//           <input type="checkbox" name="gated" checked={profile.gated || false} onChange={handleCheckboxChange} disabled={!isEditing} className="mr-2" />
//           <label className="text-sm font-medium text-gray-700">Gated Community</label>
//         </div>

//         {/* Additional Info */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Additional Info</label>
//           <textarea name="additional_info" value={profile.additional_info || ""} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-2 border rounded-lg" />
//         </div>

//         {/* Buttons */}
//         <div className="flex gap-3">
//           {isEditing && (
//             <>
//               <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50">{isLoading ? "Saving..." : "Save Changes"}</button>
//               <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
//             </>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }


import React, { useState, useEffect, useRef } from "react";
import { useAuthStore } from "../store/authStore";
import { ProfileService } from "../lib/profileService";
import { PhoneInput } from "../components/auth/PhoneInput";
import { toast } from "react-hot-toast";
import { Edit, Save } from 'lucide-react';

interface Profile {
  id: string;
  full_name?: string;
  email: string;
  phone_number?: string;
  profile_picture?: string;
  location?: string;
  buy_or_rent?: "Buy" | "Rent";
  property_type?: string;
  budget?: number;
  city?: string;
  locality?: string;
  transport?: string;
  configuration?: string;
  readiness?: string;
  amenities?: string[];
  facilities?: string;
  gated?: boolean;
  environment?: string[];
  appreciation?: number;
  insights?: string;
  additional_info?: string;
  decision_time?: string;
  created_at?: string;
}

export function Profile() {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null); // Form reference

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (user?.id) {
          const profileData = await ProfileService.getProfile(user.id);
          setProfile(profileData);
        }
      } catch (error) {
        toast.error("Failed to load profile");
      }
    };

    fetchProfileData();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev: any) => prev ? { ...prev, [name]: value } : prev);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prev: any) => prev ? { ...prev, gated: e.target.checked } : prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setIsLoading(true);
    try {
      await ProfileService.updateProfile(user!.id, profile);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleEditing = () => {
    if (isEditing) {
      // If saving, submit the form manually
      formRef.current?.requestSubmit();
    } else {
      // Toggle to editing mode
      setIsEditing(true);
    }
  };

  if (!profile) {
    return <p className="text-center">Loading profile...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 py-8">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        <button type="button" onClick={toggleEditing} className={`px-2 py-1 rounded-lg hover:bg-blue-300  h-8 ${isEditing ? 'bg-blue-500 text-white':'bg-gray-200 text-gray-900'}`}>
          {isEditing ? (
            <Save className="size-4" /> // Change icon to Save when in editing mode
          ) : (
            <Edit className="size-4" />
          )}
        </button>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className={`space-y-4 rounded-lg ${isEditing ? 'border border-blue-500 p-4' : ''}`}>
        {/* Email (Non-editable) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" value={profile.email} disabled className="w-full px-4 py-2 border rounded-lg bg-gray-50" />
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input type="text" name="full_name" value={profile.full_name || ""} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-2 border rounded-lg" />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <PhoneInput value={profile.phone_number || ""} onChange={(value) => setProfile((prev) => prev ? { ...prev, phone_number: value } : prev)} disabled={!isEditing} />
        </div>

        {/* Buy or Rent */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Buy or Rent</label>
          <select name="buy_or_rent" value={profile.buy_or_rent || "Buy"} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-2 border rounded-lg">
            <option value="Buy">Buy</option>
            <option value="Rent">Rent</option>
          </select>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
          <input type="text" name="property_type" value={profile.property_type || ""} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-2 border rounded-lg" />
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
          <input type="number" name="budget" value={profile.budget || ""} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-2 border rounded-lg" />
        </div>

        {/* Gated Community */}
        <div className="flex items-center">
          <input type="checkbox" name="gated" checked={profile.gated || false} onChange={handleCheckboxChange} disabled={!isEditing} className="mr-2" />
          <label className="text-sm font-medium text-gray-700">Gated Community</label>
        </div>

        {/* Additional Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Info</label>
          <textarea name="additional_info" value={profile.additional_info || ""} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-2 border rounded-lg" />
        </div>

        {/* Buttons */}
        <div className="flex flex-row justify-center gap-3">
          {isEditing && (
            <>
            <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50">{isLoading ? "Saving..." : "Save Changes"}</button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
