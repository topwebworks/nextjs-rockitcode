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
    return (await import(`@/data/rockitcode-lessons/${courseId}/${lessonId}.mdx`)).default;
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
        id: "html-css-milestone-1",
        title: "🚀 Web Foundations - Your First Steps",
        description: "Start your web development journey! Learn HTML structure, add your first styling with CSS, and build real web pages you can show off to friends and family.",
        order: 1,
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
            title: "CSS Styling Fundamentals",
            description: "Add colors, fonts, and layouts to your HTML",
            order: 2,
            estimatedMinutes: 50,
            video: null, // No video for this lesson
            codeExamples: [
              {
                title: "Basic CSS Styling",
                language: "css",
                code: `body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 20px;
}

h1 {
    color: #333;
    text-align: center;
}

p {
    color: #666;
    line-height: 1.6;
}`,
                explanation: "CSS controls how your HTML looks. We're styling the body, headings, and paragraphs."
              }
            ],
            exercises: [
              {
                title: "Style Your Page",
                description: "Add CSS to make your HTML page look beautiful.",
                hints: [
                  "Link your CSS file in the <head> section",
                  "Try changing colors with the 'color' property",
                  "Use 'font-family' to change fonts"
                ],
                solution: `/* Complete CSS solution here */`
              }
            ],
            embeds: []
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
            codeExamples: [], // No code needed - this is conceptual
            exercises: [],
            embeds: []
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
            ],
            embeds: []
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
            ],
            embeds: []
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
