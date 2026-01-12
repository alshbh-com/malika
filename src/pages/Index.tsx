import { useState, useEffect, useRef } from "react";
import OpeningSection from "@/components/OpeningSection";
import PhotoMemorySection from "@/components/PhotoMemorySection";
import AccountabilitySection from "@/components/AccountabilitySection";
import PhotoGallerySection from "@/components/PhotoGallerySection";
import SharedFeelingsSection from "@/components/SharedFeelingsSection";
import MorePhotosSection from "@/components/MorePhotosSection";
import MohamedSection from "@/components/MohamedSection";
import VoiceMessageSection from "@/components/VoiceMessageSection";
import FinalWordsSection from "@/components/FinalWordsSection";
import ClosureSection from "@/components/ClosureSection";
import AdminPanel from "@/components/AdminPanel";
import { BackgroundMusicProvider } from "@/components/BackgroundMusic";
import ScrollIndicator from "@/components/ScrollIndicator";

const Index = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  
  const sectionRefs = {
    photo: useRef<HTMLDivElement>(null),
    love: useRef<HTMLDivElement>(null),
    gallery: useRef<HTMLDivElement>(null),
    feelings: useRef<HTMLDivElement>(null),
    morePhotos: useRef<HTMLDivElement>(null),
    mohamed: useRef<HTMLDivElement>(null),
    voiceMessage: useRef<HTMLDivElement>(null),
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
        threshold: 0.2,
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
    <BackgroundMusicProvider>
      <main className="bg-background">
        {/* Admin Panel */}
        <AdminPanel />
        
        {/* Scroll Indicator */}
        <ScrollIndicator />

        {/* Section 1: Opening */}
        <OpeningSection onContinue={handleContinue} />

        {/* Section 2: First Photos */}
        <div ref={sectionRefs.photo}>
          <PhotoMemorySection isVisible={visibleSections.has("photo")} />
        </div>

        {/* Section 3: Love Message */}
        <div ref={sectionRefs.love}>
          <AccountabilitySection isVisible={visibleSections.has("love")} />
        </div>

        {/* Section 4: More Photos */}
        <div ref={sectionRefs.gallery}>
          <PhotoGallerySection isVisible={visibleSections.has("gallery")} />
        </div>

        {/* Section 5: Feelings */}
        <div ref={sectionRefs.feelings}>
          <SharedFeelingsSection isVisible={visibleSections.has("feelings")} />
        </div>

        {/* Section 6: Even More Photos */}
        <div ref={sectionRefs.morePhotos}>
          <MorePhotosSection isVisible={visibleSections.has("morePhotos")} />
        </div>

        {/* Section 7: Mohamed's Photos */}
        <div ref={sectionRefs.mohamed}>
          <MohamedSection isVisible={visibleSections.has("mohamed")} />
        </div>

        {/* Section 8: Voice Message */}
        <div ref={sectionRefs.voiceMessage}>
          <VoiceMessageSection isVisible={visibleSections.has("voiceMessage")} />
        </div>

        {/* Section 9: Final Words */}
        <div ref={sectionRefs.finalWords}>
          <FinalWordsSection isVisible={visibleSections.has("finalWords")} />
        </div>

        {/* Section 10: Closure */}
        <div ref={sectionRefs.closure}>
          <ClosureSection isVisible={visibleSections.has("closure")} />
        </div>
      </main>
    </BackgroundMusicProvider>
  );
};

export default Index;
