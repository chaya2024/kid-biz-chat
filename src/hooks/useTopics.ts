import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DiscussionTopic } from '@/types/discussion';
import { useToast } from '@/components/ui/use-toast';

export const useTopics = () => {
  const [topics, setTopics] = useState<DiscussionTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTopics = async () => {
    try {
      const { data, error } = await supabase
        .from('discussion_topics')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTopics(data?.map(item => ({
        ...item,
        flow: Array.isArray(item.flow) ? item.flow : JSON.parse(item.flow as string)
      })) || []);
    } catch (error) {
      console.error('Error fetching topics:', error);
      toast({
        title: "שגיאה",
        description: "לא ניתן לטעון את נושאי הדיון",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTopic = async (topic: Omit<DiscussionTopic, 'id' | 'created_at' | 'updated_at' | 'is_active'>) => {
    try {
      const { data, error } = await supabase
        .from('discussion_topics')
        .insert([{
          ...topic,
          flow: JSON.stringify(topic.flow)
        }])
        .select()
        .single();

      if (error) throw error;
      
      const processedData = {
        ...data,
        flow: Array.isArray(data.flow) ? data.flow : JSON.parse(data.flow as string)
      };
      
      setTopics(prev => [processedData, ...prev]);
      toast({
        title: "הצלחה!",
        description: "נושא הדיון נוצר בהצלחה",
      });
      
      return processedData;
    } catch (error) {
      console.error('Error creating topic:', error);
      toast({
        title: "שגיאה",
        description: "לא ניתן ליצור נושא דיון חדש",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return {
    topics,
    loading,
    createTopic,
    refetchTopics: fetchTopics
  };
};