import AIEnhancedLessonPlayer from '@/components/ai-enhanced-lesson-player'

export default function AIIntegrationDemo() {
  return (
    <div className="ai-integration-demo">
      <div className="demo-header bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            🤖 AI-Enhanced Learning Experience
          </h1>
          <p className="text-xl opacity-90 mb-6">
            Experience the future of coding education where AI amplifies human learning
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl mb-2">🔑</div>
              <h3 className="font-semibold">Your AI, Your Control</h3>
              <p className="text-sm opacity-80">Connect your own AI accounts - we pay zero for your AI usage</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="font-semibold">Progress Tracking</h3>
              <p className="text-sm opacity-80">Monitor your AI collaboration skills and coding independence</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl mb-2">🎓</div>
              <h3 className="font-semibold">Ethical AI Use</h3>
              <p className="text-sm opacity-80">Learn responsible AI collaboration and maintain critical thinking</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Integration Features */}
      <div className="features-section bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Revolutionary AI-Human Collaboration
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="feature-card bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-3">Zero Platform AI Costs</h3>
              <p className="text-gray-600 dark:text-gray-400">
                You control your AI spending directly. Use your existing GitHub Copilot or 
                spend just $3-10/month on your preferred AI provider.
              </p>
            </div>

            <div className="feature-card bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="text-3xl mb-4">🎬</div>
              <h3 className="text-xl font-semibold mb-3">Video-Code Sync</h3>
              <p className="text-gray-600 dark:text-gray-400">
                AI suggestions adapt to video timestamps, providing relevant help 
                exactly when you need it in the lesson.
              </p>
            </div>

            <div className="feature-card bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="text-3xl mb-4">⚖️</div>
              <h3 className="text-xl font-semibold mb-3">Balanced Learning</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Progressive AI assistance: high support for beginners, strategic guidance 
                for advanced learners.
              </p>
            </div>

            <div className="feature-card bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3">Learning Analytics</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track your AI collaboration skills, independence metrics, and 
                code quality improvements.
              </p>
            </div>

            <div className="feature-card bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-3">Critical Review</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Learn to evaluate AI suggestions critically, modify them appropriately, 
                and maintain coding independence.
              </p>
            </div>

            <div className="feature-card bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="text-3xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-3">Future-Ready Skills</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Master prompt engineering, AI collaboration workflows, and 
                ethical AI development practices.
              </p>
            </div>
          </div>

          {/* Sustainable Business Model */}
          <div className="business-model-section mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center">
              💡 Revolutionary Business Model: User-Controlled AI
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="model-card bg-green-50 dark:bg-green-900/20 rounded-lg p-6 text-center">
                <div className="text-3xl mb-4">👨‍💻</div>
                <h4 className="text-lg font-semibold mb-3 text-green-800 dark:text-green-200">
                  Students Win
                </h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <li>• Use preferred AI provider</li>
                  <li>• Full cost transparency</li>
                  <li>• No platform markups</li>
                  <li>• Professional account skills</li>
                </ul>
              </div>
              
              <div className="model-card bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 text-center">
                <div className="text-3xl mb-4">🏢</div>
                <h4 className="text-lg font-semibold mb-3 text-blue-800 dark:text-blue-200">
                  RockitCode Wins
                </h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <li>• Zero AI infrastructure costs</li>
                  <li>• Unlimited scalability</li>
                  <li>• Competitive advantage</li>
                  <li>• Sustainable growth model</li>
                </ul>
              </div>
              
              <div className="model-card bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 text-center">
                <div className="text-3xl mb-4">🌍</div>
                <h4 className="text-lg font-semibold mb-3 text-purple-800 dark:text-purple-200">
                  Industry Wins
                </h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <li>• Real-world AI training</li>
                  <li>• Market education</li>
                  <li>• Tool diversity exposure</li>
                  <li>• Professional preparation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* AI Learning Philosophy */}
          <div className="philosophy-section bg-white dark:bg-gray-800 rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center">
              🎯 Our AI Learning Philosophy
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-green-600">✅ AI As Enhancement</h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>• AI accelerates learning, doesn't replace thinking</li>
                  <li>• Students maintain understanding of core concepts</li>
                  <li>• AI suggestions require critical evaluation</li>
                  <li>• Human creativity and problem-solving remain central</li>
                  <li>• Progressive independence from AI assistance</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-3 text-red-600">❌ AI As Replacement</h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>• Blind copy-paste of AI-generated code</li>
                  <li>• Skipping understanding for quick solutions</li>
                  <li>• Over-reliance on AI for basic problems</li>
                  <li>• Accepting AI suggestions without review</li>
                  <li>• Avoiding challenges that build skill</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Implementation Timeline */}
          <div className="timeline-section mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center">
              🚀 AI Integration Implementation Plan
            </h3>
            
            <div className="space-y-6">
              <div className="timeline-item flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold">Phase 1: Core AI Integration (Month 1-2)</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Implement AI-assisted Monaco editor, basic prompt templates, 
                    and suggestion system with mock AI responses for testing.
                  </p>
                </div>
              </div>

              <div className="timeline-item flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold">Phase 2: Real AI Provider Integration (Month 3)</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Connect to OpenAI, Claude, or GitHub Copilot APIs. Implement 
                    context-aware prompting and lesson-specific AI guidance.
                  </p>
                </div>
              </div>

              <div className="timeline-item flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold">Phase 3: Learning Analytics (Month 4)</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Build comprehensive AI interaction tracking, skill assessment 
                    metrics, and personalized learning recommendations.
                  </p>
                </div>
              </div>

              <div className="timeline-item flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold">Phase 4: Advanced Features (Month 5-6)</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Advanced prompt engineering curriculum, AI ethics training, 
                    multi-framework AI assistance, and community AI collaboration features.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Demo */}
      <div className="demo-section">
        <div className="bg-gray-100 dark:bg-gray-800 py-8">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              🎮 Interactive AI Learning Demo
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Experience AI-enhanced coding education in action. This demo shows how 
              students collaborate with AI while building responsive navigation.
            </p>
          </div>
        </div>
        
        <AIEnhancedLessonPlayer />
      </div>

      {/* Call to Action */}
      <div className="cta-section bg-gradient-to-r from-green-600 to-blue-600 text-white py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Shape the Future of Coding Education?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            This AI integration represents the next evolution of RockitCode. 
            We're preparing developers for an AI-augmented future while preserving 
            the fundamentals that make great programmers.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Building AI Features
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Review Implementation Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
