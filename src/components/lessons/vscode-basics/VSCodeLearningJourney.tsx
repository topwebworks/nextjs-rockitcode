'use client'

import React, { useState, useEffect } from 'react'
import HTMLMastery from '../HTMLMastery'
import { AuthButton } from '@/components/rockitcode/auth-button'
import { useUser } from '@/contexts/UserContext'
import RockitAssistant from '../shared/RockitAssistant'
import { Icons } from '../shared/Icons'
import VSCodeInstallation from './chapters/VSCodeInstallation'
import WorkspaceSetup from './chapters/WorkspaceSetup'
import ExtensionsManagement from './chapters/ExtensionsManagement'
import TerminalBasics from './chapters/TerminalBasics'
import DevToolsIntegration from './chapters/DevToolsIntegration'

interface VSCodeLearningJourneyProps {
  onComplete?: () => void
  showBackButton?: boolean
  onBack?: () => void
}

// Complete VSCode Learning Journey: Setup → Concepts → Getting Started
export default function VSCodeLearningJourney({ 
  onComplete, 
  showBackButton = false, 
  onBack 
}: VSCodeLearningJourneyProps = {}) {
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
    if (sectionId === 'section5' && onComplete) {
      // Small delay to ensure animation completes
      setTimeout(() => {
        onComplete()
      }, 1000)
    }
  }

  // Rockit assistant functions
  const getCurrentSection = () => {
    const sectionsCount = [1, 2, 3, 4, 5].filter(i => isSectionCompleted(`section${i}`)).length
    return sectionsCount
  }

  const getTotalProgress = () => {
    const totalSections = 5
    return Math.round((getCurrentSection() / totalSections) * 100)
  }

  const getCurrentSectionName = () => {
    if (!isSectionCompleted('section1')) return 'Chapter 1: Installing VSCode'
    if (!isSectionCompleted('section2')) return 'Chapter 2: Workspace Setup'
    if (!isSectionCompleted('section3')) return 'Chapter 3: Extensions Management'
    if (!isSectionCompleted('section4')) return 'Chapter 4: Terminal Basics'
    if (!isSectionCompleted('section5')) return 'Chapter 5: DevTools Integration'
    return 'All Complete!'
  }

  const getNextAction = () => {
    if (!isSectionCompleted('section1')) {
      const installSteps = Array.from(checkedItems).filter(id => id.startsWith('install-')).length
      if (installSteps < 3) return 'Choose an installation method'
      if (!checkedItems.has('install-verify-install')) return 'Verify VSCode installation'
      return 'Complete setup configuration'
    }
    if (!isSectionCompleted('section2')) return 'Learn workspace management'
    if (!isSectionCompleted('section3')) return 'Install essential extensions'
    if (!isSectionCompleted('section4')) return 'Master the integrated terminal'
    if (!isSectionCompleted('section5')) return 'Set up development tools'
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
      
      // Simulate VSCode command responses
      let output = ''
      let exerciseCompleted = ''
      
      if (command === 'code --version') {
        output = `1.85.1
f1b07bd25dfad64b0167beb15359ae573aecd2cc
x64`
        exerciseCompleted = 'ex1'
      } else if (command === 'code .' || command === 'code ./') {
        output = 'Opening current directory in VS Code...'
        exerciseCompleted = 'ex2'
      } else if (command === 'code --install-extension ms-vscode.live-server') {
        output = `Installing extension 'ms-vscode.live-server'...
Extension 'ms-vscode.live-server' v0.4.8 was successfully installed.`
        exerciseCompleted = 'ex3'
      } else if (command === 'npm init -y') {
        output = `Wrote to ${process.cwd()}/package.json:

{
  "name": "my-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}`
        exerciseCompleted = 'ex4'
      } else if (command === 'ls' || command === 'dir') {
        output = `index.html
style.css
script.js
README.md`
        exerciseCompleted = 'ex5'
      } else if (command === 'clear' || command === 'cls') {
        setTerminalHistory([])
        setCurrentCommand('')
        return
      } else {
        output = `Command '${command}' not recognized. Try these VSCode commands:
   code --version    Check VSCode version
   code .           Open current folder in VSCode
   code filename    Open specific file
   npm init -y      Initialize new Node.js project
   ls / dir         List directory contents`
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

  const vscodeFeatures = [
    {
      icon: '💻',
      title: 'Code with Intelligence',
      description: 'Smart code completion, error detection, and suggestions as you type',
      benefit: 'Write code faster and with fewer bugs'
    },
    {
      icon: '🔧',
      title: 'Powerful Extensions',
      description: 'Add languages, themes, debuggers, and tools to customize your workflow',
      benefit: 'Turn VSCode into the perfect editor for any technology'
    },
    {
      icon: '📁',
      title: 'Project Management',
      description: 'Organize files, manage multiple projects, and navigate large codebases',
      benefit: 'Stay organized and productive in complex projects'
    },
    {
      icon: '🖥️',
      title: 'Integrated Terminal',
      description: 'Run commands, scripts, and development tools without leaving the editor',
      benefit: 'Streamline your development workflow'
    },
    {
      icon: '🔍',
      title: 'Basic Debugging',
      description: 'Learn to set breakpoints and inspect your code',
      benefit: 'Start finding and fixing basic coding issues'
    },
    {
      icon: '🌐',
      title: 'Live Development',
      description: 'See changes instantly with live reload and browser integration',
      benefit: 'Develop web applications with immediate feedback'
    }
  ]

  const quickStartSteps = [
    {
      step: '1',
      title: 'Download & Install VSCode',
      description: 'Get the free editor from code.visualstudio.com',
      tip: 'Choose the stable version for the most reliable experience'
    },
    {
      step: '2', 
      title: 'Open Your Project Folder',
      description: 'Use File > Open Folder to load your project',
      tip: 'VSCode works best when you open the entire project folder'
    },
    {
      step: '3',
      title: 'Install Essential Extensions',
      description: 'Add Live Server, Prettier, and language support',
      tip: 'Extensions make VSCode incredibly powerful'
    },
    {
      step: '4',
      title: 'Start Coding',
      description: 'Create files, write code, and use the integrated terminal',
      tip: 'Use Ctrl+` to open the terminal quickly'
    }
  ]

  // Phase control - Setup phase contains the VSCode sections
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
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative px-6 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 border bg-white/10 rounded-xl backdrop-blur-sm border-white/20">
                  <Icons.Code />
                </div>
                <div>
                  <h1 className="mb-2 text-4xl font-bold text-white">
                    VSCode Getting Started
                  </h1>
                  <p className="text-lg text-blue-200">
                    Learn the fundamentals of the world's most popular code editor
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-3">
                <div className="p-4 border rounded-lg bg-white/10 backdrop-blur-sm border-white/20">
                  <div className="flex items-center gap-2 mb-2 text-emerald-300">
                    <Icons.Code />
                    <span className="font-semibold">Smart Editing</span>
                  </div>
                  <p className="text-sm text-white/80">Intelligent code completion and error detection</p>
                </div>
                
                <div className="p-4 border rounded-lg bg-white/10 backdrop-blur-sm border-white/20">
                  <div className="flex items-center gap-2 mb-2 text-blue-300">
                    <Icons.Terminal />
                    <span className="font-semibold">Integrated Tools</span>
                  </div>
                  <p className="text-sm text-white/80">Terminal, debugger, and extensions all in one place</p>
                </div>
                
                <div className="p-4 border rounded-lg bg-white/10 backdrop-blur-sm border-white/20">
                  <div className="flex items-center gap-2 mb-2 text-purple-300">
                    <Icons.Rocket />
                    <span className="font-semibold">Live Development</span>
                  </div>
                  <p className="text-sm text-white/80">See your changes instantly with live preview</p>
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
                  Welcome: {user.user_metadata?.full_name || user.email?.split('@')[0]}
                </h3>
                <p className="mb-4 text-green-300">
                  Ready to master VSCode? Let's build your development environment!
                </p>
                <button
                  onClick={() => window.location.href = '/foundation/'}
                  className="px-6 py-3 font-semibold text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                >
                  Continue to Next Course →
                </button>
              </div>
            ) : (
              <div className="p-6 text-center bg-gray-800 border border-gray-700 rounded-xl">
                <h3 className="mb-4 text-xl font-bold">Connect Your Account</h3>
                <p className="mb-6 text-gray-300">
                  Sign in to track your progress and save your work
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
              
              {/* Chapter 1: Installing VSCode */}
              <VSCodeInstallation
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
                animateSection={animateSection}
                isSectionCompleted={isSectionCompleted}
                markSectionCompleted={markSectionCompleted}
                triggerAnimation={triggerAnimation}
              />

              {/* Chapter 2: Workspace Setup */}
              <WorkspaceSetup
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
                quizAnswers={quizAnswers}
                setQuizAnswers={setQuizAnswers}
                animateSection={animateSection}
                isSectionCompleted={isSectionCompleted}
                markSectionCompleted={markSectionCompleted}
              />

              {/* Chapter 3: Extensions Management */}
              <ExtensionsManagement
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

              {/* Chapter 4: Terminal Basics */}
              <TerminalBasics
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
                animateSection={animateSection}
                isSectionCompleted={isSectionCompleted}
                markSectionCompleted={markSectionCompleted}
              />

              {/* Chapter 5: DevTools Integration */}
              <DevToolsIntegration
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
