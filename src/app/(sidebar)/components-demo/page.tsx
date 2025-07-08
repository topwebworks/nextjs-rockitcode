"use client"

import { PageSection } from '@/components/page-section'
import { 
  CodeDisplay, 
  LANGUAGE_CONFIGS,
  YouTubeEmbed,
  ProgressTracker,
  createProgressItem,
  ExercisePlayground,
  EXERCISE_TEMPLATES,
  LessonContent,
  createLessonSection,
  SECTION_TEMPLATES,
  AuthButton,
  AuthStatus
} from '@/components/rockitcode'
import { SidebarLayoutContent } from '@/components/sidebar-layout'
import { 
  Breadcrumb, 
  BreadcrumbHome, 
  Breadcrumbs, 
  BreadcrumbSeparator 
} from '@/components/breadcrumbs'

export default function ComponentsDemo() {
  // Sample progress items - now created in client component
  const progressItems = [
    createProgressItem('intro', 'Introduction to Components', 'lesson', { estimatedMinutes: 15, isRequired: true }),
    createProgressItem('code-display', 'Code Display Component', 'lesson', { estimatedMinutes: 10, isRequired: true }),
    createProgressItem('youtube-embed', 'YouTube Integration', 'lesson', { estimatedMinutes: 12, isRequired: true }),
    createProgressItem('exercise-1', 'Interactive Code Exercise', 'exercise', { estimatedMinutes: 25, isRequired: true }),
    createProgressItem('progress-tracking', 'Progress Tracking', 'lesson', { estimatedMinutes: 8, isRequired: false }),
    createProgressItem('lesson-structure', 'Lesson Content Structure', 'lesson', { estimatedMinutes: 15, isRequired: true }),
    createProgressItem('final-quiz', 'Component Mastery Quiz', 'quiz', { estimatedMinutes: 10, isRequired: true })
  ]

  // Sample code examples
  const reactExample = `import React, { useState, useEffect } from 'react'
import { CodeDisplay } from '@/components/rockitcode'

// Example of a modern React component with hooks
function InteractiveCounter() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (count > 10) {
      setMessage('You\\'re on fire! 🔥')
    } else if (count > 5) {
      setMessage('Great job! Keep going! 🚀')
    } else {
      setMessage('Click the button to count up!')
    }
  }, [count])

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1)
  }

  const handleReset = () => {
    setCount(0)
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Interactive Counter</h2>
      <div className="text-4xl font-bold text-blue-600 mb-4">
        {count}
      </div>
      <p className="text-gray-600 mb-4">{message}</p>
      <div className="space-x-2">
        <button 
          onClick={handleIncrement}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Increment
        </button>
        <button 
          onClick={handleReset}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default InteractiveCounter`

  const pythonExample = `# Advanced Python: Working with Classes and Decorators
import functools
import time
from typing import List, Optional

class DataProcessor:
    """A class for processing and analyzing data efficiently."""
    
    def __init__(self, data: List[int]):
        self.data = data
        self._cache = {}
    
    @staticmethod
    def timer(func):
        """Decorator to measure execution time."""
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            start_time = time.time()
            result = func(*args, **kwargs)
            end_time = time.time()
            print(f"{func.__name__} executed in {end_time - start_time:.4f} seconds")
            return result
        return wrapper
    
    @timer
    def calculate_statistics(self) -> dict:
        """Calculate comprehensive statistics for the dataset."""
        if 'stats' in self._cache:
            return self._cache['stats']
        
        if not self.data:
            return {'error': 'No data provided'}
        
        stats = {
            'count': len(self.data),
            'sum': sum(self.data),
            'mean': sum(self.data) / len(self.data),
            'min': min(self.data),
            'max': max(self.data),
            'range': max(self.data) - min(self.data)
        }
        
        # Calculate median
        sorted_data = sorted(self.data)
        n = len(sorted_data)
        if n % 2 == 0:
            stats['median'] = (sorted_data[n//2 - 1] + sorted_data[n//2]) / 2
        else:
            stats['median'] = sorted_data[n//2]
        
        self._cache['stats'] = stats
        return stats
    
    def filter_outliers(self, threshold: float = 2.0) -> List[int]:
        """Remove outliers using standard deviation method."""
        stats = self.calculate_statistics()
        mean = stats['mean']
        std_dev = (sum((x - mean) ** 2 for x in self.data) / len(self.data)) ** 0.5
        
        return [x for x in self.data if abs(x - mean) <= threshold * std_dev]

# Example usage
if __name__ == "__main__":
    # Sample dataset with some outliers
    sample_data = [1, 2, 3, 4, 5, 100, 6, 7, 8, 9, 10, 200]
    
    processor = DataProcessor(sample_data)
    print("Original data:", sample_data)
    
    stats = processor.calculate_statistics()
    print("\\nStatistics:", stats)
    
    filtered_data = processor.filter_outliers()
    print("\\nFiltered data (outliers removed):", filtered_data)
    
    # Process the filtered data
    filtered_processor = DataProcessor(filtered_data)
    filtered_stats = filtered_processor.calculate_statistics()
    print("\\nFiltered statistics:", filtered_stats)`

  // Sample lesson sections
  const lessonSections = [
    SECTION_TEMPLATES.introduction(
      <div className="space-y-4">
        <p>Welcome to the RockitCode component library! This demonstration showcases all the modular, scalable components that power our learning platform.</p>
        <p>Each component is designed with the following principles:</p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li><strong>Modularity:</strong> Components are self-contained and reusable</li>
          <li><strong>Type Safety:</strong> Full TypeScript support with comprehensive types</li>
          <li><strong>Scalability:</strong> Efficient performance even with large datasets</li>
          <li><strong>Template Compatibility:</strong> Seamlessly integrates with the base template</li>
        </ul>
      </div>
    ),
    
    createLessonSection(
      'code-display-demo',
      'Code Display Component',
      <div className="space-y-4">
        <p>The CodeDisplay component provides syntax highlighting, copy functionality, and line highlighting:</p>
        <CodeDisplay
          code={`// Simple JavaScript example
function greetUser(name) {
  console.log(\`Hello, \${name}! Welcome to RockitCode.\`)
}

greetUser('Developer')`}
          language="javascript"
          title="Basic JavaScript Function"
          showLineNumbers={true}
          highlightLines={[2, 3]}
          allowCopy={true}
        />
        <p>Features include syntax highlighting, line numbers, copy functionality, and the ability to highlight specific lines for emphasis.</p>
      </div>,
      'code',
      { estimatedMinutes: 10 }
    ),

    createLessonSection(
      'youtube-integration',
      'YouTube Video Integration',
      <div className="space-y-4">
        <p>Seamlessly embed YouTube videos with progress tracking and custom controls:</p>
        <YouTubeEmbed
          videoId="dQw4w9WgXcQ"
          title="Sample Video Integration"
          description="This demonstrates how videos are embedded in lessons with tracking capabilities"
          showControls={true}
          aspectRatio="16:9"
          onProgress={(progress) => console.log('Video progress:', progress)}
        />
        <p>The YouTube component supports progress tracking, custom thumbnails, and responsive design.</p>
      </div>,
      'video',
      { estimatedMinutes: 12 }
    ),

    createLessonSection(
      'advanced-code-examples',
      'Advanced Code Examples',
      <div className="space-y-6">
        <p>Here are more complex code examples showcasing different programming languages:</p>
        
        <div>
          <h4 className="text-lg font-semibold mb-3">React Component with Hooks</h4>
          <CodeDisplay
            code={reactExample}
            language="javascript"
            title="Interactive React Counter Component"
            showLineNumbers={true}
            allowCopy={true}
            maxHeight="400px"
          />
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Python Data Processing Class</h4>
          <CodeDisplay
            code={pythonExample}
            language="python"
            title="Advanced Python: Classes and Decorators"
            showLineNumbers={true}
            allowCopy={true}
            maxHeight="500px"
          />
        </div>
      </div>,
      'code',
      { estimatedMinutes: 20 }
    ),

    createLessonSection(
      'authentication-demo',
      'Authentication Components',
      <div className="space-y-4">
        <p>Integrate authentication seamlessly with our ready-to-use components:</p>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold mb-2">AuthButton Component</h4>
            <CodeDisplay
              code={`import { AuthButton } from '@/components/rockitcode'

function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Welcome Back!</h1>
      <AuthButton
        provider="google"
        onLoginSuccess={(user) => console.log('Login successful:', user)}
        onLoginFailure={(error) => console.log('Login failed:', error)}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
      >
        Login with Google
      </AuthButton>
    </div>
  )
}

export default LoginPage`}
              language="javascript"
              title="AuthButton Component Demo"
              showLineNumbers={true}
              allowCopy={true}
              maxHeight="400px"
            />
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2">AuthStatus Component</h4>
            <CodeDisplay
              code={`import { AuthStatus } from '@/components/rockitcode'

function UserProfile() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <AuthStatus
        loggedInComponent={<p className="text-green-600">You are logged in!</p>}
        loggedOutComponent={<p className="text-red-600">You are not logged in.</p>}
        className="text-center"
      />
    </div>
  )
}

export default UserProfile`}
              language="javascript"
              title="AuthStatus Component Demo"
              showLineNumbers={true}
              allowCopy={true}
              maxHeight="400px"
            />
          </div>
        </div>

        <p className="text-zinc-600 dark:text-zinc-400">
          The Authentication components are designed to be flexible and easy to use, providing essential functionality for user management.
        </p>
      </div>,
      'text',
      { estimatedMinutes: 15 }
    )
  ]

  return (
    <SidebarLayoutContent
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbHome />
          <BreadcrumbSeparator />
          <Breadcrumb>Components Demo</Breadcrumb>
        </Breadcrumbs>
      }
    >
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            🚀 RockitCode Component Library
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
            Modular, scalable, and efficient components powering the next generation of online learning
          </p>
        </div>

        {/* Authentication Demo */}
        <PageSection title="🔐 Authentication System">
          <div className="space-y-6">
            <p className="text-zinc-600 dark:text-zinc-400">
              Live authentication demo using GitHub OAuth. Try signing in and see how the components adapt:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <h4 className="text-lg font-semibold mb-3">Authentication Status</h4>
                <AuthStatus showLoginPrompt={true} />
              </div>
              
              <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <h4 className="text-lg font-semibold mb-3">Authentication Button</h4>
                <div className="space-y-3">
                  <AuthButton variant="primary" size="md" showAvatar={true} />
                  <AuthButton variant="outline" size="sm" showAvatar={false} />
                </div>
              </div>
            </div>
          </div>
        </PageSection>

        {/* Progress Tracker Demo */}
        <PageSection title="📊 Progress Tracking System">
          <div className="space-y-4">
            <p className="text-zinc-600 dark:text-zinc-400">
              Track student progress with local storage persistence and detailed analytics:
            </p>
            <ProgressTracker
              courseId="components-demo"
              items={progressItems}
              showEstimates={true}
              showProgress={true}
              onItemComplete={(itemId) => console.log('Completed:', itemId)}
              onItemStart={(itemId) => console.log('Started:', itemId)}
            />
          </div>
        </PageSection>

        {/* Interactive Exercise Demo */}
        <PageSection title="💻 Interactive Code Playground">
          <div className="space-y-4">
            <p className="text-zinc-600 dark:text-zinc-400">
              Hands-on coding practice with hints, solutions, and instant feedback:
            </p>
            <ExercisePlayground
              exerciseId="component-demo-exercise"
              title="Build a Simple React Component"
              description="Create a React component that displays a greeting message. Use the useState hook to make it interactive."
              initialCode={`import React, { useState } from 'react'

function GreetingComponent() {
  // Add your state and logic here
  
  return (
    <div>
      {/* Your JSX here */}
    </div>
  )
}

export default GreetingComponent`}
              language="javascript"
              expectedOutput="A React component that displays a greeting and allows user interaction"
              hints={[
                "Use useState to manage the greeting message",
                "Add an input field for the user's name",
                "Update the greeting when the input changes",
                "Consider using an onChange event handler"
              ]}
              solution={`import React, { useState } from 'react'

function GreetingComponent() {
  const [name, setName] = useState('')
  
  const handleNameChange = (event) => {
    setName(event.target.value)
  }
  
  return (
    <div className="p-4">
      <h2>Hello, {name || 'Guest'}!</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={handleNameChange}
        className="mt-2 p-2 border rounded"
      />
    </div>
  )
}

export default GreetingComponent`}
              allowReset={true}
              showLineNumbers={true}
            />
          </div>
        </PageSection>

        {/* Lesson Content Structure Demo */}
        <PageSection title="📚 Structured Lesson Content">
          <div className="space-y-4">
            <p className="text-zinc-600 dark:text-zinc-400">
              Organize learning content with collapsible sections and progress tracking:
            </p>
            <LessonContent
              lessonId="component-architecture-lesson"
              title="Component Architecture Fundamentals"
              description="Learn how to build scalable, maintainable component libraries"
              sections={lessonSections}
              allowCollapse={true}
              showProgress={true}
              onSectionComplete={(sectionId) => console.log('Section completed:', sectionId)}
              onLessonComplete={() => console.log('Lesson completed!')}
            />
          </div>
        </PageSection>

        {/* Technology Stack */}
        <PageSection title="🛠️ Built With Modern Technologies">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-6 space-y-3">
              <div className="text-2xl">⚛️</div>
              <h3 className="text-lg font-semibold">React 18</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Modern React with hooks, suspense, and concurrent features
              </p>
            </div>
            
            <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-6 space-y-3">
              <div className="text-2xl">🔷</div>
              <h3 className="text-lg font-semibold">TypeScript</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Full type safety with comprehensive interface definitions
              </p>
            </div>
            
            <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-6 space-y-3">
              <div className="text-2xl">🎨</div>
              <h3 className="text-lg font-semibold">TailwindCSS</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Utility-first CSS framework for rapid UI development
              </p>
            </div>
            
            <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-6 space-y-3">
              <div className="text-2xl">✨</div>
              <h3 className="text-lg font-semibold">Prism</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Syntax highlighting for 200+ programming languages
              </p>
            </div>
            
            <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-6 space-y-3">
              <div className="text-2xl">📹</div>
              <h3 className="text-lg font-semibold">YouTube API</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Seamless video integration with progress tracking
              </p>
            </div>
            
            <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-6 space-y-3">
              <div className="text-2xl">💾</div>
              <h3 className="text-lg font-semibold">Local Storage</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Persistent progress tracking without external dependencies
              </p>
            </div>
          </div>
        </PageSection>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Ready to Build Something Amazing?
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-2xl mx-auto">
            These components are the foundation of scalable online education. Start building your next learning project today.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/html-css"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Start Learning
            </a>
            <a
              href="https://github.com/topwebworks/nextjs-rockitcode"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              View Source
            </a>
          </div>
        </div>
      </div>
    </SidebarLayoutContent>
  )
}
