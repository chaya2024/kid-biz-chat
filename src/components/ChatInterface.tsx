import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ChatMessage, { Message } from "./ChatMessage";
import { sessionScript } from "@/data/sessionScript";

interface ChatInterfaceProps {
  onBack: () => void;
}

const ChatInterface = ({ onBack }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      sender: 'Captain AI',
      content: sessionScript.introduction,
      type: 'moderator',
      avatar: '🤖',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleNextMessage = () => {
    if (currentStep >= sessionScript.flow.length) return;
    
    setIsProcessing(true);
    
    setTimeout(() => {
      const currentFlow = sessionScript.flow[currentStep];
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: currentFlow.sender,
        content: currentFlow.content,
        type: currentFlow.type,
        avatar: currentFlow.avatar,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        kidIndex: currentFlow.kidIndex
      };
      
      setMessages(prev => [...prev, newMessage]);
      setCurrentStep(prev => prev + 1);
      setIsProcessing(false);
    }, 1000);
  };

  const isComplete = currentStep >= sessionScript.flow.length;

  return (
    <div className="min-h-screen bg-gradient-ocean flex flex-col">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-border p-4 shadow-sm">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onBack} className="hover:bg-secondary">
              ← Back
            </Button>
            <div>
              <h1 className="font-bold text-lg">🏝️ Island Adventure Chat</h1>
              <p className="text-sm text-muted-foreground">6 young entrepreneurs + AI guide</p>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Step {Math.min(currentStep + 1, sessionScript.flow.length + 1)} of {sessionScript.flow.length + 1}
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-4xl mx-auto flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Controls */}
          <div className="p-4 bg-white/90 backdrop-blur-sm border-t border-border">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {isComplete ? (
                  "🎉 Adventure Complete! Great teamwork everyone!"
                ) : isProcessing ? (
                  "⌨️ Someone is typing..."
                ) : (
                  "Click Next to continue the adventure..."
                )}
              </div>
              
              {!isComplete && (
                <Button 
                  onClick={handleNextMessage}
                  disabled={isProcessing}
                  className="bg-gradient-tropical hover:scale-105 transition-transform duration-200"
                >
                  {isProcessing ? "⏳ Wait..." : "➡️ Next Message"}
                </Button>
              )}
              
              {isComplete && (
                <Button 
                  onClick={onBack}
                  className="bg-gradient-sunset hover:scale-105 transition-transform duration-200"
                >
                  🔄 Start New Session
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;