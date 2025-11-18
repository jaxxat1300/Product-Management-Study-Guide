import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, CheckCircle2, Circle, Calendar, BookOpen, FileText, Target, RotateCcw } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { AddTaskModal } from '../components/planner/AddTaskModal';
import { SmartSuggestions } from '../components/dashboard/SmartSuggestions';
import { useUser } from '../context/UserContext';
import { modules } from '../data/modules';
import { generateSmartSuggestions } from '../utils/smartSuggestions';
import { formatDate } from '../utils/streak';
import type { StudyTask } from '../types';

type FilterType = 'today' | 'week' | 'all';

export const Planner: React.FC = () => {
  const { progress, tasks, addTask, updateTask } = useUser();
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>('today');

  const suggestions = generateSmartSuggestions(progress, modules, tasks);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const filteredTasks = tasks.filter((task) => {
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    if (filter === 'today') {
      return dueDate.getTime() === today.getTime();
    } else if (filter === 'week') {
      return dueDate >= today && dueDate <= nextWeek;
    }
    return true;
  });

  const pendingTasks = filteredTasks.filter((t) => !t.completed);
  const completedTasks = filteredTasks.filter((t) => t.completed);

  const handleToggleTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      updateTask(taskId, {
        completed: !task.completed,
        completedDate: !task.completed ? new Date().toISOString() : undefined,
      });
    }
  };

  const getTaskIcon = (type: StudyTask['type']) => {
    switch (type) {
      case 'lesson':
        return <BookOpen className="w-4 h-4" />;
      case 'reading':
        return <FileText className="w-4 h-4" />;
      case 'practice':
        return <Target className="w-4 h-4" />;
      case 'review':
        return <RotateCcw className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const getTaskTypeColor = (type: StudyTask['type']) => {
    switch (type) {
      case 'lesson':
        return 'primary';
      case 'reading':
        return 'secondary';
      case 'practice':
        return 'success';
      case 'review':
        return 'warning';
      default:
        return 'gray';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-text-primary">
              📚 My Study Plan
            </h1>
            <Button onClick={() => setIsAddTaskOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2 mb-6">
            {(['today', 'week', 'all'] as FilterType[]).map((filterOption) => (
              <Button
                key={filterOption}
                variant={filter === filterOption ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilter(filterOption)}
                className="capitalize"
              >
                {filterOption === 'today' && 'Today'}
                {filterOption === 'week' && 'This Week'}
                {filterOption === 'all' && 'All'}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Smart Suggestions */}
        {suggestions.length > 0 && (
          <div className="mb-6">
            <SmartSuggestions suggestions={suggestions} />
          </div>
        )}

        {/* Pending Tasks */}
        {pendingTasks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              {filter === 'today' && `TODAY - ${formatDate(today)}`}
              {filter === 'week' && 'THIS WEEK'}
              {filter === 'all' && 'ALL TASKS'}
            </h2>
            <div className="space-y-3">
              {pendingTasks.map((task) => {
                const dueDate = new Date(task.dueDate);
                const isOverdue = dueDate < today && !task.completed;
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <Card className={isOverdue ? 'border-warning border-2' : ''}>
                      <div className="flex items-start space-x-3">
                        <button
                          onClick={() => handleToggleTask(task.id)}
                          className="mt-1 focus:outline-none"
                          aria-label="Mark complete"
                        >
                          <Circle className="w-5 h-5 text-text-secondary hover:text-primary" />
                        </button>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-base font-semibold text-text-primary">
                              {task.title}
                            </h3>
                            <Badge
                              variant={getTaskTypeColor(task.type) as any}
                              size="sm"
                              className="ml-2"
                            >
                              <span className="mr-1">{getTaskIcon(task.type)}</span>
                              {task.type.charAt(0).toUpperCase() + task.type.slice(1)}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-text-secondary">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Due: {formatDate(dueDate)}
                            </div>
                          </div>
                          {task.notes && (
                            <p className="text-sm text-text-secondary mt-2">{task.notes}</p>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-text-primary mb-4">Completed</h2>
            <div className="space-y-3">
              {completedTasks.map((task) => (
                <Card key={task.id} className="bg-gray-50">
                  <div className="flex items-start space-x-3">
                    <button
                      onClick={() => handleToggleTask(task.id)}
                      className="mt-1 focus:outline-none"
                      aria-label="Mark incomplete"
                    >
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </button>
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-text-secondary line-through">
                        {task.title}
                      </h3>
                      {task.completedDate && (
                        <p className="text-xs text-text-secondary mt-1">
                          Completed {formatDate(new Date(task.completedDate))}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <Card className="text-center py-12">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-text-secondary" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">No tasks found</h3>
            <p className="text-text-secondary mb-6">
              {filter === 'today'
                ? "You don't have any tasks scheduled for today."
                : filter === 'week'
                ? "You don't have any tasks scheduled for this week."
                : "You don't have any tasks yet."}
            </p>
            <Button onClick={() => setIsAddTaskOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Task
            </Button>
          </Card>
        )}
      </div>

      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        onAdd={addTask}
      />
    </div>
  );
};

