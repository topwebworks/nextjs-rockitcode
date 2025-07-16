import { YouTubeEmbedLite } from '@/components/rockitcode/youtube-embed-lite'
import { CodePlayground } from '@/components/rockitcode/code-playground'

export default function HtmlBasicsLesson() {
  return (
    <div className="lesson-content">
      <div className="lesson-intro">
        <p>Learn the fundamentals of HTML and create your very first web page from scratch.</p>
        <p>In this lesson, you'll discover the building blocks of the web and create your first HTML document. HTML is the foundation of every website you see, and by the end of this lesson, you'll have built your own web page from scratch.</p>
      </div>

      <section>
        <h2>Understanding HTML: The Building Blocks of the Web</h2>
        <p>HTML stands for <strong>HyperText Markup Language</strong>. Think of it as the skeleton or foundation of every website you visit. Just like how a house needs a strong foundation and framework before you can add walls, paint, and decorations, every website needs HTML before you can add styling (CSS) and interactivity (JavaScript).</p>
        
        <div className="lesson-diagram">
          <img 
            src="/images/lessons/html-css/html-structure-diagram.svg" 
            alt="HTML Structure Diagram"
            className="w-full max-w-2xl mx-auto"
          />
        </div>

        <h3>HTML Works Like Building Blocks</h3>
        <p>Imagine you're playing with LEGO blocks. Each LEGO piece has a specific purpose - some are foundations, some are walls, some are roofs. HTML works the same way! Each HTML <strong>element</strong> is like a LEGO block that serves a specific purpose on your web page.</p>
        
        <p>Every HTML element is wrapped in <strong>tags</strong> that tell the browser what type of content it is. For example:</p>
        <ul>
          <li><code>&lt;h1&gt;</code> creates a large heading</li>
          <li><code>&lt;p&gt;</code> creates a paragraph</li>
          <li><code>&lt;img&gt;</code> displays an image</li>
          <li><code>&lt;a&gt;</code> creates a clickable link</li>
        </ul>
      </section>

      <section>
        <h2>Your First HTML Document Structure</h2>
        <p>Every HTML document follows the same basic structure. Think of it like a template that tells the web browser how to display your content:</p>
        
        <CodePlayground
          initialCode={`<!DOCTYPE html>
<html>
<head>
    <title>My First Web Page</title>
</head>
<body>
    <h1>Welcome to My Website!</h1>
    <p>This is my very first web page. I'm learning HTML!</p>
</body>
</html>`}
          language="html"
          title="Basic HTML Structure"
        />

        <p>Let's break down what each part does:</p>
        <ul>
          <li><code>&lt;!DOCTYPE html&gt;</code> - Tells the browser this is an HTML5 document</li>
          <li><code>&lt;html&gt;</code> - The root element that contains everything</li>
          <li><code>&lt;head&gt;</code> - Contains information about the page (like the title)</li>
          <li><code>&lt;title&gt;</code> - What appears in the browser tab</li>
          <li><code>&lt;body&gt;</code> - Contains all the visible content on your page</li>
          <li><code>&lt;h1&gt;</code> - A large heading (like a chapter title)</li>
          <li><code>&lt;p&gt;</code> - A paragraph of text</li>
        </ul>
      </section>

      <section>
        <h2>Try It Yourself: Build Your First Web Page</h2>
        <p>Now it's time to put your knowledge into practice! Follow these steps to create your very first HTML web page.</p>

        <h3>Your Mission: Create an "About Me" Page</h3>
        <p>You're going to build a simple personal webpage that introduces you to the world. This will be your first step into web development!</p>

        <div className="lesson-steps">
          <h4>Step 1: Set Up Your HTML Foundation</h4>
          <p>Start with the basic HTML template:</p>
          
          <CodePlayground
            initialCode={`<!DOCTYPE html>
<html>
<head>
    <title>About Me - [Your Name]</title>
</head>
<body>
    <!-- Your content will go here -->
</body>
</html>`}
            language="html"
            title="HTML Foundation"
          />

          <h4>Step 2: Add a Main Heading</h4>
          <p>Inside the <code>&lt;body&gt;</code> section, add your name as the main heading:</p>
          
          <CodePlayground
            initialCode={`<h1>Hi, I'm [Your Name]!</h1>`}
            language="html"
            title="Main Heading"
          />

          <h4>Step 3: Add Some Paragraphs</h4>
          <p>Add 2-3 paragraphs about yourself. Here's an example:</p>
          
          <CodePlayground
            initialCode={`<p>Welcome to my first web page! I'm learning how to code with HTML.</p>

<p>I'm excited to discover how websites are built and create my own amazing projects.</p>

<p>This is just the beginning of my coding journey!</p>`}
            language="html"
            title="About Me Paragraphs"
          />

          <h4>Step 4: Add Some Subheadings</h4>
          <p>Use <code>&lt;h2&gt;</code> for section headings:</p>
          
          <CodePlayground
            initialCode={`<h2>My Favorite Things</h2>
<p>I love pizza, video games, and learning new things!</p>`}
            language="html"
            title="Subheadings"
          />
        </div>
      </section>

      <section>
        <h2>Video Tutorial: Building Your First HTML Page</h2>
        <p>Watch this step-by-step guide to creating your first HTML document:</p>
        
        <YouTubeEmbedLite 
          videoId="UB1O30fR-EE" 
          title="HTML Basics - Building Your First Web Page"
          description="A complete walkthrough of creating your first HTML document from scratch"
        />
        
        <p className="mt-2 text-sm text-gray-600">
          <em>Note: The video will stay visible in a small window when you scroll down the page, so you can follow along while reading!</em>
        </p>
      </section>

      <section className="lesson-conclusion">
        <h2>🎉 Congratulations! You Did It!</h2>
        <p>You've just built your very first web page using HTML! This is a huge milestone in your coding journey.</p>

        <h3>What You've Mastered</h3>
        <ul className="achievement-list">
          <li>✅ <strong>HTML Document Structure</strong>: You understand how <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code>, and <code>&lt;body&gt;</code> work together</li>
          <li>✅ <strong>Essential HTML Elements</strong>: You can use headings (<code>&lt;h1&gt;</code>, <code>&lt;h2&gt;</code>) and paragraphs (<code>&lt;p&gt;</code>)</li>
          <li>✅ <strong>Real Web Development</strong>: You created an actual web page that works in any browser</li>
          <li>✅ <strong>Foundation Skills</strong>: You have the building blocks to create any website</li>
        </ul>

        <h3>Your Next Adventure</h3>
        <p>In the next lesson, you'll discover how to make your web pages beautiful with <strong>CSS styling</strong>. You'll learn to add colors, fonts, layouts, and make your pages look professional and modern.</p>
        
        <p>But first, take a moment to celebrate this achievement! You've taken your first real step into the world of web development.</p>

        <h3>Challenge Yourself</h3>
        <p>Before moving on, try adding these elements to your page:</p>
        <ol>
          <li><strong>Add a new section</strong>: Create an <code>&lt;h2&gt;</code> heading called "My Hobbies"</li>
          <li><strong>List your interests</strong>: Add 3-4 paragraphs describing things you enjoy</li>
          <li><strong>Get creative with your title</strong>: Change the <code>&lt;title&gt;</code> tag to something unique</li>
          <li><strong>Experiment</strong>: Try adding more headings and content - see what happens!</li>
        </ol>

        <p>Remember: The best way to learn HTML is by experimenting. Every web developer started exactly where you are right now. Keep building, keep learning, and most importantly - have fun with it!</p>
      </section>
    </div>
  )
}

// Lesson metadata
export const metadata = {
  title: "HTML Basics: Building Your First Web Page",
  description: "Learn the fundamentals of HTML and create your very first web page from scratch.",
  estimatedTime: 30,
  difficulty: "beginner" as const,
  technologies: ["HTML5"],
  objectives: [
    "Understand HTML document structure",
    "Learn essential HTML elements",
    "Create your first web page",
    "Build foundation for web development"
  ]
}
