import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'chat'>('welcome');

  const handleStart = () => {
    setCurrentScreen('chat');
  };

  const handleBack = () => {
    setCurrentScreen('welcome');
  };

  return (
    <>
      {currentScreen === 'welcome' && <WelcomeScreen onStart={handleStart} />}
      {currentScreen === 'chat' && <ChatInterface onBack={handleBack} />}
    </>
  );
};

export default Index;
