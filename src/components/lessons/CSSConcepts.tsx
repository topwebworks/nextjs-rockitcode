'use client'

import React, { useState } from 'react'

// CSS Concept Learning - Before the Mastery Studio
export default function CSSConcepts() {
  const [currentConcept, setCurrentConcept] = useState(0)
  const [completedConcepts, setCompletedConcepts] = useState<Set<number>>(new Set())
  const [showExample, setShowExample] = useState(false)

  const concepts = [
    {
      id: 1,
      title: "What is CSS?",
      subtitle: "The Styling Language of the Web",
      content: [
        "CSS (Cascading Style Sheets) is what makes websites look beautiful and professional.",
        "While HTML provides structure (like the frame of a house), CSS provides the design (paint, furniture, decorations).",
        "CSS controls colors, layouts, fonts, spacing, animations, and responsive behavior."
      ],
      visualExample: {
        html: `<h1>Welcome to My Site</h1>
<p>This is some content.</p>`,
        css: `h1 {
  color: #3b82f6;
  font-size: 2rem;
  text-align: center;
}

p {
  color: #6b7280;
  font-size: 1.1rem;
  line-height: 1.6;
}`
      },
      keyPoints: [
        "CSS controls the visual appearance of HTML",
        "Separates content (HTML) from presentation (CSS)",
        "Can transform basic HTML into beautiful designs",
        "One CSS file can style an entire website"
      ],
      analogy: "If HTML is the skeleton of a person, CSS is everything else - the skin, clothes, makeup, and style that makes them unique and attractive."
    },
    {
      id: 2,
      title: "CSS Selectors: Targeting Elements",
      subtitle: "How to Choose Which Elements to Style",
      content: [
        "Selectors are how you tell CSS exactly which HTML elements to style.",
        "Element selectors target all elements of a type (h1, p, div).",
        "Class selectors target elements with specific class names (.my-class).",
        "ID selectors target one unique element (#my-id)."
      ],
      visualExample: {
        html: `<h1 id="main-title">Main Heading</h1>
<p class="intro">Introduction paragraph</p>
<p>Regular paragraph</p>
<div class="box">Special box</div>`,
        css: `/* Element selector - targets ALL h1s */
h1 { color: blue; }

/* Class selector - targets elements with class="intro" */
.intro { font-weight: bold; }

/* ID selector - targets element with id="main-title" */
#main-title { text-align: center; }

/* Class selector for boxes */
.box { 
  background: #f0f0f0; 
  padding: 20px; 
}`
      },
      keyPoints: [
        "Element selector: h1, p, div (targets all of that type)",
        "Class selector: .classname (reusable, multiple elements)",
        "ID selector: #idname (unique, one element only)",
        "Classes are for styling groups, IDs are for unique elements"
      ],
      analogy: "Selectors are like giving instructions to a room painter: 'paint all the doors blue' (element), 'paint anything marked with a red dot' (class), or 'paint the one window marked #special' (ID)."
    },
    {
      id: 3,
      title: "CSS Properties and Values",
      subtitle: "The Building Blocks of Style",
      content: [
        "CSS properties define what aspect of an element you want to change (color, size, position).",
        "Values specify how you want to change it (red, 20px, center).",
        "The syntax is always: property: value; (note the colon and semicolon)."
      ],
      visualExample: {
        html: `<div class="styled-box">
  <h2>Styled Content</h2>
  <p>This box has multiple CSS properties applied.</p>
</div>`,
        css: `.styled-box {
  background-color: #e0f2fe;
  border: 2px solid #0284c7;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  width: 300px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}`
      },
      keyPoints: [
        "Property: what to change (color, font-size, background)",
        "Value: how to change it (red, 16px, #ffffff)",
        "Syntax: property: value; (colon, space, semicolon)",
        "Multiple properties separated by semicolons"
      ],
      analogy: "CSS properties are like knobs on a stereo: 'volume' is the property, and '7' is the value. You can adjust multiple knobs (properties) to get the perfect sound (appearance)."
    },
    {
      id: 4,
      title: "The Box Model",
      subtitle: "How CSS Thinks About Space and Layout",
      content: [
        "Every HTML element is a rectangular box, even if it doesn't look like one.",
        "The box model defines how space is calculated: content, padding, border, and margin.",
        "Understanding this is crucial for creating layouts and controlling spacing."
      ],
      visualExample: {
        html: `<div class="box-demo">Content Area</div>`,
        css: `.box-demo {
  /* Content area */
  width: 200px;
  height: 100px;
  background-color: #dbeafe;
  
  /* Padding - space inside the border */
  padding: 20px;
  
  /* Border - the edge of the element */
  border: 3px solid #3b82f6;
  
  /* Margin - space outside the border */
  margin: 15px;
  
  text-align: center;
  line-height: 100px;
}`
      },
      keyPoints: [
        "Content: the actual text/images inside",
        "Padding: space between content and border (inside)",
        "Border: the edge line around the element",
        "Margin: space outside the border (pushes other elements away)"
      ],
      analogy: "Think of a framed picture: the photo is content, the mat around the photo is padding, the frame is the border, and the space between frames on a wall is margin."
    },
    {
      id: 5,
      title: "Layout with Flexbox",
      subtitle: "Modern CSS Layout Made Simple",
      content: [
        "Flexbox is a powerful layout system that makes arranging elements easy and flexible.",
        "Apply 'display: flex' to a container to make its children flexible.",
        "Use justify-content for horizontal alignment and align-items for vertical alignment."
      ],
      visualExample: {
        html: `<div class="flex-container">
  <div class="flex-item">Item 1</div>
  <div class="flex-item">Item 2</div>
  <div class="flex-item">Item 3</div>
</div>`,
        css: `.flex-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100px;
  background-color: #f3f4f6;
  border: 2px dashed #9ca3af;
}

.flex-item {
  background-color: #3b82f6;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
}`
      },
      keyPoints: [
        "display: flex makes a container flexible",
        "justify-content: controls horizontal spacing (space-between, center, space-around)",
        "align-items: controls vertical alignment (center, flex-start, flex-end)",
        "flex-direction: controls if items flow horizontally (row) or vertically (column)"
      ],
      analogy: "Flexbox is like a smart shelf that automatically arranges books: you tell it how to distribute the books (justify-content) and whether they should be aligned to the top, center, or bottom of the shelf (align-items)."
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

  const combinedExample = currentConceptData.visualExample?.html && currentConceptData.visualExample?.css
    ? `<!DOCTYPE html>
<html>
<head>
<style>
${currentConceptData.visualExample.css}
</style>
</head>
<body>
${currentConceptData.visualExample.html}
</body>
</html>`
    : ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CSS Concepts</h1>
              <p className="text-gray-600">Master styling fundamentals before the studio</p>
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
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
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
            <p className="text-lg text-purple-600 font-medium">
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
            <div className="bg-purple-50 rounded-lg p-6">
              <h4 className="font-semibold text-purple-900 mb-3 flex items-center">
                <span className="mr-2">🎯</span>
                Key Takeaways
              </h4>
              <ul className="space-y-2">
                {currentConceptData.keyPoints.map((point, idx) => (
                  <li key={idx} className="text-purple-800 flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
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
            {showExample && combinedExample && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-900 rounded-lg p-4">
                    <h4 className="text-blue-400 font-semibold mb-3">📝 HTML:</h4>
                    <pre className="text-green-300 font-mono text-sm overflow-x-auto">
                      <code>{currentConceptData.visualExample.html}</code>
                    </pre>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-4">
                    <h4 className="text-purple-400 font-semibold mb-3">🎨 CSS:</h4>
                    <pre className="text-blue-300 font-mono text-sm overflow-x-auto">
                      <code>{currentConceptData.visualExample.css}</code>
                    </pre>
                  </div>
                </div>
                
                <div className="bg-white border rounded-lg p-4">
                  <h4 className="text-gray-700 font-semibold mb-3">🌐 Result:</h4>
                  <iframe
                    srcDoc={combinedExample}
                    className="w-full h-64 border border-gray-300 rounded"
                    title="CSS Example Preview"
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
              href="/learn/html-css/css-basics"
              className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                completedConcepts.has(currentConcept)
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
              }`}
            >
              Ready for CSS Mastery Studio! 🎨
            </a>
          ) : (
            <button
              onClick={handleNext}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
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
                    ? 'bg-purple-100 text-purple-800'
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
