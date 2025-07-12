// Enhanced Content Architecture: Timeless Videos + Dynamic Lessons
// Preserves all existing video/code sync while enabling future-proof updates

import type { Chapter, CodeProject, QuizQuestion } from './foundation-course'

// Enhanced content structure that separates timeless concepts from dynamic implementations
export interface TimelessChapter extends Omit<Chapter, 'codeProject'> {
  // Preserve existing video sync functionality
  id: string
  title: string
  description: string
  videoTimestamp: number // Keep exact same sync functionality
  duration: number
  
  // New: Timeless conceptual content
  coreMessage: string // The unchanging principle being taught
  conceptualFramework: string // How to think about this problem
  designPrinciples: string[] // Timeless design guidelines
  mentalModel: string // The cognitive framework
  
  // Dynamic implementation content (can be updated)
  currentImplementation: DynamicImplementation
  alternativeImplementations: DynamicImplementation[]
  
  // Preserve existing interactive features
  quiz?: QuizQuestion[]
  assessment?: InteractiveAssessment
  
  // Content versioning and update tracking
  contentVersion: string // "2025.1", "2025.2", etc.
  lastUpdated: string
  updateNotes?: string[]
}

export interface DynamicImplementation {
  id: string
  name: string // "Modern CSS Grid", "React Components", "Vue Composition API"
  version: string // "2025.1"
  
  // Enhanced code project with multiple approaches
  codeProject: EnhancedCodeProject
  
  // Technology context
  techStack: TechStackInfo
  prerequisites: string[]
  nextSteps: string[]
  
  // Learning outcomes specific to this implementation
  skillsAcquired: string[]
  industryRelevance: number // 1-10 scale
  futureProofRating: number // How likely this will be relevant in 2-3 years
}

export interface EnhancedCodeProject extends Omit<CodeProject, 'name'> {
  // Preserve existing structure
  component: string
  description: string
  initialCode: string
  targetCode: string
  instructions: string[]
  hints: string[]
  successCriteria: string[]
  portfolioComponent: string
  
  // Enhanced multi-version support
  implementations: {
    [framework: string]: FrameworkImplementation
  }
  defaultFramework: string
  
  // Advanced learning features
  adaptiveHints: AdaptiveHintSystem
  realTimeValidation: ValidationRule[]
  progressiveComplexity: ComplexityLevel[]
}

export interface FrameworkImplementation {
  framework: string // "vanilla", "react", "vue", "angular", "svelte"
  version: string // Framework version compatibility
  
  code: {
    starter: string // What student starts with
    target: string // What they should build
    solution: string // Complete working solution
    explanation: string // Why this approach works
  }
  
  // Framework-specific guidance
  bestPractices: string[]
  commonMistakes: string[]
  debugging: DebuggingGuide[]
  
  // Integration with existing Monaco editor
  editorConfig: MonacoConfiguration
  linting: LintingRule[]
  formatting: FormattingConfig
}

export interface TechStackInfo {
  primary: Technology[]
  optional: Technology[]
  alternatives: Technology[]
  ecosystem: EcosystemInfo
}

export interface Technology {
  name: string
  version: string
  purpose: string // Why we're using this
  learningCurve: 'easy' | 'moderate' | 'challenging'
  industryAdoption: number // 1-10 scale
  futureOutlook: 'declining' | 'stable' | 'growing' | 'emerging'
}

export interface EcosystemInfo {
  buildTools: string[]
  devTools: string[]
  testingFrameworks: string[]
  deploymentOptions: string[]
  communityResources: string[]
}

export interface AdaptiveHintSystem {
  contextualHints: {
    [situation: string]: string[] // Hints based on what student is doing
  }
  progressiveHints: {
    beginner: string[]
    intermediate: string[]
    advanced: string[]
  }
  errorBasedHints: {
    [errorPattern: string]: string
  }
  encouragementMessages: string[]
}

export interface ValidationRule {
  pattern: string | RegExp
  message: string
  type: 'error' | 'warning' | 'info'
  autoFix?: {
    description: string
    replacement: string
  }
}

export interface ComplexityLevel {
  level: number // 1-10
  description: string
  requirements: string[]
  bonusChallenges?: string[]
}

export interface InteractiveAssessment {
  type: 'code-completion' | 'bug-fix' | 'feature-add' | 'optimization'
  scenario: string
  requirements: string[]
  starterCode: string
  testCases: TestCase[]
  rubric: AssessmentRubric[]
}

export interface TestCase {
  description: string
  input: any
  expectedOutput: any
  points: number
}

export interface AssessmentRubric {
  criteria: string
  levels: {
    [level: string]: {
      description: string
      points: number
    }
  }
}

export interface DebuggingGuide {
  problem: string
  symptoms: string[]
  diagnosis: string
  solution: string
  prevention: string
}

export interface MonacoConfiguration {
  language: string
  theme: string
  options: {
    minimap?: boolean
    wordWrap?: string
    lineNumbers?: string
    formatOnPaste?: boolean
    formatOnType?: boolean
  }
  suggestions: AutocompleteSuggestion[]
  snippets: CodeSnippet[]
}

export interface AutocompleteSuggestion {
  label: string
  insertText: string
  documentation: string
  kind: 'function' | 'property' | 'class' | 'interface' | 'keyword'
}

export interface CodeSnippet {
  prefix: string
  body: string[]
  description: string
  scope?: string
}

export interface LintingRule {
  ruleId: string
  severity: 'error' | 'warning' | 'info'
  message: string
  fix?: {
    description: string
    edits: TextEdit[]
  }
}

export interface TextEdit {
  range: {
    startLine: number
    startColumn: number
    endLine: number
    endColumn: number
  }
  newText: string
}

export interface FormattingConfig {
  insertSpaces: boolean
  tabSize: number
  trimTrailingWhitespace: boolean
  insertFinalNewline: boolean
  bracketSpacing: boolean
  semiColons: 'always' | 'never' | 'asi'
}

// Content update and versioning system
export interface ContentVersion {
  version: string
  releaseDate: string
  changes: ContentChange[]
  migrationGuide?: string
  backwardCompatible: boolean
}

export interface ContentChange {
  type: 'update' | 'addition' | 'removal' | 'deprecation'
  section: string
  description: string
  reason: string
  impact: 'low' | 'medium' | 'high'
}

// Enhanced lesson structure that preserves all existing functionality
export interface EnhancedLesson {
  // Preserve all existing lesson properties
  id: string
  title: string
  description: string
  duration: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  
  // Enhanced chapter system with timeless content
  chapters: TimelessChapter[]
  
  // Enhanced project system
  codeProject: EnhancedCodeProject
  quiz: QuizQuestion[]
  
  // Video integration (preserve existing sync functionality)
  video: {
    url: string
    duration: number
    chapters: VideoChapter[] // Preserve exact same video chapter system
    thumbnail?: string
    captions?: string[]
  }
  
  // New: Content strategy features
  learningObjectives: LearningObjective[]
  industry: {
    skills: IndustrySkill[]
    jobRelevance: number
    salaryImpact: number
  }
  prerequisites: Prerequisite[]
  nextSteps: string[]
  
  // Content maintenance
  contentHealth: ContentHealthMetrics
  updateSchedule: UpdateSchedule
}

export interface VideoChapter {
  id: string
  title: string
  timestamp: number // Preserve exact same timestamp functionality
  duration: number
  description: string
  keyPoints: string[]
  codeExample?: string
}

export interface LearningObjective {
  description: string
  type: 'knowledge' | 'skill' | 'application' | 'analysis'
  assessmentMethod: string
  industryContext: string
}

export interface IndustrySkill {
  name: string
  category: 'technical' | 'conceptual' | 'soft-skill'
  demandLevel: number // 1-10
  salaryImpact: number // Percentage increase
  roleRelevance: string[] // Job titles where this matters
}

export interface Prerequisite {
  skill: string
  level: 'basic' | 'intermediate' | 'advanced'
  resourceUrl?: string
  estimatedTime?: number // Minutes to learn if missing
}

