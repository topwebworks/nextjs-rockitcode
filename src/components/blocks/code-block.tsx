'use client';

import React, { useState } from 'react';
import { createBlockComponent } from './block-registry';
import type { CodeBlock } from '@/types/blocks';
import { clsx } from 'clsx';

interface CodeBlockComponentProps {
  block: CodeBlock;
  isEditing?: boolean;
}

function CodeBlockComponent({ block, isEditing }: CodeBlockComponentProps) {
  const { content } = block;
  const [isExecuting, setIsExecuting] = useState(false);
  const [output, setOutput] = useState<string>('');

  const handleExecute = async () => {
    if (!content.executable) return;
    
    setIsExecuting(true);
    // Simulate code execution
    setTimeout(() => {
      setOutput('Code executed successfully!');
      setIsExecuting(false);
    }, 1000);
  };

  return (
    <div className="relative">
      {/* Header with filename and language */}
      {(content.filename || content.language) && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border border-gray-200 rounded-t-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            {content.filename && (
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {content.filename}
              </span>
            )}
            <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-200 rounded dark:text-gray-400 dark:bg-gray-700">
              {content.language}
            </span>
          </div>
          {content.executable && (
            <button
              onClick={handleExecute}
              disabled={isExecuting}
              className={clsx(
                'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                'bg-green-600 text-white hover:bg-green-700',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              {isExecuting ? 'Running...' : 'Run'}
            </button>
          )}
        </div>
      )}

      {/* Code content */}
      <div className="relative">
        <pre className={clsx(
          'overflow-x-auto p-4 text-sm',
          'bg-gray-900 text-gray-100',
          content.filename || content.language ? 'rounded-b-lg' : 'rounded-lg'
        )}>
          <code className={`language-${content.language}`}>
            {content.code}
          </code>
        </pre>

        {/* Copy button */}
        <button
          className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-200 transition-colors"
          onClick={() => navigator.clipboard.writeText(content.code)}
          title="Copy code"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
          </svg>
        </button>
      </div>

      {/* Output */}
      {output && (
        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md dark:bg-green-900/20 dark:border-green-800">
          <p className="text-sm text-green-800 dark:text-green-200">{output}</p>
        </div>
      )}
    </div>
  );
}

export const CodeBlockWrapped = createBlockComponent(CodeBlockComponent);
