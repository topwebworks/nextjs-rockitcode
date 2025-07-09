'use client';

import React, { useState } from 'react';
import { createBlockComponent } from './block-registry';
import type { QuizBlock } from '@/types/blocks';
import { clsx } from 'clsx';

interface QuizBlockComponentProps {
  block: QuizBlock;
  isEditing?: boolean;
}

function QuizBlockComponent({ block, isEditing }: QuizBlockComponentProps) {
  const { content } = block;
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleOptionSelect = (optionId: string) => {
    if (submitted) return;
    
    if (content.type === 'multiple-choice') {
      setSelectedOptions([optionId]);
    } else {
      // For future multi-select support
      setSelectedOptions(prev => 
        prev.includes(optionId) 
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setShowExplanation(true);
  };

  const isCorrect = () => {
    const correctOptions = content.options.filter(opt => opt.correct).map(opt => opt.id);
    return selectedOptions.length === correctOptions.length && 
           selectedOptions.every(id => correctOptions.includes(id));
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      {/* Question */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {content.question}
        </h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200">
            {content.type.replace('-', ' ')}
          </span>
          <span>{content.points} points</span>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {content.options.map((option) => {
          const isSelected = selectedOptions.includes(option.id);
          const isCorrectOption = option.correct;
          const showResult = submitted;
          
          return (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              disabled={submitted}
              className={clsx(
                'w-full text-left p-4 border rounded-lg transition-all',
                'hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
                {
                  // Default state
                  'border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700': !isSelected && !showResult,
                  // Selected state (before submission)
                  'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20': isSelected && !showResult,
                  // Correct answer (after submission)
                  'border-green-500 bg-green-50 dark:border-green-400 dark:bg-green-900/20': showResult && isCorrectOption,
                  // Wrong answer (after submission)
                  'border-red-500 bg-red-50 dark:border-red-400 dark:bg-red-900/20': showResult && isSelected && !isCorrectOption,
                  // Disabled state
                  'cursor-not-allowed opacity-75': submitted,
                }
              )}
            >
              <div className="flex items-start space-x-3">
                <div className={clsx(
                  'flex-shrink-0 w-5 h-5 rounded-full border-2 mt-0.5',
                  {
                    'border-gray-300': !isSelected && !showResult,
                    'border-blue-500 bg-blue-500': isSelected && !showResult,
                    'border-green-500 bg-green-500': showResult && isCorrectOption,
                    'border-red-500 bg-red-500': showResult && isSelected && !isCorrectOption,
                  }
                )}>
                  {(isSelected || (showResult && isCorrectOption)) && (
                    <svg className="w-3 h-3 text-white m-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {option.text}
                  </p>
                  {showResult && option.explanation && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {option.explanation}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Submit button */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={selectedOptions.length === 0}
          className={clsx(
            'w-full py-3 px-4 rounded-lg font-medium transition-colors',
            'bg-blue-600 text-white hover:bg-blue-700',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          Submit Answer
        </button>
      )}

      {/* Results */}
      {submitted && (
        <div className={clsx(
          'p-4 rounded-lg',
          isCorrect() 
            ? 'bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800'
            : 'bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800'
        )}>
          <div className="flex items-center space-x-2 mb-2">
            {isCorrect() ? (
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            <p className={clsx(
              'font-semibold',
              isCorrect() ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
            )}>
              {isCorrect() ? 'Correct!' : 'Incorrect'}
            </p>
          </div>
          
          {content.explanation && (
            <p className={clsx(
              'text-sm',
              isCorrect() ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
            )}>
              {content.explanation}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export const QuizBlockWrapped = createBlockComponent(QuizBlockComponent);
