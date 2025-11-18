import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Lightbulb, TrendingUp, Flame, Target } from 'lucide-react';
import type { Suggestion } from '../../utils/smartSuggestions';
import { motion } from 'framer-motion';

interface SmartSuggestionsProps {
  suggestions: Suggestion[];
  onNavigate?: (path: string) => void;
  className?: string;
}

export const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({
  suggestions,
  onNavigate,
  className = '',
}) => {
  if (suggestions.length === 0) return null;

  const iconMap = {
    streak: Flame,
    module: Target,
    review: TrendingUp,
    task: Lightbulb,
  };

  return (
    <Card className={`mb-6 ${className}`}>
      <div className="flex items-center mb-4">
        <Lightbulb className="w-5 h-5 mr-2 text-warning" />
        <h2 className="text-xl font-semibold text-text-primary">Smart Suggestions 💡</h2>
      </div>
      <div className="space-y-4">
        {suggestions.slice(0, 3).map((suggestion, index) => {
          const Icon = iconMap[suggestion.type] || Lightbulb;
          return (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100"
            >
              <div className="flex items-start">
                <Icon className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary mb-1">{suggestion.title}</h3>
                  <p className="text-sm text-text-secondary mb-3">{suggestion.message}</p>
                  {suggestion.action && onNavigate && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onNavigate(suggestion.action!.path)}
                    >
                      {suggestion.action.label}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
};

