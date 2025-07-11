import { 
  Heroes, CTA, FlyoutMenus, Banners, 
  SimpleThreeColumnWithSmallIcons, WithLargeScreenshot,
  ThreeTiers, TwoTiersWithEmphasizedTier, SinglePriceWithDetails,
  StatsSimple, StatsWithBackgroundImage,
  TestimonialSimpleCentered, TestimonialWithStarRating, TestimonialGrid,
  SimpleAccordion, TwoColumn,
  SimpleWithLogo,
  SimpleForm,
  WithStickyProductScreenshot, TwoColumnsWithScreenshot, Centered,
  ThreeColumn, ThreeColumnWithImages, SingleColumn
} from "@/components/tailwind-ui/marketing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RockitCode - UI Components Showcase",
  description: "Comprehensive showcase of all available UI components, design patterns, and marketing elements for the RockitCode platform.",
};

export default function ComponentsShowcasePage() {
  return (
    <>
      {/* Header */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">UI Components Showcase</h1>
          <p className="text-xl text-gray-300">
            Complete collection of marketing components, layouts, and design patterns
          </p>
          <div className="mt-8 text-sm text-gray-400">
            <a href="/" className="text-blue-400 hover:text-blue-300">← Back to Homepage</a>
            <span className="mx-4">|</span>
            <a href="/lessons-demo" className="text-green-400 hover:text-green-300">Try Live Demo →</a>
          </div>
        </div>
      </div>

      {/* Component Categories */}
      <div className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Component Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">🎯 Heroes & CTAs</h3>
              <p className="text-gray-600 dark:text-gray-300">Landing page headers and call-to-action sections</p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">🧭 Navigation</h3>
              <p className="text-gray-600 dark:text-gray-300">Flyout menus and navigation components</p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">💰 Pricing & Stats</h3>
              <p className="text-gray-600 dark:text-gray-300">Pricing tables and statistics displays</p>
            </div>
          </div>
        </div>
      </div>

      {/* Heroes Section */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Hero Components</h2>
        </div>
        <Heroes.SimpleCentered />
      </div>

      {/* Navigation Demo */}
      <div className="py-16 bg-white dark:bg-gray-950">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Interactive Navigation
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Professional flyout menus with smooth animations and responsive design
            </p>
          </div>
          
          {/* Interactive Navigation Bar Demo */}
          <div className="mt-20">
            <div className="flex justify-center">
              <div className="relative flex items-center p-4 space-x-8 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  RockitCode
                </div>
                <nav className="flex space-x-8">
                  <FlyoutMenus.StackedWithFooterActions />
                  <FlyoutMenus.SimpleResources />
                  <FlyoutMenus.SimpleWithDescriptions />
                </nav>
              </div>
            </div>
            
            {/* Instructions */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Hover over each menu item above to see the flyout menu in action
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Banners */}
      <div className="py-16 bg-white dark:bg-gray-950">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Notification Banners
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Contextual banners for announcements, promotions, and system updates
            </p>
          </div>
          <div className="space-y-8">
            <Banners.OnBrandBanner />
            <Banners.PromotionalBanner />
            <Banners.SystemStatusBanner />
            <Banners.PrivacyNoticeBanner />
          </div>
        </div>
      </div>

      {/* Features */}
      <WithLargeScreenshot />
      <SimpleThreeColumnWithSmallIcons />

      {/* Pricing */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Pricing Components</h2>
        </div>
        <ThreeTiers />
        <TwoTiersWithEmphasizedTier />
        <SinglePriceWithDetails />
      </div>

      {/* Stats */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Statistics Components</h2>
        </div>
        <StatsSimple />
        <StatsWithBackgroundImage />
      </div>

      {/* Testimonials */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Testimonial Components</h2>
        </div>
        <TestimonialSimpleCentered />
        <TestimonialWithStarRating />
        <TestimonialGrid />
      </div>

      {/* Content Sections */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Content Layout Components</h2>
        </div>
        <WithStickyProductScreenshot />
        <TwoColumnsWithScreenshot />
        <Centered />
        <ThreeColumnWithImages />
        <ThreeColumn />
        <SingleColumn />
      </div>

      {/* FAQs */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">FAQ Components</h2>
        </div>
        <SimpleAccordion />
        <TwoColumn />
      </div>

      {/* Forms */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Form Components</h2>
        </div>
        <SimpleForm />
      </div>

      {/* CTAs */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Call-to-Action Components</h2>
        </div>
        <CTA.SimpleCentered />
      </div>

      {/* Footer */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Footer Components</h2>
        </div>
        <SimpleWithLogo />
      </div>

      {/* Bottom Navigation */}
      <div className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-xl font-semibold mb-4">Ready to See It In Action?</h3>
          <div className="space-x-4">
            <a 
              href="/" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Clean Homepage
            </a>
            <a 
              href="/lessons-demo" 
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Try Live Demo
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
