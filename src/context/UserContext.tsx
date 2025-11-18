import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { UserProgress, StudyTask } from '../types';
import { loadUserProgress, saveUserProgress, loadStudyTasks, saveStudyTasks } from '../utils/localStorage';
import { updateStreak } from '../utils/streak';
import { calculateLevel } from '../utils/calculateXP';

interface UserContextType {
  progress: UserProgress;
  tasks: StudyTask[];
  updateProgress: (updates: Partial<UserProgress>) => void;
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  completeModule: (moduleId: string) => void;
  addTask: (task: Omit<StudyTask, 'id' | 'createdDate'>) => void;
  updateTask: (taskId: string, updates: Partial<StudyTask>) => void;
  deleteTask: (taskId: string) => void;
  unlockAchievement: (achievementId: string) => void;
}

const defaultProgress: UserProgress = {
  userId: `user-${Date.now()}`,
  xp: 0,
  level: 1,
  currentStreak: 0,
  longestStreak: 0,
  lessonsCompleted: [],
  modulesCompleted: [],
  achievements: [],
  lastActiveDate: new Date().toISOString(),
  studyTasks: [],
  isSignedIn: false,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const loadedProgress = loadUserProgress();
    const loadedTasks = loadStudyTasks();

    if (loadedProgress) {
      setProgress(loadedProgress);
    }

    if (loadedTasks.length > 0) {
      setTasks(loadedTasks);
    } else {
      // Create sample tasks
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);

      const sampleTasks: StudyTask[] = [
        {
          id: 'task-1',
          title: "Complete 'What is Product Management?' lesson",
          type: 'lesson',
          completed: false,
          dueDate: today.toISOString(),
          createdDate: today.toISOString(),
          linkedLessonId: 'pm-fundamentals-1',
        },
        {
          id: 'task-2',
          title: 'Review RICE Framework notes',
          type: 'review',
          completed: false,
          dueDate: today.toISOString(),
          createdDate: today.toISOString(),
        },
        {
          id: 'task-3',
          title: 'Read article on product metrics',
          type: 'reading',
          completed: true,
          dueDate: today.toISOString(),
          createdDate: today.toISOString(),
          completedDate: today.toISOString(),
        },
        {
          id: 'task-4',
          title: 'Finish Prioritization Module',
          type: 'lesson',
          completed: false,
          dueDate: nextWeek.toISOString(),
          createdDate: today.toISOString(),
        },
      ];

      setTasks(sampleTasks);
      saveStudyTasks(sampleTasks);
    }

    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      saveUserProgress(progress);
    }
  }, [progress, initialized]);

  useEffect(() => {
    if (initialized) {
      saveStudyTasks(tasks);
    }
  }, [tasks, initialized]);

  useEffect(() => {
    if (initialized) {
      // Update streak on load
      const { shouldIncrement } = updateStreak(progress.lastActiveDate);
      const today = new Date().toISOString();

      if (shouldIncrement) {
        const newStreak = progress.currentStreak + 1;
        setProgress((prev) => ({
          ...prev,
          currentStreak: newStreak,
          longestStreak: Math.max(prev.longestStreak, newStreak),
          lastActiveDate: today,
        }));
      }
    }
  }, [initialized]);

  const updateProgress = (updates: Partial<UserProgress>) => {
    setProgress((prev) => {
      const updated = { ...prev, ...updates };
      saveUserProgress(updated);
      return updated;
    });
  };

  const addXP = (amount: number) => {
    setProgress((prev) => {
      const newXP = prev.xp + amount;
      const newLevel = calculateLevel(newXP);
      const updated = {
        ...prev,
        xp: newXP,
        level: newLevel,
        lastActiveDate: new Date().toISOString(),
      };
      saveUserProgress(updated);
      return updated;
    });
  };

  const completeLesson = (lessonId: string) => {
    if (!progress.lessonsCompleted.includes(lessonId)) {
      setProgress((prev) => {
        const updated = {
          ...prev,
          lessonsCompleted: [...prev.lessonsCompleted, lessonId],
          lastActiveDate: new Date().toISOString(),
        };
        saveUserProgress(updated);
        return updated;
      });
    }
  };

  const completeModule = (moduleId: string) => {
    if (!progress.modulesCompleted.includes(moduleId)) {
      setProgress((prev) => {
        const updated = {
          ...prev,
          modulesCompleted: [...prev.modulesCompleted, moduleId],
        };
        saveUserProgress(updated);
        return updated;
      });
    }
  };

  const addTask = (taskData: Omit<StudyTask, 'id' | 'createdDate'>) => {
    const newTask: StudyTask = {
      ...taskData,
      id: `task-${Date.now()}`,
      createdDate: new Date().toISOString(),
    };
    setTasks((prev) => {
      const updated = [...prev, newTask];
      saveStudyTasks(updated);
      return updated;
    });
  };

  const updateTask = (taskId: string, updates: Partial<StudyTask>) => {
    setTasks((prev) => {
      const updated = prev.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      );
      saveStudyTasks(updated);
      return updated;
    });
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => {
      const updated = prev.filter((task) => task.id !== taskId);
      saveStudyTasks(updated);
      return updated;
    });
  };

  const unlockAchievement = (achievementId: string) => {
    const alreadyUnlocked = progress.achievements.some((a) => a.id === achievementId);
    if (!alreadyUnlocked) {
      setProgress((prev) => {
        const updated = {
          ...prev,
          achievements: [
            ...prev.achievements,
            {
              id: achievementId,
              title: '',
              description: '',
              icon: '',
              unlockedDate: new Date().toISOString(),
            },
          ],
        };
        saveUserProgress(updated);
        return updated;
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        progress,
        tasks,
        updateProgress,
        addXP,
        completeLesson,
        completeModule,
        addTask,
        updateTask,
        deleteTask,
        unlockAchievement,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

