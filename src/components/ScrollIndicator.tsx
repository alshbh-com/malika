import { ChevronDown, Heart } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide when scrolled more than 300px
      setIsVisible(window.scrollY < 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollDown = () => {
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollDown}
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1 animate-bounce"
      aria-label="في رسائل تانية تحت"
    >
      <span className="text-xs text-primary/80 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/20">
        في كلام تاني تحت
        <Heart className="w-3 h-3 inline-block mr-1 text-primary fill-primary/50" />
      </span>
      <ChevronDown className="w-5 h-5 text-primary animate-pulse" />
    </button>
  );
};

export default ScrollIndicator;
