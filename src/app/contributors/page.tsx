'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { renderIcon } from '@/components/icons'
import MentorLeaderboard from '@/components/mentor-leaderboard'
import LiveMentorStats from '@/components/live-mentor-stats'
import SponsorCarousel from '@/components/sponsor-carousel'
import { useAuth } from '@/contexts/UserContext'
import Link from 'next/link'

export default function ContributorsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('sponsorship')

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

      {/* Main Content */}
      <div className="relative px-6 py-8 pb-20 mx-auto max-w-7xl">
        
        {/* Tab Navigation */}
        <div className="mb-16">
          <div className="flex justify-center">
            <div className="backdrop-blur-xl bg-white/[0.06] border border-white/[0.1] rounded-xl p-2 inline-flex">
              <button
                onClick={() => setActiveTab('sponsorship')}
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'sponsorship'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {renderIcon('star', 'w-5 h-5 inline mr-2')}
                Sponsorship
              </button>
              <button
                onClick={() => setActiveTab('mentors')}
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'mentors'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {renderIcon('users', 'w-5 h-5 inline mr-2')}
                Mentors
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'sponsorship' && (
          <div className="space-y-32">
            {/* Tab Header with Icon */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  {renderIcon('heart', 'w-16 h-16 text-blue-400')}
                  <div className="absolute w-3 h-3 rounded-full -top-1 -right-1 bg-green-400/80 animate-pulse"></div>
                </div>
              </div>
              <h1 className="mb-4 text-5xl font-light tracking-wide text-white">
                Sponsorship
              </h1>
              <p className="text-xl font-light text-slate-300">
                These incredible partners make free coding education possible for students worldwide
              </p>
            </div>

            {/* Current Sponsors Display - Moved to Top */}
            <section>
              <div className="space-y-12">
                {/* Premium Sponsors */}
                <div>
                  <div className="mb-8 text-center">
                    <h4 className="mb-3 text-2xl font-light text-white">Premium Sponsors</h4>
                    <div className="w-16 h-0.5 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  </div>
                  
                  {/* Premium Sponsors Grid - Larger, more prominent */}
                  <div className="p-16 border backdrop-blur-xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-400/20 rounded-2xl">
                    <div className="grid max-w-5xl gap-16 mx-auto md:grid-cols-2">
                      {/* Example Premium Sponsor Slots - Replace with actual data */}
                      {[
                        { 
                          name: "Microsoft", 
                          logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
                          url: "https://microsoft.com"
                        },
                        { 
                          name: "Google", 
                          logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
                          url: "https://google.com"
                        },
                        { 
                          name: "GitHub", 
                          logo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png",
                          url: "https://github.com"
                        },
                        { 
                          name: "Vercel", 
                          logo: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png",
                          url: "https://vercel.com"
                        }
                      ].map((sponsor, index) => (
                        <a 
                          key={index} 
                          href={sponsor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center p-12 transition-all duration-300 border rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 hover:scale-105 min-h-[180px] group"
                        >
                          <div className="flex items-center justify-center w-full h-24">
                            <img 
                              src={sponsor.logo} 
                              alt={`${sponsor.name} Logo`}
                              className="object-contain max-w-full max-h-full transition-opacity duration-300 filter brightness-0 invert opacity-90 group-hover:opacity-100"
                              style={{ width: 'auto', height: 'auto', maxWidth: '280px', maxHeight: '80px' }}
                            />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Basic Sponsors */}
                <div>
                  <div className="mb-6 text-center">
                    <h4 className="mb-3 text-xl font-light text-white">Supporting Sponsors</h4>
                    <div className="w-12 h-0.5 mx-auto bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                  </div>
                  
                  {/* Basic Sponsors Grid - Smaller, more compact */}
                  <div className="p-8 border backdrop-blur-xl bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-400/15 rounded-xl">
                    <div className="grid max-w-6xl gap-6 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                      {/* Example Basic Sponsor Slots - Replace with actual data */}
                      {[
                        { name: "Netlify", logo: "https://www.netlify.com/v3/img/components/logomark.png", url: "https://netlify.com" },
                        { name: "Figma", logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg", url: "https://figma.com" },
                        { name: "Discord", logo: "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6918e57475a843dcf5_icon_clyde_white_RGB.png", url: "https://discord.com" },
                        { name: "Notion", logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png", url: "https://notion.so" },
                        { name: "Slack", logo: "https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png", url: "https://slack.com" },
                        { name: "Zoom", logo: "https://st1.zoom.us/zoom.ico", url: "https://zoom.us" },
                        { name: "Dropbox", logo: "https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/dropbox/dbx-logo-black.svg", url: "https://dropbox.com" },
                        { name: "Linear", logo: "https://asset.brandfetch.io/idZAIqRe_4/idv3zwmSiY.png", url: "https://linear.app" },
                        { name: "Twilio", logo: "https://www.twilio.com/content/dam/twilio-com/global/en/logos/wordmark-red.svg", url: "https://twilio.com" },
                        { name: "MongoDB", logo: "https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png", url: "https://mongodb.com" }
                      ].slice(0, 10).map((sponsor, index) => (
                        <a 
                          key={index} 
                          href={sponsor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center p-6 transition-all duration-300 border rounded-xl bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-105 min-h-[80px] group"
                        >
                          <div className="flex items-center justify-center w-full h-12">
                            <img 
                              src={sponsor.logo} 
                              alt={`${sponsor.name} Logo`}
                              className="object-contain max-w-full max-h-full transition-opacity duration-300 filter brightness-0 invert opacity-70 group-hover:opacity-90"
                              style={{ width: 'auto', height: 'auto', maxWidth: '120px', maxHeight: '40px' }}
                            />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Sponsorship Tiers - Moved to Middle */}
            <section>
              <div className="mb-16 text-center">
                <h2 className="mb-6 text-4xl font-light tracking-wide text-white">Sponsorship Opportunities</h2>
                <p className="text-xl font-light text-slate-300">
                  Your support keeps coding education completely free for students with flexible sponsorship options
                </p>
              </div>
              
              <div className="backdrop-blur-xl bg-white/[0.06] border border-white/[0.1] rounded-2xl p-8 lg:p-12">
                <div className="mb-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-500">
                    {renderIcon('star', 'w-8 h-8 text-white')}
                  </div>
                  <h3 className="mb-4 text-3xl font-light tracking-wide text-white">
                    Choose Your Impact Level
                  </h3>
                  <p className="max-w-2xl mx-auto text-lg leading-relaxed text-slate-300">
                    Your sponsorship directly enables free coding education while giving your brand 
                    visibility that matches your commitment to empowering the next generation.
                  </p>
                </div>

                {/* Two Sponsorship Tiers */}
                <div className="grid max-w-4xl gap-8 mx-auto mb-12 md:grid-cols-2">
                  {/* Basic Tier */}
                  <div className="p-8 border backdrop-blur-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-400/20 rounded-xl">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full shadow-lg bg-gradient-to-r from-green-500 to-emerald-500">
                        {renderIcon('shield', 'w-8 h-8 text-white')}
                      </div>
                      <h4 className="mb-3 text-2xl font-light text-white">Basic Sponsor</h4>
                      <p className="mb-6 text-lg font-medium text-green-200">$50/month</p>
                      <ul className="space-y-3 text-sm font-light text-green-200">
                        <li className="flex items-center gap-3">
                          {renderIcon('check', 'w-4 h-4 text-green-400')}
                          <span>Logo featured on sponsors page</span>
                        </li>
                        <li className="flex items-center gap-3">
                          {renderIcon('check', 'w-4 h-4 text-green-400')}
                          <span>Recognition in community updates</span>
                        </li>
                        <li className="flex items-center gap-3">
                          {renderIcon('check', 'w-4 h-4 text-green-400')}
                          <span>Logo linking to your website</span>
                        </li>
                        <li className="flex items-center gap-3">
                          {renderIcon('check', 'w-4 h-4 text-green-400')}
                          <span>Quarterly impact reports</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Premium Tier */}
                  <div className="relative p-8 border backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-400/20 rounded-xl">
                    {/* Popular Badge */}
                    <div className="absolute transform -translate-x-1/2 -top-3 left-1/2">
                      <span className="px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                        MAXIMUM EXPOSURE
                      </span>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-500">
                        {renderIcon('star', 'w-8 h-8 text-white')}
                      </div>
                      <h4 className="mb-3 text-2xl font-light text-white">Premium Sponsor</h4>
                      <p className="mb-6 text-lg font-medium text-blue-200">$100/month</p>
                      <ul className="space-y-3 text-sm font-light text-blue-200">
                        <li className="flex items-center gap-3">
                          {renderIcon('check', 'w-4 h-4 text-blue-400')}
                          <span>Logo on every page above footer</span>
                        </li>
                        <li className="flex items-center gap-3">
                          {renderIcon('check', 'w-4 h-4 text-blue-400')}
                          <span>Maximum site-wide visibility</span>
                        </li>
                        <li className="flex items-center gap-3">
                          {renderIcon('check', 'w-4 h-4 text-blue-400')}
                          <span>Featured on sponsors page</span>
                        </li>
                        <li className="flex items-center gap-3">
                          {renderIcon('check', 'w-4 h-4 text-blue-400')}
                          <span>Monthly detailed analytics</span>
                        </li>
                        <li className="flex items-center gap-3">
                          {renderIcon('check', 'w-4 h-4 text-blue-400')}
                          <span>Priority support & communication</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Contact CTA */}
                <div className="p-8 mt-8 text-center border backdrop-blur-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-400/20 rounded-xl">
                  <h4 className="mb-4 text-xl font-light text-white">Ready to Sponsor?</h4>
                  <p className="mb-6 leading-relaxed text-slate-300">
                    Contact us to get started with sponsorship and help us provide free coding education to kids everywhere. 
                    Join our mission of accessible coding education.
                  </p>
                  <div className="text-sm font-light text-slate-400">
                    Interested in sponsoring? Contact us to learn about partnership opportunities.
                  </div>
                </div>
              </div>
            </section>

            {/* Why Sponsor & Community Support - Side by Side */}
            <section>
              <div className="grid max-w-6xl gap-12 mx-auto lg:grid-cols-2">
                {/* Why Sponsor Card */}
                <div>
                  <div className="mb-8 text-center">
                    <h2 className="mb-4 text-3xl font-light tracking-wide text-white">Why Sponsor?</h2>
                    <p className="text-lg font-light text-slate-300">
                      Make a direct impact on coding education accessibility
                    </p>
                  </div>
                  
                  <div className="backdrop-blur-xl bg-white/[0.06] border border-white/[0.1] rounded-2xl p-8 hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300">
                    <div className="mb-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full shadow-lg bg-gradient-to-r from-green-500 to-emerald-500">
                        {renderIcon('heart', 'w-8 h-8 text-white')}
                      </div>
                      <h3 className="mb-3 text-2xl font-light text-white">Financial Support</h3>
                    </div>
                    <ul className="mb-8 space-y-4 text-slate-300">
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
                    <button className="w-full px-6 py-4 font-light text-white transition-all duration-200 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                      Become a Sponsor
                    </button>
                  </div>
                </div>

                {/* Community Support Card */}
                <div>
                  <div className="mb-8 text-center">
                    <h2 className="mb-4 text-3xl font-light tracking-wide text-white">Community Support</h2>
                    <p className="text-lg font-light text-slate-300">
                      Help create a welcoming environment for all learners
                    </p>
                  </div>
                  
                  <div className="backdrop-blur-xl bg-white/[0.06] border border-white/[0.1] rounded-2xl p-8 hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300">
                    <div className="mb-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-pink-500">
                        {renderIcon('chat', 'w-8 h-8 text-white')}
                      </div>
                      <h3 className="mb-3 text-2xl font-light text-white">Community Support</h3>
                    </div>
                    <ul className="mb-8 space-y-4 text-slate-300">
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
                    <a 
                      href="https://discord.gg/rockitcode" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full px-6 py-4 font-light text-center text-white transition-all duration-200 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Join Community
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'mentors' && (
          <div className="space-y-32">
            {/* Tab Header with Icon */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  {renderIcon('heart', 'w-16 h-16 text-blue-400')}
                  <div className="absolute w-3 h-3 rounded-full -top-1 -right-1 bg-green-400/80 animate-pulse"></div>
                </div>
              </div>
              <h1 className="mb-4 text-5xl font-light tracking-wide text-white">
                Mentors
              </h1>
              <p className="text-xl font-light text-slate-300">
                Recognizing our top community mentors making a difference in students' coding journeys
              </p>
            </div>

            {/* Mentor Leaderboard - Moved to Top */}
            <section>
              <MentorLeaderboard />
            </section>
            
            {/* Mentor Program Info - Moved to Middle */}
            <section>
              <div className="backdrop-blur-xl bg-white/[0.06] border border-white/[0.1] rounded-2xl p-8 lg:p-12">
                <div className="mb-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                    {renderIcon('users', 'w-8 h-8 text-white')}
                  </div>
                  <h3 className="mb-4 text-3xl font-light tracking-wide text-white">
                    Community Mentor Program
                  </h3>
                  <p className="max-w-2xl mx-auto text-lg leading-relaxed text-slate-300">
                    Join our experienced developers helping newcomers succeed in their coding journey.
                  </p>
                </div>

                <LiveMentorStats />

                <div className="p-8 border backdrop-blur-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-400/20 rounded-xl">
                  <h4 className="flex items-center gap-2 mb-6 text-xl font-light text-white">
                    {renderIcon('lightbulb', 'w-6 h-6 text-blue-400')}
                    How Mentoring Works
                  </h4>
                  <div className="grid gap-8 mb-6 md:grid-cols-2">
                    <div>
                      <h5 className="mb-3 font-medium text-white">Ways to Help</h5>
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
                      <h5 className="mb-3 font-medium text-white">Why Mentors Matter</h5>
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
                    <p className="text-sm text-center text-slate-400">
                      💡 We use an honor-based system where mentors self-report their impact, fostering trust and authentic contributions.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <button
                      onClick={handleMentorApplication}
                      className="inline-flex items-center gap-2 px-8 py-3 font-medium text-white transition-all duration-200 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl"
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
                    <p className="mt-3 text-sm text-slate-400">
                      {user 
                        ? 'Share your knowledge • Help others grow • Build community'
                        : 'Login required to access mentor application'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Why Become a Mentor & Community Support - Side by Side */}
            <section>
              <div className="grid max-w-6xl gap-12 mx-auto lg:grid-cols-2">
                {/* Why Become a Mentor Card */}
                <div>
                  <div className="mb-8 text-center">
                    <h2 className="mb-4 text-3xl font-light tracking-wide text-white">Why Become a Mentor?</h2>
                    <p className="text-lg font-light text-slate-300">
                      Help shape the next generation of developers
                    </p>
                  </div>
                  
                  <div className="backdrop-blur-xl bg-white/[0.06] border border-white/[0.1] rounded-2xl p-8 hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300">
                    <div className="mb-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                        {renderIcon('users', 'w-8 h-8 text-white')}
                      </div>
                      <h3 className="mb-3 text-2xl font-light text-white">Become a Mentor</h3>
                    </div>
                    <ul className="mb-8 space-y-4 text-slate-300">
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
                    <button 
                      onClick={handleMentorApplication}
                      className="w-full px-6 py-4 font-light text-white transition-all duration-200 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    >
                      Join as Mentor
                    </button>
                  </div>
                </div>

                {/* Community Support Card */}
                <div>
                  <div className="mb-8 text-center">
                    <h2 className="mb-4 text-3xl font-light tracking-wide text-white">Community Support</h2>
                    <p className="text-lg font-light text-slate-300">
                      Help create a welcoming environment for all learners
                    </p>
                  </div>
                  
                  <div className="backdrop-blur-xl bg-white/[0.06] border border-white/[0.1] rounded-2xl p-8 hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300">
                    <div className="mb-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-pink-500">
                        {renderIcon('chat', 'w-8 h-8 text-white')}
                      </div>
                      <h3 className="mb-3 text-2xl font-light text-white">Community Support</h3>
                    </div>
                    <ul className="mb-8 space-y-4 text-slate-300">
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
                    <a 
                      href="https://discord.gg/rockitcode" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full px-6 py-4 font-light text-center text-white transition-all duration-200 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Join Community
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Recognition */}
        <section className="mt-32">
          <div className="text-center">
            <div className="backdrop-blur-xl bg-white/[0.08] border border-white/[0.12] rounded-2xl p-12">
              <div className="flex justify-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-blue-500">
                  {renderIcon('trophy', 'w-10 h-10 text-white')}
                </div>
              </div>
              <h2 className="mb-6 text-4xl font-light tracking-wide text-white">
                Thank You to All Contributors
              </h2>
              <p className="max-w-3xl mx-auto mb-8 text-xl font-light leading-relaxed text-slate-300">
                Every contribution, whether it's time, expertise, or financial support, 
                helps us create better learning opportunities for developers worldwide.
              </p>
              <p className="text-lg font-light text-slate-400">
                Together, we're building the future of coding education.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
