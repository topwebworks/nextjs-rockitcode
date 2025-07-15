import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About - RockitCode Learning Platform',
  description: 'Learn about RockitCode mission to make professional coding education accessible to everyone. 100% free forever.',
};

// Force static generation for better Vercel performance
export const dynamic = 'force-static'
export const revalidate = 86400 // Revalidate daily

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">RockitCode</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our mission is to make professional coding education accessible to everyone, 
            everywhere, completely free forever.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 mb-12">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
          </div>
          <div className="text-lg text-gray-600 dark:text-gray-400 space-y-6">
            <p>
              We believe that everyone deserves access to high-quality coding education, regardless of their 
              background, location, or financial situation. That&apos;s why RockitCode is 100% free forever.
            </p>
            <p>
              Our platform combines cutting-edge AI technology with proven educational methods to create 
              an interactive learning experience that adapts to each student&apos;s pace and learning style.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
