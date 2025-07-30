import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import ChatInterface from "@/components/ChatInterface";
import ParticipantsAndTopics from "@/components/ParticipantsAndTopics";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'participants' | 'chat'>('welcome');
  const [selectedTopic, setSelectedTopic] = useState<string>('desert-island');

  const handleStart = () => {
    setCurrentScreen('participants');
  };

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopic(topicId);
    setCurrentScreen('chat');
  };

  const handleBack = () => {
    if (currentScreen === 'chat') {
      setCurrentScreen('participants');
    } else {
      setCurrentScreen('welcome');
    }
  };

  return (
    <>
      {currentScreen === 'welcome' && <WelcomeScreen onStart={handleStart} />}
      {currentScreen === 'participants' && (
        <ParticipantsAndTopics 
          onBack={handleBack} 
          onSelectTopic={handleSelectTopic}
        />
      )}
      {currentScreen === 'chat' && <ChatInterface onBack={handleBack} />}
    </>
  );
};

export default Index;
