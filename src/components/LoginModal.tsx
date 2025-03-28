// import { useState } from 'react';

// interface LoginModalProps {
//   onClose: () => void;
//   onLoginSuccess: () => void;
// }

// export function LoginModal({ onClose, onLoginSuccess }: LoginModalProps) {
//   const [phone, setPhone] = useState('');
//   const [otp, setOtp] = useState('');

//   const handleLogin = () => {
//     // Simulate login (replace with your Supabase auth logic)
//     if (phone.length === 10 && otp === '123456') {
//       onLoginSuccess();
//     } else {
//       alert('Invalid login details');
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-lg font-bold mb-4">Login to Continue</h2>
//         <input
//           type="text"
//           placeholder="Enter phone number"
//           className="border p-2 w-full mb-2"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Enter OTP"
//           className="border p-2 w-full mb-2"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//         />
//         <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleLogin}>
//           Login
//         </button>
//         <button className="ml-2 text-gray-500" onClick={onClose}>
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { useAuthStore } from '../store/authStore';
// import { toast } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// interface LoginModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export function LoginModal({ isOpen, onClose }: LoginModalProps) {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState<'user' | 'developer'>('user');
//   const { login, isLoading, error, user } = useAuthStore();

//   useEffect(() => {
//     if (user) {
//       setEmail('');
//       setPassword('');
//     //   toast.success('Successfully logged in!');
//       onClose();
//     }
//   }, [user, onClose]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await login(email, password, role);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center h-screen w-screen z-50 mx-4">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
//         {/* <button
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//           onClick={onClose}
//         >
//           &times;
//         </button> */}
//         <h2 className="text-2xl text-center text-blue-500 font-bold mb-6">Login</h2>
        
//         <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md border border-blue-500">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="email@example.com"
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="••••••••"
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Login As</label>
//             <div className="flex gap-4">
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="role"
//                   value="user"
//                   checked={role === 'user'}
//                   onChange={(e) => setRole(e.target.value as 'user')}
//                   className="mr-2"
//                 />
//                 <span className="text-sm">User</span>
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="role"
//                   value="developer"
//                   checked={role === 'developer'}
//                   onChange={(e) => setRole(e.target.value as 'developer')}
//                   className="mr-2"
//                 />
//                 <span className="text-sm">Developer</span>
//               </label>
//             </div>
//           </div>

//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Loading...' : 'Login'}
//           </button>
//         </form>

//         <div className="mt-4 text-center text-sm text-gray-600">
//           <p>
//             Don't have an account?{' '}
//             <button
//               onClick={() => navigate('/register')}
//               className="text-blue-500 hover:text-blue-600"
//             >
//               Register
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useModal } from "./LoginModalContext";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function LoginModal() {
  const { isLoginModalOpen, closeLoginModal } = useModal();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [role, setRole] = useState<'user' | 'developer' | 'admin'>('user');
   const { login, isLoading, error, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setEmail("");
      setPassword("");
      closeLoginModal();
    }
  }, [user, closeLoginModal]);

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await login(email, password, role);
    };
  
    const onRegister = async () =>{
      closeLoginModal()
      navigate('/register')
    }

  if (!isLoginModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
     
        <div className="bg-white rounded-lg p-6 w-full max-w-md relative mx-4 px-8">
        <button
          onClick={() => {
            closeLoginModal();
            navigate("/"); // Redirect to home
          }}
          className="absolute top-3 right-3 p-2 text-gray-600 hover:text-red-500"
        >
          <X size={20} />
        </button>
        <h2 className="text-2xl text-center text-blue-500 font-bold mb-6">Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md border border-blue-500">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Login As
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === 'user'}
                  onChange={(e) => setRole(e.target.value as 'user')}
                  className="mr-2"
                />
                <span className="text-sm">User</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="developer"
                  checked={role === 'developer'}
                  onChange={(e) => setRole(e.target.value as 'developer')}
                  className="mr-2"
                />
                <span className="text-sm">Developer</span>
              </label>
              {/* <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={(e) => setRole(e.target.value as 'admin')}
                  className="mr-2"
                />
                <span className="text-sm">Admin</span>
              </label> */}
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            Don't have an account?{' '}
            <button
              onClick={onRegister}
              className="text-blue-500 hover:text-blue-600"
            >
              Register
            </button>
          </p>
          {role === 'developer' && (
            <p className="mt-2">
              Want to register as a developer?{' '}
              <button
                onClick={() => {
                  navigate('/developer/register');
                  closeLoginModal()
                }}
                className="text-blue-500 hover:text-blue-600"
              >
                Register as Developer
              </button>
            </p>
          )}
        </div>
      </div>
      </div>
  );
}
