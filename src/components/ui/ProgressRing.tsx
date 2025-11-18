import React from 'react';
import { motion } from 'framer-motion';

interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 120,
  strokeWidth = 10,
  label,
  className = '',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#6366f1"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: 'easeOut' }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {label && (
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">{Math.round(progress)}%</div>
            </div>
          )}
        </div>
      </div>
      {label && <div className="mt-2 text-sm text-text-secondary">{label}</div>}
    </div>
  );
};

