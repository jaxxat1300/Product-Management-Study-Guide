import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, CheckSquare, BarChart3, User, Flame } from 'lucide-react';
import { useUser } from '../../context/UserContext';

export const TopNav: React.FC = () => {
  const location = useLocation();
  const { progress } = useUser();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/learn', label: 'Learn', icon: BookOpen },
    { path: '/planner', label: 'Planner', icon: CheckSquare },
    { path: '/profile', label: 'Stats', icon: BarChart3 },
  ];

  return (
    <nav className="bg-card-bg border-b border-border shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🎯</span>
            <span className="text-xl font-heading font-bold text-text-primary">PM Academy</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:text-text-primary hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            {progress.currentStreak > 0 && (
              <div className="hidden sm:flex items-center space-x-1 text-warning">
                <Flame className="w-5 h-5" />
                <span className="font-semibold">{progress.currentStreak}</span>
              </div>
            )}
            <Link
              to="/profile"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <User className="w-5 h-5 text-text-secondary" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

