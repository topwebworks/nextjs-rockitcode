import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - RockitCode",
  description: "Get in touch with the RockitCode team. We'd love to hear from you!",
};

export default function ContactPage() {
  return (
    <div className="px-8 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            💬 Get in Touch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            We'd love to hear from you! Reach out with questions, feedback, or suggestions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send us a message
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Tell us what's on your mind..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Other ways to reach us
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-2xl">📧</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                  <p className="text-gray-600 dark:text-gray-400">hello@rockitcode.com</p>
                  <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <span className="text-2xl">💬</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Discord Community</h3>
                  <p className="text-gray-600 dark:text-gray-400">Join our coding community</p>
                  <p className="text-sm text-gray-500">Get help from fellow learners</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <span className="text-2xl">🐦</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Twitter</h3>
                  <p className="text-gray-600 dark:text-gray-400">@RockitCode</p>
                  <p className="text-sm text-gray-500">Follow for coding tips and updates</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <span className="text-2xl">💼</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">LinkedIn</h3>
                  <p className="text-gray-600 dark:text-gray-400">RockitCode</p>
                  <p className="text-sm text-gray-500">Connect with us professionally</p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    How can I get help with a course?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Join our Discord community or send us an email with your specific question.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Can I suggest new course topics?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Absolutely! We love hearing what our community wants to learn next.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Is RockitCode free to use?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Yes! All our current courses and interactive lessons are completely free.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
