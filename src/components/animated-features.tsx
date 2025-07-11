'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const features = [
  {
    id: 'mobile-first',
    title: 'Mobile-First Design',
    description: 'Coding interface optimized for touch screens, with gesture support and mobile-friendly UI elements.',
    benefits: ['Touch-optimized interface', 'Gesture navigation', 'Responsive design', 'Offline capabilities'],
    image: (
      <div className="relative">
        <div className="bg-slate-900 rounded-2xl p-4 shadow-lg border border-slate-700">
          <div className="bg-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
              </div>
              <div className="text-slate-400 text-xs">mobile-editor</div>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-slate-600 rounded w-3/4"></div>
              <div className="h-2 bg-slate-600 rounded w-1/2"></div>
              <div className="h-2 bg-slate-600 rounded w-2/3"></div>
            </div>
            <motion.div
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-slate-700 rounded p-2 text-center text-slate-300 text-xs border border-slate-600"
            >
              Touch to Code
            </motion.div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'voice-coding',
    title: 'Voice Coding',
    description: 'Code hands-free using voice commands. Perfect for when typing is difficult or inconvenient.',
    benefits: ['Voice-to-code conversion', 'Natural language support', 'Hands-free coding', 'Accessibility features'],
    image: (
      <div className="relative">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              "Create a paragraph"
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-1 bg-slate-300 dark:bg-slate-600 rounded-full"
            ></motion.div>
            <div className="bg-slate-900 dark:bg-slate-100 rounded p-2 text-green-400 dark:text-green-600 font-mono text-xs">
              &lt;p&gt;&lt;/p&gt;
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'smart-hints',
    title: 'Smart Hints',
    description: 'AI-powered code suggestions and error detection that helps you learn as you code.',
    benefits: ['Real-time error detection', 'Code completion', 'Learning suggestions', 'Context-aware help'],
    image: (
      <div className="relative">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="bg-slate-900 dark:bg-slate-100 rounded p-3 font-mono text-sm">
            <div className="text-white dark:text-slate-900">{"function hello() {"}</div>
            <div className="text-slate-400 dark:text-slate-600 ml-4">{'console.log("Hel'}</div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
            className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded p-3"
          >
            <div className="flex items-center text-sm">
              <div className="w-4 h-4 bg-blue-100 dark:bg-blue-900 rounded mr-2 flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <span className="text-blue-700 dark:text-blue-300">Suggestion: "Hello World!"</span>
            </div>
          </motion.div>
        </div>
      </div>
    )
  },
  {
    id: 'micro-learning',
    title: '5-Minute Sessions',
    description: 'Bite-sized lessons perfect for busy schedules. Learn effectively in short, focused sessions.',
    benefits: ['Quick completion', 'Progress tracking', 'Flexible scheduling', 'Retention optimization'],
    image: (
      <div className="relative">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="text-center space-y-4">
            <div className="relative w-24 h-24 mx-auto">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-slate-200 dark:border-slate-600 rounded-full"
              ></motion.div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-slate-400 dark:border-slate-500 border-t-transparent rounded-full"
              ></motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">5:00</span>
              </div>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Perfect lesson length
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
              <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
              <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
]

export function AnimatedFeatures() {
  const [activeFeature, setActiveFeature] = useState(0)

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Revolutionary Learning Features
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Experience coding education reimagined for the mobile generation
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="mx-auto mt-16 max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                onMouseEnter={() => setActiveFeature(index)}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-8 hover:shadow-lg transition-all duration-300 cursor-pointer border border-slate-200 dark:border-slate-700"
              >
                
                <div className="relative">
                  {/* Feature Content */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-slate-600 dark:text-slate-300">
                      {feature.description}
                    </p>

                    {/* Benefits List */}
                    <ul className="mt-6 space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + idx * 0.1 }}
                          className="flex items-center text-sm text-slate-600 dark:text-slate-400"
                        >
                          <span className="mr-3 text-green-500">✓</span>
                          {benefit}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Feature Image/Demo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  className="mt-8 flex justify-center"
                >
                  {feature.image}
                </motion.div>

                {/* Hover Effect */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full text-sm"
                >
                  →
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Ready to experience these features yourself?
          </p>
          <motion.a
            href="/lessons-demo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            Try All Features Now
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-2"
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