export interface ContentHealthMetrics {
  relevanceScore: number // 1-10
  completionRate: number // Percentage
  studentSatisfaction: number // 1-10
  industryAlignment: number // 1-10
  techStackCurrency: number // 1-10
  lastReviewed: string
  flaggedIssues: string[]
}

export interface UpdateSchedule {
  nextReview: string
  updateFrequency: 'monthly' | 'quarterly' | 'annually'
  priority: 'low' | 'medium' | 'high' | 'critical'
  estimatedEffort: number // Hours
  stakeholders: string[]
}

// Example implementation preserving all existing functionality
export const enhancedFoundationLesson: EnhancedLesson = {
  id: 'portfolio-strategy',
  title: 'Portfolio Strategy & Personal Branding',
  description: 'Master the art of presenting yourself professionally through strategic portfolio design',
  duration: 45,
  difficulty: 'beginner',
  
  // Preserve exact same video structure with enhanced content
  video: {
    url: 'https://example.com/portfolio-strategy-video',
    duration: 2700, // 45 minutes
    chapters: [
      {
        id: 'intro',
        title: 'Introduction to Portfolio Strategy',
        timestamp: 0, // Preserve exact same timestamp functionality
        duration: 300,
        description: 'Understanding the role of portfolios in career development',
        keyPoints: [
          'Portfolio as career accelerator',
          'Industry expectations',
          'Success stories analysis'
        ]
      },
      {
        id: 'personal-branding',
        title: 'Personal Branding Fundamentals',
        timestamp: 300, // Preserve exact same timestamp functionality
        duration: 400,
        description: 'Defining your unique professional identity',
        keyPoints: [
          'Brand consistency principles',
          'Target audience identification',
          'Value proposition development'
        ]
      }
      // ... more chapters with same structure
    ]
  },
  
  // Enhanced chapters with timeless concepts + dynamic implementations
  chapters: [
    {
      id: 'intro',
      title: 'Introduction to Portfolio Strategy',
      description: 'Understanding the role of portfolios in career development',
      videoTimestamp: 0, // Preserve exact same sync functionality
      duration: 300,
      
      // Required properties from base Chapter interface
      concepts: [
        'Portfolio as career accelerator',
        'Professional storytelling',
        'Growth demonstration',
        'Problem-solving showcase'
      ],
      learningObjectives: [
        'Understand the strategic role of portfolios',
        'Identify key portfolio components',
        'Recognize quality vs quantity principles'
      ],
      
      // Timeless conceptual content
      coreMessage: 'Your portfolio is your professional story - it should demonstrate growth, problem-solving ability, and technical competence',
      conceptualFramework: 'Think of your portfolio as a curated exhibition that shows not just what you can build, but how you think and solve problems',
      designPrinciples: [
        'Show progression and growth over time',
        'Demonstrate problem-solving process, not just solutions',
        'Make it easy for viewers to understand your capabilities',
        'Include context and impact for each project'
      ],
      mentalModel: 'Portfolio as professional narrative: Beginning (learning), Middle (applying), End (mastering)',
      
      // Current implementation (can be updated)
      currentImplementation: {
        id: 'modern-portfolio-2025',
        name: 'Modern Portfolio with React & Tailwind',
        version: '2025.1',
        
        prerequisites: ['Basic HTML knowledge', 'CSS fundamentals'],
        nextSteps: ['Add responsive navigation', 'Implement project gallery'],
        
        codeProject: {
          component: 'Portfolio Header Section',
          description: 'Create a compelling portfolio header that communicates your professional brand',
          initialCode: `<!-- Basic HTML structure -->
<header>
  <h1>Your Name</h1>
  <p>Your Title</p>
</header>`,
          targetCode: `<!-- Enhanced portfolio header -->
<header class="hero-section">
  <div class="container">
    <h1 class="primary-heading">Your Name</h1>
    <p class="subtitle">Full-Stack Developer</p>
    <p class="bio">Brief professional summary</p>
    <nav class="cta-nav">
      <a href="#work">View My Work</a>
      <a href="#contact">Let's Connect</a>
    </nav>
  </div>
</header>`,
          instructions: [
            'Create semantic HTML structure',
            'Add accessibility attributes',
            'Implement responsive design',
            'Style with modern CSS'
          ],
          hints: [
            'Use semantic HTML elements for better SEO',
            'Consider mobile-first responsive design',
            'Add proper contrast for accessibility'
          ],
          successCriteria: [
            'Passes accessibility audit',
            'Responsive across all screen sizes',
            'Clean, professional appearance',
            'Fast loading performance'
          ],
          portfolioComponent: 'Professional header section showcasing personal branding',
          
          // Enhanced multi-framework support
          implementations: {
            vanilla: {
              framework: 'vanilla',
              version: '2025',
              code: {
                starter: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Portfolio</title>
</head>
<body>
  <!-- Start building here -->
</body>
</html>`,
                target: `<!-- Modern semantic HTML with CSS Grid -->
<header class="hero">
  <div class="hero__container">
    <h1 class="hero__name">Your Name</h1>
    <p class="hero__title">Full-Stack Developer</p>
  </div>
</header>`,
                solution: `<!-- Complete modern portfolio header -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Name - Full-Stack Developer</title>
  <style>
    .hero {
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
    }
    
    .hero__name {
      font-size: clamp(2rem, 5vw, 4rem);
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    
    .hero__title {
      font-size: clamp(1.2rem, 3vw, 1.8rem);
      opacity: 0.9;
    }
  </style>
</head>
<body>
  <header class="hero">
    <div class="hero__container">
      <h1 class="hero__name">Your Name</h1>
      <p class="hero__title">Full-Stack Developer</p>
    </div>
  </header>
</body>
</html>`,
                explanation: 'Modern CSS with logical properties, custom properties, and responsive design using clamp()'
              },
              bestPractices: [
                'Use semantic HTML elements',
                'Implement progressive enhancement',
                'Optimize for Core Web Vitals',
                'Ensure accessibility compliance'
              ],
              commonMistakes: [
                'Forgetting viewport meta tag',
                'Using fixed font sizes',
                'Poor color contrast',
                'Missing alt attributes'
              ],
              debugging: [
                {
                  problem: 'Text not responsive on mobile',
                  symptoms: ['Text too small or too large', 'Horizontal scrolling'],
                  diagnosis: 'Fixed font sizes instead of responsive units',
                  solution: 'Use clamp() or vw units for responsive typography',
                  prevention: 'Always test on multiple screen sizes during development'
                }
              ],
              editorConfig: {
                language: 'html',
                theme: 'vs-dark',
                options: {
                  wordWrap: 'on',
                  lineNumbers: 'on',
                  formatOnPaste: true,
                  formatOnType: true
                },
                suggestions: [
                  {
                    label: 'semantic-header',
                    insertText: '<header class="hero">\n  <div class="hero__container">\n    <h1 class="hero__name">$1</h1>\n    <p class="hero__title">$2</p>\n  </div>\n</header>',
                    documentation: 'Semantic portfolio header structure',
                    kind: 'function'
                  }
                ],
                snippets: [
                  {
                    prefix: 'portfolio-hero',
                    body: [
                      '<header class="hero">',
                      '  <div class="hero__container">',
                      '    <h1 class="hero__name">${1:Your Name}</h1>',
                      '    <p class="hero__title">${2:Your Title}</p>',
                      '  </div>',
                      '</header>'
                    ],
                    description: 'Portfolio hero section structure'
                  }
                ]
              },
              linting: [
                {
                  ruleId: 'missing-alt',
                  severity: 'error',
                  message: 'Images must have alt attributes for accessibility'
                }
              ],
              formatting: {
                insertSpaces: true,
                tabSize: 2,
                trimTrailingWhitespace: true,
                insertFinalNewline: true,
                bracketSpacing: true,
                semiColons: 'never'
              }
            },
            react: {
              framework: 'react',
              version: '18+',
              code: {
                starter: `import React from 'react'

export default function PortfolioHero() {
  return (
    <div>
      {/* Build your hero section here */}
    </div>
  )
}`,
                target: `import React from 'react'
import { motion } from 'framer-motion'

export default function PortfolioHero() {
  return (
    <motion.header 
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="hero__container">
        <h1 className="hero__name">Your Name</h1>
        <p className="hero__title">Full-Stack Developer</p>
      </div>
    </motion.header>
  )
}`,
                solution: `import React from 'react'
import { motion } from 'framer-motion'

interface PortfolioHeroProps {
  name: string
  title: string
  bio?: string
}

export default function PortfolioHero({ 
  name, 
  title, 
  bio 
}: PortfolioHeroProps) {
  return (
    <motion.header 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto px-4">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {name}
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl opacity-90 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.4 }}
        >
          {title}
        </motion.p>
        {bio && (
          <motion.p 
            className="text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {bio}
          </motion.p>
        )}
      </div>
    </motion.header>
  )
}`,
                explanation: 'Modern React component with TypeScript, Framer Motion animations, and Tailwind CSS'
              },
              bestPractices: [
                'Use TypeScript for type safety',
                'Implement proper prop validation',
                'Add motion and accessibility',
                'Follow React 18+ patterns'
              ],
              commonMistakes: [
                'Missing key props',
                'Inline styles instead of CSS classes',
                'Not handling loading states',
                'Forgetting accessibility attributes'
              ],
              debugging: [
                {
                  problem: 'Component not re-rendering',
                  symptoms: ['Stale data display', 'Props not updating'],
                  diagnosis: 'Missing dependency in useEffect or improper state management',
                  solution: 'Check dependency arrays and state updates',
                  prevention: 'Use React Developer Tools to monitor state changes'
                }
              ],
              editorConfig: {
                language: 'typescript',
                theme: 'vs-dark',
                options: {
                  wordWrap: 'on',
                  lineNumbers: 'on',
                  formatOnPaste: true,
                  formatOnType: true
                },
                suggestions: [
                  {
                    label: 'motion-component',
                    insertText: '<motion.${1:div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>\n  ${2:content}\n</motion.${1:div}>',
                    documentation: 'Framer Motion animated component',
                    kind: 'function'
                  }
                ],
                snippets: [
                  {
                    prefix: 'react-portfolio-hero',
                    body: [
                      'interface ${1:Component}Props {',
                      '  ${2:prop}: ${3:string}',
                      '}',
                      '',
                      'export default function ${1:Component}({ ${2:prop} }: ${1:Component}Props) {',
                      '  return (',
                      '    <motion.div',
                      '      initial={{ opacity: 0 }}',
                      '      animate={{ opacity: 1 }}',
                      '    >',
                      '      ${4:content}',
                      '    </motion.div>',
                      '  )',
                      '}'
                    ],
                    description: 'React component with TypeScript and Framer Motion'
                  }
                ]
              },
              linting: [
                {
                  ruleId: 'react-hooks/exhaustive-deps',
                  severity: 'warning',
                  message: 'React Hook useEffect has missing dependencies'
                }
              ],
              formatting: {
                insertSpaces: true,
                tabSize: 2,
                trimTrailingWhitespace: true,
                insertFinalNewline: true,
                bracketSpacing: true,
                semiColons: 'never'
              }
            }
          },
          defaultFramework: 'react',
          
          // Enhanced learning features
          adaptiveHints: {
            contextualHints: {
              'semantic-html': [
                'Use header element for page header',
                'h1 should be the main heading',
                'Consider using nav for navigation'
              ],
              'accessibility': [
                'Add proper alt text for images',
                'Ensure sufficient color contrast',
                'Use semantic HTML elements'
              ],
              'responsive-design': [
                'Start with mobile-first approach',
                'Use relative units for scalability',
                'Test on multiple screen sizes'
              ]
            },
            progressiveHints: {
              beginner: [
                'Start with basic HTML structure',
                'Add CSS for styling',
                'Test in browser frequently'
              ],
              intermediate: [
                'Implement responsive design',
                'Add CSS animations',
                'Optimize for performance'
              ],
              advanced: [
                'Add micro-interactions',
                'Implement advanced animations',
                'Consider accessibility edge cases'
              ]
            },
            errorBasedHints: {
              'missing-viewport': 'Add <meta name="viewport" content="width=device-width, initial-scale=1.0"> for responsive design',
              'poor-contrast': 'Ensure text has sufficient contrast ratio (4.5:1 minimum)',
              'missing-alt': 'Add descriptive alt text for all images'
            },
            encouragementMessages: [
              'Great progress! Your portfolio is taking shape.',
              'Excellent attention to accessibility!',
              'Your responsive design skills are improving!'
            ]
          },
          
          realTimeValidation: [
            {
              pattern: /<img(?![^>]*alt=)/,
              message: 'Images should have alt attributes for accessibility',
              type: 'warning',
              autoFix: {
                description: 'Add alt attribute',
                replacement: 'alt="Descriptive text"'
              }
            },
            {
              pattern: /font-size:\s*\d+px/,
              message: 'Consider using relative units (rem, em) instead of pixels',
              type: 'info'
            }
          ],
          
          progressiveComplexity: [
            {
              level: 1,
              description: 'Basic HTML structure',
              requirements: ['Create semantic HTML', 'Add basic styling']
            },
            {
              level: 3,
              description: 'Responsive design',
              requirements: ['Mobile-first approach', 'Flexible layouts'],
              bonusChallenges: ['Add CSS animations', 'Implement dark mode']
            },
            {
              level: 5,
              description: 'Advanced features',
              requirements: ['Perfect accessibility', 'Optimal performance'],
              bonusChallenges: ['Add micro-interactions', 'Implement PWA features']
            }
          ]
        },
        
        techStack: {
          primary: [
            {
              name: 'HTML5',
              version: 'Latest',
              purpose: 'Semantic structure and accessibility',
              learningCurve: 'easy',
              industryAdoption: 10,
              futureOutlook: 'stable'
            },
            {
              name: 'CSS3',
              version: 'Latest',
              purpose: 'Modern styling and responsive design',
              learningCurve: 'moderate',
              industryAdoption: 10,
              futureOutlook: 'growing'
            }
          ],
          optional: [
            {
              name: 'Framer Motion',
              version: '10+',
              purpose: 'Smooth animations and micro-interactions',
              learningCurve: 'moderate',
              industryAdoption: 7,
              futureOutlook: 'growing'
            }
          ],
          alternatives: [
            {
              name: 'CSS Animations',
              version: 'Native',
              purpose: 'Browser-native animations',
              learningCurve: 'moderate',
              industryAdoption: 9,
              futureOutlook: 'stable'
            }
          ],
          ecosystem: {
            buildTools: ['Vite', 'Webpack', 'Parcel'],
            devTools: ['Chrome DevTools', 'Firefox DevTools'],
            testingFrameworks: ['Jest', 'Cypress', 'Playwright'],
            deploymentOptions: ['Vercel', 'Netlify', 'GitHub Pages'],
            communityResources: ['MDN Web Docs', 'CSS-Tricks', 'Can I Use']
          }
        },
        
        skillsAcquired: [
          'Semantic HTML authoring',
          'Modern CSS techniques',
          'Responsive design principles',
          'Accessibility best practices',
          'Performance optimization',
          'Cross-browser compatibility'
        ],
        industryRelevance: 9,
        futureProofRating: 8
      },
      
      alternativeImplementations: [
        // Additional implementations (Vue, Angular, etc.) would be defined here
        // Following the same structure but with framework-specific approaches
      ],
      
      contentVersion: '2025.1',
      lastUpdated: '2025-01-15',
      updateNotes: [
        'Updated CSS to use modern logical properties',
        'Added container queries for better responsive design',
        'Enhanced accessibility with ARIA attributes'
      ]
    }
    // ... more chapters following the same enhanced structure
  ],
  
  // Preserve existing quiz and project structure
  quiz: [
    {
      id: 'portfolio-strategy-1',
      question: 'What is the primary purpose of a professional portfolio?',
      type: 'multiple-choice',
      options: [
        'To showcase every project you\'ve ever built',
        'To demonstrate your growth, problem-solving ability, and technical competence',
        'To list all technologies you\'ve used',
        'To show how much code you can write'
      ],
      correctAnswer: 'To demonstrate your growth, problem-solving ability, and technical competence',
      explanation: 'A portfolio should tell the story of your professional development and showcase your ability to solve real problems.',
      hints: [
        'Think quality over quantity',
        'Consider what employers want to see'
      ],
      maxAttempts: 3
    }
  ],
  
  codeProject: {
    component: 'Complete Portfolio Header',
    description: 'Build a compelling portfolio header that represents your professional brand',
    initialCode: '<!-- Start with basic HTML structure -->',
    targetCode: '<!-- Enhanced portfolio header with modern design -->',
    instructions: [
      'Create semantic HTML structure',
      'Implement responsive design',
      'Add professional styling',
      'Ensure accessibility compliance'
    ],
    hints: [
      'Use semantic HTML elements',
      'Start with mobile-first design',
      'Consider color contrast for accessibility'
    ],
    successCriteria: [
      'Passes accessibility audit',
      'Responsive across all devices',
      'Professional appearance',
      'Fast loading performance'
    ],
    portfolioComponent: 'Professional portfolio header section',
    
    // Enhanced features preserved from existing structure
    implementations: {
      vanilla: {
        framework: 'vanilla',
        version: '2025',
        code: {
          starter: '<!-- Basic HTML -->',
          target: '<!-- Enhanced HTML with modern CSS -->',
          solution: '<!-- Complete modern solution -->',
          explanation: 'Modern approach using semantic HTML and CSS Grid'
        },
        bestPractices: ['Semantic HTML', 'Progressive enhancement'],
        commonMistakes: ['Missing viewport meta tag'],
        debugging: [],
        editorConfig: {
          language: 'html',
          theme: 'vs-dark',
          options: {},
          suggestions: [],
          snippets: []
        },
        linting: [],
        formatting: {
          insertSpaces: true,
          tabSize: 2,
          trimTrailingWhitespace: true,
          insertFinalNewline: true,
          bracketSpacing: true,
          semiColons: 'never'
        }
      }
    },
    defaultFramework: 'vanilla',
    adaptiveHints: {
      contextualHints: {},
      progressiveHints: { beginner: [], intermediate: [], advanced: [] },
      errorBasedHints: {},
      encouragementMessages: []
    },
    realTimeValidation: [],
    progressiveComplexity: []
  },
  
  // Enhanced industry context
  learningObjectives: [
    {
      description: 'Understand the strategic role of portfolios in career development',
      type: 'knowledge',
      assessmentMethod: 'Quiz and reflection exercise',
      industryContext: 'Employers spend average 30 seconds reviewing portfolios'
    },
    {
      description: 'Create compelling personal brand messaging',
      type: 'application',
      assessmentMethod: 'Brand statement creation',
      industryContext: 'Personal branding increases interview callbacks by 40%'
    }
  ],
  
  industry: {
    skills: [
      {
        name: 'Portfolio Development',
        category: 'technical',
        demandLevel: 9,
        salaryImpact: 15,
        roleRelevance: ['Frontend Developer', 'Full-Stack Developer', 'UI/UX Developer']
      },
      {
        name: 'Personal Branding',
        category: 'soft-skill',
        demandLevel: 8,
        salaryImpact: 12,
        roleRelevance: ['All Developer Roles', 'Freelancer', 'Technical Lead']
      }
    ],
    jobRelevance: 9,
    salaryImpact: 15
  },
  
  prerequisites: [
    {
      skill: 'Basic HTML knowledge',
      level: 'basic',
      resourceUrl: '/html-basics',
      estimatedTime: 120
    }
  ],
  
  nextSteps: [
    'Implement responsive navigation',
    'Add project showcase section',
    'Create about section',
    'Build contact form'
  ],
  
  contentHealth: {
    relevanceScore: 9.5,
    completionRate: 87,
    studentSatisfaction: 9.2,
    industryAlignment: 9.0,
    techStackCurrency: 9.8,
    lastReviewed: '2025-01-15',
    flaggedIssues: []
  },
  
  updateSchedule: {
    nextReview: '2025-07-01',
    updateFrequency: 'quarterly',
    priority: 'medium',
    estimatedEffort: 8,
    stakeholders: ['Content Team', 'Industry Advisors']
  }
}

export default enhancedFoundationLesson
