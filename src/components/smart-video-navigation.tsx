import React from 'react'

export interface LessonVideo {
  id: string
  title: string
  url: string
  duration: string
  thumbnail?: string
  description?: string
  // Technology/framework specific
  technologies?: string[]  // ['liquid', 'shopify', 'css']
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  // Learning context
  category?: string       // 'shopify-dev', 'react-mastery', 'ecommerce-build'
  prerequisites?: string[] // Other video IDs that should be watched first
  // Video-specific features
  chapters?: VideoChapter[]
  codeExamples?: boolean
  hasExercise?: boolean
}

export interface VideoChapter {
  title: string
  timestamp: number
  description?: string
  codeSection?: string  // Links to specific code exercise
}

export interface LessonTrack {
  id: string
  title: string
  description: string
  icon: string
  color: string
  videos: LessonVideo[]
  // Track metadata
  totalDuration: string
  estimatedHours: number
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'mixed'
  // Technologies covered
  primaryTech: string
  supportingTech: string[]
}

// Predefined learning tracks
export const learningTracks: LessonTrack[] = [
  {
    id: 'python-fundamentals',
    title: 'Python Fundamentals',
    description: 'Master Python from basics to advanced programming concepts',
    icon: '🐍',
    color: 'yellow',
    totalDuration: '4h 30m',
    estimatedHours: 20,
    skillLevel: 'mixed',
    primaryTech: 'python',
    supportingTech: ['algorithms', 'data-structures', 'debugging'],
    videos: [
      {
        id: 'python-basics',
        title: 'Python Syntax & Variables',
        url: 'https://www.youtube.com/embed/PkZNo7MFNFg?playsinline=1',
        duration: '18:45',
        technologies: ['python'],
        difficulty: 'beginner',
        description: 'Learn Python variables, data types, and basic syntax',
        chapters: [
          { title: 'Python Introduction', timestamp: 0 },
          { title: 'Variables & Types', timestamp: 180 },
          { title: 'Strings & Numbers', timestamp: 420 },
          { title: 'Input & Output', timestamp: 720 }
        ],
        codeExamples: true,
        hasExercise: true
      },
      {
        id: 'python-functions',
        title: 'Functions & Control Flow',
        url: 'https://www.youtube.com/embed/python-functions-demo',
        duration: '25:30',
        technologies: ['python'],
        difficulty: 'beginner',
        prerequisites: ['python-basics'],
        description: 'Master functions, if statements, loops, and program flow',
        chapters: [
          { title: 'Defining Functions', timestamp: 0 },
          { title: 'Parameters & Returns', timestamp: 300 },
          { title: 'If Statements', timestamp: 600 },
          { title: 'Loops & Iteration', timestamp: 900 }
        ],
        codeExamples: true,
        hasExercise: true
      },
      {
        id: 'python-data-structures',
        title: 'Lists, Dictionaries & Data',
        url: 'https://www.youtube.com/embed/python-data-structures',
        duration: '32:15',
        technologies: ['python'],
        difficulty: 'intermediate',
        prerequisites: ['python-basics', 'python-functions'],
        description: 'Work with lists, dictionaries, sets, and complex data structures',
        chapters: [
          { title: 'Lists & Indexing', timestamp: 0 },
          { title: 'List Methods', timestamp: 480 },
          { title: 'Dictionaries', timestamp: 960 },
          { title: 'Sets & Tuples', timestamp: 1440 }
        ],
        codeExamples: true,
        hasExercise: true
      },
      {
        id: 'python-oop',
        title: 'Object-Oriented Programming',
        url: 'https://www.youtube.com/embed/python-oop-classes',
        duration: '28:20',
        technologies: ['python'],
        difficulty: 'intermediate',
        prerequisites: ['python-data-structures'],
        description: 'Learn classes, objects, inheritance, and OOP principles',
        chapters: [
          { title: 'Classes & Objects', timestamp: 0 },
          { title: 'Methods & Attributes', timestamp: 420 },
          { title: 'Inheritance', timestamp: 840 },
          { title: 'Polymorphism', timestamp: 1260 }
        ],
        codeExamples: true,
        hasExercise: true
      },
      {
        id: 'python-projects',
        title: 'Real Python Projects',
        url: 'https://www.youtube.com/embed/python-real-projects',
        duration: '45:40',
        technologies: ['python', 'apis', 'file-handling'],
        difficulty: 'advanced',
        prerequisites: ['python-oop'],
        description: 'Build real-world projects: web scraper, API client, data analyzer',
        chapters: [
          { title: 'Project Planning', timestamp: 0 },
          { title: 'Web Scraping', timestamp: 600 },
          { title: 'API Integration', timestamp: 1200 },
          { title: 'Data Analysis', timestamp: 1800 }
        ],
        codeExamples: true,
        hasExercise: true
      }
    ]
  },

  {
    id: 'shopify-dev',
    title: 'Shopify Development',
    description: 'Master Liquid templating and Shopify theme development',
    icon: '🛍️',
    color: 'green',
    totalDuration: '2h 15m',
    estimatedHours: 8,
    skillLevel: 'intermediate',
    primaryTech: 'liquid',
    supportingTech: ['css', 'javascript', 'shopify-api'],
    videos: [
      {
        id: 'liquid-basics',
        title: 'Liquid Template Language',
        url: 'https://youtube.com/watch?v=shopify-liquid-1',
        duration: '15:30',
        technologies: ['liquid'],
        difficulty: 'beginner',
        description: 'Learn Liquid syntax, variables, and filters',
        chapters: [
          { title: 'What is Liquid?', timestamp: 0 },
          { title: 'Variables & Objects', timestamp: 120 },
          { title: 'Filters', timestamp: 300 },
          { title: 'Control Flow', timestamp: 600 }
        ],
        codeExamples: true,
        hasExercise: true
      },
      {
        id: 'shopify-theme-structure',
        title: 'Theme File Structure',
        url: 'https://youtube.com/watch?v=shopify-theme-2',
        duration: '18:45',
        technologies: ['liquid', 'shopify'],
        difficulty: 'beginner',
        prerequisites: ['liquid-basics'],
        description: 'Understand Shopify theme architecture and file organization'
      },
      {
        id: 'product-pages',
        title: 'Building Product Pages',
        url: 'https://youtube.com/watch?v=shopify-products-3',
        duration: '25:20',
        technologies: ['liquid', 'css', 'javascript'],
        difficulty: 'intermediate',
        prerequisites: ['liquid-basics', 'shopify-theme-structure'],
        description: 'Create dynamic product pages with Liquid and enhance with CSS/JS'
      }
    ]
  },
  
  {
    id: 'react-mastery',
    title: 'React Mastery',
    description: 'From basics to advanced React patterns and best practices',
    icon: '⚛️',
    color: 'blue',
    totalDuration: '3h 45m',
    estimatedHours: 12,
    skillLevel: 'mixed',
    primaryTech: 'react',
    supportingTech: ['javascript', 'typescript', 'css'],
    videos: [
      {
        id: 'react-fundamentals',
        title: 'React Fundamentals',
        url: 'https://youtube.com/watch?v=react-basics-1',
        duration: '22:15',
        technologies: ['react', 'javascript'],
        difficulty: 'beginner',
        description: 'Components, props, state, and event handling'
      },
      {
        id: 'react-hooks',
        title: 'React Hooks Deep Dive',
        url: 'https://youtube.com/watch?v=react-hooks-2',
        duration: '28:30',
        technologies: ['react', 'javascript'],
        difficulty: 'intermediate',
        prerequisites: ['react-fundamentals'],
        description: 'useState, useEffect, custom hooks, and advanced patterns'
      }
    ]
  },

  {
    id: 'web-fundamentals',
    title: 'Web Development Basics',
    description: 'HTML, CSS, and JavaScript foundation for beginners',
    icon: '🌐',
    color: 'purple',
    totalDuration: '4h 20m',
    estimatedHours: 15,
    skillLevel: 'beginner',
    primaryTech: 'html',
    supportingTech: ['css', 'javascript'],
    videos: [
      {
        id: 'html-structure',
        title: 'HTML Document Structure',
        url: 'https://youtube.com/watch?v=html-basics-1',
        duration: '12:45',
        technologies: ['html'],
        difficulty: 'beginner',
        description: 'Learn proper HTML structure and semantic elements'
      },
      {
        id: 'css-styling',
        title: 'CSS Styling Fundamentals',
        url: 'https://youtube.com/watch?v=css-basics-1',
        duration: '18:30',
        technologies: ['css'],
        difficulty: 'beginner',
        prerequisites: ['html-structure'],
        description: 'Selectors, properties, and layout basics'
      }
    ]
  }
]

