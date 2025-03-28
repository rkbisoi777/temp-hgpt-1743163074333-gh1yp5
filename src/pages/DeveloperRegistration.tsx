// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '../lib/supabase';
// import { toast } from 'react-hot-toast';
// import { useAuthStore } from '../store/authStore';

// export function DeveloperRegistration() {
//   const navigate = useNavigate();
//   const { user } = useAuthStore();
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     company_name: '',
//     description: '',
//     website: '',
//     established_year: '',
//     specializations: [] as string[],
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // if (!user) {
//     //   toast.error('Please login first');
//     //   return;
//     // }

//     setIsLoading(true);
//     try {
//       // Update user role to developer
//       const { error: roleError } = await supabase.auth.updateUser({
//         data: { role: 'developer' }
//       });

//       if (roleError) throw roleError;

//       // Create developer profile
//       const { error: profileError } = await supabase
//         .from('developers')
//         .insert([{
//           id: user.id,
//           ...formData,
//           established_year: parseInt(formData.established_year),
//           specializations: JSON.stringify(formData.specializations),
//         }]);

//       if (profileError) throw profileError;

//       toast.success('Successfully registered as developer!');
//       navigate('/developer/register');
//     } catch (error) {
//       console.error('Registration error:', error);
//       toast.error('Failed to register as developer');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSpecializationChange = (specialization: string) => {
//     setFormData(prev => ({
//       ...prev,
//       specializations: prev.specializations.includes(specialization)
//         ? prev.specializations.filter(s => s !== specialization)
//         : [...prev.specializations, specialization]
//     }));
//   };

//   const specializationOptions = [
//     'Residential',
//     'Commercial',
//     'Luxury',
//     'Affordable Housing',
//     'Green Buildings',
//     'Smart Homes',
//     'Mixed Use',
//     'Townships'
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold mb-6">Register as Developer</h1>
        
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium mb-1">Company Name *</label>
//             <input
//               type="text"
//               value={formData.company_name}
//               onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
//               className="w-full px-3 py-2 border rounded-md"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Description</label>
//             <textarea
//               value={formData.description}
//               onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
//               className="w-full px-3 py-2 border rounded-md"
//               rows={4}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Website</label>
//             <input
//               type="url"
//               value={formData.website}
//               onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
//               className="w-full px-3 py-2 border rounded-md"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Established Year</label>
//             <input
//               type="number"
//               value={formData.established_year}
//               onChange={(e) => setFormData(prev => ({ ...prev, established_year: e.target.value }))}
//               className="w-full px-3 py-2 border rounded-md"
//               min="1900"
//               max={new Date().getFullYear()}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Specializations</label>
//             <div className="grid grid-cols-2 gap-2">
//               {specializationOptions.map(specialization => (
//                 <label key={specialization} className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     checked={formData.specializations.includes(specialization)}
//                     onChange={() => handleSpecializationChange(specialization)}
//                     className="rounded border-gray-300"
//                   />
//                   <span className="text-sm">{specialization}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
//           >
//             {isLoading ? 'Registering...' : 'Register as Developer'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';  // Assuming your supabase client is here
import { toast } from 'react-hot-toast';

export function DeveloperRegistration() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    company_name: '',
    description: '',
    website: '',
    established_year: '',
    specializations: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      // Step 1: Register the user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            role: 'developer', // Set default role as developer
          },
        },
      });

      if (signUpError) throw signUpError;

      const userId = data.user?.id;
      if (!userId) {
        throw new Error('Failed to retrieve user ID after registration.');
      }

      // Step 2: Create developer profile
      const { error: profileError } = await supabase
        .from('developers')
        .insert([{
          id: userId,
          company_name: formData.company_name,
          description: formData.description,
          website: formData.website,
          established_year: parseInt(formData.established_year),
          specializations: JSON.stringify(formData.specializations),
        }]);

      if (profileError) throw profileError;

      toast.success('Developer account created successfully!');
      navigate('/developer/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to create developer account.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpecializationChange = (specialization: string) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(specialization)
        ? prev.specializations.filter(s => s !== specialization)
        : [...prev.specializations, specialization]
    }));
  };

  const specializationOptions = [
    'Residential',
    'Commercial',
    'Luxury',
    'Affordable Housing',
    'Green Buildings',
    'Smart Homes',
    'Mixed Use',
    'Townships'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="">
        <h1 className="text-2xl text-center text-blue-500 font-bold mb-6">Register as Developer</h1>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md border border-blue-500">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Password *</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Company Name *</label>
            <input
              type="text"
              value={formData.company_name}
              onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md"
              rows={4}
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium mb-1">Website</label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* Established Year */}
          <div>
            <label className="block text-sm font-medium mb-1">Established Year</label>
            <input
              type="number"
              value={formData.established_year}
              onChange={(e) => setFormData(prev => ({ ...prev, established_year: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md"
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>

          {/* Specializations */}
          <div>
            <label className="block text-sm font-medium mb-2">Specializations</label>
            <div className="grid grid-cols-2 gap-2">
              {specializationOptions.map(specialization => (
                <label key={specialization} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.specializations.includes(specialization)}
                    onChange={() => handleSpecializationChange(specialization)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">{specialization}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? 'Registering...' : 'Register as Developer'}
          </button>
        </form>
      </div>
    </div>
  );
}
