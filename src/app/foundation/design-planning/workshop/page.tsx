import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Portfolio Planning Workshop | RockitCode Foundation',
  description: 'Interactive workshop to plan your professional portfolio. Create user personas, define content strategy, and build your project roadmap.',
}

export default function PlanningWorkshop() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <nav className="flex items-center text-sm text-indigo-100 mb-4">
            <Link href="/foundation/design-planning" className="hover:text-white">Design & Planning</Link>
            <span className="mx-2">→</span>
            <span className="text-white">Planning Workshop</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Portfolio Planning Workshop
          </h1>
          
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl">
            Create your complete portfolio blueprint before writing a single line of code. This interactive workshop will guide you through professional planning methodologies.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Workshop Steps */}
        <div className="space-y-8">
          
          {/* Step 1: Target Audience */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <h2 className="text-2xl font-bold">Define Your Target Audience</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Who will view your portfolio?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 bg-white dark:bg-gray-700 rounded border">
                    <strong>Hiring Managers</strong><br/>
                    Tech companies, agencies<br/>
                    <em>Goal: Assess technical skills</em>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-700 rounded border">
                    <strong>Fellow Developers</strong><br/>
                    Open source, networking<br/>
                    <em>Goal: Technical collaboration</em>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-700 rounded border">
                    <strong>Potential Clients</strong><br/>
                    Freelance opportunities<br/>
                    <em>Goal: Business value demonstration</em>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">✏️ Your Turn: Choose Your Primary Audience</h3>
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Select the audience that matters most for your current career goals:
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="audience" value="hiring" className="text-blue-600" />
                      <span>Hiring managers at tech companies (looking for employment)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="audience" value="freelance" className="text-blue-600" />
                      <span>Potential clients (starting freelance business)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="audience" value="network" className="text-blue-600" />
                      <span>Developer community (building professional network)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Content Strategy */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <h2 className="text-2xl font-bold">Content Strategy & Information Architecture</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-green-600 mb-3">Essential Sections</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="text-green-600" defaultChecked />
                      <span>Hero section with clear value proposition</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="text-green-600" defaultChecked />
                      <span>Projects showcase (3-5 best projects)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="text-green-600" defaultChecked />
                      <span>About section with professional story</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="text-green-600" defaultChecked />
                      <span>Skills and technologies</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="text-green-600" defaultChecked />
                      <span>Contact information and social links</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-green-600 mb-3">Optional Enhancements</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="text-green-600" />
                      <span>Blog or articles section</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="text-green-600" />
                      <span>Testimonials from clients/colleagues</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="text-green-600" />
                      <span>Resume/CV download</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="text-green-600" />
                      <span>Process or methodology explanation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="text-green-600" />
                      <span>Speaking engagements or achievements</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">💡 Pro Tip: The 5-Second Rule</h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Visitors should understand who you are, what you do, and why they should care within 5 seconds of landing on your portfolio. 
                  Everything else is secondary.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3: Visual Design System */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <h2 className="text-2xl font-bold">Visual Design System</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-purple-600 mb-4">Color Palette Selection</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-500 text-white rounded-lg text-center">
                      <div className="font-medium">Professional Blue</div>
                      <div className="text-sm opacity-90">#3B82F6</div>
                    </div>
                    <div className="p-4 bg-green-600 text-white rounded-lg text-center">
                      <div className="font-medium">Success Green</div>
                      <div className="text-sm opacity-90">#059669</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded text-center text-sm">Light</div>
                    <div className="p-3 bg-gray-500 text-white rounded text-center text-sm">Medium</div>
                    <div className="p-3 bg-gray-900 text-white rounded text-center text-sm">Dark</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-purple-600 mb-4">Typography System</h3>
                <div className="space-y-3">
                  <div className="p-3 border border-gray-200 dark:border-gray-600 rounded">
                    <div className="font-bold text-2xl">Heading Font</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Inter Bold - Clean and modern</div>
                  </div>
                  <div className="p-3 border border-gray-200 dark:border-gray-600 rounded">
                    <div className="text-lg">Body Text Font</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Inter Regular - Excellent readability</div>
                  </div>
                  <div className="p-3 border border-gray-200 dark:border-gray-600 rounded">
                    <div className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">Code Font</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">JetBrains Mono - Developer-friendly</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Technical Planning */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <h2 className="text-2xl font-bold">Technical Architecture Planning</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 border border-orange-200 dark:border-orange-700 rounded-lg">
                  <h3 className="font-semibold text-orange-600 mb-2">Beginner Level</h3>
                  <div className="text-sm space-y-1">
                    <div>✓ Static HTML/CSS</div>
                    <div>✓ GitHub Pages hosting</div>
                    <div>✓ Simple file structure</div>
                    <div>✓ No build process</div>
                  </div>
                </div>
                <div className="p-4 border border-orange-200 dark:border-orange-700 rounded-lg">
                  <h3 className="font-semibold text-orange-600 mb-2">Intermediate Level</h3>
                  <div className="text-sm space-y-1">
                    <div>✓ React components</div>
                    <div>✓ Tailwind CSS</div>
                    <div>✓ Vercel deployment</div>
                    <div>✓ Build optimization</div>
                  </div>
                </div>
                <div className="p-4 border border-orange-200 dark:border-orange-700 rounded-lg">
                  <h3 className="font-semibold text-orange-600 mb-2">Advanced Level</h3>
                  <div className="text-sm space-y-1">
                    <div>✓ Next.js full-stack</div>
                    <div>✓ Database integration</div>
                    <div>✓ CMS capabilities</div>
                    <div>✓ Authentication system</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">🎯 Start Simple, Scale Smart</h4>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  Begin with static HTML/CSS to master the fundamentals, then evolve the same portfolio through React to full-stack. 
                  This approach mirrors real-world product development.
                </p>
              </div>
            </div>
          </div>

          {/* Step 5: Project Timeline */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
              <h2 className="text-2xl font-bold">Development Sprint Planning</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <h3 className="font-semibold text-indigo-600 mb-2">Week 1</h3>
                  <div className="text-sm space-y-1">
                    <div>• Project setup & Git repo</div>
                    <div>• HTML structure</div>
                    <div>• Basic content creation</div>
                  </div>
                </div>
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <h3 className="font-semibold text-indigo-600 mb-2">Week 2</h3>
                  <div className="text-sm space-y-1">
                    <div>• CSS styling system</div>
                    <div>• Layout implementation</div>
                    <div>• Mobile responsiveness</div>
                  </div>
                </div>
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <h3 className="font-semibold text-indigo-600 mb-2">Week 3</h3>
                  <div className="text-sm space-y-1">
                    <div>• Projects showcase</div>
                    <div>• Polish and refinement</div>
                    <div>• Performance optimization</div>
                  </div>
                </div>
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <h3 className="font-semibold text-indigo-600 mb-2">Week 4</h3>
                  <div className="text-sm space-y-1">
                    <div>• Final testing</div>
                    <div>• Deployment setup</div>
                    <div>• Launch and sharing</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Workshop Completion */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">🎉 Planning Complete!</h2>
          <p className="mb-6">
            You've created a comprehensive blueprint for your professional portfolio. 
            Now you're ready to build with purpose and confidence.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/html-basics-enhanced"
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              🚀 Start Building Your Portfolio
            </Link>
            <Link 
              href="/foundation/design-planning"
              className="bg-white/20 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/30 transition-colors"
            >
              📋 Review Planning Guide
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between">
          <Link 
            href="/foundation/design-planning"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600"
          >
            ← Back to Design & Planning
          </Link>
          <Link 
            href="/html-basics-enhanced"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Start Building →
          </Link>
        </div>
      </div>
    </div>
  )
}
