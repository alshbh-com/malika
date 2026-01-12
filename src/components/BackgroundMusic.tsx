import { useState, useRef, useEffect, createContext, useContext } from "react";
import { Volume2, VolumeX } from "lucide-react";

// Context to control music from other components
interface MusicContextType {
  pauseMusic: () => void;
  resumeMusic: () => void;
}

export const MusicContext = createContext<MusicContextType>({
  pauseMusic: () => {},
  resumeMusic: () => {},
});

export const useMusic = () => useContext(MusicContext);

interface BackgroundMusicProps {
  children: React.ReactNode;
}

export const BackgroundMusicProvider = ({ children }: BackgroundMusicProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [wasPausedByVoice, setWasPausedByVoice] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Local music file
  const musicUrl = "/audio/background-music.mp3";

  useEffect(() => {
    const audio = new Audio(musicUrl);
    audio.loop = true;
    audio.volume = 0.2;
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.log("Autoplay prevented:", err);
        });
        setHasInteracted(true);
      }
    };

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("touchstart", handleFirstInteraction);
    document.addEventListener("scroll", handleFirstInteraction);

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
      document.removeEventListener("scroll", handleFirstInteraction);
    };
  }, [hasInteracted]);

  const pauseMusic = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setWasPausedByVoice(true);
    }
  };

  const resumeMusic = () => {
    if (audioRef.current && wasPausedByVoice) {
      audioRef.current.play().catch(() => {});
      setWasPausedByVoice(false);
    }
  };

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
    }
  };

  return (
    <MusicContext.Provider value={{ pauseMusic, resumeMusic }}>
      {children}
      <button
        onClick={toggleMusic}
        className="fixed bottom-4 left-4 z-50 p-3 bg-primary/20 hover:bg-primary/30 rounded-full transition-all duration-300 backdrop-blur-sm border border-primary/20"
        aria-label={isPlaying ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-primary animate-pulse" />
        ) : (
          <VolumeX className="w-5 h-5 text-muted-foreground" />
        )}
      </button>
    </MusicContext.Provider>
  );
};

export default BackgroundMusicProvider;
