'use client'

import { useState } from 'react'
import { LiveCSSPlayground, VisualConceptBuilder, InstantFeedbackTyper } from '../microlearning/InteractiveBlocks'
import { CodeRandomizer, LivePreviewBuilder, SpeedBuilder } from '../microlearning/GamifiedBlocks'
import { MasterpieceGallery, RocketShipBuilder } from '../microlearning/SpecializedBlocks'
import { PrecisionSniper } from '../microlearning/AdvancedBlocks'

// 🎨 LESSON 2: The CSS Kingdom - Become a Digital Artist!
export default function CSSKingdom() {
  const [artistStats, setArtistStats] = useState({
    xp: 0,
    level: 1,
    masterpieces: 0,
    stylePoints: 0,
    badges: [] as string[]
  })

  const addXP = (points: number) => {
    setArtistStats(prev => ({
      ...prev,
      xp: prev.xp + points,
      level: Math.floor((prev.xp + points) / 1500) + 1,
      stylePoints: prev.stylePoints + Math.floor(points / 10)
    }))
  }

  const addBadge = (badge: string) => {
    setArtistStats(prev => ({
      ...prev,
      badges: [...prev.badges, badge]
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-50 to-blue-100">
      {/* Royal CSS Kingdom Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white p-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">🎨 Welcome to the CSS Kingdom! 👑</h1>
          <p className="text-xl mb-6">Where code becomes art and websites come alive with style!</p>
          
          {/* Artist Dashboard */}
          <div className="grid md:grid-cols-4 gap-4 bg-white bg-opacity-20 rounded-xl p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{artistStats.level}</div>
              <div className="text-sm">Style Wizard Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{artistStats.stylePoints}</div>
              <div className="text-sm">Style Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{artistStats.masterpieces}</div>
              <div className="text-sm">Masterpieces Created</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{artistStats.badges.length}</div>
              <div className="text-sm">Artist Badges</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">

        {/* 🎭 Welcome to the Kingdom */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl border-2 border-purple-300">
          <h2 className="text-3xl font-bold text-purple-800 mb-4 text-center">🏰 Royal CSS Academy</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-purple-700 mb-3">🎨 Your Royal Mission:</h3>
              <p className="text-gray-700 mb-4">
                As a new citizen of the CSS Kingdom, you'll learn the magical art of styling! 
                CSS is like having a magical paintbrush that can transform any plain HTML into 
                a beautiful, colorful creation that dazzles visitors.
              </p>
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-bold text-purple-600 mb-2">🌟 What You'll Master:</h4>
                <ul className="text-sm space-y-1">
                  <li>🎨 Colors that bring joy to any website</li>
                  <li>📏 Sizes and spacing that look professional</li>
                  <li>✨ Effects that make elements come alive</li>
                  <li>📱 Responsive design for all devices</li>
                </ul>
              </div>
            </div>
            <div className="text-center">
              <div className="text-8xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-pink-700">Ready to Paint the Web?</h3>
              <p className="text-gray-600 mt-2">Let's start your artistic journey!</p>
            </div>
          </div>
        </div>

        {/* 🎨 CSS Color Palace - Interactive Color Learning */}
        <LiveCSSPlayground
          title="🌈 The Royal Color Palace - Paint Your First Masterpiece!"
          htmlStructure={`
            <div class="palace">
              <h1 class="title">My Color Palace</h1>
              <div class="room" id="throne-room">Throne Room</div>
              <div class="room" id="garden">Royal Garden</div>
              <div class="room" id="library">Magic Library</div>
            </div>
          `}
          cssProperties={[
            { property: 'background-color', values: ['gold', 'royalblue', 'crimson', 'forestgreen', 'purple'] },
            { property: 'color', values: ['white', 'black', 'silver', 'darkblue'] },
            { property: 'padding', values: ['10px', '20px', '30px'] },
            { property: 'border-radius', values: ['5px', '15px', '25px'] },
            { property: 'border', values: ['2px solid gold', '3px solid silver', '1px solid black'] }
          ]}
          onStyleSuccess={(score: number) => {
            addXP(score)
            addBadge("🌈 Color Master")
          }}
        />

        {/* 🏗️ Visual Concept Builder - Understanding CSS Layout */}
        <VisualConceptBuilder
          title="🏗️ The Great Layout Castle - Build With Your Eyes!"
          concepts={[
            {
              id: 'margin',
              name: 'Margin (Space Around)',
              visual: '🏰',
              description: 'Creates space AROUND elements, like a moat around a castle',
              interactive: true
            },
            {
              id: 'padding',
              name: 'Padding (Space Inside)',
              visual: '🛋️',
              description: 'Creates space INSIDE elements, like cushions in a room',
              interactive: true
            },
            {
              id: 'border',
              name: 'Border (The Walls)',
              visual: '🧱',
              description: 'The visible boundary around elements, like castle walls',
              interactive: true
            },
            {
              id: 'width',
              name: 'Width (How Wide)',
              visual: '↔️',
              description: 'Controls how wide an element is',
              interactive: true
            }
          ]}
          onConceptMastery={(concept: any, score: number) => {
            addXP(score)
            if (artistStats.badges.filter(b => b.includes("Layout")).length === 0) {
              addBadge("🏗️ Layout Architect")
            }
          }}
        />

        {/* 🎯 Precision CSS Sniper - Exact Styling Challenge */}
        <PrecisionSniper
          targets={[
            {
              id: 'button-style',
              title: '🎯 Style the Royal Button',
              challenge: 'Create a perfect button that looks royal and clickable!',
              specs: [
                'Background color: royal blue',
                'Text color: white',
                'Padding: 15px 30px',
                'Border radius: 25px',
                'No border'
              ],
              solution: 'background-color: royalblue; color: white; padding: 15px 30px; border-radius: 25px; border: none;'
            },
            {
              id: 'card-design',
              title: '🎯 Design a Royal Card',
              challenge: 'Create an elegant card design fit for the CSS Kingdom!',
              specs: [
                'Background: light gradient',
                'Shadow for depth',
                'Rounded corners',
                'Proper spacing'
              ],
              solution: 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); box-shadow: 0 4px 15px rgba(0,0,0,0.2); border-radius: 15px; padding: 20px;'
            }
          ]}
          onBullseye={(target: any, score: number) => {
            addXP(score)
            addBadge("🎯 CSS Sniper")
          }}
        />

        {/* 🚀 Rocket Ship CSS Builder - Progressive Styling */}
        <RocketShipBuilder
          components={[
            // Stage 0: Foundation
            { id: 'html-structure', name: 'HTML Structure', stage: 0, prerequisite: [], icon: '🏗️', description: 'Basic HTML foundation' },
            { id: 'reset-css', name: 'CSS Reset', stage: 0, prerequisite: [], icon: '🧹', description: 'Clean slate for styling' },
            
            // Stage 1: Colors & Typography
            { id: 'color-scheme', name: 'Color Palette', stage: 1, prerequisite: ['html-structure'], icon: '🎨', description: 'Beautiful color system' },
            { id: 'typography', name: 'Font System', stage: 1, prerequisite: ['reset-css'], icon: '📝', description: 'Readable text styling' },
            
            // Stage 2: Layout & Spacing
            { id: 'layout-grid', name: 'Layout Grid', stage: 2, prerequisite: ['color-scheme', 'typography'], icon: '📐', description: 'Organized structure' },
            { id: 'spacing-system', name: 'Spacing System', stage: 2, prerequisite: ['typography'], icon: '📏', description: 'Consistent spacing' },
            
            // Stage 3: Interactive Elements
            { id: 'buttons', name: 'Interactive Buttons', stage: 3, prerequisite: ['layout-grid'], icon: '🔘', description: 'Clickable elements' },
            { id: 'animations', name: 'Smooth Animations', stage: 3, prerequisite: ['spacing-system'], icon: '✨', description: 'Delightful motion' }
          ]}
          stages={[
            { name: 'Foundation', description: 'Build the base structure' },
            { name: 'Visual Design', description: 'Add colors and typography' },
            { name: 'Layout & Structure', description: 'Organize the content' },
            { name: 'Interactivity', description: 'Make it come alive' }
          ]}
          onLaunch={(score: number) => {
            addXP(score)
            setArtistStats(prev => ({ ...prev, masterpieces: prev.masterpieces + 1 }))
            addBadge("🚀 CSS Rocket Engineer")
          }}
        />

        {/* 🎨 Masterpiece Gallery - Show Off Your Art */}
        <MasterpieceGallery
          artPieces={[
            {
              title: "The Rainbow Button",
              artist: "CSS Master Luna",
              code: `.rainbow-btn {\n  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);\n  color: white;\n  padding: 15px 30px;\n  border: none;\n  border-radius: 25px;\n  font-size: 18px;\n  cursor: pointer;\n  transition: transform 0.3s ease;\n}\n\n.rainbow-btn:hover {\n  transform: scale(1.05);\n}`,
              rating: 5,
              likes: 147
            },
            {
              title: "Floating Card Magic",
              artist: "Designer Phoenix",
              code: `.magic-card {\n  background: rgba(255, 255, 255, 0.1);\n  backdrop-filter: blur(10px);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 20px;\n  padding: 30px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);\n  transition: all 0.3s ease;\n}\n\n.magic-card:hover {\n  transform: translateY(-10px);\n  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.2);\n}`,
              rating: 5,
              likes: 203
            }
          ]}
          onMasterpiece={(piece: any, score: number) => {
            addXP(score)
            setArtistStats(prev => ({ ...prev, masterpieces: prev.masterpieces + 1 }))
            addBadge("🎨 Gallery Artist")
          }}
        />

        {/* ⚡ Speed Builder - Quick CSS Challenges */}
        <SpeedBuilder
          title="⚡ Royal CSS Speed Tournament"
          challenges={[
            {
              description: "Create a perfect center-aligned heading with blue color!",
              target: "text-align: center; color: blue;",
              timeLimit: 15
            },
            {
              description: "Style a card with white background, shadow, and rounded corners!",
              target: "background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 10px;",
              timeLimit: 25
            },
            {
              description: "Make a responsive button with hover effect!",
              target: "padding: 12px 24px; background: #007bff; color: white; border: none; border-radius: 6px; cursor: pointer;",
              timeLimit: 30
            }
          ]}
          onSpeedComplete={(score: number) => {
            addXP(score)
            addBadge("⚡ Speed Styler")
          }}
        />

        {/* 🎲 Random CSS Challenge Generator */}
        <CodeRandomizer
          title="🎲 The CSS Challenge Cauldron"
          challenges={[
            {
              type: "Color Harmony",
              instruction: "Create a beautiful color scheme using complementary colors",
              hints: ["Try pairing blue with orange", "Use different shades of the same color", "Consider the mood you want to create"],
              difficulty: "easy"
            },
            {
              type: "Layout Magic",
              instruction: "Design a card layout that looks professional",
              hints: ["Use proper spacing", "Add subtle shadows", "Make corners slightly rounded"],
              difficulty: "medium"
            },
            {
              type: "Animation Wonder",
              instruction: "Add a smooth hover effect to a button",
              hints: ["Use transitions", "Try transform effects", "Keep it subtle but noticeable"],
              difficulty: "hard"
            }
          ]}
          onChallengeComplete={(challenge: any, score: number) => {
            addXP(score)
            addBadge("🎲 Challenge Champion")
          }}
        />

        {/* 📱 Responsive Design Preview */}
        <LivePreviewBuilder
          title="📱 The Multi-Device Crystal Ball"
          content={`
            <div class="responsive-demo">
              <header class="hero">
                <h1>Welcome to CSS Kingdom!</h1>
                <p>Where every device shows your beauty</p>
              </header>
              <main class="content">
                <div class="card">Mobile Perfect</div>
                <div class="card">Tablet Ready</div>
                <div class="card">Desktop Awesome</div>
              </main>
            </div>
          `}
          devices={['mobile', 'tablet', 'desktop']}
          onPreviewSuccess={(device: string, score: number) => {
            addXP(score)
            addBadge(`📱 ${device} Master`)
          }}
        />

        {/* 🏆 Kingdom Progress & Graduation */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-8 rounded-xl text-center">
          <h2 className="text-3xl font-bold mb-4">👑 Congratulations, CSS Royalty! 👑</h2>
          <p className="text-lg mb-4">
            You've mastered the art of digital styling! You now possess the power to make any website beautiful.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 bg-white bg-opacity-20 rounded-lg p-4 mb-6">
            <div>
              <h3 className="font-bold mb-2">🎨 Artistic Skills Gained:</h3>
              <ul className="text-sm space-y-1 text-left">
                <li>🌈 Color theory and harmony</li>
                <li>📏 Layout and spacing mastery</li>
                <li>✨ Animation and effects</li>
                <li>📱 Responsive design principles</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">🔧 Technical Powers:</h3>
              <ul className="text-sm space-y-1 text-left">
                <li>🎯 CSS selectors and properties</li>
                <li>🏗️ Box model understanding</li>
                <li>🎪 Flexbox and Grid layouts</li>
                <li>⚡ Hover and transition effects</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">🌟 Real-World Impact:</h3>
              <ul className="text-sm space-y-1 text-left">
                <li>🚀 Create professional websites</li>
                <li>💼 Stand out in the job market</li>
                <li>🎨 Express creativity through code</li>
                <li>🌍 Make the web more beautiful</li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-bold mb-2">🗺️ Your Next Kingdom Awaits...</h3>
            <p className="mb-4">Ready to learn JavaScript and bring your creations to life with interactivity?</p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg text-lg animate-bounce">
              🚀 Enter the JavaScript Realm!
            </button>
          </div>
        </div>

        {/* Badge Gallery */}
        {artistStats.badges.length > 0 && (
          <div className="bg-white p-6 rounded-xl border-2 border-purple-300">
            <h3 className="text-xl font-bold text-center mb-4">🏆 Your Royal CSS Badges</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {artistStats.badges.map((badge, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
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
