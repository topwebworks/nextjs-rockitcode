// Universal Block System Architecture
// This replaces MDX with a flexible, composable block system

export interface BaseBlock {
  id: string;
  type: string;
  version: string;
  metadata: BlockMetadata;
  content: unknown;
  settings: BlockSettings;
}

export interface BlockMetadata {
  created: string;
  updated: string;
  author: string;
  tags: string[];
  analytics: AnalyticsConfig;
}

export interface BlockSettings {
  visible: boolean;
  interactive: boolean;
  responsive: ResponsiveSettings;
  accessibility: AccessibilitySettings;
}

export interface ResponsiveSettings {
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
  customBreakpoints?: Record<string, boolean>;
}

export interface AccessibilitySettings {
  alt: string;
  ariaLabel?: string;
  keyboardNavigation: boolean;
  screenReaderOptimized: boolean;
  highContrast: boolean;
}

export interface AnalyticsConfig {
  trackViews: boolean;
  trackInteractions: boolean;
  trackCompletion?: boolean;
  customEvents?: string[];
}

// Content Blocks
export interface TextBlock extends BaseBlock {
  type: 'text';
  content: {
    text: string;
    format: 'plain' | 'markdown' | 'html';
    style: TextStyle;
  };
}

export interface CodeBlock extends BaseBlock {
  type: 'code';
  content: {
    code: string;
    language: string;
    filename?: string;
    highlights?: number[];
    executable: boolean;
    solution?: string;
  };
}

export interface QuizBlock extends BaseBlock {
  type: 'quiz';
  content: {
    question: string;
    options: QuizOption[];
    type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'code-challenge';
    explanation: string;
    points: number;
  };
}

export interface VideoBlock extends BaseBlock {
  type: 'video';
  content: {
    url: string;
    title: string;
    duration: number;
    captions?: string;
    interactive: boolean;
    chapters?: VideoChapter[];
  };
}

// Interactive Blocks
export interface CodeEditorBlock extends BaseBlock {
  type: 'code-editor';
  content: {
    initialCode: string;
    language: string;
    tests?: TestCase[];
    solution: string;
    hints: string[];
    allowedFiles: string[];
  };
}

export interface ProjectBlock extends BaseBlock {
  type: 'project';
  content: {
    title: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime: number;
    requirements: string[];
    startingCode: ProjectFile[];
    solution: ProjectFile[];
    checkpoints: ProjectCheckpoint[];
  };
}

// Supporting Types
export interface TextStyle {
  size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  weight: 'normal' | 'medium' | 'semibold' | 'bold';
  color: string;
  alignment: 'left' | 'center' | 'right' | 'justify';
}

export interface QuizOption {
  id: string;
  text: string;
  correct: boolean;
  explanation?: string;
}

export interface VideoChapter {
  time: number;
  title: string;
  description?: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  description: string;
}

export interface ProjectFile {
  name: string;
  content: string;
  type: string;
}

export interface ProjectCheckpoint {
  id: string;
  title: string;
  description: string;
  tests: TestCase[];
}

// Block Registry System
export interface BlockRegistry {
  register<T extends BaseBlock>(type: string, component: React.ComponentType<BlockProps<T>>): void;
  unregister(type: string): void;
  get<T extends BaseBlock>(type: string): React.ComponentType<BlockProps<T>> | null;
  getAll(): Record<string, React.ComponentType<BlockProps<any>>>;
}

export interface BlockProps<T extends BaseBlock> {
  block: T;
  isEditing?: boolean;
  onUpdate?: (block: T) => void;
  onDelete?: (id: string) => void;
}
