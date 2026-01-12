import { useState } from "react";
import { Heart, X } from "lucide-react";
import mohamed1 from "@/assets/mohamed-1.jpg";
import mohamed2 from "@/assets/mohamed-2.jpg";
import mohamed3 from "@/assets/mohamed-3.jpg";
import mohamed4 from "@/assets/mohamed-4.jpg";

interface MohamedSectionProps {
  isVisible: boolean;
}

const MohamedSection = ({ isVisible }: MohamedSectionProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const photos = [mohamed1, mohamed2, mohamed3, mohamed4];

  return (
    <>
      <section className="section-container bg-secondary/20">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Section title */}
          <h2 className="section-heading text-foreground mb-4">
            محمد
          </h2>
          
          <p className="emotional-text text-muted-foreground mb-10">
            اللي بيحبك من كل قلبه
          </p>

          {/* Photo grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {photos.map((photo, index) => (
              <div 
                key={index}
                className="photo-frame aspect-[3/4] transition-all duration-700 cursor-pointer hover:scale-105"
                style={{
                  transitionDelay: `${index * 150}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                }}
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  src={photo}
                  alt="محمد"
                  className="w-full h-full object-cover"
                />
                {/* Soft gradient overlay */}
                <div className="absolute inset-0 photo-overlay opacity-30" />
              </div>
            ))}
          </div>

          {/* Caption */}
          <div className="flex items-center justify-center gap-3">
            <Heart className="w-4 h-4 text-primary fill-primary/50" />
            <p className="emotional-text text-muted-foreground">
              انتِ حياتي يا مليكة
            </p>
            <Heart className="w-4 h-4 text-primary fill-primary/50" />
          </div>
        </div>
      </section>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button 
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors"
            onClick={() => setSelectedPhoto(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedPhoto}
            alt="محمد"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default MohamedSection;
