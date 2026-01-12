import { Heart } from "lucide-react";
import malika4 from "@/assets/malika-4.jpg";
import malika5 from "@/assets/malika-5.jpg";
import malika6 from "@/assets/malika-6.jpg";

interface PhotoGallerySectionProps {
  isVisible: boolean;
}

const PhotoGallerySection = ({ isVisible }: PhotoGallerySectionProps) => {
  const photos = [malika4, malika5, malika6];

  return (
    <section className="section-container bg-secondary/20">
      <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Section title */}
        <h2 className="section-heading text-foreground mb-10">
          لحظات بتسعدني
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
            ابتسامتك بتنوّر الدنيا
          </p>
          <Heart className="w-4 h-4 text-primary fill-primary/50" />
        </div>
      </div>
    </section>
  );
};

export default PhotoGallerySection;
