'use client'

import { useState } from 'react'
import { LiveCodeSandbox, SpeedTypingChallenge, DragDropCodeBuilder } from '../microlearning/CoreBlocks'
import { LiveCSSPlayground, StepByStepBuilder, InstantFeedbackTyper } from '../microlearning/InteractiveBlocks'
import { ProgressQuest, CodeNarrator } from '../microlearning/GamifiedBlocks'
import { CodeGarden } from '../microlearning/SpecializedBlocks'

// 🌟 LESSON 1: Welcome to Codeland - Your First Adventure!
export default function WelcomeToCodeland() {
  const [playerStats, setPlayerStats] = useState({
    xp: 0,
    level: 1,
    badges: [] as string[],
    completedChallenges: 0
  })

  const addXP = (points: number) => {
    setPlayerStats(prev => ({
      ...prev,
      xp: prev.xp + points,
      level: Math.floor((prev.xp + points) / 1000) + 1,
      completedChallenges: prev.completedChallenges + 1
    }))
  }

  const addBadge = (badge: string) => {
    setPlayerStats(prev => ({
      ...prev,
      badges: [...prev.badges, badge]
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-blue-50 to-green-100">
      {/* Hero Header */}
      <div className="p-8 text-center text-white bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-4 text-5xl font-bold">🌟 Welcome to Codeland! 🌟</h1>
          <p className="mb-6 text-xl">Your magical journey into the world of code begins here!</p>
          
          {/* Player Stats Dashboard */}
          <div className="grid gap-4 p-4 bg-white md:grid-cols-4 bg-opacity-20 rounded-xl">
            <div className="text-center">
              <div className="text-2xl font-bold">{playerStats.level}</div>
              <div className="text-sm">Code Wizard Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{playerStats.xp}</div>
              <div className="text-sm">Experience Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{playerStats.badges.length}</div>
              <div className="text-sm">Badges Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{playerStats.completedChallenges}</div>
              <div className="text-sm">Challenges Complete</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl p-6 mx-auto space-y-8">
        
        {/* 🎭 Story Introduction */}
        <CodeNarrator
          codeStory={{
            title: "The Legend of the First Line"
          }}
          steps={[
            {
              title: "Welcome to Codeland",
              narration: "Welcome, brave adventurer! In the mystical realm of Codeland, every great journey begins with a single line of code.",
              code: "<!-- Your coding adventure starts here -->"
            },
            {
              title: "The Ancient Art of HTML",
              narration: "You have been chosen to learn the ancient art of HTML - the language that gives life to websites across the digital realm!",
              code: "<h1>Hello, Codeland!</h1>"
            },
            {
              title: "Your First Quest",
              narration: "Your first quest awaits: Create your very first HTML element and watch the magic happen!",
              code: "<h1>My First HTML Element</h1>\n<p>I am ready to begin my journey!</p>"
            }
          ]}
          onComplete={(reward: number) => {
            addXP(reward)
            addBadge("🎭 Story Keeper")
          }}
        />

        {/* 🌱 Your First Code Garden */}
        <CodeGarden
          seeds={[
            {
              id: 'html-seed',
              name: 'HTML Element Seed',
              description: 'Plant your first HTML tag and watch it grow!',
              icon: '🌱',
              minLength: 15,
              requirements: '<h1>',
              points: 200
            },
            {
              id: 'text-seed',
              name: 'Text Content Seed',
              description: 'Add meaningful text to make your element flourish!',
              icon: '📝',
              minLength: 20,
              requirements: 'Hello',
              points: 150
            }
          ]}
          onHarvest={(seed: any, points: number) => {
            addXP(points)
            addBadge("🌱 Digital Gardener")
          }}
        />

        {/* 🔥 Live Code Magic - Your First Spell */}
        <LiveCodeSandbox
          title="Cast Your First HTML Spell!"
          starterCode="<!-- Type your magical HTML here! -->"
          expectedOutput="<h1>"
          language="html"
          showPreview={true}
          onSuccess={(score: number) => {
            addXP(score)
            addBadge("🔥 First Spell Caster")
          }}
        />

        {/* 🎯 Drag & Drop Builder - No Typing Required! */}
        <DragDropCodeBuilder
          title="Build Your Digital Castle - No Typing!"
          elements={[
            '<html>',
            '<head>',
            '<title>My First Page</title>',
            '</head>',
            '<body>',
            '<h1>Welcome to my castle!</h1>',
            '</body>',
            '</html>'
          ]}
          targetStructure={[
            '<html>',
            '<head>',
            '<title>My First Page</title>',
            '</head>',
            '<body>',
            '<h1>Welcome to my castle!</h1>',
            '</body>',
            '</html>'
          ]}
          onComplete={(score: number) => {
            addXP(score)
            addBadge("🏰 Castle Builder")
          }}
        />

        {/* 🏗️ Step-by-Step Guided Adventure */}
        <StepByStepBuilder
          title="The Great HTML Temple Construction"
          steps={[
            {
              instruction: "🏛️ First, let's create the foundation with an opening <html> tag",
              code: "<html>",
              explanation: "This tells the browser: 'Hey! HTML content is coming!'"
            },
            {
              instruction: "🧠 Now add the <head> section - this is like the blueprint room",
              code: "  <head>",
              explanation: "The head contains information ABOUT your page, not visible content"
            },
            {
              instruction: "📛 Give your temple a name with a <title> tag",
              code: "    <title>My Amazing Temple</title>",
              explanation: "This appears in the browser tab - like a nameplate for your creation!"
            },
            {
              instruction: "🚪 Close the head and open the body - where visitors will see content",
              code: "  </head>\n  <body>",
              explanation: "Body is where all the visible magic happens!"
            },
            {
              instruction: "🎯 Add a welcoming headline for your visitors",
              code: "    <h1>Welcome to My Digital Temple!</h1>",
              explanation: "H1 is the biggest, most important heading - like a grand entrance sign!"
            },
            {
              instruction: "🏁 Complete your temple by closing all the tags",
              code: "  </body>\n</html>",
              explanation: "Always close what you open - it's the golden rule of HTML!"
            }
          ]}
          onComplete={(score: number) => {
            addXP(score)
            addBadge("🏛️ Temple Architect")
          }}
        />

        {/* ⚡ Speed Challenge - Build Confidence! */}
        <SpeedTypingChallenge
          targetCode="<h1>I am a coding wizard!</h1>"
          description="⚡ Lightning Round! Type this power affirmation as fast as you can. Feel the code magic flowing through your fingers!"
          onComplete={(score: number) => {
            addXP(score)
            addBadge("⚡ Lightning Fingers")
          }}
        />

        {/* 🎨 CSS Playground - Add Beauty! */}
        <LiveCSSPlayground
          property="color"
          values={['red', 'blue', 'green', 'purple', 'gold']}
          target="purple"
          onSuccess={(score: number) => {
            addXP(score)
            addBadge("🎨 Digital Artist")
          }}
        />

        {/* 🏆 Quest Progress Tracker */}
        <ProgressQuest
          questName="The First Steps of a Code Hero"
          challenges={[
            { 
              id: 'plant-seed', 
              title: 'Plant your first code seed', 
              description: 'Use the Code Garden to plant and grow your first HTML element',
              code: '<h1>My first HTML element</h1>',
              completed: playerStats.badges.includes("🌱 Digital Gardener") 
            },
            { 
              id: 'cast-spell', 
              title: 'Cast your first HTML spell', 
              description: 'Use the Live Code Sandbox to create working HTML',
              code: '<h1>Welcome to my magical world!</h1>',
              completed: playerStats.badges.includes("🔥 First Spell Caster") 
            },
            { 
              id: 'build-castle', 
              title: 'Build a digital castle', 
              description: 'Complete the drag-and-drop castle builder challenge',
              code: '<html>\n  <head>\n    <title>My Castle</title>\n  </head>\n  <body>\n    <h1>Welcome to my castle!</h1>\n  </body>\n</html>',
              completed: playerStats.badges.includes("🏰 Castle Builder") 
            },
            { 
              id: 'construct-temple', 
              title: 'Construct the HTML temple', 
              description: 'Follow the step-by-step temple construction guide',
              code: '<html>\n  <head>\n    <title>My Amazing Temple</title>\n  </head>\n  <body>\n    <h1>Welcome to My Digital Temple!</h1>\n  </body>\n</html>',
              completed: playerStats.badges.includes("🏛️ Temple Architect") 
            },
            { 
              id: 'lightning-round', 
              title: 'Complete the lightning challenge', 
              description: 'Type the power affirmation as fast as you can',
              code: '<h1>I am a coding wizard!</h1>',
              completed: playerStats.badges.includes("⚡ Lightning Fingers") 
            },
            { 
              id: 'paint-masterpiece', 
              title: 'Paint a digital masterpiece', 
              description: 'Use CSS to style your HTML creation beautifully',
              code: 'h1 { color: purple; font-size: 40px; text-align: center; }',
              completed: playerStats.badges.includes("🎨 Digital Artist") 
            }
          ]}
          rewards={{
            xp: 1000,
            badge: "🌟 Codeland Explorer",
            unlocks: "Lesson 2: The CSS Kingdom"
          }}
          onQuestComplete={(reward: any) => {
            addXP(reward.xp)
            addBadge(reward.badge)
          }}
        />

        {/* 🎊 Celebration & Next Steps */}
        <div className="p-8 text-center text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-xl">
          <h2 className="mb-4 text-3xl font-bold">🎊 Congratulations, Code Hero! 🎊</h2>
          <p className="mb-4 text-lg">
            You've taken your first magical steps into Codeland! You've learned that:
          </p>
          <div className="grid gap-4 p-4 text-left bg-white rounded-lg md:grid-cols-2 bg-opacity-20">
            <div>
              <h3 className="mb-2 font-bold">✨ What You've Mastered:</h3>
              <ul className="space-y-1 text-sm">
                <li>🏗️ HTML structure and basic tags</li>
                <li>🎨 Adding color and style with CSS</li>
                <li>👀 How browsers display your code</li>
                <li>🔧 The importance of opening and closing tags</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-bold">🚀 Your Superpowers:</h3>
              <ul className="space-y-1 text-sm">
                <li>💫 You can create web content from scratch</li>
                <li>🎯 You understand the foundation of all websites</li>
                <li>🌟 You're ready for more advanced adventures</li>
                <li>🔥 You have the confidence to keep learning</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="mb-2 text-xl font-bold">🗺️ Your Adventure Continues...</h3>
            <p className="mb-4">Ready to explore the CSS Kingdom and learn the art of digital styling?</p>
            <button className="px-8 py-3 text-lg font-bold text-black bg-yellow-500 rounded-lg hover:bg-yellow-600 animate-pulse">
              🚀 Continue to Lesson 2: The CSS Kingdom!
            </button>
          </div>
        </div>

        {/* Badge Collection Display */}
        {playerStats.badges.length > 0 && (
          <div className="p-6 bg-white border-2 border-yellow-300 rounded-xl">
            <h3 className="mb-4 text-xl font-bold text-center">🏆 Your Badge Collection</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {playerStats.badges.map((badge, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
