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

  const generateResponse = (participantIndex: number, currentMessages: Message[]) => {
    const participant = participantIndex === -1 ? moderator : participants[participantIndex];
    
    if (participantIndex === -1) {
      // Captain AI responses
      const moderatorResponses = [
        "מעולה! אני רואה חשיבה יזמית נהדרת. בואו נמשיך לחקור את האי שלנו! 🏝️",
        "זה בדיוק סוג החשיבה שיזמים מצליחים משתמשים בו! מה עוד אתם חושבים? 🚀",
        "אני מתרשם מהפתרונות היצירתיים שלכם. זה מה שנקרא חדשנות! 💡",
        "עבודת צוות מעולה! ברור שאתם מבינים איך לשלב כישורים שונים. 🤝",
        "זה בדיוק מה שחברות מצליחות עושות - מזהות בעיות ומוצאות פתרונות! 📈"
      ];
      return moderatorResponses[Math.floor(Math.random() * moderatorResponses.length)];
    }
    
    // Kid responses based on their personality
    const responsesByCharacter = {
      0: [ // Emma - Builder
        "אני חושבת שנוכל לבנות מקלט מדהים מבמבוק! יש לי כבר רעיון לעיצוב! 🏗️",
        "מה אם נבנה גשר מעל הנחל? זה יעשה את החיים קלים יותר! 🌉",
        "אני רואה פוטנציאל לבנות כאן עיר שלמה! בואו נתחיל במבנה אחד בכל פעם! 🏘️",
        "יש לי רעיון! נוכל לבנות מערכת לאיסוף מי גשמים! 🌧️"
      ],
      1: [ // Jake - Explorer
        "מצאתי נתיב חדש ביער! יש שם פירות שנראים טעימים! 🥭",
        "גיליתי מערה קטנה שיכולה לשמש כמחסן. בואו נבדוק אותה! 🕳️",
        "ראיתי עשן באופק! אולי יש אנשים נוספים על האי? 💨",
        "יש כאן הרבה דגים בלגונה! אני יכול ללמד אתכם איך לדוג! 🎣"
      ],
      2: [ // Sofia - Strategic Planner
        "אנחנו צריכים תוכנית לטווח ארוך. מה אם נחלק את האי לאזורים? 🗺️",
        "חשבתי על זה - אנחנו צריכים מערכת לחלוקת משימות יומית! 📅",
        "יש לי רעיון לפתרון! בואו ניצור לוח זמנים משותף לכולם! ⏰",
        "אני חושבת שכדאי לנו לתעד את כל הגילויים שלנו ביומן! 📔"
      ],
      3: [ // Marcus - Organizer
        "עשיתי רשימה של כל המשאבים שמצאנו עד כה. רוצים לשמוע? 📝",
        "אני חושב שצריך לארגן את הציוד שלנו בצורה מסודרת יותר! 🗂️",
        "מה אם נחלק לצוותים קטנים? כל צוות יקבל אחריות על משהו אחר! 👥",
        "יש לי הצעה - בואו נקבע שעות קבועות לארוחות ולמנוחה! 🕐"
      ],
      4: [ // Lily - Creative Designer
        "אני יכולה ליצור שלטים יפים לסימון הדרכים על האי! 🎨",
        "מה אם נעשה דגלים צבעוניים לסימון אזורים שונים? 🏳️‍🌈",
        "יש כאן פרחים מדהימים! אני יכולה ליצור מהם צבעים טבעיים! 🌺",
        "רעיון! בואו ניצור כלי נגינה מחפצים שמצאנו כאן! 🎵"
      ],
      5: [ // Alex - Sports Coordinator
        "מה אם נארגן תחרות חוף? זה יעזור לנו להישאר בכושר! 🏃‍♂️",
        "יש כאן מקום מושלם למשחק כדורעף חוף! מי בעד? 🏐",
        "חשבתי על זה - פעילות גופנית בוקר תעזור לנו להתחיל את היום בכוח! 💪",
        "בואו נעשה אימון שחייה בלגונה! זה כיף וגם שימושי! 🏊‍♂️"
      ]
    };
    
    const characterResponses = responsesByCharacter[participantIndex] || ["היי! איך אני יכול לעזור? 😊"];
    return characterResponses[Math.floor(Math.random() * characterResponses.length)];
  };

  const handleParticipantMessage = (participantIndex: number) => {
    setIsProcessing(true);
    
    setTimeout(() => {
      const participant = participantIndex === -1 ? moderator : participants[participantIndex];
      const content = generateResponse(participantIndex, messages);
      
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: participant.name,
        content,
        type: participantIndex === -1 ? 'moderator' : 'kid',
        avatar: participant.avatar,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        kidIndex: participantIndex >= 0 ? participantIndex : undefined
      };
      
      setMessages(prev => [...prev, newMessage]);
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
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground mb-3">
                  {isProcessing ? "⌨️ מישהו כותב..." : "בחר מי ירצה להגיב:"}
                </p>
                
                {!isProcessing && (
                  <div className="flex flex-wrap gap-2 justify-center">
                    {/* Moderator Button */}
                    <Button 
                      onClick={() => handleParticipantMessage(-1)}
                      variant="outline"
                      className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 hover:bg-primary/20"
                    >
                      {moderator.avatar} {moderator.name}
                    </Button>
                    
                    {/* Participants Buttons */}
                    {participants.map((participant, index) => (
                      <Button 
                        key={participant.id}
                        onClick={() => handleParticipantMessage(index)}
                        variant="outline"
                        className="hover:bg-muted/50"
                      >
                        {participant.avatar} {participant.name}
                      </Button>
                    ))}
                  </div>
                )}
                
                <div className="mt-4">
                  <Button 
                    onClick={onBack}
                    variant="outline"
                    className="bg-gradient-sunset hover:scale-105 transition-transform duration-200"
                  >
                    🔄 התחל הרפתקה חדשה
                  </Button>
                </div>
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