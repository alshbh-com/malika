import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface FinalWordsSectionProps {
  isVisible: boolean;
}

const FinalWordsSection = ({ isVisible }: FinalWordsSectionProps) => {
  const [revealedLines, setRevealedLines] = useState(0);

  const lines = [
    "مليكة...",
    "انتِ أحلى حاجة حصلتلي.",
    "بحبك من قلبي.",
    "وهفضل أحبك.",
    "للأبد. ♥",
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
              className="emotional-text text-xl md:text-2xl transition-all duration-600"
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

        {revealedLines >= lines.length && (
          <div className="mt-10 flex justify-center gap-2 fade-in">
            <Heart className="w-5 h-5 text-primary fill-primary animate-pulse" />
            <Heart className="w-6 h-6 text-primary fill-primary animate-pulse delay-100" />
            <Heart className="w-5 h-5 text-primary fill-primary animate-pulse delay-200" />
          </div>
        )}
      </div>
    </section>
  );
};

export default FinalWordsSection;
