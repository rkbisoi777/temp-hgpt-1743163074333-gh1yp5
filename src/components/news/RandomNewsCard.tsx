// import { useState, useEffect } from "react";
// import { ExternalLink } from "lucide-react";
// import { NewsArticle, NewsService } from "../../lib/newsService";

// export function RandomNewsCard() {
//   const [article, setArticle] = useState<NewsArticle | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const loadNews = async () => {
//       try {
//         const news = await NewsService.fetchNews(20, 1);
//         if (news.length > 0) {
//           const randomArticle = news[Math.floor(Math.random() * news.length)];
//           setArticle(randomArticle);
//         }
//       } catch (error) {
//         console.error("Error fetching news:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     loadNews();
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <div className="text-lg font-medium text-gray-700">Loading news...</div>
//       </div>
//     );
//   }

//   if (!article) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <div className="text-lg font-medium text-gray-700">No news available</div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-xl mx-auto mb-4">
//       <div className="bg-white border border-gray-100 rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg">
//         {article.image_url && (
//           <img
//             src={article.image_url}
//             alt={article.title}
//             className="w-full h-48 object-cover"
//             onError={(e) => {
//               (e.target as HTMLImageElement).src =
//                 "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8&auto=format&fit=crop&w=1073&q=80";
//             }}
//           />
//         )}
//         <div className="px-4 py-2">
//           <div className="flex justify-start mb-2 text-gray-500 text-sm">
//             <span>{new Date(article.published_at).toLocaleString()}</span>
//           </div>
//           <a href={article.url} target="_blank" rel="noopener noreferrer" className="group">
//             <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
//               {article.title}
//             </h2>
//           </a>
//           <p className="mt-3 text-gray-600 line-clamp-2">{article.description}</p>
//           <div className="flex justify-end items-center mt-1 text-blue-500 py-2">
//             <span className="text-sm">Read full article</span>
//             <ExternalLink className="ml-1 w-4 h-4" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { NewsArticle, NewsService } from "../../lib/newsService";

const LAST_SHOWN_ARTICLE_KEY = "last_shown_article_id";

export function RandomNewsCard() {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const news = await NewsService.fetchNews(20, 1);
        if (news.length > 0) {
          // const randomArticle = news[Math.floor(Math.random() * news.length)];
          // setArticle(randomArticle);
          const sortedNews = news.sort(
            (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
          );
          const lastShownArticleId = localStorage.getItem(LAST_SHOWN_ARTICLE_KEY);

          // Find the next article that hasn’t been shown yet
          let nextArticle = sortedNews[0]; // Default to latest article
          if (lastShownArticleId) {
            const lastIndex = sortedNews.findIndex(article => article.id === lastShownArticleId);
            if (lastIndex !== -1 && lastIndex + 1 < sortedNews.length) {
              nextArticle = sortedNews[lastIndex + 1]; // Pick the next latest article
            }
          }

          setArticle(nextArticle);

          // Store the new article ID in localStorage for next time
          localStorage.setItem(LAST_SHOWN_ARTICLE_KEY, nextArticle.id);
        }
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

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-lg font-medium text-gray-700">No news available</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full mx-auto mb-4">
      <div className="bg-white border border-gray-100 rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg">
        <div className="flex flex-col md:flex-row">
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
          <div className="md:w-2/3 p-4 md:p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-start mb-2 text-gray-500 text-sm">
                <span>{new Date(article.published_at).toLocaleString()}</span>
              </div>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="group">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h2>
              </a>
              <p className="mt-3 text-gray-600 md:line-clamp-3">
                {article.description}
              </p>
            </div>
            <div className="flex justify-end items-center mt-4 text-blue-500">
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center hover:underline"
              >
                <span className="text-sm">Read full article</span>
                <ExternalLink className="ml-1 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}