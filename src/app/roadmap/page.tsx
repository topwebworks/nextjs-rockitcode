import Link from 'next/link'
import { renderIcon } from '@/components/icons'

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      {/* Subtle Space Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        {/* Subtle Stars */}
        <div className="absolute w-1 h-1 rounded-full top-20 left-20 bg-white/60"></div>
        <div className="absolute w-1 h-1 rounded-full top-40 right-32 bg-blue-200/40"></div>
        <div className="absolute top-64 left-1/3 w-0.5 h-0.5 bg-white/50 rounded-full"></div>
        <div className="absolute w-1 h-1 rounded-full bottom-40 right-20 bg-white/30"></div>
        <div className="absolute bottom-64 left-16 w-0.5 h-0.5 bg-blue-100/40 rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Professional Roadmap Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {renderIcon('map', "w-16 h-16 text-blue-400")}
              <div className="absolute w-3 h-3 rounded-full -top-1 -right-1 bg-green-400/80 animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="text-5xl font-light mb-6 text-white tracking-wide">
            RockitCode Development Roadmap
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            Community-driven learning platform with professional project focus
          </p>
        </div>

      {/* Recent Major Accomplishments */}
      <div className="bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] rounded-3xl p-8 mb-16 hover:bg-white/[0.12] hover:border-white/[0.2] transition-all duration-300 ease-out">
        <h2 className="text-2xl font-medium mb-6 text-white flex items-center">
          <div className="w-8 h-8 rounded-xl bg-yellow-500/20 border border-yellow-400/30 flex items-center justify-center mr-3">
            {renderIcon('trophy', 'w-5 h-5 text-yellow-400')}
          </div>
          Recent Major Accomplishments (2024-2025)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium mb-3 text-white/90 border-b border-white/[0.1] pb-2">Community-First Platform:</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  {renderIcon('check', 'w-3 h-3 text-green-400')}
                </div>
                Discord-centric support system
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  {renderIcon('check', 'w-3 h-3 text-green-400')}
                </div>
                Community-driven help center
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  {renderIcon('check', 'w-3 h-3 text-green-400')}
                </div>
                Peer-to-peer learning model
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  {renderIcon('check', 'w-3 h-3 text-green-400')}
                </div>
                Gamified community participation</li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  {renderIcon('check', 'w-3 h-3 text-green-400')}
                </div>
                Professional footer and navigation
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium mb-3 text-white/90 border-b border-white/[0.1] pb-2">Technical Infrastructure:</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  {renderIcon('check', 'w-3 h-3 text-green-400')}
                </div>
                Interactive lesson system
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  {renderIcon('check', 'w-3 h-3 text-green-400')}
                </div>
                Mission Control Setup lesson
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  {renderIcon('check', 'w-3 h-3 text-green-400')}
                </div>
                Supabase authentication
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  {renderIcon('check', 'w-3 h-3 text-green-400')}
                </div>
                Dynamic lesson routing
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  {renderIcon('check', 'w-3 h-3 text-green-400')}
                </div>
                Professional icon system
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium mb-3 text-white/90 border-b border-white/[0.1] pb-2">User Experience:</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  {renderIcon('check', 'w-3 h-3 text-green-400')}
                </div>
                Clean, professional design
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  {renderIcon('check', 'w-3 h-3 text-green-400')}
                </div>
                Mobile-responsive layout
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  {renderIcon('check', 'w-3 h-3 text-green-400')}
                </div>
                Dark mode accessibility
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  {renderIcon('check', 'w-3 h-3 text-green-400')}
                </div>
                Community pages and FAQ
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  {renderIcon('check', 'w-3 h-3 text-green-400')}
                </div>
                Progress tracking system
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 p-6 bg-emerald-500/10 border border-emerald-400/20 backdrop-blur-sm rounded-2xl">
          <p className="text-sm font-medium flex items-center text-emerald-300">
            <div className="w-5 h-5 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mr-3 flex-shrink-0">
              {renderIcon('target', 'w-3 h-3 text-emerald-400')}
            </div>
            Impact: Foundation established for community-driven platform with Discord-first support and professional project focus.
          </p>
        </div>
      </div>

      {/* Current Status */}
      <div className="bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] rounded-3xl p-8 mb-16 hover:bg-white/[0.12] hover:border-white/[0.2] transition-all duration-300 ease-out">
        <h2 className="text-2xl font-medium mb-6 text-white flex items-center">
          <div className="w-8 h-8 rounded-xl bg-green-500/20 border border-green-400/30 flex items-center justify-center mr-3">
            {renderIcon('check', 'w-5 h-5 text-green-400')}
          </div>
          Phase 1: Community Foundation Complete
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-medium mb-3 text-white/90 border-b border-white/[0.1] pb-2">What We've Built:</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  {renderIcon('check', 'w-3 h-3 text-green-400')}
                </div>
                Discord-first support model
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  {renderIcon('check', 'w-3 h-3 text-green-400')}
                </div>
                Community-driven help center
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  {renderIcon('check', 'w-3 h-3 text-green-400')}
                </div>
                Interactive lesson system
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  {renderIcon('check', 'w-3 h-3 text-green-400')}
                </div>
                Professional site design
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  {renderIcon('check', 'w-3 h-3 text-green-400')}
                </div>
                Mission Control Setup lesson
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  {renderIcon('check', 'w-3 h-3 text-green-400')}
                </div>
                Responsive mobile experience
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  {renderIcon('check', 'w-3 h-3 text-green-400')}
                </div>
                Clean navigation and footer
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  {renderIcon('check', 'w-3 h-3 text-green-400')}
                </div>
                Community pages and FAQ
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium mb-3 text-white/90 border-b border-white/[0.1] pb-2">Community Model Results:</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-400 text-xs">✅</span>
                </div>
                Discord as primary support channel
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-400 text-xs">✅</span>
                </div>
                Peer-to-peer learning environment
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-400 text-xs">✅</span>
                </div>
                Gamified community participation
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-400 text-xs">✅</span>
                </div>
                Professional brand identity
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-400 text-xs">✅</span>
                </div>
                Clean, accessible design
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-400 text-xs">✅</span>
                </div>
                Mobile-first responsive layout
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Decision Analysis */}
      <div className="bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] rounded-3xl p-8 mb-16 hover:bg-white/[0.12] hover:border-white/[0.2] transition-all duration-300 ease-out">
        <h2 className="text-2xl font-medium mb-6 text-white flex items-center">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center mr-3">
            {renderIcon('target', 'w-5 h-5 text-purple-400')}
          </div>
          Strategic Decisions & Technical Analysis
        </h2>
        <p className="text-slate-300 mb-8 leading-relaxed">
          Critical technical and business decisions that will shape Launch Pad's development approach and long-term success.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-medium mb-3 text-white/90 border-b border-white/[0.1] pb-2">Key Decision Points:</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400/60 mt-2 flex-shrink-0"></div>
                Incremental vs. Complete Rebuild approach
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400/60 mt-2 flex-shrink-0"></div>
                TailwindCSS vs. Custom CSS strategy
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400/60 mt-2 flex-shrink-0"></div>
                Component architecture optimization
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400/60 mt-2 flex-shrink-0"></div>
                Performance vs. Development speed trade-offs
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400/60 mt-2 flex-shrink-0"></div>
                Database strategy and timeline
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400/60 mt-2 flex-shrink-0"></div>
                Monetization approach and sustainability
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium mb-3 text-white/90 border-b border-white/[0.1] pb-2">Analysis Available:</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {renderIcon('chart', 'w-3 h-3 text-blue-400')}
                </div>
                <Link href="/strategy-decisions" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/50 hover:decoration-blue-300 transition-colors">
                  Strategic Business Analysis
                </Link>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {renderIcon('chart', 'w-3 h-3 text-blue-400')}
                </div>
                <Link href="/database-options" className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/50 hover:decoration-blue-300 transition-colors">
                  Database Strategy Comparison
                </Link>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {renderIcon('building', 'w-3 h-3 text-blue-400')}
                </div>
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
      <div className="bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] rounded-3xl p-8 mb-16 hover:bg-white/[0.12] hover:border-white/[0.2] transition-all duration-300 ease-out group">
        <h2 className="text-2xl font-medium mb-6 text-white flex items-center">
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center mr-3">
            {renderIcon('book', 'w-5 h-5 text-blue-400')}
          </div>
          <div>
            <span>Phase 2: Content Expansion</span>
            <div className="text-sm text-blue-400 font-medium">CURRENT PRIORITY</div>
          </div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div className="space-y-4">
            <h4 className="font-medium mb-3 text-white/90 border-b border-white/[0.1] pb-2">Core Features:</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-orange-500/20 border border-orange-400/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-400 text-xs">🔄</span>
                </div>
                Foundation course expansion
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-orange-500/20 border border-orange-400/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-400 text-xs">🔄</span>
                </div>
                Project-based learning modules
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-orange-500/20 border border-orange-400/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-400 text-xs">🔄</span>
                </div>
                Enhanced lesson progression
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-orange-500/20 border border-orange-400/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-400 text-xs">🔄</span>
                </div>
                Professional portfolio projects
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-lg bg-orange-500/20 border border-orange-400/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-400 text-xs">🔄</span>
                </div>
                Career-focused curriculum
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium mb-3 text-white/90 border-b border-white/[0.1] pb-2">Technical Implementation:</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60 mt-2 flex-shrink-0"></div>
                Additional interactive lessons
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60 mt-2 flex-shrink-0"></div>
                Progress tracking enhancement
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60 mt-2 flex-shrink-0"></div>
                Project template system
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60 mt-2 flex-shrink-0"></div>
                Portfolio showcase features
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60 mt-2 flex-shrink-0"></div>
                Community project sharing
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-blue-500/10 border border-blue-400/20 backdrop-blur-sm rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-300 mb-1">
                <strong>Estimated Time:</strong> 3-4 weeks
              </p>
              <p className="text-sm text-blue-300">
                <strong>Impact:</strong> Complete foundation course with real-world projects
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
              {renderIcon('clock', 'w-6 h-6 text-blue-400')}
            </div>
          </div>
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
            <h4 className="font-medium mb-3 text-white">Next Week:</h4>
            <ol className="space-y-1 text-sm list-decimal list-inside text-slate-300">
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
        <Link href="/" className="inline-block px-8 py-4 bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] text-white rounded-2xl hover:bg-white/[0.15] hover:border-white/[0.2] transition-all duration-300 ease-out mr-4 group">
          <span className="flex items-center gap-2">
            {renderIcon('arrow-left', "w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300")}
            Back to Home
          </span>
        </Link>
        <Link href="/community" className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600/80 to-blue-600/80 backdrop-blur-xl border border-purple-400/20 text-white rounded-2xl hover:from-purple-500/90 hover:to-blue-500/90 hover:border-purple-300/30 transition-all duration-300 ease-out group">
          <span className="flex items-center gap-2">
            Join Discord Community
            {renderIcon('external-link', "w-4 h-4 group-hover:translate-x-1 transition-transform duration-300")}
          </span>
        </Link>
      </div>
    </div>
    </div>
  )
}
