import { useState } from "react";
import { MessageCircle, Clock } from "lucide-react";

interface ClosureSectionProps {
  isVisible: boolean;
}

const ClosureSection = ({ isVisible }: ClosureSectionProps) => {
  const [showTimeMessage, setShowTimeMessage] = useState(false);

  const handleWhatsApp = () => {
    // Replace with actual WhatsApp number
    window.open("https://wa.me/", "_blank");
  };

  const handleNeedTime = () => {
    setShowTimeMessage(true);
  };

  return (
    <section className="section-container bg-secondary/30">
      <div className={`max-w-md mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {!showTimeMessage ? (
          <>
            {/* Final sentence */}
            <p className="emotional-text text-xl md:text-2xl mb-12">
              If you ever feel ready to talk,<br />
              I'm here.
            </p>

            {/* Choice buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleWhatsApp}
                className="gentle-button flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Let's talk
              </button>

              <button
                onClick={handleNeedTime}
                className="outline-button flex items-center justify-center gap-2"
              >
                <Clock className="w-5 h-5" />
                I need time
              </button>
            </div>
          </>
        ) : (
          /* Respectful response when they need time */
          <div className="fade-in-up">
            <div className="w-12 h-px bg-primary/40 mx-auto mb-8" />
            
            <p className="emotional-text text-xl md:text-2xl mb-6">
              I understand.
            </p>
            
            <p className="body-text text-muted-foreground">
              Take all the time you need, Malika.<br />
              There's no pressure. No expectation.<br />
              Just know this message will always be here.
            </p>

            <div className="w-8 h-px bg-primary/30 mx-auto mt-8" />
            
            {/* Small text at the bottom */}
            <p className="text-sm text-muted-foreground/60 mt-12">
              With quiet respect,<br />
              always.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClosureSection;
