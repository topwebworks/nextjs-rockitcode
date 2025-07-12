import { Course, Milestone, Lesson, Chapter } from '@/data/foundation-course'

/**
 * GitHub-Integrated Foundation Course Enhancement
 * 
 * Transforms the existing Foundation course to include professional GitHub workflow,
 * portfolio deployment, and AI-assisted development from day 1.
 */

export interface GitHubIntegratedCourse extends Course {
  professionalSetup: {
    githubWorkflow: boolean
    portfolioDeployment: boolean
    copilotIntegration: boolean
    professionalTools: boolean
  }
  deploymentTargets: {
    githubPages: string
    vercelUrl?: string
    customDomain?: string
  }
}

export interface GitHubIntegratedMilestone extends Milestone {
  githubMilestone: {
    repositorySetup: string
    branchStrategy: string
    deploymentStep: string
    portfolioUpdate: string
  }
  professionalOutcomes: string[]
}

export interface GitHubIntegratedLesson extends Lesson {
  githubWorkflow: {
    branchName: string
    commitMessage: string
    prDescription: string
    deploymentPreview: string
  }
  aiAssistance: {
    copilotPrompts: string[]
    codeReviewPoints: string[]
    optimizationSuggestions: string[]
  }
  portfolioIntegration: {
    projectName: string
    liveUrl: string
    description: string
    technologiesUsed: string[]
  }
}

// Enhanced Foundation Course with GitHub Integration
export const githubIntegratedFoundationCourse = {
  id: 'github-foundation',
  title: 'Professional Web Development Foundation',
  description: 'Learn HTML, CSS, and JavaScript while building a professional portfolio with industry-standard tools and workflows used at GitHub, Netflix, and Airbnb.',
  project: {
    name: 'Professional Developer Portfolio',
    description: 'Build a stunning portfolio website that showcases your skills and projects',
    finalResult: 'A live, professionally-deployed portfolio website with multiple projects',
    portfolioValue: 'Industry-ready portfolio that impresses recruiters and hiring managers',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'GitHub', 'GitHub Pages', 'Responsive Design'],
    liveDemo: 'https://username.github.io',
    githubRepo: 'https://github.com/username/username.github.io'
  },
  professionalSetup: {
    githubWorkflow: true,
    portfolioDeployment: true,
    copilotIntegration: true,
    professionalTools: true
  },
  deploymentTargets: {
    githubPages: 'username.github.io',
    customDomain: 'yourname.dev (optional)'
  },
  duration: '6-8 weeks',
  level: 'foundation' as const,
  technologies: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'GitHub', 'GitHub Copilot', 'GitHub Pages'],
  milestones: [
    {
      id: 'professional-setup',
      title: '🏢 Professional Developer Environment',
      description: 'Set up the same development environment used by professionals at top tech companies',
      githubMilestone: {
        repositorySetup: 'Create professional GitHub profile and portfolio repository',
        branchStrategy: 'Learn Git basics and professional branching workflow',
        deploymentStep: 'Configure GitHub Pages for automatic deployment',
        portfolioUpdate: 'Professional README and profile optimization'
      },
      professionalOutcomes: [
        'Professional GitHub profile that impresses recruiters',
        'Live portfolio website (username.github.io)',
        'GitHub Copilot AI assistance for coding',
        'Access to $200k+ worth of professional developer tools',
        'Version control workflow used by professional developers'
      ],
      lessons: [
        {
          id: 'github-professional-setup',
          title: 'GitHub Professional Setup',
          description: 'Create your professional developer identity and set up enterprise-grade tools',
          githubWorkflow: {
            branchName: 'setup/professional-profile',
            commitMessage: 'feat: initialize professional developer profile',
            prDescription: 'Set up professional GitHub profile with README and portfolio foundation',
            deploymentPreview: 'Live preview of portfolio foundation'
          },
          aiAssistance: {
            copilotPrompts: [
              'Generate a professional GitHub profile README',
              'Create portfolio HTML structure',
              'Write professional bio and skills section'
            ],
            codeReviewPoints: [
              'Professional presentation and formatting',
              'Clear project descriptions and tech stacks',
              'Effective use of GitHub features'
            ],
            optimizationSuggestions: [
              'Optimize for recruiter scanning patterns',
              'Add visual elements and badges',
              'Include contribution activity optimization'
            ]
          },
          portfolioIntegration: {
            projectName: 'Professional Developer Profile',
            liveUrl: 'https://github.com/username',
            description: 'Professional GitHub profile showcasing skills, projects, and developer activity',
            technologiesUsed: ['GitHub', 'Markdown', 'Professional Branding']
          },
          chapters: [
            {
              id: 'why-professional-tools',
              title: 'Why Professional Tools Matter',
              description: 'Understanding the tools that separate professional developers from hobbyists',
              videoTimestamp: 0,
              duration: 900,
              concepts: [
                'Industry-standard development workflow',
                'Version control for collaboration and backup',
                'Automated deployment and hosting',
                'AI-assisted development for productivity',
                'Portfolio-driven career development'
              ],
              learningObjectives: [
                'Understand the value of professional development tools',
                'Recognize the career benefits of proper tooling',
                'Identify key tools used by professional developers'
              ]
            },
            {
              id: 'github-account-optimization',
              title: 'GitHub Account Setup',
              description: 'Creating a professional GitHub presence that attracts opportunities',
              videoTimestamp: 180,
              duration: 720,
              concepts: [
                'Professional username and avatar selection',
                'Bio optimization for discoverability',
                'Pinned repositories strategy',
                'Contribution graph optimization',
                'Professional contact information'
              ],
              learningObjectives: [
                'Create an optimized GitHub profile',
                'Understand professional presentation principles',
                'Learn GitHub profile best practices'
              ]
            }
          ],
          codeProject: {
            name: 'Professional Developer Profile Setup',
            description: 'Create your complete professional developer presence',
            initialCode: `# Getting Started

Follow the setup guide to create your professional profile.`,
            targetCode: `# Professional Portfolio Setup Complete

Your professional developer environment is now configured with:
- Optimized GitHub profile
- Portfolio repository with GitHub Pages
- GitHub Copilot AI assistance
- Professional development workflow`,
            instructions: [
              'Create professional GitHub account',
              'Set up portfolio repository',
              'Configure GitHub Pages deployment',
              'Activate GitHub Copilot',
              'Optimize profile for discoverability'
            ],
            hints: [
              'Use a professional username',
              'Add a clear, professional bio',
              'Include contact information',
              'Pin your best repositories'
            ],
            successCriteria: [
              'Professional GitHub profile with optimized README',
              'Portfolio repository with GitHub Pages enabled',
              'Automated deployment workflow configured',
              'Professional contact information and bio',
              'GitHub Copilot activated and tested'
            ],
            portfolioComponent: 'Professional Developer Profile and Portfolio Foundation'
          },
          quiz: [
            {
              id: 'professional-tools',
              question: 'Why do professional developers use GitHub for their projects?',
              type: 'multiple-choice' as const,
              options: [
                'It\'s free to use',
                'Version control, collaboration, and professional portfolio',
                'It has a nice interface',
                'Everyone else uses it'
              ],
              correctAnswer: 'Version control, collaboration, and professional portfolio',
              explanation: 'GitHub provides version control for tracking changes, collaboration features for team work, and serves as a professional portfolio for career development.',
              hints: ['Think about professional benefits', 'Consider career development aspects'],
              maxAttempts: 3
            }
          ],
          duration: 120,
          difficulty: 'beginner' as const
        }
      ],
      project: {
        component: 'Professional Developer Environment',
        description: 'Complete professional setup with GitHub, Copilot, and portfolio foundation',
        buildInstructions: [
          'Create professional GitHub account',
          'Set up portfolio repository',
          'Configure automated deployment',
          'Activate professional tools',
          'Optimize for discoverability'
        ],
        portfolioIntegration: 'Foundation for all future projects and professional presence'
      },
      duration: '1 week',
      prerequisites: []
    }
  ]
}

// Utility function to convert existing lessons to GitHub-integrated format
export function enhanceExistingLessonWithGitHub(
  existingLesson: Lesson,
  projectName: string,
  branchName: string
): GitHubIntegratedLesson {
  return {
    ...existingLesson,
    githubWorkflow: {
      branchName,
      commitMessage: `feat: complete ${existingLesson.title.toLowerCase().replace(/\s+/g, '-')}`,
      prDescription: `Implement ${existingLesson.title} as part of portfolio development`,
      deploymentPreview: `Live preview of ${projectName} with ${existingLesson.title} implemented`
    },
    aiAssistance: {
      copilotPrompts: [
        `Create ${existingLesson.title.toLowerCase()} component`,
        `Optimize ${existingLesson.title.toLowerCase()} for accessibility`,
        `Add responsive design to ${existingLesson.title.toLowerCase()}`
      ],
      codeReviewPoints: [
        'Code quality and best practices',
        'Accessibility compliance',
        'Responsive design implementation',
        'Performance optimization'
      ],
      optimizationSuggestions: [
        'Semantic HTML structure',
        'CSS organization and efficiency',
        'JavaScript performance',
        'Cross-browser compatibility'
      ]
    },
    portfolioIntegration: {
      projectName,
      liveUrl: `https://username.github.io/${projectName.toLowerCase().replace(/\s+/g, '-')}`,
      description: `${existingLesson.title} implementation showcasing modern web development skills`,
      technologiesUsed: ['HTML', 'CSS', 'JavaScript']
    }
  }
}

export default githubIntegratedFoundationCourse
