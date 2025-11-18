import React from 'react';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { Lock } from 'lucide-react';
import type { Module } from '../../types';
import { useUser } from '../../context/UserContext';

interface ModuleCardProps {
  module: Module;
  onClick: () => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, onClick }) => {
  const { progress } = useUser();
  const completedLessons = module.lessons.filter((lesson) =>
    progress.lessonsCompleted.includes(lesson.id)
  ).length;
  const progressPercent = (completedLessons / module.lessons.length) * 100;
  const isLocked = module.requiredModule && !progress.modulesCompleted.includes(module.requiredModule);

  return (
    <Card hover={!isLocked} onClick={isLocked ? undefined : onClick} className="mb-4">
      <div className="flex items-start">
        <div className="text-4xl mr-4">{module.icon}</div>
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-semibold text-text-primary mr-2">{module.title}</h3>
            {isLocked && <Lock className="w-4 h-4 text-text-secondary" />}
          </div>
          <p className="text-sm text-text-secondary mb-3">{module.description}</p>
          <ProgressBar
            progress={progressPercent}
            showLabel={false}
            color={progressPercent === 100 ? 'success' : 'primary'}
          />
          <p className="text-xs text-text-secondary mt-2">
            {completedLessons}/{module.lessons.length} lessons completed
          </p>
        </div>
      </div>
    </Card>
  );
};

