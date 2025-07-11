import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RockitCode - Learn to Code on Your Phone",
  description:
    "Revolutionary mobile-first coding education. Learn HTML, CSS, JavaScript with a real VSCode editor optimized for mobile. Start coding in 5-minute sessions anywhere.",
};

export default function Page() {
  return (
    <>
      {/* Demo Links - Keep for development */}
      <div className="bg-blue-600 text-white py-2">
        <div className="text-center text-xs space-x-3">
          <a href="/lessons-demo" className="hover:text-blue-200">🚀 Lesson Demo</a>
          <span>|</span>
          <a href="/monaco-test" className="hover:text-blue-200">🔧 Monaco Test</a>
          <span>|</span>
          <a href="/enhanced-monaco" className="hover:text-blue-200">⚡ Enhanced Editor</a>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-900">
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                Learn to Code on Your Phone
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                The world's first mobile-first coding education platform. Professional VSCode editor optimized for mobile. 
                Learn HTML, CSS, JavaScript in 5-minute sessions during your commute.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/lessons-demo"
                  className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Try Live Demo
                </a>
                <a href="#how-it-works" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  See how it works <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              How We Teach Coding
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Simple, interactive lessons designed for mobile learning
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {/* Step 1: Watch & Learn */}
              <div className="flex flex-col">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <span className="text-lg font-bold text-white">1</span>
                </div>
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  📺 Watch Short Videos
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">
                    Quick 2-3 minute videos explain concepts clearly. 
                    Perfect for mobile viewing during breaks.
                  </p>
                  <div className="mt-4 p-3 bg-white dark:bg-gray-700 rounded border text-sm">
                    <div className="text-blue-600 dark:text-blue-400 font-mono">
                      "In this lesson: Creating your first webpage..."
                    </div>
                  </div>
                </dd>
              </div>

              {/* Step 2: Code Along */}
              <div className="flex flex-col">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
                  <span className="text-lg font-bold text-white">2</span>
                </div>
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  ⌨️ Code in Real Editor
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">
                    Professional VSCode editor optimized for mobile. 
                    Voice coding, smart hints, touch gestures.
                  </p>
                  <div className="mt-4 p-3 bg-gray-900 rounded text-sm text-green-400 font-mono">
                    {"<h1>Hello World!</h1>"}
                    <br />
                    {"<p>My first webpage</p>"}
                    <div className="mt-2 text-blue-400 text-xs">✅ Code looks great!</div>
                  </div>
                </dd>
              </div>

              {/* Step 3: See Results */}
              <div className="flex flex-col">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                  <span className="text-lg font-bold text-white">3</span>
                </div>
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  🎉 See Instant Results
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">
                    Your code runs instantly. Build real websites, 
                    games, and apps that work on any device.
                  </p>
                  <div className="mt-4 p-3 bg-white dark:bg-gray-700 rounded border text-sm">
                    <div className="text-xl font-bold text-gray-900 dark:text-white">Hello World!</div>
                    <div className="text-gray-600 dark:text-gray-300">My first webpage</div>
                    <div className="mt-2 text-green-600 text-xs">🚀 Deployed live!</div>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* What You'll Learn */}
      <div className="py-24 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              What You'll Learn
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Master the core technologies that power the web
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* HTML */}
              <div className="relative bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
                <div className="text-4xl mb-4">🏗️</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  HTML - Structure
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Learn to create webpage structure with headers, paragraphs, links, images, and forms.
                </p>
                <div className="bg-gray-900 rounded p-3 text-sm text-green-400 font-mono">
                  {"<h1>My Blog</h1>"}
                  <br />
                  {"<p>Welcome to my site!</p>"}
                  <br />
                  {"<button>Click me</button>"}
                </div>
              </div>

              {/* CSS */}
              <div className="relative bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  CSS - Styling
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Make your websites beautiful with colors, layouts, animations, and responsive design.
                </p>
                <div className="bg-gray-900 rounded p-3 text-sm text-blue-400 font-mono">
                  {"h1 {"}
                  <br />
                  {"  color: blue;"}
                  <br />
                  {"  font-size: 2rem;"}
                  <br />
                  {"}"}
                </div>
              </div>

              {/* JavaScript */}
              <div className="relative bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  JavaScript - Interactivity
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Add interactivity with buttons, forms, animations, and dynamic content.
                </p>
                <div className="bg-gray-900 rounded p-3 text-sm text-yellow-400 font-mono">
                  {"function greet() {"}
                  <br />
                  {'  alert("Hello!");'}
                  <br />
                  {"}"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-First Benefits */}
      <div className="py-24 bg-blue-50 dark:bg-blue-900/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Why Mobile-First Learning Works
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Learn anywhere, anytime, in bite-sized sessions
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-600 text-white text-xl">
                    📱
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Learn During Commutes
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Turn dead time into learning time. Code on trains, buses, or during lunch breaks.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-green-600 text-white text-xl">
                    ⚡
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    5-Minute Sessions
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Complete lessons in short bursts. Perfect for busy schedules and maintaining momentum.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-purple-600 text-white text-xl">
                    🎤
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Voice Coding
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Say "paragraph" and get {`<p></p>`}. Code hands-free when typing is difficult.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-orange-600 text-white text-xl">
                    🧠
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Smart Hints
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Get help exactly when you need it. Progressive hints guide you without giving away answers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Start Learning Today
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Join thousands learning to code on their phones. Try our interactive demo and see why mobile-first learning works.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/lessons-demo"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Try Interactive Demo
              </a>
              <a href="#how-it-works" className="text-sm font-semibold leading-6 text-white">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
