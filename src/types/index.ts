export interface UserProgress {
  userId: string;
  xp: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lessonsCompleted: string[];
  modulesCompleted: string[];
  achievements: Achievement[];
  lastActiveDate: string;
  studyTasks: StudyTask[];
  isSignedIn: boolean;
  email?: string;
}

export interface StudyTask {
  id: string;
  title: string;
  type: 'lesson' | 'reading' | 'practice' | 'review' | 'other';
  completed: boolean;
  dueDate: string;
  createdDate: string;
  completedDate?: string;
  notes?: string;
  linkedLessonId?: string;
}

export interface Module {
  id: string;
  title: string;
  icon: string;
  description: string;
  lessons: Lesson[];
  requiredModule?: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  type: 'concept' | 'quiz' | 'scenario' | 'interactive';
  slides: Slide[];
  xpReward: number;
}

export type SlideType = 'introduction' | 'concept' | 'quiz' | 'scenario' | 'exercise' | 'completion';

export interface Slide {
  id: string;
  type: SlideType;
  content: SlideContent;
}

export interface SlideContent {
  title?: string;
  text?: string;
  illustration?: string;
  keyPoints?: string[];
  question?: string;
  options?: QuizOption[];
  correctAnswer?: number | string;
  explanation?: string;
  scenario?: string;
  items?: DragDropItem[];
  blanks?: Blank[];
  answers?: string[];
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface DragDropItem {
  id: string;
  text: string;
}

export interface Blank {
  id: string;
  correctAnswer: string | string[];
  placeholder?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedDate: string;
}

