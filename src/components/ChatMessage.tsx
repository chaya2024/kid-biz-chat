import { cn } from "@/lib/utils";
import { Message } from "@/types/discussion";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const getBubbleColor = () => {
    if (message.type === 'moderator') {
      return 'bg-moderator-bubble text-white';
    }
    
    // Cycle through different participant bubble colors
    const colors = [
      'bg-kid-bubble-1 text-foreground',
      'bg-kid-bubble-2 text-white',
      'bg-kid-bubble-3 text-white',
      'bg-kid-bubble-4 text-white',
      'bg-kid-bubble-5 text-white',
      'bg-kid-bubble-6 text-white',
    ];
    
    return colors[(message.kidIndex || 0) % colors.length];
  };

  return (
    <div className={cn(
      "flex gap-3 mb-4 animate-in slide-in-from-bottom-2 duration-300",
      message.type === 'moderator' ? 'flex-row' : 'flex-row'
    )}>
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-gradient-tropical flex items-center justify-center text-lg shadow-md">
          {message.avatar}
        </div>
      </div>
      
      <div className="flex-1 max-w-[70%]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-foreground">
            {message.sender}
          </span>
          <span className="text-xs text-muted-foreground">
            {message.timestamp}
          </span>
        </div>
        
        <div className={cn(
          "p-3 rounded-2xl shadow-sm",
          getBubbleColor()
        )}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;