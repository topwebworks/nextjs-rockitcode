'use client'

import React, { useState, useEffect } from 'react'
import HTMLMastery from './HTMLMastery'
import { AuthButton } from '@/components/rockitcode/auth-button'
import { useUser } from '@/contexts/UserContext'

// Complete HTML Learning Journey: Setup → Concepts → Mastery Lab
export default function HTMLLearningJourney() {
  const { user, isLoading } = useUser()
  const [currentPhase, setCurrentPhase] = useState<'setup' | 'concepts' | 'mastery'>('setup')
  const [currentConcept, setCurrentConcept] = useState(0)
  const [completedConcepts, setCompletedConcepts] = useState<Set<number>>(new Set())
  const [showExample, setShowExample] = useState(false)
  const [activeToggle, setActiveToggle] = useState<string | null>(null)
  
  // New interactive component states
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [draggedCommand, setDraggedCommand] = useState<string | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set())
  const [animateSection, setAnimateSection] = useState<string | null>(null)
  
  // Coding exercise states
  const [codingAnswers, setCodingAnswers] = useState<Record<string, string>>({})
  const [showCodePreview, setShowCodePreview] = useState<Record<string, boolean>>({})
  const [codingCompleted, setCodingCompleted] = useState<Set<string>>(new Set())

  // Terminal interaction states
  const [terminalHistory, setTerminalHistory] = useState<Array<{command: string, output: string}>>([])
  const [currentCommand, setCurrentCommand] = useState('')
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set())

  // Auto-advance to concepts if user is logged in
  useEffect(() => {
    if (user && currentPhase === 'setup') {
      setCurrentPhase('concepts')
    }
  }, [user, currentPhase])

  // Animation trigger helper
  const triggerAnimation = (sectionId: string) => {
    setAnimateSection(sectionId)
    setTimeout(() => setAnimateSection(null), 1000)
  }

  // Check if section is completed
  const isSectionCompleted = (sectionId: string) => completedSections.has(sectionId)

  // Mark section as completed
  const markSectionCompleted = (sectionId: string) => {
    setCompletedSections(prev => new Set([...prev, sectionId]))
    triggerAnimation(sectionId)
  }

  // Validate coding exercise
  const validateCode = (exerciseId: string, userCode: string, expectedPatterns: string[]) => {
    const isValid = expectedPatterns.every(pattern => {
      const regex = new RegExp(pattern, 'i')
      return regex.test(userCode.replace(/\s+/g, ' ').trim())
    })
    
    if (isValid && !codingCompleted.has(exerciseId)) {
      setCodingCompleted(prev => new Set([...prev, exerciseId]))
      triggerAnimation(`coding-${exerciseId}`)
    }
    
    return isValid
  }

  // Handle terminal command execution
  const handleTerminalCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentCommand.trim()) {
      const command = currentCommand.trim()
      
      // Simulate Git command responses
      let output = ''
      let exerciseCompleted = ''
      
      if (command === 'git init') {
        output = 'Initialized empty Git repository in ~/practice-repo/.git/'
        exerciseCompleted = 'ex1'
      } else if (command === 'git status') {
        output = `On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        index.html
        
nothing added to commit but untracked files present (use "git add" to track)`
        exerciseCompleted = 'ex2'
      } else if (command === 'git add .' || command === 'git add -A') {
        output = '' // Git add . produces no output when successful
        exerciseCompleted = 'ex3'
      } else if (command.startsWith('git commit -m')) {
        if (command.includes('"') || command.includes("'")) {
          output = `[main (root-commit) a1b2c3d] ${command.split(/["'](.+)["']/)[1] || 'Initial commit'}
 1 file changed, 1 insertion(+)
 create mode 100644 index.html`
          exerciseCompleted = 'ex4'
        } else {
          output = 'error: switch `m\' requires a value'
        }
      } else if (command === 'git log') {
        output = `commit a1b2c3d4e5f6789012345678901234567890abcd (HEAD -> main)
Author: Your Name <your.email@example.com>
Date:   ${new Date().toDateString()}

    Initial commit: Add homepage`
        exerciseCompleted = 'ex5'
      } else if (command === 'clear') {
        setTerminalHistory([])
        setCurrentCommand('')
        return
      } else {
        output = `git: '${command.split(' ')[1] || command}' is not a git command. See 'git --help'.

The most commonly used git commands are:
   add        Add file contents to the index
   commit     Record changes to the repository  
   init       Create an empty Git repository
   log        Show commit logs
   status     Show the working tree status`
      }
      
      // Add to terminal history
      setTerminalHistory(prev => [...prev, { command, output }])
      setCurrentCommand('')
      
      // Mark exercise as completed
      if (exerciseCompleted && !completedExercises.has(exerciseCompleted)) {
        setCompletedExercises(prev => new Set([...prev, exerciseCompleted]))
        triggerAnimation(`exercise-${exerciseCompleted}`)
      }
    }
  }

  // Modern Linear Icons (SVG components)
  const Icons = {
    Terminal: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
        <path d="m6 9 4 4-4 4"/>
        <path d="m12 13h6"/>
      </svg>
    ),
    GitBranch: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <line x1="6" y1="3" x2="6" y2="15"/>
        <circle cx="18" cy="6" r="3"/>
        <circle cx="6" cy="18" r="3"/>
        <path d="m18 9a9 9 0 0 1-9 9"/>
      </svg>
    ),
    Code: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polyline points="16,18 22,12 16,6"/>
        <polyline points="8,6 2,12 8,18"/>
      </svg>
    ),
    Zap: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
      </svg>
    ),
    Rocket: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M4.5 16.5c-1.5 1.5-2 5 2 5s3.5-.5 5-2l1.5-1.5"/>
        <path d="m15 10-8.5 8.5"/>
        <path d="m16 7 1 1"/>
        <path d="m22 2-7 7"/>
        <path d="m11 18H9.5a2.5 2.5 0 0 1 0-5H13"/>
        <path d="M6 14v1.5a2.5 2.5 0 0 0 5 0V13"/>
      </svg>
    ),
    CheckCircle: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="m9 12 2 2 4-4"/>
        <circle cx="12" cy="12" r="9"/>
      </svg>
    ),
    Play: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polygon points="5,3 19,12 5,21 5,3"/>
      </svg>
    ),
    Edit: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    )
  }

  // Add CSS animations
  const animationStyles = `
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideDown {
      from { opacity: 0; height: 0; }
      to { opacity: 1; height: auto; }
    }
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
      60% { transform: translateY(-5px); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .animate-slideIn { animation: slideIn 0.3s ease-out; }
    .animate-slideDown { animation: slideDown 0.3s ease-out; }
    .animate-bounce { animation: bounce 1s infinite; }
    .animate-pulse { animation: pulse 2s infinite; }
  `

  const githubFeatures = [
    {
      icon: '📱',
      title: 'Create Repositories',
      description: 'Store your code projects in organized folders called repositories',
      benefit: 'Keep all your projects organized and accessible from anywhere'
    },
    {
      icon: '💾',
      title: 'Version Control',
      description: 'Save snapshots of your code as you work, never lose progress',
      benefit: 'Experiment fearlessly - you can always go back to working versions'
    },
    {
      icon: '🌐',
      title: 'Showcase Your Work',
      description: 'Your GitHub profile becomes your developer portfolio',
      benefit: 'Employers can see your actual code and project progression'
    },
    {
      icon: '🤝',
      title: 'Collaborate',
      description: 'Work on projects with other developers around the world',
      benefit: 'Learn from others and contribute to open source projects'
    },
    {
      icon: '🚀',
      title: 'Deploy Projects',
      description: 'Host your websites and apps directly from GitHub',
      benefit: 'Share your creations with the world instantly'
    },
    {
      icon: '📈',
      title: 'Track Progress',
      description: 'See your coding activity and contribution patterns',
      benefit: 'Visual proof of your learning journey and consistency'
    }
  ]

  const quickStartSteps = [
    {
      step: '1',
      title: 'Create Your First Repository',
      description: 'Click the green "New" button and name it "my-first-website"',
      tip: 'This will be where you store your HTML projects'
    },
    {
      step: '2', 
      title: 'Add a README File',
      description: 'Check "Add a README file" when creating your repository',
      tip: 'This file describes what your project is about'
    },
    {
      step: '3',
      title: 'Upload Your Code',
      description: 'Drag and drop your HTML files into the repository',
      tip: 'GitHub will automatically display .html files as web pages'
    },
    {
      step: '4',
      title: 'Enable GitHub Pages',
      description: 'Go to Settings > Pages and select your main branch',
      tip: 'This makes your website live on the internet for free!'
    }
  ]

  const concepts = [
    {
      id: 1,
      title: "What is HTML?",
      subtitle: "The Foundation of Every Website",
      description: "HTML is the skeleton that gives structure to every webpage on the internet.",
      content: [
        "HTML (HyperText Markup Language) is the backbone of the web - it's what browsers read to understand how to display content.",
        "Think of HTML like the frame of a house. It doesn't determine the paint color or furniture (that's CSS), but it defines where the rooms, doors, and windows go.",
        "Every website you've ever visited - Google, YouTube, Instagram - all start with HTML."
      ],
      interactiveBlocks: [
        {
          id: 'structure',
          title: 'Structure',
          content: 'HTML provides the basic structure and layout foundation',
          icon: '🏗️'
        },
        {
          id: 'meaning',
          title: 'Meaning',
          content: 'Tags give semantic meaning to content (headings, paragraphs, links)',
          icon: '📝'
        },
        {
          id: 'universal',
          title: 'Universal',
          content: 'Every browser understands HTML - it\'s the universal web language',
          icon: '🌐'
        }
      ],
      codeExample: {
        title: "Your First HTML",
        code: `<h1>Welcome to my website!</h1>
<p>This is my first paragraph of content.</p>
<a href="https://google.com">Visit Google</a>`,
        explanation: "This simple HTML creates a heading, paragraph, and link that any browser can display."
      }
    },
    {
      id: 2,
      title: "HTML Document Structure",
      subtitle: "The Template Every Webpage Uses",
      description: "Every HTML document follows the same basic structure - like a standard letter format.",
      content: [
        "Just like how every business letter has a header, body, and signature, every HTML document has a standard structure.",
        "The DOCTYPE tells the browser 'this is modern HTML', the <head> contains invisible setup information, and the <body> contains everything users see.",
        "This structure isn't just convention - browsers need it to display your page correctly."
      ],
      interactiveBlocks: [
        {
          id: 'doctype',
          title: '<!DOCTYPE html>',
          content: 'Tells the browser this is modern HTML5',
          icon: '📋'
        },
        {
          id: 'head',
          title: '<head>',
          content: 'Contains metadata, title, and links to CSS files',
          icon: '🧠'
        },
        {
          id: 'body',
          title: '<body>',
          content: 'Contains all the visible content users see',
          icon: '👁️'
        }
      ],
      codeExample: {
        title: "Complete HTML Document",
        code: `<!DOCTYPE html>
<html>
  <head>
    <title>My First Website</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    <p>This appears on the page.</p>
  </body>
</html>`,
        explanation: "This is the minimal structure every HTML page needs to work properly."
      }
    },
    {
      id: 3,
      title: "Tags and Elements",
      subtitle: "The Building Blocks of HTML",
      description: "Tags are like containers that wrap content to give it special meaning and behavior.",
      content: [
        "HTML tags are like labeled boxes - they wrap content and tell the browser what that content represents.",
        "Most tags come in pairs: an opening tag <tag> and a closing tag </tag>. The content between them becomes an 'element'.",
        "Some tags are self-closing because they don't contain content - like <img> for images or <br> for line breaks."
      ],
      interactiveBlocks: [
        {
          id: 'opening',
          title: 'Opening Tag',
          content: '<h1> - Starts the element',
          icon: '{'
        },
        {
          id: 'content',
          title: 'Content',
          content: 'The text or other elements inside',
          icon: '📄'
        },
        {
          id: 'closing',
          title: 'Closing Tag',
          content: '</h1> - Ends the element (note the slash)',
          icon: '}'
        }
      ],
      codeExample: {
        title: "Tags in Action",
        code: `<h1>Main Heading</h1>
<p>A paragraph with <strong>bold text</strong> inside.</p>
<img src="photo.jpg" alt="A photo">
<br>
<hr>`,
        explanation: "See how tags wrap content, and some tags like <img>, <br>, and <hr> are self-closing."
      }
    },
    {
      id: 4,
      title: "Essential HTML Elements",
      subtitle: "The Tags You'll Use Every Day",
      description: "These core elements handle 90% of web content - master these and you can build anything.",
      content: [
        "Headings (h1-h6) create hierarchy like a book's chapter structure. h1 is the main title, h2 for sections, h3 for subsections.",
        "Paragraphs (p) contain blocks of text content - think of them as the sentences and paragraphs in an article.",
        "Links (a) connect pages together and make the web 'web-like'. Images (img) display visual content."
      ],
      interactiveBlocks: [
        {
          id: 'headings',
          title: 'Headings (h1-h6)',
          content: 'Create hierarchy and structure like book chapters',
          icon: '📖'
        },
        {
          id: 'paragraphs',
          title: 'Paragraphs (p)',
          content: 'Contain blocks of text content',
          icon: '📝'
        },
        {
          id: 'links',
          title: 'Links (a)',
          content: 'Connect to other pages and resources',
          icon: '🔗'
        },
        {
          id: 'images',
          title: 'Images (img)',
          content: 'Display photos, graphics, and visual content',
          icon: '🖼️'
        }
      ],
      codeExample: {
        title: "Essential Elements Together",
        code: `<h1>My Blog Post</h1>
<h2>Introduction</h2>
<p>Welcome to my blog! Here's what I want to share.</p>
<img src="blog-photo.jpg" alt="Photo from my trip">
<p>Check out my <a href="/portfolio">portfolio</a> for more.</p>`,
        explanation: "This shows how headings, paragraphs, images, and links work together to create rich content."
      }
    },
    {
      id: 5,
      title: "Attributes: Customizing Elements",
      subtitle: "Adding Settings and Details to Your HTML",
      description: "Attributes are like options or settings that customize how elements behave.",
      content: [
        "Attributes provide extra information about elements - like specifying where a link goes or what image to display.",
        "They're written inside the opening tag as name='value' pairs, like options when ordering food.",
        "Common attributes include href (for links), src (for images), alt (for accessibility), and id/class (for styling)."
      ],
      interactiveBlocks: [
        {
          id: 'href',
          title: 'href="url"',
          content: 'Tells links where to go',
          icon: '🎯'
        },
        {
          id: 'src',
          title: 'src="file"',
          content: 'Tells images which file to display',
          icon: '📂'
        },
        {
          id: 'alt',
          title: 'alt="description"',
          content: 'Describes images for accessibility',
          icon: '♿'
        },
        {
          id: 'id-class',
          title: 'id & class',
          content: 'Labels for styling and JavaScript',
          icon: '🏷️'
        }
      ],
      codeExample: {
        title: "Attributes in Practice",
        code: `<a href="https://google.com" target="_blank">
  Open Google in new tab
</a>

<img src="sunset.jpg" alt="Beautiful sunset over mountains" width="400">

<div id="header" class="main-navigation">
  Navigation menu
</div>`,
        explanation: "Attributes customize behavior: href sets destination, alt describes images, id/class enable styling."
      }
    }
  ]

  const currentConceptData = concepts[currentConcept]

  // If user has completed concepts, show mastery lab
  if (currentPhase === 'mastery') {
    return <HTMLMastery />
  }

  // GitHub Setup Phase
  if (currentPhase === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Add custom animations */}
        <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
        
        {/* Enhanced Header with Modern Icons */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative px-6 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 border bg-white/10 rounded-xl backdrop-blur-sm border-white/20">
                  <Icons.GitBranch />
                </div>
                <div>
                  <h1 className="mb-2 text-4xl font-bold text-white">
                    GitHub Mastery Lab
                  </h1>
                  <p className="text-lg text-blue-200">
                    Build your foundation in version control and collaborative coding
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-3">
                <div className="p-4 border rounded-lg bg-white/10 backdrop-blur-sm border-white/20">
                  <div className="flex items-center gap-2 mb-2 text-emerald-300">
                    <Icons.Terminal />
                    <span className="font-semibold">Command Line</span>
                  </div>
                  <p className="text-sm text-white/80">Master Git commands and terminal workflows</p>
                </div>
                
                <div className="p-4 border rounded-lg bg-white/10 backdrop-blur-sm border-white/20">
                  <div className="flex items-center gap-2 mb-2 text-blue-300">
                    <Icons.Code />
                    <span className="font-semibold">Repository Setup</span>
                  </div>
                  <p className="text-sm text-white/80">Create and configure professional repositories</p>
                </div>
                
                <div className="p-4 border rounded-lg bg-white/10 backdrop-blur-sm border-white/20">
                  <div className="flex items-center gap-2 mb-2 text-purple-300">
                    <Icons.Rocket />
                    <span className="font-semibold">Collaboration</span>
                  </div>
                  <p className="text-sm text-white/80">Learn branching, merging, and team workflows</p>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="p-6 border bg-white/10 backdrop-blur-sm rounded-xl border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="flex items-center gap-2 text-xl font-semibold text-white">
                    <Icons.Zap />
                    Your Progress
                  </h3>
                  <span className="font-bold text-blue-300">
                    {Math.round((completedSections.size / 12) * 100)}% Complete
                  </span>
                </div>
                <div className="w-full h-3 mb-4 rounded-full bg-white/20">
                  <div 
                    className="h-3 transition-all duration-500 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: `${(completedSections.size / 12) * 100}%` }}
                  ></div>
                </div>
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <span className="flex items-center gap-1">
                    <Icons.CheckCircle />
                    {completedSections.size} sections completed
                  </span>
                  <span>•</span>
                  <span>{codingCompleted.size} coding exercises mastered</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl px-6 py-12 mx-auto">

          {/* Auth Status */}
          <div className="mb-12">
            {user ? (
              <div className="p-6 text-center border border-green-700 bg-green-900/30 rounded-xl">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-600 rounded-full">
                  <span className="font-bold text-white">✓</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-green-400">
                  Connected: {user.user_metadata?.full_name || user.email?.split('@')[0]}
                </h3>
                <p className="mb-4 text-green-300">
                  Your GitHub account is ready. Let's explore what you can do with it!
                </p>
                <button
                  onClick={() => setCurrentPhase('concepts')}
                  className="px-6 py-3 font-semibold text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                >
                  Continue to HTML Concepts →
                </button>
              </div>
            ) : (
              <div className="p-6 text-center bg-gray-800 border border-gray-700 rounded-xl">
                <h3 className="mb-4 text-xl font-bold">Connect Your GitHub Account</h3>
                <p className="mb-6 text-gray-300">
                  Sign in to follow along with real repository examples
                </p>
                <a 
                  href="/"
                  className="inline-block px-6 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Go to Homepage to Sign In
                </a>
              </div>
            )}
          </div>

          {/* Interactive Learning Sections */}
          <div className="space-y-12">
            
            {/* Section 1: What is Version Control? */}
            <div className={`bg-gray-800 border border-gray-700 rounded-xl p-8 transition-all duration-500 ${
              animateSection === 'section1' ? 'ring-2 ring-blue-500 transform scale-105' : ''
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="flex items-center text-2xl font-bold">
                  <span className="flex items-center justify-center w-8 h-8 mr-4 text-sm font-bold bg-blue-600 rounded-full">1</span>
                  What is Version Control?
                </h2>
                {isSectionCompleted('section1') && (
                  <div className="flex items-center text-green-400 animate-pulse">
                    <span className="mr-2">✅</span>
                    <span className="text-sm">Completed</span>
                  </div>
                )}
              </div>
              
              <p className="mb-6 text-gray-300">
                Imagine you're writing a research paper. You save versions like "Essay_v1.doc", "Essay_v2.doc", "Essay_FINAL.doc", "Essay_FINAL_REALLY.doc"... 
                Sound familiar? Version control does this automatically for code.
              </p>

              <div className="p-4 mb-6 bg-gray-900 border border-gray-600 rounded-lg">
                <div className="mb-2 font-mono text-sm text-green-400">Without Version Control:</div>
                <div className="font-mono text-gray-300">
                  📁 my-website/<br/>
                  &nbsp;&nbsp;📄 index.html<br/>
                  &nbsp;&nbsp;📄 index_backup.html<br/>
                  &nbsp;&nbsp;📄 index_working.html<br/>
                  &nbsp;&nbsp;📄 index_FINAL.html<br/>
                  &nbsp;&nbsp;📄 index_FINAL_v2.html<br/>
                </div>
              </div>

              <div className="p-4 mb-6 bg-gray-900 border border-gray-600 rounded-lg">
                <div className="mb-2 font-mono text-sm text-green-400">With Git:</div>
                <div className="font-mono text-gray-300">
                  📁 my-website/<br/>
                  &nbsp;&nbsp;📄 index.html<br/>
                  &nbsp;&nbsp;🔄 .git/ (tracks all versions automatically)
                </div>
              </div>

              {/* Interactive Quiz */}
              <div className="p-6 mb-6 border border-blue-700 rounded-lg bg-blue-900/20">
                <h3 className="mb-4 text-lg font-semibold text-blue-300">📝 Quick Check</h3>
                <div className="space-y-3">
                  <p className="mb-3 text-blue-200">Which file naming approach is better for organizing code?</p>
                  
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="version-control-quiz"
                      value="manual"
                      onChange={(e) => setQuizAnswers({...quizAnswers, versionControl: e.target.value})}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-300 transition-colors group-hover:text-white">
                      index_v1.html, index_v2.html, index_FINAL.html
                    </span>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="version-control-quiz"
                      value="git"
                      onChange={(e) => setQuizAnswers({...quizAnswers, versionControl: e.target.value})}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-300 transition-colors group-hover:text-white">
                      index.html + Git version tracking
                    </span>
                  </label>
                </div>
                
                {quizAnswers.versionControl === 'git' && (
                  <div className="p-3 mt-4 border border-green-700 rounded-lg bg-green-900/30 animate-slideIn">
                    <p className="text-sm text-green-300">
                      ✅ Correct! Git keeps one clean file and tracks all changes automatically.
                    </p>
                  </div>
                )}
                
                {quizAnswers.versionControl === 'manual' && (
                  <div className="p-3 mt-4 border border-red-700 rounded-lg bg-red-900/30 animate-slideIn">
                    <p className="text-sm text-red-300">
                      ❌ This gets messy quickly! Git does this automatically and keeps your folder clean.
                    </p>
                  </div>
                )}
              </div>

              {/* Learning Checklist */}
              <div className="p-6 border border-gray-600 rounded-lg bg-gray-700/30">
                <h3 className="mb-4 text-lg font-semibold text-white">🎯 Key Takeaways</h3>
                <div className="space-y-3">
                  {[
                    'Version control automatically tracks file changes',
                    'Git keeps your project folder clean and organized',
                    'You can jump back to any previous version instantly',
                    'No more confusing file names with v1, v2, FINAL, etc.'
                  ].map((item, idx) => (
                    <label key={idx} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={checkedItems.has(`section1-${idx}`)}
                        onChange={(e) => {
                          const id = `section1-${idx}`
                          if (e.target.checked) {
                            setCheckedItems(prev => new Set([...prev, id]))
                          } else {
                            setCheckedItems(prev => {
                              const newSet = new Set(prev)
                              newSet.delete(id)
                              return newSet
                            })
                          }
                        }}
                        className="w-4 h-4 text-blue-600 transition-all bg-gray-700 border-gray-500 rounded focus:ring-blue-500"
                      />
                      <span className={`text-sm transition-all duration-300 ${
                        checkedItems.has(`section1-${idx}`) 
                          ? 'text-green-300 line-through' 
                          : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
                
                {/* Auto-complete section when all items checked */}
                {[0,1,2,3].every(idx => checkedItems.has(`section1-${idx}`)) && !isSectionCompleted('section1') && (
                  <div className="mt-4">
                    <button
                      onClick={() => markSectionCompleted('section1')}
                      className="w-full px-4 py-2 font-semibold text-white transition-all transform bg-green-600 rounded-lg hover:bg-green-700 hover:scale-105 animate-bounce"
                    >
                      ✅ Mark Section Complete
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Section 2: Basic Git Commands */}
            <div className={`bg-gray-800 border border-gray-700 rounded-xl p-8 transition-all duration-500 ${
              animateSection === 'section2' ? 'ring-2 ring-purple-500 transform scale-105' : ''
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="flex items-center text-2xl font-bold">
                  <span className="flex items-center justify-center w-8 h-8 mr-4 text-sm font-bold bg-purple-600 rounded-full">2</span>
                  Essential Git Commands
                </h2>
                {isSectionCompleted('section2') && (
                  <div className="flex items-center text-green-400 animate-pulse">
                    <span className="mr-2">✅</span>
                    <span className="text-sm">Completed</span>
                  </div>
                )}
              </div>

              <p className="mb-6 text-gray-300">
                These 5 commands handle 90% of your daily Git usage. Let's see them in action:
              </p>

              {/* Interactive Command Sequence */}
              <div className="p-6 mb-6 border border-yellow-700 rounded-lg bg-yellow-900/20">
                <h3 className="mb-4 text-lg font-semibold text-yellow-300">🎯 Command Sequence Challenge</h3>
                <p className="mb-4 text-yellow-200">Drag the commands into the correct order for creating a new project:</p>
                
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Draggable Commands */}
                  <div>
                    <h4 className="mb-3 text-sm font-semibold text-gray-300">Available Commands (drag these):</h4>
                    <div className="space-y-2">
                      {[
                        { cmd: 'git push', order: 5, id: 'push' },
                        { cmd: 'git init', order: 1, id: 'init' },
                        { cmd: 'git commit', order: 4, id: 'commit' },
                        { cmd: 'git add', order: 3, id: 'add' },
                        { cmd: 'Create files', order: 2, id: 'create' }
                      ].map((command) => (
                        <div
                          key={command.id}
                          draggable
                          onDragStart={() => setDraggedCommand(command.id)}
                          className={`p-3 bg-purple-900/30 border border-purple-700 rounded-lg cursor-move hover:bg-purple-800/40 transition-all transform hover:scale-105 ${
                            draggedCommand === command.id ? 'opacity-50 rotate-3' : ''
                          }`}
                        >
                          <span className="font-mono text-purple-300">{command.cmd}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Drop Zones */}
                  <div>
                    <h4 className="mb-3 text-sm font-semibold text-gray-300">Correct Order (drop here):</h4>
                    <div className="space-y-2">
                      {[1,2,3,4,5].map((step) => (
                        <div
                          key={step}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault()
                            // Handle drop logic here
                            console.log(`Dropped ${draggedCommand} on step ${step}`)
                          }}
                          className="p-3 bg-gray-700/50 border-2 border-dashed border-gray-600 rounded-lg min-h-[50px] flex items-center justify-center text-gray-400 hover:border-green-500 transition-colors"
                        >
                          Step {step}: Drop command here
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Commands with Toggles */}
              <div className="space-y-6">
                {[
                  {
                    command: 'git init',
                    description: 'Start tracking a project',
                    example: '# Creates a new Git repository\ngit init my-first-website\n\n# Result: Creates .git folder to track changes',
                    icon: <Icons.Terminal />,
                    color: 'blue',
                    exerciseId: 'init',
                    challenge: 'Initialize a new repository called "my-portfolio"',
                    solution: 'git init my-portfolio'
                  },
                  {
                    command: 'git add',
                    description: 'Stage files for commit',
                    example: '# Add specific file\ngit add index.html\n\n# Add all files\ngit add .\n\n# Add multiple files\ngit add *.css *.js',
                    icon: <Icons.Code />,
                    color: 'green',
                    exerciseId: 'add',
                    challenge: 'Stage all files in your project for commit',
                    solution: 'git add .'
                  },
                  {
                    command: 'git commit',
                    description: 'Save a snapshot',
                    example: '# Save your changes with a message\ngit commit -m "Add homepage header"\n\n# More detailed commit\ngit commit -m "Add contact form\n\n- Added email validation\n- Styled with CSS\n- Added success message"',
                    icon: <Icons.CheckCircle />,
                    color: 'yellow',
                    exerciseId: 'commit',
                    challenge: 'Commit your changes with the message "Initial portfolio setup"',
                    solution: 'git commit -m "Initial portfolio setup"'
                  },
                  {
                    command: 'git push',
                    description: 'Upload to GitHub',
                    example: '# Send your commits to GitHub\ngit push origin main\n\n# First time push\ngit push -u origin main',
                    icon: <Icons.Rocket />,
                    color: 'purple',
                    exerciseId: 'push',
                    challenge: 'Push your repository to GitHub for the first time',
                    solution: 'git push -u origin main'
                  },
                  {
                    command: 'git pull',
                    description: 'Download latest changes',
                    example: '# Get updates from GitHub\ngit pull origin main\n\n# Pull and merge automatically\ngit pull',
                    icon: <Icons.GitBranch />,
                    color: 'indigo',
                    exerciseId: 'pull',
                    challenge: 'Pull the latest changes from the main branch',
                    solution: 'git pull origin main'
                  }
                ].map((cmd, idx) => (
                  <div key={idx} className="overflow-hidden transition-all border border-gray-600 rounded-lg hover:border-gray-500">
                    <div 
                      className={`bg-gray-700 px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-600 transition-colors`}
                      onClick={() => setActiveToggle(activeToggle === `cmd-${idx}` ? null : `cmd-${idx}`)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`text-${cmd.color}-400`}>{cmd.icon}</div>
                        <div>
                          <span className={`font-mono text-${cmd.color}-400 font-bold`}>{cmd.command}</span>
                          <span className="ml-4 text-gray-300">{cmd.description}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {codingCompleted.has(cmd.exerciseId) && (
                          <div className="flex items-center text-green-400">
                            <Icons.CheckCircle />
                            <span className="ml-1 text-sm">Completed</span>
                          </div>
                        )}
                        <button className="text-blue-400 transition-colors transform hover:text-blue-300">
                          <span className={`transform transition-transform duration-200 ${
                            activeToggle === `cmd-${idx}` ? 'rotate-90' : ''
                          }`}>
                            ▶
                          </span>
                        </button>
                      </div>
                    </div>
                    {activeToggle === `cmd-${idx}` && (
                      <div className="px-4 py-3 bg-gray-900 animate-slideDown">
                        <pre className="mb-4 font-mono text-sm text-green-400 whitespace-pre-wrap">
                          {cmd.example}
                        </pre>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              // Copy to clipboard logic
                              navigator.clipboard.writeText(cmd.command)
                            }}
                            className="px-3 py-1 text-xs text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
                          >
                            📋 Copy
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setCheckedItems(prev => new Set([...prev, `cmd-${idx}`]))
                            }}
                            className={`px-3 py-1 text-xs rounded transition-all ${
                              checkedItems.has(`cmd-${idx}`)
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                            }`}
                          >
                            {checkedItems.has(`cmd-${idx}`) ? '✅ Got it!' : '🎯 Mark as learned'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Progress indicator */}
              <div className="pt-4 mt-6 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    Commands learned: {Array.from(checkedItems).filter(id => id.startsWith('cmd-')).length}/5
                  </span>
                  <div className="w-32 h-2 overflow-hidden bg-gray-700 rounded-full">
                    <div 
                      className="h-full transition-all duration-500 bg-gradient-to-r from-purple-500 to-blue-500"
                      style={{ width: `${(Array.from(checkedItems).filter(id => id.startsWith('cmd-')).length / 5) * 100}%` }}
                    />
                  </div>
                </div>
                
                {Array.from(checkedItems).filter(id => id.startsWith('cmd-')).length === 5 && !isSectionCompleted('section2') && (
                  <button
                    onClick={() => markSectionCompleted('section2')}
                    className="w-full px-4 py-2 mt-4 font-semibold text-white transition-all transform bg-purple-600 rounded-lg hover:bg-purple-700 hover:scale-105 animate-pulse"
                  >
                    🎉 Complete Git Commands Section
                  </button>
                )}
              </div>
            </div>

            {/* Section 3: GitHub in Action */}
            <div className={`bg-gray-800 border border-gray-700 rounded-xl p-8 transition-all duration-500 ${
              animateSection === 'section3' ? 'ring-2 ring-green-500 transform scale-105' : ''
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="flex items-center text-2xl font-bold">
                  <span className="flex items-center justify-center w-8 h-8 mr-4 text-sm font-bold bg-green-600 rounded-full">3</span>
                  Your First GitHub Repository
                </h2>
                {isSectionCompleted('section3') && (
                  <div className="flex items-center text-green-400 animate-pulse">
                    <span className="mr-2">✅</span>
                    <span className="text-sm">Completed</span>
                  </div>
                )}
              </div>

              <p className="mb-6 text-gray-300">
                Let's create your first project and put it on GitHub. Follow this real example:
              </p>

              {/* Interactive Step Tracker */}
              <div className="p-6 mb-6 border border-green-700 rounded-lg bg-green-900/20">
                <h3 className="mb-4 text-lg font-semibold text-green-300">📝 Repository Creation Checklist</h3>
                <div className="space-y-4">
                  {[
                    { id: 'folder', text: 'Create project folder', command: 'mkdir my-portfolio && cd my-portfolio' },
                    { id: 'html', text: 'Create your first HTML file', command: 'echo "<h1>Welcome to My Portfolio</h1>" > index.html' },
                    { id: 'init', text: 'Initialize Git repository', command: 'git init' },
                    { id: 'add', text: 'Stage your files', command: 'git add index.html' },
                    { id: 'commit', text: 'Make your first commit', command: 'git commit -m "Initial commit: Add homepage"' },
                    { id: 'remote', text: 'Connect to GitHub', command: 'git remote add origin https://github.com/yourusername/my-portfolio.git' },
                    { id: 'push', text: 'Push to GitHub', command: 'git push -u origin main' }
                  ].map((step, idx) => (
                    <div key={step.id} className="flex items-start space-x-3">
                      <label className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={checkedItems.has(`step-${step.id}`)}
                          onChange={(e) => {
                            const id = `step-${step.id}`
                            if (e.target.checked) {
                              setCheckedItems(prev => new Set([...prev, id]))
                            } else {
                              setCheckedItems(prev => {
                                const newSet = new Set(prev)
                                newSet.delete(id)
                                return newSet
                              })
                            }
                          }}
                          className="w-5 h-5 text-green-600 transition-all bg-gray-700 border-gray-500 rounded focus:ring-green-500"
                        />
                        <span className={`ml-3 text-sm transition-all duration-300 ${
                          checkedItems.has(`step-${step.id}`) 
                            ? 'text-green-300 line-through' 
                            : 'text-gray-300 group-hover:text-white'
                        }`}>
                          {idx + 1}. {step.text}
                        </span>
                      </label>
                      <button
                        onClick={() => navigator.clipboard.writeText(step.command)}
                        className="px-2 py-1 text-xs text-gray-300 transition-colors bg-gray-700 rounded hover:bg-gray-600"
                        title="Copy command"
                      >
                        📋
                      </button>
                    </div>
                  ))}
                </div>
                
                {/* Progress bar */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">
                      Progress: {Array.from(checkedItems).filter(id => id.startsWith('step-')).length}/7 steps
                    </span>
                    <span className="text-sm text-green-400">
                      {Math.round((Array.from(checkedItems).filter(id => id.startsWith('step-')).length / 7) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-3 overflow-hidden bg-gray-700 rounded-full">
                    <div 
                      className="h-full transition-all duration-500 ease-out bg-gradient-to-r from-green-500 to-emerald-500"
                      style={{ width: `${(Array.from(checkedItems).filter(id => id.startsWith('step-')).length / 7) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 mb-6 bg-gray-900 border border-gray-600 rounded-lg">
                <div className="mb-4 font-mono text-sm text-green-400">Step-by-step: Creating "my-portfolio"</div>
                
                <div className="space-y-4 font-mono text-sm">
                  <div className={`transition-all duration-300 ${checkedItems.has('step-folder') ? 'opacity-60' : ''}`}>
                    <span className="text-blue-400"># 1. Create project folder</span>
                    <div className="text-gray-300">mkdir my-portfolio</div>
                    <div className="text-gray-300">cd my-portfolio</div>
                  </div>
                  
                  <div className={`transition-all duration-300 ${checkedItems.has('step-html') ? 'opacity-60' : ''}`}>
                    <span className="text-blue-400"># 2. Create your first HTML file</span>
                    <div className="text-gray-300">echo "&lt;h1&gt;Welcome to My Portfolio&lt;/h1&gt;" &gt; index.html</div>
                  </div>
                  
                  <div className={`transition-all duration-300 ${checkedItems.has('step-init') ? 'opacity-60' : ''}`}>
                    <span className="text-blue-400"># 3. Initialize Git</span>
                    <div className="text-gray-300">git init</div>
                  </div>
                  
                  <div className={`transition-all duration-300 ${checkedItems.has('step-add') ? 'opacity-60' : ''}`}>
                    <span className="text-blue-400"># 4. Add your file</span>
                    <div className="text-gray-300">git add index.html</div>
                  </div>
                  
                  <div className={`transition-all duration-300 ${checkedItems.has('step-commit') ? 'opacity-60' : ''}`}>
                    <span className="text-blue-400"># 5. Make your first commit</span>
                    <div className="text-gray-300">git commit -m "Initial commit: Add homepage"</div>
                  </div>
                  
                  <div className={`transition-all duration-300 ${checkedItems.has('step-remote') ? 'opacity-60' : ''}`}>
                    <span className="text-blue-400"># 6. Connect to GitHub (after creating repo there)</span>
                    <div className="text-gray-300">git remote add origin https://github.com/yourusername/my-portfolio.git</div>
                  </div>
                  
                  <div className={`transition-all duration-300 ${checkedItems.has('step-push') ? 'opacity-60' : ''}`}>
                    <span className="text-blue-400"># 7. Push to GitHub</span>
                    <div className="text-gray-300">git push -u origin main</div>
                  </div>
                </div>
              </div>

              <div className="p-4 mb-6 border border-yellow-700 rounded-lg bg-yellow-900/30">
                <div className="flex items-center mb-2">
                  <span className="mr-2 text-yellow-400">⚡</span>
                  <span className="font-semibold text-yellow-300">Pro Result:</span>
                </div>
                <p className="text-yellow-200">
                  Now your code is backed up forever, shareable with a link, and visible to potential employers!
                </p>
              </div>

              {/* Complete section button */}
              {Array.from(checkedItems).filter(id => id.startsWith('step-')).length === 7 && !isSectionCompleted('section3') && (
                <button
                  onClick={() => markSectionCompleted('section3')}
                  className="w-full px-4 py-3 font-semibold text-white transition-all transform bg-green-600 rounded-lg hover:bg-green-700 hover:scale-105 animate-bounce"
                >
                  🎉 Repository Creation Complete!
                </button>
              )}
            </div>

            {/* Section 4: Hands-On Coding Practice */}
            <div className={`bg-gray-800 border border-gray-700 rounded-xl p-8 transition-all duration-500 ${
              animateSection === 'section4' ? 'ring-2 ring-orange-500 transform scale-105' : ''
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="flex items-center text-2xl font-bold">
                  <span className="flex items-center justify-center w-8 h-8 mr-4 text-sm font-bold bg-orange-600 rounded-full">4</span>
                  Interactive Git Terminal
                </h2>
                {isSectionCompleted('section4') && (
                  <div className="flex items-center text-orange-400 animate-pulse">
                    <span className="mr-2">✅</span>
                    <span className="text-sm">Completed</span>
                  </div>
                )}
              </div>

              <p className="mb-6 text-gray-300">
                Time to code! Practice Git commands in this interactive terminal. Complete all exercises to master the basics.
              </p>

              {/* Interactive Terminal */}
              <div className="mb-6 overflow-hidden bg-black border border-gray-600 rounded-lg">
                <div className="flex items-center px-4 py-2 space-x-2 bg-gray-700">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="ml-4 text-sm text-gray-300">Git Practice Terminal</span>
                </div>
                
                <div className="p-4 overflow-y-auto h-80">
                  {/* Terminal Output */}
                  <div className="space-y-2 font-mono text-sm">
                    <div className="text-green-400">Welcome to Git Practice Terminal!</div>
                    <div className="text-gray-400">Type the commands below to practice. Current directory: ~/practice-repo</div>
                    <div className="text-gray-400">─────────────────────────────────────────────────────────</div>
                    
                    {terminalHistory.map((entry, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="text-blue-400">
                          <span className="text-green-400">user@computer</span>
                          <span className="text-white">:</span>
                          <span className="text-blue-400">~/practice-repo</span>
                          <span className="text-white">$ {entry.command}</span>
                        </div>
                        <div className="pl-4 text-gray-300 whitespace-pre-line">
                          {entry.output}
                        </div>
                      </div>
                    ))}
                    
                    {/* Current Input Line */}
                    <div className="flex items-center">
                      <span className="text-green-400">user@computer</span>
                      <span className="text-white">:</span>
                      <span className="text-blue-400">~/practice-repo</span>
                      <span className="text-white">$ </span>
                      <input
                        type="text"
                        value={currentCommand}
                        onChange={(e) => setCurrentCommand(e.target.value)}
                        onKeyDown={handleTerminalCommand}
                        className="flex-1 text-white bg-transparent outline-none"
                        placeholder="Type git command here..."
                        autoFocus
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Command Exercises */}
              <div className="space-y-6">
                <div className="p-6 border border-orange-700 rounded-lg bg-orange-900/20">
                  <h3 className="mb-4 text-lg font-semibold text-orange-300">🎯 Practice Exercises</h3>
                  
                  <div className="space-y-4">
                    {[
                      { 
                        id: 'ex1', 
                        task: 'Initialize a new Git repository', 
                        hint: 'Use git init',
                        expectedCommand: 'git init',
                        difficulty: 'Beginner'
                      },
                      { 
                        id: 'ex2', 
                        task: 'Check the status of your repository', 
                        hint: 'Use git status',
                        expectedCommand: 'git status',
                        difficulty: 'Beginner'
                      },
                      { 
                        id: 'ex3', 
                        task: 'Add all files to staging area', 
                        hint: 'Use git add with a special character',
                        expectedCommand: 'git add .',
                        difficulty: 'Beginner'
                      },
                      { 
                        id: 'ex4', 
                        task: 'Create your first commit', 
                        hint: 'Use git commit with -m flag and a message',
                        expectedCommand: 'git commit -m',
                        difficulty: 'Intermediate'
                      },
                      { 
                        id: 'ex5', 
                        task: 'View your commit history', 
                        hint: 'Use git log',
                        expectedCommand: 'git log',
                        difficulty: 'Intermediate'
                      }
                    ].map((exercise, idx) => (
                      <div key={exercise.id} className="p-4 border border-gray-600 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white">Exercise {idx + 1}: {exercise.task}</h4>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs rounded ${
                              exercise.difficulty === 'Beginner' 
                                ? 'bg-green-800 text-green-200' 
                                : 'bg-yellow-800 text-yellow-200'
                            }`}>
                              {exercise.difficulty}
                            </span>
                            {completedExercises.has(exercise.id) && (
                              <span className="text-green-400">✅</span>
                            )}
                          </div>
                        </div>
                        
                        <p className="mb-2 text-sm text-gray-400">💡 Hint: {exercise.hint}</p>
                        
                        <div className="p-2 font-mono text-sm bg-gray-900 rounded">
                          <span className="text-blue-400">Expected: </span>
                          <span className="text-gray-300">{exercise.expectedCommand}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress Tracking */}
                <div className="p-4 bg-gray-900 border border-gray-600 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-white">Coding Practice Progress</span>
                    <span className="text-orange-400">
                      {completedExercises.size}/5 exercises completed
                    </span>
                  </div>
                  
                  <div className="w-full h-3 overflow-hidden bg-gray-700 rounded-full">
                    <div 
                      className="h-full transition-all duration-500 ease-out bg-gradient-to-r from-orange-500 to-red-500"
                      style={{ width: `${(completedExercises.size / 5) * 100}%` }}
                    />
                  </div>
                  
                  <div className="mt-3 text-sm text-gray-400">
                    {completedExercises.size === 0 && "Start typing Git commands in the terminal above!"}
                    {completedExercises.size > 0 && completedExercises.size < 5 && "Great progress! Keep practicing."}
                    {completedExercises.size === 5 && "🎉 All exercises completed! You're ready for real Git usage."}
                  </div>
                </div>
              </div>

              {/* Complete section button */}
              {completedExercises.size === 5 && !isSectionCompleted('section4') && (
                <button
                  onClick={() => markSectionCompleted('section4')}
                  className="w-full px-4 py-3 mt-6 font-semibold text-white transition-all transform bg-orange-600 rounded-lg hover:bg-orange-700 hover:scale-105 animate-bounce"
                >
                  🚀 Git Practice Complete! Ready for Real Projects
                </button>
              )}
            </div>

            {/* Progress Dashboard */}
            {(isSectionCompleted('section1') || isSectionCompleted('section2') || isSectionCompleted('section3') || isSectionCompleted('section4')) && (
              <div className="p-8 mb-8 border border-blue-700 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl animate-slideIn">
                <h3 className="mb-6 text-2xl font-bold text-center text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                  🎯 Your Learning Progress
                </h3>
                
                <div className="grid gap-6 mb-6 md:grid-cols-4">
                  {/* Section Progress Cards */}
                  {[
                    { 
                      id: 'section1', 
                      title: 'Version Control Basics', 
                      icon: '📚', 
                      color: 'blue',
                      items: Array.from(checkedItems).filter(id => id.startsWith('section1-')).length,
                      total: 4
                    },
                    { 
                      id: 'section2', 
                      title: 'Git Commands', 
                      icon: '⚡', 
                      color: 'purple',
                      items: Array.from(checkedItems).filter(id => id.startsWith('cmd-')).length,
                      total: 5
                    },
                    { 
                      id: 'section3', 
                      title: 'GitHub Repository', 
                      icon: '🚀', 
                      color: 'green',
                      items: Array.from(checkedItems).filter(id => id.startsWith('step-')).length,
                      total: 7
                    },
                    { 
                      id: 'section4', 
                      title: 'Coding Practice', 
                      icon: '💻', 
                      color: 'orange',
                      items: completedExercises.size,
                      total: 5
                    }
                  ].map((section) => (
                    <div key={section.id} className={`bg-gray-800 border border-gray-700 rounded-lg p-6 text-center transform transition-all hover:scale-105 ${
                      isSectionCompleted(section.id) ? 'ring-2 ring-green-500' : ''
                    }`}>
                      <div className="mb-3 text-3xl">{section.icon}</div>
                      <h4 className="mb-2 font-semibold text-white">{section.title}</h4>
                      <div className={`text-2xl font-bold mb-2 ${
                        isSectionCompleted(section.id) ? 'text-green-400' : `text-${section.color}-400`
                      }`}>
                        {section.items}/{section.total}
                      </div>
                      <div className="w-full h-2 overflow-hidden bg-gray-700 rounded-full">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            isSectionCompleted(section.id) 
                              ? 'bg-green-500' 
                              : `bg-${section.color}-500`
                          }`}
                          style={{ width: `${(section.items / section.total) * 100}%` }}
                        />
                      </div>
                      {isSectionCompleted(section.id) && (
                        <div className="mt-2 text-sm text-green-400">✅ Complete!</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Overall Progress */}
                <div className="text-center">
                  <h4 className="mb-4 text-lg font-semibold text-white">Overall GitHub Mastery</h4>
                  <div className="max-w-md mx-auto">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">Sections Completed</span>
                      <span className="font-bold text-white">
                        {[isSectionCompleted('section1'), isSectionCompleted('section2'), isSectionCompleted('section3'), isSectionCompleted('section4')].filter(Boolean).length}/4
                      </span>
                    </div>
                    <div className="w-full h-4 mb-4 overflow-hidden bg-gray-700 rounded-full">
                      <div 
                        className="h-full transition-all duration-1000 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500"
                        style={{ 
                          width: `${([isSectionCompleted('section1'), isSectionCompleted('section2'), isSectionCompleted('section3'), isSectionCompleted('section4')].filter(Boolean).length / 4) * 100}%` 
                        }}
                      />
                    </div>
                    
                    {[isSectionCompleted('section1'), isSectionCompleted('section2'), isSectionCompleted('section3'), isSectionCompleted('section4')].filter(Boolean).length === 4 && (
                      <div className="p-4 border border-green-700 rounded-lg bg-green-900/30 animate-pulse">
                        <div className="mb-2 text-lg font-bold text-green-400">🎉 GitHub Master!</div>
                        <p className="text-sm text-green-300">
                          You've mastered the fundamentals! Ready to move on to HTML concepts.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Final Completion Section */}
            {[isSectionCompleted('section1'), isSectionCompleted('section2'), isSectionCompleted('section3'), isSectionCompleted('section4')].filter(Boolean).length >= 3 && (
              <div className="p-8 text-center border border-green-700 bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-xl animate-slideIn">
                <div className="mb-4 text-6xl">🎉</div>
                <h3 className="mb-4 text-3xl font-bold text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text">
                  GitHub Foundation Complete!
                </h3>
                <p className="mb-6 text-lg text-gray-300">
                  You've mastered version control, Git commands, repository creation, and professional workflows. 
                  You're ready to start building real projects!
                </p>
                
                <div className="max-w-md mx-auto mb-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <div className="font-bold text-green-400">Concepts Learned</div>
                      <div className="text-white">{Array.from(checkedItems).length} items</div>
                    </div>
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <div className="font-bold text-blue-400">Sections Complete</div>
                      <div className="text-white">
                        {[isSectionCompleted('section1'), isSectionCompleted('section2'), isSectionCompleted('section3'), isSectionCompleted('section4')].filter(Boolean).length}/4
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentPhase('concepts')}
                  className="px-8 py-4 text-lg font-bold text-white transition-all transform shadow-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-xl hover:scale-105"
                >
                  🚀 Start Learning HTML Concepts
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    )
  }

  // Concepts Learning Phase
  return (
    <div className="min-h-screen text-white bg-gray-900">
      {/* Modern Header */}
      <div className="sticky top-0 z-10 border-b bg-gray-800/80 backdrop-blur-sm border-gray-700/50">
        <div className="max-w-6xl px-6 py-4 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                <span className="font-bold text-white">H</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">HTML Concepts</h1>
                <p className="text-sm text-gray-400">Building your foundation</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-400">
                {currentConcept + 1} of {concepts.length}
              </div>
              <div className="w-32 h-2 overflow-hidden bg-gray-700 rounded-full">
                <div 
                  className="h-full transition-all duration-300 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ width: `${((currentConcept + 1) / concepts.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl px-6 py-8 mx-auto">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Concept Header */}
            <div className="p-8 bg-gray-800 border border-gray-700 shadow-sm rounded-2xl">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="mb-2 text-3xl font-bold text-white">
                    {currentConceptData.title}
                  </h2>
                  <p className="mb-3 text-lg font-medium text-blue-400">
                    {currentConceptData.subtitle}
                  </p>
                  <p className="text-lg text-gray-300">
                    {currentConceptData.description}
                  </p>
                </div>
                <div className="text-4xl text-gray-600 opacity-20">
                  {currentConcept + 1}
                </div>
              </div>

              {/* Content Sections */}
              <div className="space-y-6">
                {currentConceptData.content.map((paragraph, idx) => (
                  <p key={idx} className="text-lg leading-relaxed text-gray-300">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Interactive Blocks */}
            <div className="p-8 bg-gray-800 border border-gray-700 shadow-sm rounded-2xl">
              <h3 className="flex items-center mb-6 text-xl font-bold text-white">
                <span className="mr-3">🧩</span>
                Key Components
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {currentConceptData.interactiveBlocks.map((block) => (
                  <div
                    key={block.id}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      activeToggle === block.id
                        ? 'border-blue-500 bg-blue-900/30 transform scale-105'
                        : 'border-gray-600 hover:border-gray-500 hover:shadow-md bg-gray-700/30'
                    }`}
                    onClick={() => setActiveToggle(activeToggle === block.id ? null : block.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{block.icon}</span>
                      <div>
                        <h4 className="mb-2 font-semibold text-white">{block.title}</h4>
                        <p className="text-sm text-gray-300">{block.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Example */}
            <div className="overflow-hidden bg-gray-800 border border-gray-700 shadow-sm rounded-2xl">
              <div className="px-6 py-4 border-b border-gray-700 bg-gray-700/50">
                <h3 className="flex items-center font-semibold text-white">
                  <span className="mr-2">💻</span>
                  {currentConceptData.codeExample.title}
                </h3>
              </div>
              <div className="p-6">
                <div className="p-4 mb-4 bg-gray-900 rounded-lg">
                  <pre className="overflow-x-auto font-mono text-sm text-green-400">
                    <code>{currentConceptData.codeExample.code}</code>
                  </pre>
                </div>
                <p className="text-gray-300">{currentConceptData.codeExample.explanation}</p>
                
                <button
                  onClick={() => setShowExample(!showExample)}
                  className="px-4 py-2 mt-4 font-medium text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                >
                  {showExample ? 'Hide Preview' : 'Show Live Preview'}
                </button>

                {showExample && (
                  <div className="p-4 mt-4 border border-gray-600 rounded-lg bg-gray-700/30">
                    <h4 className="mb-2 font-medium text-gray-300">Live Result:</h4>
                    <div 
                      className="p-4 text-black bg-white border rounded"
                      dangerouslySetInnerHTML={{ 
                        __html: currentConceptData.codeExample.code.replace(/<!--.*?-->/g, '') 
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentConcept(Math.max(0, currentConcept - 1))}
                disabled={currentConcept === 0}
                className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
                  currentConcept === 0
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                ← Previous
              </button>

              {currentConcept === concepts.length - 1 ? (
                <button
                  onClick={() => {
                    setCompletedConcepts(prev => new Set([...prev, currentConcept]))
                    setCurrentPhase('mastery')
                  }}
                  className="px-8 py-3 font-semibold text-white transition-all duration-200 transform bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl hover:scale-105"
                >
                  Ready for Mastery Lab! 🚀
                </button>
              ) : (
                <button
                  onClick={() => {
                    setCompletedConcepts(prev => new Set([...prev, currentConcept]))
                    setCurrentConcept(currentConcept + 1)
                    setShowExample(false)
                    setActiveToggle(null)
                  }}
                  className="px-6 py-3 font-semibold text-white transition-colors bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl"
                >
                  Next Concept →
                </button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Overview */}
            <div className="p-6 bg-gray-800 border border-gray-700 shadow-sm rounded-xl">
              <h3 className="mb-4 font-semibold text-white">Your Progress</h3>
              <div className="space-y-3">
                {concepts.map((concept, idx) => (
                  <div
                    key={concept.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      completedConcepts.has(idx)
                        ? 'bg-green-900/30 border border-green-700'
                        : currentConcept === idx
                        ? 'bg-blue-900/30 border border-blue-700'
                        : 'hover:bg-gray-700/50'
                    }`}
                    onClick={() => setCurrentConcept(idx)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      completedConcepts.has(idx)
                        ? 'bg-green-500 text-white'
                        : currentConcept === idx
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-600 text-gray-300'
                    }`}>
                      {completedConcepts.has(idx) ? '✓' : idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">
                        {concept.title}
                      </div>
                      <div className="text-xs text-gray-400">
                        {concept.subtitle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="p-6 border border-yellow-700 bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-xl">
              <h3 className="flex items-center mb-3 font-semibold text-white">
                <span className="mr-2">💡</span>
                Pro Tip
              </h3>
              <p className="text-sm text-yellow-200">
                Don't worry about memorizing everything! Focus on understanding the concepts. 
                You'll practice writing actual code in the Mastery Lab next.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
