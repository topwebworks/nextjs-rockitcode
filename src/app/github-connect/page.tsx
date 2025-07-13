import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GitHub Integration - Launch Pad',
  description: 'Connect your GitHub account to unlock professional developer tools',
}

export default function GitHubConnectPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🔗</div>
        <h1 className="text-3xl font-bold mb-4">GitHub Integration Setup</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Connect your GitHub account to unlock $200k+ worth of professional developer tools
        </p>
      </div>

      {/* Demo Notice */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-3 flex items-center">
          <span className="mr-2">ℹ️</span>
          Demo Mode
        </h2>
        <p className="mb-4">
          This is currently a demonstration of the Launch Pad interface. In production, this would:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Connect to GitHub OAuth for secure authentication</li>
          <li>Apply for GitHub Student Developer Pack automatically</li>
          <li>Set up your professional developer profile</li>
          <li>Enable GitHub Copilot and Codespaces</li>
          <li>Create your first repository with professional templates</li>
        </ul>
      </div>

      {/* What You'll Get */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <span className="mr-2">🛠️</span>
            Developer Tools
          </h3>
          <ul className="space-y-2 text-sm">
            <li>• GitHub Copilot (AI coding assistant)</li>
            <li>• GitHub Codespaces (cloud IDE)</li>
            <li>• Professional domain from Namecheap</li>
            <li>• JetBrains IDE licenses</li>
            <li>• Docker Pro subscription</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <span className="mr-2">📊</span>
            Professional Setup
          </h3>
          <ul className="space-y-2 text-sm">
            <li>• Optimized GitHub profile</li>
            <li>• Professional README templates</li>
            <li>• Portfolio repository setup</li>
            <li>• Industry-standard project structure</li>
            <li>• Automated deployment workflows</li>
          </ul>
        </div>
      </div>

      {/* Back to Launch Pad */}
      <div className="text-center">
        <a 
          href="/" 
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          ← Back to Launch Pad
        </a>
      </div>
    </div>
  )
}
