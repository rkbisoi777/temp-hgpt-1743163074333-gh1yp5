// import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// // Define context shape
// interface TokenContextType {
//   tokens: number;
//   setTokens: (tokens: number) => void;
// }

// const TokenContext = createContext<TokenContextType | undefined>(undefined);

// export const TokenProvider = ({ children }: { children: ReactNode }) => {
//   const [tokens, setTokens] = useState<number>(0);

//   const initializeTokens = () => {
//     const getCookie = (name: string): string | null => {
//       const cookies = document.cookie.split('; ');
//       for (const cookie of cookies) {
//         const [key, value] = cookie.split('=');
//         if (key === name) return decodeURIComponent(value);
//       }
//       return null;
//     };
  
//     const setCookie = (name: string, value: string, days: number): void => {
//       const date = new Date();
//       date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//       document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/`;
//     };
  
//     // Default daily limit and check for user registration flag
//     const DEFAULT_DAILY_LIMIT = 5000;
//     const REGISTERED_DAILY_LIMIT = 10000;
//     const isRegistered = getCookie('HouseGPTUserRegistered') === 'true';
//     const DAILY_LIMIT = isRegistered ? REGISTERED_DAILY_LIMIT : DEFAULT_DAILY_LIMIT;
  
//     const BONUS_ADDED = 'bonusAdded'; // Flag to track bonus added
//     const storedTokens = getCookie('HouseGPTTokens');
//     const lastReset = getCookie('lastReset');
//     const today = new Date().toISOString().split('T')[0];
  
//     // If it's a new day, reset tokens and check if the bonus should be added
//     if (!lastReset || lastReset !== today) {
//       setCookie('HouseGPTTokens', String(DAILY_LIMIT), 1); // Reset tokens to daily limit
//       setCookie('lastReset', today, 1); // Update last reset date
  
//       // Check if user has already received the bonus
//       const hasReceivedBonus = getCookie(BONUS_ADDED);
//       if (!hasReceivedBonus && (storedTokens ? Number(storedTokens) < DAILY_LIMIT + 5000 : DAILY_LIMIT < DAILY_LIMIT + 5000)) {
//         setTokens(DAILY_LIMIT + 5000); // Add bonus tokens
//         setCookie(BONUS_ADDED, 'true', 1); // Set bonus added flag
//       } else {
//         // If bonus is already added or user has tokens, just set stored tokens
//         if (storedTokens) {
//           setTokens(Number(storedTokens));
//         }
//       }
//     } else if (storedTokens) {
//       // If tokens are already stored and it's not a new day, use the stored value
//       setTokens(Number(storedTokens));
//     }
//   };
  

//   // Initialize tokens only once on component mount
//   useEffect(() => {
//     initializeTokens();
//   }, []);  // Empty dependency array ensures it runs only once

//   return (
//     <TokenContext.Provider value={{ tokens, setTokens }}>
//       {children}
//     </TokenContext.Provider>
//   );
// };

// export const useToken = () => {
//   const context = useContext(TokenContext);
//   if (!context) {
//     throw new Error('useToken must be used within a TokenProvider');
//   }
//   return context;
// };


import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define context shape
interface TokenContextType {
  tokens: number;
  setTokens: (tokens: number) => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [tokens, setTokensState] = useState<number>(0);

  const setTokens = (tokens: number) => {
    const dailyLimit = 5000;
    // Ensure token count does not exceed the daily limit
    const newTokenCount = Math.min(tokens, dailyLimit);
    setTokensState(newTokenCount); // Update the token count in state
  };

  const initializeTokens = () => {
    const getCookie = (name: string): string | null => {
      const cookies = document.cookie.split('; ');
      for (const cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) return decodeURIComponent(value);
      }
      return null;
    };

    const setCookie = (name: string, value: string, days: number): void => {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/`;
    };

    // Default daily limit
    const DAILY_LIMIT = 5000;

    const storedTokens = getCookie('HouseGPTTokens');
    const lastReset = getCookie('lastReset');
    const today = new Date().toISOString().split('T')[0];

    // If it's a new day, reset tokens
    if (!lastReset || lastReset !== today) {
      setCookie('HouseGPTTokens', String(DAILY_LIMIT), 1); // Reset tokens to daily limit
      setCookie('lastReset', today, 1); // Update last reset date
      setTokens(DAILY_LIMIT); // Set tokens in state to the limit
    } else if (storedTokens) {
      // If tokens are already stored and it's not a new day, use the stored value but don't allow more than the daily limit
      const tokenCount = Math.min(Number(storedTokens), DAILY_LIMIT);
      setTokens(tokenCount);
    }
  };

  // Initialize tokens only once on component mount
  useEffect(() => {
    initializeTokens();
  }, []);  // Empty dependency array ensures it runs only once

  return (
    <TokenContext.Provider value={{ tokens, setTokens }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};
