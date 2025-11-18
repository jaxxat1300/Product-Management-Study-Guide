import type { UserProgress, StudyTask, Module } from '../types';

export interface Suggestion {
  id: string;
  type: 'streak' | 'module' | 'review' | 'task';
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  action?: {
    label: string;
    path: string;
  };
}

export const generateSmartSuggestions = (
  progress: UserProgress,
  modules: Module[],
  tasks: StudyTask[]
): Suggestion[] => {
  const suggestions: Suggestion[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastActive = new Date(progress.lastActiveDate);
  lastActive.setHours(0, 0, 0, 0);
  const daysSinceLastStudy = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

  // Streak suggestions
  if (daysSinceLastStudy > 1 && progress.currentStreak > 0) {
    suggestions.push({
      id: 'streak-warning',
      type: 'streak',
      title: 'Keep your streak alive! 🔥',
      message: `You haven't studied in ${daysSinceLastStudy} days. Complete a lesson today to maintain your ${progress.currentStreak}-day streak!`,
      priority: 'high',
      action: {
        label: 'Start Learning',
        path: '/learn',
      },
    });
  }

  if (progress.currentStreak === 0 && daysSinceLastStudy === 0) {
    suggestions.push({
      id: 'start-streak',
      type: 'streak',
      title: 'Start a new streak!',
      message: 'Complete a lesson today to begin your learning streak.',
      priority: 'medium',
    });
  }

  // Module completion suggestions
  modules.forEach((module) => {
    const completedLessons = module.lessons.filter((lesson) =>
      progress.lessonsCompleted.includes(lesson.id)
    ).length;
    const progressPercent = (completedLessons / module.lessons.length) * 100;

    if (progressPercent > 0 && progressPercent < 100) {
      const remaining = module.lessons.length - completedLessons;
      suggestions.push({
        id: `module-${module.id}`,
        type: 'module',
        title: `Finish ${module.title}`,
        message: `You're ${Math.round(progressPercent)}% complete with ${module.title}. ${remaining} ${remaining === 1 ? 'lesson' : 'lessons'} remaining!`,
        priority: progressPercent > 60 ? 'high' : 'medium',
        action: {
          label: 'Continue',
          path: `/learn#${module.id}`,
        },
      });
    }
  });

  // Pending tasks
  const pendingTasks = tasks.filter((task) => !task.completed);
  const todayTasks = pendingTasks.filter((task) => {
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate.getTime() === today.getTime();
  });

  if (todayTasks.length > 0) {
    suggestions.push({
      id: 'tasks-due',
      type: 'task',
      title: `${todayTasks.length} task${todayTasks.length > 1 ? 's' : ''} due today`,
      message: `You have ${todayTasks.length} study task${todayTasks.length > 1 ? 's' : ''} to complete today.`,
      priority: 'high',
      action: {
        label: 'View Tasks',
        path: '/planner',
      },
    });
  }

  return suggestions.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

