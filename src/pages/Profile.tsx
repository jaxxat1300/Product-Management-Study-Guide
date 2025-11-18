import React from 'react';
import { motion } from 'framer-motion';
import { Download, Upload, Trash2, Flame, Trophy, Target, TrendingUp, Award } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useUser } from '../context/UserContext';
import { exportData, importData, clearAllData } from '../utils/localStorage';
import { getXPForNextLevel, getXPProgress } from '../utils/calculateXP';
import { achievements } from '../data/achievements';

export const Profile: React.FC = () => {
  const { progress } = useUser();

  const xpProgress = getXPProgress(progress.xp);
  const xpForNextLevel = getXPForNextLevel(progress.xp);

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pm-academy-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          if (importData(content)) {
            alert('Data imported successfully! Please refresh the page.');
            window.location.reload();
          } else {
            alert('Failed to import data. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone!')) {
      clearAllData();
      alert('All data cleared. Refreshing...');
      window.location.reload();
    }
  };

  const unlockedAchievements = achievements.filter((a) =>
    progress.achievements.some((ua) => ua.id === a.id)
  );

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-2">
            Your Stats 📊
          </h1>
          <p className="text-text-secondary">Track your learning progress and achievements</p>
        </motion.div>

        {/* Level & XP */}
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-1">Level {progress.level}</h2>
              <p className="text-text-secondary text-sm">
                {progress.xp} XP • {xpForNextLevel} XP to next level
              </p>
            </div>
            <div className="text-4xl">🎯</div>
          </div>
          <ProgressBar progress={xpProgress} showLabel={false} />
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <div className="text-center">
              <Flame className="w-8 h-8 mx-auto mb-2 text-warning" />
              <div className="text-2xl font-bold text-text-primary">{progress.currentStreak}</div>
              <div className="text-xs text-text-secondary">Current Streak</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-warning" />
              <div className="text-2xl font-bold text-text-primary">{progress.longestStreak}</div>
              <div className="text-xs text-text-secondary">Longest Streak</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <Target className="w-8 h-8 mx-auto mb-2 text-success" />
              <div className="text-2xl font-bold text-text-primary">{progress.lessonsCompleted.length}</div>
              <div className="text-xs text-text-secondary">Lessons Done</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-text-primary">{progress.modulesCompleted.length}</div>
              <div className="text-xs text-text-secondary">Modules Done</div>
            </div>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-warning" />
            Achievements
          </h2>
          {unlockedAchievements.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {unlockedAchievements.map((achievement) => (
                <div key={achievement.id} className="text-center p-4 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
                  <div className="text-4xl mb-2">{achievement.icon}</div>
                  <div className="font-semibold text-text-primary text-sm">{achievement.title}</div>
                  <div className="text-xs text-text-secondary mt-1">{achievement.description}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-text-secondary text-center py-8">
              Complete lessons to unlock achievements! 🏆
            </p>
          )}
        </Card>

        {/* Data Management */}
        <Card className="mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Data Management</h2>
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={handleExport}
              className="w-full md:w-auto"
            >
              <Download className="w-4 h-4 mr-2" />
              Export My Data
            </Button>
            <Button
              variant="outline"
              onClick={handleImport}
              className="w-full md:w-auto ml-0 md:ml-3"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import Data
            </Button>
            <Button
              variant="outline"
              onClick={handleClearData}
              className="w-full md:w-auto ml-0 md:ml-3 text-red-600 border-red-300 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All Data
            </Button>
          </div>
          <p className="text-sm text-text-secondary mt-4">
            Your data is stored locally in your browser. Export your data regularly to back it up.
          </p>
        </Card>

        {/* Sign In (Placeholder) */}
        <Card>
          <h2 className="text-xl font-semibold text-text-primary mb-4">Account</h2>
          {progress.isSignedIn ? (
            <div>
              <p className="text-text-secondary mb-4">
                Signed in as: {progress.email || 'User'}
              </p>
              <Button variant="outline" size="sm">
                Sign Out
              </Button>
            </div>
          ) : (
            <div>
              <p className="text-text-secondary mb-4">
                Sign in to sync your progress across devices and never lose your data.
              </p>
              <Button variant="primary" size="sm">
                Sign In
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

