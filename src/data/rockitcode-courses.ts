export type RockitCourse = {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  icon: string;
  color: string;
  category: 'web' | 'programming' | 'data' | 'mobile' | 'backend'; // NEW: Easy categorization
  prerequisites: string[]; // NEW: Course dependencies
  tags: string[]; // NEW: For filtering/search
  isActive: boolean; // NEW: Enable/disable courses
  milestones: RockitMilestone[];
};

export type RockitMilestone = {
  id: string;
  title: string;
  description: string;
  order: number;
  isPaid: boolean;
  lessons: RockitLesson[];
};

export type RockitLesson = {
  id: string;
  title: string;
  description: string;
  order: number;
  estimatedMinutes: number;
  video: {
    youtubeId: string;
    duration: number;
    thumbnail: string;
  } | null;
  images?: {
    src: string;
    alt: string;
    title: string;
    caption?: string;
  }[];
  codeExamples: {
    title: string;
    language: string;
    code: string;
    explanation: string;
  }[];
  exercises: {
    title: string;
    description: string;
    starterCode?: string;
    solution: string;
    hints: string[];
  }[];
  embeds: {
    type: 'codepen' | 'replit' | 'stackblitz' | 'codesandbox'; // NEW: More embed options
    url: string;
    title: string;
  }[];
};

export function getRockitCourses(): RockitCourse[] {
  return rockitCourses.filter(course => course.isActive);
}

export function getRockitCoursesByCategory(category: RockitCourse['category']): RockitCourse[] {
  return getRockitCourses().filter(course => course.category === category);
}

export function getRockitCoursesByDifficulty(difficulty: RockitCourse['difficulty']): RockitCourse[] {
  return getRockitCourses().filter(course => course.difficulty === difficulty);
}

export function searchRockitCourses(query: string): RockitCourse[] {
  const lowercaseQuery = query.toLowerCase();
  return getRockitCourses().filter(course => 
    course.title.toLowerCase().includes(lowercaseQuery) ||
    course.description.toLowerCase().includes(lowercaseQuery) ||
    course.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

export async function getRockitCourse(courseId: string): Promise<RockitCourse | null> {
  return rockitCourses.find(course => course.id === courseId && course.isActive) || null;
}

export async function getRockitLesson(
  courseId: string, 
  lessonId: string
): Promise<(RockitLesson & { 
  course: RockitCourse; 
  milestone: RockitMilestone;
  next: RockitLesson | null;
  previous: RockitLesson | null;
}) | null> {
  const course = await getRockitCourse(courseId);
  if (!course) return null;

  // Find the lesson across all milestones
  let foundMilestone: RockitMilestone | null = null;
  let lessonIndex = -1;
  let allLessons: RockitLesson[] = [];

  // Build flat list of all lessons for navigation
  course.milestones.forEach(milestone => {
    milestone.lessons.forEach(lesson => {
      allLessons.push(lesson);
      if (lesson.id === lessonId) {
        foundMilestone = milestone;
        lessonIndex = allLessons.length - 1;
      }
    });
  });

  if (!foundMilestone || lessonIndex === -1) return null;

  const lesson = allLessons[lessonIndex];
  
  return {
    ...lesson,
    course,
    milestone: foundMilestone,
    next: lessonIndex < allLessons.length - 1 ? allLessons[lessonIndex + 1] : null,
    previous: lessonIndex > 0 ? allLessons[lessonIndex - 1] : null,
  };
}

export async function getRockitLessonContent(courseId: string, lessonId: string) {
  try {
    // Only try React components for now to avoid MDX issues
    return (await import(`@/data/rockitcode-lessons/${courseId}/${lessonId}.tsx`)).default;
  } catch {
    return null;
  }
}

const rockitCourses: RockitCourse[] = [
  {
    id: "html-css",
    title: "HTML & CSS Fundamentals",
    description: "Master the building blocks of the web. Learn to create beautiful, responsive websites from scratch.",
    difficulty: "beginner",
    estimatedHours: 15,
    icon: "🎨",
    color: "bg-orange-500",
    category: "web",
    prerequisites: [], // No prerequisites for beginner course
    tags: ["web development", "frontend", "design", "responsive"],
    isActive: true,
    milestones: [
      {
        id: "professional-setup",
        title: "🚀 Professional Developer Setup - GitHub & AI Tools",
        description: "Set up your professional developer environment with GitHub, AI assistance, and deployment tools. Get $200k+ worth of developer tools completely free and start building your portfolio from day 1.",
        order: 1,
        isPaid: false, // FREE milestone
        lessons: [
          {
            id: "github-professional-setup",
            title: "Professional Developer Account Setup",
            description: "Create your professional GitHub account and claim $200k+ in free developer tools through GitHub Student Pack.",
            order: 1,
            estimatedMinutes: 15,
            video: {
              youtubeId: "GITHUB-SETUP-001", // Will be replaced with actual video
              duration: 900, // 15 minutes
              thumbnail: "/images/lessons/professional-setup/github-setup-thumb.jpg"
            },
            images: [
              {
                src: "/images/lessons/professional-setup/github-student-pack.svg",
                alt: "GitHub Student Pack benefits overview",
                title: "🎁 $200k+ in Free Developer Tools",
                caption: "Professional tools that would cost thousands, now free for students"
              }
            ],
            embeds: [],            codeExamples: [],
            exercises: [
              {
                title: "Set Up Your Professional GitHub Profile",
                description: "Create a GitHub account optimized for recruiters and employers",
                solution: "Create GitHub account → Add profile photo → Write professional bio → Add contact info",
                hints: [
                  "Use your real name for professional credibility",
                  "Add a professional profile photo",
                  "Write a compelling bio that mentions your learning journey"
                ]
              }
            ]
          },
          {
            id: "github-copilot-activation",
            title: "AI Coding Assistant Setup - GitHub Copilot",
            description: "Activate GitHub Copilot free tier and learn to code with AI assistance. Experience the future of programming!",
            order: 2,
            estimatedMinutes: 10,
            video: {
              youtubeId: "COPILOT-SETUP-001",
              duration: 600,
              thumbnail: "/images/lessons/professional-setup/copilot-setup-thumb.jpg"
            },
            images: [
              {
                src: "/images/lessons/professional-setup/copilot-benefits.svg",
                alt: "GitHub Copilot AI assistance in action",
                title: "🤖 Your AI Coding Partner",
                caption: "Learn faster with intelligent code suggestions and explanations"
              }
            ],
            codeExamples: [
              {
                title: "🧠 AI-Assisted HTML Learning",
                language: "html",
                code: `<!-- Ask GitHub Copilot: "Create a basic HTML page about my learning journey" -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Coding Journey - Learning with AI</title>
</head>
<body>
    <h1>🚀 My Coding Learning Journey</h1>
    <p>I'm learning web development with the help of AI tools like GitHub Copilot!</p>
    
    <!-- AI Copilot helped suggest this structure! -->
    <h2>📚 What I'm Learning</h2>
    <ul>
        <li>HTML fundamentals</li>
        <li>CSS styling and responsive design</li>
        <li>JavaScript interactivity</li>
        <li>Professional development workflow</li>
    </ul>
    
    <h2>🎯 My Goals</h2>
    <p>Build amazing websites and launch my career as a professional developer!</p>
</body>
</html>`,
                explanation: "🤖 This HTML was created with AI assistance! GitHub Copilot can help you: ✨ Generate code structure quickly ✨ Suggest best practices ✨ Explain complex concepts ✨ Speed up your learning process Remember: AI is your coding partner, not a replacement for understanding!"
              }
            ],
            exercises: [
              {
                title: "Activate GitHub Copilot Free Tier",
                description: "Enable AI coding assistance for all your future projects",
                solution: "Visit github.com/settings/copilot, enable the free tier, and install the VS Code extension for GitHub Copilot.",
                hints: [
                  "GitHub Copilot is free for students and individual use",
                  "Install the VS Code extension for the best experience",
                  "Start with simple prompts to get comfortable with AI assistance"
                ]
              }
            ],
            embeds: []
          },
          {
            id: "portfolio-initialization",
            title: "Live Portfolio Website Setup - GitHub Pages",
            description: "Create your professional portfolio website that updates automatically. Your first live website in under 5 minutes!",
            order: 3,
            estimatedMinutes: 20,
            video: {
              youtubeId: "PORTFOLIO-SETUP-001",
              duration: 1200,
              thumbnail: "/images/lessons/professional-setup/portfolio-setup-thumb.jpg"
            },
            images: [
              {
                src: "/images/lessons/professional-setup/portfolio-workflow.svg",
                alt: "Automated portfolio deployment workflow",
                title: "🌐 Your Live Portfolio in Minutes",
                caption: "Every project you build automatically adds to your professional portfolio"
              }
            ],
            codeExamples: [
              {
                title: "🎨 Your Professional Portfolio Homepage",
                language: "html",
                code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Your Name] - Web Developer Portfolio</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        h1 { color: #2c3e50; text-align: center; }
        .intro { text-align: center; margin-bottom: 30px; }
        .projects { display: grid; gap: 20px; margin-top: 30px; }
        .project {
            padding: 20px;
            border: 2px solid #e1e8ed;
            border-radius: 10px;
            transition: transform 0.3s ease;
        }
        .project:hover { transform: translateY(-5px); }
    </style>
</head>
<body>
    <div class="container">
        <h1>👋 Hi, I'm [Your Name]</h1>
        <div class="intro">
            <p>🚀 <strong>Aspiring Web Developer</strong> currently learning modern web development</p>
            <p>📚 Building projects with HTML, CSS, JavaScript, and AI-assisted development</p>
            <p>🎯 Goal: Become a professional full-stack developer</p>
        </div>
        
        <h2>🛠️ Current Skills</h2>
        <ul>
            <li>✅ HTML5 semantic markup</li>
            <li>⏳ CSS3 styling and responsive design (learning now!)</li>
            <li>⏳ JavaScript interactivity (coming soon!)</li>
            <li>✅ Git version control and GitHub workflow</li>
            <li>✅ AI-assisted development with GitHub Copilot</li>
        </ul>
        
        <h2>📁 My Projects</h2>
        <div class="projects">
            <div class="project">
                <h3>🎯 Project 1: Personal Portfolio (This Site!)</h3>
                <p>My first live website built with HTML and CSS. Features responsive design and professional styling.</p>
                <p><strong>Technologies:</strong> HTML5, CSS3, GitHub Pages</p>
            </div>
            <!-- More projects will be added as you learn! -->
        </div>
        
        <div style="text-align: center; margin-top: 40px;">
            <p>🌐 <strong>Live at:</strong> https://[username].github.io</p>
            <p>💼 <strong>GitHub:</strong> github.com/[username]</p>
            <p>📧 <strong>Contact:</strong> [your-email]</p>
        </div>
    </div>
</body>
</html>`,
                explanation: "🌟 This is your professional portfolio template! Key features: 💼 Professional design that impresses recruiters 🎨 Modern CSS with gradients and animations 📱 Responsive layout that works on all devices 🚀 Ready to deploy to GitHub Pages instantly Every lesson you complete will add new projects to showcase!"
              }
            ],
            exercises: [
              {
                title: "Deploy Your First Live Website",
                description: "Set up GitHub Pages and deploy your portfolio - your first URL on the internet!",
                solution: "Go to repository Settings → Pages → Deploy from main branch → Visit https://[username].github.io",
                hints: [
                  "Your site will be live at https://[username].github.io",
                  "Changes to your code automatically update the live site",
                  "This becomes your professional web presence"
                ]
              }
            ],
            embeds: []
          }
        ]
      },
      {
        id: "html-css-milestone-1",
        title: "🏗️ HTML Foundations - Building Your First Web Pages",
        description: "Master HTML structure and create semantic, accessible web content. Build real projects that automatically deploy to your live portfolio.",
        order: 2,
        isPaid: false, // FREE milestone
        lessons: [
          {
            id: "html-basics",
            title: "What is HTML? Building Your First Web Page",
            description: "Discover how websites are built! Learn what HTML is, why it's important, and create your very first web page step-by-step.",
            order: 1,
            estimatedMinutes: 30,
            video: {
              youtubeId: "UB1O30fR-EE", // Will be replaced with actual educational video
              duration: 1800, // 30 minutes in seconds
              thumbnail: "https://img.youtube.com/vi/UB1O30fR-EE/maxresdefault.jpg"
            },
            images: [
              {
                src: "/images/lessons/html-css/html-house-analogy.svg",
                alt: "HTML Structure explained using house building analogy",
                title: "HTML is Like Building a House! 🏠",
                caption: "Understanding HTML structure through a familiar analogy"
              },
              {
                src: "/images/lessons/html-css/html-structure-diagram.svg",
                alt: "Visual diagram showing HTML document structure",
                title: "HTML Document Structure",
                caption: "How HTML, head, and body elements work together"
              },
              {
                src: "/images/lessons/html-css/html-elements-guide.svg",
                alt: "Guide to common HTML elements with examples",
                title: "HTML Elements Reference Guide",
                caption: "The most important HTML elements you'll use every day"
              }
            ],
            codeExamples: [
              {
                title: "🌟 Your Very First Web Page",
                language: "html",
                code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page - I'm Learning HTML!</title>
</head>
<body>
    <h1>🚀 Welcome to My First Web Page!</h1>
    <p>Hi there! My name is [Your Name] and I'm learning to code with RockitCode!</p>
    <p>This is my very first HTML document. Pretty cool, right? 😎</p>
</body>
</html>`,
                explanation: "This is a complete HTML document! Every web page you've ever visited starts with code like this. Let's break down what each part does: 💡 <!DOCTYPE html> tells the browser 'Hey, this is HTML5!' 💡 <html> is like a container that holds everything 💡 <head> contains information about the page 💡 <body> contains what people actually see on the page"
              },
              {
                title: "🏗️ HTML Structure Explained",
                language: "html",
                code: `<!-- This is the blueprint of EVERY web page! -->
<!DOCTYPE html>           <!-- Step 1: Tell browser this is HTML -->
<html lang="en">          <!-- Step 2: Start the HTML container -->
<head>                    <!-- Step 3: Information about the page -->
    <title>Page Title</title>  <!-- What shows in browser tab -->
</head>
<body>                    <!-- Step 4: What visitors see -->
    <h1>Main Heading</h1>     <!-- Big title -->
    <p>A paragraph of text</p> <!-- Regular text -->
</body>                   <!-- Step 5: Close the body -->
</html>                   <!-- Step 6: Close the HTML container -->`,
                explanation: "Think of HTML like building a house: 🏠 DOCTYPE = building permit 🏠 <html> = the foundation 🏠 <head> = the blueprint/plans 🏠 <body> = the rooms people live in Each 'tag' (like <h1>) has an opening and closing version (</h1>). They work like parentheses!"
              },
              {
                title: "🎯 Common HTML Elements You'll Use Every Day",
                language: "html",
                code: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>HTML Elements Demo</title>
</head>
<body>
    <!-- Headings: From biggest (h1) to smallest (h6) -->
    <h1>This is a Big Heading (h1)</h1>
    <h2>This is a Medium Heading (h2)</h2>
    <h3>This is a Smaller Heading (h3)</h3>
    
    <!-- Paragraphs: For regular text -->
    <p>This is a paragraph. Most of your text will go in paragraphs!</p>
    <p>Each paragraph tag creates a new block of text with space around it.</p>
    
    <!-- Line breaks: For when you need a new line -->
    <p>Sometimes you want text on one line<br>
    and more text on the next line without a full paragraph break!</p>
    
    <!-- Comments: Notes that don't show on the webpage -->
    <!-- This is a comment - visitors can't see this! -->
</body>
</html>`,
                explanation: "These are the HTML elements you'll use most often: 📝 <h1> to <h6> = Headings (like titles and subtitles) 📝 <p> = Paragraphs (most of your text) 📝 <br> = Line break (forces text to next line) 📝 <!-- --> = Comments (notes for you, invisible to visitors) Pro tip: Use headings in order (h1, then h2, then h3...) like an outline!"
              }
            ],
            exercises: [
              {
                title: "🎮 Exercise 1: Create Your Personal Introduction Page",
                description: "Time to build your first web page! Create a simple page that introduces yourself. Include your name, age, favorite hobby, and what you want to learn about coding. Use different heading sizes and paragraphs to organize your content.",
                starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Me</title>
</head>
<body>
    <!-- 
    Your mission:
    1. Add a big heading (h1) with your name
    2. Add a smaller heading (h2) that says "About Me"  
    3. Add 2-3 paragraphs about yourself
    4. Include your age, favorite hobby, and coding goals
    5. Don't forget to have fun! 😊
    -->
    
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Me</title>
</head>
<body>
    <h1>Hi, I'm Alex! 👋</h1>
    
    <h2>About Me</h2>
    
    <p>I'm 15 years old and I love playing video games and skateboarding. 
    I've always wondered how websites and apps are made, so I decided to learn coding!</p>
    
    <p>My goal is to build my own website where I can share my skateboarding videos 
    and maybe even create a simple game. I'm super excited to start this journey with RockitCode!</p>
    
    <p>Fun fact: My favorite video game is Minecraft because you get to build 
    things from scratch - kind of like coding! 🎮</p>
</body>
</html>`,
                hints: [
                  "🔍 Remember: Every tag that opens (like <h1>) must close (</h1>)",
                  "💡 Use <h1> for your name since it's the most important heading",
                  "📝 Put each separate thought in its own <p> paragraph",
                  "✨ Add emojis to make your page more fun and personal!",
                  "🧪 Try using <h2> or <h3> for section headings like 'About Me' or 'My Goals'"
                ]
              },
              {
                title: "🏆 Exercise 2: Build a 'My Favorite Things' Page",
                description: "Practice using headings and paragraphs by creating a page about your favorite things! Include sections for your favorite movie, food, color, and book/game. This will help you master HTML structure!",
                starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Favorite Things</title>
</head>
<body>
    <!-- 
    Your challenge:
    1. Add a main heading (h1) "My Favorite Things"
    2. Create 4 sections using h2 headings:
       - My Favorite Movie
       - My Favorite Food  
       - My Favorite Color
       - My Favorite Book/Game
    3. Under each heading, add a paragraph explaining why you like it
    4. Make it personal and fun!
    -->
    
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Favorite Things</title>
</head>
<body>
    <h1>🌟 My Favorite Things</h1>
    
    <h2>🎬 My Favorite Movie</h2>
    <p>My favorite movie is Spider-Man: Into the Spider-Verse! I love the amazing 
    animation style and how it shows that anyone can be a hero. The graphics look 
    like a comic book come to life!</p>
    
    <h2>🍕 My Favorite Food</h2>
    <p>Pizza will always be my #1 favorite food! Especially pepperoni pizza with 
    extra cheese. It's perfect for movie nights, study sessions, or just because 
    it's Tuesday. 😋</p>
    
    <h2>🎨 My Favorite Color</h2>
    <p>I love the color blue because it reminds me of the ocean and clear skies. 
    It's calming but also vibrant at the same time. Plus, it's the color of my 
    favorite superhero's costume!</p>
    
    <h2>🎮 My Favorite Game</h2>
    <p>Right now I'm obsessed with Terraria! I love how you can build anything 
    you imagine and explore infinite worlds. It's like Minecraft but with more 
    adventure and boss battles!</p>
</body>
</html>`,
                hints: [
                  "🎯 Use h1 for your main title, then h2 for each category",
                  "📖 Each favorite thing should get its own paragraph explaining why you like it",
                  "🎨 Add emojis to your headings to make them more visually appealing",
                  "💭 Be specific! Instead of 'I like pizza', explain WHY you like it",
                  "🔄 Save your work and preview it in a browser to see how it looks!"
                ]
              }
            ],
            embeds: [
              {
                type: "codepen",
                url: "/codepen-examples/html-basics-playground.html",
                title: "🚀 HTML Basics Playground - Try It Live!"
              }
            ]
          },
          // Additional lessons for milestone 1...
          {
            id: "css-basics",
            title: "CSS Basics: Making Your Website Beautiful",
            description: "Transform your plain HTML into a stunning, professional-looking website with CSS styling. Learn colors, fonts, layouts and make your portfolio shine!",
            order: 2,
            estimatedMinutes: 45,
            video: {
              youtubeId: "1Rs2ND1ryYc", // Will be replaced with actual educational video
              duration: 2700, // 45 minutes in seconds
              thumbnail: "https://img.youtube.com/vi/1Rs2ND1ryYc/maxresdefault.jpg"
            },
            images: [
              {
                src: "/images/lessons/html-css/css-before-after.svg",
                alt: "CSS styling transformation showing before and after",
                title: "The Power of CSS - Before and After! ✨",
                caption: "See how CSS transforms plain HTML into beautiful designs"
              },
              {
                src: "/images/lessons/html-css/css-properties-guide.svg",
                alt: "Visual guide to CSS properties and values",
                title: "CSS Properties Reference Guide",
                caption: "The most important CSS properties you'll use every day"
              },
              {
                src: "/images/lessons/html-css/css-selectors-diagram.svg",
                alt: "CSS selectors explained with visual examples",
                title: "CSS Selectors Made Simple",
                caption: "How to target HTML elements with CSS selectors"
              }
            ],
            codeExamples: [
              {
                title: "🎨 Your First CSS Styles",
                language: "css",
                code: `/* styles.css - Your first CSS file! */

/* Style the entire page */
body {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    color: #333;
    line-height: 1.6;
}

/* Style your main heading */
h1 {
    color: #2563eb;
    text-align: center;
    font-size: 42px;
    margin-bottom: 30px;
    border-bottom: 3px solid #3b82f6;
    padding-bottom: 15px;
}

/* Style your subheadings */
h2 {
    color: #7c3aed;
    font-size: 28px;
    margin-top: 40px;
    margin-bottom: 15px;
}

/* Style your paragraphs */
p {
    font-size: 18px;
    margin-bottom: 20px;
    text-align: justify;
}`,
                explanation: "This CSS transforms your plain HTML into a beautiful, professional-looking page! 🎨 Each rule targets different HTML elements and applies styling properties to them."
              },
              {
                title: "🌈 CSS Color Properties",
                language: "css",
                code: `/* Different ways to set colors */
h1 { color: blue; }           /* Named colors */
h2 { color: #ff6b6b; }        /* Hex colors (most common) */
p { color: rgb(100, 100, 100); } /* RGB colors */

/* Background colors */
body { background-color: #f8f9fa; }
.header { background-color: #667eea; }

/* Gradient backgrounds (advanced) */
.header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}`,
                explanation: "CSS offers many ways to add color! Named colors are easiest for beginners, hex codes (#ff6b6b) are most common in professional development, and gradients create beautiful effects."
              },
              {
                title: "📝 Typography and Text Styling",
                language: "css",
                code: `/* Font properties */
body {
    font-family: 'Segoe UI', Arial, sans-serif;  /* Font type */
    font-size: 18px;                            /* Text size */
    font-weight: 400;                           /* Text thickness */
    line-height: 1.6;                           /* Space between lines */
}

h1 {
    font-size: 48px;           /* Large heading */
    font-weight: 700;          /* Bold text */
    text-align: center;        /* Center alignment */
    letter-spacing: -1px;      /* Tight letter spacing */
}

p {
    text-align: justify;       /* Justified text */
    color: #4a5568;           /* Gray color */
}`,
                explanation: "Typography is crucial for readability! font-family sets the typeface, font-size controls text size, and line-height affects readability by controlling space between lines."
              },
              {
                title: "📦 CSS Box Model - Spacing",
                language: "css",
                code: `/* Understanding spacing */
.section {
    margin: 30px 0;        /* Space OUTSIDE the element (top/bottom) */
    padding: 40px;         /* Space INSIDE the element */
    border: 2px solid #ddd; /* Border around the element */
}

/* Specific spacing */
h1 {
    margin-top: 0;         /* No space on top */
    margin-bottom: 30px;   /* Space on bottom */
    padding-left: 20px;    /* Space inside, left side */
    padding-right: 20px;   /* Space inside, right side */
}

/* Shorthand properties */
.header {
    margin: 20px auto;     /* 20px top/bottom, auto left/right (centers) */
    padding: 40px 20px;    /* 40px top/bottom, 20px left/right */
}`,
                explanation: "The CSS Box Model controls spacing! 📦 Margin = space outside, Padding = space inside, Border = the edge. This is fundamental to CSS layout!"
              }
            ],
            exercises: [
              {
                title: "🎮 Exercise 1: Style Your Portfolio Header",
                description: "Transform your boring HTML header into a stunning, professional-looking section with a gradient background, perfect typography, and beautiful spacing.",
                hints: [
                  "Use a gradient background with 'linear-gradient()'",
                  "Make the text white and centered",
                  "Add generous padding for breathing room",
                  "Try different font sizes for hierarchy"
                ],
                solution: `/* Professional Header Styling */
.header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
    padding: 60px 40px;
    border-radius: 0 0 20px 20px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.header h1 {
    font-size: 48px;
    margin: 0 0 10px 0;
    font-weight: 700;
}

.header p {
    font-size: 20px;
    opacity: 0.9;
    margin: 0;
}`
              },
              {
                title: "🎨 Exercise 2: Create Beautiful Content Sections",
                description: "Style your content sections with cards, shadows, and hover effects to create a modern, professional portfolio layout.",
                hints: [
                  "Use white backgrounds with subtle shadows",
                  "Add border-radius for rounded corners",
                  "Include hover effects with 'transform' and 'transition'",
                  "Use consistent padding and margins"
                ],
                solution: `/* Modern Card Sections */
.section {
    background: white;
    padding: 40px;
    margin: 30px 0;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    border-left: 4px solid #667eea;
    transition: all 0.3s ease;
}

.section:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.section h2 {
    color: #4a5568;
    font-size: 28px;
    margin-bottom: 20px;
    font-weight: 600;
}`
              }
            ],
            embeds: [
              {
                type: "codepen",
                url: "/codepen-examples/css-basics-playground.html",
                title: "🎨 CSS Basics Playground - Style Your Heart Out!"
              }
            ]
          },
          {
            id: "multi-page-navigation",
            title: "Multi-Page Navigation: Building a Professional Website",
            description: "Transform your single-page portfolio into a multi-page website with professional navigation. Learn file organization, linking pages, and creating seamless user experiences.",
            order: 3,
            estimatedMinutes: 50,
            video: {
              youtubeId: "9YffrCViTVk", // Professional multi-page navigation tutorial
              duration: 3000, // 50 minutes
              thumbnail: "https://img.youtube.com/vi/9YffrCViTVk/maxresdefault.jpg"
            },
            images: [
              {
                src: "/images/lessons/html-css/multi-page-structure.svg",
                alt: "Multi-page website structure diagram",
                title: "Professional Multi-Page Website Structure",
                caption: "How real websites organize content across multiple pages"
              },
              {
                src: "/images/lessons/html-css/file-organization.svg",
                alt: "Professional file organization structure",
                title: "Professional File Organization",
                caption: "Organize your project files like professional developers"
              },
              {
                src: "/images/lessons/html-css/navigation-flow.svg",
                alt: "Navigation user experience flow",
                title: "Navigation User Experience",
                caption: "How users move through your multi-page website"
              }
            ],
            codeExamples: [
              {
                title: "🧭 Professional Navigation Component",
                language: "html",
                code: `<!-- Professional Navigation Component -->
<nav class="main-navigation">
    <div class="nav-container">
        <!-- Your site logo/name -->
        <div class="nav-logo">
            <a href="index.html">Your Name</a>
        </div>
        
        <!-- Navigation menu -->
        <ul class="nav-menu">
            <li class="nav-item">
                <a href="index.html" class="nav-link active">Home</a>
            </li>
            <li class="nav-item">
                <a href="about.html" class="nav-link">About</a>
            </li>
            <li class="nav-item">
                <a href="projects.html" class="nav-link">Projects</a>
            </li>
            <li class="nav-item">
                <a href="contact.html" class="nav-link">Contact</a>
            </li>
        </ul>
    </div>
</nav>

<!-- This navigation goes on EVERY page -->
<!-- Just change the "active" class to match the current page -->`,
                explanation: "🎯 This navigation component is the foundation of professional multi-page websites! Key concepts: 📁 nav = semantic HTML for navigation, 🏠 .nav-logo = your site branding, 📋 .nav-menu = unordered list for menu items, 🔗 .nav-link = individual navigation links, ✨ .active = highlights current page. Pro tip: Copy this exact HTML to every page, just change which link has the 'active' class!"
              },
              {
                title: "✨ Professional Navigation Styling",
                language: "css",
                code: `/* Professional Navigation Styling */
.main-navigation {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 1rem 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-logo a {
    color: white;
    text-decoration: none;
    font-size: 24px;
    font-weight: bold;
}

.nav-menu {
    list-style: none;
    display: flex;
    gap: 30px;
    margin: 0;
    padding: 0;
}

.nav-link {
    color: white;
    text-decoration: none;
    font-weight: 500;
    padding: 10px 15px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.nav-link:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

/* Active page styling */
.nav-link.active {
    background-color: rgba(255, 255, 255, 0.3);
    font-weight: 600;
}

/* Responsive Design */
@media (max-width: 768px) {
    .nav-container {
        flex-direction: column;
        gap: 20px;
    }
    
    .nav-menu {
        gap: 20px;
    }
}`,
                explanation: "🎨 This CSS creates stunning professional navigation! Key features: 🌈 linear-gradient = beautiful color transitions, 📌 position: sticky = navigation follows you while scrolling, 💡 box-shadow = subtle depth effect, 🎯 :hover = interactive feedback, ✨ transition = smooth animations, 📱 @media = mobile-responsive design. Pro tip: The 'sticky' navigation stays visible while users scroll!"
              },
              {
                title: "📁 Professional File Organization",
                language: "text",
                code: `my-portfolio/
├── index.html          (Home page - main landing page)
├── about.html           (About page - your story)
├── projects.html        (Projects page - your work)
├── contact.html         (Contact page - how to reach you)
├── css/
│   └── styles.css       (All your styles in one place)
├── images/
│   ├── profile.jpg      (Your photos and graphics)
│   └── project1.jpg
└── README.md           (Project documentation)

🎯 Why This Organization Works:

✅ Clear Purpose: Each file has a specific job
✅ Easy to Find: Anyone can understand your project structure
✅ Scalable: Easy to add more pages later
✅ Professional: Matches industry standards

📝 Navigation Rules:
1. Same navigation HTML on every page
2. Update "active" class for current page
3. Test all links work correctly
4. Use relative paths (about.html, not /about.html)`,
                explanation: "📁 Professional file organization is crucial for maintainable websites! Structure rules: 🏠 index.html = always your home page, 📂 css/ = keep stylesheets organized, 🖼️ images/ = all photos and graphics, 📋 separate HTML files = one page per file. Pro tip: Use lowercase names and no spaces for web compatibility!"
              },
              {
                title: "🏠 Complete Home Page with Navigation",
                language: "html",
                code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Name - Web Developer Portfolio</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <!-- Navigation (same on all pages) -->
    <nav class="main-navigation">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="index.html">Your Name</a>
            </div>
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="index.html" class="nav-link active">Home</a>
                </li>
                <li class="nav-item">
                    <a href="about.html" class="nav-link">About</a>
                </li>
                <li class="nav-item">
                    <a href="projects.html" class="nav-link">Projects</a>
                </li>
                <li class="nav-item">
                    <a href="contact.html" class="nav-link">Contact</a>
                </li>
            </ul>
        </div>
    </nav>

    <!-- Hero Section -->
    <main class="page-content">
        <section class="hero-section">
            <div class="hero-container">
                <h1>Hi, I'm Your Name</h1>
                <p class="hero-subtitle">Aspiring Web Developer | Building Amazing Digital Experiences</p>
                <p class="hero-description">
                    I'm passionate about creating beautiful, functional websites that solve real problems. 
                    Welcome to my portfolio where you can see my journey and projects!
                </p>
                <div class="hero-buttons">
                    <a href="about.html" class="btn btn-primary">Learn About Me</a>
                    <a href="projects.html" class="btn btn-secondary">View My Work</a>
                </div>
            </div>
        </section>

        <!-- Quick intro sections -->
        <section class="intro-grid">
            <div class="intro-card">
                <h2>About Me</h2>
                <p>Learn about my background, interests, and what drives my passion for web development.</p>
                <a href="about.html" class="card-link">Read More →</a>
            </div>
            
            <div class="intro-card">
                <h2>My Projects</h2>
                <p>Explore the websites and applications I've built during my learning journey.</p>
                <a href="projects.html" class="card-link">View Projects →</a>
            </div>
            
            <div class="intro-card">
                <h2>Get In Touch</h2>
                <p>Ready to collaborate or just want to say hello? I'd love to hear from you!</p>
                <a href="contact.html" class="card-link">Contact Me →</a>
            </div>
        </section>
    </main>
</body>
</html>`,
                explanation: "🏠 This complete home page shows how navigation integrates with content! Page structure: 📋 <nav> = navigation at the top, 🎯 <main> = main page content, 🏆 <section> = organized content sections, 🔗 href links = connect to other pages. Pro tip: Notice how the Home link has 'active' class and all buttons link to other pages in your site!"
              }
            ],
            exercises: [
              {
                title: "🗂️ Exercise 1: Create Professional File Structure",
                description: "Set up your multi-page portfolio with proper file organization that matches professional standards",
                hints: [
                  "Create folders: css/, images/",
                  "Create four HTML files: index.html, about.html, projects.html, contact.html", 
                  "Move your styles.css file into the css/ folder",
                  "Update CSS link paths in all HTML files to 'css/styles.css'",
                  "Test that all files load correctly in your browser"
                ],
                solution: `File Structure:
my-portfolio/
├── index.html
├── about.html  
├── projects.html
├── contact.html
├── css/
│   └── styles.css
├── images/
└── README.md

In each HTML file:
<link rel="stylesheet" href="css/styles.css">

Pro tip: Use relative paths like 'css/styles.css' not '/css/styles.css'`
              },
              {
                title: "🧭 Exercise 2: Build Navigation System",
                description: "Create professional navigation that works perfectly across all your pages",
                hints: [
                  "Add the navigation HTML to all four pages",
                  "Update the 'active' class on each page's navigation",
                  "Test that navigation links work from every page",
                  "Add professional styling with hover effects",
                  "Make navigation mobile-responsive with media queries"
                ],
                solution: `Navigation goes on ALL pages:
<nav class="main-navigation">
  <div class="nav-container">
    <div class="nav-logo">
      <a href="index.html">Your Name</a>
    </div>
    <ul class="nav-menu">
      <li><a href="index.html" class="nav-link active">Home</a></li>
      <li><a href="about.html" class="nav-link">About</a></li>
      <li><a href="projects.html" class="nav-link">Projects</a></li>
      <li><a href="contact.html" class="nav-link">Contact</a></li>
    </ul>
  </div>
</nav>

Remember: Change "active" class for each page!
• index.html: Home gets "active"
• about.html: About gets "active"  
• projects.html: Projects gets "active"
• contact.html: Contact gets "active"`
              }
            ],
            embeds: [
              {
                type: "codepen",
                url: "/codepen-examples/multi-page-navigation-playground.html",
                title: "🌐 Multi-Page Navigation Playground - Build Professional Websites!"
              }
            ]
          },
          {
            id: "html-gaming-arena",
            title: "🎮 HTML Gaming Arena - Level Up Through Play!",
            description: "Master HTML through addictive games, puzzles, leaderboards and RPG-style progression. Compete with other learners and unlock achievements!",
            order: 4,
            estimatedMinutes: 45,
            video: null, // No video needed - this is an interactive game!
            images: [
              {
                src: "/images/lessons/html-css/gaming-arena-hero.svg",
                alt: "HTML Gaming Arena with leaderboards and achievements",
                title: "🎮 Welcome to the HTML Gaming Arena!",
                caption: "Learn HTML through epic challenges, puzzles and competitive gameplay"
              }
            ],
            codeExamples: [
              {
                title: "🧩 Code Puzzle Challenge",
                language: "html",
                code: `<!-- Challenge: Complete this heading tag! -->
<h1>Welcome to my site

<!-- Timer: 30 seconds | Attempts: 3 | Bonus: Speed + Accuracy -->
<!-- Your solution: _____________ -->`,
                explanation: "Speed challenges test your HTML knowledge under pressure! Complete the missing tags as fast as you can to earn maximum points. Time bonuses and attempt bonuses reward both speed and accuracy! 🏆"
              },
              {
                title: "🎯 Drag & Drop HTML Builder",
                language: "html", 
                code: `<!-- Drag these HTML elements to build a complete page: -->

Available Elements:
[<!DOCTYPE html>] [<html>] [<head>] [<title>My Page</title>]
[</head>] [<body>] [<h1>Hello!</h1>] [</body>] [</html>]

Drop Zone:
┌─────────────────────────────────────────┐
│ Drag HTML elements here to build your  │
│ page structure. Order matters!          │
│                                         │
│ 🏆 Perfect structure = 1000 points!    │
└─────────────────────────────────────────┘`,
                explanation: "Visual learners love drag & drop! Build HTML structure by dragging elements into the correct order. Perfect for understanding document flow and nesting! 🎯"
              },
              {
                title: "👹 Boss Challenge: HTML Overlord",
                language: "html",
                code: `<!-- Boss Battle: Defeat the HTML Overlord! -->
<!-- Lives: ❤️❤️❤️ | Time: 5:00 | Difficulty: Progressive -->

Problem 1/3: Fix this broken heading
<h1>Welcome to My Site</h2>
             ↑
         Fix this tag!

Problem 2/3: Complete the document structure  
<html>
  <head></head>
  <body>
    <!-- Missing closing tag! -->

Problem 3/3: Add the missing doctype
<html>
  <head><title>Page</title></head>
</html>
<!-- What goes at the very top? -->`,
                explanation: "Boss battles are the ultimate test! Face progressively harder challenges with limited lives and time pressure. Defeat the boss to unlock the next world! ⚔️"
              }
            ],
            exercises: [
              {
                title: "🏆 Leaderboard Challenge",
                description: "Compete with other learners! Complete speed challenges to climb the leaderboard and earn bonus XP.",
                solution: "</h1>",
                hints: ["Remember closing tags!", "HTML tags come in pairs", "The closing tag has a forward slash"]
              },
              {
                title: "🧩 Puzzle Master Achievement", 
                description: "Solve drag & drop HTML puzzles to master document structure and element nesting.",
                solution: "<!DOCTYPE html>",
                hints: ["This goes at the very top", "It tells the browser what type of document this is", "All modern web pages start with this"]
              },
              {
                title: "👹 Boss Battle: HTML Overlord",
                description: "Face the ultimate HTML challenge! Defeat the HTML Overlord to prove your mastery and unlock advanced content.",
                starterCode: "<h1>Welcome</h2>",
                solution: "<h1>Welcome</h1>",
                hints: ["Opening and closing tags must match", "h1 opens, h1 must close", "Fix the closing tag"]
              }
            ],
            embeds: [
              {
                type: "codepen",
                url: "/games/html-gaming-arena", 
                title: "🎮 HTML Gaming Arena - Play Now!"
              }
            ]
          },
          {
            id: "css-gaming-playground",
            title: "🎨 CSS Gaming Playground - Style Wars!",
            description: "Master CSS through epic color mixing, layout racing, selector battles and championship tournaments. Become the ultimate CSS warrior!",
            order: 5,
            estimatedMinutes: 45,
            video: null,
            images: [
              {
                src: "/images/lessons/html-css/css-gaming-arena.svg",
                alt: "CSS Gaming Playground with color mixing and layout challenges",
                title: "🎨 CSS Gaming Arena - Where Style Meets Strategy!",
                caption: "Master CSS through interactive games, tournaments and epic challenges"
              }
            ],
            codeExamples: [
              {
                title: "🎨 Color Mixing Challenge",
                language: "css",
                code: `/* Challenge: Mix RGB values to match the target color! */
.target-color {
  background-color: rgb(255, 100, 150); /* This pink! */
}

/* Your RGB sliders: */
.your-color {
  background-color: rgb(???, ???, ???);
}

/* Score = 1000 - color_difference - attempts_penalty */
/* Perfect match = Maximum points! */`,
                explanation: "Visual color mixing teaches RGB values through interactive sliders! Adjust red, green, and blue values to match the target color. Perfect for understanding how colors work in CSS! 🎨"
              },
              {
                title: "🏎️ Layout Speed Racing",
                language: "css",
                code: `/* 60-Second Layout Challenge! Complete as many as possible: */

/* Challenge 1: Center a div */
.center-me {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Challenge 2: Create 3 equal columns */
.three-columns {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

/* Challenge 3: Make it responsive */
.responsive {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* Racing = 500 points per completion! */`,
                explanation: "Speed challenges build muscle memory for common CSS patterns! Race against the clock to complete layout challenges. Great for learning flexbox, grid, and responsive design! 🏎️"
              },
              {
                title: "⚔️ CSS Selector Battle Arena",
                language: "css",
                code: `/* Battle the CSS Monster! Answer selector challenges: */

/* Question: "Select all paragraphs" */
p { color: blue; }

/* Question: "Select element with ID 'header'" */
#header { font-size: 2rem; }

/* Question: "Select all elements with class 'button'" */
.button { padding: 10px; }

/* Question: "Select first child of nav" */
nav > :first-child { font-weight: bold; }

/* Wrong answer = lose HP! Correct = deal damage! */
/* Defeat the monster to win! 👹⚔️ */`,
                explanation: "Turn-based combat teaches CSS selectors through epic battles! Each correct selector damages the enemy, wrong answers hurt you. Master selectors to defeat the CSS Monster! ⚔️"
              }
            ],
            exercises: [
              {
                title: "🎨 Color Master Challenge",
                description: "Win the color mixing tournament by achieving perfect color matches with minimal attempts.",
                solution: "rgb(255, 100, 150)",
                hints: ["Use RGB sliders to mix colors", "Red = 255, Green = 100, Blue = 150", "Perfect match gives maximum points"]
              },
              {
                title: "🏎️ Layout Racing Champion",
                description: "Complete 5+ layout challenges in 60 seconds to earn the Speed Demon badge.",
                solution: "display: flex; justify-content: center; align-items: center;",
                hints: ["Flexbox is great for centering", "Grid is perfect for columns", "Don't forget responsive techniques"]
              },
              {
                title: "⚔️ CSS Selector Warrior",
                description: "Defeat the CSS Monster in selector battle by answering all challenges correctly.",
                solution: "p, #header, .button, nav > :first-child",
                hints: ["Elements = tag names", "IDs = #name", "Classes = .name", "Child selector = parent > child"]
              }
            ],
            embeds: [
              {
                type: "codepen",
                url: "/games/css-gaming-playground",
                title: "🎨 CSS Gaming Playground - Battle Now!"
              }
            ]
          }
        ]
      },
      {
        id: "html-css-milestone-setup",
        title: "🚀 Developer Environment Setup - Go Pro!",
        description: "Set up professional coding tools like the pros use. VSCode, GitHub, and your first live website - all free!",
        order: 2,
        isPaid: false, // FREE milestone - critical for student success
        lessons: [
          {
            id: "why-professional-tools",
            title: "Why Do Developers Use Special Tools?",
            description: "Discover why professional developers use code editors, version control, and other tools that make coding 10x easier and more fun!",
            order: 1,
            estimatedMinutes: 15,
            video: {
              youtubeId: "dQw4w9WgXcQ", // Placeholder - will be replaced with actual educational video
              duration: 900, // 15 minutes
              thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
            },
            images: [
              {
                src: "/images/lessons/setup/coding-tools-analogy.svg",
                alt: "Professional coding tools explained through analogies",
                title: "Coding Tools Are Like Professional Equipment",
                caption: "Just like a chef has professional knives, developers have professional tools"
              }
            ],
            embeds: [],
            codeExamples: [], // No code needed - this is conceptual
            exercises: []
          },
          {
            id: "vscode-setup",
            title: "Set Up VSCode - Your Coding Superpower",
            description: "Install and configure Visual Studio Code with all the extensions you need. We'll walk through every single step together!",
            order: 2,
            estimatedMinutes: 25,
            video: {
              youtubeId: "dQw4w9WgXcQ", // Placeholder
              duration: 1500, // 25 minutes
              thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
            },
            images: [
              {
                src: "/images/lessons/setup/vscode-interface-guide.svg",
                alt: "VSCode interface walkthrough for beginners",
                title: "Your New Coding Home",
                caption: "A guided tour of the VSCode interface"
              }
            ],
            codeExamples: [
              {
                title: "🎉 Your First Local HTML File",
                language: "html",
                code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Professional Setup!</title>
</head>
<body>
    <h1>🚀 I'm coding with professional tools!</h1>
    <p>This HTML file is on MY computer, created with VSCode!</p>
    <p>I can edit it, save it, and see changes instantly.</p>
    
    <!-- Try changing this text and saving the file! -->
    <h2>What I love about coding so far:</h2>
    <ul>
        <li>It's creative and fun!</li>
        <li>I can build things people will actually use</li>
        <li>There's always something new to learn</li>
    </ul>
</body>
</html>`,
                explanation: "This is your first HTML file created in VSCode! Notice how the editor gives you colors, auto-completion, and catches typos automatically."
              }
            ],
            exercises: [
              {
                title: "🛠️ Exercise: Set Up Your Coding Environment",
                description: "Follow our step-by-step guide to install VSCode, configure it with helpful extensions, and create your first local HTML file. We'll test everything to make sure it works perfectly!",
                starterCode: "", // No starter code - this is setup
                solution: "", // No solution - this is about following instructions
                hints: [
                  "💡 Download VSCode from code.visualstudio.com",
                  "🎯 Install the Live Server extension for instant previews",
                  "🎨 Add the 'Prettier' extension to automatically format your code",
                  "📁 Create a 'my-websites' folder on your desktop to organize projects",
                  "🧪 Test everything by creating and opening an HTML file"
                ]
              }
            ],
            embeds: [
              {
                type: "stackblitz",
                url: "https://stackblitz.com/edit/vscode-setup-practice",
                title: "Practice VSCode Features"
              }
            ]
          },
          {
            id: "github-basics",
            title: "GitHub - Save Your Code Forever",
            description: "Learn why every developer uses GitHub and set up your own account. We'll show you how to save your projects online and share them with the world!",
            order: 3,
            estimatedMinutes: 20,
            video: {
              youtubeId: "dQw4w9WgXcQ", // Placeholder
              duration: 1200, // 20 minutes
              thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
            },
            images: [
              {
                src: "/images/lessons/setup/github-explained-simple.svg",
                alt: "GitHub explained in simple terms for beginners",
                title: "GitHub: Like Google Drive for Code",
                caption: "Understanding GitHub through familiar analogies"
              }
            ],
            embeds: [],
            codeExamples: [],
            exercises: [
              {
                title: "🌐 Exercise: Create Your GitHub Account and First Repository",
                description: "Set up your GitHub account, create your first repository, and upload your HTML files. By the end, you'll have a live website on the internet!",
                starterCode: "",
                solution: "",
                hints: [
                  "🌟 Choose a professional username - this will be part of your developer identity",
                  "📧 Use your real email address for account verification",
                  "🔒 Set up two-factor authentication for security",
                  "📁 Create your first repository called 'my-first-website'",
                  "🌐 Enable GitHub Pages to make your site live at [username].github.io/my-first-website"
                ]
              }
            ]
          },
          {
            id: "github-desktop",
            title: "GitHub Desktop - Git Made Simple",
            description: "Skip the command line complexity! Use GitHub Desktop to easily manage your code with a point-and-click interface.",
            order: 4,
            estimatedMinutes: 15,
            video: {
              youtubeId: "dQw4w9WgXcQ", // Placeholder
              duration: 900, // 15 minutes
              thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
            },
            images: [
              {
                src: "/images/lessons/setup/github-desktop-workflow.svg",
                alt: "GitHub Desktop workflow for beginners",
                title: "Visual Git Workflow",
                caption: "Managing code changes with GitHub Desktop"
              }
            ],
            embeds: [],
            codeExamples: [],
            exercises: [
              {
                title: "🔄 Exercise: Your First Code Backup and Update",
                description: "Use GitHub Desktop to connect your local project to GitHub, make some changes to your HTML, and push them live. Watch your website update automatically!",
                starterCode: "",
                solution: "",
                hints: [
                  "⬇️ Download GitHub Desktop from desktop.github.com",
                  "🔗 Clone your repository to your computer",
                  "✏️ Make changes to your HTML files in VSCode",
                  "💾 Commit your changes with a descriptive message",
                  "☁️ Push to GitHub and watch your live site update!"
                ]
              }
            ]
          },
          {
            id: "live-website",
            title: "🌐 Your Website Goes Live!",
            description: "The exciting moment - put your website on the real internet! Learn about GitHub Pages and share your creation with friends and family.",
            order: 5,
            estimatedMinutes: 10,
            video: {
              youtubeId: "dQw4w9WgXcQ", // Placeholder
              duration: 600, // 10 minutes
              thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
            },
            images: [
              {
                src: "/images/lessons/setup/github-pages-explained.svg",
                alt: "How GitHub Pages works to host websites for free",
                title: "Free Website Hosting with GitHub Pages",
                caption: "Turn your GitHub repository into a live website"
              }
            ],
            codeExamples: [
              {
                title: "🎉 Add a 'Built with RockitCode' Footer",
                language: "html",
                code: `<!-- Add this to the bottom of your <body> section -->
<footer style="margin-top: 50px; padding: 20px; background-color: #f0f0f0; text-align: center;">
    <p>🚀 Built with <a href="https://rockitcode.com">RockitCode</a></p>
    <p>👨‍💻 Created by [Your Name] | 📧 [your-email@example.com]</p>
</footer>`,
                explanation: "Add a professional footer to show off your new skills! Replace [Your Name] and [your-email@example.com] with your actual information."
              }
            ],
            exercises: [
              {
                title: "🎊 Exercise: Launch Your Website and Share It!",
                description: "Enable GitHub Pages for your repository, test your live website, and share it with at least 3 people. Welcome to the web!",
                starterCode: "",
                solution: "",
                hints: [
                  "⚙️ Go to your repository settings on GitHub.com",
                  "📄 Find the 'Pages' section in the sidebar",
                  "🌐 Enable Pages with 'Deploy from a branch' > 'main'",
                  "⏰ Wait 2-5 minutes for deployment",
                  "🔗 Your site will be live at [username].github.io/[repository-name]",
                  "📱 Test it on your phone - it should work there too!",
                  "💬 Share the link with friends, family, or on social media"
                ]
              }
            ],
            embeds: []
          },
          {
            id: "professional-workflow",
            title: "🎯 Your Professional Developer Workflow",
            description: "Bring it all together! Learn the daily workflow that professional developers use: code in VSCode, save to GitHub, see changes live.",
            order: 6,
            estimatedMinutes: 15,
            video: {
              youtubeId: "dQw4w9WgXcQ", // Placeholder
              duration: 900, // 15 minutes
              thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
            },
            images: [
              {
                src: "/images/lessons/setup/developer-workflow-cycle.svg",
                alt: "The professional developer workflow cycle",
                title: "The Developer Workflow Loop",
                caption: "Code → Save → Test → Commit → Push → Repeat"
              }
            ],
            codeExamples: [
              {
                title: "🔥 Practice Project: Personal Portfolio Page",
                language: "html",
                code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Your Name] - Aspiring Web Developer</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 { color: #333; text-align: center; }
        h2 { color: #666; border-bottom: 2px solid #ddd; }
        .skills { display: flex; flex-wrap: wrap; gap: 10px; }
        .skill { background: #007bff; color: white; padding: 5px 10px; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>👋 Hi, I'm [Your Name]!</h1>
        <h2>🎯 About Me</h2>
        <p>I'm learning web development with RockitCode and loving every minute of it!</p>
        
        <h2>🛠️ Skills I'm Learning</h2>
        <div class="skills">
            <span class="skill">HTML</span>
            <span class="skill">CSS</span>
            <span class="skill">GitHub</span>
            <span class="skill">VSCode</span>
        </div>
        
        <h2>🚀 My Goals</h2>
        <ul>
            <li>Build amazing websites</li>
            <li>Learn JavaScript</li>
            <li>Create my dream project</li>
            <li>Help others learn to code</li>
        </ul>
        
        <h2>📬 Contact Me</h2>
        <p>
            📧 Email: [your-email]<br>
            🐙 GitHub: <a href="https://github.com/[your-username]">github.com/[your-username]</a>
        </p>
    </div>
</body>
</html>`,
                explanation: "This is a complete portfolio template! Replace all the [bracketed] sections with your information, save it as a new file, and push it to GitHub. You now have a professional developer portfolio!"
              }
            ],
            exercises: [
              {
                title: "🎨 Final Exercise: Complete Your Developer Setup",
                description: "Put everything together! Create a professional portfolio page, use your full workflow to get it live, and celebrate becoming a properly equipped developer.",
                starterCode: "",
                solution: "",
                hints: [
                  "📂 Create a new folder called 'portfolio' in your websites directory",
                  "📝 Use the portfolio template provided, but make it uniquely yours",
                  "🎨 Experiment with colors, fonts, and layout",
                  "📸 Consider adding a professional photo if you have one",
                  "🔗 Link to your other projects",
                  "💾 Use your full workflow: VSCode → GitHub Desktop → GitHub Pages",
                  "🎉 Share your portfolio with the RockitCode community!"
                ]
              }
            ],
            embeds: [
              {
                type: "codepen",
                url: "https://codepen.io/rockitcode/pen/portfolio-template",
                title: "Portfolio Template Playground"
              }
            ]
          }
        ]
      },
      {
        id: "html-css-milestone-3",
        title: "Responsive Design",
        description: "Make websites that work on all devices",
        order: 3,
        isPaid: true, // PAID milestone
        lessons: [
          // Lessons 11-20 would go here
        ]
      },
      {
        id: "html-css-milestone-4",
        title: "Advanced Layouts",
        description: "Master Flexbox, Grid, and modern CSS",
        order: 4,
        isPaid: true, // PAID milestone
        lessons: [
          // Lessons 21-30 would go here
        ]
      }
    ]
  },
  {
    id: "javascript",
    title: "JavaScript Programming",
    description: "Bring your websites to life with interactive JavaScript. From basics to building real applications.",
    difficulty: "beginner",
    estimatedHours: 20,
    icon: "⚡",
    color: "bg-yellow-500",
    category: "programming",
    prerequisites: ["html-css"], // Recommend HTML/CSS first
    tags: ["programming", "interactive", "web development", "frontend"],
    isActive: true,
    milestones: [
      {
        id: "javascript-milestone-1",
        title: "JavaScript Fundamentals",
        description: "Variables, functions, and basic programming concepts",
        order: 1,
        isPaid: false, // FREE milestone
        lessons: [
          {
            id: "js-variables",
            title: "Variables and Data Types",
            description: "Store and work with different types of data",
            order: 1,
            estimatedMinutes: 40,
            video: null,
            codeExamples: [
              {
                title: "JavaScript Variables",
                language: "javascript",
                code: `// Different ways to declare variables
let name = "Alex";
const age = 25;
var city = "New York";

// Different data types
let isStudent = true;        // Boolean
let score = 95.5;           // Number
let hobbies = ["coding", "reading"]; // Array`,
                explanation: "Variables store data. Use 'let' for changeable values, 'const' for constants."
              }
            ],
            exercises: [
              {
                title: "Create Your Variables",
                description: "Practice declaring variables for different data types.",
                hints: [
                  "Use 'let' for values that might change",
                  "Use 'const' for values that stay the same",
                  "Try storing numbers, text, and true/false values"
                ],
                solution: `// Sample solution here`
              }
            ],
            embeds: []
          }
        ]
      }
    ]
  },
  {
    id: "python",
    title: "Python Programming",
    description: "Learn the most beginner-friendly programming language. Perfect for automation, data, and more.",
    difficulty: "beginner",
    estimatedHours: 18,
    icon: "🐍",
    color: "bg-green-500",
    category: "programming",
    prerequisites: [], // Python is beginner-friendly, no prerequisites
    tags: ["programming", "automation", "data science", "beginner-friendly"],
    isActive: true,
    milestones: [
      {
        id: "python-milestone-1",
        title: "Python Basics",
        description: "Variables, functions, and Python fundamentals",
        order: 1,
        isPaid: false, // FREE milestone
        lessons: [
          {
            id: "python-intro",
            title: "Getting Started with Python",
            description: "Your first Python program and basic syntax",
            order: 1,
            estimatedMinutes: 35,
            video: null,
            codeExamples: [
              {
                title: "Hello Python",
                language: "python",
                code: `# Your first Python program
print("Hello, RockitCode!")

# Variables in Python
name = "Alex"
age = 25
is_learning = True

print(f"Hi {name}, you are {age} years old!")`,
                explanation: "Python is clean and readable. Notice how simple it is compared to other languages!"
              }
            ],
            exercises: [
              {
                title: "Your First Python Program",
                description: "Write a program that introduces yourself.",
                hints: [
                  "Use print() to display text",
                  "Use variables to store your information",
                  "Try using f-strings for formatting"
                ],
                solution: `# Sample solution here`
              }
            ],
            embeds: [
              {
                type: "replit",
                url: "https://replit.com/@rockitcode/python-intro", // Placeholder
                title: "Python Introduction Practice"
              }
            ]
          }
        ]
      }
    ]
  }
];
