-- Create table for discussion topics
CREATE TABLE public.discussion_topics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  scenario TEXT NOT NULL,
  flow JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE public.discussion_topics ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can view topics)
CREATE POLICY "Topics are viewable by everyone" 
ON public.discussion_topics 
FOR SELECT 
USING (is_active = true);

-- Create policy for admin access (for now, anyone can create/update)
CREATE POLICY "Anyone can create topics" 
ON public.discussion_topics 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update topics" 
ON public.discussion_topics 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_topics_updated_at
BEFORE UPDATE ON public.discussion_topics
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default island adventure topic
INSERT INTO public.discussion_topics (title, description, scenario, flow) VALUES (
  'הרפתקת האי הנטוש',
  'תרחיש הישרדות מרתק לילדים יזמים',
  'אתם מגיעים לאי נטוש - מה אתם עושים?',
  '[
    {
      "sender": "Captain AI",
      "content": "שלום חברים! אנחנו כאן להתחיל הרפתקה מדהימה! 🏝️",
      "type": "moderator",
      "avatar": "🤖"
    },
    {
      "sender": "מיה",
      "content": "וואו! אני כל כך מתרגשת! איפה אנחנו?",
      "type": "participant",
      "avatar": "👧",
      "kidIndex": 0
    },
    {
      "sender": "דניאל",
      "content": "נראה כמו אי טרופי! יש כאן עצי קוקוס!",
      "type": "participant", 
      "avatar": "👦",
      "kidIndex": 1
    }
  ]'::jsonb
);