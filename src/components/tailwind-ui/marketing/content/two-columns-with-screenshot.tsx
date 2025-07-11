export default function TwoColumnsWithScreenshot() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <p className="text-base/7 font-semibold text-indigo-600">Learn Python programming</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
            From beginner to building real applications
          </h1>
          <div className="mt-10 grid max-w-xl grid-cols-1 gap-8 text-base/7 text-gray-700 lg:max-w-none lg:grid-cols-2">
            <div>
              <p>
                Python is the perfect first programming language. Our comprehensive course teaches you Python fundamentals through practical projects and real-world applications. You'll learn data structures, algorithms, and object-oriented programming.
              </p>
              <p className="mt-8">
                Build everything from simple scripts to web applications. Our hands-on approach means you'll be writing useful programs from day one, with projects that demonstrate each new concept you learn.
              </p>
            </div>
            <div>
              <p>
                Master Python's most important libraries including NumPy for data analysis, Flask for web development, and matplotlib for data visualization. Each module includes practical exercises and portfolio projects.
              </p>
              <p className="mt-8">
                Our structured curriculum takes you through variables, control structures, functions, classes, file handling, and API integration. By course completion, you'll be ready for advanced topics or job interviews.
              </p>
            </div>
          </div>
          <div className="mt-10 flex">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Start Python course
            </a>
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden pt-16 lg:pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <img
            alt="Python programming course interface"
            src="https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png"
            className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
          />
          <div aria-hidden="true" className="relative">
            <div className="absolute -inset-x-20 bottom-0 bg-linear-to-t from-white pt-[7%]" />
          </div>
        </div>
      </div>
    </div>
  )
}
