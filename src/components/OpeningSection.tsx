import { ChevronDown, Heart } from "lucide-react";

interface OpeningSectionProps {
  onContinue: () => void;
}

const OpeningSection = ({ onContinue }: OpeningSectionProps) => {
  return (
    <section className="section-container bg-background relative overflow-hidden">
      {/* Subtle decorative hearts */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Her name */}
        <h1 className="name-title text-foreground fade-in-up">
          مليكة
        </h1>

        {/* Decorative heart */}
        <div className="fade-in-up delay-200 my-8">
          <Heart className="w-6 h-6 mx-auto text-primary fill-primary/30" />
        </div>

        {/* Main sentence */}
        <p className="emotional-text fade-in-up delay-300 mb-12">
          في قلبي كلام كتير ليكِ...<br />
          ودا بعضه.
        </p>

        {/* Continue button */}
        <button
          onClick={onContinue}
          className="gentle-button fade-in-up delay-500 group"
        >
          كملي معايا
          <ChevronDown className="inline-block mr-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 gentle-pulse">
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default OpeningSection;
