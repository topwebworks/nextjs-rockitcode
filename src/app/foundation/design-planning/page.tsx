import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Design & Project Planning | RockitCode Foundation',
  description: 'Learn the complete project lifecycle before writing code. Master web design, UX/UI principles, project management, stakeholder communication, and technical architecture planning.',
}

export default function DesignPlanning() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <nav className="flex items-center text-sm text-purple-100 mb-4">
            <Link href="/projects/portfolio/beginner" className="hover:text-white">Portfolio Project</Link>
            <span className="mx-2">→</span>
            <span className="text-white">Chapter 1.2: Design & Planning</span>
          </nav>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
              Chapter 1.2
            </div>
            <div className="bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
              Critical Foundation
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Design & Project Planning
          </h1>
          
          <p className="text-xl text-purple-100 mb-8 max-w-3xl">
            Master the complete project lifecycle that happens BEFORE developers write code. Learn web design, UX/UI principles, project management, stakeholder communication, and technical architecture planning.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-sm text-purple-100">Duration</div>
              <div className="text-lg font-semibold">2-3 hours</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-sm text-purple-100">Skills</div>
              <div className="text-lg font-semibold">Design + Planning</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-sm text-purple-100">Outcome</div>
              <div className="text-lg font-semibold">Portfolio Blueprint</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Critical Foundation Alert */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-2xl">⚠️</div>
            <h2 className="text-xl font-bold text-red-800 dark:text-red-200">Why Most Developer Projects Fail</h2>
          </div>
          <p className="text-red-700 dark:text-red-300 mb-4">
            <strong>95% of developers jump straight to code</strong> without understanding user needs, business requirements, or proper design principles. 
            This leads to projects that look amateur, don't solve real problems, and fail in job interviews.
          </p>
          <p className="text-red-700 dark:text-red-300">
            <strong>This lesson teaches you the professional workflow</strong> that separates junior developers from senior ones. 
            Learn what happens in real companies before any code is written.
          </p>
        </div>

        {/* Learning Modules */}
        <div className="space-y-8">
          
          {/* Module 1: Big Picture Thinking */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <h2 className="text-2xl font-bold">Big Picture Strategy & Information Architecture</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-600">What You'll Learn</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <strong>Target Audience Analysis:</strong> Who will use your portfolio and what do they need to see?
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <strong>Information Architecture:</strong> How to organize content for maximum impact
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <strong>Content Strategy:</strong> What stories to tell and how to tell them
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <strong>Competitive Analysis:</strong> Research successful portfolios in your field
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Real-World Example</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                  <strong>Target:</strong> Hiring managers at tech companies<br/>
                  <strong>Goal:</strong> Get interviews for frontend developer roles<br/>
                  <strong>Key Message:</strong> "I solve problems with clean, modern code"
                </p>
                <div className="text-xs text-blue-600 dark:text-blue-400">
                  ✓ Prioritize projects over personal info<br/>
                  ✓ Show GitHub repos and live demos<br/>
                  ✓ Emphasize problem-solving approach
                </div>
              </div>
            </div>
          </div>

          {/* Module 2: UX/UI Design Principles */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <h2 className="text-2xl font-bold">UX/UI Design Fundamentals</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-600">User Experience (UX)</h3>
                <div className="space-y-2 text-sm">
                  <div>• User journey mapping</div>
                  <div>• Accessibility principles</div>
                  <div>• Mobile-first thinking</div>
                  <div>• Performance considerations</div>
                  <div>• Navigation patterns</div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-600">User Interface (UI)</h3>
                <div className="space-y-2 text-sm">
                  <div>• Visual hierarchy</div>
                  <div>• Typography selection</div>
                  <div>• Color theory & palettes</div>
                  <div>• Spacing & layout grids</div>
                  <div>• Component design</div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-600">Design Systems</h3>
                <div className="space-y-2 text-sm">
                  <div>• Consistent styling</div>
                  <div>• Reusable components</div>
                  <div>• Brand guidelines</div>
                  <div>• Design tokens</div>
                  <div>• Documentation</div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">💡 Professional Insight</h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Developers who understand design principles earn 20-30% more than those who don't. 
                You'll learn to communicate with designers and build better interfaces from day one.
              </p>
            </div>
          </div>

          {/* Module 3: Project Management */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <h2 className="text-2xl font-bold">Project Management & Stakeholder Communication</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-orange-600">Agile Methodology</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold">Sprint Planning</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Break your portfolio into 1-2 week sprints with clear deliverables</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold">User Stories</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">"As a hiring manager, I want to see live projects so I can evaluate technical skills"</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold">Task Tracking</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Use GitHub Issues, Trello, or Notion to track progress</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-orange-600">Stakeholder Management</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold">Requirements Gathering</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Interview potential users (other developers, hiring managers)</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold">Progress Reviews</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Regular check-ins with mentors, peers, or online communities</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold">Feedback Integration</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">How to receive, evaluate, and implement feedback effectively</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Module 4: Technical Architecture */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <h2 className="text-2xl font-bold">Technical Architecture & Framework Selection</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-purple-600">Technology Decisions</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200">Frontend Framework</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Static HTML/CSS vs React vs Vue - choosing based on requirements, not trends
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200">Hosting & Deployment</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      GitHub Pages vs Netlify vs Vercel - cost, performance, and feature comparison
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200">Performance Budget</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Setting load time goals and choosing technologies that support them
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-purple-600">Architecture Planning</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200">File Structure</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Organizing code for maintainability and scalability from day one
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200">Version Control Strategy</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Git workflow, branching strategy, and collaboration planning
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200">Future Scaling</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Planning for evolution to intermediate and advanced versions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Module 5: Hands-On Workshop */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-white text-indigo-600 rounded-full flex items-center justify-center font-bold">5</div>
              <h2 className="text-2xl font-bold">Hands-On Portfolio Planning Workshop</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Your Portfolio Blueprint</h3>
                <div className="space-y-3 text-indigo-100">
                  <div>✓ Target audience definition and user personas</div>
                  <div>✓ Content strategy and information architecture</div>
                  <div>✓ Visual design system and style guide</div>
                  <div>✓ Technical requirements and constraints</div>
                  <div>✓ Project timeline and milestone planning</div>
                  <div>✓ Success metrics and testing strategy</div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Deliverables</h3>
                <div className="space-y-3 text-indigo-100">
                  <div>📋 Project requirements document</div>
                  <div>🎨 Style guide with colors, fonts, and spacing</div>
                  <div>📱 Wireframes for mobile and desktop</div>
                  <div>🗂️ Content outline and copywriting brief</div>
                  <div>⚡ Technical architecture diagram</div>
                  <div>📅 Development sprint plan</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Link 
            href="/foundation/design-planning/workshop"
            className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            🚀 Start Planning Workshop
          </Link>
          <Link 
            href="/foundation/design-planning/resources"
            className="bg-gray-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            📚 Design Resources
          </Link>
          <Link 
            href="/foundation/design-planning/templates"
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            📝 Planning Templates
          </Link>
        </div>

        {/* Why This Matters */}
        <div className="mt-12 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-6">
          <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-200 mb-4">🎯 Why This Changes Everything</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Before This Lesson</h4>
              <div className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                <div>❌ Jump straight to code without planning</div>
                <div>❌ Build features nobody asked for</div>
                <div>❌ Redesign multiple times mid-project</div>
                <div>❌ Miss deadlines due to scope creep</div>
                <div>❌ Create portfolios that don't land jobs</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">After This Lesson</h4>
              <div className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                <div>✅ Plan like a senior developer</div>
                <div>✅ Build with clear purpose and strategy</div>
                <div>✅ Communicate effectively with stakeholders</div>
                <div>✅ Deliver projects on time and on budget</div>
                <div>✅ Create portfolios that get you hired</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between">
          <Link 
            href="/foundation/chapter-2-git"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600"
          >
            ← Previous: Git & GitHub
          </Link>
          <Link 
            href="/html-basics-enhanced"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Next: Start Building →
          </Link>
        </div>
      </div>
    </div>
  )
}
