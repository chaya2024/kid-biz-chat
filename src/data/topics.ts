export interface Topic {
  id: string;
  title: string;
  description: string;
  scenario: string;
  duration: string;
  participants: number;
  icon: string;
  category: string;
}

export const availableTopics: Topic[] = [
  {
    id: "desert-island",
    title: "🏝️ הרפתקה באי בודד",
    description: "למד על עבודת צוות ופתרון בעיות בהרפתקה מרתקת של קבוצת צ'אט",
    scenario: "התרסקתם על אי מסתורי בודד. כיצד תשרדו ותפתחו חברה משלכם?",
    duration: "45 דקות",
    participants: 6,
    icon: "🏝️",
    category: "הישרדות"
  },
  {
    id: "space-mission",
    title: "🚀 משימה בחלל",
    description: "הקימו תחנת חלל ולמדו על חדשנות וטכנולוגיה",
    scenario: "אתם צוות אסטרונאוטים צעירים שנשלחו להקים תחנת חלל חדשה על מאדים",
    duration: "50 דקות",
    participants: 6,
    icon: "🚀",
    category: "טכנולוגיה"
  },
  {
    id: "underwater-city",
    title: "🌊 עיר תת-ימית",
    description: "בנו עיר מתחת למים ולמדו על קיימות וחדשנות",
    scenario: "גלתם עולם תת-ימי מדהים. כיצד תבנו עיר ידידותית לסביבה?",
    duration: "40 דקות",
    participants: 6,
    icon: "🌊",
    category: "סביבה"
  },
  {
    id: "time-travel",
    title: "⏰ מסע בזמן",
    description: "נסעו בזמן וטפלו בבעיות היסטוריות",
    scenario: "מכונת הזמן שלכם התקלקלה! תחזרו בזמן ותשנו את ההיסטוריה לטובה",
    duration: "45 דקות",
    participants: 6,
    icon: "⏰",
    category: "היסטוריה"
  },
  {
    id: "magic-school",
    title: "🎭 בית ספר לקסמים",
    description: "הקימו בית ספר לקסמים ולמדו על ניהול וחינוך",
    scenario: "אתם מייסדים בית ספר לקסמים חדש. כיצד תנהלו אותו ותמשכו תלמידים?",
    duration: "35 דקות",
    participants: 6,
    icon: "🎭",
    category: "חינוך"
  },
  {
    id: "robot-factory",
    title: "🤖 מפעל רובוטים",
    description: "בנו מפעל רובוטים ולמדו על אוטומציה ויצירתיות",
    scenario: "אתם מהנדסים צעירים שמקימים מפעל רובוטים מיוחד. מה תייצרו?",
    duration: "40 דקות",
    participants: 6,
    icon: "🤖",
    category: "רובוטיקה"
  },
  {
    id: "food-truck",
    title: "🚚 משאית אוכל",
    description: "הקימו עסק משאית אוכל ולמדו על יזמות ושירות לקוחות",
    scenario: "יש לכם משאית אוכל ריקה ו-1000 שקל. כיצד תהפכו אותה לעסק מצליח?",
    duration: "30 דקות",
    participants: 6,
    icon: "🚚",
    category: "עסקים"
  },
  {
    id: "eco-village",
    title: "🌱 כפר אקולוגי",
    description: "בנו כפר ידידותי לסביבה ולמדו על קיימות",
    scenario: "תכננו כפר שחי בהרמוניה עם הטבע ומשתמש רק באנרגיות מתחדשות",
    duration: "50 דקות",
    participants: 6,
    icon: "🌱",
    category: "קיימות"
  },
  {
    id: "game-studio",
    title: "🎮 סטודיו משחקים",
    description: "הקימו סטודיו למשחקי מחשב ופתחו משחק חדש",
    scenario: "אתם מפתחי משחקים צעירים. תכננו ובנו את המשחק הבא שיכבוש את העולם!",
    duration: "45 דקות",
    participants: 6,
    icon: "🎮",
    category: "משחקים"
  },
  {
    id: "news-channel",
    title: "📺 ערוץ חדשות",
    description: "הקימו ערוץ חדשות ולמדו על תקשורת ואמת",
    scenario: "אתם צוות עיתונאים צעיר שמקים ערוץ חדשות. כיצד תדווחו בצורה מעניינת ואמיתית?",
    duration: "40 דקות",
    participants: 6,
    icon: "📺",
    category: "תקשורת"
  },
  {
    id: "fashion-brand",
    title: "👗 מותג אופנה",
    description: "יצרו מותג אופנה בר-קיימא ולמדו על עיצוב ושיווק",
    scenario: "תעצבו מותג אופנה שמשלב סטייל עם אחריות סביבתית",
    duration: "35 דקות",
    participants: 6,
    icon: "👗",
    category: "אופנה"
  },
  {
    id: "music-festival",
    title: "🎵 פסטיבל מוזיקה",
    description: "ארגנו פסטיבל מוזיקה ולמדו על ארגון אירועים",
    scenario: "אתם מארגני אירועים צעירים שמתכננים פסטיבל מוזיקה מיוחד",
    duration: "45 דקות",
    participants: 6,
    icon: "🎵",
    category: "מוזיקה"
  }
];