
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

export function LoginPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('+91 '); // Update for phone number input
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const sendOtp = async (phone: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: phone.replace(/\s+/g, ''),
      });
      if (error) throw error;

      setOtpSent(true); // OTP sent successfully
      toast.success('OTP sent to your phone');
    } catch (err) {
      setError('Failed to send OTP');
      toast.error('Error sending OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (otp: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: phone.replace(/\s+/g, ''),
        token: otp,
        type: 'sms',
      });

      if (error) throw error;

      toast.success('OTP verified successfully');
      navigate('/'); // Navigate to the homepage after successful login
    } catch (err) {
      setError('Invalid OTP');
      toast.error('OTP verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otpSent) {
      await sendOtp(phone); // Send OTP if not sent already
    } else {
      await verifyOtp(otp); // Verify OTP if it has been sent
    }
  };

  return (
    <div className="flex items-center justify-center p-4 py-16">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <h2 className="text-2xl text-center text-blue-500 font-bold mb-6">
          {otpSent ? 'Verify OTP' : 'Login'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md border border-blue-500">
          {/* Phone Number Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* OTP Input (only shows after OTP is sent) */}
          {otpSent && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">OTP *</label>
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

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : otpSent ? 'Verify OTP' : 'Send OTP'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-blue-500 hover:text-blue-600"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}