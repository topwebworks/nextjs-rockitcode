'use client';

import React from 'react';
import { createBlockComponent } from './block-registry';
import type { TextBlock } from '@/types/blocks';
import { clsx } from 'clsx';

interface TextBlockComponentProps {
  block: TextBlock;
  isEditing?: boolean;
}

function TextBlockComponent({ block, isEditing }: TextBlockComponentProps) {
  const { content } = block;
  
  const baseClasses = clsx(
    'prose prose-gray max-w-none',
    {
      'prose-sm': content.style.size === 'sm',
      'prose-lg': content.style.size === 'lg',
      'prose-xl': content.style.size === 'xl',
      'prose-2xl': content.style.size === '2xl',
    },
    {
      'text-left': content.style.alignment === 'left',
      'text-center': content.style.alignment === 'center',
      'text-right': content.style.alignment === 'right',
      'text-justify': content.style.alignment === 'justify',
    }
  );

  if (content.format === 'markdown') {
    // For now, render as HTML - in production, use a markdown parser
    return (
      <div 
        className={baseClasses}
        dangerouslySetInnerHTML={{ __html: content.text }}
      />
    );
  }

  if (content.format === 'html') {
    return (
      <div 
        className={baseClasses}
        dangerouslySetInnerHTML={{ __html: content.text }}
      />
    );
  }

  // Plain text
  return (
    <div className={baseClasses}>
      <p>{content.text}</p>
    </div>
  );
}

export const TextBlockWrapped = createBlockComponent(TextBlockComponent);
