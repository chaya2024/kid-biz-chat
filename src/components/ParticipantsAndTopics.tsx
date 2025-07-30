import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { participants, moderator } from "@/data/participants";
import { availableTopics } from "@/data/topics";

interface ParticipantsAndTopicsProps {
  onBack: () => void;
  onSelectTopic: (topicId: string) => void;
}

const ParticipantsAndTopics = ({ onBack, onSelectTopic }: ParticipantsAndTopicsProps) => {
  return (
    <div className="min-h-screen bg-gradient-ocean p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="outline" onClick={onBack} className="hover:bg-secondary">
            ← חזרה
          </Button>
          <h1 className="text-3xl font-bold text-foreground">👥 משתתפים ונושאים</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid gap-8">
        {/* Participants Section */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">🌟 המשתתפים שלנו</h2>
          
          {/* Moderator */}
          <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border-2 border-primary/20">
            <div className="flex items-center gap-4">
              <div className="text-4xl">{moderator.avatar}</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold">{moderator.name}</h3>
                <p className="text-primary font-semibold">{moderator.role}</p>
                <p className="text-muted-foreground text-sm">{moderator.description}</p>
                <div className="flex gap-2 mt-2">
                  {moderator.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Young Entrepreneurs */}
          <h3 className="text-lg font-semibold mb-4 text-center">🚀 יזמים צעירים</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {participants.map((participant) => (
              <Card key={participant.id} className="p-4 hover:scale-105 transition-transform duration-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl">{participant.avatar}</div>
                  <div>
                    <h4 className="font-bold">{participant.name}</h4>
                    <p className="text-sm text-primary">{participant.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{participant.description}</p>
                <div className="flex flex-wrap gap-1">
                  {participant.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Topics Section */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">🎯 נושאי הרפתקה</h2>
          <p className="text-center text-muted-foreground mb-6">
            בחרו נושא להרפתקה שלכם! כל נושא מלמד כישורי יזמות שונים
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableTopics.map((topic) => (
              <Card 
                key={topic.id} 
                className="p-4 hover:scale-105 transition-transform duration-200 cursor-pointer border-2 hover:border-primary/50"
                onClick={() => onSelectTopic(topic.id)}
              >
                <div className="text-center mb-3">
                  <div className="text-4xl mb-2">{topic.icon}</div>
                  <h3 className="font-bold text-lg">{topic.title}</h3>
                  <Badge variant="secondary" className="mt-1">{topic.category}</Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">{topic.description}</p>
                  <div className="bg-muted/50 p-2 rounded text-xs">
                    <p className="font-semibold text-primary">{topic.scenario}</p>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>⏱️ {topic.duration}</span>
                    <span>👥 {topic.participants} משתתפים</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-3 bg-gradient-tropical hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTopic(topic.id);
                  }}
                >
                  🚀 התחל הרפתקה
                </Button>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ParticipantsAndTopics;