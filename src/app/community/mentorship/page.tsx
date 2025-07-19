'use client'

import { useState } from 'react'
import { useUser } from '@/contexts/UserContext'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import MentorLeaderboard from '@/components/mentor-leaderboard'
import { renderIcon } from '@/components/icons'
import type { Database } from '@/types/database'

export default function MentorshipPage() {
  const { user } = useUser()
  const [activeSection, setActiveSection] = useState('overview')

  const navigationItems = [
    { id: 'overview', label: 'How It Works', icon: 'lightbulb' },
    { id: 'mentors', label: 'Find a Mentor', icon: 'star' },
    { id: 'faq', label: 'FAQ & Help', icon: 'help' }
  ]

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
            {/* Professional Mentorship Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div className="absolute w-3 h-3 rounded-full -top-1 -right-1 bg-green-400/80 animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-5xl font-light mb-6 text-white tracking-wide">
              Mentorship Program
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8 font-light">
              Connect with experienced developers for guidance, or become a mentor to help others on their coding journey. 
              Our structured mentorship creates lasting connections and accelerates learning.
            </p>
            <div className="flex justify-center">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl px-6 py-3 border border-slate-700/50">
                <span className="text-slate-300 font-medium">Professional Development Network</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-wrap justify-center gap-3">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 font-medium ${
                  activeSection === item.id
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/10'
                    : 'bg-slate-800/30 text-slate-400 hover:bg-slate-700/30 hover:text-slate-300 border border-slate-700/50'
                }`}
              >
                {renderIcon(item.icon, "w-5 h-5")}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        
        {/* How It Works Section */}
        {activeSection === 'overview' && (
          <div className="space-y-16">
            {/* Process Overview */}
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-light text-white mb-4">How Mentorship Works</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                  A streamlined process designed for meaningful connections and real learning outcomes.
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12">
                {/* For Students */}
                <div className="bg-slate-800/30 backdrop-blur border border-slate-700/50 rounded-2xl p-8">
                  <h3 className="text-2xl font-light text-blue-400 mb-8 flex items-center gap-3">
                    {renderIcon('user', "w-6 h-6")}
                    For Students
                  </h3>
                  
                  <div className="space-y-6">
                    {[
                      { step: 1, title: "Find a Mentor", description: "Browse mentor profiles and find someone whose expertise matches your learning goals." },
                      { step: 2, title: "Connect on Discord", description: "Reach out using their Discord username. Introduce yourself and explain what you'd like help with." },
                      { step: 3, title: "Schedule Your Session", description: "Work together to schedule a session - code review, pair programming, career advice, or debugging help." },
                      { step: 4, title: "Complete Your Session", description: "Attend your mentoring session and learn! Ask questions, get feedback, and practice together." },
                      { step: 5, title: "Leave a Review", description: "After your mentor logs the session, you can leave a star rating to help other students." }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-400 text-sm font-medium">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">{item.title}</h4>
                          <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-green-500/5 border border-green-500/20 rounded-xl">
                    <p className="text-green-300 text-sm">
                      <strong>💡 Important:</strong> You can only review mentors after they've logged your completed session. 
                      If you don't see the review option, ask your mentor to log your session first!
                    </p>
                  </div>
                </div>

                {/* For Mentors */}
                <div className="bg-slate-800/30 backdrop-blur border border-slate-700/50 rounded-2xl p-8">
                  <h3 className="text-2xl font-light text-purple-400 mb-8 flex items-center gap-3">
                    {renderIcon('star', "w-6 h-6")}
                    For Mentors
                  </h3>
                  
                  <div className="space-y-6">
                    {[
                      { step: 1, title: "Apply to Mentor", description: "Go to Settings → Mentor tab to submit your application. Share your experience and mentoring approach." },
                      { step: 2, title: "Get Approved", description: "Our team reviews your application and reaches out via Discord for a brief chat." },
                      { step: 3, title: "Help Students", description: "Students will reach out on Discord. Provide guidance, code reviews, and career advice." },
                      { step: 4, title: "Log Your Sessions", description: "After each session, log it in your mentor dashboard to track impact and enable student reviews." },
                      { step: 5, title: "Track Your Impact", description: "Update your weekly stats and see your progress on the mentor leaderboard." }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center text-purple-400 text-sm font-medium">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-white mb-2">{item.title}</h4>
                          <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl">
                    <p className="text-purple-300 text-sm">
                      <strong>🔑 Key:</strong> Students can only leave reviews after you log their session as "completed". 
                      This ensures quality control and verifies genuine mentoring interactions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mentor Tools Overview */}
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-light text-white mb-4">Mentor Tools & Requirements</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                  Professional tools to track your mentoring impact and maintain quality standards.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: 'settings',
                    title: 'Session Logging',
                    color: 'yellow',
                    items: [
                      'Log each completed session in your dashboard',
                      'Include student email, session topic, and date', 
                      'Mark session as "completed" to enable reviews',
                      'Track your total impact and hours mentored'
                    ]
                  },
                  {
                    icon: 'star',
                    title: 'Review System',
                    color: 'blue',
                    items: [
                      'Students can review you after session completion',
                      '5-star rating system with written feedback',
                      'Reviews are public to help students choose mentors',
                      'Higher ratings boost your mentor ranking'
                    ]
                  },
                  {
                    icon: 'trophy',
                    title: 'Leaderboard',
                    color: 'green',
                    items: [
                      'Compete with other mentors in impact metrics',
                      'Weekly tracking of students helped and hours',
                      'Honor system - self-report your contributions',
                      'Recognition for top mentors each week'
                    ]
                  }
                ].map((tool, index) => (
                  <div key={index} className="bg-slate-800/30 backdrop-blur border border-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      {renderIcon(tool.icon, `w-6 h-6 text-${tool.color}-400`)}
                      <h3 className={`text-xl font-medium text-${tool.color}-400`}>{tool.title}</h3>
                    </div>
                    <ul className="text-slate-300 space-y-3">
                      {tool.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="bg-slate-800/20 backdrop-blur border border-slate-700/50 rounded-2xl p-12">
                <h2 className="text-3xl font-light text-white mb-6">Ready to Get Started?</h2>
                {user ? (
                  <div className="space-y-6">
                    <p className="text-slate-300 text-lg">Choose your path below:</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a 
                        href="/settings?tab=mentor"
                        className="px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 border border-purple-500/30 hover:border-purple-400/50 text-purple-400 rounded-lg transition-all duration-300 font-medium"
                      >
                        🧑‍🏫 Become a Mentor
                      </a>
                      <button
                        onClick={() => setActiveSection('mentors')}
                        className="px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 border border-blue-500/30 hover:border-blue-400/50 text-blue-400 rounded-lg transition-all duration-300 font-medium"
                      >
                        🎓 Find a Mentor
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p className="text-slate-300 text-lg">Join RockitCode to access our mentorship program:</p>
                    <a 
                      href="/auth"
                      className="inline-block px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 border border-blue-500/30 hover:border-blue-400/50 text-blue-400 rounded-lg transition-all duration-300 font-medium"
                    >
                      🚀 Join Now - It's Free!
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Available Mentors Section */}
        {activeSection === 'mentors' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-white mb-4">Available Mentors</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Connect with experienced developers ready to help you grow your skills and advance your career.
              </p>
            </div>
            <MentorLeaderboard />
          </div>
        )}

        {/* FAQ Section */}
        {activeSection === 'faq' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Everything you need to know about our mentorship program and how to get the most out of it.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-8">
              {[
                {
                  icon: 'help',
                  color: 'blue',
                  question: "Why can't I leave a review for my mentor?",
                  answer: "You can only review mentors after they've logged your completed session in their dashboard. This ensures quality control, accurate tracking, and fair reviews for genuine mentoring sessions.",
                  tip: "Ask your mentor to log your session in Settings → Mentor tab → Session Logging. Once they mark it as 'completed', you'll be able to leave a review!"
                },
                {
                  icon: 'user',
                  color: 'purple',
                  question: "How do I become a mentor?",
                  answer: "Our mentor application process ensures quality mentorship through a structured review system.",
                  steps: [
                    "Go to Settings → Mentor tab and fill out the application",
                    "Share your coding experience and mentoring approach", 
                    "Our team reviews your application (usually within 2-3 days)",
                    "If approved, we'll reach out on Discord for a brief chat",
                    "Welcome to the mentor program! 🎉"
                  ]
                },
                {
                  icon: 'settings',
                  color: 'green',
                  question: "How does session logging work?",
                  answer: "Session logging is how mentors track their impact and enable student reviews:",
                  steps: [
                    "During/after your session: Mentor goes to their dashboard",
                    "Log details: Student email, session topic, date, duration, notes",
                    "Mark complete: Set status to 'completed' when session ends",
                    "Enable reviews: Student can now rate and review the mentor",
                    "Track impact: Mentor's stats and leaderboard position update"
                  ]
                },
                {
                  icon: 'chat',
                  color: 'yellow',
                  question: "What should I expect from a mentoring session?",
                  answer: "Mentoring sessions are flexible and tailored to your specific learning needs and goals.",
                  sections: [
                    {
                      title: "Common Session Types:",
                      items: ["Code review and feedback", "Debugging help", "Pair programming", "Career guidance", "Project planning", "Technology recommendations"]
                    },
                    {
                      title: "Session Length:",
                      items: ["30 minutes - Quick help/questions", "1 hour - Standard session", "2+ hours - Deep dive/project work", "Flexible based on your needs"]
                    }
                  ]
                },
                {
                  icon: 'target',
                  color: 'pink',
                  question: "How do I choose the right mentor?",
                  answer: "Finding the right mentor match is important for your learning success:",
                  steps: [
                    "Check specialties: Look for mentors with expertise in your area of interest",
                    "Read reviews: See what other students say about their mentoring style",
                    "Check availability: Look for 'Active' status (not 'Away' or 'Retired')",
                    "Review their bio: Find someone whose experience aligns with your goals",
                    "Start with a trial: Have a short first session to see if it's a good fit"
                  ]
                }
              ].map((faq, index) => (
                <div key={index} className="bg-slate-800/30 backdrop-blur border border-slate-700/50 rounded-xl p-8">
                  <div className="flex items-start gap-4 mb-6">
                    {renderIcon(faq.icon, `w-8 h-8 text-${faq.color}-400`)}
                    <div>
                      <h3 className={`text-xl font-medium text-${faq.color}-400 mb-3`}>{faq.question}</h3>
                      <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                  
                  {faq.steps && (
                    <ol className="text-slate-300 space-y-2 ml-12">
                      {faq.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start gap-3">
                          <span className={`text-${faq.color}-400 font-medium`}>{stepIndex + 1}.</span>
                          <span className="text-sm">{step}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                  
                  {faq.sections && (
                    <div className="grid md:grid-cols-2 gap-6 ml-12">
                      {faq.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex}>
                          <h4 className="text-white font-medium mb-2">{section.title}</h4>
                          <ul className="text-slate-300 space-y-1">
                            {section.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="flex items-start gap-2 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {faq.tip && (
                    <div className={`mt-6 ml-12 p-4 bg-${faq.color}-500/5 border border-${faq.color}-500/20 rounded-xl`}>
                      <p className={`text-${faq.color}-300 text-sm`}>
                        <strong>💡 Solution:</strong> {faq.tip}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
