import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Flame, Target, TrendingUp } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressRing } from '../components/ui/ProgressRing';
import { Badge } from '../components/ui/Badge';
import { DailyPlanCard } from '../components/dashboard/DailyPlanCard';
import { SmartSuggestions } from '../components/dashboard/SmartSuggestions';
import { ModuleCard } from '../components/dashboard/ModuleCard';
import { AddTaskModal } from '../components/planner/AddTaskModal';
import { useUser } from '../context/UserContext';
import { modules } from '../data/modules';
import { generateSmartSuggestions } from '../utils/smartSuggestions';
import { formatDate } from '../utils/streak';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { progress, tasks, addTask, updateTask } = useUser();
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const suggestions = generateSmartSuggestions(progress, modules, tasks);
  const dailyGoal = 5; // lessons per day goal
  const lessonsToday = 0; // Could track this separately

  const handleToggleTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      updateTask(taskId, {
        completed: !task.completed,
        completedDate: !task.completed ? new Date().toISOString() : undefined,
      });
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-text-secondary">
                {formatDate(new Date())} • Ready to continue learning?
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              {progress.currentStreak > 0 && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-orange-50 rounded-lg border border-orange-200">
                  <Flame className="w-5 h-5 text-warning" />
                  <div>
                    <div className="text-xs text-text-secondary">Streak</div>
                    <div className="font-bold text-warning">{progress.currentStreak} days</div>
                  </div>
                </div>
              )}
              <div className="text-center px-4 py-2 bg-indigo-50 rounded-lg border border-indigo-200">
                <div className="text-xs text-text-secondary">Level</div>
                <div className="font-bold text-primary">{progress.level}</div>
              </div>
            </div>
          </div>

          <Card className="gradient-hero text-white border-none">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2">Daily Goal Progress</h2>
                <p className="text-white text-opacity-90 mb-4">
                  Complete {dailyGoal} lessons today to stay on track
                </p>
                <div className="flex items-center space-x-4">
                  <Badge variant="primary" className="bg-white bg-opacity-20 text-white">
                    {lessonsToday}/{dailyGoal} lessons
                  </Badge>
                  <div className="text-sm">
                    {progress.xp} XP • Level {progress.level}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <ProgressRing
                  progress={(lessonsToday / dailyGoal) * 100}
                  size={100}
                  label=""
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Daily Study Plan */}
        <DailyPlanCard
          tasks={tasks}
          onAddTask={() => setIsAddTaskOpen(true)}
          onToggleTask={handleToggleTask}
        />

        {/* Smart Suggestions */}
        {suggestions.length > 0 && (
          <SmartSuggestions suggestions={suggestions} onNavigate={handleNavigate} />
        )}

        {/* Continue Learning */}
        {progress.lessonsCompleted.length > 0 && (
          <Card className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-text-primary">Continue Learning</h2>
              <Button variant="outline" size="sm" onClick={() => navigate('/learn')}>
                View All
              </Button>
            </div>
            <p className="text-text-secondary mb-4">
              Pick up where you left off and continue your learning journey.
            </p>
            <Button onClick={() => navigate('/learn')} className="gradient-hero text-white border-none">
              Start Learning →
            </Button>
          </Card>
        )}

        {/* Learning Path Preview */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-text-primary">Learning Path</h2>
            <Button variant="outline" size="sm" onClick={() => navigate('/learn')}>
              View All
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {modules.slice(0, 2).map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                onClick={() => navigate('/learn')}
              />
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <div className="text-center">
              <Target className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-text-primary">{progress.xp}</div>
              <div className="text-xs text-text-secondary">Total XP</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-success" />
              <div className="text-2xl font-bold text-text-primary">{progress.lessonsCompleted.length}</div>
              <div className="text-xs text-text-secondary">Lessons</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <Flame className="w-8 h-8 mx-auto mb-2 text-warning" />
              <div className="text-2xl font-bold text-text-primary">{progress.currentStreak}</div>
              <div className="text-xs text-text-secondary">Day Streak</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-2xl font-bold text-text-primary">{progress.modulesCompleted.length}</div>
              <div className="text-xs text-text-secondary">Modules</div>
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Add Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsAddTaskOpen(true)}
        className="fixed bottom-24 md:bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 transition-colors z-40"
        aria-label="Add task"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        onAdd={addTask}
      />
    </div>
  );
};

