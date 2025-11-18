import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import type { StudyTask } from '../../types';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: Omit<StudyTask, 'id' | 'createdDate'>) => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<StudyTask['type']>('lesson');
  const [dueDate, setDueDate] = useState<string>('today');
  const [customDate, setCustomDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const today = new Date();
    let dueDateISO: string;

    switch (dueDate) {
      case 'today':
        dueDateISO = today.toISOString();
        break;
      case 'tomorrow':
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        dueDateISO = tomorrow.toISOString();
        break;
      case 'week':
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);
        dueDateISO = nextWeek.toISOString();
        break;
      case 'custom':
        dueDateISO = customDate ? new Date(customDate).toISOString() : today.toISOString();
        break;
      default:
        dueDateISO = today.toISOString();
    }

    onAdd({
      title: title.trim(),
      type,
      completed: false,
      dueDate: dueDateISO,
      notes: notes.trim() || undefined,
    });

    // Reset form
    setTitle('');
    setType('lesson');
    setDueDate('today');
    setCustomDate('');
    setNotes('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-card-bg rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-2xl font-semibold text-text-primary">✨ Add Study Task</h2>
                <button
                  onClick={onClose}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Task name
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Complete 'User Research' lesson"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-3">
                    Type
                  </label>
                  <div className="space-y-2">
                    {(['lesson', 'reading', 'practice', 'review', 'other'] as const).map((taskType) => (
                      <label key={taskType} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value={taskType}
                          checked={type === taskType}
                          onChange={(e) => setType(e.target.value as StudyTask['type'])}
                          className="text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-text-primary capitalize">
                          {taskType === 'lesson' && 'Complete a lesson'}
                          {taskType === 'reading' && 'Reading/Article'}
                          {taskType === 'practice' && 'Practice exercise'}
                          {taskType === 'review' && 'Review previous content'}
                          {taskType === 'other' && 'Other'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-3">
                    Due Date
                  </label>
                  <div className="space-y-2">
                    {(['today', 'tomorrow', 'week', 'custom'] as const).map((dateOption) => (
                      <label key={dateOption} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="dueDate"
                          value={dateOption}
                          checked={dueDate === dateOption}
                          onChange={(e) => setDueDate(e.target.value as typeof dueDate)}
                          className="text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-text-primary capitalize">
                          {dateOption === 'today' && 'Today'}
                          {dateOption === 'tomorrow' && 'Tomorrow'}
                          {dateOption === 'week' && 'This Week'}
                          {dateOption === 'custom' && 'Custom'}
                        </span>
                      </label>
                    ))}
                    {dueDate === 'custom' && (
                      <input
                        type="date"
                        value={customDate}
                        onChange={(e) => setCustomDate(e.target.value)}
                        className="mt-2 w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Notes (optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any additional notes..."
                    rows={3}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" className="flex-1">
                    Add Task
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

