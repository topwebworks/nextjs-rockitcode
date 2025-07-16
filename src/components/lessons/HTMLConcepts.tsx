'use client'

import React, { useState, useEffect } from 'react'

// Professional HTML Learning Experience - Concept to Mastery Flow
export default function HTMLConcepts() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [currentConcept, setCurrentConcept] = useState(0)
  const [completedConcepts, setCompletedConcepts] = useState<Set<number>>(new Set())
  const [githubConnected, setGithubConnected] = useState(false)
  const [showExample, setShowExample] = useState(false)
  const [draggedBlocks, setDraggedBlocks] = useState<{ [key: string]: boolean }>({})

  // Check GitHub connection status on mount
  useEffect(() => {
    // Check if user is signed into GitHub (this would integrate with your auth system)
    const checkGithubStatus = () => {
      // Simulate GitHub check - replace with actual auth check
      const isConnected = localStorage.getItem('github_connected') === 'true'
      setGithubConnected(isConnected)
    }
    checkGithubStatus()
  }, [])

  const concepts = [
    {
      id: 1,
      title: "What is HTML?",
      subtitle: "The Foundation of the Web",
      content: [
        "HTML (HyperText Markup Language) is the skeleton of every website you visit.",
        "Think of it like the frame of a house - it provides structure and defines where everything goes.",
        "HTML uses 'tags' to mark up content and tell the browser how to display it."
      ],
      visualExample: `<!-- This is HTML -->
<h1>This is a heading</h1>
<p>This is a paragraph of text.</p>
<a href="https://example.com">This is a link</a>`,
      keyPoints: [
        "HTML provides structure to web content",
        "Uses opening and closing tags: <tag>content</tag>",
        "Tells browsers how to display content",
        "Every website uses HTML as its foundation"
      ],
      analogy: "HTML is like the blueprint of a building - it shows where the rooms, doors, and windows go, but doesn't determine the colors or decorations (that's CSS's job)."
    },
    {
      id: 2,
      title: "HTML Document Structure",
      subtitle: "The Basic Template Every Website Needs",
      content: [
        "Every HTML document follows the same basic structure - like a letter that always has a header, body, and signature.",
        "The DOCTYPE tells the browser what version of HTML we're using.",
        "The <html> tag wraps everything, <head> contains metadata, and <body> contains visible content."
      ],
      visualExample: `<!DOCTYPE html>
<html>
  <head>
    <title>My First Website</title>
  </head>
  <body>
    <h1>Welcome to my website!</h1>
    <p>This content appears on the page.</p>
  </body>
</html>`,
      keyPoints: [
        "DOCTYPE declaration comes first",
        "<html> wraps the entire document",
        "<head> contains metadata (title, links to CSS)",
        "<body> contains all visible content"
      ],
      analogy: "Think of an HTML document like a newspaper: the <head> is like the newspaper's title and publication info at the top, while the <body> is all the articles and content people actually read."
    },
    {
      id: 3,
      title: "HTML Tags and Elements",
      subtitle: "The Building Blocks of Web Content",
      content: [
        "Tags are like containers that wrap around content to give it meaning.",
        "Most tags come in pairs: an opening tag <tag> and closing tag </tag>.",
        "The content between tags becomes an 'element' with special properties."
      ],
      visualExample: `<!-- Tag pairs wrap content -->
<h1>This is a main heading</h1>
<h2>This is a subheading</h2>
<p>This is a paragraph with <strong>bold text</strong> inside.</p>

<!-- Some tags are self-closing -->
<img src="image.jpg" alt="Description">
<br>
<hr>`,
      keyPoints: [
        "Opening tag: <tagname>",
        "Closing tag: </tagname> (note the slash)",
        "Self-closing tags: <img>, <br>, <hr>",
        "Content + tags = element"
      ],
      analogy: "Tags are like labeled boxes in a warehouse. The box label tells you what's inside, and everything inside that box has the same properties."
    },
    {
      id: 4,
      title: "Essential HTML Elements",
      subtitle: "The Most Important Tags You'll Use Daily",
      content: [
        "Headings (h1-h6) create hierarchy and structure, like chapters in a book.",
        "Paragraphs (p) contain blocks of text content.",
        "Links (a) connect pages together and make the web 'web-like'.",
        "Images (img) display visual content."
      ],
      visualExample: `<!-- Headings create hierarchy -->
<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Subsection</h3>

<!-- Paragraphs contain text -->
<p>This is a paragraph of text that explains something important.</p>

<!-- Links connect to other pages -->
<a href="https://google.com">Visit Google</a>

<!-- Images display visuals -->
<img src="logo.png" alt="Company Logo">`,
      keyPoints: [
        "h1-h6: Headings (h1 is most important)",
        "p: Paragraphs of text",
        "a: Links to other pages",
        "img: Images (needs src and alt attributes)"
      ],
      analogy: "Think of a magazine article: h1 is the main headline, h2/h3 are section headers, p tags are the article paragraphs, links are 'see page 25' references, and images are the photos."
    },
    {
      id: 5,
      title: "Attributes: Adding Details to Elements",
      subtitle: "How to Customize and Configure HTML Elements",
      content: [
        "Attributes provide additional information about elements - like settings or configurations.",
        "They're written inside the opening tag as name='value' pairs.",
        "Common attributes include id, class, src, href, and alt."
      ],
      visualExample: `<!-- Attributes provide extra information -->
<a href="https://google.com" target="_blank">
  Opens Google in new tab
</a>

<img src="photo.jpg" alt="A beautiful sunset" width="300">

<div id="header" class="main-navigation">
  This div has an ID and a class
</div>

<input type="email" placeholder="Enter your email" required>`,
      keyPoints: [
        "Written as name='value' inside opening tags",
        "href: destination for links",
        "src: source file for images",
        "alt: description for images (accessibility)",
        "id/class: for styling and JavaScript targeting"
      ],
      analogy: "Attributes are like the options when ordering a pizza: the tag is 'pizza' but attributes specify 'size=large', 'crust=thin', 'toppings=pepperoni'."
    }
  ]

  const currentConceptData = concepts[currentConcept]

  const handleNext = () => {
    setCompletedConcepts(prev => new Set([...prev, currentConcept]))
    if (currentConcept < concepts.length - 1) {
      setCurrentConcept(prev => prev + 1)
      setShowExample(false)
    }
  }

  const handlePrevious = () => {
    if (currentConcept > 0) {
      setCurrentConcept(prev => prev - 1)
      setShowExample(false)
    }
  }

  const allConceptsCompleted = completedConcepts.size === concepts.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">HTML Concepts</h1>
              <p className="text-gray-600">Learn the fundamentals before the lab</p>
            </div>
            <div className="text-sm text-gray-500">
              Concept {currentConcept + 1} of {concepts.length}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentConcept + 1) / concepts.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentConcept + 1) / concepts.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Concept Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {currentConceptData.title}
            </h2>
            <p className="text-lg text-blue-600 font-medium">
              {currentConceptData.subtitle}
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-6">
            {currentConceptData.content.map((paragraph, idx) => (
              <p key={idx} className="text-gray-700 text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}

            {/* Analogy Box */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
              <div className="flex items-start">
                <div className="text-yellow-500 mr-3 text-xl">💡</div>
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-1">Think of it this way:</h4>
                  <p className="text-yellow-700">{currentConceptData.analogy}</p>
                </div>
              </div>
            </div>

            {/* Key Points */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                <span className="mr-2">🎯</span>
                Key Takeaways
              </h4>
              <ul className="space-y-2">
                {currentConceptData.keyPoints.map((point, idx) => (
                  <li key={idx} className="text-blue-800 flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Show Example Button */}
            <div className="text-center">
              <button
                onClick={() => setShowExample(!showExample)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {showExample ? 'Hide Example' : 'Show Live Example'}
              </button>
            </div>

            {/* Visual Example */}
            {showExample && (
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4">
                  <h4 className="text-green-400 font-semibold mb-3">📝 Code Example:</h4>
                  <pre className="text-green-300 font-mono text-sm overflow-x-auto">
                    <code>{currentConceptData.visualExample}</code>
                  </pre>
                </div>
                
                <div className="bg-white border rounded-lg p-4">
                  <h4 className="text-gray-700 font-semibold mb-3">🌐 How it appears:</h4>
                  <div 
                    className="border-2 border-dashed border-gray-300 p-4 rounded"
                    dangerouslySetInnerHTML={{ __html: currentConceptData.visualExample.replace(/<!--.*?-->/g, '') }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentConcept === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              currentConcept === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-600 hover:bg-gray-700 text-white'
            }`}
          >
            ← Previous Concept
          </button>

          {currentConcept === concepts.length - 1 ? (
            <a
              href="/learn/html-css/html-basics"
              className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                completedConcepts.has(currentConcept)
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
              }`}
            >
              Ready for HTML Mastery Lab! 🚀
            </a>
          ) : (
            <button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Next Concept →
            </button>
          )}
        </div>

        {/* Concept Overview */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Concept Overview</h3>
          <div className="grid grid-cols-5 gap-2">
            {concepts.map((concept, idx) => (
              <div
                key={concept.id}
                className={`p-3 rounded-lg text-center cursor-pointer transition-colors ${
                  completedConcepts.has(idx)
                    ? 'bg-green-100 text-green-800'
                    : currentConcept === idx
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
                onClick={() => setCurrentConcept(idx)}
              >
                <div className="text-sm font-medium">
                  {completedConcepts.has(idx) ? '✅' : currentConcept === idx ? '📖' : '⭕'}
                </div>
                <div className="text-xs mt-1">Concept {idx + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
