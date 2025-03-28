// // import { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import InfiniteScroll from 'react-infinite-scroll-component';
// // import { ExternalLink } from 'lucide-react';

// // interface NewsArticle {
// //   source: {
// //     id: string | null;
// //     name: string;
// //   };
// //   author: string;
// //   title: string;
// //   description: string;
// //   url: string;
// //   urlToImage: string;
// //   publishedAt: string;
// //   content: string;
// // }

// // export function News() {
// //   const [articles, setArticles] = useState<NewsArticle[]>([]);
// //   const [page, setPage] = useState(1);
// //   const [hasMore, setHasMore] = useState(true);
// //   const [isLoading, setIsLoading] = useState(true);

// //   const fetchNews = async () => {
// //     try {
// //       const response = await axios.get(
// //         `https://newsapi.org/v2/everything?q=real+estate+india&language=en&sortBy=publishedAt&pageSize=10&page=${page}`,
// //         {
// //           headers: {
// //             'Authorization': `Bearer ${import.meta.env.VITE_NEWS_API_KEY}`
// //           }
// //         }
// //       );

// //       const newArticles = response.data.articles;
      
// //       if (newArticles.length === 0) {
// //         setHasMore(false);
// //       } else {
// //         setArticles(prev => [...prev, ...newArticles]);
// //         setPage(prev => prev + 1);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching news:', error);
// //       setHasMore(false);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchNews();
// //   }, []);

