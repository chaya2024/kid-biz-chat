import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DiscussionTopic } from "@/types/discussion";
import { CalendarDays, Users } from "lucide-react";

interface TopicListProps {
  topics: DiscussionTopic[];
  onSelectTopic: (topic: DiscussionTopic) => void;
  onCreateNew: () => void;
}

const TopicList = ({ topics, onSelectTopic, onCreateNew }: TopicListProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">נושאי דיון</h2>
          <p className="text-muted-foreground">בחר נושא דיון קיים או צור חדש</p>
        </div>
        <Button 
          onClick={onCreateNew}
          className="bg-gradient-tropical hover:scale-105 transition-transform duration-200"
        >
          ➕ צור נושא חדש
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <Card 
            key={topic.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-primary"
            onClick={() => onSelectTopic(topic)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{topic.title}</CardTitle>
              {topic.description && (
                <CardDescription>{topic.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  📋 {topic.scenario}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{topic.flow.length} הודעות</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" />
                    <span>{new Date(topic.created_at).toLocaleDateString('he-IL')}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {topics.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="space-y-4">
              <div className="text-6xl">📚</div>
              <div>
                <h3 className="text-lg font-semibold">אין נושאי דיון עדיין</h3>
                <p className="text-muted-foreground">צור את הנושא הראשון כדי להתחיל</p>
              </div>
              <Button 
                onClick={onCreateNew}
                className="bg-gradient-sunset hover:scale-105 transition-transform duration-200"
              >
                צור נושא ראשון
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TopicList;