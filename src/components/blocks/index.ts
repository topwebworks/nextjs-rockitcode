'use client';

// Register all block components
import { blockRegistry } from './block-registry';
import { TextBlockWrapped } from './text-block';
import { CodeBlockWrapped } from './code-block';
import { QuizBlockWrapped } from './quiz-block';

// Register core content blocks
blockRegistry.register('text', TextBlockWrapped);
blockRegistry.register('code', CodeBlockWrapped);
blockRegistry.register('quiz', QuizBlockWrapped);

// Export registry and renderer for use throughout the app
export { blockRegistry, BlockRenderer } from './block-registry';

// Export block components for direct use
export { TextBlockWrapped, CodeBlockWrapped, QuizBlockWrapped };

// Export types
export type { BaseBlock, BlockProps } from '@/types/blocks';