// //   const formatDate = (dateString: string) => {
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString('en-US', {
// //       day: 'numeric',
// //       month: 'short',
// //       year: 'numeric',
// //       hour: '2-digit',
// //       minute: '2-digit'
// //     });
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="max-w-7xl mx-auto px-4 py-8">
// //         <div className="animate-pulse space-y-4">
// //           {[1, 2, 3].map(i => (
// //             <div key={i} className="bg-gray-200 h-48 rounded-lg"></div>
// //           ))}
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-8">
// //       {/* <h1 className="text-2xl font-bold mb-2">Real Estate News</h1> */}
      
// //       <InfiniteScroll
// //         dataLength={articles.length}
// //         next={fetchNews}
// //         hasMore={hasMore}
// //         loader={<div className="text-center py-4">Loading more news...</div>}
// //         endMessage={<div className="text-center py-4 text-gray-500">No more news to load.</div>}
// //         className="space-y-6"
// //       >
// //         {articles.map((article, index) => (
// //           <a
// //             key={`${article.url}-${index}`}
// //             href={article.url}
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             className="block bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden hover:shadow-lg transition-shadow"
// //           >
// //             <div className="flex flex-col md:flex-row">
// //               {article.urlToImage && (
// //                 <div className="md:w-1/3">
// //                   <img
// //                     src={article.urlToImage}
// //                     alt={article.title}
// //                     className="w-full h-48 md:h-full object-cover"
// //                     onError={(e) => {
// //                       (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80';
// //                     }}
// //                   />
// //                 </div>
// //               )}
// //               <div className="p-4 md:w-2/3 border-t border-gray-200">
// //                 <div className="flex items-center justify-between mb-2">
// //                   <span className="text-sm text-blue-600 font-medium">{article.source.name}</span>
// //                   <ExternalLink className="w-4 h-4 text-gray-400" />
// //                 </div>
// //                 <h2 className="text-xl font-semibold mb-2 line-clamp-2">{article.title}</h2>
// //                 <p className="text-gray-600 mb-4 line-clamp-2">{article.description}</p>
// //                 <div className="flex items-center justify-between text-sm text-gray-500">
// //                   <span>{article.author ? `By ${article.author}` : 'Unknown Author'}</span>
// //                   <span>{formatDate(article.publishedAt)}</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </a>
// //         ))}
// //       </InfiniteScroll>
// //     </div>
// //   );
// // }

// import { useState, useEffect } from "react";
// import { NewsService, NewsArticle } from "../lib/newsService";
// import { ExternalLink, ChevronUp, ChevronDown } from "lucide-react";

// export function News() {
//   const [articles, setArticles] = useState<NewsArticle[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [direction, setDirection] = useState(0); // -1 for up, 1 for down

//   useEffect(() => {
//     const loadNews = async () => {
//       try {
//         const news = await NewsService.fetchNews(10, 1);
//         setArticles(news);
//       } catch (error) {
//         console.error("Error fetching news:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     loadNews();
//   }, []);

//   const handleScroll = (event: React.WheelEvent) => {
//     if (event.deltaY > 0 && currentIndex < articles.length - 1) {
//       setDirection(1);
//       setCurrentIndex((prev) => prev + 1);
//     } else if (event.deltaY < 0 && currentIndex > 0) {
//       setDirection(-1);
//       setCurrentIndex((prev) => prev - 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentIndex > 0) {
//       setDirection(-1);
//       setCurrentIndex((prev) => prev - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentIndex < articles.length - 1) {
//       setDirection(1);
//       setCurrentIndex((prev) => prev + 1);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-lg font-medium text-gray-700">Loading news...</div>
//       </div>
//     );
//   }

//   return (
//     <div 
//       className="h-screen w-screen overflow-hidden bg-gray-50 flex items-center justify-center relative"
//       onWheel={handleScroll}
//     >
//       {/* Position indicator */}
//       <div className="absolute top-6 right-6 z-30 bg-white py-2 px-4 rounded-full shadow-md">
//         <span className="font-medium">{currentIndex + 1}</span>
//         <span className="text-gray-400"> / {articles.length}</span>
//       </div>
      
//       {/* Navigation buttons */}
//       <div className="absolute z-20 inset-y-0 right-6 flex flex-col justify-center space-y-4">
//         <button 
//           onClick={handlePrevious}
//           className={`bg-white p-3 rounded-full shadow-lg focus:outline-none ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
//           disabled={currentIndex === 0}
//         >
//           <ChevronUp className="w-6 h-6 text-gray-700" />
//         </button>
//         <button 
//           onClick={handleNext}
//           className={`bg-white p-3 rounded-full shadow-lg focus:outline-none ${currentIndex === articles.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
//           disabled={currentIndex === articles.length - 1}
//         >
//           <ChevronDown className="w-6 h-6 text-gray-700" />
//         </button>
//       </div>

//       <div className="w-[90%] max-w-4xl px-4 relative h-3/4">
//         {articles.map((article, index) => (
//           <div
//             key={article.id}
//             className={`absolute w-full transition-all duration-500 ease-in-out ${
//               index === currentIndex 
//                 ? 'opacity-100 translate-y-0 z-20' 
//                 : index < currentIndex 
//                   ? 'opacity-0 -translate-y-full z-10' 
//                   : 'opacity-0 translate-y-full z-10'
//             }`}
//           >
//             <div className="bg-white rounded-xl shadow-xl overflow-hidden h-full">
//               <div className="flex flex-col h-full">
//                 {article.image_url && (
//                   <div className="relative h-48 w-full">
//                     <img
//                       src={article.image_url}
//                       alt={article.title}
//                       className="w-full h-full object-cover"
//                       onError={(e) => {
//                         (e.target as HTMLImageElement).src =
//                           "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8&auto=format&fit=crop&w=1073&q=80";
//                       }}
//                     />
//                   </div>
//                 )}
//                 <div className="p-6 flex-grow flex flex-col">
//                   <a
//                     href={article.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="group"
//                   >
//                     <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
//                       {article.title}
//                     </h2>
//                     <div className="flex items-center mt-1 text-blue-500">
//                       <span className="text-sm">Read full article</span>
//                       <ExternalLink className="ml-1 w-4 h-4" />
//                     </div>
//                   </a>
//                   <p className="mt-4 text-gray-600 flex-grow">{article.description}</p>
//                   <div className="mt-6 text-gray-500 text-sm">
//                     <span>{new Date(article.published_at).toLocaleString()}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { NewsService, NewsArticle } from "../lib/newsService";
import { ExternalLink } from "lucide-react";

export function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const news = await NewsService.fetchNews(20, 1);
        setArticles(news);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadNews();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-lg font-medium text-gray-700">Loading news...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* <h1 className="text-xl font-bold text-gray-800 mb-4 items-center text-center justify-between flex">Latest News</h1> */}
        
        <div className="space-y-6">
          {articles.map((article) => (
            <div 
              key={article.id}
              className="bg-white border border-gray-100 rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg"
            >
              <div className="md:flex">
                {article.image_url && (
                  <div className="md:w-1/3 flex-shrink-0">
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-48 md:h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8&auto=format&fit=crop&w=1073&q=80";
                      }}
                    />
                  </div>
                )}
               
                <div className="px-4 py-2 md:w-2/3">
                <div className="flex justify-start mb-2 text-gray-500 text-sm">
                    <span>{new Date(article.published_at).toLocaleString()}</span>
                  </div>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h2>
                    
                  </a>
                  <p className="mt-3 text-gray-600 line-clamp-2">{article.description}</p>
                  <div className="flex justify-end items-center mt-1 text-blue-500 py-2">
                      <span className="text-sm">Read full article</span>
                      <ExternalLink className="ml-1 w-4 h-4" />
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}