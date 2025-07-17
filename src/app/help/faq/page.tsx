'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { renderIcon } from '@/components/icons'

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
            {/* Professional FAQ Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                {renderIcon('help', 'w-16 h-16 text-blue-400')}
                <div className="absolute w-3 h-3 rounded-full -top-1 -right-1 bg-green-400/80 animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-5xl font-light mb-6 text-white tracking-wide">
              Community Knowledge Base
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8 font-light">
              Answers to the most common questions, curated and refined by our community members. 
              If you don't find what you're looking for, ask on Discord!
            </p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="relative max-w-4xl mx-auto px-6 pb-12">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                : 'backdrop-blur-xl bg-white/[0.08] border border-white/[0.12] text-slate-300 hover:bg-white/[0.12] hover:text-white'
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'backdrop-blur-xl bg-white/[0.08] border border-white/[0.12] text-slate-300 hover:bg-white/[0.12] hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Content */}
      <div className="relative max-w-4xl mx-auto px-6 pb-24">
        {filteredFAQ.map((category, categoryIndex) => (
          <div key={category.category} className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-4 shadow-lg">
                <span className="text-white font-medium text-lg">{categoryIndex + 1}</span>
              </div>
              <h2 className="text-3xl font-light text-white tracking-wide">
                {category.category}
              </h2>
            </div>
            
            <div className="space-y-4">
              {category.questions.map((faq, index) => {
                const itemId = `${category.category}-${index}`
                const isOpen = openItems.has(itemId)
                
                return (
                  <div 
                    key={itemId}
                    className="backdrop-blur-xl bg-white/[0.06] border border-white/[0.1] rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/[0.1] hover:border-white/[0.2]"
                  >
                    <button
                      onClick={() => toggleItem(itemId)}
                      className="w-full px-6 py-6 text-left flex items-center justify-between group transition-all duration-200"
                    >
                      <h3 className="text-lg font-light text-white pr-4 group-hover:text-blue-300 transition-colors">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0">
                        {isOpen ? (
                          <ChevronUpIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                        ) : (
                          <ChevronDownIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                        )}
                      </div>
                    </button>
                    
                    {isOpen && (
                      <div className="px-6 pb-6">
                        <div className="pt-2 border-t border-white/[0.1]">
                          <p className="text-slate-300 leading-relaxed">
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

      {/* Community CTA */}
      <div className="relative max-w-4xl mx-auto px-6 pb-24">
        <div className="text-center">
          <div className="backdrop-blur-xl bg-white/[0.08] border border-white/[0.12] rounded-2xl p-12">
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
                {renderIcon('users', 'w-8 h-8 text-white')}
              </div>
            </div>
            
            <h2 className="text-4xl font-light text-white mb-6 tracking-wide">
              Didn't Find Your Answer?
            </h2>
            
            <p className="text-xl text-slate-300 mb-8 leading-relaxed font-light">
              Our community is incredibly responsive and helpful. Ask your question and usually get answers within minutes!
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://discord.gg/rockitcode"
                className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 text-lg font-medium text-white shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105"
              >
                {renderIcon('discord', 'w-6 h-6 mr-3')}
                Ask on Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
