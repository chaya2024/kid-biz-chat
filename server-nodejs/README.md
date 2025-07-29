# שרת Node.js עם MongoDB לפלטפורמת דיונים

## התקנה

1. וודאי שיש לך Node.js ו-MongoDB מותקנים במחשב
2. התקן את התלויות:
```bash
npm install
```

3. צור קובץ `.env` בתיקיית השורש והעתק את התוכן מ-`.env.example`
4. עדכן את ההגדרות בקובץ `.env` בהתאם לסביבה שלך

## הרצה

### הרצה רגילה:
```bash
npm start
```

### הרצה במצב פיתוח (עם nodemon):
```bash
npm run dev
```

## API נקודות קצה

### נושאי דיון

- `GET /api/topics` - קבלת כל הנושאים
  - פרמטרים: `page`, `limit`, `active`
- `GET /api/topics/:id` - קבלת נושא ספציפי
- `POST /api/topics` - יצירת נושא חדש
- `PUT /api/topics/:id` - עדכון נושא
- `DELETE /api/topics/:id` - מחיקת נושא

### הודעות

- `GET /api/messages/:topicId` - קבלת הודעות לנושא ספציפי
  - פרמטרים: `page`, `limit`
- `POST /api/messages` - יצירת הודעה חדשה
- `GET /api/messages/message/:id` - קבלת הודעה ספציפית
- `DELETE /api/messages/:id` - מחיקת הודעה

### בריאות השרת

- `GET /api/health` - בדיקת בריאות השרת

## מבנה הפרויקט

```
server-nodejs/
├── models/           # מודלים של MongoDB
│   ├── Topic.js     # מודל נושאי דיון
│   └── Message.js   # מודל הודעות
├── routes/          # נתבי API
│   ├── topics.js    # נתבי נושאי דיון
│   └── messages.js  # נתבי הודעות
├── server.js        # קובץ השרת הראשי
├── package.json     # הגדרות הפרויקט
├── .env.example     # דוגמה להגדרות סביבה
└── README.md        # מדריך זה
```

## דוגמאות שימוש

### יצירת נושא חדש:
```bash
curl -X POST http://localhost:3001/api/topics \
  -H "Content-Type: application/json" \
  -d '{
    "title": "הרפתקה באי בודד",
    "description": "דיון על הישרדות באי בודד",
    "scenario": "אתם תקועים באי בודד אחרי התרסקות מטוס...",
    "flow": []
  }'
```

### יצירת הודעה:
```bash
curl -X POST http://localhost:3001/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "content": "שלום, מה שלומכם?",
    "topicId": "TOPIC_ID_HERE",
    "sender": "user"
  }'
```

## הערות חשובות

- וודא ש-MongoDB פועל לפני הרצת השרת
- השרת פועל כברירת מחדל על פורט 3001
- ניתן לשנות את הפורט בקובץ `.env`
- השרת תומך ב-CORS עבור פיתוח מקומי