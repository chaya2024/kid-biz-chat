import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FlowStep } from "@/types/discussion";

interface CreateTopicFormProps {
  onCreateTopic: (topic: {
    title: string;
    description: string;
    scenario: string;
    flow: FlowStep[];
  }) => Promise<void>;
  onCancel: () => void;
}

const CreateTopicForm = ({ onCreateTopic, onCancel }: CreateTopicFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scenario, setScenario] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !scenario.trim()) return;

    setLoading(true);
    try {
      // Create default flow with welcome message
      const defaultFlow: FlowStep[] = [
        {
          sender: "Captain AI",
          content: `שלום חברים! בואו נתחיל את הדיון שלנו: ${scenario}`,
          type: "moderator",
          avatar: "🤖"
        }
      ];

      await onCreateTopic({
        title: title.trim(),
        description: description.trim(),
        scenario: scenario.trim(),
        flow: defaultFlow
      });
    } catch (error) {
      console.error('Error creating topic:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>צור נושא דיון חדש</CardTitle>
          <CardDescription>
            הגדר נושא דיון חדש לילדים יזמים
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">כותרת הנושא *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="לדוגמה: הרפתקת החלל"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">תיאור קצר</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="תיאור קצר של הנושא"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scenario">תרחיש הדיון *</Label>
              <Textarea
                id="scenario"
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                placeholder="תאר את התרחיש שעליו הילדים ידונו..."
                className="min-h-24"
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="submit" 
                disabled={loading || !title.trim() || !scenario.trim()}
                className="bg-gradient-tropical hover:scale-105 transition-transform duration-200"
              >
                {loading ? "⏳ יוצר..." : "✅ צור נושא"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                disabled={loading}
              >
                ביטול
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTopicForm;