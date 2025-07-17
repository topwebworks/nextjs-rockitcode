import type { Metadata } from "next";
import { renderIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Contact - RockitCode',
  description: 'Get in touch with the RockitCode team. We are here to help you succeed in your coding journey.',
};

// Force static generation for better Vercel performance
export const dynamic = 'force-static'
export const revalidate = 86400 // Revalidate daily

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      {/* Subtle Space Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        {/* Subtle Stars */}
        <div className="absolute w-1 h-1 rounded-full top-20 left-20 bg-white/60"></div>
        <div className="absolute w-1 h-1 rounded-full top-40 right-32 bg-blue-200/40"></div>
        <div className="absolute top-64 left-1/3 w-0.5 h-0.5 bg-white/50 rounded-full"></div>
        <div className="absolute w-1 h-1 rounded-full bottom-40 right-20 bg-white/30"></div>
        <div className="absolute bottom-64 left-16 w-0.5 h-0.5 bg-blue-100/40 rounded-full"></div>
      </div>

      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/30 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            {/* Professional Contact Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                {renderIcon('chat', 'w-16 h-16 text-blue-400')}
                <div className="absolute w-3 h-3 rounded-full -top-1 -right-1 bg-green-400/80 animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-5xl font-light mb-6 text-white tracking-wide">
              Mission Control Communication
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8 font-light">
              We're here to support your developer journey. Connect with our team and community for guidance, support, and collaboration.
            </p>
          </div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pb-20">
        {/* Contact Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Email Support */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-60 group-hover:opacity-80 transition-opacity"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:border-slate-600/50 transition-all duration-300">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {renderIcon('help', 'w-12 h-12 text-blue-400')}
                </div>
                <h3 className="text-2xl font-light text-white mb-4 tracking-wide">
                  Email Support
                </h3>
                <p className="text-slate-300 mb-8 leading-relaxed">
                  Get help with technical issues, course questions, or general inquiries
                </p>
                <a 
                  href="mailto:support@rockitcode.com"
                  className="inline-flex items-center px-8 py-4 bg-blue-600/80 backdrop-blur-sm text-white rounded-lg hover:bg-blue-600 transition-all duration-300 font-medium tracking-wide border border-blue-500/30 hover:border-blue-400/50"
                >
                  support@rockitcode.com
                </a>
              </div>
            </div>
          </div>

          {/* Community Discord */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-60 group-hover:opacity-80 transition-opacity"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:border-slate-600/50 transition-all duration-300">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {renderIcon('discord', 'w-12 h-12 text-purple-400')}
                </div>
                <h3 className="text-2xl font-light text-white mb-4 tracking-wide">
                  Community Discord
                </h3>
                <p className="text-slate-300 mb-8 leading-relaxed">
                  Join our community of learners, get instant help, and connect with peers
                </p>
                <a 
                  href="#"
                  className="inline-flex items-center px-8 py-4 bg-purple-600/80 backdrop-blur-sm text-white rounded-lg hover:bg-purple-600 transition-all duration-300 font-medium tracking-wide border border-purple-500/30 hover:border-purple-400/50"
                >
                  Join Discord
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Contact Form */}
        <div className="relative group mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl blur opacity-60 group-hover:opacity-80 transition-opacity"></div>
          <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:border-slate-600/50 transition-all duration-300">
            <div className="flex items-center mb-8">
              {renderIcon('document', 'w-8 h-8 text-green-400 mr-4')}
              <h2 className="text-3xl font-light text-white tracking-wide">
                Send us a Message
              </h2>
            </div>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-3 tracking-wide">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 text-white placeholder:text-slate-400 transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-3 tracking-wide">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 text-white placeholder:text-slate-400 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-3 tracking-wide">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 text-white placeholder:text-slate-400 transition-all duration-300"
                  placeholder="What can we help you with?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-3 tracking-wide">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 text-white placeholder:text-slate-400 transition-all duration-300 resize-none"
                  placeholder="Tell us more about your question or issue..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium text-lg tracking-wide border border-blue-500/30 hover:border-blue-400/50 backdrop-blur-sm"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-orange-500/20 rounded-xl blur opacity-60 group-hover:opacity-80 transition-opacity"></div>
          <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:border-slate-600/50 transition-all duration-300">
            <div className="flex items-center mb-8">
              {renderIcon('star', 'w-8 h-8 text-orange-400 mr-4')}
              <h2 className="text-3xl font-light text-white tracking-wide">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-8">
              <div className="border-l-4 border-blue-400/50 pl-6">
                <h3 className="text-xl font-medium text-white mb-3 tracking-wide">
                  Is RockitCode really free?
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Yes! Our core platform is 100% free forever. We believe everyone should have access to quality coding education.
                </p>
              </div>
              <div className="border-l-4 border-purple-400/50 pl-6">
                <h3 className="text-xl font-medium text-white mb-3 tracking-wide">
                  Do I need any prior experience?
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Not at all! Our courses start from the absolute basics and guide you step-by-step to become a professional developer.
                </p>
              </div>
              <div className="border-l-4 border-green-400/50 pl-6">
                <h3 className="text-xl font-medium text-white mb-3 tracking-wide">
                  How long does it take to complete a course?
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  It depends on your pace and the course. Most students complete our beginner courses in 2-4 weeks with consistent practice.
                </p>
              </div>
              <div className="border-l-4 border-orange-400/50 pl-6">
                <h3 className="text-xl font-medium text-white mb-3 tracking-wide">
                  Can I get a certificate?
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Yes! You'll receive a completion certificate for each course that you can add to your LinkedIn profile and resume.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
