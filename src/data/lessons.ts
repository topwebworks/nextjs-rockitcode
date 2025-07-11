// RockitCode Lessons Data - Coding Education Focus

export interface CodeSection {
  id: string;
  title: string;
  description: string;
  language: string;
  initialCode: string;
  expectedOutput?: string;
  videoTimestamp?: number; // When to show this code in relation to video
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  course: string;
  module: string;
  video?: {
    poster: {
      src: string;
      alt: string;
    };
    url: string;
  };
  codeSections?: CodeSection[]; // Interactive coding exercises
  blocks: any[]; // Will be populated with actual lesson content blocks
}

export const lessons: Lesson[] = [
  // HTML & CSS Fundamentals Course
  {
    id: 'html-basics',
    title: 'HTML Fundamentals',
    description: 'Learn the building blocks of web development with HTML structure, elements, and semantic markup.',
    duration: '25 min',
    difficulty: 'beginner',
    course: 'html-css',
    module: 'html-fundamentals',
    video: {
      poster: {
        src: '/images/lessons/html-css/html-structure-diagram.svg',
        alt: 'HTML Structure Diagram'
      },
      url: '/videos/lessons/html-basics.mp4' // Local video content
    },
    codeSections: [
      {
        id: 'basic-structure',
        title: 'Basic HTML Structure',
        description: 'Create your first HTML document with the essential elements every web page needs.',
        language: 'html',
        videoTimestamp: 45,
        initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <!-- Add your content here -->
    
</body>
</html>`,
        expectedOutput: `A basic HTML page structure with head and body sections. 
The page title will appear in the browser tab.`
      },
      {
        id: 'headings-paragraphs',
        title: 'Headings and Paragraphs',
        description: 'Add headings and paragraphs to create readable content structure.',
        language: 'html',
        videoTimestamp: 120,
        initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Learning HTML</title>
</head>
<body>
    <h1>Welcome to My Website!</h1>
    <p>This is my very first web page. I'm learning HTML!</p>
    
    <h2>About Me</h2>
    <p>I'm a student learning web development with RockitCode.</p>
    
    <!-- Try adding more headings and paragraphs below -->
    
</body>
</html>`,
        expectedOutput: `A webpage with:
- Main heading "Welcome to My Website!"
- Introduction paragraph
- Subheading "About Me"
- About paragraph`
      }
    ],
    blocks: [] // To be populated with actual lesson blocks
  },
  {
    id: 'css-styling',
    title: 'CSS Styling Essentials',
    description: 'Master CSS selectors, properties, and styling techniques to make your web pages beautiful.',
    duration: '30 min',
    difficulty: 'beginner',
    course: 'html-css',
    module: 'css-fundamentals',
    video: {
      poster: {
        src: '/images/lessons/html-css/css-styling-basics.svg',
        alt: 'CSS Styling Basics'
      },
      url: '/videos/lessons/css-styling.mp4'
    },
    blocks: []
  },
  {
    id: 'responsive-design',
    title: 'Responsive Web Design',
    description: 'Create websites that work perfectly on all devices using modern CSS techniques.',
    duration: '35 min',
    difficulty: 'intermediate',
    course: 'html-css',
    module: 'responsive-design',
    video: {
      poster: {
        src: '/images/lessons/html-css/responsive-design.svg',
        alt: 'Responsive Design Concepts'
      },
      url: '/videos/lessons/responsive-design.mp4'
    },
    blocks: []
  },

  // JavaScript Fundamentals Course
  {
    id: 'js-variables',
    title: 'JavaScript Variables and Data Types',
    description: 'Understand how to store and manipulate data with JavaScript variables and data types.',
    duration: '20 min',
    difficulty: 'beginner',
    course: 'javascript',
    module: 'js-fundamentals',
    video: {
      poster: {
        src: '/images/lessons/javascript/variables-datatypes.svg',
        alt: 'JavaScript Variables'
      },
      url: '/videos/lessons/js-variables.mp4'
    },
    blocks: []
  },
  {
    id: 'js-functions',
    title: 'Functions and Scope',
    description: 'Learn to write reusable code with functions and understand variable scope in JavaScript.',
    duration: '28 min',
    difficulty: 'beginner',
    course: 'javascript',
    module: 'js-fundamentals',
    video: {
      poster: {
        src: '/images/lessons/javascript/functions-scope.svg',
        alt: 'JavaScript Functions'
      },
      url: '/videos/lessons/js-functions.mp4'
    },
    blocks: []
  },
  {
    id: 'dom-manipulation',
    title: 'DOM Manipulation',
    description: 'Make your web pages interactive by learning to manipulate HTML elements with JavaScript.',
    duration: '32 min',
    difficulty: 'intermediate',
    course: 'javascript',
    module: 'dom-interaction',
    video: {
      poster: {
        src: '/images/lessons/javascript/dom-manipulation.svg',
        alt: 'DOM Manipulation'
      },
      url: '/videos/lessons/dom-manipulation.mp4'
    },
    blocks: []
  },

  // React Fundamentals Course
  {
    id: 'react-components',
    title: 'React Components',
    description: 'Build your first React components and understand the component-based architecture.',
    duration: '25 min',
    difficulty: 'intermediate',
    course: 'react',
    module: 'react-fundamentals',
    video: {
      poster: {
        src: '/images/lessons/react/components-intro.svg',
        alt: 'React Components'
      },
      url: '/videos/lessons/react-components.mp4'
    },
    blocks: []
  },
  {
    id: 'react-state',
    title: 'State Management with useState',
    description: 'Learn to manage component state and create dynamic, interactive user interfaces.',
    duration: '30 min',
    difficulty: 'intermediate',
    course: 'react',
    module: 'react-fundamentals',
    video: {
      poster: {
        src: '/images/lessons/react/state-management.svg',
        alt: 'React State Management'
      },
      url: '/videos/lessons/react-state.mp4'
    },
    blocks: []
  },
  {
    id: 'react-effects',
    title: 'Side Effects with useEffect',
    description: 'Handle side effects, API calls, and lifecycle events in React functional components.',
    duration: '35 min',
    difficulty: 'intermediate',
    course: 'react',
    module: 'react-hooks',
    video: {
      poster: {
        src: '/images/lessons/react/use-effect.svg',
        alt: 'React useEffect Hook'
      },
      url: '/videos/lessons/react-effects.mp4'
    },
    blocks: []
  },

  // Python Fundamentals Course
  {
    id: 'python-basics',
    title: 'Python Syntax and Basics',
    description: 'Get started with Python programming language fundamentals and syntax.',
    duration: '22 min',
    difficulty: 'beginner',
    course: 'python',
    module: 'python-fundamentals',
    video: {
      poster: {
        src: '/images/lessons/python/python-basics.svg',
        alt: 'Python Basics'
      },
      url: '/videos/lessons/python-basics.mp4'
    },
    blocks: []
  },
  {
    id: 'python-data-structures',
    title: 'Lists, Dictionaries, and Data Structures',
    description: 'Master Python data structures for organizing and manipulating information effectively.',
    duration: '28 min',
    difficulty: 'beginner',
    course: 'python',
    module: 'python-fundamentals',
    video: {
      poster: {
        src: '/images/lessons/python/data-structures.svg',
        alt: 'Python Data Structures'
      },
      url: '/videos/lessons/python-data-structures.mp4'
    },
    blocks: []
  }
];

