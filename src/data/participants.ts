export interface Participant {
  id: number;
  name: string;
  avatar: string;
  role: string;
  description: string;
  skills: string[];
}

export const participants: Participant[] = [
  {
    id: 0,
    name: "Emma",
    avatar: "👧",
    role: "בנאית ומהנדסת",
    description: "אוהבת לבנות דברים ויצירתית מאוד",
    skills: ["בנייה", "הנדסה", "יצירתיות", "פתרון בעיות"]
  },
  {
    id: 1,
    name: "Jake",
    avatar: "👦", 
    role: "חוקר ומגלה משאבים",
    description: "מוצא דברים ובקיא בהישרדות",
    skills: ["חקירה", "הישרדות", "איסוף משאבים", "ניווט"]
  },
  {
    id: 2,
    name: "Sofia",
    avatar: "👧",
    role: "מתכננת אסטרטגית",
    description: "אוהבת לפתור חידות ולתכנן",
    skills: ["תכנון אסטרטגי", "פתרון חידות", "ניתוח", "ארגון"]
  },
  {
    id: 3,
    name: "Marcus", 
    avatar: "👦",
    role: "מארגן ומנהל",
    description: "אוהב לארגן ולעשות רשימות",
    skills: ["ארגון", "ניהול", "רשימות", "תיאום"]
  },
  {
    id: 4,
    name: "Lily",
    avatar: "👧",
    role: "מעצבת ויוצרת",
    description: "יצירתית ואוהבת אמנות",
    skills: ["עיצוב", "אמנות", "יצירתיות", "אסתטיקה"]
  },
  {
    id: 5,
    name: "Alex",
    avatar: "👦",
    role: "מתאם כושר וכיף",
    description: "אוהב ספורט ומשחקים",
    skills: ["ספורט", "משחקים", "מוטיבציה", "כושר גופני"]
  }
];

export const moderator = {
  name: "Captain AI",
  avatar: "🤖",
  role: "מדריך הרפתקה",
  description: "מדריך AI חכם ועוזר ללמידה",
  skills: ["הדרכה", "לימוד", "פתרון בעיות", "מוטיבציה"]
};