'use client'

import React from 'react'

interface HandsOnPracticeProps {
  terminalHistory: Array<{command: string, output: string}>
  currentCommand: string
  setCurrentCommand: React.Dispatch<React.SetStateAction<string>>
  completedExercises: Set<string>
  handleTerminalCommand: (e: React.KeyboardEvent<HTMLInputElement>) => void
  animateSection: string | null
  isSectionCompleted: (sectionId: string) => boolean
  markSectionCompleted: (sectionId: string) => void
}

export default function HandsOnPractice({
  terminalHistory,
  currentCommand,
  setCurrentCommand,
  completedExercises,
  handleTerminalCommand,
  animateSection,
  isSectionCompleted,
  markSectionCompleted
}: HandsOnPracticeProps) {
  return (
    <div 
      data-section="section4"
      className={`bg-gray-800 border border-gray-700 rounded-xl p-8 transition-all duration-500 ${
      animateSection === 'section4' ? 'ring-2 ring-orange-500 transform scale-105' : ''
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center text-2xl font-bold">
          <span className="flex items-center justify-center w-8 h-8 mr-4 text-sm font-bold bg-orange-600 rounded-full">4</span>
          Interactive Git Terminal
        </h2>
        {isSectionCompleted('section4') && (
          <div className="flex items-center text-orange-400 animate-pulse">
            <span className="mr-2">✅</span>
            <span className="text-sm">Completed</span>
          </div>
        )}
      </div>

      <p className="mb-6 text-gray-300">
        Time to code! Practice Git commands in this interactive terminal. Complete all exercises to master the basics.
      </p>

      {/* Interactive Terminal */}
      <div className="mb-6 overflow-hidden bg-black border border-gray-600 rounded-lg">
        <div className="flex items-center px-4 py-2 space-x-2 bg-gray-700">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-sm text-gray-300">Git Practice Terminal</span>
        </div>
        
        <div className="p-4 overflow-y-auto h-80">
          {/* Terminal Output */}
          <div className="space-y-2 font-mono text-sm">
            <div className="text-green-400">Welcome to Git Practice Terminal!</div>
            <div className="text-gray-400">Type the commands below to practice. Current directory: ~/practice-repo</div>
            <div className="text-gray-400">─────────────────────────────────────────────────────────</div>
            
            {terminalHistory.map((entry, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-blue-400">
                  <span className="text-green-400">user@computer</span>
                  <span className="text-white">:</span>
                  <span className="text-blue-400">~/practice-repo</span>
                  <span className="text-white">$ {entry.command}</span>
                </div>
                <div className="pl-4 text-gray-300 whitespace-pre-line">
                  {entry.output}
                </div>
              </div>
            ))}
            
            {/* Current Input Line */}
            <div className="flex items-center">
              <span className="text-green-400">user@computer</span>
              <span className="text-white">:</span>
              <span className="text-blue-400">~/practice-repo</span>
              <span className="text-white">$ </span>
              <input
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyDown={handleTerminalCommand}
                className="flex-1 text-white bg-transparent outline-none"
                placeholder="Type git command here..."
                autoFocus
              />
            </div>
          </div>
        </div>
      </div>

      {/* Command Exercises */}
      <div className="space-y-6">
        <div className="p-6 border border-orange-700 rounded-lg bg-orange-900/20">
          <h3 className="mb-4 text-lg font-semibold text-orange-300">🎯 Practice Exercises</h3>
          
          <div className="space-y-4">
            {[
              { 
                id: 'ex1', 
                task: 'Initialize a new Git repository', 
                hint: 'Use git init',
                expectedCommand: 'git init',
                difficulty: 'Beginner'
              },
              { 
                id: 'ex2', 
                task: 'Check the status of your repository', 
                hint: 'Use git status',
                expectedCommand: 'git status',
                difficulty: 'Beginner'
              },
              { 
                id: 'ex3', 
                task: 'Add all files to staging area', 
                hint: 'Use git add with a special character',
                expectedCommand: 'git add .',
                difficulty: 'Beginner'
              },
              { 
                id: 'ex4', 
                task: 'Create your first commit', 
                hint: 'Use git commit with -m flag and a message',
                expectedCommand: 'git commit -m',
                difficulty: 'Intermediate'
              },
              { 
                id: 'ex5', 
                task: 'View your commit history', 
                hint: 'Use git log',
                expectedCommand: 'git log',
                difficulty: 'Intermediate'
              }
            ].map((exercise, idx) => (
              <div key={exercise.id} className="p-4 border border-gray-600 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">Exercise {idx + 1}: {exercise.task}</h4>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded ${
                      exercise.difficulty === 'Beginner' 
                        ? 'bg-green-800 text-green-200' 
                        : 'bg-yellow-800 text-yellow-200'
                    }`}>
                      {exercise.difficulty}
                    </span>
                    {completedExercises.has(exercise.id) && (
                      <span className="text-green-400">✅</span>
                    )}
                  </div>
                </div>
                
                <p className="mb-2 text-sm text-gray-400">💡 Hint: {exercise.hint}</p>
                
                <div className="p-2 font-mono text-sm bg-gray-900 rounded">
                  <span className="text-blue-400">Expected: </span>
                  <span className="text-gray-300">{exercise.expectedCommand}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Tracking */}
        <div className="p-4 bg-gray-900 border border-gray-600 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-white">Coding Practice Progress</span>
            <span className="text-orange-400">
              {completedExercises.size}/5 exercises completed
            </span>
          </div>
          
          <div className="w-full h-3 overflow-hidden bg-gray-700 rounded-full">
            <div 
              className="h-full transition-all duration-500 ease-out bg-gradient-to-r from-orange-500 to-red-500"
              style={{ width: `${(completedExercises.size / 5) * 100}%` }}
            />
          </div>
          
          <div className="mt-3 text-sm text-gray-400">
            {completedExercises.size === 0 && "Start typing Git commands in the terminal above!"}
            {completedExercises.size > 0 && completedExercises.size < 5 && "Great progress! Keep practicing."}
            {completedExercises.size === 5 && "🎉 All exercises completed! You're ready for real Git usage."}
          </div>
        </div>
      </div>

      {/* Complete section button */}
      {completedExercises.size === 5 && !isSectionCompleted('section4') && (
        <button
          onClick={() => markSectionCompleted('section4')}
          className="w-full px-4 py-3 mt-6 font-semibold text-white transition-all transform bg-orange-600 rounded-lg hover:bg-orange-700 hover:scale-105 animate-bounce"
        >
          🚀 Git Practice Complete! Ready for Real Projects
        </button>
      )}
    </div>
  )
}
