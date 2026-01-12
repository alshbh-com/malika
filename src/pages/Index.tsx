import { useState, useEffect, useRef } from "react";
import OpeningSection from "@/components/OpeningSection";
import PhotoMemorySection from "@/components/PhotoMemorySection";
import AccountabilitySection from "@/components/AccountabilitySection";
import SharedFeelingsSection from "@/components/SharedFeelingsSection";
import FinalWordsSection from "@/components/FinalWordsSection";
import ClosureSection from "@/components/ClosureSection";

const Index = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  
  const sectionRefs = {
    photo: useRef<HTMLDivElement>(null),
    accountability: useRef<HTMLDivElement>(null),
    feelings: useRef<HTMLDivElement>(null),
    finalWords: useRef<HTMLDivElement>(null),
    closure: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section");
            if (id) {
              setVisibleSections((prev) => new Set([...prev, id]));
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-50px",
      }
    );

    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current) {
        ref.current.setAttribute("data-section", key);
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleContinue = () => {
    sectionRefs.photo.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="bg-background">
      {/* Section 1: Opening */}
      <OpeningSection onContinue={handleContinue} />

      {/* Section 2: Photo Memory */}
      <div ref={sectionRefs.photo}>
        <PhotoMemorySection isVisible={visibleSections.has("photo")} />
      </div>

      {/* Section 3: Accountability */}
      <div ref={sectionRefs.accountability}>
        <AccountabilitySection isVisible={visibleSections.has("accountability")} />
      </div>

      {/* Section 4: Shared Feelings */}
      <div ref={sectionRefs.feelings}>
        <SharedFeelingsSection isVisible={visibleSections.has("feelings")} />
      </div>

      {/* Section 5: Final Words */}
      <div ref={sectionRefs.finalWords}>
        <FinalWordsSection isVisible={visibleSections.has("finalWords")} />
      </div>

      {/* Section 6: Closure */}
      <div ref={sectionRefs.closure}>
        <ClosureSection isVisible={visibleSections.has("closure")} />
      </div>
    </main>
  );
};

export default Index;
