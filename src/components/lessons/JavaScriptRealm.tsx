'use client'

import { useState, useEffect } from 'react'
import { DragDropCodeBuilder, CodeCompletionGame } from '../microlearning/CoreBlocks'
import { StepByStepBuilder } from '../microlearning/InteractiveBlocks'
import { CodeNarrator, ProgressQuest } from '../microlearning/GamifiedBlocks'
import { CodeLaboratory, AchievementHunter } from '../microlearning/AssessmentBlocks'
import { TeamCodeNexus, FutureCoder, RetroArcade, MasterBuilder } from '../microlearning/AdvancedBlocks'

// 🎮 LESSON 3: JavaScript Realm - Bring Your Code to Life!
export default function JavaScriptRealm() {
  const [wizardStats, setWizardStats] = useState({
    xp: 0,
    level: 1,
    spells: [] as string[],
    creations: 0,
    achievements: [] as string[],
    powerLevel: 0
  })

  const [unlockedFeatures, setUnlockedFeatures] = useState({
    basicSpells: true,
    advancedMagic: false,
    teamCoding: false,
    timeTravel: false,
    masterBuilder: false
  })

  const addXP = (points: number) => {
    setWizardStats(prev => {
      const newXP = prev.xp + points
      const newLevel = Math.floor(newXP / 2000) + 1
      const newPowerLevel = prev.powerLevel + Math.floor(points / 50)
      
      // Unlock features based on level
      if (newLevel >= 2) setUnlockedFeatures(prev => ({ ...prev, advancedMagic: true }))
      if (newLevel >= 3) setUnlockedFeatures(prev => ({ ...prev, teamCoding: true }))
      if (newLevel >= 4) setUnlockedFeatures(prev => ({ ...prev, timeTravel: true }))
      if (newLevel >= 5) setUnlockedFeatures(prev => ({ ...prev, masterBuilder: true }))
      
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        powerLevel: newPowerLevel
      }
    })
  }

  const addSpell = (spell: string) => {
    setWizardStats(prev => ({
      ...prev,
      spells: [...prev.spells, spell]
    }))
  }

  const addAchievement = (achievement: string) => {
    setWizardStats(prev => ({
      ...prev,
      achievements: [...prev.achievements, achievement]
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-blue-900 text-white">
      {/* Mystical Header */}
      <div className="bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-700 p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-stars opacity-30"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-6xl font-bold mb-4 animate-pulse">⚡ JavaScript Realm ⚡</h1>
          <p className="text-xl mb-6">Where code comes alive and magic becomes reality!</p>
          
          {/* Wizard Dashboard */}
          <div className="grid md:grid-cols-5 gap-4 bg-black bg-opacity-30 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{wizardStats.level}</div>
              <div className="text-sm">Wizard Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{wizardStats.powerLevel}</div>
              <div className="text-sm">Power Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{wizardStats.spells.length}</div>
              <div className="text-sm">Spells Known</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{wizardStats.creations}</div>
              <div className="text-sm">Creations Built</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{wizardStats.achievements.length}</div>
              <div className="text-sm">Achievements</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">

        {/* 🧙‍♂️ Welcome to the Realm */}
        <CodeNarrator
          story={{
            title: "The Legend of the JavaScript Wizard",
            character: "Archmage Scripticus",
            narrative: "Welcome, apprentice, to the most powerful realm in all of coding! Here, your HTML structures and CSS beauty will learn to think, respond, and interact. JavaScript is the breath of life that transforms static pages into dynamic experiences. Are you ready to wield this incredible power?",
            challenge: "Your destiny awaits - master the ancient art of bringing code to life!"
          }}
          onStoryComplete={(reward: number) => {
            addXP(reward)
            addAchievement("🧙‍♂️ Realm Initiate")
          }}
        />

        {/* 🎯 First Spell - Variables & Values */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6 rounded-xl border border-blue-400">
          <h2 className="text-3xl font-bold mb-4 text-center">⚡ Your First Magic Spell: Variables</h2>
          <p className="text-lg mb-6 text-center text-blue-200">
            In JavaScript, variables are like magical containers that hold values. Let's create your first spell!
          </p>
          
          <CodeCompletionGame
            template={`// 🧙‍♂️ Cast your first variable spell!
let {wizardName} = "{yourName}";
let {magicPower} = {powerLevel};
let {favoriteSpell} = "{spellName}";

// Display your wizard stats
console.log("Wizard " + {wizardName} + " has power level " + {magicPower});
console.log("Favorite spell: " + {favoriteSpell});`}
            blanks={{
              wizardName: "wizardName",
              yourName: "Wizard Supreme",
              magicPower: "magicPower", 
              powerLevel: "100",
              favoriteSpell: "favoriteSpell",
              spellName: "Lightning Bolt"
            }}
            hints={{
              wizardName: "A variable to store your wizard's name",
              yourName: "What would you like your wizard to be called?",
              magicPower: "A variable for your magical power level",
              powerLevel: "A number representing your power (try 100!)",
              favoriteSpell: "A variable for your favorite spell",
              spellName: "What's your signature spell? (Lightning Bolt, Fireball, etc.)"
            }}
            onComplete={(score: number) => {
              addXP(score)
              addSpell("Variable Conjuring")
              addAchievement("⚡ First Spell Caster")
            }}
          />
        </div>

        {/* 🔮 Interactive Spell Laboratory */}
        <CodeLaboratory
          title="🔮 The JavaScript Spell Laboratory"
          experiments={[
            {
              id: 'button-magic',
              name: 'Button Click Magic',
              description: 'Make a button respond to clicks with JavaScript!',
              code: 'document.getElementById("magicBtn").onclick = function() {\n  alert("Magic happened!");\n};',
              explanation: 'This spell listens for button clicks and casts an alert spell!'
            },
            {
              id: 'color-changer',
              name: 'Color Transformation Spell',
              description: 'Change element colors with the power of JavaScript!',
              code: 'document.body.style.backgroundColor = "purple";\ndocument.querySelector("h1").style.color = "gold";',
              explanation: 'This spell transforms the appearance of elements on command!'
            },
            {
              id: 'text-magic',
              name: 'Text Morphing Incantation',
              description: 'Change text content dynamically!',
              code: 'document.getElementById("title").innerHTML = "I am now a JavaScript Wizard!";',
              explanation: 'This spell rewrites the content of any element you target!'
            }
          ]}
          onExperiment={(experiment: any, score: number) => {
            addXP(score)
            addSpell(experiment.name)
            addAchievement("🔮 Laboratory Researcher")
          }}
        />

        {/* 🏗️ Step-by-Step Function Building */}
        <StepByStepBuilder
          title="🏗️ Build Your First Magical Function"
          steps={[
            {
              instruction: "🎯 Declare your function - give it a magical name!",
              code: "function castFireball() {",
              explanation: "Functions are reusable spells! You can call them whenever you need their magic."
            },
            {
              instruction: "🔥 Add the spell's effect inside curly braces",
              code: "  let damage = 50;",
              explanation: "Variables inside functions are like ingredients in a potion - they work together!"
            },
            {
              instruction: "📢 Make your spell announce its power",
              code: "  console.log('🔥 Fireball deals ' + damage + ' damage!');",
              explanation: "console.log() is how we see the results of our magic in the developer tools!"
            },
            {
              instruction: "🎁 Return something magical from your function",
              code: "  return damage;",
              explanation: "Return statements let your function give back a result - like a spell's outcome!"
            },
            {
              instruction: "🚪 Close your function properly",
              code: "}",
              explanation: "Always close your curly braces - it completes the magical incantation!"
            },
            {
              instruction: "⚡ Cast your spell by calling the function!",
              code: "let totalDamage = castFireball();",
              explanation: "Now you can use your function anywhere by calling its name!"
            }
          ]}
          onComplete={(score: number) => {
            addXP(score)
            addSpell("Function Mastery")
            addAchievement("🏗️ Function Architect")
          }}
        />

        {/* 🎮 Retro Arcade - Classic JavaScript Games */}
        {unlockedFeatures.basicSpells && (
          <RetroArcade
            games={[
              {
                name: "Number Guessing Quest",
                icon: "🎲",
                description: "Guess the magic number between 1 and 100!",
                challenge: "Create a number guessing game using JavaScript logic",
                codePatterns: ["Math.random", "if", "else", "prompt", "alert"],
                highScores: [
                  { player: "Wizard Alex", points: 850 },
                  { player: "Sorceress Maya", points: 720 },
                  { player: "Mage Jordan", points: 680 }
                ]
              },
              {
                name: "Magic Calculator",
                icon: "🧮",
                description: "Build a calculator that does magical math!",
                challenge: "Create functions for add, subtract, multiply, divide",
                codePatterns: ["function", "return", "+", "-", "*", "/"],
                highScores: [
                  { player: "Calculator King", points: 950 },
                  { player: "Math Wizard", points: 890 },
                  { player: "Number Ninja", points: 820 }
                ]
              },
              {
                name: "Color Magic Memory",
                icon: "🌈",
                description: "Remember and repeat the color sequence!",
                challenge: "Use arrays and loops to create a memory game",
                codePatterns: ["array", "push", "for", "length", "random"],
                highScores: [
                  { player: "Memory Master", points: 1200 },
                  { player: "Color Sage", points: 1050 },
                  { player: "Rainbow Wizard", points: 980 }
                ]
              }
            ]}
            onHighScore={(score: number) => {
              addXP(score)
              addAchievement("🎮 Arcade Champion")
              setWizardStats(prev => ({ ...prev, creations: prev.creations + 1 }))
            }}
          />
        )}

        {/* 🌐 Team Coding Adventure */}
        {unlockedFeatures.teamCoding && (
          <TeamCodeNexus
            teammates={[
              {
                id: 'alex',
                name: 'Alex the Algorithm Wizard',
                role: 'Logic Master',
                expertise: ['algorithms', 'problem-solving', 'optimization']
              },
              {
                id: 'maya',
                name: 'Maya the UI Sorceress', 
                role: 'Frontend Specialist',
                expertise: ['frontend', 'user-experience', 'design']
              },
              {
                id: 'jordan',
                name: 'Jordan the Data Sage',
                role: 'Backend Master',
                expertise: ['backend', 'databases', 'apis']
              }
            ]}
            project={{
              name: "Interactive Magic Portfolio",
              description: "Build a portfolio website with JavaScript interactivity"
            }}
            onTeamSuccess={(score: number) => {
              addXP(score)
              addAchievement("🌐 Team Player")
              setWizardStats(prev => ({ ...prev, creations: prev.creations + 1 }))
            }}
          />
        )}

        {/* 🔮 Future Coder Time Machine */}
        {unlockedFeatures.timeTravel && (
          <FutureCoder
            timePeriods={[
              {
                name: "Classic JavaScript Era (1995-2005)",
                year: "1995-2005",
                description: "The birth of dynamic web pages",
                technologies: ["Vanilla JS", "DOM manipulation", "Basic events", "Simple animations"],
                requirements: ["var", "function", "document.getElementById", "onclick"]
              },
              {
                name: "AJAX Revolution (2005-2010)", 
                year: "2005-2010",
                description: "Dynamic content without page reloads",
                technologies: ["XMLHttpRequest", "jQuery", "JSON", "Asynchronous programming"],
                requirements: ["XMLHttpRequest", "JSON.parse", "callback", "ajax"]
              },
              {
                name: "Modern JavaScript (2015-Now)",
                year: "2015-Present", 
                description: "ES6+ features and modern frameworks",
                technologies: ["ES6+", "React", "Vue", "Node.js", "TypeScript"],
                requirements: ["const", "arrow functions", "async/await", "modules"]
              },
              {
                name: "Future JavaScript (2025+)",
                year: "2025+",
                description: "AI-assisted coding and quantum computing",
                technologies: ["AI Integration", "WebAssembly", "Quantum JS", "Neural Networks"],
                requirements: ["ai", "quantum", "neural", "wasm"]
              }
            ]}
            onTimeTravel={(era: any, score: number) => {
              addXP(score)
              addAchievement(`🔮 ${era.name} Explorer`)
            }}
          />
        )}

        {/* 🌟 Master Builder - Ultimate JavaScript Creation */}
        {unlockedFeatures.masterBuilder && (
          <MasterBuilder
            blueprints={[
              {
                name: "Interactive Game Portal",
                description: "Build a complete gaming website with multiple JavaScript games",
                difficulty: "Master Level",
                components: [
                  { id: 'game-engine', name: 'Game Engine', requiredMaterials: [{ materialId: 'logic', quantity: 3 }, { materialId: 'events', quantity: 2 }], points: 500 },
                  { id: 'ui-system', name: 'UI System', requiredMaterials: [{ materialId: 'styling', quantity: 2 }, { materialId: 'animations', quantity: 1 }], points: 400 },
                  { id: 'score-tracker', name: 'Score Tracker', requiredMaterials: [{ materialId: 'data', quantity: 2 }, { materialId: 'storage', quantity: 1 }], points: 300 }
                ]
              }
            ]}
            materials={[
              { id: 'logic', name: 'Logic Components', description: 'if/else statements and functions', icon: '🧠', pattern: 'function' },
              { id: 'events', name: 'Event Handlers', description: 'Click and keyboard interactions', icon: '⚡', pattern: 'addEventListener' },
              { id: 'styling', name: 'Dynamic Styling', description: 'CSS manipulation via JavaScript', icon: '🎨', pattern: 'style' },
              { id: 'animations', name: 'Animation Effects', description: 'Smooth transitions and effects', icon: '✨', pattern: 'animate' },
              { id: 'data', name: 'Data Management', description: 'Variables and arrays', icon: '📊', pattern: 'array' },
              { id: 'storage', name: 'Local Storage', description: 'Saving user progress', icon: '💾', pattern: 'localStorage' }
            ]}
            onMasterpiece={(blueprint: any, score: number) => {
              addXP(score)
              addAchievement("🌟 JavaScript Master Builder")
              setWizardStats(prev => ({ ...prev, creations: prev.creations + 1 }))
            }}
          />
        )}

        {/* 🏆 Achievement Hunter - Track Your Progress */}
        <AchievementHunter
          achievements={[
            { id: 'first-variable', name: 'Variable Wizard', description: 'Created your first variable', icon: '📦', unlocked: wizardStats.spells.includes("Variable Conjuring") },
            { id: 'first-function', name: 'Function Master', description: 'Built your first function', icon: '⚙️', unlocked: wizardStats.spells.includes("Function Mastery") },
            { id: 'lab-researcher', name: 'Mad Scientist', description: 'Completed 3 experiments', icon: '🔬', unlocked: wizardStats.achievements.includes("🔮 Laboratory Researcher") },
            { id: 'team-player', name: 'Team Wizard', description: 'Collaborated with other coders', icon: '👥', unlocked: wizardStats.achievements.includes("🌐 Team Player") },
            { id: 'time-traveler', name: 'Time Lord', description: 'Explored JavaScript through time', icon: '⏰', unlocked: wizardStats.achievements.filter(a => a.includes("Explorer")).length > 0 },
            { id: 'master-builder', name: 'Grand Architect', description: 'Built a complete application', icon: '🏗️', unlocked: wizardStats.achievements.includes("🌟 JavaScript Master Builder") }
          ]}
          socialFeatures={{
            leaderboard: true,
            sharing: true,
            challenges: true
          }}
          onAchievementUnlock={(achievement: any, score: number) => {
            addXP(score)
            addAchievement(achievement.name)
          }}
        />

        {/* 🎊 Grand Finale & Next Steps */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-8 rounded-xl text-center border-4 border-yellow-400">
          <h2 className="text-4xl font-bold mb-4">🎊 Behold! A JavaScript Wizard is Born! 🎊</h2>
          <p className="text-xl mb-6">
            You have mastered the most powerful language in web development! You can now create anything you can imagine.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 bg-black bg-opacity-30 rounded-lg p-6 mb-6">
            <div>
              <h3 className="text-xl font-bold mb-3 text-yellow-400">⚡ Powers Unlocked:</h3>
              <ul className="text-sm space-y-1 text-left">
                <li>🎯 Dynamic content creation</li>
                <li>🎮 Interactive games and apps</li>
                <li>📱 Responsive user interfaces</li>
                <li>🔄 Real-time data handling</li>
                <li>🌐 API integration and communication</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 text-blue-400">🏗️ What You Can Build:</h3>
              <ul className="text-sm space-y-1 text-left">
                <li>🎮 Browser games and simulations</li>
                <li>📊 Data visualization dashboards</li>
                <li>🛒 E-commerce websites</li>
                <li>📱 Progressive web applications</li>
                <li>🤖 Chatbots and AI interfaces</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 text-green-400">🚀 Your Journey Continues:</h3>
              <ul className="text-sm space-y-1 text-left">
                <li>⚡ Advanced frameworks (React, Vue)</li>
                <li>🔧 Backend development (Node.js)</li>
                <li>📱 Mobile app development</li>
                <li>🤖 Machine learning integration</li>
                <li>🌍 Full-stack development mastery</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-yellow-400">🌟 You Are Now Ready To:</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-bold animate-pulse">
                🚀 Build Your First App
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-bold animate-pulse">
                💼 Start Your Developer Career
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-bold animate-pulse">
                🎓 Explore Advanced Topics
              </button>
            </div>
          </div>
        </div>

        {/* Wizard Stats Summary */}
        <div className="bg-gradient-to-r from-indigo-800 to-purple-800 p-6 rounded-xl border border-purple-400">
          <h3 className="text-2xl font-bold text-center mb-4">🧙‍♂️ Your Final Wizard Stats</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-bold mb-2 text-blue-400">📚 Spells Mastered:</h4>
              <div className="space-y-1">
                {wizardStats.spells.map((spell, index) => (
                  <div key={index} className="bg-blue-900 bg-opacity-50 p-2 rounded text-sm">
                    ⚡ {spell}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-2 text-purple-400">🏆 Achievements Earned:</h4>
              <div className="space-y-1">
                {wizardStats.achievements.map((achievement, index) => (
                  <div key={index} className="bg-purple-900 bg-opacity-50 p-2 rounded text-sm">
                    🏆 {achievement}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
