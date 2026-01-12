import { useState, useEffect } from "react";

interface FinalWordsSectionProps {
  isVisible: boolean;
}

const FinalWordsSection = ({ isVisible }: FinalWordsSectionProps) => {
  const [revealedLines, setRevealedLines] = useState(0);

  const lines = [
    "I don't expect forgiveness.",
    "I don't expect a response.",
    "But I do want you to know",
    "that you mattered.",
    "That you still do.",
  ];

  useEffect(() => {
    if (isVisible && revealedLines < lines.length) {
      const timer = setTimeout(() => {
        setRevealedLines((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isVisible, revealedLines, lines.length]);

  return (
    <section className="section-container bg-background">
      <div className="max-w-md mx-auto text-center">
        <div className="space-y-4">
          {lines.map((line, index) => (
            <p
              key={index}
              className={`emotional-text text-lg md:text-xl transition-all duration-600`}
              style={{
                opacity: revealedLines > index ? 1 : 0,
                transform: revealedLines > index ? 'translateY(0)' : 'translateY(10px)',
                transitionDelay: '0ms',
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinalWordsSection;
