import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-ocean flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center border-0 shadow-2xl">
        <div className="mb-6">
          <div className="text-6xl mb-4">🏝️</div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Island Adventure Chat
          </h1>
          <p className="text-muted-foreground">
            Join your friends in an exciting entrepreneurship adventure!
          </p>
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="bg-chat-bg p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-2">📚 Session: Deserted Island</h2>
            <p className="text-sm text-muted-foreground">
              Learn teamwork and problem-solving skills in a fun group chat adventure
            </p>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>👥 6 young entrepreneurs ready to explore</p>
            <p>🤖 1 AI adventure guide to help you</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button 
            onClick={onStart}
            className="w-full text-lg py-6 bg-gradient-tropical hover:scale-105 transition-transform duration-200"
          >
            🚀 התחל הרפתקה
          </Button>
          
          <Button 
            onClick={onStart}
            variant="outline"
            className="w-full text-lg py-4 hover:scale-105 transition-transform duration-200"
          >
            👥 צפה במשתתפים ונושאים
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default WelcomeScreen;