import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Design Resources & Tools | RockitCode Foundation',
  description: 'Professional design tools, templates, and resources for building outstanding portfolios. Figma templates, color palettes, typography guides, and more.',
}

export default function DesignResources() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <nav className="flex items-center text-sm text-green-100 mb-4">
            <Link href="/foundation/design-planning" className="hover:text-white">Design & Planning</Link>
            <span className="mx-2">→</span>
            <span className="text-white">Design Resources</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Design Resources & Tools
          </h1>
          
          <p className="text-xl text-green-100 mb-8 max-w-3xl">
            Professional design tools, templates, and resources curated for developers building outstanding portfolios.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Design Tools */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">🛠️ Essential Design Tools</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">F</div>
                <div>
                  <h3 className="font-semibold">Figma</h3>
                  <div className="text-sm text-green-600">Free • Recommended</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Industry-standard design tool. Create wireframes, mockups, and prototypes. Excellent for portfolio planning.
              </p>
              <div className="space-y-2">
                <a href="https://figma.com" className="block text-sm text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  🔗 Sign up for Figma
                </a>
                <a href="https://figma.com/templates" className="block text-sm text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  📄 Portfolio templates
                </a>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">T</div>
                <div>
                  <h3 className="font-semibold">Tailwind UI</h3>
                  <div className="text-sm text-yellow-600">Paid • Professional</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Premium component library with beautiful portfolio examples. Worth the investment for professional results.
              </p>
              <div className="space-y-2">
                <a href="https://tailwindui.com" className="block text-sm text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  🔗 Explore Tailwind UI
                </a>
                <a href="https://tailwindui.com/templates" className="block text-sm text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  📄 Portfolio templates
                </a>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold">U</div>
                <div>
                  <h3 className="font-semibold">Unsplash</h3>
                  <div className="text-sm text-green-600">Free • High Quality</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Professional photography for your portfolio. Use for project mockups, hero images, and backgrounds.
              </p>
              <div className="space-y-2">
                <a href="https://unsplash.com" className="block text-sm text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  🔗 Browse photos
                </a>
                <a href="https://unsplash.com/s/photos/developer" className="block text-sm text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  👨‍💻 Developer photos
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Color Palettes */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">🎨 Professional Color Palettes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold mb-4">Tech Professional</h3>
              <div className="grid grid-cols-4 gap-2 mb-4">
                <div className="h-16 bg-blue-600 rounded flex items-end p-2">
                  <span className="text-white text-xs">#2563EB</span>
                </div>
                <div className="h-16 bg-slate-700 rounded flex items-end p-2">
                  <span className="text-white text-xs">#334155</span>
                </div>
                <div className="h-16 bg-gray-100 rounded flex items-end p-2">
                  <span className="text-gray-700 text-xs">#F1F5F9</span>
                </div>
                <div className="h-16 bg-green-600 rounded flex items-end p-2">
                  <span className="text-white text-xs">#059669</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Classic tech palette. Blue for trust, green for success, grays for sophistication.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold mb-4">Creative Developer</h3>
              <div className="grid grid-cols-4 gap-2 mb-4">
                <div className="h-16 bg-purple-600 rounded flex items-end p-2">
                  <span className="text-white text-xs">#7C3AED</span>
                </div>
                <div className="h-16 bg-pink-600 rounded flex items-end p-2">
                  <span className="text-white text-xs">#DB2777</span>
                </div>
                <div className="h-16 bg-gray-900 rounded flex items-end p-2">
                  <span className="text-white text-xs">#111827</span>
                </div>
                <div className="h-16 bg-orange-500 rounded flex items-end p-2">
                  <span className="text-white text-xs">#F97316</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Bold and creative. Perfect for frontend developers and designers.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold mb-4">Enterprise Minimal</h3>
              <div className="grid grid-cols-4 gap-2 mb-4">
                <div className="h-16 bg-gray-900 rounded flex items-end p-2">
                  <span className="text-white text-xs">#111827</span>
                </div>
                <div className="h-16 bg-gray-600 rounded flex items-end p-2">
                  <span className="text-white text-xs">#4B5563</span>
                </div>
                <div className="h-16 bg-gray-200 rounded flex items-end p-2">
                  <span className="text-gray-700 text-xs">#E5E7EB</span>
                </div>
                <div className="h-16 bg-blue-500 rounded flex items-end p-2">
                  <span className="text-white text-xs">#3B82F6</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Clean and minimal. Great for backend developers and enterprise roles.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold mb-4">Startup Energy</h3>
              <div className="grid grid-cols-4 gap-2 mb-4">
                <div className="h-16 bg-emerald-600 rounded flex items-end p-2">
                  <span className="text-white text-xs">#059669</span>
                </div>
                <div className="h-16 bg-blue-600 rounded flex items-end p-2">
                  <span className="text-white text-xs">#2563EB</span>
                </div>
                <div className="h-16 bg-yellow-500 rounded flex items-end p-2">
                  <span className="text-white text-xs">#EAB308</span>
                </div>
                <div className="h-16 bg-gray-800 rounded flex items-end p-2">
                  <span className="text-white text-xs">#1F2937</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Energetic and optimistic. Perfect for startup environments.
              </p>
            </div>
          </div>
        </div>

        {/* Typography Systems */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">📝 Typography Systems</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold mb-4">Inter System (Recommended)</h3>
              <div className="space-y-4">
                <div>
                  <div className="font-bold text-3xl mb-1" style={{fontFamily: 'Inter, sans-serif'}}>Main Heading</div>
                  <div className="text-sm text-gray-600">Inter Bold, 32px</div>
                </div>
                <div>
                  <div className="font-semibold text-xl mb-1" style={{fontFamily: 'Inter, sans-serif'}}>Section Heading</div>
                  <div className="text-sm text-gray-600">Inter Semibold, 20px</div>
                </div>
                <div>
                  <div className="text-base mb-1" style={{fontFamily: 'Inter, sans-serif'}}>Body text with excellent readability</div>
                  <div className="text-sm text-gray-600">Inter Regular, 16px</div>
                </div>
                <div>
                  <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">const code = "example";</div>
                  <div className="text-sm text-gray-600 mt-1">JetBrains Mono, 14px</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold mb-4">Poppins System</h3>
              <div className="space-y-4">
                <div>
                  <div className="font-bold text-3xl mb-1" style={{fontFamily: 'Poppins, sans-serif'}}>Main Heading</div>
                  <div className="text-sm text-gray-600">Poppins Bold, 32px</div>
                </div>
                <div>
                  <div className="font-semibold text-xl mb-1" style={{fontFamily: 'Poppins, sans-serif'}}>Section Heading</div>
                  <div className="text-sm text-gray-600">Poppins Semibold, 20px</div>
                </div>
                <div>
                  <div className="text-base mb-1" style={{fontFamily: 'Poppins, sans-serif'}}>Friendly and approachable body text</div>
                  <div className="text-sm text-gray-600">Poppins Regular, 16px</div>
                </div>
                <div>
                  <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">const code = "example";</div>
                  <div className="text-sm text-gray-600 mt-1">Source Code Pro, 14px</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Component Libraries */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">🧩 Component Libraries & Inspiration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold mb-2">Headless UI</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Unstyled, accessible UI components for React. Perfect foundation for custom designs.
              </p>
              <a href="https://headlessui.com" className="text-sm text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                🔗 Explore components
              </a>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold mb-2">Radix UI</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Low-level UI primitives with accessibility built-in. Great for advanced portfolios.
              </p>
              <a href="https://radix-ui.com" className="text-sm text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                🔗 Browse primitives
              </a>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold mb-2">Dribbble</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Design inspiration platform. Search "developer portfolio" for current trends.
              </p>
              <a href="https://dribbble.com/tags/portfolio" className="text-sm text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                🔗 Portfolio inspiration
              </a>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Design?</h2>
          <p className="mb-6">
            Use these resources to create your portfolio blueprint, then start building with confidence.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/foundation/design-planning/workshop"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              🎨 Start Planning Workshop
            </Link>
            <Link 
              href="/html-basics-enhanced"
              className="bg-white/20 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/30 transition-colors"
            >
              🚀 Start Building
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between">
          <Link 
            href="/foundation/design-planning"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600"
          >
            ← Back to Design & Planning
          </Link>
          <Link 
            href="/foundation/design-planning/workshop"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Start Workshop →
          </Link>
        </div>
      </div>
    </div>
  )
}
