import { useState, useEffect, useRef } from 'react';
import { Calendar, Download, Phone, X } from 'lucide-react';
import { PropertyChatDialog } from './PropertyChatDialog';
import { Property } from '../../types';

interface PropertyChatButtonProps {
  property: Property;
}

export function PropertyChatButton({ property }: PropertyChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const chatButtonRef = useRef<HTMLButtonElement | null>(null);
  // const [showMessage, setShowMessage] = useState(false);

  // const handleCloseMessage = () => {
  //   setShowMessage(false);
  // };

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = 'auto';
      chatButtonRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Show proactive message after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      // setShowMessage(true);
    }, 3000); // Change time as per your requirement
    return () => clearTimeout(timer); // Clean up timer when component unmounts
  }, []);

  return (
    <>
      {/* Chat Button */}
      {/* {showMessage && (

        <div className="fixed bottom-20 right-6 flex flex-row z-50 w-[300px] max-w-1/2 animate-pulse">
          <div className=" px-2  bg-white text-gray-800 p-1 rounded-l-lg rounded-t-lg shadow-lg text-sm border border-blue-500 mb-2">
            <div className="flex flex-col">
              <span>Hi!, I’m HouseGPT! I can help with <b>{property.title}</b></span>
              <p> 📊 Property details </p>
              <p>💰 Pricing info</p>
              <p>🏙️ Neighborhood insights</p>
              <p>🗓️ Booking a visit</p>
              <p>What would you like to know?</p>
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

      {/* <button
        ref={chatButtonRef}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-3 left-4 p-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
        aria-label="Chat about this property"
        aria-expanded={isOpen}
        aria-controls="property-chat-dialog"
      >
        <Phone />
      </button>

      <button
        ref={chatButtonRef}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-3 left-16 p-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
        aria-label="Chat about this property"
        aria-expanded={isOpen}
        aria-controls="property-chat-dialog"
      >
        <Calendar />
      </button>

      <button
        ref={chatButtonRef}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-3 left-28 p-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
        aria-label="Chat about this property"
        aria-expanded={isOpen}
        aria-controls="property-chat-dialog"
      >
        <Video />
      </button>

      <button
        ref={chatButtonRef}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-3 left-40 p-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
        aria-label="Chat about this property"
        aria-expanded={isOpen}
        aria-controls="property-chat-dialog"
      >
        <Download />
      </button> */}

      <div className='fixed flex flex-row justify-between bottom-3 left-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full w-1/2 max-w-[188px] p-2 z-50'>
        <button
          ref={chatButtonRef}
          onClick={() => { }}
          className="p-2.5 py-1.5 bg-white text-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
          aria-label="Chat about this property"
          aria-expanded={isOpen}
          aria-controls="property-chat-dialog"
        >
          <i className="fas fa-phone"></i>
        </button>

        <button
          ref={chatButtonRef}
          onClick={() => { }}
          className="px-[11px] py-1.5 bg-white text-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
          aria-label="Chat about this property"
          aria-expanded={isOpen}
          aria-controls="property-chat-dialog"
        >
          <i className="fas fa-calendar"></i>
        </button>

        <button
          ref={chatButtonRef}
          onClick={() => { }}
          className="p-2.5 py-1.5 bg-white text-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
          aria-label="Chat about this property"
          aria-expanded={isOpen}
          aria-controls="property-chat-dialog"
        >
          <i className="fas fa-download"></i>
        </button>

        <button
          ref={chatButtonRef}
          onClick={() => { }}
          className="p-2.5 py-1.5 bg-white text-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
          aria-label="Chat about this property"
          aria-expanded={isOpen}
          aria-controls="property-chat-dialog"
        >
          {/* <i className="fas fa-360-degrees"></i> */}
          <i className="fas fa-vr-cardboard"></i>
        </button>


      </div>

      <button
        ref={chatButtonRef}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-3 right-3 p-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
        aria-label="Chat about this property"
        aria-expanded={isOpen}
        aria-controls="property-chat-dialog"
      >
        <div className="relative w-8 h-8">
          <img
            src="https://i.postimg.cc/cHgZjqp8/output-onlinepngtools.png"
            alt="HouseGPT"
          />
        </div>
        {/* <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 text-white text-xs rounded-full flex items-center justify-center p-1 animation-ping"></div> */}
        <span className="absolute top-0 right-0 flex size-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
        </span>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-4 z-50"
          role="dialog"
          aria-modal="true"
          id="property-chat-dialog"
        >
          <div className="bg-white w-full max-w-lg rounded-lg sm:rounded-lg shadow-xl flex flex-col h-[600px] max-h-[80vh]">
            {/* Modal Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src={property.imageUrl}
                  alt={property.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{property.title}</h3>
                  <p className="text-sm text-gray-500 truncate">{property.location}</p>
                </div>
              </div>
              <button
                ref={closeButtonRef}
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
                aria-label="Close chat dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <PropertyChatDialog property={property} />
          </div>
        </div>
      )}
    </>
  );
}
