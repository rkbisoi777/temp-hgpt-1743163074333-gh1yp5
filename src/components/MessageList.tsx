// import { useState, useEffect, useRef } from 'react';
// import { Message } from '../types';
// import { PropertyGrid } from './property/PropertyGrid';
// import { SuggestedQuestions } from './SuggestedQuestions';
// import { PreferenceForm } from './PreferenceForm';
// import { MemoizedReactMarkdown } from './markdown';

// interface MessageListProps {
//   messages: Message[];
//   isLoading: boolean;
//   onSendMessage: (message: string) => void;
//   suggestedQuestions: string[]
// }

// function formatText(content: string) {
//   // console.log("Before Formatting", content);
//   const pattern = /Suggested questions:[\s\S]*/i;
//   return content.replace(pattern, '').trim();
// }


// export function MessageList({ messages, isLoading, onSendMessage, suggestedQuestions }: MessageListProps) {
//   const questions = [
//     'What is your purpose?',
//     'Are you looking to buy or rent?',
//     'What type of property?',
//     'What is your budget range?',
//     'Which city are you looking in?',
//     'Do you have a preferred locality?',
//     'What is your preferred configuration?',
//     'When do you need the property?',
//     'How soon do you plan to make a decision?',
//     'Your name',
//     'Your email',
//     'Your phone number'
//   ];

//   const [answers, setAnswers] = useState<Record<string, string>>({});
//   const [draftAnswers, setDraftAnswers] = useState<Record<string, string>>({});
//   const lastMessageRef = useRef<HTMLDivElement | null>(null);

//   const handlePreferenceSubmit = () => {
//     setAnswers((prev) => ({
//       ...prev,
//       ...draftAnswers,
//     }));
//     setDraftAnswers({}); // Clear draft answers after submission
//   };
  

//   // const handleDraftChange = (question: string, answer: string) => {
//   //   setDraftAnswers((prev) => ({
//   //     ...prev,
//   //     [question]: answer,
//   //   }));
//   // };

//   const isPreferenceFilled = questions.every((q) => answers[q]);

//   // Scroll to the latest message
//   useEffect(() => {
//     if (lastMessageRef.current) {
//       lastMessageRef.current.scrollIntoView({
//         behavior: 'smooth',
//         block: 'start',
//       });
//     }
//   }, [messages]);

//   return (
//     <div className="flex-1 overflow-auto p-4 space-y-4 max-w-4xl mx-auto w-full">
//       {messages.map((message, index) => (
//         <div key={message.id}>
//           <div className={`${message.role === 'user'
//             ? 'ml-auto bg-gradient-to-r from-cyan-500 to-blue-500 text-white max-w-[80%]'
//             : `${(message.content == '') ? 'bg-gray-50 h-[1px] -mt-4' : ' bg-gray-100'} max-w-[80%]`
//             } p-1.5 px-2 rounded-lg`}>
//             <div className="text-sm whitespace-pre-wrap py-2 px-1">
//               <MemoizedReactMarkdown content={formatText(message.content)} />
//             </div>
//           </div>

//           {message.role === 'assistant' && (
//             <>

//               {message.properties && (
//                 <div className="mt-2 mb-1">
//                   <PropertyGrid properties={message.properties} />
//                   {!isPreferenceFilled && (
//                     <PreferenceForm
//                       questions={questions}
//                       answers={draftAnswers}
//                       onSubmit={handlePreferenceSubmit}
//                     />
//                   )}

//                   <div className="mt-2">
//                     <SuggestedQuestions
//                       questions={suggestedQuestions}
//                       onQuestionClick={onSendMessage}
//                     />
//                   </div>

//                 </div>

//               )}

//             </>
//           )}

//           {((index === messages.length - 2) && (message.role === 'assistant')) && <div ref={lastMessageRef} />}
//           {(index === messages.length - 3) && <div ref={lastMessageRef} />}
//         </div>
//       ))}

//       {isLoading && (
//         <div className="bg-gray-50 rounded-full flex items-center justify-start min-w-8 gap-2">

//           {['-0.3s', '-0.15s', '0s'].map((delay, index) => (
//             <div
//               key={index}
//               className={`bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center p-1 animate-bounce`}
//               style={{ animationDelay: delay }}
//             >
//               <img
//                 src="https://i.postimg.cc/cHgZjqp8/output-onlinepngtools.png"
//                 alt="HouseGPT"
//                 className="w-3 h-3"
//               />
//             </div>
//           ))}
//         </div>
//       )}

