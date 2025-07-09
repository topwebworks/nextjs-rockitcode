'use client';

import React from 'react';
import { BlockRenderer } from '@/components/blocks';
import type { BaseBlock, TextBlock, CodeBlock, QuizBlock } from '@/types/blocks';

const sampleBlocks: BaseBlock[] = [
  {
    id: '1',
    type: 'text',
    version: '1.0',
    metadata: {
      created: '2024-01-15T10:00:00Z',
      updated: '2024-01-15T10:00:00Z',
      author: 'system',
      tags: ['intro'],
      analytics: { trackViews: true, trackInteractions: false }
    },
    content: {
      text: '# Welcome to RockitCode\'s New Block System\n\nThis demonstrates our new universal block-based content architecture that replaces MDX with a flexible, interactive learning platform.',
      format: 'markdown',
      style: {
        size: 'base',
        weight: 'normal',
        color: 'text-gray-900',
        alignment: 'left'
      }
    },
    settings: {
      visible: true,
      interactive: false,
      responsive: { mobile: true, tablet: true, desktop: true },
      accessibility: {
        alt: '',
        keyboardNavigation: false,
        screenReaderOptimized: true,
        highContrast: false
      }
    }
  } as TextBlock,
  
  {
    id: '2',
    type: 'code',
    version: '1.0',
    metadata: {
      created: '2024-01-15T10:05:00Z',
      updated: '2024-01-15T10:05:00Z',
      author: 'system',
      tags: ['html', 'example'],
      analytics: { trackViews: true, trackInteractions: true }
    },
    content: {
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello RockitCode!</title>
</head>
<body>
    <h1>Welcome to Web Development!</h1>
    <p>This is your first HTML page.</p>
</body>
</html>`,
      language: 'html',
      filename: 'index.html',
      highlights: [7, 8],
      executable: false
    },
    settings: {
      visible: true,
      interactive: true,
      responsive: { mobile: true, tablet: true, desktop: true },
      accessibility: {
        alt: 'HTML code example showing basic page structure',
        keyboardNavigation: true,
        screenReaderOptimized: true,
        highContrast: false
      }
    }
  } as CodeBlock,

  {
    id: '3',
    type: 'quiz',
    version: '1.0',
    metadata: {
      created: '2024-01-15T10:10:00Z',
      updated: '2024-01-15T10:10:00Z',
      author: 'system',
      tags: ['html', 'quiz'],
      analytics: { trackViews: true, trackInteractions: true, trackCompletion: true }
    },
    content: {
      question: 'What does the <title> tag do in HTML?',
      options: [
        {
          id: 'a',
          text: 'Sets the main heading of the page',
          correct: false,
          explanation: 'The <h1> tag is used for the main heading, not <title>.'
        },
        {
          id: 'b',
          text: 'Defines the text shown in the browser tab',
          correct: true,
          explanation: 'Correct! The <title> tag sets the text that appears in the browser tab and search results.'
        },
        {
          id: 'c',
          text: 'Creates a clickable link',
          correct: false,
          explanation: 'Links are created with the <a> tag, not <title>.'
        },
        {
          id: 'd',
          text: 'Adds a tooltip to elements',
          correct: false,
          explanation: 'Tooltips are created with the title attribute, not the <title> tag.'
        }
      ],
      type: 'multiple-choice',
      explanation: 'The <title> tag is crucial for SEO and user experience as it appears in browser tabs and search engine results.',
      points: 10
    },
    settings: {
      visible: true,
      interactive: true,
      responsive: { mobile: true, tablet: true, desktop: true },
      accessibility: {
        alt: 'Interactive quiz about HTML title tag',
        keyboardNavigation: true,
        screenReaderOptimized: true,
        highContrast: false
      }
    }
  } as QuizBlock,

  {
    id: '4',
    type: 'text',
    version: '1.0',
    metadata: {
      created: '2024-01-15T10:15:00Z',
      updated: '2024-01-15T10:15:00Z',
      author: 'system',
      tags: ['conclusion'],
      analytics: { trackViews: true, trackInteractions: false }
    },
    content: {
      text: '## Next Steps\n\nThis block system will enable:\n\n- **Interactive Learning**: Hands-on coding exercises\n- **Real-time Feedback**: Instant validation and hints\n- **Gamification**: Points, badges, and progress tracking\n- **Accessibility**: Full keyboard navigation and screen reader support\n- **Analytics**: Detailed learning progress insights',
      format: 'markdown',
      style: {
        size: 'base',
        weight: 'normal',
        color: 'text-gray-900',
        alignment: 'left'
      }
    },
    settings: {
      visible: true,
      interactive: false,
      responsive: { mobile: true, tablet: true, desktop: true },
      accessibility: {
        alt: '',
        keyboardNavigation: false,
        screenReaderOptimized: true,
        highContrast: false
      }
    }
  } as TextBlock
];

export default function BlockSystemDemo() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          RockitCode Block System Demo
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Experience our new universal, interactive block-based learning platform
        </p>
      </div>

      <BlockRenderer 
        blocks={sampleBlocks}
        isEditing={false}
      />

      <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800">
        <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-200 mb-3">
          🚀 What's New?
        </h2>
        <ul className="space-y-2 text-blue-800 dark:text-blue-300">
          <li>✅ Universal block system replaces MDX</li>
          <li>✅ Interactive quizzes with real-time feedback</li>
          <li>✅ Executable code blocks (coming soon)</li>
          <li>✅ Mobile-first responsive design</li>
          <li>✅ Full accessibility support</li>
          <li>✅ Built-in analytics tracking</li>
        </ul>
      </div>
    </div>
  );
}
