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
  title: "RockitCode - Learn to Code Fast & Easy",
  description:
    "The easiest and fastest way to learn to code for any age (13+). Master HTML/CSS, JavaScript, and Python with interactive courses.",
};

export default function Page() {
  return (
    <>
      {/* Essential Heroes */}
      <Heroes.SimpleCentered />
      
      {/* Flyout Menu Demo */}
      <div className="py-24 bg-white dark:bg-gray-950">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Enhanced Navigation
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Try our new flyout menus for better course discovery and navigation
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
      
      {/* Banner Components Demo */}
      <div className="py-16 bg-white dark:bg-gray-950">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Smart Notifications & Announcements
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Engage learners with contextual banners for courses, progress, promotions, and important updates
            </p>
          </div>
          <div className="mt-16 space-y-8">
            {/* Course announcement banner */}
            <Banners.OnBrandBanner />
            
            {/* Promotional banner */}
            <Banners.PromotionalBanner />
            
            {/* System status banner */}
            <Banners.SystemStatusBanner />
            
            {/* Privacy notice banner */}
            <Banners.PrivacyNoticeBanner />
          </div>
        </div>
      </div>
      
      {/* Essential Features */}
      <WithLargeScreenshot />
      <SimpleThreeColumnWithSmallIcons />
      
      {/* Essential Pricing */}
      <ThreeTiers />
      <TwoTiersWithEmphasizedTier />
      <SinglePriceWithDetails />
      
      {/* Essential Stats */}
      <StatsSimple />
      <StatsWithBackgroundImage />
      
      {/* Essential Testimonials */}
      <TestimonialSimpleCentered />
      <TestimonialWithStarRating />
      <TestimonialGrid />
      
      {/* Course Content Sections */}
      <WithStickyProductScreenshot />
      <TwoColumnsWithScreenshot />
      <Centered />
      
      {/* Blog Sections */}
      <ThreeColumnWithImages />
      <ThreeColumn />
      <SingleColumn />
      
      {/* Essential FAQs */}
      <SimpleAccordion />
      <TwoColumn />
      
      {/* Contact Form */}
      <SimpleForm />
      
      {/* Essential CTA */}
      <CTA.SimpleCentered />
      
      {/* Footer */}
      <SimpleWithLogo />
    </>
  );
}
