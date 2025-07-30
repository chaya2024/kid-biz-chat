import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ChatMessage, { Message } from "./ChatMessage";
import { sessionScript } from "@/data/sessionScript";
import { participants, moderator } from "@/data/participants";

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
    <div className="min-h-screen bg-gradient-ocean flex">
      {/* Participants Sidebar */}
      <div className="w-80 bg-white/90 backdrop-blur-sm border-r border-border p-4 hidden lg:block">
        <h3 className="font-bold text-lg mb-4 text-center">👥 המשתתפים</h3>
        
        {/* Moderator */}
        <Card className="p-3 mb-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{moderator.avatar}</div>
            <div>
              <h4 className="font-semibold text-sm">{moderator.name}</h4>
              <p className="text-xs text-primary">{moderator.role}</p>
            </div>
          </div>
        </Card>

        {/* Young Entrepreneurs */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-muted-foreground text-center">🚀 יזמים צעירים</h4>
          {participants.map((participant) => (
            <Card key={participant.id} className="p-3 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="text-xl">{participant.avatar}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{participant.name}</h4>
                  <p className="text-xs text-muted-foreground">{participant.role}</p>
                  <div className="flex gap-1 mt-1">
                    {participant.skills.slice(0, 2).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm border-b border-border p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={onBack} className="hover:bg-secondary">
                ← חזרה
              </Button>
              <div>
                <h1 className="font-bold text-lg">🏝️ הרפתקת האי</h1>
                <p className="text-sm text-muted-foreground">6 יזמים צעירים + מדריך AI</p>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              שלב {Math.min(currentStep + 1, sessionScript.flow.length + 1)} מתוך {sessionScript.flow.length + 1}
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
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
                    "🎉 ההרפתקה הושלמה! עבודת צוות מעולה!"
                  ) : isProcessing ? (
                    "⌨️ מישהו כותב..."
                  ) : (
                    "לחצו הבא כדי להמשיך בהרפתקה..."
                  )}
                </div>
                
                {!isComplete && (
                  <Button 
                    onClick={handleNextMessage}
                    disabled={isProcessing}
                    className="bg-gradient-tropical hover:scale-105 transition-transform duration-200"
                  >
                    {isProcessing ? "⏳ המתן..." : "➡️ הודעה הבאה"}
                  </Button>
                )}
                
                {isComplete && (
                  <Button 
                    onClick={onBack}
                    className="bg-gradient-sunset hover:scale-105 transition-transform duration-200"
                  >
                    🔄 התחל הרפתקה חדשה
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Participants Toggle - Only on small screens */}
      <div className="lg:hidden fixed bottom-20 right-4 z-10">
        <Button 
          variant="outline" 
          size="sm"
          className="bg-white/90 backdrop-blur-sm"
          onClick={() => {
            // Could add a mobile drawer here in the future
          }}
        >
          👥 רשימת משתתפים
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;