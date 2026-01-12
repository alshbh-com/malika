import { useState, useRef, useEffect } from "react";
import { Lock, Mic, Square, Trash2, X, Play, Pause } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface VoiceMessage {
  id: string;
  audio_url: string;
  created_at: string;
}

const ADMIN_PASSWORD = "alshbh@gmail.com";

const AdminPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [messages, setMessages] = useState<VoiceMessage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
    }
  }, [isAuthenticated]);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("voice_messages")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (data) {
      setMessages(data);
    }
    if (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast.success("تم الدخول بنجاح");
    } else {
      toast.error("كلمة السر غلط");
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(audioBlob);
        setAudioUrl(URL.createObjectURL(audioBlob));
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      toast.error("لا يمكن الوصول للميكروفون");
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const uploadRecording = async () => {
    if (!audioBlob) return;

    setIsUploading(true);
    try {
      const fileName = `voice_${Date.now()}.webm`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("voice-messages")
        .upload(fileName, audioBlob);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("voice-messages")
        .getPublicUrl(fileName);

      const { error: insertError } = await supabase
        .from("voice_messages")
        .insert({ audio_url: urlData.publicUrl });

      if (insertError) throw insertError;

      toast.success("تم رفع الرسالة بنجاح");
      setAudioBlob(null);
      setAudioUrl(null);
      fetchMessages();
    } catch (error) {
      toast.error("فشل رفع الرسالة");
      console.error("Error uploading:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const deleteMessage = async (id: string, audioUrl: string) => {
    try {
      const fileName = audioUrl.split("/").pop();
      
      if (fileName) {
        await supabase.storage.from("voice-messages").remove([fileName]);
      }
      
      await supabase.from("voice_messages").delete().eq("id", id);
      
      toast.success("تم الحذف");
      fetchMessages();
    } catch (error) {
      toast.error("فشل الحذف");
      console.error("Error deleting:", error);
    }
  };

  const togglePlay = (id: string, url: string) => {
    if (playingId === id) {
      audioRefs.current[id]?.pause();
      setPlayingId(null);
    } else {
      // Stop any currently playing audio
      Object.values(audioRefs.current).forEach(audio => audio.pause());
      
      if (!audioRefs.current[id]) {
        audioRefs.current[id] = new Audio(url);
        audioRefs.current[id].onended = () => setPlayingId(null);
      }
      audioRefs.current[id].play();
      setPlayingId(id);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors"
        aria-label="فتح الأدمن"
      >
        <Lock className="w-5 h-5 text-primary" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-full p-4 md:p-8">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">لوحة التحكم</h2>
            <button
              onClick={() => {
                setIsOpen(false);
                setIsAuthenticated(false);
                setPassword("");
              }}
              className="p-2 hover:bg-secondary rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isAuthenticated ? (
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="كلمة السر"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="text-center"
              />
              <Button onClick={handleLogin} className="w-full">
                دخول
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Recording Section */}
              <div className="bg-secondary/50 rounded-xl p-6 text-center">
                <h3 className="font-semibold mb-4">تسجيل رسالة صوتية جديدة</h3>
                
                {!audioUrl ? (
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-all ${
                      isRecording 
                        ? "bg-red-500 animate-pulse" 
                        : "bg-primary hover:bg-primary/80"
                    }`}
                  >
                    {isRecording ? (
                      <Square className="w-6 h-6 text-white" />
                    ) : (
                      <Mic className="w-6 h-6 text-white" />
                    )}
                  </button>
                ) : (
                  <div className="space-y-4">
                    <audio controls src={audioUrl} className="w-full" />
                    <div className="flex gap-2 justify-center">
                      <Button
                        onClick={uploadRecording}
                        disabled={isUploading}
                      >
                        {isUploading ? "جاري الرفع..." : "رفع الرسالة"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setAudioBlob(null);
                          setAudioUrl(null);
                        }}
                      >
                        إلغاء
                      </Button>
                    </div>
                  </div>
                )}
                
                <p className="text-sm text-muted-foreground mt-3">
                  {isRecording ? "جاري التسجيل..." : "اضغط للتسجيل"}
                </p>
              </div>

              {/* Messages List */}
              <div className="space-y-3">
                <h3 className="font-semibold">الرسائل المسجلة</h3>
                {messages.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    لا توجد رسائل بعد
                  </p>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="bg-secondary/30 rounded-lg p-3 flex items-center gap-3"
                    >
                      <button
                        onClick={() => togglePlay(msg.id, msg.audio_url)}
                        className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0"
                      >
                        {playingId === msg.id ? (
                          <Pause className="w-4 h-4 text-white" />
                        ) : (
                          <Play className="w-4 h-4 text-white mr-[-2px]" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground">
                          {new Date(msg.created_at).toLocaleDateString("ar")}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteMessage(msg.id, msg.audio_url)}
                        className="p-2 hover:bg-destructive/20 rounded-full text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
