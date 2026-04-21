# 📮 ePostal Coaching App

A full-featured mobile web app for epostal.in — India's #1 postal exam coaching platform.

## 🚀 How to Run

1. Extract the ZIP file
2. Open `login.html` in a browser to start from the onboarding/login screen
3. OR open `index.html` directly to go straight to the main app
4. Best viewed on mobile (375–430px width) or use browser DevTools → Mobile view

---

## 📱 Pages & Features

### 🔐 Login / Onboarding (login.html)
- 3-slide animated onboarding carousel
- Login with mobile + password
- Sign Up form with post selection (GDS, MTS, Postman, PA/SA, Inspector)
- Google & OTP login buttons

### 🏠 Home
- Personalized welcome banner
- Daily Streak + Course Progress stats
- Continue Learning card with progress bar
- Category grid (Courses, Tests, Notes, PYQ, Planner, Doubts)
- Horizontally scrollable Best Selling Courses
- Daily Challenge quiz banner
- Top Performers / Leaderboard preview

### 📚 Courses Page
- Search bar with live filtering
- Category filter tabs (All / Full Courses / Mock Tests / Notes / PYQ / COMBO)
- 2-column grid layout for all 14+ courses

### 📖 Course Detail
- Hero with title, rating, discount badge
- Buy Now button
- 3 tabs: Overview (What you'll learn), Curriculum (chapter list), Reviews

### 🎥 Video Lesson
- Dark-themed video player mockup with progress bar + controls
- Chapter notes with key points
- Chapter navigation list (done/current/locked)
- Doubt discussion section for each lecture

### 📝 Mock Tests
- Stats: Tests Taken / Avg Score / Rank
- Test cards with difficulty level and duration
- Locked premium tests
- Previous results history

### 🧠 Quiz (Mock + Daily)
- Live countdown timer
- Progress bar per question
- 4-option MCQ with instant correct/wrong feedback
- Navigation: Prev / Next
- End screen with score

### 📄 Notes
- Downloadable PDF notes list
- File size and page count
- Locked premium notes

### 📄 PYQ Papers
- Year-tagged previous year question papers
- PDF + Quiz Mode for each paper

### 🏆 Leaderboard
- Podium (Gold/Silver/Bronze)
- Weekly / Monthly / All Time tabs
- Your rank highlighted in the list

### 💬 Doubt Forum
- Category filter tabs (All / PA/SA / MTS / Postman)
- Post doubts with subject selection
- Answered indicator
- Like and Reply actions

### 📅 Study Planner
- Weekly streak calendar
- Today's task checklist with completion status
- Time-scheduled plan items

### 👤 Profile
- Avatar, name, post, badges
- Stats: Tests / Score / Progress / Points
- Menu: Edit Profile, Certificates, Purchases, Settings, Logout

### 🔔 Notifications
- Unread badge on bell icon
- Notification feed: Daily challenge, new tests, doubt answers, offers

---

## 🎨 Design
- **Colors**: Saffron-red (#E8470A) primary + Navy (#1A2A6C) secondary + Gold accents
- **Fonts**: Baloo 2 (headings, Indian warmth) + Noto Sans (body)
- **Style**: Vibrant, bold, mobile-first — matches Indian edtech sensibility
- **Animations**: Smooth page transitions, splash loader, option feedback

---

## 🛠 Tech Stack
- Pure HTML + CSS + Vanilla JavaScript
- No frameworks, no build tools required
- Google Fonts only (no other CDN dependencies)
- Works offline after first load (static files)

---

## 📦 File Structure
```
epostal-app/
├── index.html          ← Main app (all screens)
├── login.html          ← Onboarding + Login/Signup
├── css/
│   └── main.css        ← All styles
├── js/
│   └── main.js         ← All JavaScript logic
└── README.md
```

---

## ⚡ Future Enhancements
- Firebase auth + Firestore for real data
- Video player (YouTube embed or HLS)
- Push notifications (PWA)
- Offline mode (Service Worker)
- Razorpay payment integration
- Admin dashboard for content management
