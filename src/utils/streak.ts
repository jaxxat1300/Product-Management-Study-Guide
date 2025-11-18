export const updateStreak = (lastActiveDate: string | Date): { currentStreak: number; shouldIncrement: boolean } => {
  const lastDate = typeof lastActiveDate === 'string' ? new Date(lastActiveDate) : lastActiveDate;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const lastActive = new Date(lastDate);
  lastActive.setHours(0, 0, 0, 0);
  
  const diffTime = today.getTime() - lastActive.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return { currentStreak: 0, shouldIncrement: false };
  }
  
  if (diffDays === 1) {
    return { currentStreak: 0, shouldIncrement: true };
  }
  
  return { currentStreak: 0, shouldIncrement: false };
};

export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

