'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const codeExamples = [
  {
    id: 'html',
    label: 'HTML',
    code: `<!DOCTYPE html>
<html>
<head>
  <title>My First Page</title>
</head>
<body>
  <h1>Hello World!</h1>
  <p>Welcome to coding!</p>
  <button>Click me</button>
</body>
</html>`,
    preview: (
      <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 space-y-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Hello World!</h1>
        <p className="text-slate-600 dark:text-slate-300">Welcome to coding!</p>
        <button className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded hover:bg-slate-700 dark:hover:bg-slate-100 transition-colors">
          Click me
        </button>
      </div>
    )
  },
  {
    id: 'css',
    label: 'CSS',
    code: `.card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  color: #334155;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.card:hover {
  transform: translateY(-5px);
  transition: all 0.3s ease;
}`,
    preview: (
      <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6 border border-slate-200 dark:border-slate-600 shadow-sm">
        <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Beautiful Card</h3>
        <p className="text-slate-600 dark:text-slate-300">Styled with clean CSS</p>
        <div className="mt-4 w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-full">
          <motion.div 
            className="h-2 bg-slate-400 dark:bg-slate-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '75%' }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          />
        </div>
      </div>
    )
  },
  {
    id: 'js',
    label: 'JavaScript',
    code: `function createInteractiveCard() {
  const card = document.querySelector('.card');
  let clicks = 0;
  
  card.addEventListener('click', () => {
    clicks++;
    card.textContent = \`Clicked \${clicks} times!\`;
    
    // Add sparkle effect
    card.style.transform = 'scale(1.1)';
    setTimeout(() => {
      card.style.transform = 'scale(1)';
    }, 150);
  });
}

createInteractiveCard();`,
    preview: (
      <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-4 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg cursor-pointer text-center font-semibold border border-slate-300 dark:border-slate-600"
        >
          Interactive Button
        </motion.div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 text-center">
          Click to see JavaScript in action
        </p>
      </div>
    )
  }
]

export function AnimatedCodeDemo() {
  const [activeTab, setActiveTab] = useState(0)
  const [codeVisible, setCodeVisible] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % codeExamples.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setCodeVisible(false)
    setIsTyping(true)
    const timer = setTimeout(() => {
      setCodeVisible(true)
      setIsTyping(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [activeTab])

  const currentExample = codeExamples[activeTab]

  return (
    <section className="relative py-24 bg-slate-50 dark:bg-slate-900">
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
            See Code Come to Life
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Experience our mobile-first coding environment. Write code, see results instantly.
          </p>
        </motion.div>

        {/* Demo Container */}
        <div className="mx-auto mt-16 max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Code Editor Mockup */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Mobile Frame */}
              <div className="mx-auto max-w-sm">
                <div className="relative bg-slate-900 rounded-[2rem] p-2 shadow-2xl">
                  {/* Phone Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-10"></div>
                  
                  {/* Screen */}
                  <div className="bg-slate-800 rounded-[1.5rem] overflow-hidden">
                    {/* Status Bar */}
                    <div className="flex items-center justify-between px-6 py-2 text-white text-xs">
                      <span>9:41</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-2 bg-white rounded-sm"></div>
                        <div className="w-6 h-3 border border-white rounded-sm">
                          <div className="w-4 h-1 bg-white rounded-sm mt-0.5 ml-0.5"></div>
                        </div>
                      </div>
                    </div>

                    {/* Editor Header */}
                    <div className="bg-slate-700 px-4 py-3 flex items-center justify-between border-b border-slate-600">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="text-slate-300 text-sm font-mono">
                        {currentExample.label}.{currentExample.id === 'html' ? 'html' : currentExample.id === 'css' ? 'css' : 'js'}
                      </div>
                    </div>

                    {/* Language Tabs */}
                    <div className="flex bg-slate-800 border-b border-slate-600">
                      {codeExamples.map((example, index) => (
                        <motion.button
                          key={example.id}
                          onClick={() => setActiveTab(index)}
                          className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                            activeTab === index
                              ? 'bg-slate-700 text-white border-b-2 border-blue-500'
                              : 'text-slate-400 hover:text-slate-300'
                          }`}
                          whileHover={{ backgroundColor: 'rgba(71, 85, 105, 0.5)' }}
                        >
                          {example.label}
                        </motion.button>
                      ))}
                    </div>

                    {/* Code Content */}
                    <div className="h-80 overflow-hidden bg-slate-900">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeTab}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="p-4 h-full"
                        >
                          <pre className="text-sm text-slate-300 font-mono leading-relaxed">
                            <code>{currentExample.code}</code>
                          </pre>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Mobile Optimization Bar */}
                    <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2 border-t border-slate-600">
                      <div className="flex items-center text-slate-700 dark:text-slate-300 text-xs">
                        <motion.span 
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="mr-2"
                        >
                          🎤
                        </motion.span>
                        Voice coding: Say "button" to insert &lt;button&gt;&lt;/button&gt;
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium"
              >
                Live Preview ✨
              </motion.div>
            </motion.div>

            {/* Live Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Instant Results
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  See your code come to life immediately. No complex setup, no waiting.
                </p>
              </div>

              {/* Preview Container */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl"></div>
                <div className="relative">
                  {currentExample.preview}
                </div>
              </motion.div>

              {/* Features List */}
              <div className="mt-8 space-y-3">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center text-sm text-slate-600 dark:text-slate-400"
                >
                  <span className="mr-3 text-green-500">✓</span>
                  Real VSCode editor optimized for mobile
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center text-sm text-slate-600 dark:text-slate-400"
                >
                  <span className="mr-3 text-green-500">✓</span>
                  Voice coding and smart autocomplete
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center text-sm text-slate-600 dark:text-slate-400"
                >
                  <span className="mr-3 text-green-500">✓</span>
                  Touch gestures for mobile coding
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center text-sm text-slate-600 dark:text-slate-400"
                >
                  <span className="mr-3 text-green-500">✓</span>
                  Instant preview and error detection
                </motion.div>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="mt-8"
              >
                <motion.a
                  href="/enhanced-monaco"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  Try Mobile Editor Now
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="ml-2"
                  >
                    →
                  </motion.span>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
