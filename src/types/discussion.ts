export interface DiscussionTopic {
  id: string;
  title: string;
  description?: string;
  scenario: string;
  flow: FlowStep[];
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface FlowStep {
  sender: string;
  content: string;
  type: 'moderator' | 'participant';
  avatar: string;
  kidIndex?: number;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  type: 'moderator' | 'participant';
  avatar: string;
  timestamp: string;
  kidIndex?: number;
}