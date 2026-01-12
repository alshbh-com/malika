import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Romantic background music URL (royalty-free)
  const musicUrl = "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0c6ff1bab.mp3?filename=romantic-piano-ambient-112673.mp3";

  useEffect(() => {
    audioRef.current = new Audio(musicUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Auto-play on first user interaction with the page
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.play().catch(() => {
          // Autoplay blocked, user needs to click
        });
        setIsPlaying(true);
        setHasInteracted(true);
      }
    };

    document.addEventListener("click", handleFirstInteraction, { once: true });
    document.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [hasInteracted]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-4 left-4 z-50 p-3 bg-primary/10 hover:bg-primary/20 rounded-full transition-all duration-300 backdrop-blur-sm"
      aria-label={isPlaying ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-primary animate-pulse" />
      ) : (
        <VolumeX className="w-5 h-5 text-muted-foreground" />
      )}
    </button>
  );
};

export default BackgroundMusic;
