export const calculateLevel = (xp: number): number => {
  return Math.floor(xp / 500) + 1;
};

export const getXPForNextLevel = (xp: number): number => {
  const currentLevel = calculateLevel(xp);
  return currentLevel * 500 - xp;
};

export const getXPProgress = (xp: number): number => {
  const currentLevel = calculateLevel(xp);
  const xpForCurrentLevel = (currentLevel - 1) * 500;
  const xpForNextLevel = currentLevel * 500;
  const progressXP = xp - xpForCurrentLevel;
  const totalNeeded = xpForNextLevel - xpForCurrentLevel;
  return (progressXP / totalNeeded) * 100;
};