// Smart navigation component
interface SmartVideoNavigationProps {
  currentTrack?: string
  currentVideo?: string
  onTrackChange?: (trackId: string) => void
  onVideoChange?: (videoId: string) => void
  className?: string
}

export function SmartVideoNavigation({
  currentTrack,
  currentVideo,
  onTrackChange,
  onVideoChange,
  className = ''
}: SmartVideoNavigationProps) {
  const [selectedTrack, setSelectedTrack] = React.useState(currentTrack || learningTracks[0].id)
  
  const activeTrack = learningTracks.find(track => track.id === selectedTrack)
  
  const handleTrackSelect = (trackId: string) => {
    setSelectedTrack(trackId)
    onTrackChange?.(trackId)
  }
  
  const handleVideoSelect = (videoId: string) => {
    onVideoChange?.(videoId)
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Track Selection */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
          🎯 Learning Tracks
        </h3>
        <div className="flex flex-wrap gap-2">
          {learningTracks.map((track) => {
            const isActive = selectedTrack === track.id
            const buttonClasses = isActive 
              ? track.color === 'green' ? 'bg-green-500 text-white' :
                track.color === 'blue' ? 'bg-blue-500 text-white' :
                track.color === 'purple' ? 'bg-purple-500 text-white' :
                'bg-gray-500 text-white'
              : track.color === 'green' ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-100' :
                track.color === 'blue' ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100' :
                track.color === 'purple' ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100' :
                'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            
            return (
              <button
                key={track.id}
                onClick={() => handleTrackSelect(track.id)}
                className={`px-3 py-2 text-xs rounded-full font-medium transition-colors ${buttonClasses}`}
              >
                <span className="mr-1">{track.icon}</span>
                {track.title}
              </button>
            )
          })}
        </div>
      </div>

      {/* Video List for Selected Track */}
      {activeTrack && (
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                {activeTrack.icon} {activeTrack.title}
              </h4>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                {activeTrack.description} • {activeTrack.totalDuration}
              </p>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${
              activeTrack.color === 'green' ? 'bg-green-100 text-green-700' :
              activeTrack.color === 'blue' ? 'bg-blue-100 text-blue-700' :
              activeTrack.color === 'purple' ? 'bg-purple-100 text-purple-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {activeTrack.skillLevel}
            </span>
          </div>

          {/* Video Grid */}
          <div className="space-y-2">
            {activeTrack.videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => handleVideoSelect(video.id)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  currentVideo === video.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h5 className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {video.title}
                      </h5>
                    </div>
                    {video.description && (
                      <p className="mb-2 text-xs text-gray-600 dark:text-gray-400">
                        {video.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>⏱️ {video.duration}</span>
                      {video.technologies && (
                        <span>💻 {video.technologies.join(', ')}</span>
                      )}
                      {video.difficulty && (
                        <span className={`px-1.5 py-0.5 rounded text-xs ${
                          video.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                          video.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {video.difficulty}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 ml-3">
                    {video.hasExercise && (
                      <span className="text-xs text-blue-600">📝 Exercise</span>
                    )}
                    {video.codeExamples && (
                      <span className="text-xs text-purple-600">💻 Code</span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Track Progress */}
          <div className="pt-3 mt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>📊 Progress: 2/{activeTrack.videos.length} completed</span>
              <span>🎯 Est. {activeTrack.estimatedHours}h total</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SmartVideoNavigation
