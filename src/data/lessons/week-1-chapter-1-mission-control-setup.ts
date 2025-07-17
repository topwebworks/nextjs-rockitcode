/**
 * Week 1 - Chapter 1.1: Mission Control Setup
 * 
 * OBJECTIVE: Transform complete beginner to professional developer setup
 * OUTCOME: Student has GitHub account, VS Code, and publishes first code live
 * 
 * This is designed for someone who has NEVER coded before (13+ years old)
 */

import type { 
  InteractiveLesson,
  InteractiveLab,
  ConceptIntroduction,
  MicroChallenge,
  KnowledgeCheck,
  Achievement,
  CompletionCriteria,
  NextLesson,
  TechnicalRequirements
} from '@/types/interactive-lesson'

export const missionControlSetupLesson: InteractiveLesson = {
  // Course Structure
  courseId: "foundation-launch",
  week: 1,
  chapter: 1,
  chapterTitle: "Mission Control Setup",
  
  // Lesson Metadata
  lessonId: "mission-control-setup",
  title: "Mission Control Setup - Become a Real Developer",
  description: "Transform from complete beginner to professional developer with your own GitHub account, VS Code, and first live website - all in 2 days!",
  
  // Learning Objectives (What students will achieve)
  objectives: [
    "Create professional GitHub account with Student Pack ($200k+ in free tools)",
    "Set up VS Code with Git and GitHub Copilot like real developers",
    "Write first code in professional development environment",
    "Publish first code to GitHub and see it live on the internet",
    "Understand the developer workflow: Code → GitHub → Live Website"
  ],
  
  // Prerequisites (Truly beginner friendly)
  prerequisites: [
    "Computer with internet connection",
    "Email address for account creation",
    "Excitement to learn coding!",
    "No coding experience required - we start from zero"
  ],
  
  // Time Estimation
  estimatedTime: "90-120 minutes (can be split across 2 days)",
  
  // Hero Video Placeholder (Your overview after course completion)
  heroVideo: {
    id: "mission-control-setup-overview",
    title: "Mission Control Setup - The Developer Way",
    description: "See how real developers set up their professional environment and publish code live",
    duration: "5 minutes",
    placeholder: true,
    thumbnailAlt: "Professional developer environment setup workflow"
  },

  // CORE LEARNING CONTENT - Interactive and Hands-On
  
  // 1. CONCEPT INTRODUCTIONS (Build Understanding)
  concepts: [
    {
      id: "what-is-github",
      title: "🌍 What is GitHub? (Your Developer Home Base)",
      description: "GitHub is like Google Drive for code - but way more powerful!",
      analogy: "Think of GitHub like Instagram for developers. Instead of posting photos, you post code. Instead of likes, you get job offers!",
      whyItMatters: "Every professional developer uses GitHub. It's where you store code, collaborate with others, and show off your work to employers.",
      realWorldExample: "Companies like Netflix, Spotify, and Microsoft store all their code on GitHub. When you have a GitHub profile, you're part of the same community as developers at top tech companies."
    },
    {
      id: "what-is-vs-code",
      title: "⚡ What is VS Code? (Your Code Writing Superpower)",
      description: "VS Code is where professional developers write code - it's like Microsoft Word but for coding!",
      analogy: "VS Code is to coding what Photoshop is to photo editing - the professional tool that makes everything easier and more powerful.",
      whyItMatters: "VS Code helps you write code faster, catch mistakes automatically, and even suggests code for you with AI (GitHub Copilot).",
      realWorldExample: "Over 14 million developers use VS Code daily. Google, Facebook, and Twitter developers all use VS Code to build the apps you use every day."
    },
    {
      id: "what-is-git",
      title: "🔄 What is Git? (Your Code Time Machine)",
      description: "Git tracks every change to your code, like having unlimited undo for everything you've ever written!",
      analogy: "Git is like having a magic notebook that remembers every version of every page you've ever written, and you can go back to any version at any time.",
      whyItMatters: "Git lets you experiment freely, collaborate with others, and never lose your work. It's essential for professional development.",
      realWorldExample: "When developers at Apple work on iOS, Git tracks millions of code changes from thousands of developers, making sure nothing gets lost."
    }
  ] as ConceptIntroduction[],

  // 2. INTERACTIVE LABS (Hands-On Learning)
  interactiveLabs: [
    {
      id: "github-account-creation",
      title: "Lab 1: Create Your Professional GitHub Account",
      description: "Set up your developer identity and unlock $200k+ in free professional tools",
      type: "guided-setup",
      estimatedMinutes: 15,
      instructions: [
        "Go to github.com and click 'Sign up' (we'll guide you through each step)",
        "Choose a professional username (this becomes part of your website URL!)",
        "Create a strong password and verify your email",
        "Complete GitHub's verification process",
        "Set your profile to 'Public' so employers can find you",
        "Upload a professional photo (or fun avatar - your choice!)"
      ],
      validationCriteria: [
        "GitHub account created and verified",
        "Professional username selected",
        "Profile photo uploaded",
        "Email verified and account active"
      ],
      hints: [
        "Choose a username you'll be proud to put on your resume",
        "github.com/yourusername will be your professional developer URL",
        "You can always change your photo later, but username changes are harder"
      ],
      successMessage: "🎉 Amazing! You now have a professional GitHub account. You're officially part of the global developer community!",
      nextStepPreview: "Next: We'll activate $200k+ worth of free professional developer tools with GitHub Student Pack"
    },
    {
      id: "student-pack-activation",
      title: "🎁 Lab 2: Unlock $200k+ in Free Developer Tools",
      description: "Activate GitHub Student Pack to get the same premium tools that professional developers use",
      type: "guided-setup",
      estimatedMinutes: 10,
      instructions: [
        "Go to education.github.com/pack while logged into GitHub",
        "Click 'Get Student benefits' and verify you're a student",
        "Submit verification (school email or student ID photo)",
        "Explore your unlocked tools: GitHub Copilot, Canva Pro, Figma Pro, and 100+ more!",
        "Activate GitHub Copilot (your AI coding assistant)",
        "Bookmark your Student Pack dashboard for future reference"
      ],
      validationCriteria: [
        "Student Pack application submitted",
        "GitHub Copilot access confirmed",
        "Student Pack dashboard accessible",
        "At least 3 tools explored"
      ],
      hints: [
        "If you don't have school email, upload a photo of student ID",
        "Student Pack approval can take 1-7 days, but Copilot often works immediately",
        "These tools are worth over $200,000 - that's more valuable than most college courses!"
      ],
      successMessage: "🚀 Incredible! You now have access to the same premium tools that developers at Google, Netflix, and Tesla use every day!",
      nextStepPreview: "Next: Set up VS Code with all the professional developer extensions"
    },
    {
      id: "vscode-installation",
      title: "⚡ Lab 3: Install Your Professional Code Editor",
      description: "Download and configure VS Code exactly like professional developers",
      type: "guided-setup",
      estimatedMinutes: 20,
      instructions: [
        "Download VS Code from code.visualstudio.com (it's completely free)",
        "Install VS Code using the downloaded installer",
        "Open VS Code and take a quick tour of the interface",
        "Install essential extensions: GitHub Copilot, Live Server, Prettier",
        "Sign in to VS Code with your GitHub account",
        "Test GitHub Copilot by typing a comment and watching AI suggestions appear",
        "Customize your theme (make it look awesome!)"
      ],
      validationCriteria: [
        "VS Code successfully installed and running",
        "GitHub account connected to VS Code",
        "GitHub Copilot extension installed and working",
        "Live Server extension installed",
        "AI suggestions working when typing comments"
      ],
      hints: [
        "Choose 'Dark+' theme if you want to look like a movie hacker",
        "GitHub Copilot will suggest code as you type - it's like having a genius coding partner",
        "Live Server will let you see your websites instantly as you build them"
      ],
      successMessage: "🎯 Perfect! You now have the exact same professional development environment used by developers at major tech companies!",
      nextStepPreview: "Next: Create your first repository and write your first code"
    },
    {
      id: "first-repository-creation",
      title: "Lab 4: Create Your First Code Repository",
      description: "Learn the professional GitHub workflow by creating your first project",
      type: "hands-on-practice",
      estimatedMinutes: 15,
      instructions: [
        "In GitHub, click the '+' button and select 'New repository'",
        "Name it 'my-first-website' (this will become my-first-website.github.io)",
        "Make it Public (so you can show it off!)",
        "Check 'Add a README file'",
        "Click 'Create repository' - you just created your first project!",
        "Copy the repository URL (green 'Code' button)",
        "In VS Code, press Ctrl+Shift+P and type 'Git: Clone'",
        "Paste your repository URL and choose a folder",
        "Open the cloned folder in VS Code"
      ],
      validationCriteria: [
        "Repository created on GitHub with correct name",
        "Repository successfully cloned to local computer",
        "VS Code showing repository files",
        "README.md file visible in VS Code",
        "Git connection working between VS Code and GitHub"
      ],
      hints: [
        "Repository name becomes part of your website URL",
        "Cloning downloads the repository to your computer so you can edit it",
        "The green 'Code' button gives you the URL to copy"
      ],
      successMessage: "🔥 Outstanding! You've created your first repository and connected VS Code to GitHub. You're working exactly like professional developers!",
      nextStepPreview: "Next: Write your first HTML code and see it live on the internet"
    },
    {
      id: "first-code-creation",
      title: "Lab 5: Write Your First Professional Code",
      description: "Create your first HTML file and experience the magic of coding",
      type: "hands-on-practice",
      estimatedMinutes: 20,
      instructions: [
        "In VS Code, create a new file called 'index.html' (File → New File → Save As)",
        "Copy and paste this complete HTML code (or type it if you want the practice):",
        "",
        "<!DOCTYPE html>",
        "<html lang=\"en\">",
        "  <head>",
        "    <meta charset=\"UTF-8\">",
        "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
        "    <title>My First Website - [Your Name]</title>",
        "  </head>",
        "  <body>",
        "    <h1>Hello, World! 🌍</h1>",
        "    <p>I'm learning to code and this is my first website!</p>",
        "    <p>Built with HTML, powered by determination! 💪</p>",
        "  </body>",
        "</html>",
        "",
        "Replace '[Your Name]' with your actual name in the title",
        "Save the file (Ctrl+S or Cmd+S on Mac)",
        "Right-click on 'index.html' in the file explorer and select 'Open with Live Server'",
        "Your browser will open showing your live website - congratulations!"
      ],
      validationCriteria: [
        "index.html file created and saved in the correct folder",
        "HTML includes proper DOCTYPE and language declaration",
        "Title contains your name (shows in browser tab)",
        "File opens successfully with Live Server",
        "Website displays heading and paragraphs with your content",
        "Browser shows your name in the tab title"
      ],
      hints: [
        "The Live Server extension shows a 'Go Live' button in the bottom status bar",
        "If Live Server isn't working, try: Extensions → Search 'Live Server' → Install",
        "Your website updates instantly when you save changes - try editing the text!",
        "Meta tags help make your website work better on phones and tablets"
      ],
      successMessage: "🌟 AMAZING! You just wrote real HTML code and created a working website! You're officially a coder now!",
      nextStepPreview: "Next: Publish your code to GitHub and make it live on the internet"
    },
    {
      id: "git-workflow-practice",
      title: "🔄 Lab 6: Master the Professional Git Workflow",
      description: "Learn how real developers save and publish their code",
      type: "hands-on-practice",
      estimatedMinutes: 15,
      instructions: [
        "In VS Code, open the Source Control panel (Git icon on left sidebar)",
        "You'll see your index.html file listed under 'Changes'",
        "Click the '+' button next to index.html to 'stage' your changes",
        "Type a commit message: 'Add my first HTML page'",
        "Click the checkmark button to 'commit' your changes",
        "Click the 'Sync Changes' button to push to GitHub",
        "Go to your GitHub repository in browser and refresh",
        "See your code now appears on GitHub - you just published code like a pro!"
      ],
      validationCriteria: [
        "Changes staged in VS Code Git panel",
        "Meaningful commit message written",
        "Changes committed successfully",
        "Changes pushed to GitHub",
        "index.html visible in GitHub repository",
        "Commit history showing in GitHub"
      ],
      hints: [
        "Staging means 'prepare these changes to be saved'",
        "Committing means 'save these changes with a description'",
        "Pushing means 'upload my changes to GitHub'",
        "This is the exact workflow used by developers at every tech company"
      ],
      successMessage: "🚀 Phenomenal! You've mastered the professional Git workflow: Edit → Stage → Commit → Push. You're working exactly like senior developers!",
      nextStepPreview: "Next: Make your website live on the internet for everyone to see"
    },
    {
      id: "github-pages-deployment",
      title: "🌐 Lab 7: Make Your Website Live on the Internet",
      description: "Deploy your first website and share it with the world",
      type: "celebration",
      estimatedMinutes: 10,
      instructions: [
        "In your GitHub repository, click on 'Settings' tab",
        "Scroll down to 'Pages' section in the left sidebar",
        "Under 'Source', select 'Deploy from a branch'",
        "Choose 'main' branch and '/ (root)' folder",
        "Click 'Save' and wait for GitHub to build your site",
        "Within 2-3 minutes, your website will be live at:",
        "https://yourusername.github.io/my-first-website",
        "Share this link with friends and family - you're officially published!",
        "Bookmark this URL - it's your first live website!"
      ],
      validationCriteria: [
        "GitHub Pages successfully configured",
        "Website accessible at github.io URL",
        "HTML content displaying correctly online",
        "Website loads properly in different browsers",
        "URL shareable with others"
      ],
      hints: [
        "GitHub Pages is completely free and used by millions of developers",
        "Your website URL will be: yourusername.github.io/my-first-website",
        "It may take 2-10 minutes for changes to appear online"
      ],
      successMessage: "🎉 INCREDIBLE! Your code is now live on the internet! You've gone from zero to published developer in one lesson!",
      nextStepPreview: "Next lesson: We'll make your website beautiful with CSS and add more pages"
    }
  ] as InteractiveLab[],

  // 3. MICRO CHALLENGES (Quick Wins)
  microChallenges: [
    {
      id: "profile-customization",
      title: "Quick Win: Customize Your GitHub Profile",
      description: "Make your GitHub profile stand out",
      task: "Add a bio, location, and website URL to your GitHub profile",
      expectedOutcome: "Professional GitHub profile that makes a great first impression",
      celebrationMessage: "Perfect! Your GitHub profile now looks professional and welcoming!"
    },
    {
      id: "commit-message-practice",
      title: "📝 Quick Win: Write Great Commit Messages",
      description: "Practice writing clear, professional commit messages",
      task: "Make a small change to your HTML and write a descriptive commit message",
      expectedOutcome: "Clear commit history that explains what changes were made",
      celebrationMessage: "Excellent! You're writing commit messages like a seasoned developer!"
    },
    {
      id: "vs-code-shortcuts",
      title: "⚡ Quick Win: Learn Developer Shortcuts",
      description: "Master essential VS Code keyboard shortcuts",
      task: "Practice Ctrl+S (save), Ctrl+C (copy), Ctrl+V (paste), and Ctrl+Z (undo)",
      expectedOutcome: "Faster, more efficient code editing",
      celebrationMessage: "Amazing! You're already coding faster with professional shortcuts!"
    }
  ] as MicroChallenge[],

  // 4. KNOWLEDGE VALIDATION (Understanding Checks)
  knowledgeChecks: [
    {
      id: "github-understanding",
      question: "What is GitHub and why do developers use it?",
      type: "explanation",
      correctAnswer: "GitHub is a platform where developers store, share, and collaborate on code. It's like Google Drive for code, with version control and collaboration features.",
      hints: ["Think about what makes GitHub different from regular file storage", "Consider why teams of developers need special tools to work together"]
    },
    {
      id: "git-workflow-understanding", 
      question: "Explain the Git workflow: Stage → Commit → Push",
      type: "explanation",
      correctAnswer: "Stage means prepare changes to be saved. Commit means save changes with a description. Push means upload changes to GitHub.",
      hints: ["Each step serves a specific purpose in the code saving process", "Think about why developers need multiple steps instead of just 'save'"]
    },
    {
      id: "professional-setup-benefits",
      question: "How is your current setup similar to what professional developers use?",
      type: "reflection",
      correctAnswer: "I'm using the same tools (GitHub, VS Code, Git) and workflows (edit, commit, push, deploy) that developers at major tech companies use daily.",
      hints: ["Consider the tools you've just installed", "Think about the workflow you've just learned"]
    }
  ],

  // 5. CELEBRATION & PROGRESS TRACKING
  achievements: [
    {
      id: "first-github-account",
      title: "GitHub Community Member",
      description: "Created professional GitHub account",
      badgeIcon: "github",
      unlockedMessage: "Welcome to the global developer community!"
    },
    {
      id: "student-pack-unlocked",
      title: "💎 Pro Tools Master",
      description: "Unlocked $200k+ in professional developer tools",
      badgeIcon: "tools",
      unlockedMessage: "You now have access to the same premium tools used by top tech companies!"
    },
    {
      id: "first-code-written",
      title: "Code Creator",
      description: "Wrote first HTML code in professional environment",
      badgeIcon: "code",
      unlockedMessage: "You're officially a coder now!"
    },
    {
      id: "first-commit-made",
      title: "📝 Git Master",
      description: "Mastered professional Git workflow",
      badgeIcon: "git",
      unlockedMessage: "You're using the exact same workflow as senior developers!"
    },
    {
      id: "first-deployment",
      title: "🌐 Live Publisher",
      description: "Published first website live on the internet",
      badgeIcon: "globe",
      unlockedMessage: "Your code is now live for the whole world to see!"
    }
  ],

  // 6. LESSON COMPLETION OUTCOMES
  completionCriteria: {
    required: [
      "GitHub account created and verified",
      "VS Code installed with essential extensions",
      "First repository created and cloned",
      "HTML file created with valid content",
      "Git workflow completed (stage, commit, push)",
      "Website successfully deployed to GitHub Pages"
    ],
    optional: [
      "GitHub profile customized with bio and photo",
      "Multiple commit messages written",
      "VS Code shortcuts practiced",
      "Student Pack tools explored"
    ]
  },

  // What students will have accomplished
  outcomes: [
    "Professional GitHub account with Student Pack activated",
    "VS Code development environment with AI assistance",
    "First HTML website created and deployed live",
    "Professional Git workflow mastered",
    "Understanding of developer tools and processes",
    "Confidence to continue learning and building"
  ],

  // Bridge to next lesson
  nextLesson: {
    id: "first-professional-portfolio",
    title: "Chapter 1.2: First Professional Portfolio",
    preview: "Now that you have your developer setup, we'll create a beautiful personal portfolio website that showcases who you are and what you're learning to build. You'll learn HTML structure, CSS styling, and make your website look amazing!",
    estimatedTime: "2-3 hours",
    newSkills: ["HTML structure", "CSS styling", "Professional design", "Portfolio presentation"]
  },

  // Technical Implementation Notes for Platform
  technicalRequirements: {
    githubOAuth: "Required for seamless account creation and repository management",
    vsCodeExtension: "Optional: VS Code extension for direct platform integration",
    livePreview: "Required: Real-time preview of HTML/CSS changes",
    gitIntegration: "Required: Automated Git operations and GitHub synchronization",
    deploymentMonitoring: "Required: Track GitHub Pages deployment status",
    progressTracking: "Required: Save completion status and achievement unlocks"
  }
};

export default missionControlSetupLesson;
