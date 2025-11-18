# Product Management Study Guide 🎯

A modern, gamified web application for learning product management concepts. Built with React, TypeScript, and Tailwind CSS.

## Features

### 📚 Learning System
- **6 Learning Modules** covering PM fundamentals, user research, strategy, prioritization, roadmapping, and metrics
- **Interactive Lessons** with multiple slide types:
  - Concept introductions
  - Multiple choice quizzes
  - Scenario-based challenges
  - Interactive exercises
- **Progress Tracking** with completion status and module progress

### 📅 Study Planner
- **Daily Study Plan** card showing today's tasks
- **Task Management** with create, complete, and delete functionality
- **Task Types**: Lesson, Reading, Practice, Review, Other
- **Smart Suggestions** based on your progress and streaks
- **Filters**: Today, This Week, All tasks

### 🎮 Gamification
- **XP System**: Earn XP for completing lessons
- **Streak Tracking**: Maintain daily learning streaks
- **Achievements**: Unlock badges as you progress
- **Level System**: Level up every 500 XP

### 💾 Data Management
- **Local Storage**: All data stored locally in your browser
- **Export/Import**: Backup and restore your progress
- **Offline-First**: Works completely offline
- **Optional Sign-In**: Future support for cloud sync

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── dashboard/      # Dashboard-specific components
│   ├── lesson/         # Lesson viewer components
│   ├── navigation/     # Navigation components
│   └── planner/        # Study planner components
├── context/            # React context providers
├── data/               # Static data (modules, achievements)
├── pages/              # Page components
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── App.tsx             # Main app component with routing
```

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Framer Motion** - Animations
- **Zustand** - State management (available but using Context API)
- **Lucide React** - Icons
- **Vite** - Build tool

## Features in Detail

### Daily Study Plan
The home dashboard features a prominent Daily Study Plan card that shows:
- All tasks due today
- Completion status with checkboxes
- Quick add task button
- Progress indicator (X/Y tasks completed)

### Smart Suggestions
The app provides intelligent recommendations:
- Streak maintenance reminders
- Module completion suggestions
- Task prioritization
- Review reminders based on spaced repetition

### Lesson Types
Lessons support multiple interactive formats:
- **Introduction**: Welcome slides with illustrations
- **Concept**: Key points and explanations
- **Quiz**: Multiple choice questions with feedback
- **Scenario**: Real-world PM situations
- **Completion**: Lesson completion screen with XP rewards

## Data Storage

All user data is stored in browser `localStorage`:
- `pm_academy_progress` - User progress, XP, streaks, achievements
- `pm_academy_study_tasks` - All study tasks
- `pm_academy_settings` - User preferences

### Export/Import
Users can export their data as JSON and import it on another device or browser. This allows for data backup and migration.

## Customization

### Colors
The app uses a custom color palette defined in `tailwind.config.js`:
- Primary: Indigo (#6366f1)
- Secondary: Purple (#8b5cf6)
- Success: Green (#10b981)
- Warning: Amber (#f59e0b)

### Adding Content
To add new modules or lessons, edit `src/data/modules.ts` following the existing structure.

## Future Enhancements

- [ ] Firebase authentication for cloud sync
- [ ] Social features (leaderboards, sharing)
- [ ] Spaced repetition algorithm for reviews
- [ ] Note-taking feature
- [ ] Mobile app (React Native)
- [ ] More lesson types (drag & drop, fill-in-blank)
- [ ] Audio/video content support

## License

MIT

## Contributing

This is a personal project, but suggestions and feedback are welcome!
