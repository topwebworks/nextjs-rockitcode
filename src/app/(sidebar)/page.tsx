import type { Metadata } from "next";
import { AnimatedHero } from "@/components/animated-hero";
import { AnimatedFeatures } from "@/components/animated-features";
import { AnimatedCodeDemo } from "@/components/animated-code-demo";
import { AnimatedTestimonials } from "@/components/animated-testimonials";
import { AnimatedCTA } from "@/components/animated-cta";

export const metadata: Metadata = {
  title: "RockitCode - Learn to Code on Your Phone",
  description:
    "Revolutionary mobile-first coding education. Learn HTML, CSS, JavaScript with a real VSCode editor optimized for mobile. Start coding in 5-minute sessions anywhere.",
};

export default function Page() {
  return (
    <div className="bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Development Navigation */}
      <div className="bg-slate-900 dark:bg-slate-800 text-white border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <span className="text-slate-300">Development:</span>
              <a href="/lessons-demo" className="text-blue-400 hover:text-blue-300 transition-colors">
                🚀 Live Lessons
              </a>
              <a href="/enhanced-monaco" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                ⚡ Mobile Editor
              </a>
              <a href="/monaco-test" className="text-purple-400 hover:text-purple-300 transition-colors">
                🔧 Editor Test
              </a>
            </div>
            <div className="text-slate-400">
              Press F12 to see animations in action
            </div>
          </div>
        </div>
      </div>

      {/* Animated Hero Section */}
      <AnimatedHero />

      {/* Animated Code Demo */}
      <AnimatedCodeDemo />

      {/* Animated Features */}
      <AnimatedFeatures />

      {/* Animated Testimonials */}
      <AnimatedTestimonials />

      {/* Animated CTA */}
      <AnimatedCTA />
    </div>
  )
}
