'use client'

import React from 'react'
import { motion } from 'framer-motion'
import VSCodeMonacoEditor from '@/components/vscode-monaco-editor'

const pythonExamples = {
  basic: `# Basic Python Example
print("Hello, Python!")
name = "Alice"
age = 25
print(f"My name is {name} and I am {age} years old")

# Math operations
x = 10
y = 5
result = x + y
print(f"{x} + {y} = {result}")`,

  functions: `# Functions and Control Flow
def greet(name):
    return f"Hello, {name}!"

def calculate_factorial(n):
    if n <= 1:
        return 1
    else:
        return n * calculate_factorial(n - 1)

# Test the functions
print(greet("Python"))
print(f"5! = {calculate_factorial(5)}")

# Loop example
for i in range(3):
    print(f"Count: {i}")`,

  classes: `# Object-Oriented Programming
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade
    
    def study(self, subject):
        print(f"{self.name} is studying {subject}")
    
    def get_grade(self):
        return self.grade

# Create and use objects
student1 = Student("Alice", "A")
student2 = Student("Bob", "B+")

student1.study("Python")
print(f"{student1.name}'s grade: {student1.get_grade()}")`,

  interactive: `# Interactive Input Example
name = input("What's your name? ")
print(f"Nice to meet you, {name}!")

age = input("How old are you? ")
print(f"You are {age} years old")

# Simple calculator
num1 = input("Enter first number: ")
num2 = input("Enter second number: ")
result = float(num1) + float(num2)
print(f"The sum is: {result}")`,

  dataStructures: `# Data Structures
# Lists
fruits = ["apple", "banana", "orange"]
print(f"Fruits: {fruits}")

for fruit in fruits:
    print(f"I like {fruit}")

# Dictionary
person = {
    "name": "Alice",
    "age": 30,
    "city": "New York"
}

print(f"Person info: {person}")
print(f"Name: {person['name']}")

# List comprehension
squares = [x**2 for x in range(5)]
print(f"Squares: {squares}")`
}

export default function PythonDemoPage() {
  const [currentExample, setCurrentExample] = React.useState<keyof typeof pythonExamples>('basic')
  const [code, setCode] = React.useState(pythonExamples.basic)

  const handleExampleChange = (example: keyof typeof pythonExamples) => {
    setCurrentExample(example)
    setCode(pythonExamples[example])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            🐍 Python Terminal Simulator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Experience realistic Python code execution with terminal-like output, variable tracking, 
            and educational feedback. Perfect for learning Python interactively!
          </p>
          
          {/* Example Selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {Object.entries(pythonExamples).map(([key, _]) => (
              <button
                key={key}
                onClick={() => handleExampleChange(key as keyof typeof pythonExamples)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentExample === key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-2xl mb-3">💻</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Terminal-Like Output</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Realistic Python REPL experience with {'>'}{'>'}{'>'}  prompts and line-by-line execution
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-2xl mb-3">📊</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Variable Tracking</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Track variables, functions, and classes as they're defined and used
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-2xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Interactive Input</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Simulates input() functions with realistic prompts and user interaction
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-2xl mb-3">🎓</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Educational Feedback</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Clear execution summary with suggestions for real Python environments
            </p>
          </div>
        </motion.div>

        {/* Monaco Editor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="h-[700px]">
            <VSCodeMonacoEditor
              value={code}
              onChange={setCode}
              language="python"
              theme="vs-dark"
              showOutput={true}
              showSidebar={true}
              showActivityBar={true}
              showStatusBar={true}
              showMinimap={true}
              enableErrorSquiggles={true}
            />
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🚀 How to Use</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Start:</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Click the example buttons above to load different Python code</li>
                <li>• Press <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">F5</kbd> or click "Run Code" to execute</li>
                <li>• Watch the terminal-like output panel show realistic execution</li>
                <li>• Try modifying the code and running it again</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Features to Try:</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• <strong>Print statements:</strong> See immediate output</li>
                <li>• <strong>Variables:</strong> Track assignments and values</li>
                <li>• <strong>Functions:</strong> Define and call custom functions</li>
                <li>• <strong>Input simulation:</strong> Experience interactive prompts</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>💡 Educational Note:</strong> This is a learning simulator. For real Python development, 
              consider using local Python, Jupyter notebooks, or online platforms like Repl.it or Colab.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
