'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { renderIcon } from '@/components/icons'
import MentorLeaderboard from '@/components/mentor-leaderboard'
import LiveMentorStats from '@/components/live-mentor-stats'
import { useAuth } from '@/contexts/UserContext'
import Link from 'next/link'

export default function ContributorsPage() {
  const router = useRouter()
  const { user } = useAuth()

  const handleMentorApplication = () => {
    if (!user) {
      // Redirect to home page for login
      router.push('/?redirect=/settings&tab=mentor')
    } else {
      // Redirect to settings mentor tab
      router.push('/settings?tab=mentor')
    }
  }

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
            
            {/* CTA for Mentor Application */}
            <div className="flex justify-center gap-4">
              <button 
                onClick={handleMentorApplication}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                {user ? 'Become a Mentor' : 'Login to Become a Mentor'}
              </button>
              <a 
                href="https://discord.gg/rockitcode" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 hover:border-white/30 transition-all duration-200"
              >
                Join Discord
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 pb-20">
        
        {/* Mentor Leaderboard Section */}
        <section className="mb-24">
          <MentorLeaderboard className="mb-12" />
          
          {/* Mentor Program Info */}
          <div className="backdrop-blur-xl bg-white/[0.06] border border-white/[0.1] rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                {renderIcon('users', 'w-8 h-8 text-white')}
              </div>
              <h3 className="text-3xl font-light text-white mb-4 tracking-wide">
                Community Mentor Program
              </h3>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Join our experienced developers helping newcomers succeed in their coding journey.
              </p>
            </div>

            <LiveMentorStats />

            <div className="backdrop-blur-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/20 rounded-xl p-8">
              <h4 className="text-xl font-light text-white mb-6 flex items-center gap-2">
                {renderIcon('lightbulb', 'w-6 h-6 text-blue-400')}
                How Mentoring Works
              </h4>
              <div className="grid md:grid-cols-2 gap-8 mb-6">
                <div>
                  <h5 className="text-white font-medium mb-3">Ways to Help</h5>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-slate-300">
                      {renderIcon('chat', 'w-5 h-5 text-blue-400 mt-0.5')}
                      <span>Answer questions in Discord channels</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-300">
                      {renderIcon('code', 'w-5 h-5 text-blue-400 mt-0.5')}
                      <span>Review code and provide feedback</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-300">
                      {renderIcon('lightbulb', 'w-5 h-5 text-blue-400 mt-0.5')}
                      <span>Share career guidance and advice</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-300">
                      {renderIcon('target', 'w-5 h-5 text-blue-400 mt-0.5')}
                      <span>Help with project planning</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-medium mb-3">Why Mentors Matter</h5>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-slate-300">
                      {renderIcon('users', 'w-5 h-5 text-green-400 mt-0.5')}
                      <span>Accelerate learning for new developers</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-300">
                      {renderIcon('heart', 'w-5 h-5 text-green-400 mt-0.5')}
                      <span>Build confidence through support</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-300">
                      {renderIcon('star', 'w-5 h-5 text-green-400 mt-0.5')}
                      <span>Create lasting community connections</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-300">
                      {renderIcon('trending-up', 'w-5 h-5 text-green-400 mt-0.5')}
                      <span>Strengthen your own skills by teaching</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-4 mb-6">
                <p className="text-sm text-slate-400 text-center">
                  💡 We use an honor-based system where mentors self-report their impact, fostering trust and authentic contributions.
                </p>
              </div>
              
              <div className="text-center">
                <button
                  onClick={handleMentorApplication}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {user ? (
                    <>
                      {renderIcon('user-plus', 'w-5 h-5')}
                      Apply to Become a Mentor
                    </>
                  ) : (
                    <>
                      {renderIcon('login', 'w-5 h-5')}
                      Login to Apply as Mentor
                    </>
                  )}
                </button>
                <p className="text-sm text-slate-400 mt-3">
                  {user 
                    ? 'Share your knowledge • Help others grow • Build community'
                    : 'Login required to access mentor application'
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Financial Sponsors */}
        <section className="mb-24">
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
                      <span>Server infrastructure</span>
                    </li>
                    <li className="flex items-center gap-2">
                      {renderIcon('check', 'w-3 h-3 text-yellow-400')}
                      <span>Content creation tools</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="backdrop-blur-xl bg-gradient-to-br from-gray-400/10 to-gray-600/10 border border-gray-400/20 rounded-xl p-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-6 rounded-full shadow-lg bg-gradient-to-r from-gray-400 to-gray-600">
                    {renderIcon('shield', 'w-6 h-6 text-white')}
                  </div>
                  <h4 className="text-xl font-light text-white mb-3">Silver Sponsors</h4>
                  <p className="text-gray-200 text-sm mb-6 font-light">$100+ monthly</p>
                  <ul className="text-gray-200 text-sm space-y-2 font-light">
                    <li className="flex items-center gap-2">
                      {renderIcon('check', 'w-3 h-3 text-gray-400')}
                      <span>Community moderation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      {renderIcon('check', 'w-3 h-3 text-gray-400')}
                      <span>Learning resources</span>
                    </li>
                    <li className="flex items-center gap-2">
                      {renderIcon('check', 'w-3 h-3 text-gray-400')}
                      <span>Event hosting</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="backdrop-blur-xl bg-gradient-to-br from-orange-600/10 to-red-600/10 border border-orange-600/20 rounded-xl p-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-6 rounded-full shadow-lg bg-gradient-to-r from-orange-600 to-red-600">
                    {renderIcon('heart', 'w-6 h-6 text-white')}
                  </div>
                  <h4 className="text-xl font-light text-white mb-3">Community Supporters</h4>
                  <p className="text-orange-200 text-sm mb-6 font-light">$25+ monthly</p>
                  <ul className="text-orange-200 text-sm space-y-2 font-light">
                    <li className="flex items-center gap-2">
                      {renderIcon('check', 'w-3 h-3 text-orange-400')}
                      <span>Basic operations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      {renderIcon('check', 'w-3 h-3 text-orange-400')}
                      <span>Discord server costs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      {renderIcon('check', 'w-3 h-3 text-orange-400')}
                      <span>Educational materials</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Current Sponsors Placeholder */}
            <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-400/20 rounded-xl p-8 text-center">
              <h4 className="text-xl font-light text-white mb-4">Current Sponsors</h4>
              <p className="text-slate-300 mb-6 leading-relaxed">
                We're actively seeking partnerships with companies and foundations that share our 
                vision of accessible coding education.
              </p>
              <div className="text-sm text-slate-400 font-light">
                Interested in sponsoring? Contact us to learn about partnership opportunities.
              </div>
            </div>
          </div>
        </section>

        {/* How to Contribute */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-6 tracking-wide">How You Can Contribute</h2>
            <p className="text-xl text-slate-300 font-light">
              Join our mission to make coding education accessible to everyone
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Mentor */}
            <div className="backdrop-blur-xl bg-white/[0.06] border border-white/[0.1] rounded-2xl p-8 hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                  {renderIcon('users', 'w-8 h-8 text-white')}
                </div>
                <h3 className="text-2xl font-light text-white mb-3">Become a Mentor</h3>
              </div>
              <ul className="space-y-4 text-slate-300 mb-8">
                <li className="flex items-start gap-3">
                  {renderIcon('check', 'w-5 h-5 text-green-400 mt-0.5 flex-shrink-0')}
                  <span className="leading-relaxed">Share your coding expertise</span>
                </li>
                <li className="flex items-start gap-3">
                  {renderIcon('check', 'w-5 h-5 text-green-400 mt-0.5 flex-shrink-0')}
                  <span className="leading-relaxed">Help others overcome challenges</span>
                </li>
                <li className="flex items-start gap-3">
                  {renderIcon('check', 'w-5 h-5 text-green-400 mt-0.5 flex-shrink-0')}
                  <span className="leading-relaxed">Build your teaching skills</span>
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-4 px-6 rounded-lg transition-all duration-200 font-light">
                Join as Mentor
              </button>
            </div>

            {/* Sponsor */}
            <div className="backdrop-blur-xl bg-white/[0.06] border border-white/[0.1] rounded-2xl p-8 hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full shadow-lg bg-gradient-to-r from-green-500 to-emerald-500">
                  {renderIcon('heart', 'w-8 h-8 text-white')}
                </div>
                <h3 className="text-2xl font-light text-white mb-3">Financial Support</h3>
              </div>
              <ul className="space-y-4 text-slate-300 mb-8">
                <li className="flex items-start gap-3">
                  {renderIcon('check', 'w-5 h-5 text-green-400 mt-0.5 flex-shrink-0')}
                  <span className="leading-relaxed">Fund infrastructure costs</span>
                </li>
                <li className="flex items-start gap-3">
                  {renderIcon('check', 'w-5 h-5 text-green-400 mt-0.5 flex-shrink-0')}
                  <span className="leading-relaxed">Support content creation</span>
                </li>
                <li className="flex items-start gap-3">
                  {renderIcon('check', 'w-5 h-5 text-green-400 mt-0.5 flex-shrink-0')}
                  <span className="leading-relaxed">Enable community growth</span>
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 px-6 rounded-lg transition-all duration-200 font-light">
                Become a Sponsor
              </button>
            </div>

            {/* Community */}
            <div className="backdrop-blur-xl bg-white/[0.06] border border-white/[0.1] rounded-2xl p-8 hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-pink-500">
                  {renderIcon('chat', 'w-8 h-8 text-white')}
                </div>
                <h3 className="text-2xl font-light text-white mb-3">Community Support</h3>
              </div>
              <ul className="space-y-4 text-slate-300 mb-8">
                <li className="flex items-start gap-3">
                  {renderIcon('check', 'w-5 h-5 text-green-400 mt-0.5 flex-shrink-0')}
                  <span className="leading-relaxed">Answer questions in Discord</span>
                </li>
                <li className="flex items-start gap-3">
                  {renderIcon('check', 'w-5 h-5 text-green-400 mt-0.5 flex-shrink-0')}
                  <span className="leading-relaxed">Share learning resources</span>
                </li>
                <li className="flex items-start gap-3">
                  {renderIcon('check', 'w-5 h-5 text-green-400 mt-0.5 flex-shrink-0')}
                  <span className="leading-relaxed">Create a welcoming environment</span>
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 px-6 rounded-lg transition-all duration-200 font-light">
                Join Community
              </button>
            </div>
          </div>
        </section>

        {/* Recognition */}
        <section>
          <div className="text-center">
            <div className="backdrop-blur-xl bg-white/[0.08] border border-white/[0.12] rounded-2xl p-12">
              <div className="flex justify-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-blue-500">
                  {renderIcon('trophy', 'w-10 h-10 text-white')}
                </div>
              </div>
              <h2 className="text-4xl font-light text-white mb-6 tracking-wide">
                Thank You to All Contributors
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed font-light">
                Every contribution, whether it's time, expertise, or financial support, 
                helps us create better learning opportunities for developers worldwide.
              </p>
              <p className="text-lg text-slate-400 font-light">
                Together, we're building the future of coding education.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
