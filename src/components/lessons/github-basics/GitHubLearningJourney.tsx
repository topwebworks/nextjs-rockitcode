'use client'

import React, { useState, useEffect } from 'react'
import HTMLMastery from '../HTMLMastery'
import { AuthButton } from '@/components/rockitcode/auth-button'
import { useUser } from '@/contexts/UserContext'
import RockitAssistant from '../shared/RockitAssistant'
import { Icons } from '../shared/Icons'
import GitInstallation from './chapters/GitInstallation'
import VersionControl from './chapters/VersionControl'
import GitCommands from './chapters/GitCommands'
import GitHubRepo from './chapters/GitHubRepo'
import HandsOnPractice from './chapters/HandsOnPractice'

interface GitHubLearningJourneyProps {
  onComplete?: () => void
  showBackButton?: boolean
  onBack?: () => void
}

// Complete GitHub Learning Journey: Setup → Concepts → Getting Started
export default function GitHubLearningJourney({
  onComplete,
  showBackButton = false,
  onBack
}: GitHubLearningJourneyProps) {
  const { user, isLoading } = useUser()
  const [currentPhase, setCurrentPhase] = useState<'setup' | 'concepts' | 'getting-started'>('setup')
  const [currentConcept, setCurrentConcept] = useState(0)
  const [completedConcepts, setCompletedConcepts] = useState<Set<number>>(new Set())
  const [showExample, setShowExample] = useState(false)
  const [activeToggle, setActiveToggle] = useState<string | null>(null)
  
  // New interactive component states
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [draggedCommand, setDraggedCommand] = useState<string | null>(null)
  const [commandSequence, setCommandSequence] = useState<(string | null)[]>([null, null, null, null, null])
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

  // Rockit assistant states
  const [rockitVisible, setRockitVisible] = useState(true)
  const [rockitExpanded, setRockitExpanded] = useState(false)
  const [rockitHidden, setRockitHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null)

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
    
    // If this is the final section, call onComplete
    if (sectionId === 'section4' && onComplete) {
      // Small delay to ensure animation completes
      setTimeout(() => {
        onComplete()
      }, 1000)
    }
  }

  // Rockit assistant functions
  const getCurrentSection = () => {
    const sectionsCount = [0, 1, 2, 3, 4].filter(i => isSectionCompleted(`section${i}`)).length
    return sectionsCount
  }

  const getTotalProgress = () => {
    const totalSections = 5
    return Math.round((getCurrentSection() / totalSections) * 100)
  }

  const getCurrentSectionName = () => {
    if (!isSectionCompleted('section0')) return 'Installing Git'
    if (!isSectionCompleted('section1')) return 'Version Control Basics'
    if (!isSectionCompleted('section2')) return 'Git Commands'
    if (!isSectionCompleted('section3')) return 'GitHub Repository'
    if (!isSectionCompleted('section4')) return 'Hands-On Practice'
    return 'All Complete!'
  }

  const getNextAction = () => {
    if (!isSectionCompleted('section0')) {
      const installSteps = Array.from(checkedItems).filter(id => id.startsWith('install-')).length
      if (installSteps < 3) return 'Choose an installation method'
      if (!checkedItems.has('install-verify-install')) return 'Verify Git installation'
      return 'Complete setup configuration'
    }
    if (!isSectionCompleted('section1')) return 'Learn about version control'
    if (!isSectionCompleted('section2')) return 'Practice Git commands'
    if (!isSectionCompleted('section3')) return 'Create your first repository'
    if (!isSectionCompleted('section4')) return 'Try the interactive terminal'
    return 'Congratulations! 🎉'
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionNum: number) => {
    const element = document.querySelector(`[data-section="section${sectionNum}"]`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Handle scroll behavior for Rockit
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Hide during fast scrolling
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        setRockitVisible(false)
        setRockitExpanded(false)
      }
      
      // Show after scroll stops
      if (scrollTimeout) clearTimeout(scrollTimeout)
      const timeout = setTimeout(() => {
        if (!rockitHidden) setRockitVisible(true)
      }, 150)
      setScrollTimeout(timeout)
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [lastScrollY, rockitHidden, scrollTimeout])

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

  // Phase control - Setup phase contains the GitHub sections
  if (currentPhase === 'setup') {
    return (
      <div className="min-h-screen text-white bg-gray-900">
        <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
        
        <RockitAssistant
          rockitVisible={rockitVisible}
          rockitExpanded={rockitExpanded}
          rockitHidden={rockitHidden}
          setRockitExpanded={setRockitExpanded}
          setRockitHidden={setRockitHidden}
          getCurrentSection={getCurrentSection}
          getTotalProgress={getTotalProgress}
          getCurrentSectionName={getCurrentSectionName}
          getNextAction={getNextAction}
          scrollToTop={scrollToTop}
          scrollToSection={scrollToSection}
          isSectionCompleted={isSectionCompleted}
        />
        
        {/* Back Button */}
        {showBackButton && onBack && (
          <div className="px-6 pt-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 text-gray-300 transition-colors hover:text-white hover:bg-gray-800 rounded-lg"
            >
              <Icons.ArrowLeft />
              <span>Back to Course Overview</span>
            </button>
          </div>
        )}
        
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
                    Git & GitHub Basics
                  </h1>
                  <p className="text-lg text-blue-200">
                    Learn the fundamentals of version control and collaborative coding
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
                    <Icons.GitBranch />
                    <span className="font-semibold">Version Control</span>
                  </div>
                  <p className="text-sm text-white/80">Learn to track changes and collaborate effectively</p>
                </div>
                
                <div className="p-4 border rounded-lg bg-white/10 backdrop-blur-sm border-white/20">
                  <div className="flex items-center gap-2 mb-2 text-purple-300">
                    <Icons.Rocket />
                    <span className="font-semibold">Real Projects</span>
                  </div>
                  <p className="text-sm text-white/80">Build a portfolio that showcases your skills</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 py-12">
          <div className="max-w-4xl mx-auto">
            {/* User Status */}
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

            {/* Interactive Learning Sections */}
            <div className="mt-12 space-y-12">
              
              {/* Section 0: Installing Git */}
              <GitInstallation
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
                animateSection={animateSection}
                isSectionCompleted={isSectionCompleted}
                markSectionCompleted={markSectionCompleted}
                triggerAnimation={triggerAnimation}
              />

              {/* Section 1: Version Control */}
              <VersionControl
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
                quizAnswers={quizAnswers}
                setQuizAnswers={setQuizAnswers}
                animateSection={animateSection}
                isSectionCompleted={isSectionCompleted}
                markSectionCompleted={markSectionCompleted}
              />

              {/* Section 2: Git Commands */}
              <GitCommands
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
                activeToggle={activeToggle}
                setActiveToggle={setActiveToggle}
                codingCompleted={codingCompleted}
                draggedCommand={draggedCommand}
                setDraggedCommand={setDraggedCommand}
                commandSequence={commandSequence}
                setCommandSequence={setCommandSequence}
                animateSection={animateSection}
                isSectionCompleted={isSectionCompleted}
                markSectionCompleted={markSectionCompleted}
                triggerAnimation={triggerAnimation}
              />

              {/* Section 3: GitHub Repository */}
              <GitHubRepo
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
                animateSection={animateSection}
                isSectionCompleted={isSectionCompleted}
                markSectionCompleted={markSectionCompleted}
              />

              {/* Section 4: Interactive Terminal */}
              <HandsOnPractice
                terminalHistory={terminalHistory}
                currentCommand={currentCommand}
                setCurrentCommand={setCurrentCommand}
                completedExercises={completedExercises}
                handleTerminalCommand={handleTerminalCommand}
                animateSection={animateSection}
                isSectionCompleted={isSectionCompleted}
                markSectionCompleted={markSectionCompleted}
              />

            </div>
          </div>
        </div>
      </div>
    )
  }

  // Concepts phase
  if (currentPhase === 'concepts') {
    // TODO: Extract the concepts section to a separate component
    return (
      <div className="min-h-screen text-white bg-gray-900">
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold">HTML Concepts Section</h1>
          <p className="text-gray-300">This section will be extracted next...</p>
          <button
            onClick={() => setCurrentPhase('getting-started')}
            className="px-6 py-3 mt-4 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Continue Learning →
          </button>
        </div>
      </div>
    )
  }

  // Getting started phase
  if (currentPhase === 'getting-started') {
    return <HTMLMastery />
  }

  // Default fallback (shouldn't reach here)
  return null
}
