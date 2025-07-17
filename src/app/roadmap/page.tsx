import Link from 'next/link'
import { renderIcon } from '@/components/icons'

export default function RoadmapPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4 flex justify-center">{renderIcon('map', 'w-16 h-16')}</div>
        <h1 className="text-4xl font-bold mb-4">RockitCode Development Roadmap</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Community-driven learning platform with professional project focus
        </p>
      </div>

      {/* Recent Major Accomplishments */}
      <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          {renderIcon('trophy', 'w-5 h-5 mr-2')}
          Recent Major Accomplishments (2024-2025)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-medium mb-2">Community-First Platform:</h4>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center">{renderIcon('check', 'w-4 h-4 mr-2')} Discord-centric support system</li>
              <li className="flex items-center">{renderIcon('check', 'w-4 h-4 mr-2')} Community-driven help center</li>
              <li className="flex items-center">{renderIcon('check', 'w-4 h-4 mr-2')} Peer-to-peer learning model</li>
              <li className="flex items-center">{renderIcon('check', 'w-4 h-4 mr-2')} Gamified community participation</li>
              <li className="flex items-center">{renderIcon('check', 'w-4 h-4 mr-2')} Professional footer and navigation</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Technical Infrastructure:</h4>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center">{renderIcon('check', 'w-4 h-4 mr-2')} Interactive lesson system</li>
              <li className="flex items-center">{renderIcon('check', 'w-4 h-4 mr-2')} Mission Control Setup lesson</li>
              <li className="flex items-center">{renderIcon('check', 'w-4 h-4 mr-2')} Supabase authentication</li>
              <li className="flex items-center">{renderIcon('check', 'w-4 h-4 mr-2')} Dynamic lesson routing</li>
              <li className="flex items-center">{renderIcon('check', 'w-4 h-4 mr-2')} Professional icon system</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">User Experience:</h4>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center">{renderIcon('check', 'w-4 h-4 mr-2')} Clean, professional design</li>
              <li className="flex items-center">{renderIcon('check', 'w-4 h-4 mr-2')} Mobile-responsive layout</li>
              <li className="flex items-center">{renderIcon('check', 'w-4 h-4 mr-2')} Dark mode accessibility</li>
              <li className="flex items-center">{renderIcon('check', 'w-4 h-4 mr-2')} Community pages and FAQ</li>
              <li className="flex items-center">{renderIcon('check', 'w-4 h-4 mr-2')} Progress tracking system</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-4 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg">
          <p className="text-sm font-medium flex items-center">
            {renderIcon('target', 'w-4 h-4 mr-2')}
            Impact: Foundation established for community-driven platform with Discord-first support and professional project focus.
          </p>
        </div>
      </div>

      {/* Current Status */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          {renderIcon('check', 'w-5 h-5 mr-2')}
          Phase 1: Community Foundation Complete
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">What We've Built:</h4>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center">{renderIcon('check', 'w-4 h-4 mr-2')} Discord-first support model</li>
              <li className="flex items-center">{renderIcon('check', 'w-4 h-4 mr-2')} Community-driven help center</li>
              <li className="flex items-center">{renderIcon('check', 'w-4 h-4 mr-2')} Interactive lesson system</li>
              <li className="flex items-center">{renderIcon('check', 'w-4 h-4 mr-2')} Professional site design</li>
              <li className="flex items-center">{renderIcon('check', 'w-4 h-4 mr-2')} Mission Control Setup lesson</li>
              <li className="flex items-center">{renderIcon('check', 'w-4 h-4 mr-2')} Responsive mobile experience</li>
              <li className="flex items-center">{renderIcon('check', 'w-4 h-4 mr-2')} Clean navigation and footer</li>
              <li className="flex items-center">{renderIcon('check', 'w-4 h-4 mr-2')} Community pages and FAQ</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Community Model Results:</h4>
            <ul className="space-y-1 text-sm">
              <li>✅ Discord as primary support channel</li>
              <li>✅ Peer-to-peer learning environment</li>
              <li>✅ Gamified community participation</li>
              <li>✅ Professional brand identity</li>
              <li>✅ Clean, accessible design</li>
              <li>✅ Mobile-first responsive layout</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Strategic Decision Analysis */}
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          {renderIcon('target', 'w-5 h-5 mr-2')}
          Strategic Decisions & Technical Analysis
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Critical technical and business decisions that will shape Launch Pad's development approach and long-term success.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Key Decision Points:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Incremental vs. Complete Rebuild approach</li>
              <li>• TailwindCSS vs. Custom CSS strategy</li>
              <li>• Component architecture optimization</li>
              <li>• Performance vs. Development speed trade-offs</li>
              <li>• Database strategy and timeline</li>
              <li>• Monetization approach and sustainability</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Analysis Available:</h4>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2">
                {renderIcon('chart', 'w-4 h-4')}
                <Link href="/strategy-decisions" className="text-blue-600 hover:underline">Strategic Business Analysis</Link>
              </li>
              <li className="flex items-center gap-2">
                {renderIcon('chart', 'w-4 h-4')}
                <Link href="/database-options" className="text-blue-600 hover:underline">Database Strategy Comparison</Link>
              </li>
              <li className="flex items-center gap-2">
                {renderIcon('building', 'w-4 h-4')}
                <Link href="/rebuild-analysis" className="text-blue-600 hover:underline">Complete Rebuild vs. Incremental Analysis</Link>
              </li>
              <li className="flex items-center gap-2">
                {renderIcon('lightning', 'w-4 h-4')}
                Performance optimization roadmap
              </li>
              <li className="flex items-center gap-2">
                {renderIcon('chart', 'w-4 h-4')}
                Revenue model implementation plan
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Phase 2: Content Expansion */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          {renderIcon('book', 'w-5 h-5 mr-2')}
          Phase 2: Content Expansion (Current Priority)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="font-medium mb-2">Core Features:</h4>
            <ul className="space-y-1 text-sm">
              <li>🔄 Foundation course expansion</li>
              <li>🔄 Project-based learning modules</li>
              <li>🔄 Enhanced lesson progression</li>
              <li>🔄 Professional portfolio projects</li>
              <li>🔄 Career-focused curriculum</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Technical Implementation:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Additional interactive lessons</li>
              <li>• Progress tracking enhancement</li>
              <li>• Project template system</li>
              <li>• Portfolio showcase features</li>
              <li>• Community project sharing</li>
            </ul>
          </div>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900/40 rounded-lg p-4">
          <p className="text-sm"><strong>Estimated Time:</strong> 3-4 weeks</p>
          <p className="text-sm"><strong>Impact:</strong> Complete foundation course with real-world projects</p>
        </div>
      </div>

      {/* Phase 3: Advanced Learning Features */}
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          {renderIcon('lightning', 'w-5 h-5 mr-2')}
          Phase 3: Advanced Learning Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="font-medium mb-2">Enhanced Features:</h4>
            <ul className="space-y-1 text-sm">
              <li>🔄 Advanced code editor features</li>
              <li>🔄 Real-time collaboration tools</li>
              <li>🔄 AI-powered learning assistance</li>
              <li>🔄 Community code reviews</li>
              <li>🔄 Advanced progress analytics</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Community Features:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Discord bot integration</li>
              <li>• Peer mentorship matching</li>
              <li>• Community challenges</li>
              <li>• Project showcases</li>
              <li>• Achievement leaderboards</li>
            </ul>
          </div>
        </div>
        <div className="bg-purple-100 dark:bg-purple-900/40 rounded-lg p-4">
          <p className="text-sm"><strong>Estimated Time:</strong> 4-5 weeks</p>
          <p className="text-sm"><strong>Impact:</strong> Advanced learning with community collaboration</p>
        </div>
      </div>

      {/* Phase 4: Professional Portfolio System */}
      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          {renderIcon('briefcase', 'w-5 h-5 mr-2')}
          Phase 4: Professional Portfolio System
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="font-medium mb-2">Portfolio Features:</h4>
            <ul className="space-y-1 text-sm">
              <li>🔄 Dynamic portfolio generation</li>
              <li>🔄 Project showcase system</li>
              <li>🔄 Professional resume builder</li>
              <li>🔄 Career development tracking</li>
              <li>🔄 Industry connection tools</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Career Tools:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Professional networking features</li>
              <li>• Interview preparation resources</li>
              <li>• Job application tracking</li>
              <li>• Skill assessment system</li>
              <li>• Mentor-mentee connections</li>
            </ul>
          </div>
        </div>
        <div className="bg-orange-100 dark:bg-orange-900/40 rounded-lg p-4">
          <p className="text-sm"><strong>Estimated Time:</strong> 3-4 weeks</p>
          <p className="text-sm"><strong>Impact:</strong> Complete career preparation ecosystem</p>
        </div>
      </div>

      {/* Phase 5: Business & Sustainability */}
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          {renderIcon('money', 'w-5 h-5 mr-2')}
          Phase 5: Business & Sustainability
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <h4 className="font-medium mb-2">Revenue Model:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Affiliate partnerships</li>
              <li>• Professional tool setups</li>
              <li>• Premium career services</li>
              <li>• Corporate training programs</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Community Growth:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Discord community scaling</li>
              <li>• Influencer partnerships</li>
              <li>• Content creator programs</li>
              <li>• University partnerships</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Platform Features:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Advanced analytics</li>
              <li>• Performance optimization</li>
              <li>• Scaling infrastructure</li>
              <li>• Enterprise features</li>
            </ul>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
          <p className="text-sm"><strong>Estimated Time:</strong> 4-6 weeks</p>
          <p className="text-sm"><strong>Impact:</strong> Sustainable, scalable business model</p>
        </div>
      </div>

      {/* Immediate Next Steps */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          {renderIcon('rocket', 'w-5 h-5 mr-2')}
          Immediate Next Steps (This Week)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">Content Priorities:</h4>
            <ol className="space-y-2 text-sm list-decimal list-inside">
              <li><strong>Expand Foundation course</strong> - Add more interactive lessons</li>
              <li><strong>Create project templates</strong> - Professional portfolio projects</li>
              <li><strong>Build career pathways</strong> - Frontend, backend, full-stack tracks</li>
              <li><strong>Enhance community features</strong> - Discord integration improvements</li>
              <li><strong>Portfolio showcase system</strong> - Student project highlights</li>
            </ol>
          </div>
          <div>
            <h4 className="font-medium mb-3">Technical & Community:</h4>
            <ol className="space-y-2 text-sm list-decimal list-inside">
              <li><strong>Course progression system</strong> - Better tracking and navigation</li>
              <li><strong>Community engagement tools</strong> - Discord bot features</li>
              <li><strong>Mobile experience polish</strong> - Fine-tune responsive design</li>
              <li><strong>Performance optimization</strong> - Analytics and user behavior</li>
              <li><strong>User feedback collection</strong> - Gather insights for improvements</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Technology Stack Recommendations */}
      <div className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="mr-2">🛠️</span>
          Recommended Technology Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium mb-3">Core Platform:</h4>
            <ul className="space-y-1 text-sm">
              <li>• <strong>Next.js 15</strong> - React framework</li>
              <li>• <strong>Supabase</strong> - Database & auth</li>
              <li>• <strong>Tailwind CSS</strong> - Styling</li>
              <li>• <strong>TypeScript</strong> - Type safety</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">Learning Platform:</h4>
            <ul className="space-y-1 text-sm">
              <li>• <strong>Monaco Editor</strong> - Code editor</li>
              <li>• <strong>Interactive components</strong> - Custom React</li>
              <li>• <strong>Progress tracking</strong> - Database persistence</li>
              <li>• <strong>Text-based tutorials</strong> - No video fatigue</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">Community:</h4>
            <ul className="space-y-1 text-sm">
              <li>• <strong>Discord API</strong> - Community integration</li>
              <li>• <strong>GitHub OAuth</strong> - Portfolio connection</li>
              <li>• <strong>Real-time features</strong> - WebSocket/SSE</li>
              <li>• <strong>Analytics</strong> - User behavior tracking</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Strategic Foundation */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          {renderIcon('target', 'w-5 h-5 mr-2')}
          Strategic Foundation
        </h2>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">✅ Community-First Learning Model:</h4>
            <div className="bg-white dark:bg-gray-700 p-4 rounded text-sm">
              <p className="font-medium text-green-600 mb-2">Confirmed Approach: Discord-Centric Community Platform</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <strong>Core Features:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• Real-time Discord support</li>
                    <li>• Project-based learning</li>
                    <li>• Peer-to-peer mentoring</li>
                    <li>• Gamified progression</li>
                  </ul>
                </div>
                <div>
                  <strong>Strategic Benefits:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• Lower barrier to entry</li>
                    <li>• Stronger community bonds</li>
                    <li>• Immediate help access</li>
                    <li>• Social learning motivation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">✅ Multi-Stream Revenue Strategy:</h4>
            <div className="bg-white dark:bg-gray-700 p-4 rounded text-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <strong>Affiliate Integration:</strong>
                  <p className="mt-1">Tool recommendations, hosting, courses that complement free education</p>
                </div>
                <div>
                  <strong>Premium Career Services:</strong>
                  <p className="mt-1">Portfolio reviews, interview prep, job placement assistance</p>
                </div>
                <div>
                  <strong>Corporate Training:</strong>
                  <p className="mt-1">Custom programs for companies seeking skilled developers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Metrics */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          {renderIcon('chart', 'w-5 h-5 mr-2')}
          Success Metrics & Milestones
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">Phase 2 Success (Content):</h4>
            <ul className="space-y-1 text-sm">
              <li>• Complete Foundation course (8+ lessons)</li>
              <li>• 3+ professional project templates</li>
              <li>• Course completion rate &gt; 60%</li>
              <li>• User engagement &gt; 25 min/session</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">Community Growth:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Discord community &gt; 500 active members</li>
              <li>• Daily community interactions &gt; 50</li>
              <li>• Peer-to-peer help success rate &gt; 80%</li>
              <li>• Student portfolio showcase &gt; 100 projects</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          {renderIcon('target', 'w-5 h-5 mr-2')}
          Your Next Action Items
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">This Week:</h4>
            <ol className="space-y-1 text-sm list-decimal list-inside">
              <li>Expand Foundation course content</li>
              <li>Create professional project templates</li>
              <li>Build career pathway guidance</li>
              <li>Enhance Discord community features</li>
            </ol>
          </div>
          <div>
            <h4 className="font-medium mb-3">Next Week:</h4>
            <ol className="space-y-1 text-sm list-decimal list-inside">
              <li>Launch portfolio showcase system</li>
              <li>Implement advanced progress tracking</li>
              <li>Build community project sharing</li>
              <li>Start user testing and feedback collection</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Back to Launch Pad */}
      <div className="text-center">
        <Link href="/" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mr-4">
          ← Back to Home
        </Link>
        <Link href="/community" className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          Join Discord Community
        </Link>
      </div>
    </div>
  )
}
