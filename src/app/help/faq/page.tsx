'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { HelpIcon, DiscordIcon, UsersIcon } from '../../../components/icons'

const faqData = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "I'm completely new to coding. Where should I start?",
        answer: "Start with our Foundation Course! It covers HTML, CSS, and basic JavaScript. No prior experience needed. Join our Discord where friendly community members are always happy to help beginners. The key is to start with small projects and build up your confidence."
      },
      {
        question: "Do I need to pay for any software or tools?",
        answer: "Nope! Everything we teach uses free tools. VS Code is free, GitHub is free for students, and all the languages we cover are open-source. Our community members have also compiled a list of free resources that will take you far."
      },
      {
        question: "How long does it take to learn coding?",
        answer: "It varies! Some people land jobs after 6-12 months of consistent practice, others take longer. The beauty of our community approach is that you'll learn from people at all stages. Focus on building projects and helping others - you'll be surprised how much you learn by teaching!"
      }
    ]
  },
  {
    category: "Technical Issues",
    questions: [
      {
        question: "VS Code won't install or start properly",
        answer: "This is super common! First, try downloading from the official VS Code website. If you're on Windows, make sure to 'Run as Administrator.' Mac users might need to move it to Applications folder. Our Discord has a #tech-help channel where community members share solutions that worked for them."
      },
      {
        question: "Git says 'command not found' in my terminal",
        answer: "Git needs to be installed separately from VS Code. Download it from git-scm.com and restart your terminal. On Windows, you might need to add Git to your PATH. Post a screenshot in our Discord and someone will walk you through it!"
      },
      {
        question: "My code works on my computer but not when I deploy it",
        answer: "Deployment issues are learning opportunities! Common causes: file path case sensitivity, missing environment variables, or different Node.js versions. Share your error messages in our community and experienced developers will help you debug it step by step."
      }
    ]
  },
  {
    category: "Learning & Community",
    questions: [
      {
        question: "How do I ask good questions to get better help?",
        answer: "Great question! Include: what you're trying to do, what you expected to happen, what actually happened, your code (formatted properly), and any error messages. Our community loves helping people who show they've tried to solve it themselves first."
      },
      {
        question: "I feel like I'm behind everyone else. Is this normal?",
        answer: "Absolutely normal! Everyone learns at their own pace. Our community is full of people who felt exactly the same way. Focus on your own progress, celebrate small wins, and remember - every expert was once a beginner. The supportive environment here will help you push through."
      },
      {
        question: "How can I contribute back to the community?",
        answer: "Start by answering questions you know, even simple ones! Share your projects, participate in code reviews, write about your learning journey, or help moderate discussions. Teaching others is one of the best ways to solidify your own knowledge."
      }
    ]
  },
  {
    category: "Career & Jobs",
    questions: [
      {
        question: "When am I ready to apply for jobs?",
        answer: "When you can build complete projects from scratch and explain your code to others. Our community members who've successfully landed jobs often say: build 3-5 solid projects, contribute to open source, and practice explaining your work. Many found opportunities through connections made right here in our community!"
      },
      {
        question: "Should I focus on frontend, backend, or full-stack?",
        answer: "Start with frontend to see results quickly, then expand based on what excites you. Our community has developers in all specializations who can share their experiences. Try different things and see what clicks - you don't have to decide everything upfront."
      },
      {
        question: "How important is a computer science degree?",
        answer: "Many successful developers in our community are self-taught! Employers increasingly care about skills and portfolio over degrees. Focus on building great projects, contributing to open source, and developing problem-solving skills. Our community includes both degree-holders and bootcamp grads who can share their paths."
      }
    ]
  }
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  const filteredFAQ = selectedCategory 
    ? faqData.filter(category => category.category === selectedCategory)
    : faqData

  const categories = faqData.map(cat => cat.category)

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.1),transparent_50%)]"></div>
      </div>

      {/* Header */}
      <section className="relative px-6 pt-20 pb-16 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 shadow-xl">
            <HelpIcon className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Community <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">FAQ</span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
            Answers to the most common questions, curated and refined by our community members. 
            If you don't find what you're looking for, ask on Discord!
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="relative px-6 pb-12 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedCategory === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="relative px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {filteredFAQ.map((category, categoryIndex) => (
            <div key={category.category} className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">{categoryIndex + 1}</span>
                </div>
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, index) => {
                  const itemId = `${category.category}-${index}`
                  const isOpen = openItems.has(itemId)
                  
                  return (
                    <div 
                      key={itemId}
                      className="rounded-xl bg-white/5 backdrop-blur-sm border border-gray-700/50 overflow-hidden transition-all duration-200 hover:bg-white/10"
                    >
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
                      >
                        <h3 className="text-lg font-medium text-white pr-4">
                          {faq.question}
                        </h3>
                        <div className="flex-shrink-0">
                          {isOpen ? (
                            <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <div className="pt-2 border-t border-gray-700/30">
                            <p className="text-gray-300 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community CTA */}
      <section className="relative px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-2xl bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-500/20 p-12">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
              <UsersIcon className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
              Didn't Find Your Answer?
            </h2>
            
            <p className="text-lg text-gray-300 mb-8">
              Our community is incredibly responsive and helpful. Ask your question and usually get answers within minutes!
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://discord.gg/rockitcode"
                className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
              >
                <DiscordIcon className="w-6 h-6 mr-3" />
                Ask on Discord
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
