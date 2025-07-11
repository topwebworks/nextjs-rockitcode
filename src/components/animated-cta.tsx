'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const features = [
  { label: "12,847+ learners", detail: "Active community" },
  { label: "Mobile-first", detail: "Designed for phones" },
  { label: "Free to try", detail: "No credit card needed" },
  { label: "5-min lessons", detail: "Bite-sized learning" }
]

export function AnimatedCTA() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  return (
    <section className="relative overflow-hidden bg-slate-900 dark:bg-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Ready to Start Your Coding Journey?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300 dark:text-slate-600"
          >
            Join thousands learning to code on their phones. No setup required, no downloads, 
            just open your browser and start coding in the next 30 seconds.
          </motion.p>

          {/* Feature Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-sm font-semibold text-white dark:text-slate-900">{feature.label}</div>
                <div className="text-xs text-slate-300 dark:text-slate-600">{feature.detail}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            {/* Primary CTA */}
            <motion.a
              href="/lessons-demo"
              onMouseEnter={() => setHoveredButton('demo')}
              onMouseLeave={() => setHoveredButton(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-blue-600 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 min-w-[250px] overflow-hidden"
            >
              {/* Button Background Animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50"
                initial={{ x: '-100%' }}
                animate={{ x: hoveredButton === 'demo' ? '0%' : '-100%' }}
                transition={{ duration: 0.3 }}
              />
              
              <span className="relative flex items-center">
                <motion.span
                  animate={{ rotate: hoveredButton === 'demo' ? [0, 10, -10, 0] : 0 }}
                  transition={{ duration: 0.5 }}
                  className="mr-2"
                >
                  🚀
                </motion.span>
                Start Interactive Demo
                <motion.span
                  animate={{ x: hoveredButton === 'demo' ? [0, 5, 0] : 0 }}
                  transition={{ duration: 1, repeat: hoveredButton === 'demo' ? Infinity : 0 }}
                  className="ml-2"
                >
                  →
                </motion.span>
              </span>
            </motion.a>
            
            {/* Secondary CTA */}
            <motion.a
              href="/enhanced-monaco"
              onMouseEnter={() => setHoveredButton('editor')}
              onMouseLeave={() => setHoveredButton(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center justify-center rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 min-w-[250px] transition-all duration-300"
            >
              <span className="flex items-center">
                <motion.span
                  animate={{ 
                    scale: hoveredButton === 'editor' ? [1, 1.2, 1] : 1,
                    rotate: hoveredButton === 'editor' ? [0, 10, -10, 0] : 0
                  }}
                  transition={{ duration: 0.5 }}
                  className="mr-2"
                >
                  ⚡
                </motion.span>
                Try Mobile Editor
              </span>
            </motion.a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-blue-200">
              No account required • Works on any device • Takes 30 seconds
            </p>
            
            {/* Success Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8, type: "spring", bounce: 0.6 }}
              className="mt-4 inline-flex items-center text-sm text-blue-100"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mr-2"
              >
                ✨
              </motion.span>
              Join the 94% who successfully learn to code
            </motion.div>
          </motion.div>

          {/* Interactive Elements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-12 flex justify-center"
          >
            <div className="relative">
              {/* Simulated Phone Screen */}
              <motion.div
                whileHover={{ rotateY: 10, scale: 1.05 }}
                className="bg-slate-900 rounded-2xl p-2 shadow-2xl"
                style={{ perspective: 1000 }}
              >
                <div className="bg-slate-800 rounded-xl w-48 h-32 flex items-center justify-center relative overflow-hidden">
                  {/* Code Animation */}
                  <motion.div
                    animate={{ 
                      opacity: [0.5, 1, 0.5],
                      scale: [0.9, 1, 0.9]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-green-400 font-mono text-xs text-center"
                  >
                    <div>{"<h1>Hello!</h1>"}</div>
                    <div className="text-blue-400">{"console.log('coding')"}</div>
                  </motion.div>
                  
                  {/* Floating Code Particles */}
                  <motion.div
                    animate={{ 
                      y: [-10, -30, -10],
                      opacity: [0, 1, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                    className="absolute top-2 left-4 text-yellow-400 text-xs"
                  >
                    {"{}"}
                  </motion.div>
                  <motion.div
                    animate={{ 
                      y: [-10, -30, -10],
                      opacity: [0, 1, 0],
                      rotate: [0, -180, -360]
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-2 right-4 text-purple-400 text-xs"
                  >
                    {"</>"}
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Success Indicator */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2, type: "spring", bounce: 0.6 }}
                className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              >
                ✓
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
