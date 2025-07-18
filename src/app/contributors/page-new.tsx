'use client'

import { useState } from 'react'
import { renderIcon } from '@/components/icons'
import MentorApplicationForm from '@/components/mentor-application-form'
import MentorLeaderboard from '@/components/mentor-leaderboard'
import MentorStatsTracker from '@/components/mentor-stats-tracker'

export default function ContributorsPage() {
  const [showMentorApplication, setShowMentorApplication] = useState(false)
  const [showMentorLeaderboard, setShowMentorLeaderboard] = useState(false)
  const [showStatsTracker, setShowStatsTracker] = useState(false)

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

      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/30 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            {/* Professional Contributors Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                {renderIcon('heart', 'w-16 h-16 text-blue-400')}
                <div className="absolute w-3 h-3 rounded-full -top-1 -right-1 bg-green-400/80 animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-5xl font-light mb-6 text-white tracking-wide">
              Mission Control Contributors
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8 font-light">
              Building the future of coding education together through community support, 
              mentorship, and collaborative development.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 pb-20 space-y-24">
        
        {/* Active Mentoring Program */}
        <section>
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
                🧭 Active Mentoring Program
              </h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                Connect with experienced developers who provide personalized guidance, 
                code reviews, and career advice to accelerate your learning journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* For Students */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                  👨‍🎓 For Students
                </h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>1-on-1 guidance sessions with experienced developers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Code reviews for your projects and assignments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Career advice and industry insights</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Interview preparation and technical practice</span>
                  </li>
                </ul>
                <button 
                  onClick={() => setShowMentorLeaderboard(true)}
                  className="w-full mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  Browse Active Mentors
                </button>
              </div>

              {/* For Mentors */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                  👨‍🏫 For Mentors
                </h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">✓</span>
                    <span>Share your expertise and give back to the community</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">✓</span>
                    <span>Flexible commitment - mentor when you have time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">✓</span>
                    <span>Recognition and stats tracking for your contributions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">✓</span>
                    <span>Connect with other experienced developers</span>
                  </li>
                </ul>
                <div className="space-y-3 mt-6">
                  <button 
                    onClick={() => setShowMentorApplication(true)}
                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Apply to Become a Mentor
                  </button>
                  <button 
                    onClick={() => setShowStatsTracker(true)}
                    className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Update Mentor Stats
                  </button>
                </div>
              </div>
            </div>

            {/* Mentor Stats Preview */}
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">150+</div>
                <div className="text-slate-300">Students Helped This Month</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">320+</div>
                <div className="text-slate-300">Hours of Mentoring</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">25+</div>
                <div className="text-slate-300">Active Mentors</div>
              </div>
            </div>
          </div>
        </section>

        {/* Mentor Leaderboard */}
        <section>
          <MentorLeaderboard />
        </section>

        {/* Financial Sponsors */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-6 tracking-wide">Financial Supporters</h2>
            <p className="text-xl text-slate-300 font-light">
              Organizations and individuals who believe in making quality coding education accessible
            </p>
          </div>
          
          <div className="backdrop-blur-xl bg-white/[0.06] border border-white/[0.1] rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full shadow-lg bg-gradient-to-r from-green-500 to-emerald-500">
                {renderIcon('heart', 'w-8 h-8 text-white')}
              </div>
              <h3 className="text-3xl font-light text-white mb-4 tracking-wide">
                Supporting Our Mission
              </h3>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Organizations and individuals who believe in making quality coding education 
                accessible to everyone.
              </p>
            </div>

            {/* Sponsor Tiers */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="backdrop-blur-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-400/20 rounded-xl p-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-6 rounded-full shadow-lg bg-gradient-to-r from-yellow-500 to-orange-500">
                    {renderIcon('star', 'w-6 h-6 text-white')}
                  </div>
                  <h4 className="text-xl font-light text-white mb-3">Gold Sponsors</h4>
                  <p className="text-yellow-200 text-sm mb-6 font-light">$500+ monthly</p>
                  <ul className="text-yellow-200 text-sm space-y-2 font-light">
                    <li className="flex items-center gap-2">
                      {renderIcon('check', 'w-3 h-3 text-yellow-400')}
                      <span>Premium Discord features</span>
                    </li>
                    <li className="flex items-center gap-2">
                      {renderIcon('check', 'w-3 h-3 text-yellow-400')}
                      <span>Priority mentor access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      {renderIcon('check', 'w-3 h-3 text-yellow-400')}
                      <span>Company logo on website</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="backdrop-blur-xl bg-gradient-to-br from-slate-500/10 to-gray-500/10 border border-slate-400/20 rounded-xl p-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-6 rounded-full shadow-lg bg-gradient-to-r from-slate-500 to-gray-500">
                    {renderIcon('award', 'w-6 h-6 text-white')}
                  </div>
                  <h4 className="text-xl font-light text-white mb-3">Silver Sponsors</h4>
                  <p className="text-slate-200 text-sm mb-6 font-light">$100+ monthly</p>
                  <ul className="text-slate-200 text-sm space-y-2 font-light">
                    <li className="flex items-center gap-2">
                      {renderIcon('check', 'w-3 h-3 text-slate-400')}
                      <span>Discord recognition badge</span>
                    </li>
                    <li className="flex items-center gap-2">
                      {renderIcon('check', 'w-3 h-3 text-slate-400')}
                      <span>Sponsors page listing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      {renderIcon('check', 'w-3 h-3 text-slate-400')}
                      <span>Early access to content</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="backdrop-blur-xl bg-gradient-to-br from-amber-600/10 to-yellow-600/10 border border-amber-500/20 rounded-xl p-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-6 rounded-full shadow-lg bg-gradient-to-r from-amber-600 to-yellow-600">
                    {renderIcon('heart', 'w-6 h-6 text-white')}
                  </div>
                  <h4 className="text-xl font-light text-white mb-3">Bronze Supporters</h4>
                  <p className="text-amber-200 text-sm mb-6 font-light">$25+ monthly</p>
                  <ul className="text-amber-200 text-sm space-y-2 font-light">
                    <li className="flex items-center gap-2">
                      {renderIcon('check', 'w-3 h-3 text-amber-400')}
                      <span>Supporters page mention</span>
                    </li>
                    <li className="flex items-center gap-2">
                      {renderIcon('check', 'w-3 h-3 text-amber-400')}
                      <span>Discord supporter role</span>
                    </li>
                    <li className="flex items-center gap-2">
                      {renderIcon('check', 'w-3 h-3 text-amber-400')}
                      <span>Community gratitude</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-medium shadow-lg transition-all duration-300 group">
                {renderIcon('heart', 'w-5 h-5 group-hover:scale-110 transition-transform')}
                <span>Become a Financial Supporter</span>
                {renderIcon('arrow-right', 'w-5 h-5 group-hover:translate-x-1 transition-transform')}
              </button>
            </div>
          </div>
        </section>

        {/* Community Impact */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-6 tracking-wide">Community Impact</h2>
            <p className="text-xl text-slate-300 font-light">
              Together we're making coding education more accessible and effective
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="backdrop-blur-xl bg-blue-500/5 border border-blue-400/20 rounded-xl p-6 text-center">
              <div className="text-3xl font-light text-blue-400 mb-2">5,000+</div>
              <div className="text-slate-300 font-light">Students Reached</div>
            </div>
            <div className="backdrop-blur-xl bg-green-500/5 border border-green-400/20 rounded-xl p-6 text-center">
              <div className="text-3xl font-light text-green-400 mb-2">1,200+</div>
              <div className="text-slate-300 font-light">Mentoring Hours</div>
            </div>
            <div className="backdrop-blur-xl bg-purple-500/5 border border-purple-400/20 rounded-xl p-6 text-center">
              <div className="text-3xl font-light text-purple-400 mb-2">50+</div>
              <div className="text-slate-300 font-light">Active Contributors</div>
            </div>
            <div className="backdrop-blur-xl bg-orange-500/5 border border-orange-400/20 rounded-xl p-6 text-center">
              <div className="text-3xl font-light text-orange-400 mb-2">95%</div>
              <div className="text-slate-300 font-light">Positive Feedback</div>
            </div>
          </div>
        </section>

        {/* Join Community */}
        <section>
          <div className="backdrop-blur-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="text-3xl font-light text-white mb-6 tracking-wide">Join Our Community</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8 font-light">
              Whether you're looking to learn, mentor, or support financially, there's a place for you 
              in our mission to make coding education accessible to everyone.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                {renderIcon('chat', 'w-5 h-5')}
                <span>Join Discord</span>
              </button>
              <button 
                onClick={() => setShowMentorApplication(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                {renderIcon('user-plus', 'w-5 h-5')}
                <span>Become a Mentor</span>
              </button>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
                {renderIcon('heart', 'w-5 h-5')}
                <span>Support Financially</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Modals */}
      {showMentorApplication && (
        <MentorApplicationForm
          onSuccess={() => {
            setShowMentorApplication(false)
            // Show success message or redirect
          }}
          onCancel={() => setShowMentorApplication(false)}
        />
      )}

      {showMentorLeaderboard && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Mentor Leaderboard</h2>
              <button
                onClick={() => setShowMentorLeaderboard(false)}
                className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
            <MentorLeaderboard />
          </div>
        </div>
      )}

      {showStatsTracker && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Update Mentor Stats</h2>
              <button
                onClick={() => setShowStatsTracker(false)}
                className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
            <MentorStatsTracker />
          </div>
        </div>
      )}
    </div>
  )
}
