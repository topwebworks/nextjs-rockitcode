// Foundation Course: Design to Code Fundamentals
// Project: Personal Portfolio v1.0 (Static)

export interface Course {
  id: string
  title: string
  description: string
  project: ProjectInfo
  milestones: Milestone[]
  duration: string
  level: 'foundation' | 'intermediate' | 'advanced' | 'expert'
  technologies: string[]
}

export interface ProjectInfo {
  name: string
  description: string
  finalResult: string
  portfolioValue: string
  techStack: string[]
  liveDemo?: string
  githubRepo?: string
}

export interface Milestone {
  id: string
  title: string
  description: string
  lessons: Lesson[]
  project: MilestoneProject
  duration: string
  prerequisites?: string[]
}

export interface Lesson {
  id: string
  title: string
  description: string
  chapters: Chapter[]
  codeProject: CodeProject
  quiz: QuizQuestion[]
  duration: number // minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export interface Chapter {
  id: string
  title: string
  description: string
  videoTimestamp: number
  duration: number // seconds
  concepts: string[]
  codeExample?: CodeExample
  practiceExercise?: Exercise
  learningObjectives: string[]
}

export interface CodeProject {
  name: string
  description: string
  initialCode: string
  targetCode: string
  instructions: string[]
  hints: string[]
  successCriteria: string[]
  portfolioComponent: string
}

export interface QuizQuestion {
  id: string
  question: string
  type: 'multiple-choice' | 'fill-blank' | 'drag-drop' | 'code-fix'
  options?: string[]
  correctAnswer: string | string[]
  explanation: string
  hints: string[]
  maxAttempts: number
}

export interface CodeExample {
  language: string
  code: string
  explanation: string
  highlights: number[] // line numbers to highlight
}

export interface Exercise {
  title: string
  instruction: string
  startingCode: string
  expectedOutput: string
  hints: string[]
  solution: string
}

export interface MilestoneProject {
  component: string
  description: string
  buildInstructions: string[]
  portfolioIntegration: string
}

// Foundation Course Definition
export const foundationCourse: Course = {
  id: 'foundation-design-to-code',
  title: 'Design to Code Fundamentals',
  description: 'Build a beautiful personal portfolio from Figma design to deployed website',
  project: {
    name: 'DevCraft Portfolio v1.0',
    description: 'Professional personal portfolio with modern design and perfect code implementation',
    finalResult: 'Static portfolio website with TailwindUI-quality design, perfect performance, and professional presentation',
    portfolioValue: 'Interview-ready portfolio that demonstrates design-to-code skills and modern web development practices',
    techStack: ['VSCode', 'Figma', 'HTML5', 'CSS3', 'JavaScript', 'TailwindCSS', 'Git', 'Vercel'],
    liveDemo: 'https://yourname.vercel.app',
    githubRepo: 'https://github.com/yourname/portfolio'
  },
  milestones: [
    {
      id: 'chapter-1',
      title: 'Chapter 1: Development Environment Setup',
      description: 'Master VSCode, Git, and essential development tools before coding',
      duration: '3-4 days',
      lessons: [
        {
          id: 'lesson-1-vscode-basics',
          title: 'Lesson 1: VSCode Getting Started',
          description: 'Learn the fundamentals of the world\'s most popular code editor with beginner-friendly lessons',
          duration: 45,
          difficulty: 'beginner',
          chapters: [
            {
              id: 'block-1-vscode-installation',
              title: 'Block 1: Installing VSCode',
              description: 'Download, install, and verify VSCode setup on your system',
              videoTimestamp: 0,
              duration: 300,
              concepts: ['VSCode download', 'Installation process', 'System verification'],
              learningObjectives: [
                'Successfully install VSCode on your operating system',
                'Verify installation and check version',
                'Understand VSCode\'s role in web development'
              ]
            },
            {
              id: 'block-2-workspace-setup',
              title: 'Block 2: Workspace Management',
              description: 'Learn to organize projects and manage workspace settings',
              videoTimestamp: 300,
              duration: 400,
              concepts: ['Project folders', 'Workspace settings', 'File navigation'],
              learningObjectives: [
                'Open and organize project folders effectively',
                'Configure workspace-specific settings',
                'Navigate large codebases efficiently'
              ]
            },
            {
              id: 'block-3-extensions-management',
              title: 'Block 3: Essential Extensions',
              description: 'Install and configure must-have extensions for web development',
              videoTimestamp: 700,
              duration: 500,
              concepts: ['Extension marketplace', 'GitHub Copilot', 'Live Server', 'Prettier'],
              learningObjectives: [
                'Install essential development extensions',
                'Configure GitHub Copilot for AI assistance',
                'Set up Live Server for instant preview'
              ]
            },
            {
              id: 'block-4-terminal-basics',
              title: 'Block 4: Integrated Terminal',
              description: 'Master the built-in terminal for seamless development workflow',
              videoTimestamp: 1200,
              duration: 400,
              concepts: ['Terminal basics', 'Multiple sessions', 'Shell integration'],
              learningObjectives: [
                'Use the integrated terminal effectively',
                'Manage multiple terminal sessions',
                'Run development commands efficiently'
              ]
            },
            {
              id: 'block-5-devtools-integration',
              title: 'Block 5: Browser DevTools Integration',
              description: 'Connect VSCode with browser developer tools for live development',
              videoTimestamp: 1600,
              duration: 300,
              concepts: ['Live reload', 'DevTools connection', 'Debugging setup'],
              learningObjectives: [
                'Set up live development workflow',
                'Connect browser DevTools with VSCode',
                'Configure debugging environment'
              ]
            }
          ],
          codeProject: {
            name: 'Development Environment Setup',
            description: 'Configure a complete VSCode development environment',
            initialCode: '',
            targetCode: '// VSCode fully configured with extensions and settings',
            instructions: [
              'Install VSCode and verify installation',
              'Install essential extensions (Live Server, Prettier, GitHub Copilot)',
              'Create a test project and open in VSCode',
              'Configure workspace settings',
              'Test terminal integration and live preview'
            ],
            hints: [
              'Use code --version to verify installation',
              'Extensions can be installed via the marketplace or command line',
              'Live Server enables instant preview of HTML files'
            ],
            successCriteria: [
              'VSCode installed and verified',
              'Essential extensions installed and configured',
              'Test project opens correctly',
              'Terminal and live preview working'
            ],
            portfolioComponent: 'Development environment ready for portfolio creation'
          },
          quiz: [
            {
              id: 'vscode-basics',
              question: 'What is the keyboard shortcut to open the integrated terminal in VSCode?',
              type: 'multiple-choice',
              options: ['Ctrl+`', 'Ctrl+T', 'Ctrl+Shift+`', 'Ctrl+Alt+T'],
              correctAnswer: 'Ctrl+`',
              explanation: 'Ctrl+` (backtick) is the default shortcut to toggle the integrated terminal in VSCode.',
              hints: ['Look for the backtick key, usually above Tab', 'This shortcut toggles the terminal open/closed'],
              maxAttempts: 3
            }
          ]
        }
      ],
      project: {
        component: 'Complete Development Environment',
        description: 'Fully configured VSCode workspace ready for professional web development',
        buildInstructions: [
          'Install and configure VSCode with essential extensions',
          'Set up integrated terminal and shell integration',
          'Configure live development workflow with Live Server',
          'Test GitHub Copilot integration',
          'Create template project structure'
        ],
        portfolioIntegration: 'Development environment serves as foundation for all subsequent portfolio work'
      }
    },
    {
      id: 'design-foundation',
      title: 'Design Foundation',
      description: 'Create a professional design system and portfolio layout in Figma',
      duration: '1 week',
      lessons: [
        {
          id: 'portfolio-strategy',
          title: 'Portfolio Strategy & Personal Branding',
          description: 'Define your developer brand and plan your portfolio strategy',
          duration: 25,
          difficulty: 'beginner',
          chapters: [
            {
              id: 'understanding-purpose',
              title: 'Understanding Portfolio Purpose',
              description: 'Why portfolios matter for developers and what employers look for',
              videoTimestamp: 0,
              duration: 300, // 5 minutes
              concepts: ['Portfolio purpose', 'Employer expectations', 'Career goals'],
              learningObjectives: [
                'Understand the role of portfolios in developer careers',
                'Identify what employers look for in portfolios',
                'Define personal career goals and target audience'
              ]
            },
            {
              id: 'personal-brand',
              title: 'Defining Your Personal Brand',
              description: 'Discover your unique value proposition as a developer',
              videoTimestamp: 300,
              duration: 400,
              concepts: ['Personal branding', 'Value proposition', 'Unique strengths'],
              learningObjectives: [
                'Identify personal strengths and technical interests',
                'Craft a compelling personal brand statement',
                'Understand how to differentiate yourself in the market'
              ]
            },
            {
              id: 'content-strategy',
              title: 'Content Strategy Planning',
              description: 'Plan the content and structure of your portfolio',
              videoTimestamp: 700,
              duration: 350,
              concepts: ['Content planning', 'Information architecture', 'User journey'],
              learningObjectives: [
                'Plan portfolio sections and content hierarchy',
                'Create user journey for portfolio visitors',
                'Develop content strategy that showcases skills'
              ]
            },
            {
              id: 'competitive-analysis',
              title: 'Competitive Analysis',
              description: 'Analyze successful developer portfolios for inspiration',
              videoTimestamp: 1050,
              duration: 300,
              concepts: ['Competitive analysis', 'Best practices', 'Design patterns'],
              learningObjectives: [
                'Analyze 5+ successful developer portfolios',
                'Identify common patterns and best practices',
                'Note unique approaches and creative solutions'
              ]
            },
            {
              id: 'success-metrics',
              title: 'Defining Success Metrics',
              description: 'Set measurable goals for your portfolio',
              videoTimestamp: 1350,
              duration: 150,
              concepts: ['Success metrics', 'KPIs', 'Goal setting'],
              learningObjectives: [
                'Define measurable portfolio success metrics',
                'Set realistic timeline and goals',
                'Plan how to track portfolio performance'
              ]
            }
          ],
          codeProject: {
            name: 'Portfolio Strategy Document',
            description: 'Create a comprehensive strategy document for your portfolio',
            initialCode: `<!-- Portfolio Strategy Template -->
<!DOCTYPE html>
<html>
<head>
    <title>My Portfolio Strategy</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .section { margin-bottom: 30px; padding: 20px; border: 1px solid #ddd; }
        h2 { color: #333; border-bottom: 2px solid #4A90E2; }
    </style>
</head>
<body>
    <h1>My Developer Portfolio Strategy</h1>
    
    <div class="section">
        <h2>Personal Brand Statement</h2>
        <p>[Your unique value proposition as a developer]</p>
    </div>
    
    <div class="section">
        <h2>Target Audience</h2>
        <ul>
            <li>[Type of employers you want to attract]</li>
            <li>[Industries you're interested in]</li>
            <li>[Company sizes you prefer]</li>
        </ul>
    </div>
    
    <!-- Add more sections -->
</body>
</html>`,
            targetCode: `<!-- Complete Portfolio Strategy Document -->
<!DOCTYPE html>
<html>
<head>
    <title>Alex Chen - Portfolio Strategy</title>
    <style>
        body { 
            font-family: 'Inter', sans-serif; 
            max-width: 900px; 
            margin: 0 auto; 
            padding: 40px 20px;
            line-height: 1.6;
            color: #2D3748;
        }
        .header {
            text-align: center;
            margin-bottom: 50px;
            padding: 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 10px;
        }
        .section { 
            margin-bottom: 40px; 
            padding: 30px; 
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h1 { margin: 0; font-size: 2.5em; }
        h2 { 
            color: #4A5568; 
            border-bottom: 3px solid #4A90E2;
            padding-bottom: 10px;
            margin-top: 0;
        }
        .brand-statement {
            font-size: 1.2em;
            font-style: italic;
            text-align: center;
            background: #F7FAFC;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #4A90E2;
        }
        .goals-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }
        .goal-card {
            background: #EDF2F7;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #48BB78;
        }
        ul { padding-left: 0; }
        li { 
            list-style: none; 
            background: #F7FAFC;
            margin: 10px 0;
            padding: 15px;
            border-radius: 6px;
            border-left: 3px solid #4A90E2;
        }
        .tech-stack {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .tech-tag {
            background: #4A90E2;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Alex Chen - Portfolio Strategy</h1>
        <p>Full-Stack Developer | React Specialist | Problem Solver</p>
    </div>
    
    <div class="section">
        <h2>Personal Brand Statement</h2>
        <div class="brand-statement">
            "I'm a full-stack developer who transforms complex problems into elegant, user-friendly solutions. 
            I specialize in React and Node.js, with a passion for creating applications that make people's 
            lives easier and businesses more efficient."
        </div>
    </div>
    
    <div class="section">
        <h2>Target Audience</h2>
        <ul>
            <li><strong>Startup CTOs & Tech Leads</strong> - Looking for versatile developers who can work across the stack</li>
            <li><strong>Mid-size Tech Companies</strong> - Need React specialists for user-facing applications</li>
            <li><strong>Digital Agencies</strong> - Seeking developers who understand both technical and business needs</li>
            <li><strong>Remote-First Companies</strong> - Value strong communication and self-directed work style</li>
        </ul>
    </div>
    
    <div class="section">
        <h2>Portfolio Sections</h2>
        <ul>
            <li><strong>Hero Section</strong> - Clear value proposition and call-to-action</li>
            <li><strong>About Me</strong> - Personal story, background, and what drives me</li>
            <li><strong>Featured Projects</strong> - 3-4 best projects with case studies</li>
            <li><strong>Skills & Technologies</strong> - Technical expertise with proficiency levels</li>
            <li><strong>Experience</strong> - Work history and key achievements</li>
            <li><strong>Blog/Articles</strong> - Thought leadership and technical writing</li>
            <li><strong>Contact</strong> - Multiple ways to get in touch</li>
        </ul>
    </div>
    
    <div class="section">
        <h2>Technical Focus</h2>
        <div class="tech-stack">
            <span class="tech-tag">React</span>
            <span class="tech-tag">Node.js</span>
            <span class="tech-tag">TypeScript</span>
            <span class="tech-tag">Next.js</span>
            <span class="tech-tag">TailwindCSS</span>
            <span class="tech-tag">PostgreSQL</span>
            <span class="tech-tag">AWS</span>
            <span class="tech-tag">Docker</span>
        </div>
    </div>
    
    <div class="section">
        <h2>Success Goals</h2>
        <div class="goals-grid">
            <div class="goal-card">
                <h3>Short Term (3 months)</h3>
                <ul>
                    <li>5+ quality job interviews</li>
                    <li>1000+ portfolio views</li>
                    <li>Complete technical blog series</li>
                </ul>
            </div>
            <div class="goal-card">
                <h3>Long Term (6 months)</h3>
                <ul>
                    <li>Land dream developer role</li>
                    <li>Build professional network</li>
                    <li>Establish thought leadership</li>
                </ul>
            </div>
        </div>
    </div>
    
    <div class="section">
        <h2>Competitive Inspiration</h2>
        <ul>
            <li><strong>Brittany Chiang (brittanychiang.com)</strong> - Clean design, excellent project presentations</li>
            <li><strong>Jack Jeznach (jacekjeznach.com)</strong> - Creative animations, strong personal branding</li>
            <li><strong>Adham Dannaway (adhamdannaway.com)</strong> - Perfect balance of design and development showcase</li>
        </ul>
    </div>
</body>
</html>`,
            instructions: [
              'Fill in your personal brand statement that clearly defines your value as a developer',
              'Define your target audience - who do you want to hire you?',
              'Plan your portfolio sections and content hierarchy',
              'Choose your technical focus areas and skill highlights',
              'Set specific, measurable goals for your portfolio',
              'Research and note 3+ inspiring developer portfolios'
            ],
            hints: [
              'Think about what makes you unique as a developer',
              'Consider the types of companies and roles you want',
              'Be specific about your technical strengths',
              'Set realistic but ambitious goals',
              'Focus on quality over quantity in everything'
            ],
            successCriteria: [
              'Clear, compelling personal brand statement',
              'Well-defined target audience',
              'Comprehensive content strategy',
              'Specific success metrics',
              'Professional presentation with good design'
            ],
            portfolioComponent: 'Strategy Foundation Document'
          },
          quiz: [
            {
              id: 'portfolio-purpose',
              question: 'What is the primary purpose of a developer portfolio?',
              type: 'multiple-choice',
              options: [
                'To show off technical skills only',
                'To demonstrate problem-solving ability and professional capabilities',
                'To list all technologies you know',
                'To get as many views as possible'
              ],
              correctAnswer: 'To demonstrate problem-solving ability and professional capabilities',
              explanation: 'A portfolio should showcase not just technical skills, but your ability to solve real problems and work professionally.',
              hints: ['Think about what employers really need', 'Consider the full picture of being a developer'],
              maxAttempts: 3
            },
            {
              id: 'personal-brand',
              question: 'Complete this personal brand statement: "I am a developer who ___"',
              type: 'fill-blank',
              correctAnswer: ['solves problems', 'creates solutions', 'builds applications', 'transforms ideas'],
              explanation: 'A strong personal brand focuses on the value you provide and problems you solve, not just technologies you use.',
              hints: ['Focus on value you provide', 'Think about problems you solve', 'What makes you unique?'],
              maxAttempts: 5
            }
          ]
        }
        // Additional lessons would be defined here...
      ],
      project: {
        component: 'Design System & Strategy',
        description: 'Complete design system in Figma with personal branding strategy',
        buildInstructions: [
          'Create comprehensive strategy document',
          'Design portfolio wireframes in Figma',
          'Develop color palette and typography',
          'Create component library',
          'Design responsive layouts'
        ],
        portfolioIntegration: 'Foundation for entire portfolio project'
      }
    }
    // Additional milestones would be defined here...
  ],
  duration: '7 weeks',
  level: 'foundation',
  technologies: ['Figma', 'HTML5', 'CSS3', 'JavaScript', 'TailwindCSS', 'Git', 'Vercel']
}
