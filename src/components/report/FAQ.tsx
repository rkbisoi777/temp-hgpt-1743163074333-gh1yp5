import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ({ faqs }: { faqs?: FAQItem[] }) {
  const defaultFAQs: FAQItem[] = [
    {
      question: "What is the return policy?",
      answer:
        "Our return policy allows you to return products within 30 days of purchase for a full refund. Items must be in their original condition with all packaging intact.",
    },
    {
      question: "How do I track my order?",
      answer:
        "You can track your order through the link provided in your confirmation email. Alternatively, log in to your account and navigate to the 'Orders' section.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to many countries worldwide. Shipping fees and delivery times vary depending on the destination.",
    },
    {
      question: "Can I change my order after placing it?",
      answer:
        "Once an order is placed, changes may not be possible. However, you can contact our support team immediately for assistance.",
    },
  ];

  const [visibleCount, setVisibleCount] = useState(2); // Controls visible FAQs
  const [expandedAnswers, setExpandedAnswers] = useState<Set<number>>(
    new Set()
  ); // Tracks expanded answers
  const data = faqs || defaultFAQs;

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + 2, data.length));
  };

  const handleViewLess = () => {
    setVisibleCount(2); // Reset to initial FAQs count
  };

  const toggleAnswer = (index: number) => {
    setExpandedAnswers((prev) => {
      const updated = new Set(prev);
      if (updated.has(index)) {
        updated.delete(index);
      } else {
        updated.add(index);
      }
      return updated;
    });
  };

  return (
    <div className="rounded-lg border border-gray-300 bg-white shadow-lg px-2 mt-4">
      <h2 className="text-lg font-bold text-gray-800 ml-2 mt-2">FAQs</h2>
      {data.slice(0, visibleCount).map((faq, index) => {
        const isExpanded = expandedAnswers.has(index);
        return (
          <div key={index} className="rounded-md p-2">
            <h3 className="font-semibold text-sm mb-2">{faq.question}</h3>
            <p className="text-gray-600 text-xs">
              {isExpanded ? faq.answer : `${faq.answer.slice(0, 100)}...`}
            </p>
            <div className="flex justify-end">
            <button
              onClick={() => toggleAnswer(index)}
              className="text-xs text-blue-600 font-light hover:underline"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
              </div>
          </div>
        );
      })}
      <div className="flex justify-center mb-2 pb-2">
        {visibleCount < data.length ? (
          <button
            onClick={handleViewMore}
            className="text-xs text-blue-600 font-medium hover:underline"
          >
            View More
          </button>
        ) : visibleCount > 2 ? (
          <button
            onClick={handleViewLess}
            className="text-xs text-blue-600 font-medium hover:underline"
          >
            View Less
          </button>
        ) : null}
      </div>
    </div>
  );
}
