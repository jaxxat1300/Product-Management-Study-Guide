import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'secondary' | 'gray';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const variants = {
    primary: 'bg-indigo-100 text-indigo-800',
    success: 'bg-emerald-100 text-emerald-800',
    warning: 'bg-amber-100 text-amber-800',
    secondary: 'bg-purple-100 text-purple-800',
    gray: 'bg-gray-100 text-gray-800',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};

