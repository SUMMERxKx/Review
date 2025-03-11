import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Grip, Pencil, Trash2, Save, X } from 'lucide-react';
import clsx from 'clsx';

interface Question {
  id: string;
  text: string;
  type: 'text' | 'rating' | 'multiple_choice';
  required: boolean;
  options?: string[];
}

const initialQuestions: Question[] = [
  {
    id: '1',
    text: 'How satisfied were you with our service?',
    type: 'rating',
    required: true,
  },
  {
    id: '2',
    text: 'What did you like most about your experience?',
    type: 'text',
    required: false,
  },
  {
    id: '3',
    text: 'How did you hear about us?',
    type: 'multiple_choice',
    required: true,
    options: ['Google', 'Friend', 'Social Media', 'Other'],
  },
];

const Questions = () => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Question | null>(null);

  const handleEdit = (question: Question) => {
    setEditingId(question.id);
    setEditForm(question);
  };

  const handleSave = () => {
    if (editForm) {
      setQuestions(questions.map(q => q.id === editForm.id ? editForm : q));
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleDelete = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Questions</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add Question
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
      >
        <div className="space-y-4">
          {questions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={clsx(
                'flex items-start gap-4 p-4 rounded-lg',
                editingId === question.id ? 'bg-brand-50' : 'bg-gray-50'
              )}
            >
              <div className="flex-shrink-0 cursor-move">
                <Grip className="h-5 w-5 text-gray-400" />
              </div>

              {editingId === question.id ? (
                <div className="flex-1 space-y-4">
                  <input
                    type="text"
                    value={editForm?.text || ''}
                    onChange={e => setEditForm(prev => prev ? { ...prev, text: e.target.value } : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <div className="flex gap-4">
                    <select
                      value={editForm?.type || ''}
                      onChange={e => setEditForm(prev => prev ? { ...prev, type: e.target.value as Question['type'] } : null)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="text">Text</option>
                      <option value="rating">Rating</option>
                      <option value="multiple_choice">Multiple Choice</option>
                    </select>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={editForm?.required || false}
                        onChange={e => setEditForm(prev => prev ? { ...prev, required: e.target.checked } : null)}
                        className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                      />
                      Required
                    </label>
                  </div>
                  {editForm?.type === 'multiple_choice' && (
                    <div className="space-y-2">
                      {editForm.options?.map((option, i) => (
                        <div key={i} className="flex gap-2">
                          <input
                            type="text"
                            value={option}
                            onChange={e => {
                              const newOptions = [...(editForm.options || [])];
                              newOptions[i] = e.target.value;
                              setEditForm(prev => prev ? { ...prev, options: newOptions } : null);
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                          />
                          <button
                            onClick={() => {
                              const newOptions = editForm.options?.filter((_, index) => index !== i);
                              setEditForm(prev => prev ? { ...prev, options: newOptions } : null);
                            }}
                            className="p-2 text-gray-500 hover:text-red-500"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => setEditForm(prev => prev ? {
                          ...prev,
                          options: [...(prev.options || []), '']
                        } : null)}
                        className="text-sm text-brand-600 hover:text-brand-700"
                      >
                        + Add Option
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{question.text}</p>
                      <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                        <span className="capitalize">{question.type.replace('_', ' ')}</span>
                        {question.required && (
                          <span className="text-brand-600">• Required</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(question)}
                        className="p-1.5 text-gray-500 hover:text-brand-600 rounded-lg hover:bg-brand-50"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(question.id)}
                        className="p-1.5 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  {question.type === 'multiple_choice' && question.options && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {question.options.map((option, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                        >
                          {option}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {editingId === question.id && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSave}
                    className="p-1.5 text-brand-600 hover:text-brand-700 rounded-lg hover:bg-brand-50"
                  >
                    <Save className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditForm(null);
                    }}
                    className="p-1.5 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Questions;