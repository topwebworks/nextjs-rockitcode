import Link from 'next/link'

export function StaticLaunchPadHero() {
  return (
    <section className="hero-section relative overflow-hidden py-20">
      {/* Background Effects - Pure CSS */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Mission Control Header */}
        <div className="mb-8">
          <div className="text-8xl mb-6 animate-bounce">🚀</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Launch Pad Mission Control
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            Your guided transformation to <span className="font-bold text-blue-600">professional developer status</span>
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
            Join thousands of developers who've transformed their careers with our mission-driven learning platform. 
            <strong className="text-green-600"> $200k+ worth of professional tools</strong> — completely free forever.
          </p>
        </div>

        {/* Hero Stats - Static Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="stat-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-green-600 mb-2">$200k+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Tools Value</div>
          </div>
          <div className="stat-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pro Tools</div>
          </div>
          <div className="stat-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-purple-600 mb-2">∞</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Free Forever</div>
          </div>
          <div className="stat-card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">AI Support</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 inline-block">
            <h3 className="text-2xl font-bold mb-4">Ready to Launch Your Career?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start your mission now and gain access to everything you need to become a professional developer
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/launch-pad" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-lg"
              >
                🚀 Begin Mission
              </Link>
              <Link 
                href="/courses" 
                className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-8 py-4 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 font-semibold text-lg border border-gray-200 dark:border-gray-600"
              >
                📚 Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
