import { MessageSquarePlus } from 'lucide-react';

interface SuggestedQuestionsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
}

export function SuggestedQuestions({ questions, onQuestionClick }: SuggestedQuestionsProps) {
  if (!questions.length) return null;

  return (
    <div className="mt-2 max-w-[80%]">
      <div className="flex items-center gap-1 mb-1">
        <MessageSquarePlus className="w-3.5 h-3.5 text-blue-500" />
        <span className="text-xs text-gray-600">Related Questions</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {questions.map((question) => (
          <button
            key={question}
            onClick={() => onQuestionClick(question)}
            className="text-xs px-3 py-1.5 bg-white rounded-full border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors shadow-sm"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}