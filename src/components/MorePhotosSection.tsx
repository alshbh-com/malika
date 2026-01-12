import { Heart } from "lucide-react";
import malika7 from "@/assets/malika-7.jpg";
import malika8 from "@/assets/malika-8.jpg";
import malika9 from "@/assets/malika-9.jpg";

interface MorePhotosSectionProps {
  isVisible: boolean;
}

const MorePhotosSection = ({ isVisible }: MorePhotosSectionProps) => {
  const photos = [malika7, malika8, malika9];

  return (
    <section className="section-container bg-secondary/30">
      <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Section title */}
        <h2 className="section-heading text-foreground mb-10">
          كل لحظة معاكِ غالية
        </h2>

        {/* Photo grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {photos.map((photo, index) => (
            <div 
              key={index}
              className="photo-frame aspect-[3/4] transition-all duration-700"
              style={{
                transitionDelay: `${index * 150}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
              }}
            >
              <img
                src={photo}
                alt="مليكة"
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
            جمالك مش محتاج كلام
          </p>
          <Heart className="w-4 h-4 text-primary fill-primary/50" />
        </div>
      </div>
    </section>
  );
};

export default MorePhotosSection;
