'use client'

import React, { useState, useCallback } from 'react'
import { VideoPlayer } from '@/components/video-player-component'
import VSCodeMonacoEditor from '@/components/vscode-monaco-editor'
import { LessonVideo, learningTracks } from '@/components/smart-video-navigation'
import { useEditorSettings } from '@/contexts/editor-settings'
import { useLearningContext } from '@/contexts/learning-context'

interface CodeSyncPoint {
  videoTimestamp: number
  action: 'reveal' | 'highlight' | 'challenge' | 'explain'
  codeSection: string
  code?: string
  hint?: string
  validation?: (code: string) => boolean
  successMessage?: string
}

interface SynchronizedLessonProps {
  className?: string
}

export function SynchronizedLesson({ className = '' }: SynchronizedLessonProps) {
  const { currentTrack, currentVideo: currentVideoId, setCurrentTrack, setCurrentVideo } = useLearningContext()
  const [isVideoMode, setIsVideoMode] = useState(true)
  const [currentCode, setCurrentCode] = useState('')
  const [videoProgress, setVideoProgress] = useState(0)
  const [showMiniVideo, setShowMiniVideo] = useState(true) // Mini video in code mode
  const [miniVideoPosition, setMiniVideoPosition] = useState<'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'>('bottom-right')
  const [codeViewMode, setCodeViewMode] = useState<'fullscreen' | 'mini-video'>('mini-video')
  const { settings } = useEditorSettings()

  // Get current track and video data
  const activeTrack = learningTracks.find(track => track.id === currentTrack)
  const currentVideo = activeTrack?.videos.find(video => video.id === currentVideoId) || activeTrack?.videos[0]

  // Python sync points for different lessons
  const pythonBasicsSyncPoints: CodeSyncPoint[] = [
    {
      videoTimestamp: 180, // 3 minutes in
      action: 'reveal',
      codeSection: 'python-variables',
      code: `# Python Variables and Data Types
name = "Alice"
age = 25
height = 5.7
is_student = True

print(f"Hello, {name}!")
print(f"Age: {age}")
print(f"Height: {height} feet")
print(f"Is student: {is_student}")`,
      hint: "These are Python's basic data types. Try changing the values!"
    },
    {
      videoTimestamp: 420, // 7 minutes in
      action: 'challenge',
      codeSection: 'python-strings',
      code: `# String Operations in Python
message = "Welcome to Python!"
user_name = input("What's your name? ")

# Try different string methods
print(message.upper())
print(message.lower())
print(message.replace("Python", "Programming"))

# String formatting
greeting = f"Hello {user_name}, {message}"
print(greeting)`,
      hint: "Experiment with string methods like .title(), .strip(), or .split()",
      validation: (code) => code.includes('input(') && code.includes('print('),
      successMessage: "Great! You're using Python strings and input/output!"
    },
    {
      videoTimestamp: 720, // 12 minutes in
      action: 'explain',
      codeSection: 'python-numbers',
      code: `# Numbers and Math in Python
x = 10
y = 3

print(f"Addition: {x + y}")
print(f"Subtraction: {x - y}")
print(f"Multiplication: {x * y}")
print(f"Division: {x / y}")
print(f"Floor Division: {x // y}")
print(f"Modulus: {x % y}")
print(f"Exponent: {x ** y}")

# Working with decimals
import math
circle_radius = 5
area = math.pi * circle_radius ** 2
print(f"Circle area: {area:.2f}")`,
      hint: "Python has powerful math operations and the math module for advanced functions"
    }
  ]

  // Python Functions sync points
  const pythonFunctionsSyncPoints: CodeSyncPoint[] = [
    {
      videoTimestamp: 300, // 5 minutes in
      action: 'reveal',
      codeSection: 'python-functions-basic',
      code: `# Python Functions
def greet(name):
    """A simple greeting function"""
    return f"Hello, {name}!"

def calculate_area(length, width):
    """Calculate rectangle area"""
    area = length * width
    return area

# Using functions
message = greet("Python Learner")
print(message)

room_area = calculate_area(12, 10)
print(f"Room area: {room_area} square feet")`,
      hint: "Functions help organize code and make it reusable!"
    },
    {
      videoTimestamp: 600, // 10 minutes in
      action: 'challenge',
      codeSection: 'python-conditionals',
      code: `# If Statements and Logic
age = int(input("Enter your age: "))

if age >= 18:
    print("You are an adult")
    if age >= 65:
        print("You qualify for senior discounts!")
elif age >= 13:
    print("You are a teenager")
else:
    print("You are a child")

# Multiple conditions
weather = input("How's the weather? (sunny/rainy/cloudy): ")
temperature = float(input("What's the temperature? "))

if weather == "sunny" and temperature > 70:
    print("Perfect day for a picnic!")
elif weather == "rainy" or temperature < 50:
    print("Better stay inside")
else:
    print("It's an okay day")`,
      validation: (code) => code.includes('if') && code.includes('elif'),
      successMessage: "Excellent! You're mastering Python conditionals!"
    }
  ]

  // Example sync points for Shopify Liquid lesson (keeping existing)
  const liquidBasicsSyncPoints: CodeSyncPoint[] = [
    {
      videoTimestamp: 120, // 2 minutes in
      action: 'reveal',
      codeSection: 'liquid-variables',
      code: `<!-- Liquid Variables -->
{{ product.title }}
{{ product.price }}
{{ collection.title }}`,
      hint: "These are basic Liquid output tags. Try adding your own!"
    },
    {
      videoTimestamp: 300, // 5 minutes in
      action: 'challenge',
      codeSection: 'liquid-filters',
      code: `<!-- Add filters to format the data -->
{{ product.title | upcase }}
{{ product.price | money }}
{{ 'hello world' | capitalize }}`,
      hint: "Filters transform data. Try different filters like | downcase or | truncate: 50",
      validation: (code) => code.includes('|') && code.includes('money'),
      successMessage: "Great! You're using Liquid filters correctly!"
    },
    {
      videoTimestamp: 600, // 10 minutes in
      action: 'explain',
      codeSection: 'liquid-logic',
      code: `<!-- Liquid Logic -->
{% if product.available %}
  <button>Add to Cart</button>
{% else %}
  <p>Sold Out</p>
{% endif %}

{% for variant in product.variants %}
  <option value="{{ variant.id }}">{{ variant.title }}</option>
{% endfor %}`,
      hint: "Liquid uses logic tags with {% %} for conditions and loops"
    }
  ]

  // Get sync points based on current video
  const getSyncPoints = (): CodeSyncPoint[] => {
    const trackId = currentTrack
    const videoId = currentVideoId

    // Python track sync points
    if (trackId === 'python-fundamentals') {
      switch (videoId) {
        case 'python-basics':
          return pythonBasicsSyncPoints
        case 'python-functions':
          return pythonFunctionsSyncPoints
        default:
          return []
      }
    }

    // Shopify track sync points  
    if (trackId === 'shopify-dev' && videoId === 'liquid-basics') {
      return liquidBasicsSyncPoints
    }

    return []
  }

  // Handle video progress and sync code
  const handleVideoProgress = useCallback((progress: number) => {
    setVideoProgress(progress)
    
    if (!currentVideo) return
    
    // Calculate current time based on progress
    const duration = parseDuration(currentVideo.duration)
    const currentTime = (progress / 100) * duration
    
    // Get sync points for current video
    const syncPoints = getSyncPoints()
    
    // Check for active sync point
    const activeSync = syncPoints.find(sync => 
      currentTime >= sync.videoTimestamp && 
      currentTime < sync.videoTimestamp + 30 // 30 second window
    )
    
    if (activeSync && activeSync.code && currentCode !== activeSync.code) {
      setCurrentCode(activeSync.code)
      
      // Show hint if available
      if (activeSync.hint) {
        // Could implement a hint display system here
        console.log('Hint:', activeSync.hint)
      }
      
      // Handle different action types
      switch (activeSync.action) {
        case 'challenge':
          // Could trigger challenge mode
          console.log('Challenge mode activated!')
          break
        case 'explain':
          // Could show explanation overlay
          console.log('Explanation available')
          break
        case 'reveal':
          // Default code reveal behavior
          break
      }
    }
  }, [currentVideo, currentVideoId, currentCode, currentTrack, getSyncPoints])

  // Single persistent video player instance (never unmounted)
  const videoPlayerInstance = React.useMemo(() => {
    if (!currentVideo) return null
    return (
      <VideoPlayer
        src={currentVideo.url}
        chapters={currentVideo.chapters || []}
        onProgress={handleVideoProgress}
        className="w-full h-full"
        size="large"
        showChapters={true}
      />
    )
  }, [currentVideo?.url])

  // Parse duration string like "15:30" to seconds
  const parseDuration = (duration: string): number => {
    const parts = duration.split(':').map(Number)
    return parts.length === 2 ? parts[0] * 60 + parts[1] : 0
  }

  // Handle chapter navigation
  const handleChapterJump = useCallback((timestamp: number) => {
    console.log('Jumping to chapter at:', timestamp, 'seconds')
    // The VideoPlayer component will handle the actual jumping
    // This could be enhanced to trigger the video player's jumpToChapter method
  }, [])

  // Format timestamp for display
  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds % 60)

    return h > 0
      ? `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      : `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  // Handle track change
  const handleTrackChange = useCallback((trackId: string) => {
    setCurrentTrack(trackId)
    setCurrentVideo(undefined) // Reset video selection
    setCurrentCode('') // Reset code
  }, [])

  // Handle video change
  const handleVideoChange = useCallback((videoId: string) => {
    setCurrentVideo(videoId)
    
    // Set initial code based on video and track
    const video = activeTrack?.videos.find(v => v.id === videoId)
    if (video) {
      // Python track starter code
      if (currentTrack === 'python-fundamentals') {
        switch (videoId) {
          case 'python-basics':
            setCurrentCode(`# Python Basics - Variables and Data Types
# This code will sync with the video

# Variables
name = "Your Name"
age = 25
height = 5.8
is_learning = True

# Print statements
print("Hello, Python!")
print(f"Name: {name}")
print(f"Age: {age}")

# Try changing these values and run the code!`)
            break
          case 'python-functions':
            setCurrentCode(`# Python Functions
# Functions help organize and reuse code

def greet_user(name):
    """Function to greet a user"""
    return f"Hello, {name}! Welcome to Python!"

def calculate_rectangle_area(length, width):
    """Calculate the area of a rectangle"""
    area = length * width
    return area

# Test the functions
user_greeting = greet_user("Python Learner")
print(user_greeting)

room_area = calculate_rectangle_area(10, 12)
print(f"Room area: {room_area} square feet")`)
            break
          default:
            setCurrentCode(`# ${video.title}
# Python code will sync with video progress

print("Ready to learn Python!")
print("Watch the video and code along!")`)
        }
      } 
      // Liquid/Shopify starter code
      else if (video.technologies?.includes('liquid')) {
        setCurrentCode(`<!-- Welcome to Liquid! -->
<!-- This lesson: ${video.title} -->

<!-- Your code will appear here as you watch the video -->`)
      } 
      // React starter code
      else if (video.technologies?.includes('react')) {
        setCurrentCode(`// React Component Example
// Lesson: ${video.title}

function MyComponent() {
  return (
    <div>
      {/* Your code will sync with the video */}
    </div>
  )
}`)
      } 
      // Default HTML starter code
      else {
        setCurrentCode(`<!-- ${video.title} -->
<!-- Code will sync with video progress -->`)
      }
    }
  }, [activeTrack, currentTrack])

  // Get editor language based on current video and track
  const getEditorLanguage = (): string => {
    // Check track-specific defaults first
    if (currentTrack === 'python-fundamentals') return 'python'
    if (currentTrack === 'javascript-fundamentals') return 'javascript'
    if (currentTrack === 'react-development') return 'typescript'
    
    // Then check video technologies
    if (!currentVideo?.technologies) return 'html'
    
    if (currentVideo.technologies.includes('python')) return 'python'
    if (currentVideo.technologies.includes('liquid')) return 'html' // Liquid uses HTML syntax highlighting
    if (currentVideo.technologies.includes('react')) return 'typescript'
    if (currentVideo.technologies.includes('javascript')) return 'javascript'
    if (currentVideo.technologies.includes('css')) return 'css'
    if (currentVideo.technologies.includes('typescript')) return 'typescript'
    
    return 'html'
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Full-Width Video at Top of Lesson Page */}
      {currentVideo && (
        <div className="w-full mb-8 bg-black">
          {/* Video Container */}
          <div 
            className={`transition-all duration-500 ease-in-out bg-black ${
              isVideoMode 
                ? 'w-full relative' 
                : codeViewMode === 'mini-video'
                  ? `fixed z-50 w-80 h-48 rounded-lg shadow-2xl border-2 border-gray-300 dark:border-gray-600 ${
                      miniVideoPosition === 'bottom-right' ? 'bottom-6 right-6' :
                      miniVideoPosition === 'bottom-left' ? 'bottom-6 left-6' :
                      miniVideoPosition === 'top-right' ? 'top-6 right-6' :
                      'top-6 left-6'
                    }`
                  : 'hidden'
            }`}
          >
            {/* Video Player Container - Always renders the same video instance */}
            <div 
              className={
                isVideoMode 
                  ? "w-full" 
                  : "relative w-full h-full"
              }
            >
              <div 
                className="relative w-full" 
                style={isVideoMode ? { aspectRatio: '16/9' } : { height: '100%' }}
              >
                {/* Same video player instance always rendered here */}
                {videoPlayerInstance}
              </div>
            </div>

            {/* Mini Video Overlay Controls - Only show in mini mode */}
            {!isVideoMode && codeViewMode === 'mini-video' && (
              <>
                {/* Mini Video Header */}
                <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-2 text-xs text-white rounded-t-lg bg-gradient-to-r from-black via-black to-black bg-opacity-95 backdrop-blur-sm">
                  <div className="flex items-center flex-1 min-w-0 gap-2">
                    <span className="text-blue-400">📺</span>
                    <span className="font-medium truncate">{currentVideo?.title}</span>
                  </div>
                  <div className="flex items-center flex-shrink-0 gap-2">
                    <div className="px-1.5 py-0.5 bg-blue-600 rounded text-xs font-mono">
                      {Math.round(videoProgress)}%
                    </div>
                    <button
                      onClick={() => setCodeViewMode('fullscreen')}
                      className="p-1 transition-colors rounded hover:bg-red-500 hover:bg-opacity-80"
                      title="Hide video"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                {/* Mini Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-2 text-xs text-white rounded-b-lg bg-gradient-to-r from-black via-black to-black bg-opacity-95 backdrop-blur-sm">
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center flex-shrink-0 gap-1">
                      <button
                        onClick={() => setIsVideoMode(true)}
                        className="px-2 py-1 font-medium transition-colors rounded hover:bg-blue-600 hover:bg-opacity-80"
                        title="Switch to full video"
                      >
                        🗖 Full
                      </button>
                    </div>
                    <div className="flex items-center flex-shrink-0 gap-1">
                      {/* Chapter Navigation Dropdown */}
                      {currentVideo?.chapters && currentVideo.chapters.length > 0 && (
                        <select 
                          onChange={(e) => {
                            const timestamp = parseInt(e.target.value, 10)
                            if (!isNaN(timestamp)) {
                              handleChapterJump(timestamp)
                              // Trigger the video player's chapter jump
                              const event = new CustomEvent('jumpToChapter', { detail: { timestamp } })
                              window.dispatchEvent(event)
                            }
                          }}
                          className="text-xs bg-gray-800 bg-opacity-80 border border-gray-600 rounded px-1 py-0.5 text-white cursor-pointer hover:bg-gray-700 transition-colors max-w-24"
                          title="Jump to chapter"
                          defaultValue=""
                        >
                          <option value="" disabled>📚 Chapters</option>
                          {currentVideo.chapters.map((chapter, index) => (
                            <option key={index} value={chapter.timestamp}>
                              {formatTime(chapter.timestamp)} - {chapter.title.length > 15 ? chapter.title.substring(0, 15) + '...' : chapter.title}
                            </option>
                          ))}
                        </select>
                      )}
                      {/* Position Controls */}
                      <select 
                        value={miniVideoPosition}
                        onChange={(e) => setMiniVideoPosition(e.target.value as any)}
                        className="text-xs bg-gray-800 bg-opacity-80 border border-gray-600 rounded px-1 py-0.5 text-white cursor-pointer hover:bg-gray-700 transition-colors"
                        title="Change corner position"
                      >
                        <option value="bottom-right">↘️ BR</option>
                        <option value="bottom-left">↙️ BL</option>
                        <option value="top-right">↗️ TR</option>
                        <option value="top-left">↖️ TL</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* Visual Drag Handle */}
                <div className="absolute w-4 h-4 transition-opacity cursor-move top-2 left-2 opacity-30 hover:opacity-70" title="Drag to fine-tune position">
                  <div className="w-full h-full bg-white bg-opacity-40 rounded grid grid-cols-2 gap-0.5 p-0.5">
                    <div className="bg-white rounded-sm bg-opacity-80"></div>
                    <div className="bg-white rounded-sm bg-opacity-80"></div>
                    <div className="bg-white rounded-sm bg-opacity-80"></div>
                    <div className="bg-white rounded-sm bg-opacity-80"></div>
                  </div>
                </div>
                {/* Size indicator */}
                <div className="absolute text-xs text-white opacity-50 pointer-events-none top-2 right-8">
                  Small
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Content Layout - No sidebar needed, handled by MainSiteLayout */}
      <div className="w-full min-h-screen">
        <div className="px-8 py-6">
            {/* Lesson Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  {currentVideo && (
                    <>
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {currentVideo.title}
                      </h1>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        currentVideo.difficulty === 'beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                        currentVideo.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                        'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {currentVideo.difficulty}
                      </span>
                    </>
                  )}
                </div>
                
                {/* Mode Toggle Controls */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsVideoMode(true)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isVideoMode 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    📺 Video Focus
                  </button>
                  <button
                    onClick={() => setIsVideoMode(false)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      !isVideoMode 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    💻 Code Focus
                  </button>
                  
                  {/* Code View Options - Only show when in code mode */}
                  {!isVideoMode && (
                    <div className="flex gap-1 pl-2 ml-2 border-l border-gray-300 dark:border-gray-600">
                      <button
                        onClick={() => setCodeViewMode('mini-video')}
                        className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
                          codeViewMode === 'mini-video'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                        }`}
                        title="Code with mini video"
                      >
                        📺💻 Mini Video
                      </button>
                      <button
                        onClick={() => setCodeViewMode('fullscreen')}
                        className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
                          codeViewMode === 'fullscreen'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                        }`}
                        title="Code only"
                      >
                        🗖 Full Code
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Lesson Meta Info */}
              {currentVideo && (
                <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <span>⏱️</span>
                    <span>{currentVideo.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📊</span>
                    <span>Progress: {Math.round(videoProgress)}%</span>
                  </div>
                  {currentVideo.technologies && (
                    <div className="flex items-center gap-2">
                      <span>🛠️</span>
                      <div className="flex gap-1">
                        {currentVideo.technologies.map(tech => (
                          <span key={tech} className="px-2 py-0.5 text-xs text-blue-700 bg-blue-100 dark:bg-blue-900 dark:text-blue-300 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Lesson Content Based on Mode */}
            {isVideoMode ? (
              /* Video Focus Mode - Show lesson content and chapters */
              <div className="space-y-8">
                {/* Lesson Description */}
                {currentVideo?.description && (
                  <section className="prose prose-gray dark:prose-invert max-w-none">
                    <h2>About This Lesson</h2>
                    <p className="text-lg leading-relaxed">{currentVideo.description}</p>
                  </section>
                )}

                {/* Chapter Navigation */}
                {currentVideo?.chapters && currentVideo.chapters.length > 0 && (
                  <section>
                    <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                      📚 Lesson Chapters
                    </h2>
                    <div className="grid gap-4">
                      {currentVideo.chapters.map((chapter, index) => (
                        <button
                          key={index}
                          onClick={() => handleChapterJump(chapter.timestamp)}
                          className="flex items-center justify-between w-full p-6 text-left transition-all bg-white border border-gray-200 rounded-lg dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md dark:bg-gray-800"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg dark:bg-blue-900">
                              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                {index + 1}
                              </span>
                            </div>
                            <div>
                              <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                                {chapter.title}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Chapter {index + 1} • {formatTime(chapter.timestamp)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">▶️</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            ) : (
              /* Code Focus Mode - Show code editor */
              <div className="space-y-6">
                <section>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                    💻 Interactive Code Editor
                  </h2>
                  <p className="mb-6 text-gray-600 dark:text-gray-400">
                    {codeViewMode === 'mini-video' && "Code along with the video in mini mode. The code will sync with video progress."}
                    {codeViewMode === 'fullscreen' && "Focus on the code editor. Switch back to video mode to see the lesson content."}
                  </p>
                  
                  {/* Code Editor */}
                  <div className="relative">
                    <div className="h-[700px] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                      <VSCodeMonacoEditor
                        value={currentCode}
                        onChange={setCurrentCode}
                        language={getEditorLanguage()}
                        theme={settings.theme}
                        height="100%"
                        showOutput={true}
                        tabs={[{
                          id: '1',
                          name: `${currentVideo?.title?.toLowerCase().replace(/\s+/g, '-') || 'lesson'}.${getEditorLanguage() === 'typescript' ? 'tsx' : getEditorLanguage()}`,
                          language: getEditorLanguage(),
                          content: currentCode,
                          isDirty: false,
                          isActive: true
                        }]}
                      />
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* No Video Selected State */}
            {!currentVideo && (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="mb-4 text-6xl">🎬</div>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                    Ready to Start Learning?
                  </h2>
                  <p className="max-w-md mx-auto text-gray-600 dark:text-gray-400">
                    Select a lesson from the navigation menu to begin your coding journey with synchronized video and interactive code examples.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

export default SynchronizedLesson
