import { useEffect, useRef } from 'react';
import { Message } from '../../types';
import {MemoizedReactMarkdown2} from '../markdown';
import { useAuthStore } from '../../store/authStore';
// import { LoginModal } from '../LoginModal';
import { useModal } from '../LoginModalContext';

function formatText(content: string) {
  // console.log("Before Formatting", content);
  const pattern = /Suggested questions:[\s\S]*/i;
  return content.replace(pattern, '').trim();
}

interface PropertyChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export function PropertyChatMessages({ messages, isLoading }: PropertyChatMessagesProps) {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuthStore();
  //const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { openLoginModal } = useModal();

  useEffect(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, [messages]);

    useEffect(() => {
      if (messages.length > 3 && !user) {
        // setIsLoginModalOpen(true);
        openLoginModal()
      }
    }, [messages, openLoginModal]);

  return (
    <div className="space-y-4 text-sm">
      {messages.map((message,index) => (
        <div
          key={message.id}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] rounded-lg px-3 py-1.5 ${
              message.role === 'user'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
             <MemoizedReactMarkdown2 content={formatText(message.content)} />
          </div>
          {((index === messages.length - 2) && (message.role === 'assistant')) && <div ref={lastMessageRef} />}
          {(index === messages.length - 3) && <div ref={lastMessageRef} />}
        </div>
      ))}
      {isLoading && (
      <div className="bg-white rounded-full flex items-center justify-start min-w-8 gap-2">
  {['-0.3s', '-0.15s', '0s'].map((delay, index) => (
    <div
      key={index}
      className={`bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center p-1 animate-bounce`}
      style={{ animationDelay: delay }}
    >
      <img
        src="https://i.postimg.cc/cHgZjqp8/output-onlinepngtools.png"
        alt="HouseGPT"
        className="w-3 h-3"
      />
    </div>
  ))}
</div>
      )}
       {/* <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} /> */}
    </div>
  );
}