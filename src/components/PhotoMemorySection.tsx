import malikaPhoto from "@/assets/malika-photo.jpg";

interface PhotoMemorySectionProps {
  isVisible: boolean;
}

const PhotoMemorySection = ({ isVisible }: PhotoMemorySectionProps) => {
  return (
    <section className="section-container bg-secondary/30">
      <div className={`max-w-md mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Photo with soft treatment */}
        <div className="photo-frame mb-8 aspect-[3/4] max-w-xs mx-auto">
          <img
            src={malikaPhoto}
            alt="A cherished moment"
            className="w-full h-full object-cover"
          />
          {/* Soft gradient overlay */}
          <div className="absolute inset-0 photo-overlay" />
        </div>

        {/* Caption */}
        <p className="emotional-text text-muted-foreground">
          Some moments stay,<br />
          even when people step away.
        </p>
      </div>
    </section>
  );
};

export default PhotoMemorySection;