//     </div>
//   );
// }

import { useState, useEffect, useRef } from 'react';
import { Message } from '../types';
import { PropertyGrid } from './property/PropertyGrid';
import { SuggestedQuestions } from './SuggestedQuestions';
import { PreferenceForm } from './PreferenceForm';
import { MemoizedReactMarkdown } from './markdown';
// import {LoginModal} from './LoginModal';
import { useAuthStore } from '../store/authStore';
import { useModal } from './LoginModalContext';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  suggestedQuestions: string[];
}

function formatText(content: string) {
  const pattern = /Suggested questions:[\s\S]*/i;
  return content.replace(pattern, '').trim();
}

export function MessageList({ messages, isLoading, onSendMessage, suggestedQuestions }: MessageListProps) {

  const { openLoginModal } = useModal();

  

  const questions = [
        'What is your purpose?',
        'Are you looking to buy or rent?',
        'What type of property?',
        'What is your budget range?',
        'Which city are you looking in?',
        'Do you have a preferred locality?',
        'What is your preferred configuration?',
        'When do you need the property?',
        'How soon do you plan to make a decision?',
        'Your name',
        'Your email',
        'Your phone number'
      ];

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [draftAnswers, setDraftAnswers] = useState<Record<string, string>>({});

  // const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user } = useAuthStore();
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const isPreferenceFilled = questions.every((q) => answers[q]);

  const handlePreferenceSubmit = () => {
    setAnswers((prev) => ({
      ...prev,
      ...draftAnswers,
    }));
    setDraftAnswers({}); // Clear draft answers after submission
  };

  // useEffect(() => {
  //   if (messages.length > 2 && !user) {
  //     setIsLoginModalOpen(true);
  //   }
  // }, [messages, user]);

  useEffect(() => {
    if (messages.length > 2 && !user) {
      openLoginModal();
    }
  }, [messages, openLoginModal]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-auto p-4 space-y-4 max-w-4xl mx-auto w-full">
      {messages.map((message, index) => (
        <div key={message.id}>
          {/* <div className={`${message.role === 'user' ? 'ml-auto bg-gradient-to-r from-cyan-500 to-blue-500 text-white max-w-[80%]' : 'bg-gray-100 max-w-[80%]'} p-1.5 px-2 rounded-lg`}>
            <div className="text-sm whitespace-pre-wrap py-2 px-1">
              <MemoizedReactMarkdown content={formatText(message.content)} />
            </div>
          </div> */}
          <div className={`${message.role === 'user'
            ? 'ml-auto bg-gradient-to-r from-cyan-500 to-blue-500 text-white max-w-[80%]'
            : `${(message.content == '') ? 'bg-gray-50 h-[1px] -mt-4' : ' bg-gray-100'} max-w-[80%]`
            } p-1.5 px-2 rounded-lg`}>
            <div className="text-sm whitespace-pre-wrap py-2 px-1">
              <MemoizedReactMarkdown content={formatText(message.content)} />
            </div>
          </div>
          {message.role === 'assistant' && message.properties && (
            <div className="mt-2 mb-1">
              <PropertyGrid properties={message.properties} />
              {(!isPreferenceFilled && !user) && (
                    <PreferenceForm
                      questions={questions}
                      answers={draftAnswers}
                      onSubmit={handlePreferenceSubmit}
                    />
                  )}
              <div className="mt-2">
                <SuggestedQuestions questions={suggestedQuestions} onQuestionClick={onSendMessage} />
              </div>
            </div>
          )}
          {((index === messages.length - 2) && (message.role === 'assistant')) && <div ref={lastMessageRef} />}
          {(index === messages.length - 3) && <div ref={lastMessageRef} />}
        </div>
      ))}
      {isLoading && (
        <div className="bg-gray-50 rounded-full flex items-center justify-start min-w-8 gap-2">
          {['-0.3s', '-0.15s', '0s'].map((delay, index) => (
            <div key={index} className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center p-1 animate-bounce" style={{ animationDelay: delay }}>
              <img src="https://i.postimg.cc/cHgZjqp8/output-onlinepngtools.png" alt="HouseGPT" className="w-3 h-3" />
            </div>
          ))}
        </div>
      )}
      {/* <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} /> */}
    </div>
  );
}
