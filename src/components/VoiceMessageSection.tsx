import { useState, useEffect, useRef } from "react";
import { Play, Pause, Heart, Mic } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useMusic } from "./BackgroundMusic";

interface VoiceMessage {
  id: string;
  audio_url: string;
  created_at: string;
}

interface VoiceMessageSectionProps {
  isVisible: boolean;
}

const VoiceMessageSection = ({ isVisible }: VoiceMessageSectionProps) => {
  const [messages, setMessages] = useState<VoiceMessage[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const { pauseMusic, resumeMusic } = useMusic();

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("voice_messages")
        .select("*")
        .order("created_at", { ascending: true });
      
      if (data) {
        setMessages(data);
      }
    };

    fetchMessages();

    // Subscribe to realtime changes
    const channel = supabase
      .channel("voice_messages_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "voice_messages" },
        () => fetchMessages()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const togglePlay = (id: string, url: string) => {
    if (playingId === id) {
      audioRefs.current[id]?.pause();
      setPlayingId(null);
      resumeMusic(); // Resume background music when voice stops
    } else {
      // Stop any currently playing audio
      Object.values(audioRefs.current).forEach(audio => audio.pause());
      
      // Pause background music when voice plays
      pauseMusic();
      
      if (!audioRefs.current[id]) {
        audioRefs.current[id] = new Audio(url);
        audioRefs.current[id].onended = () => {
          setPlayingId(null);
          resumeMusic(); // Resume background music when voice ends
        };
        audioRefs.current[id].ontimeupdate = () => {
          const audio = audioRefs.current[id];
          if (audio) {
            setProgress(prev => ({
              ...prev,
              [id]: (audio.currentTime / audio.duration) * 100
            }));
          }
        };
      }
      audioRefs.current[id].play();
      setPlayingId(id);
    }
  };

  if (messages.length === 0) {
    return null;
  }

  return (
    <section className="section-container bg-secondary/20">
      <div className={`max-w-md mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Section icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
            <Mic className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* Title */}
        <h2 className="section-heading text-foreground mb-4">
          رسالة صوتية ليكِ
        </h2>
        
        <p className="body-text text-muted-foreground mb-8">
          اسمعيني يا مليكة
        </p>

        {/* Voice Messages */}
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={msg.id}
              className="bg-background/50 backdrop-blur-sm rounded-2xl p-5 transition-all duration-500"
              style={{
                transitionDelay: `${index * 100}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => togglePlay(msg.id, msg.audio_url)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    playingId === msg.id 
                      ? "bg-primary scale-110" 
                      : "bg-primary/80 hover:bg-primary"
                  }`}
                >
                  {playingId === msg.id ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white mr-[-2px]" />
                  )}
                </button>
                
                <div className="flex-1">
                  {/* Progress bar */}
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-100"
                      style={{ width: `${progress[msg.id] || 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Caption */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <Heart className="w-4 h-4 text-primary fill-primary/50" />
          <p className="text-sm text-muted-foreground">من محمد لمليكة</p>
          <Heart className="w-4 h-4 text-primary fill-primary/50" />
        </div>
      </div>
    </section>
  );
};

export default VoiceMessageSection;
