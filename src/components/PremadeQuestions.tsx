import { MessageCircle } from 'lucide-react';

interface PremadeQuestionsProps {
  onQuestionClick: (question: string) => void;
}

export function PremadeQuestions({ onQuestionClick }: PremadeQuestionsProps) {
  const questions = [
    { text: "2BHK in Mumbai", icon: "🏠" },
    { text: "Things to Know before buying a house", icon: "📝" },
    { text: "What is RERA?", icon: "📋" },
    { text: "Best areas to invest in Mumbai", icon: "💰" },
    { text: "Luxury apartments in South Mumbai", icon: "🏢" },
    { text: "How to check property legal documents", icon: "📜" },
    { text: "Tips for first-time homebuyers", icon: "💡" },
    { text: "Upcoming residential projects in Mumbai", icon: "🚧" },
    { text: "How to apply for a home loan", icon: "🏦" },
    { text: "Understanding property taxes", icon: "💵" },
    { text: "Benefits of buying a pre-owned house", icon: "🏠" },
    { text: "Cost of living in Mumbai", icon: "📊" },
    { text: "Investing in commercial spaces", icon: "🏬" },
    { text: "How to negotiate property prices", icon: "🤔" },
    { text: "Seaside homes in Mumbai", icon: "🌊" },
    { text: "Why choose RERA-registered projects", icon: "✅" },
    { text: "Popular housing societies in Mumbai", icon: "🏘️" },
    { text: "Understanding stamp duty and registration", icon: "🖋️" },
    { text: "Pet-friendly apartments in Mumbai", icon: "🐾" },
    { text: "Tips to avoid real estate scams", icon: "🚨" },
    { text: "Eco-friendly housing options", icon: "🌱" },
    { text: "Top gated communities in Mumbai", icon: "🔒" }
  ];

  return (
    <div className="mt-4 z-48">
      <div className="flex items-center gap-1 mb-2 text-gray-600">
        <MessageCircle className="w-4 h-4" />
        <span className="text-sm font-semibold">Popular Questions</span>
      </div>
      
      <div className="relative overflow-x-auto overflow-y-hidden scrollbar-hide-mobile pb-1">
  <div className="flex flex-col gap-2 z-48">
    {/* First row */}
    <div className="flex gap-2">
      {questions.filter((_, index) => index % 3 === 0).map(({ text, icon }) => (
        <button
          key={text}
          onClick={() => onQuestionClick(text)}
          className="inline-flex items-center gap-1 px-2 py-1.5 bg-white rounded-full border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors shadow-sm text-xs"
          style={{ width: "fit-content" }}
        >
          <span>{icon}</span>
          <span className="truncate">{text}</span>
        </button>
      ))}
    </div>
    {/* Second row */}
    <div className="flex gap-2">
      {questions.filter((_, index) => index % 3 === 1).map(({ text, icon }) => (
        <button
          key={text}
          onClick={() => onQuestionClick(text)}
          className="inline-flex items-center gap-1 px-2 py-1.5 bg-white rounded-full border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors shadow-sm text-xs"
          style={{ width: "fit-content" }}
        >
          <span>{icon}</span>
          <span className="truncate">{text}</span>
        </button>
      ))}
    </div>
    {/* Third row */}
    <div className="flex gap-2">
      {questions.filter((_, index) => index % 3 === 2).map(({ text, icon }) => (
        <button
          key={text}
          onClick={() => onQuestionClick(text)}
          className="inline-flex items-center gap-1 px-2 py-1.5 bg-white rounded-full border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors shadow-sm text-xs"
          style={{ width: "fit-content" }}
        >
          <span>{icon}</span>
          <span className="truncate">{text}</span>
        </button>
      ))}
    </div>
  </div>
</div>


    </div>
  );
}