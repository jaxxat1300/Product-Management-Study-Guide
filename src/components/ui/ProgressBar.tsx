import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number; // 0-100
  label?: string;
  showLabel?: boolean;
  className?: string;
  color?: 'primary' | 'success' | 'secondary';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  showLabel = true,
  className = '',
  color = 'primary',
}) => {
  const colors = {
    primary: 'bg-primary',
    success: 'bg-success',
    secondary: 'bg-secondary',
  };

  return (
    <div className={className}>
      {showLabel && label && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">{label}</span>
          <span className="text-sm text-text-secondary">{Math.round(progress)}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full ${colors[color]} rounded-full`}
        />
      </div>
    </div>
  );
};

