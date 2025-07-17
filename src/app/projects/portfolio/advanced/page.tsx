import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Portfolio Project - Advanced Level | RockitCode',
  description: 'Build a full-stack portfolio with Next.js, database integration, CMS, authentication, and enterprise-level features. The ultimate portfolio evolution.',
}

export default function PortfolioAdvanced() {
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
            <div className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium">
              Advanced Level
            </div>
            <div className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full text-sm font-medium">
              Full-Stack Portfolio
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Full-Stack Portfolio Application
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl">
            Transform your React portfolio into a complete full-stack application with database, CMS, authentication, and enterprise-level features. Build something that rivals professional agencies!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">Duration</div>
              <div className="text-lg font-semibold">6-8 weeks</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">Frontend</div>
              <div className="text-lg font-semibold">Next.js 13+</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">Backend</div>
              <div className="text-lg font-semibold">API Routes + DB</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">Deployment</div>
              <div className="text-lg font-semibold">Enterprise</div>
            </div>
          </div>

          {/* Prerequisites */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-8">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">📋 Prerequisites</h3>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              Complete the <Link href="/projects/portfolio/intermediate" className="underline font-medium">Intermediate React Portfolio</Link> first. 
              You'll add backend functionality to your existing React app - continuing the evolution!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors opacity-50 cursor-not-allowed"
              disabled
            >
              🔒 Coming Soon
            </button>
            <a 
              href="https://github.com/rockitcode-learning/portfolio-advanced-template"
              className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors opacity-50"
              target="_blank"
              rel="noopener noreferrer"
            >
              📁 Preview Repository
            </a>
            <a 
              href="https://portfolio-demo-advanced.vercel.app"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              👀 View Demo
            </a>
          </div>
        </div>

        {/* Enterprise Features */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">🏢 Enterprise-Level Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-purple-600">Full-Stack Capabilities</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      Database-driven blog with categories and tags
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      CMS integration (Sanity/Strapi) for content
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      Authentication system with admin dashboard
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      Contact form with email backend
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      Custom analytics dashboard
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-orange-600">Professional Infrastructure</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      Next.js 13+ App Router with server components
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      PostgreSQL/Supabase database integration
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      CI/CD pipeline with automated testing
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      Error monitoring and performance tracking
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      Security headers and best practices
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Architecture */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold mb-6">🏗️ Technical Architecture</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold mb-2">Frontend Evolution</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Upgrade your React portfolio to Next.js 13+ with server components
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-sm">
                    <strong>Smart Migration:</strong> We'll migrate your React components to Next.js, 
                    adding server-side rendering and the new App Router for better performance.
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-xl font-semibold mb-2">Backend Integration</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Add API routes, database, and authentication to your existing portfolio
                  </p>
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-sm">
                    <strong>Database-First Approach:</strong> PostgreSQL with Prisma ORM, 
                    NextAuth.js for authentication, and Resend for email functionality.
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-xl font-semibold mb-2">Production Infrastructure</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Deploy with enterprise-level monitoring and optimization
                  </p>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-sm">
                    <strong>Enterprise Deployment:</strong> Vercel Pro with analytics, 
                    Sentry for error monitoring, and Cloudflare for CDN and security.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Learning Path */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4">🎯 Complete Learning Path</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Beginner: Static HTML/CSS</span>
                  <span className="text-sm font-medium text-green-600">✓</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Intermediate: React/TypeScript</span>
                  <span className="text-sm font-medium text-blue-600">✓</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Advanced: Full-Stack</span>
                  <span className="text-sm font-medium text-purple-600">Current</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-xs text-purple-800 dark:text-purple-200">
                  <strong>Portfolio Evolution Complete!</strong> You've transformed a simple HTML page 
                  into an enterprise-level application - the same way real products evolve.
                </p>
              </div>
            </div>

            {/* Career Impact */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4">💼 Career Impact</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Demonstrate full-stack capabilities
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Show enterprise-level code quality
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Prove DevOps and deployment skills
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Stand out in senior developer roles
                </div>
              </div>
            </div>

            {/* Previous Levels */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4">🏗️ Build the Foundation</h3>
              <div className="space-y-3">
                <Link 
                  href="/projects/portfolio/beginner"
                  className="block w-full bg-green-600 text-white text-center py-2 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm"
                >
                  Start with Beginner
                </Link>
                <Link 
                  href="/projects/portfolio/intermediate"
                  className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
                >
                  Continue with Intermediate
                </Link>
              </div>
            </div>

            {/* Technology Stack */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4">🛠️ Technology Stack</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">Next.js 13+</div>
                <div className="bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded">TypeScript</div>
                <div className="bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">PostgreSQL</div>
                <div className="bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded">Prisma ORM</div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded">NextAuth.js</div>
                <div className="bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded">Tailwind CSS</div>
                <div className="bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded">Vercel</div>
                <div className="bg-pink-50 dark:bg-pink-900/20 px-2 py-1 rounded">Sentry</div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-center mb-6">🏆 What Students Achieve</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-semibold mb-2">Salary Increases</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Students report 30-50% salary increases after completing the full portfolio evolution
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-semibold mb-2">Job Offers</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Advanced portfolio consistently leads to senior developer and tech lead positions
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold mb-2">Freelance Success</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Many students use this portfolio to launch successful freelance careers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
