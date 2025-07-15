// GitHub Icon Showcase - Temporary page to see all icon variations
'use client'

// Option 1: Classic GitHub Octocat (Filled)
function GitHubOption1({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  )
}

// Option 2: Linear Stroke GitHub (Detailed)
function GitHubOption2({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75 0 4.31 2.79 7.97 6.66 9.26.49.09.67-.21.67-.47v-1.65c-2.72.59-3.29-1.31-3.29-1.31-.44-1.12-1.08-1.42-1.08-1.42-.88-.6.07-.59.07-.59.97.07 1.48 1 1.48 1 .87 1.49 2.28 1.06 2.84.81.09-.63.34-1.06.62-1.3-2.17-.25-4.45-1.09-4.45-4.84 0-1.07.38-1.95 1.01-2.64-.1-.25-.44-1.24.1-2.59 0 0 .82-.26 2.69 1.01A9.3 9.3 0 0112 6.8c.85 0 1.71.11 2.51.33 1.87-1.27 2.69-1.01 2.69-1.01.54 1.35.2 2.34.1 2.59.63.69 1.01 1.57 1.01 2.64 0 3.76-2.29 4.59-4.47 4.83.35.3.66.9.66 1.82v2.7c0 .26.18.56.67.47A9.75 9.75 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75z" />
    </svg>
  )
}

// Option 3: Minimal Linear GitHub
function GitHubOption3({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
    </svg>
  )
}

// Option 4: Ultra Thin Linear GitHub
function GitHubOption4({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
    </svg>
  )
}

// Option 5: Geometric Linear GitHub (Circle + Face)
function GitHubOption5({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 14s1.5 1 4 1 4-1 4-1"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h.01M15 9h.01"/>
    </svg>
  )
}

// Option 6: Modern Linear GitHub (Feather-style)
function GitHubOption6({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 22v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  )
}

// Option 7: Square GitHub (Linear box style)
function GitHubOption7({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeLinecap="round" strokeLinejoin="round"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 6.5h.01"/>
    </svg>
  )
}

// Option 8: Heroicons-style GitHub
function GitHubOption8({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3C7.03 3 3 7.03 3 12c0 3.98 2.58 7.35 6.15 8.54.45.08.62-.2.62-.44v-1.56c-2.5.54-3.02-1.2-3.02-1.2-.41-1.04-1-1.31-1-1.31-.82-.56.06-.55.06-.55.9.06 1.38.93 1.38.93.81 1.39 2.12.99 2.64.76.08-.59.32-.99.58-1.22-2.01-.23-4.13-1.01-4.13-4.48 0-.99.35-1.8.93-2.43-.09-.23-.4-1.14.09-2.38 0 0 .76-.24 2.48.93A8.57 8.57 0 0112 6.84c.77 0 1.55.1 2.28.3 1.72-1.17 2.48-.93 2.48-.93.49 1.24.18 2.15.09 2.38.58.63.93 1.44.93 2.43 0 3.48-2.12 4.25-4.14 4.47.33.28.62.84.62 1.69v2.51c0 .24.17.52.62.43A9 9 0 0021 12c0-4.97-4.03-9-9-9z"/>
    </svg>
  )
}

export default function IconShowcase() {
  const iconOptions = [
    { name: "Option 1: Classic Octocat (Filled)", component: GitHubOption1, description: "Traditional GitHub brand icon - filled style" },
    { name: "Option 2: Linear Stroke (Detailed)", component: GitHubOption2, description: "Stroke version with all GitHub details" },
    { name: "Option 3: Minimal Linear", component: GitHubOption3, description: "Simple linear GitHub representation" },
    { name: "Option 4: Ultra Thin", component: GitHubOption4, description: "Very thin stroke weight for minimal look" },
    { name: "Option 5: Geometric Face", component: GitHubOption5, description: "Circular with simple face elements" },
    { name: "Option 6: Modern Feather", component: GitHubOption6, description: "Feather icon library style" },
    { name: "Option 7: Square Style", component: GitHubOption7, description: "Rounded square container approach" },
    { name: "Option 8: Heroicons Style", component: GitHubOption8, description: "Matches your current icon family style" },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent mb-4">
            GitHub Icon Showcase
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Choose the GitHub icon that matches your earlier design
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {iconOptions.map((option, index) => {
            const IconComponent = option.component
            return (
              <div key={index} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-lg p-6 shadow-lg shadow-slate-500/10 hover:shadow-slate-500/20 transition-all duration-200 group text-center">
                <div className="mb-4 flex justify-center">
                  {/* Large version */}
                  <div className="w-16 h-16 flex items-center justify-center bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                    <IconComponent className="w-10 h-10 text-slate-600 dark:text-slate-400" />
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200">
                  {option.name}
                </h3>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {option.description}
                </p>
                
                {/* Small versions in different states */}
                <div className="flex justify-center space-x-3">
                  <div className="flex flex-col items-center">
                    <IconComponent className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                    <span className="text-xs text-slate-500 mt-1">Normal</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs text-slate-500 mt-1">Hover</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600 dark:text-slate-400">
            Click on the option number that matches the GitHub icon you remember seeing earlier today!
          </p>
        </div>
      </div>
    </div>
  )
}
