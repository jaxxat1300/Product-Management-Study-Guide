import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { modules } from '../data/modules';
import { useUser } from '../context/UserContext';

export const LessonResults: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { progress } = useUser();

  const lesson = modules
    .flatMap((m) => m.lessons)
    .find((l) => l.id === lessonId);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">Lesson not found</h1>
          <Button onClick={() => navigate('/learn')}>Back to Learning Path</Button>
        </div>
      </div>
    );
  }

  const module = modules.find((m) => m.id === lesson.moduleId);
  const completedLessons = module?.lessons.filter((l) => progress.lessonsCompleted.includes(l.id)).length || 0;
  const moduleProgress = module ? (completedLessons / module.lessons.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 10 }}
            className="inline-block mb-6"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-success flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
            Lesson Complete! 🎉
          </h1>

          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 mb-6">
            <div className="flex items-center justify-center space-x-6">
              <div>
                <div className="text-3xl font-bold text-primary">+{lesson.xpReward}</div>
                <div className="text-sm text-text-secondary">XP Earned</div>
              </div>
              {progress.currentStreak > 0 && (
                <>
                  <div className="w-px h-12 bg-border" />
                  <div>
                    <div className="flex items-center justify-center space-x-1">
                      <span className="text-2xl">🔥</span>
                      <span className="text-3xl font-bold text-warning">{progress.currentStreak}</span>
                    </div>
                    <div className="text-sm text-text-secondary">Day Streak</div>
                  </div>
                </>
              )}
            </div>
          </Card>

          {module && (
            <Card className="mb-8">
              <h2 className="text-lg font-semibold text-text-primary mb-4">
                Module Progress: {module.title}
              </h2>
              <ProgressBar
                progress={moduleProgress}
                showLabel={false}
                color={moduleProgress === 100 ? 'success' : 'primary'}
              />
              <p className="text-sm text-text-secondary mt-2 text-center">
                {completedLessons}/{module.lessons.length} lessons completed
              </p>
            </Card>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => navigate(`/learn/${module?.id}`)}
              className="flex items-center justify-center"
            >
              Back to Module
            </Button>
            <Button
              onClick={() => {
                // Find next lesson
                if (module) {
                  const currentIndex = module.lessons.findIndex((l) => l.id === lesson.id);
                  const nextLesson = module.lessons[currentIndex + 1];
                  if (nextLesson) {
                    navigate(`/lesson/${nextLesson.id}`);
                  } else {
                    navigate('/learn');
                  }
                } else {
                  navigate('/learn');
                }
              }}
              className="flex items-center justify-center"
            >
              Continue Learning
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center justify-center"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

