import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import ChatInterface from "@/components/ChatInterface";
import TopicList from "@/components/topics/TopicList";
import CreateTopicForm from "@/components/topics/CreateTopicForm";
import { useTopics } from "@/hooks/useTopics";
import { DiscussionTopic } from "@/types/discussion";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const [currentView, setCurrentView] = useState<'topics' | 'create' | 'chat'>('topics');
  const [selectedTopic, setSelectedTopic] = useState<DiscussionTopic | null>(null);
  const { topics, loading, createTopic } = useTopics();

  const handleSelectTopic = (topic: DiscussionTopic) => {
    setSelectedTopic(topic);
    setCurrentView('chat');
  };

  const handleCreateNew = () => {
    setCurrentView('create');
  };

  const handleCreateTopic = async (topicData: {
    title: string;
    description: string;
    scenario: string;
    flow: any[];
  }) => {
    const newTopic = await createTopic(topicData);
    setSelectedTopic(newTopic);
    setCurrentView('chat');
  };

  const handleBack = () => {
    setCurrentView('topics');
    setSelectedTopic(null);
  };

  const handleCancelCreate = () => {
    setCurrentView('topics');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-ocean flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-spin">🌀</div>
          <p className="text-lg">טוען נושאי דיון...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-ocean">
      {currentView === 'topics' && (
        <div className="container mx-auto px-4 py-8">
          <TopicList 
            topics={topics}
            onSelectTopic={handleSelectTopic}
            onCreateNew={handleCreateNew}
          />
        </div>
      )}
      
      {currentView === 'create' && (
        <div className="container mx-auto px-4 py-8">
          <CreateTopicForm 
            onCreateTopic={handleCreateTopic}
            onCancel={handleCancelCreate}
          />
        </div>
      )}
      
      {currentView === 'chat' && selectedTopic && (
        <ChatInterface 
          topic={selectedTopic}
          onBack={handleBack} 
        />
      )}
      
      <Toaster />
    </div>
  );
};

export default Index;
