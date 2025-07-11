'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marketing → Frontend Developer",
    content: "I learned HTML & CSS during lunch breaks. The mobile editor is incredible - built my first website in 2 weeks!",
    stats: { timeframe: "2 weeks", achievement: "First website" }
  },
  {
    name: "Marcus Rodriguez", 
    role: "Student → Freelancer",
    content: "Voice coding while walking between classes. Already earning $500/month from freelance projects!",
    stats: { timeframe: "3 months", achievement: "$500/month" }
  },
  {
    name: "Lisa Thompson",
    role: "Teacher → App Developer", 
    content: "5-minute sessions while kids nap. Perfect for learning JavaScript as a busy mom!",
    stats: { timeframe: "4 months", achievement: "Mobile app" }
  }
]

export function AnimatedTestimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const current = testimonials[activeTestimonial]

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            Real Success Stories
          </h2>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
            Mobile-first learning that transforms careers
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 mr-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {current.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">{current.role}</p>
                </div>
              </div>

              <blockquote className="text-lg text-slate-700 dark:text-slate-300 italic mb-6">
                {current.content}
              </blockquote>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-700 dark:text-slate-300">{current.stats.timeframe}</div>
                  <div className="text-xs text-slate-500">Timeline</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-700 dark:text-slate-300">{current.stats.achievement}</div>
                  <div className="text-xs text-slate-500">Achievement</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 text-center">
              Success Journey
            </h4>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                <span>Start</span>
                <span>{current.stats.timeframe}</span>
                <span>Success</span>
              </div>
              
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, delay: 0.5 }}
                  className="h-full bg-slate-400 dark:bg-slate-500 rounded-full"
                />
              </div>

              <div className="text-center mt-6">
                <div className="inline-flex items-center px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-semibold border border-slate-300 dark:border-slate-600">
                  {current.stats.achievement}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 flex justify-center space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeTestimonial ? 'bg-blue-500 w-8' : 'bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}