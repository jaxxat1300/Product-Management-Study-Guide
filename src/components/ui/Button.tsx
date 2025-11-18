import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationStart' | 'onAnimationEnd'> {
  variant?: 'primary' | 'secondary' | 'success' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-indigo-700 focus:ring-primary shadow-md hover:shadow-lg',
    secondary: 'bg-secondary text-white hover:bg-purple-700 focus:ring-secondary shadow-md hover:shadow-lg',
    success: 'bg-success text-white hover:bg-emerald-600 focus:ring-success shadow-md hover:shadow-lg',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
    ghost: 'text-text-primary hover:bg-gray-100 focus:ring-gray-300',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
};

