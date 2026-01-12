import { ChevronDown } from "lucide-react";

interface OpeningSectionProps {
  onContinue: () => void;
}

const OpeningSection = ({ onContinue }: OpeningSectionProps) => {
  return (
    <section className="section-container bg-background relative">
      {/* Subtle decorative element */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Her name */}
        <h1 className="name-title text-foreground fade-in-up">
          Malika
        </h1>

        {/* Decorative line */}
        <div className="w-16 h-px bg-primary/40 mx-auto my-8 fade-in-up delay-200" />

        {/* Main sentence */}
        <p className="emotional-text fade-in-up delay-300 mb-12">
          There were words meant for you…<br />
          said too late.
        </p>

        {/* Continue button */}
        <button
          onClick={onContinue}
          className="gentle-button fade-in-up delay-500 group"
        >
          Continue
          <ChevronDown className="inline-block ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
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
