import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { modules } from '../data/modules';
import { useUser } from '../context/UserContext';

export const ModuleDetail: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { progress } = useUser();

  const module = modules.find((m) => m.id === moduleId);

  if (!module) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">Module not found</h1>
          <Button onClick={() => navigate('/learn')}>Back to Learning Path</Button>
        </div>
      </div>
    );
  }

  const completedLessons = module.lessons.filter((lesson) =>
    progress.lessonsCompleted.includes(lesson.id)
  ).length;
  const progressPercent = (completedLessons / module.lessons.length) * 100;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/learn')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Learning Path
        </Button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start mb-6">
            <div className="text-5xl mr-4">{module.icon}</div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-2">
                {module.title}
              </h1>
              <p className="text-text-secondary text-lg">{module.description}</p>
            </div>
          </div>

          <Card>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-text-primary">Module Progress</span>
                <span className="text-sm text-text-secondary">
                  {completedLessons}/{module.lessons.length} lessons
                </span>
              </div>
              <ProgressBar
                progress={progressPercent}
                showLabel={false}
                color={progressPercent === 100 ? 'success' : 'primary'}
              />
            </div>
          </Card>
        </motion.div>

        <div className="space-y-4">
          {module.lessons.map((lesson, index) => {
            const isCompleted = progress.lessonsCompleted.includes(lesson.id);
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover onClick={() => navigate(`/lesson/${lesson.id}`)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <div className="w-12 h-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-4">
                        <span className="text-xl">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-text-primary mb-1">
                          {lesson.title}
                        </h3>
                        <p className="text-sm text-text-secondary">
                          {lesson.slides.length} slides • {lesson.xpReward} XP
                        </p>
                      </div>
                    </div>
                    {isCompleted && (
                      <div className="text-success font-semibold mr-4">✓</div>
                    )}
                    <Button
                      variant={isCompleted ? 'outline' : 'primary'}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/lesson/${lesson.id}`);
                      }}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {isCompleted ? 'Review' : 'Start'}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

