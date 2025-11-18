import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, CheckSquare, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/learn', label: 'Learn', icon: BookOpen },
    { path: '/planner', label: 'Planner', icon: CheckSquare },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card-bg border-t border-border shadow-lg z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full ${
                isActive ? 'text-primary' : 'text-text-secondary'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

