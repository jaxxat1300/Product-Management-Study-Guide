import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, X, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { modules } from '../../data/modules';
import { useUser } from '../../context/UserContext';
import type { Slide } from '../../types';

export const LessonViewer: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { progress, addXP, completeLesson } = useUser();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

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

  const currentSlide = lesson.slides[currentSlideIndex];
  const isFirstSlide = currentSlideIndex === 0;
  const isLastSlide = currentSlideIndex === lesson.slides.length - 1;
  const module = modules.find((m) => m.id === lesson.moduleId);

  const handleNext = () => {
    if (isLastSlide) {
      // Lesson complete
      if (!progress.lessonsCompleted.includes(lesson.id)) {
        completeLesson(lesson.id);
        addXP(lesson.xpReward);
        navigate(`/lesson/${lessonId}/results`);
      } else {
        navigate(`/learn/${module?.id}`);
      }
    } else {
      setCurrentSlideIndex(currentSlideIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(null);
    }
  };

  const handlePrevious = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(null);
    }
  };

  const handleAnswerSelect = (answerId: string) => {
    if (showResult) return;
    setSelectedAnswer(answerId);
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswer || !currentSlide.content.correctAnswer) return;

    const correct = selectedAnswer === currentSlide.content.correctAnswer.toString();
    setIsCorrect(correct);
    setShowResult(true);
  };

  const renderSlide = (slide: Slide) => {
    const { content } = slide;

    switch (slide.type) {
      case 'introduction':
        return (
          <div className="text-center max-w-3xl mx-auto">
            {content.illustration && (
              <div className="text-6xl mb-6">{content.illustration}</div>
            )}
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-6">
              {content.title}
            </h1>
            {content.text && (
              <p className="text-lg text-text-secondary leading-relaxed mb-8">
                {content.text}
              </p>
            )}
          </div>
        );

      case 'concept':
        return (
          <div className="max-w-3xl mx-auto">
            {content.title && (
              <h2 className="text-2xl md:text-3xl font-heading font-semibold text-text-primary mb-6">
                {content.title}
              </h2>
            )}
            {content.text && (
              <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                {content.text}
              </p>
            )}
            {content.keyPoints && (
              <div className="space-y-3">
                {content.keyPoints.map((point, index) => (
                  <Card key={index} className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
                    <p className="text-text-primary">{point}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case 'quiz':
        return (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-heading font-semibold text-text-primary mb-6">
              {content.question || 'Quick Check! 🤔'}
            </h2>
            {content.options && (
              <div className="space-y-3 mb-6">
                {content.options.map((option) => {
                  const isSelected = selectedAnswer === option.id;
                  const showAsCorrect =
                    showResult && option.id === content.correctAnswer?.toString();
                  const showAsIncorrect =
                    showResult && isSelected && option.id !== content.correctAnswer?.toString();

                  return (
                    <motion.div
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswerSelect(option.id)}
                      className={`cursor-pointer transition-all ${
                        isSelected && !showResult
                          ? 'ring-2 ring-primary'
                          : showAsCorrect
                          ? 'ring-2 ring-success bg-emerald-50'
                          : showAsIncorrect
                          ? 'ring-2 ring-red-500 bg-red-50'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <Card>
                        <div className="flex items-center">
                          <div
                            className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                              isSelected
                                ? showAsCorrect
                                  ? 'border-success bg-success text-white'
                                  : showAsIncorrect
                                  ? 'border-red-500 bg-red-500 text-white'
                                  : 'border-primary bg-primary text-white'
                                : 'border-border'
                            }`}
                          >
                            {showAsCorrect && <Check className="w-4 h-4" />}
                            {showAsIncorrect && <X className="w-4 h-4" />}
                          </div>
                          <p
                            className={`text-text-primary ${
                              showAsIncorrect ? 'line-through opacity-50' : ''
                            }`}
                          >
                            {option.text}
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
            {!showResult && selectedAnswer && (
              <Button onClick={handleCheckAnswer} className="w-full md:w-auto">
                Check Answer
              </Button>
            )}
            {showResult && content.explanation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <Card className={isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}>
                  <div className="flex items-start">
                    {isCorrect ? (
                      <Check className="w-5 h-5 text-success mr-3 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-warning mr-3 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <p className={`font-semibold ${isCorrect ? 'text-success' : 'text-warning'} mb-2`}>
                        {isCorrect ? 'Correct!' : 'Not quite right'}
                      </p>
                      <p className="text-text-primary">{content.explanation}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        );

      case 'scenario':
        return (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-heading font-semibold text-text-primary mb-6">
              {content.title || 'Real-World Scenario 🌍'}
            </h2>
            {content.scenario && (
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 mb-6">
                <p className="text-text-primary leading-relaxed">{content.scenario}</p>
              </Card>
            )}
            {content.options && (
              <div className="space-y-3 mb-6">
                {content.options.map((option) => {
                  const isSelected = selectedAnswer === option.id;
                  const showAsCorrect =
                    showResult && option.id === content.correctAnswer?.toString();
                  const showAsIncorrect =
                    showResult && isSelected && option.id !== content.correctAnswer?.toString();

                  return (
                    <motion.div
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswerSelect(option.id)}
                      className={`cursor-pointer transition-all ${
                        isSelected && !showResult
                          ? 'ring-2 ring-primary'
                          : showAsCorrect
                          ? 'ring-2 ring-success bg-emerald-50'
                          : showAsIncorrect
                          ? 'ring-2 ring-red-500 bg-red-50'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <Card>
                        <div className="flex items-center">
                          <div
                            className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                              isSelected
                                ? showAsCorrect
                                  ? 'border-success bg-success text-white'
                                  : showAsIncorrect
                                  ? 'border-red-500 bg-red-500 text-white'
                                  : 'border-primary bg-primary text-white'
                                : 'border-border'
                            }`}
                          >
                            {showAsCorrect && <Check className="w-4 h-4" />}
                            {showAsIncorrect && <X className="w-4 h-4" />}
                          </div>
                          <p
                            className={`text-text-primary ${
                              showAsIncorrect ? 'line-through opacity-50' : ''
                            }`}
                          >
                            {option.text}
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
            {!showResult && selectedAnswer && (
              <Button onClick={handleCheckAnswer} className="w-full md:w-auto">
                Check Answer
              </Button>
            )}
            {showResult && content.explanation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <Card className={isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}>
                  <p className="text-text-primary">{content.explanation}</p>
                </Card>
              </motion.div>
            )}
          </div>
        );

      case 'completion':
        return (
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              className="text-6xl mb-6"
            >
              🎉
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-6">
              {content.title || 'Lesson Complete!'}
            </h1>
            {content.keyPoints && (
              <div className="space-y-2 mb-8">
                {content.keyPoints.map((point, index) => (
                  <p key={index} className="text-lg text-text-secondary">
                    {point}
                  </p>
                ))}
              </div>
            )}
            {lesson.xpReward && (
              <Card className="bg-gradient-to-r from-success to-emerald-400 text-white border-none mb-6">
                <p className="text-2xl font-bold">+{lesson.xpReward} XP earned!</p>
              </Card>
            )}
          </div>
        );

      default:
        return <div>Unknown slide type</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate(`/learn/${module?.id}`)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="text-sm text-text-secondary">
            Slide {currentSlideIndex + 1} of {lesson.slides.length}
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 mb-8">
          {lesson.slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlideIndex
                  ? 'bg-primary w-8'
                  : index < currentSlideIndex
                  ? 'bg-success w-4'
                  : 'bg-border w-2'
              }`}
            />
          ))}
        </div>

        {/* Slide Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            {renderSlide(currentSlide)}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={isFirstSlide}
            className={isFirstSlide ? 'opacity-50 cursor-not-allowed' : ''}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={
              (currentSlide.type === 'quiz' || currentSlide.type === 'scenario') &&
              !showResult
            }
            className={
              (currentSlide.type === 'quiz' || currentSlide.type === 'scenario') &&
              !showResult
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }
          >
            {isLastSlide ? 'Finish' : 'Continue'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

