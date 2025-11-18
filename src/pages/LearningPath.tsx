import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ModuleCard } from '../components/dashboard/ModuleCard';
import { modules } from '../data/modules';

export const LearningPath: React.FC = () => {
  const navigate = useNavigate();

  const handleModuleClick = (moduleId: string) => {
    navigate(`/learn/${moduleId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
            Learning Path 📚
          </h1>
          <p className="text-text-secondary">
            Follow a structured path to master product management. Complete modules in order for the best learning experience.
          </p>
        </motion.div>

        <div className="space-y-4">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ModuleCard
                module={module}
                onClick={() => handleModuleClick(module.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

