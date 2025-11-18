import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { CheckCircle2, Circle, Plus } from 'lucide-react';
import type { StudyTask } from '../../types';
import { formatDate } from '../../utils/streak';

interface DailyPlanCardProps {
  tasks: StudyTask[];
  onAddTask: () => void;
  onToggleTask: (taskId: string) => void;
}

export const DailyPlanCard: React.FC<DailyPlanCardProps> = ({ tasks, onAddTask, onToggleTask }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayTasks = tasks.filter((task) => {
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate.getTime() === today.getTime();
  });

  const completedCount = todayTasks.filter((t) => t.completed).length;
  const totalCount = todayTasks.length;

  return (
    <Card className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-text-primary">
          📅 Today's Study Plan - {formatDate(today)}
        </h2>
      </div>

      {todayTasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-text-secondary mb-4">No tasks scheduled for today</p>
          <Button onClick={onAddTask} size="sm">
            <Plus className="w-4 h-4 mr-2 inline" />
            Add Study Task
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-4">
            {todayTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-start space-x-3 p-3 rounded-lg transition-colors ${
                  task.completed ? 'bg-gray-50' : 'hover:bg-gray-50'
                }`}
              >
                <button
                  onClick={() => onToggleTask(task.id)}
                  className="mt-0.5 focus:outline-none"
                  aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  ) : (
                    <Circle className="w-5 h-5 text-text-secondary hover:text-primary" />
                  )}
                </button>
                <div className="flex-1">
                  <p
                    className={`text-sm ${
                      task.completed ? 'line-through text-text-secondary' : 'text-text-primary'
                    }`}
                  >
                    {task.title}
                  </p>
                  {task.type && (
                    <span className="text-xs text-text-secondary mt-1 inline-block">
                      Type: {task.type.charAt(0).toUpperCase() + task.type.slice(1)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <p className="text-sm text-text-secondary">
              {completedCount}/{totalCount} tasks completed today
            </p>
            <Button onClick={onAddTask} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2 inline" />
              Add Task
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};

