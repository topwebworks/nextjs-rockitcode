import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid'

export default function Centered() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
        <p className="text-base/7 font-semibold text-indigo-600">Course curriculum</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
          HTML & CSS fundamentals
        </h1>
        <p className="mt-6 text-xl/8">
          Learn to build beautiful, responsive websites from scratch. This comprehensive course covers everything from basic HTML structure to advanced CSS animations and modern layout techniques.
        </p>
        <div className="mt-10 max-w-2xl">
          <p>
            Start your web development journey with HTML and CSS - the foundation of every website. You'll learn semantic HTML, accessibility best practices, and modern CSS techniques including Flexbox, Grid, and responsive design.
          </p>
          <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
            <li className="flex gap-x-3">
              <CheckCircleIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" />
              <span>
                <strong className="font-semibold text-gray-900">Semantic HTML structure.</strong> Learn to write clean, accessible HTML that search engines love and screen readers can navigate easily.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" />
              <span>
                <strong className="font-semibold text-gray-900">Modern CSS layouts.</strong> Master Flexbox and CSS Grid to create responsive layouts that work on any device size.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" />
              <span>
                <strong className="font-semibold text-gray-900">CSS animations and transitions.</strong> Add polish to your websites with smooth animations and interactive hover effects.
              </span>
            </li>
          </ul>
          <p className="mt-8">
            Each lesson includes hands-on coding exercises where you'll build real website components. By the end, you'll have created a complete portfolio website showcasing your new skills.
          </p>
          <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900">
            From zero to building websites in just 4 weeks
          </h2>
          <p className="mt-6">
            Our structured approach takes you from complete beginner to confident web developer. Start with basic HTML tags and progress to complex layouts and animations. Perfect pacing for busy schedules.
          </p>
          <figure className="mt-10 border-l border-indigo-600 pl-9">
            <blockquote className="font-semibold text-gray-900">
              <p>
                "I went from knowing nothing about web development to building my own website in just a month. The course is perfectly structured and the projects are actually fun to build!"
              </p>
            </blockquote>
            <figcaption className="mt-6 flex gap-x-4">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="size-6 flex-none rounded-full bg-gray-50"
              />
              <div className="text-sm/6">
                <strong className="font-semibold text-gray-900">Sarah Chen</strong> – Career Switcher
              </div>
            </figcaption>
          </figure>
          <p className="mt-10">
            Join thousands of students who have successfully launched their web development careers with RockitCode. Our proven curriculum and supportive community will guide you every step of the way.
          </p>
        </div>
        <figure className="mt-16">
          <img
            alt="Student coding on laptop"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3"
            className="aspect-video rounded-xl bg-gray-50 object-cover"
          />
          <figcaption className="mt-4 flex gap-x-2 text-sm/6 text-gray-500">
            <InformationCircleIcon aria-hidden="true" className="mt-0.5 size-5 flex-none text-gray-300" />
            Students working on their portfolio projects in our interactive coding environment.
          </figcaption>
        </figure>
        <div className="mt-16 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900">
            Everything you need to start your web development journey
          </h2>
          <p className="mt-6">
            No prior experience required. We provide all the tools, resources, and support you need. Start coding immediately in your browser - no software to download or install.
          </p>
          <p className="mt-8">
            Build a strong foundation with HTML and CSS, then progress to JavaScript and modern frameworks. Our curriculum is designed to get you job-ready as quickly as possible while ensuring you understand the fundamentals.
          </p>
        </div>
      </div>
    </div>
  )
}
