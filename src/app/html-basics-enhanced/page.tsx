'use client'

import { EnhancedLesson } from '@/components/enhanced-lesson'

export default function HTMLBasicsEnhancedPage() {
  const codeSections = [
    {
      id: 'basic-structure',
      title: 'Basic HTML Structure',
      description: 'Create your first HTML document with the essential elements every web page needs.',
      language: 'html',
      videoTimestamp: 45, // 45 seconds into the video
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
      videoTimestamp: 120, // 2 minutes into the video
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
    },
    {
      id: 'lists-links',
      title: 'Lists and Links',
      description: 'Create organized lists and clickable links to other websites.',
      language: 'html',
      videoTimestamp: 200, // 3:20 into the video
      initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lists and Links</title>
</head>
<body>
    <h1>My Favorite Programming Languages</h1>
    
    <h2>Languages I'm Learning:</h2>
    <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>
    
    <h2>Helpful Resources:</h2>
    <ol>
        <li><a href="https://developer.mozilla.org">MDN Web Docs</a></li>
        <li><a href="https://www.w3schools.com">W3Schools</a></li>
    </ol>
    
    <!-- Try adding your own list and links -->
    
</body>
</html>`,
      expectedOutput: `A webpage featuring:
- Unordered list of programming languages
- Ordered list with clickable links to learning resources
- Proper HTML structure with semantic headings`
    },
    {
      id: 'complete-page',
      title: 'Complete Personal Page',
      description: 'Build a complete personal webpage using everything you\'ve learned.',
      language: 'html',
      videoTimestamp: 300, // 5 minutes into the video
      initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About [Your Name]</title>
</head>
<body>
    <h1>About Me</h1>
    <p>Welcome to my personal webpage!</p>
    
    <h2>My Interests</h2>
    <!-- Add a list of your interests -->
    
    <h2>My Goals</h2>
    <!-- Add paragraphs about your learning goals -->
    
    <h2>Connect With Me</h2>
    <!-- Add links to social media or email -->
    
</body>
</html>`,
      expectedOutput: `A personalized webpage with:
- Your name and introduction
- Lists of interests and goals
- Contact information and links
- Clean, semantic HTML structure`
    }
  ]

  return (
    <EnhancedLesson
      title="HTML Basics - Interactive Lesson"
      description="Learn HTML fundamentals through video instruction and hands-on coding practice"
      video={{
        url: '/videos/lessons/html-basics.mp4',
        poster: '/images/lessons/html-css/html-structure-diagram.svg'
      }}
      codeSections={codeSections}
    >
      {/* Lesson Content (shown in video mode) */}
      <div>
        <h2>Understanding HTML: The Building Blocks of the Web</h2>
        <p>
          HTML stands for <strong>HyperText Markup Language</strong>. Think of it as the skeleton or foundation 
          of every website you visit. Just like how a house needs a strong foundation and framework before you 
          can add walls, paint, and decorations, every website needs HTML before you can add styling (CSS) and 
          interactivity (JavaScript).
        </p>

        <h3>HTML Works Like Building Blocks</h3>
        <p>
          Imagine you're playing with LEGO blocks. Each LEGO piece has a specific purpose - some are foundations, 
          some are walls, some are roofs. HTML works the same way! Each HTML <strong>element</strong> is like a 
          LEGO block that serves a specific purpose on your web page.
        </p>

        <p>Every HTML element is wrapped in <strong>tags</strong> that tell the browser what type of content it is:</p>
        <ul>
          <li><code>&lt;h1&gt;</code> creates a large heading</li>
          <li><code>&lt;p&gt;</code> creates a paragraph</li>
          <li><code>&lt;img&gt;</code> displays an image</li>
          <li><code>&lt;a&gt;</code> creates a clickable link</li>
        </ul>

        <h3>Your First HTML Document Structure</h3>
        <p>
          Every HTML document follows the same basic structure. Think of it like a template that tells the web 
          browser how to display your content.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 my-6">
          <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            💡 Learning Tip: Video + Coding
          </h4>
          <p className="text-blue-800 dark:text-blue-200">
            This lesson combines video instruction with hands-on coding practice. Watch the video to understand 
            the concepts, then switch to the code editor to practice what you've learned. Each coding exercise 
            is synchronized with specific timestamps in the video!
          </p>
        </div>

        <h3>Try It Yourself</h3>
        <p>
          Ready to start coding? Click the <strong>"💻 Code Editor"</strong> button above to begin practicing 
          with our professional VS Code-like editor. You'll work through 4 progressive exercises:
        </p>
        <ol>
          <li><strong>Basic HTML Structure</strong> - Learn the essential document framework</li>
          <li><strong>Headings and Paragraphs</strong> - Create readable content</li>
          <li><strong>Lists and Links</strong> - Organize information and connect to other pages</li>
          <li><strong>Complete Personal Page</strong> - Build your own webpage from scratch</li>
        </ol>

        <p>
          Each exercise includes starter code, clear instructions, and expected output so you know you're on the right track!
        </p>
      </div>
    </EnhancedLesson>
  )
}
