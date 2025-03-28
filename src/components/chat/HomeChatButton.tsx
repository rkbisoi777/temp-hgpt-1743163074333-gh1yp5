import { useEffect } from 'react';
// import { PropertyChatDialog } from './PropertyChatDialog';
// import { Property } from '../../types';

interface HomeChatButtonProps {
  onSubmit: (query: string) => void;
}

export function HomeChatButton({ onSubmit }: HomeChatButtonProps) {
  // const [query, setQuery] = useState('');
  // const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = () => {
    onSubmit("##**HouseGPT**#");
  };

  // const handleCloseMessage = () => {
  //   setShowMessage(false);
  // };

  // Show proactive message after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      // setShowMessage(true);
    }, 3000); // Change time as per your requirement
    return () => clearTimeout(timer); // Clean up timer when component unmounts
  }, []);

  return (
    <>
      {/* Proactive message */}
      {/* {showMessage && (
      <div className="fixed bottom-20 right-6 flex flex-row z-50 w-[300px] max-w-1/2 animate-pulse">
        <div className=" px-2  bg-white text-gray-800 p-1 rounded-l-lg rounded-t-lg shadow-lg text-sm border border-blue-500 mb-2">
          <div className="flex flex-col">
            <span>Hi, I’m HouseGPT! 🏡 I can help you find the perfect property 🔍 and answer all your real estate questions 💬 with personalized recommendations 📊.</span>
          </div>
         
        </div>
           <button
            onClick={handleCloseMessage}
            className="w-6 h-6 top-2 right-2 ml-1 text-gray-600 bg-white shadow-md text-xs border border-blue-500 rounded-full py-0.5 px-1.5"
          >
           <i className="fas fa-xmark"></i>
          </button>
      </div>
        
      )} */}

      <button
        onClick={handleSubmit}
        className="fixed bottom-4 text-sm right-4 p-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors z-40"
        aria-label="Chat about this property"
        aria-controls="property-chat-dialog"
      >
        <div className="relative w-8 h-8">
          <img
            src="https://i.postimg.cc/cHgZjqp8/output-onlinepngtools.png"
            alt="HouseGPT"
          />
          {/* <div className="absolute -top-2 -right-1 w-3 h-3 bg-red-500 text-white text-xs rounded-full flex items-center justify-center p-1"></div> */}
          <span className="absolute -top-2 -right-1 flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
          </span>
        </div>
      </button>

    </>
  );
}
