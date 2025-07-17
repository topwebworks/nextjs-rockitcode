import { LessonComponent } from '@/components/lesson-player'

// Example HTML Basics Lesson - Mobile-First Implementation
export const htmlBasicsLesson: LessonComponent = {
  video: {
    source: "https://www.youtube.com/embed/qz0aGYrrlhU?playsinline=1",
    chapters: [
      { title: "What is HTML?", timestamp: 0 },
      { title: "Creating Your First Element", timestamp: 45 },
      { title: "Adding Structure", timestamp: 120 },
      { title: "Practice Time", timestamp: 180 }
    ],
    autoPlay: false, // Respectful of mobile data
    playbackSpeeds: [0.75, 1, 1.25, 1.5],
    captions: true
  },
  
  codeEditor: {
    template: `<!-- Welcome to HTML! 👋 
Tap below to start coding your first webpage -->
<html>
  <body>
    <!-- Your code goes here -->
    
  </body>
</html>`,
    
    solution: `<html>
  <body>
    <h1>My First Website</h1>
    <p>Hello, world! I'm learning to code on my phone!</p>
  </body>
</html>`,
    
    hints: [
      "Start by adding an <h1> tag for your main heading",
      "Add a <p> tag for a paragraph of text",
      "Remember to close your tags with </tag>",
      "Try writing something personal in your paragraph!"
    ],
    
    validation: [
      { rule: "contains_h1", message: "Add a heading with <h1>Your Title</h1>" },
      { rule: "contains_p", message: "Add a paragraph with <p>Your text</p>" },
      { rule: "properly_nested", message: "Make sure all tags are properly closed" }
    ],
    
    mobileOptimizations: {
      fontSize: 16,
      lineHeight: 1.6,
      touchTargets: 44, // minimum px for touch
      wordWrap: true,
      minimap: false
    }
  },
  
  challenges: {
    type: 'code-completion',
    difficulty: 1,
    timeEstimate: 5,
    points: 100,
    achievements: ['first-html', 'mobile-coder', 'web-builder']
  },
  
  mobileFeatures: {
    voiceCoding: true,
    hapticFeedback: true,
    offlineMode: true,
    portraitOptimized: true,
    gestureControls: {
      swipeLeft: 'next-lesson',
      swipeRight: 'previous-lesson',
      doubleTap: 'run-code',
      longPress: 'show-hints'
    }
  }
}

// CSS Styling Lesson - Building on HTML
export const cssBasicsLesson: LessonComponent = {
  video: {
    source: "https://www.youtube.com/embed/yfoY53QXEnI?playsinline=1",
    chapters: [
      { title: "What is CSS?", timestamp: 0 },
      { title: "Adding Colors", timestamp: 60 },
      { title: "Changing Fonts", timestamp: 120 },
      { title: "Making it Beautiful", timestamp: 180 }
    ],
    autoPlay: false,
    playbackSpeeds: [0.75, 1, 1.25, 1.5],
    captions: true
  },
  
  codeEditor: {
    template: `<!-- Add some style to your webpage! -->
<html>
  <head>
    <style>
      /* Your CSS goes here */
      
    </style>
  </head>
  <body>
    <h1>My Styled Website</h1>
    <p>This text needs some color!</p>
  </body>
</html>`,
    
    solution: `<html>
  <head>
    <style>
      h1 {
        color: blue;
        font-family: Arial, sans-serif;
      }
      
      p {
        color: green;
        font-size: 18px;
      }
    </style>
  </head>
  <body>
    <h1>My Styled Website</h1>
    <p>This text needs some color!</p>
  </body>
</html>`,
    
    hints: [
      "Add CSS inside the <style> tags in the <head>",
      "Use h1 { } to style your heading",
      "Try color: blue; to make text blue",
      "Use p { } to style your paragraph"
    ],
    
    validation: [
      { rule: "contains_css_rule", message: "Add at least one CSS rule with h1 { }" },
      { rule: "contains_color", message: "Add a color property to style your text" },
      { rule: "properly_formatted", message: "Make sure CSS rules end with semicolons ;" }
    ],
    
    mobileOptimizations: {
      fontSize: 16,
      lineHeight: 1.6,
      touchTargets: 44,
      wordWrap: true,
      minimap: false
    }
  },
  
  challenges: {
    type: 'code-completion',
    difficulty: 2,
    timeEstimate: 7,
    points: 150,
    achievements: ['css-stylist', 'color-master', 'design-rookie']
  },
  
  mobileFeatures: {
    voiceCoding: true,
    hapticFeedback: true,
    offlineMode: true,
    portraitOptimized: true,
    gestureControls: {
      swipeLeft: 'next-lesson',
      swipeRight: 'previous-lesson',
      doubleTap: 'run-code',
      longPress: 'show-hints'
    }
  }
}

// JavaScript Interactivity Lesson
export const javascriptBasicsLesson: LessonComponent = {
  video: {
    source: "https://www.youtube.com/embed/PkZNo7MFNFg?playsinline=1",
    chapters: [
      { title: "What is JavaScript?", timestamp: 0 },
      { title: "Your First Function", timestamp: 90 },
      { title: "Making Things Interactive", timestamp: 180 },
      { title: "Practice Challenge", timestamp: 270 }
    ],
    autoPlay: false,
    playbackSpeeds: [0.75, 1, 1.25, 1.5],
    captions: true
  },
  
  codeEditor: {
    template: `<!-- Make your webpage interactive! ⚡ -->
<html>
  <head>
    <style>
      button {
        padding: 10px 20px;
        font-size: 16px;
        background: blue;
        color: white;
        border: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <h1 id="title">Click the button!</h1>
    <button onclick="changeTitle()">Click Me</button>
    
    <script>
      // Your JavaScript goes here
      function changeTitle() {
        
      }
    </script>
  </body>
</html>`,
    
    solution: `<html>
  <head>
    <style>
      button {
        padding: 10px 20px;
        font-size: 16px;
        background: blue;
        color: white;
        border: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <h1 id="title">Click the button!</h1>
    <button onclick="changeTitle()">Click Me</button>
    
    <script>
      function changeTitle() {
        document.getElementById('title').innerText = 'You did it! 🎉';
      }
    </script>
  </body>
</html>`,
    
    hints: [
      "Use document.getElementById('title') to find your heading",
      "Use .innerText to change the text inside an element",
      "Try changing the text to something fun like 'You did it! 🎉'",
      "Make sure your function is inside the <script> tags"
    ],
    
    validation: [
      { rule: "contains_getelementbyid", message: "Use document.getElementById to find your element" },
      { rule: "changes_text", message: "Change the innerText of the title element" },
      { rule: "function_complete", message: "Complete the changeTitle() function" }
    ],
    
    mobileOptimizations: {
      fontSize: 16,
      lineHeight: 1.6,
      touchTargets: 44,
      wordWrap: true,
      minimap: false
    }
  },
  
  challenges: {
    type: 'build-feature',
    difficulty: 3,
    timeEstimate: 10,
    points: 200,
    achievements: ['js-wizard', 'interactive-master', 'button-clicker']
  },
  
  mobileFeatures: {
    voiceCoding: true,
    hapticFeedback: true,
    offlineMode: true,
    portraitOptimized: true,
    gestureControls: {
      swipeLeft: 'next-lesson',
      swipeRight: 'previous-lesson',
      doubleTap: 'run-code',
      longPress: 'show-hints'
    }
  }
}

// Export all lessons
export const mobileLessons = [
  htmlBasicsLesson,
  cssBasicsLesson,
  javascriptBasicsLesson
]
