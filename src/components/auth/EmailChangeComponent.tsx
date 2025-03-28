import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const EmailChangePopup = () => {
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleEmailChange = async (e:any) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    try {
      // Verify user is logged in
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error('You must be logged in to change your email');
      }

      // Attempt to update email
      const { data, error } = await supabase.auth.updateUser({
        email: newEmail
      });

      if (error) throw error;

      // Success handling
      setSuccess(true);
      setNewEmail('');
      
      // Optional: Auto-close after 3 seconds
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        Change Email
      </button>
      
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-white p-6 rounded-lg w-96 max-w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Change Email Address</h2>
            <p className="text-gray-600 mb-4">Update the email address associated with your account</p>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                Confirmation email sent! Please check your inbox.
              </div>
            )}

            <form onSubmit={handleEmailChange} className="space-y-4">
              <input
                type="email"
                placeholder="Enter new email address"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full py-2 rounded-md text-white ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {isLoading ? 'Sending...' : 'Change Email'}
              </button>
            </form>

            <button 
              onClick={() => setIsOpen(false)}
              className="w-full mt-2 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailChangePopup;