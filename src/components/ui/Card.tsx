import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false, onClick }) => {
  const baseStyles = 'bg-card-bg rounded-xl shadow-md p-6';
  const hoverStyles = hover || onClick ? 'cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1' : '';

  if (onClick) {
    return (
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={onClick}
        className={`${baseStyles} ${hoverStyles} ${className}`}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

