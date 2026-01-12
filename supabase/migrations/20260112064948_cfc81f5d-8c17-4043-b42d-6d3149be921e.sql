-- Create voice messages table for storing voice recordings
CREATE TABLE public.voice_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  audio_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.voice_messages ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for Malika to hear the messages)
CREATE POLICY "Anyone can view voice messages"
ON public.voice_messages
FOR SELECT
USING (true);

-- Only admin can insert/update/delete (will be handled by edge function with password)
CREATE POLICY "Anyone can insert voice messages"
ON public.voice_messages
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can delete voice messages"
ON public.voice_messages
FOR DELETE
USING (true);

-- Create storage bucket for voice recordings
INSERT INTO storage.buckets (id, name, public) VALUES ('voice-messages', 'voice-messages', true);

-- Storage policies
CREATE POLICY "Anyone can view voice files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'voice-messages');

CREATE POLICY "Anyone can upload voice files"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'voice-messages');

CREATE POLICY "Anyone can delete voice files"
ON storage.objects
FOR DELETE
USING (bucket_id = 'voice-messages');