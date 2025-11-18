import type { UserProgress, StudyTask } from '../types';

const STORAGE_KEYS = {
  PROGRESS: 'pm_academy_progress',
  STUDY_TASKS: 'pm_academy_study_tasks',
  SETTINGS: 'pm_academy_settings',
} as const;

export const loadUserProgress = (): UserProgress | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading user progress:', error);
    return null;
  }
};

export const saveUserProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving user progress:', error);
  }
};

export const loadStudyTasks = (): StudyTask[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.STUDY_TASKS);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading study tasks:', error);
    return [];
  }
};

export const saveStudyTasks = (tasks: StudyTask[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.STUDY_TASKS, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving study tasks:', error);
  }
};

export const exportData = (): string => {
  const progress = loadUserProgress();
  const tasks = loadStudyTasks();
  return JSON.stringify({ progress, tasks }, null, 2);
};

export const importData = (jsonString: string): boolean => {
  try {
    const data = JSON.parse(jsonString);
    if (data.progress) {
      saveUserProgress(data.progress);
    }
    if (data.tasks) {
      saveStudyTasks(data.tasks);
    }
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};

export const clearAllData = (): void => {
  localStorage.removeItem(STORAGE_KEYS.PROGRESS);
  localStorage.removeItem(STORAGE_KEYS.STUDY_TASKS);
  localStorage.removeItem(STORAGE_KEYS.SETTINGS);
};

