'use client'

import { useState } from 'react'

// Interactive Components for engaging learning
const ProgressBar = ({ current, total, title }: { current: number; total: number; title: string }) => (
  <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
    <div className="flex justify-between items-center mb-2">
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <span className="text-sm text-gray-600">{current}/{total}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  </div>
)

const InteractiveLab = ({ title, challenge, initialCode, solution, onComplete }: any) => {
  const [code, setCode] = useState(initialCode)
  const [isCorrect, setIsCorrect] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [showHint, setShowHint] = useState(false)

  const checkCode = () => {
    setAttempts(prev => prev + 1)
    // Simple check - in real implementation would be more sophisticated
    const isMatch = code.trim().toLowerCase().includes(solution.toLowerCase())
    setIsCorrect(isMatch)
    if (isMatch && onComplete) {
      onComplete()
    }
  }

  return (
    <div className="my-8 border border-gray-200 rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 border-b">
        <h4 className="font-semibold text-gray-800 flex items-center gap-2">
          🧪 {title}
          {isCorrect && <span className="text-green-600">✅ Complete!</span>}
        </h4>
        <p className="text-sm text-gray-600 mt-1">{challenge}</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-0">
        {/* Code Editor */}
        <div className="p-4 bg-gray-900">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-32 bg-gray-800 text-green-400 font-mono text-sm p-3 rounded resize-none"
            placeholder="Type your HTML here..."
          />
          <div className="mt-2 flex gap-2">
            <button
              onClick={checkCode}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Test Code
            </button>
            {attempts > 0 && !isCorrect && (
              <button
                onClick={() => setShowHint(!showHint)}
                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
              >
                💡 Hint
              </button>
            )}
          </div>
        </div>

        {/* Live Preview */}
        <div className="p-4 bg-white border-l">
          <h5 className="font-medium text-gray-700 mb-2">Live Preview:</h5>
          <div className="border border-gray-200 rounded p-2 min-h-[100px] bg-gray-50">
            <iframe
              srcDoc={code}
              className="w-full h-24 border-none"
              title="Preview"
              sandbox="allow-same-origin"
            />
          </div>
          {showHint && (
            <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
              💡 <strong>Hint:</strong> Try adding a {solution} element!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const CodePuzzle = ({ title, question, options, correct, onComplete }: any) => {
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (index: number) => {
    setSelected(index)
    setShowResult(true)
    if (index === correct && onComplete) {
      setTimeout(onComplete, 1500)
    }
  }

  return (
    <div className="my-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
      <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
        🧩 {title}
      </h4>
      <p className="text-gray-700 mb-4">{question}</p>
      
      <div className="space-y-2">
        {options.map((option: string, index: number) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={showResult}
            className={`w-full text-left p-3 rounded-lg border transition-all ${
              !showResult 
                ? 'border-gray-200 hover:border-purple-300 hover:bg-purple-50' 
                : selected === index
                  ? index === correct 
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-red-500 bg-red-50 text-red-800'
                  : index === correct
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-gray-200 bg-gray-50 text-gray-500'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      
      {showResult && selected === correct && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          🎉 <strong>Excellent!</strong> You're getting the hang of HTML!
        </div>
      )}
    </div>
  )
}

const AchievementBadge = ({ title, description, earned = false }: any) => (
  <div className={`p-3 rounded-lg border ${
    earned 
      ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300' 
      : 'bg-gray-50 border-gray-200'
  }`}>
    <div className="text-2xl mb-1">{earned ? '🏆' : '🔒'}</div>
    <h5 className={`font-medium ${earned ? 'text-yellow-800' : 'text-gray-500'}`}>
      {title}
    </h5>
    <p className={`text-sm ${earned ? 'text-yellow-700' : 'text-gray-400'}`}>
      {description}
    </p>
  </div>
)

export default function HtmlBasicsInteractive() {
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set())
  const [currentSection, setCurrentSection] = useState(0)
  
  const completeSection = (sectionId: string) => {
    setCompletedSections(prev => new Set([...prev, sectionId]))
    if (currentSection < 5) setCurrentSection(prev => prev + 1)
  }

  const totalSections = 6
  const progress = completedSections.size

  return (
    <div className="lesson-content max-w-4xl mx-auto">
      {/* Progress & Gamification Header */}
      <div className="mb-8">
        <ProgressBar 
          current={progress} 
          total={totalSections} 
          title="HTML Basics Mastery"
        />
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <AchievementBadge 
            title="First Element" 
            description="Create your first HTML element"
            earned={completedSections.has('first-element')}
          />
          <AchievementBadge 
            title="Structure Master" 
            description="Build a complete HTML document"
            earned={completedSections.has('html-structure')}
          />
          <AchievementBadge 
            title="Content Creator" 
            description="Add meaningful content to your page"
            earned={completedSections.has('content-creation')}
          />
        </div>
      </div>

      {/* Mission Briefing */}
      <section className="mb-12 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🚀</div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Mission: Build Your First Web Page
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              Welcome to your first coding mission! You're about to learn the secret language that powers every website on the internet. 
              By the end of this lesson, you'll have built your very own web page from scratch.
            </p>
            <div className="bg-white/70 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">🎯 Mission Objectives:</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✅ Understand what HTML is and why it's important</li>
                <li>✅ Learn the basic building blocks of web pages</li>
                <li>✅ Create your first HTML document</li>
                <li>✅ Add content that shows in a web browser</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: What is HTML? */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="text-3xl">🧱</span>
          Discovery: What is HTML?
        </h2>
        
        <div className="prose prose-lg mb-6">
          <p>
            Imagine you're building a house. Before you can paint the walls or add furniture, you need to build the frame - 
            the basic structure that holds everything together. <strong>HTML</strong> is like that frame for websites!
          </p>
          
          <p>
            HTML stands for <strong>HyperText Markup Language</strong>. It's a special code that tells web browsers 
            how to display content. Every website you've ever visited - Google, YouTube, TikTok - they all start with HTML.
          </p>
        </div>

        <CodePuzzle
          title="Quick Check: HTML Knowledge"
          question="What does HTML provide for websites?"
          options={[
            "🎨 Colors and fancy styling",
            "🧱 Basic structure and content organization", 
            "⚡ Interactive buttons and animations",
            "🔐 Security and passwords"
          ]}
          correct={1}
          onComplete={() => completeSection('html-understanding')}
        />
      </section>

      {/* Section 2: HTML Elements */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="text-3xl">🔤</span>
          Elements: The Building Blocks
        </h2>
        
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">HTML Elements Work Like Containers</h3>
          <p className="text-gray-700 mb-4">
            Think of HTML elements like labeled boxes. Each box has an opening tag <code>&lt;box&gt;</code> and 
            a closing tag <code>&lt;/box&gt;</code>, with content in between.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-3 rounded border">
              <strong>Headings:</strong><br/>
              <code>&lt;h1&gt;Big Title&lt;/h1&gt;</code>
            </div>
            <div className="bg-white p-3 rounded border">
              <strong>Paragraphs:</strong><br/>
              <code>&lt;p&gt;Some text&lt;/p&gt;</code>
            </div>
            <div className="bg-white p-3 rounded border">
              <strong>Links:</strong><br/>
              <code>&lt;a&gt;Click me&lt;/a&gt;</code>
            </div>
          </div>
        </div>

        <InteractiveLab
          title="Your First Element Challenge"
          challenge="Create an h1 heading that says 'Hello World!' - this is a classic first step in programming!"
          initialCode="<!-- Write your h1 element here -->\n"
          solution="<h1>"
          onComplete={() => completeSection('first-element')}
        />
      </section>

      {/* Section 3: Document Structure */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="text-3xl">🏗️</span>
          Structure: Building a Complete Page
        </h2>
        
        <div className="prose prose-lg mb-6">
          <p>
            Every HTML document follows the same basic pattern - like a template. Think of it as the foundation, 
            frame, and rooms of a house:
          </p>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-6">
{`<!DOCTYPE html>          ← "This is an HTML5 document"
<html>                   ← The root container
  <head>                 ← Information about the page
    <title>Page Title</title>  ← What shows in browser tab
  </head>
  <body>                 ← All visible content goes here
    <h1>Welcome!</h1>    ← Your actual content
  </body>
</html>`}
        </div>

        <InteractiveLab
          title="Build Your Document Structure"
          challenge="Create a complete HTML document with a title 'My First Page' and an h1 heading that says 'I'm learning HTML!'"
          initialCode={`<!DOCTYPE html>
<html>
<head>
    <!-- Add your title here -->
</head>
<body>
    <!-- Add your heading here -->
</body>
</html>`}
          solution="<title>"
          onComplete={() => completeSection('html-structure')}
        />
      </section>

      {/* Section 4: Adding Content */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="text-3xl">✍️</span>
          Content: Making Your Page Interesting
        </h2>

        <div className="prose prose-lg mb-6">
          <p>
            Now for the fun part - adding content! Let's add some paragraphs, different heading sizes, 
            and make your page tell a story about you.
          </p>
        </div>

        <InteractiveLab
          title="Create Your About Me Section"
          challenge="Add a paragraph that introduces yourself and explains what you want to learn about coding!"
          initialCode={`<h1>About Me</h1>
<!-- Add your paragraph here -->
`}
          solution="<p>"
          onComplete={() => completeSection('content-creation')}
        />
      </section>

      {/* Final Challenge */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="text-3xl">🎯</span>
          Final Mission: Complete Your First Web Page
        </h2>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">🏆 Master Challenge</h3>
          <p className="text-gray-700 mb-4">
            Time to combine everything you've learned! Create a complete HTML page that includes:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✅ Complete HTML document structure</li>
            <li>✅ A descriptive title in the head</li>
            <li>✅ An h1 main heading</li>
            <li>✅ At least 2 paragraphs about yourself</li>
            <li>✅ An h2 subheading for a section</li>
          </ul>
        </div>

        <InteractiveLab
          title="Master Challenge: Your Complete Web Page"
          challenge="Build a complete personal webpage using everything you've learned. Make it uniquely yours!"
          initialCode={`<!DOCTYPE html>
<html>
<head>
    <!-- Your page title here -->
</head>
<body>
    <!-- Build your personal page here! -->
    
</body>
</html>`}
          solution="<h1>"
          onComplete={() => completeSection('master-challenge')}
        />
      </section>

      {/* Completion Celebration */}
      {completedSections.size >= 5 && (
        <section className="mb-12 p-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-200">
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mission Accomplished!</h2>
            <p className="text-lg text-gray-700 mb-6">
              Congratulations! You've just created your first web page using HTML. You're now officially a web developer!
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <div className="text-2xl mb-2">🧠</div>
                <h3 className="font-semibold text-gray-800">You Learned</h3>
                <p className="text-sm text-gray-600">HTML structure, elements, and content creation</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="text-2xl mb-2">🛠️</div>
                <h3 className="font-semibold text-gray-800">You Built</h3>
                <p className="text-sm text-gray-600">A complete HTML web page from scratch</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-purple-200">
                <div className="text-2xl mb-2">🚀</div>
                <h3 className="font-semibold text-gray-800">You're Ready For</h3>
                <p className="text-sm text-gray-600">CSS styling and making your page beautiful</p>
              </div>
            </div>

            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105">
              🎯 Continue to CSS Basics →
            </button>
          </div>
        </section>
      )}
    </div>
  )
}

// Lesson metadata
export const metadata = {
  title: "HTML Basics: Interactive Web Building Adventure",
  description: "Learn HTML through hands-on challenges, interactive labs, and gamified progression - no videos needed!",
  estimatedTime: 45,
  difficulty: "beginner" as const,
  technologies: ["HTML5"],
  interactionTypes: ["code-labs", "puzzles", "challenges", "gamification"],
  objectives: [
    "Master HTML document structure through interactive building",
    "Create HTML elements using hands-on code challenges", 
    "Build a complete web page through guided missions",
    "Understand web development fundamentals through discovery learning"
  ]
}
