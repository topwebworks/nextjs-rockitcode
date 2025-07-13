'use client'

export function LaunchPadTest() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900 p-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-6xl mb-4">🚀</div>
        <h1 className="text-4xl font-bold mb-4">Launch Pad Test Component</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          If you see this, the Launch Pad system is working correctly!
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">🎯 Mission Control Test</h2>
          <p className="text-gray-600 dark:text-gray-400">
            This confirms that our Launch Pad components are loading properly. 
            The comprehensive Launch Pad interface should be visible.
          </p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="text-2xl mb-2">🔗</div>
              <div className="font-semibold">GitHub Integration</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Professional tools</div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-semibold">Mission Briefings</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Development projects</div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <div className="text-2xl mb-2">💰</div>
              <div className="font-semibold">Revenue Model</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Transparent sustainability</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LaunchPadTest
