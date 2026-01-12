import { Heart, MessageCircle } from "lucide-react";

interface ClosureSectionProps {
  isVisible: boolean;
}

const ClosureSection = ({ isVisible }: ClosureSectionProps) => {
  const handleWhatsApp = () => {
    // Replace with actual WhatsApp number
    window.open("https://wa.me/", "_blank");
  };

  return (
    <section className="section-container bg-secondary/30">
      <div className={`max-w-md mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Hearts decoration */}
        <div className="flex justify-center gap-3 mb-8">
          <Heart className="w-4 h-4 text-primary/50 fill-primary/20" />
          <Heart className="w-5 h-5 text-primary fill-primary/40" />
          <Heart className="w-4 h-4 text-primary/50 fill-primary/20" />
        </div>

        {/* Final sentence */}
        <p className="emotional-text text-xl md:text-2xl mb-4">
          انتِ حبيبتي يا مليكة
        </p>
        
        <p className="body-text text-muted-foreground mb-10">
          ودايماً هتفضلي الأهم في حياتي
        </p>

        {/* WhatsApp button */}
        <button
          onClick={handleWhatsApp}
          className="gentle-button flex items-center justify-center gap-2 mx-auto"
        >
          <MessageCircle className="w-5 h-5" />
          كلميني
        </button>

        {/* Signature */}
        <div className="mt-16">
          <div className="w-16 h-px bg-primary/30 mx-auto mb-6" />
          <p className="text-sm text-muted-foreground/60">
            بحبك
            <Heart className="w-3 h-3 inline-block mx-1 text-primary fill-primary/50" />
            للأبد
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClosureSection;
