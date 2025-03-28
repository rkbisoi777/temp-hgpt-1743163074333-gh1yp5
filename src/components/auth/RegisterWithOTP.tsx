import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';


export function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { register, error } = useAuthStore();

  const generateOtp = () => Math.floor(1000 + Math.random() * 9000); // Generate 4-digit OTP
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null); // Store OTP temporarily
  

  const sendOtp = async (phone: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const otp = generateOtp();
      setGeneratedOtp(otp.toString());

      var phoneNumber = phone.replace(/\s+/g, '')
      if (phoneNumber.startsWith('+91')) {
        phoneNumber = phoneNumber.slice(-10);
      }

      const auth = import.meta.env.VITE_FAST2SMS_API_KEY;

      const response = await axios.get(
        `https://www.fast2sms.com/dev/bulkV2?authorization=${auth}&route=otp&variables_values=${otp}&flash=0&numbers=${phoneNumber}&schedule_time=`,
      );

      if (response.data.return) {
        setOtpSent(true);
        toast.success('OTP sent to your phone');
      } else {
        throw new Error('Failed to send OTP');
      }
    } catch (err) {
      setError('Error sending OTP');
      toast.error('Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (inputOtp: string) => {
    setIsLoading(true);
    setError(null);
    try {
      if (generatedOtp && inputOtp === generatedOtp) {

        await register(email, password, phone.replace(/\s+/g, ''));
        if (!error) {
          toast.success('OTP verified and account created successfully');
          // document.cookie = `HouseGPTTokens=${tokens + 10000}; path=/; max-age=${60 * 60 * 24 * 365}`;
          document.cookie = `HouseGPTUserRegistered=true; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
          navigate('/')

        }

      } else {
        throw new Error('Invalid OTP');
      }
    } catch (err) {
      setError('Invalid OTP or failed to register user');
      toast.error('OTP verification or account registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otpSent) {
      await sendOtp(phone);
    } else {
      await verifyOtp(otp);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 py-16">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <h2 className="text-2xl text-center text-blue-500 font-bold mb-6">
          {otpSent ? 'Verify OTP' : 'Register'}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md border border-blue-500"
        >
          {!otpSent && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
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
                  Password *
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={6}
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {otpSent && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                OTP *
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}

          {err && <p className="text-red-500 text-sm">{err}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : otpSent ? 'Verify OTP' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button className="text-blue-500 hover:text-blue-600">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