// Helper functions for lesson management
export function getLessonsByCourse(courseId: string): Lesson[] {
  return lessons.filter(lesson => lesson.course === courseId);
}

export function getLessonsByModule(courseId: string, moduleId: string): Lesson[] {
  return lessons.filter(lesson => lesson.course === courseId && lesson.module === moduleId);
}

export function getLessonById(lessonId: string): Lesson | undefined {
  return lessons.find(lesson => lesson.id === lessonId);
}

export function getLessonsByDifficulty(difficulty: Lesson['difficulty']): Lesson[] {
  return lessons.filter(lesson => lesson.difficulty === difficulty);
}

export function getLesson(id: string): Lesson | undefined {
  return lessons.find(lesson => lesson.id === id);
}

export async function getLessonContent(id: string): Promise<string | null> {
  // For now, return a placeholder - this would load MDX content in a real implementation
  const lesson = getLesson(id);
  if (!lesson) return null;
  
  return `# ${lesson.title}\n\n${lesson.description}\n\nThis lesson content will be loaded from MDX files.`;
}

// Module structure for backward compatibility
export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export function getModules(): Module[] {
  // Group lessons by course for module compatibility
  const courses = ['html-css', 'javascript', 'python'];
  
  return courses.map(courseId => {
    const courseLessons = lessons.filter(lesson => lesson.course === courseId);
    return {
      id: courseId,
      title: courseId.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' & '),
      description: `Learn ${courseId.replace('-', ' and ')} fundamentals`,
      lessons: courseLessons
    };
  }).filter(module => module.lessons.length > 0);
}
