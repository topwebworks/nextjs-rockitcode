import { Metadata } from 'next'
import Link from 'next/link'
import { foundationCourse } from '@/data/foundation-course'
import { renderIcon } from '@/components/icons'

export const metadata: Metadata = {
  title: 'Portfolio Project - Beginner Level | RockitCode',
  description: 'Build your first professional portfolio website from scratch. Learn HTML, CSS, Git, and deploy to GitHub Pages - the complete beginner-friendly tutorial.',
}

export default function PortfolioBeginner() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Project Header */}
        <div className="mb-12">
          <nav className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
            <Link href="/launch-pad" className="hover:text-blue-600">Launch Pad</Link>
            <span className="mx-2">→</span>
            <Link href="/launch-pad?career=frontend" className="hover:text-blue-600">Frontend Developer</Link>
            <span className="mx-2">→</span>
            <span className="text-gray-900 dark:text-white">Portfolio Project</span>
          </nav>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
              Beginner Level
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
              Portfolio Project
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Build Your Professional Portfolio
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl">
            Create a clean, modern portfolio website that's perfect for job applications. Master HTML, CSS, Git workflows, and deploy to GitHub Pages. Build something you'll actually use in your career!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">Duration</div>
              <div className="text-lg font-semibold">3-4 weeks</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">Technologies</div>
              <div className="text-lg font-semibold">HTML, CSS, Git</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">Final Result</div>
              <div className="text-lg font-semibold">Live Portfolio</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/foundation/chapter-1-vscode"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {renderIcon('rocket', 'w-5 h-5 mr-2')}
              Start Building
            </Link>
            <a 
              href="https://github.com/rockitcode-learning/portfolio-beginner-template"
              className="inline-flex items-center bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {renderIcon('folder', 'w-5 h-5 mr-2')}
              Clone Repository
            </a>
            <a 
              href="https://portfolio-demo-beginner.vercel.app"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              👀 View Demo
            </a>
          </div>
        </div>

        {/* Project Roadmap */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                {renderIcon('target', 'w-6 h-6 mr-2')}
                What You'll Build
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-600">Core Features</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Professional hero section with headshot
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      About section with personal story
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Skills showcase with visual elements
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Projects gallery (3+ projects)
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Contact form and social links
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-purple-600">Technical Skills</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      Semantic HTML structure
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      CSS Grid & Flexbox layouts
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      Mobile-first responsive design
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      Git version control workflow
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      GitHub Pages deployment
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2 flex items-center">
                  {renderIcon('lightbulb', 'w-4 h-4 mr-2')}
                  Why This Matters
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  This portfolio will be <strong>actually suitable for job applications</strong>. Clean, professional design following Tailwind UI patterns that employers recognize and respect. You'll learn real-world development practices that scale to advanced projects.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">🗺️ Learning Roadmap</h2>
              
              <div className="space-y-6">
                {/* Chapter 1 */}
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold mb-2">Chapter 1: Mission Control Setup</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Set up your professional development environment like a real developer
                  </p>
                  <div className="space-y-2">
                    <Link 
                      href="/foundation/chapter-1-vscode"
                      className="block p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="font-medium flex items-center">
                        {renderIcon('document', 'w-4 h-4 mr-2')}
                        Lesson 1: VS Code Mastery
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Learn the world's most popular code editor</div>
                    </Link>
                    <Link 
                      href="/foundation/chapter-2-git"
                      className="block p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="font-medium">🔄 Lesson 2: Git & GitHub Workflow</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Master professional version control</div>
                    </Link>
                  </div>
                </div>

                {/* Chapter 2 */}
                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-xl font-semibold mb-2">Chapter 2: Design & Project Planning</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Learn the complete project lifecycle that happens BEFORE writing code
                  </p>
                  <div className="space-y-2">
                    <Link 
                      href="/foundation/design-planning"
                      className="block p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="font-medium flex items-center">
                        {renderIcon('palette', 'w-4 h-4 mr-2')}
                        Design & Planning Fundamentals
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">UX/UI, project management, technical architecture</div>
                    </Link>
                    <Link 
                      href="/foundation/portfolio-strategy"
                      className="block p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="font-medium flex items-center">
                        {renderIcon('target', 'w-4 h-4 mr-2')}
                        Portfolio Strategy Workshop
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Define your brand and content strategy</div>
                    </Link>
                  </div>
                </div>

                {/* Chapter 3 */}
                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-xl font-semibold mb-2">Chapter 3: HTML Foundation</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Build the structure of your portfolio website
                  </p>
                  <div className="space-y-2">
                    <Link 
                      href="/html-basics-enhanced"
                      className="block p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="font-medium">🏗️ HTML Learning Journey</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Interactive HTML tutorial with live coding</div>
                    </Link>
                  </div>
                </div>

                {/* Chapter 4 */}
                <div className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-xl font-semibold mb-2">Chapter 4: CSS Styling</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Make your portfolio look professional and beautiful
                  </p>
                  <div className="space-y-2">
                    <div className="block p-3 bg-gray-50 dark:bg-gray-900 rounded-lg opacity-60">
                      <div className="font-medium flex items-center">
                        {renderIcon('palette', 'w-4 h-4 mr-2')}
                        CSS Fundamentals (Coming Soon)
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Colors, fonts, layouts, and responsive design</div>
                    </div>
                  </div>
                </div>

                {/* Chapter 5 */}
                <div className="border-l-4 border-red-500 pl-6">
                  <h3 className="text-xl font-semibold mb-2">Chapter 5: Deployment & Launch</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Publish your portfolio live on the internet
                  </p>
                  <div className="space-y-2">
                    <div className="block p-3 bg-gray-50 dark:bg-gray-900 rounded-lg opacity-60">
                      <div className="font-medium">🌐 GitHub Pages Deployment (Coming Soon)</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Make your portfolio live and shareable</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4">📊 Your Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Overall</span>
                  <span className="text-sm font-medium">0%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>

            {/* What You'll Build */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                {renderIcon('target', 'w-5 h-5 mr-2')}
                What You'll Build
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Professional homepage</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">About page with your story</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Projects showcase</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Contact form</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Live deployment</span>
                </div>
              </div>
            </div>

            {/* Skills You'll Learn */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4">💪 Skills You'll Learn</h3>
              <div className="space-y-3">
                <div className="bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg">
                  <div className="text-sm font-medium text-blue-800 dark:text-blue-200">HTML5</div>
                  <div className="text-xs text-blue-600 dark:text-blue-300">Semantic markup & structure</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 px-3 py-2 rounded-lg">
                  <div className="text-sm font-medium text-purple-800 dark:text-purple-200">CSS3</div>
                  <div className="text-xs text-purple-600 dark:text-purple-300">Styling & responsive design</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/20 px-3 py-2 rounded-lg">
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-200">Git & GitHub</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Version control & deployment</div>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 px-3 py-2 rounded-lg">
                  <div className="text-sm font-medium text-orange-800 dark:text-orange-200">VS Code</div>
                  <div className="text-xs text-orange-600 dark:text-orange-300">Professional development</div>
                </div>
              </div>
            </div>

            {/* Community */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4">👥 Community</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Join other beginners building their first portfolios!
              </p>
              <Link 
                href="/community"
                className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Join Discord
              </Link>
            </div>
          </div>
        </div>

        {/* Portfolio Evolution Path */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-center mb-6">🚀 Your Portfolio Evolution Journey</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Beginner Level */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-green-500">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Current Level
                </div>
                <div className="text-lg font-bold">Beginner</div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Static Professional Portfolio</h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Clean single-page design
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  HTML + CSS + Git workflow
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  GitHub Pages deployment
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Job-application ready
                </div>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                3-4 weeks • Perfect first portfolio
              </div>
            </div>

            {/* Intermediate Level */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Next Level
                </div>
                <div className="text-lg font-bold">Intermediate</div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Interactive React Portfolio</h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  React components + TypeScript
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Dark mode + animations
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Multi-page architecture
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Advanced deployment
                </div>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                4-6 weeks • Builds on your beginner portfolio
              </div>
            </div>

            {/* Advanced Level */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Final Level
                </div>
                <div className="text-lg font-bold">Advanced</div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Full-Stack Portfolio</h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Next.js + Database + CMS
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Blog system + admin panel
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Authentication + analytics
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Enterprise-level features
                </div>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                6-8 weeks • Professional full-stack app
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong>Smart Evolution Strategy:</strong> You'll migrate and enhance the same portfolio through all levels - never starting from scratch!
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                href="/projects/portfolio/intermediate"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Preview Intermediate →
              </Link>
              <Link 
                href="/projects/portfolio/advanced"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
              >
                Preview Advanced →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
