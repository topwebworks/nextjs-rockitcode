'use client';

import React from 'react';

// 🎯 MARKETING COMPONENTS - Hero Sections
export const CourseHeroSection = () => (
  <div className="bg-white">
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            New course: Advanced React Patterns. <a href="#" className="font-semibold text-indigo-600"><span className="absolute inset-0" />Read more <span aria-hidden="true">&rarr;</span></a>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Master Coding with Interactive Lessons
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Learn programming through hands-on projects, real-time feedback, and a supportive community. 
            Build your portfolio while mastering in-demand skills.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a href="#" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Start Learning Free
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Watch Demo <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 🎯 MARKETING COMPONENTS - Feature Sections
export const PlatformFeaturesSection = () => (
  <div className="overflow-hidden bg-white py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div className="lg:pr-8 lg:pt-4">
          <div className="lg:max-w-lg">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Learn faster</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Interactive coding education
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Experience the future of coding education with our revolutionary block-based learning system.
            </p>
            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
              <div className="relative pl-9">
                <dt className="inline font-semibold text-gray-900">
                  <svg className="absolute left-1 top-1 h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z" clipRule="evenodd" />
                  </svg>
                  Interactive Code Editor.
                </dt>
                <dd className="inline"> Write, test, and debug code directly in your browser with instant feedback.</dd>
              </div>
              <div className="relative pl-9">
                <dt className="inline font-semibold text-gray-900">
                  <svg className="absolute left-1 top-1 h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                  </svg>
                  Real-time Assessment.
                </dt>
                <dd className="inline"> Get immediate feedback on your code with automated testing and hints.</dd>
              </div>
              <div className="relative pl-9">
                <dt className="inline font-semibold text-gray-900">
                  <svg className="absolute left-1 top-1 h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z" />
                    <path fillRule="evenodd" d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z" clipRule="evenodd" />
                  </svg>
                  Portfolio Building.
                </dt>
                <dd className="inline"> Build real projects that showcase your skills to potential employers.</dd>
              </div>
            </dl>
          </div>
        </div>
        <img src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png" alt="Product screenshot" className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0" width={2432} height={1442} />
      </div>
    </div>
  </div>
);

// 🎯 MARKETING COMPONENTS - Pricing Sections
export const CoursePricingSection = () => (
  <div className="bg-white py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl sm:text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Choose your learning path</h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Start for free or unlock premium features to accelerate your coding journey.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
        <div className="p-8 sm:p-10 lg:flex-auto">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">Free Learner</h3>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Perfect for getting started with coding fundamentals and exploring our platform.
          </p>
          <div className="mt-10 flex items-center gap-x-4">
            <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">What's included</h4>
            <div className="h-px flex-auto bg-gray-100" />
          </div>
          <ul className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
            <li className="flex gap-x-3">
              <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
              5 foundational courses
            </li>
            <li className="flex gap-x-3">
              <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
              Basic code editor
            </li>
            <li className="flex gap-x-3">
              <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
              Community access
            </li>
            <li className="flex gap-x-3">
              <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
              Progress tracking
            </li>
          </ul>
        </div>
        <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
          <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
            <div className="mx-auto max-w-xs px-8">
              <p className="text-base font-semibold text-gray-600">Start learning today</p>
              <p className="mt-6 flex items-baseline justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-gray-900">Free</span>
              </p>
              <a href="#" className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Get started
              </a>
              <p className="mt-6 text-xs leading-5 text-gray-600">
                No credit card required. Start coding in minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 💻 APPLICATION UI - Progress Tracking
export const LearningProgressDashboard = () => (
  <div className="bg-white py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Track Your Learning Progress
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Visual progress tracking keeps you motivated and on track to achieve your coding goals.
          </p>
        </div>
        <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col bg-gray-400/5 p-8">
            <dt className="text-sm font-semibold leading-6 text-gray-600">Courses Completed</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">12</dd>
          </div>
          <div className="flex flex-col bg-gray-400/5 p-8">
            <dt className="text-sm font-semibold leading-6 text-gray-600">Hours Coded</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">89</dd>
          </div>
          <div className="flex flex-col bg-gray-400/5 p-8">
            <dt className="text-sm font-semibold leading-6 text-gray-600">Projects Built</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">24</dd>
          </div>
          <div className="flex flex-col bg-gray-400/5 p-8">
            <dt className="text-sm font-semibold leading-6 text-gray-600">Skills Mastered</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">7</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
);

// 💻 APPLICATION UI - Course Catalog Table
export const CourseManagerTable = () => (
  <div className="px-4 sm:px-6 lg:px-8">
    <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h1 className="text-base font-semibold leading-6 text-gray-900">Course Catalog</h1>
        <p className="mt-2 text-sm text-gray-700">
          Browse and manage your courses, track progress, and access learning materials.
        </p>
      </div>
      <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button type="button" className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Enroll in Course
        </button>
      </div>
    </div>
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Course
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Instructor
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Duration
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Progress
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr>
                <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                  <div className="flex items-center">
                    <div className="h-11 w-11 flex-shrink-0">
                      <div className="h-11 w-11 rounded-lg bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-semibold">HTML</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">HTML & CSS Fundamentals</div>
                      <div className="mt-1 text-gray-500">Learn the building blocks of web development</div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div className="text-gray-900">Sarah Johnson</div>
                  <div className="mt-1 text-gray-500">Senior Developer</div>
                </td>
                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">8 hours</td>
                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="ml-2 text-sm">75%</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    In Progress
                  </span>
                </td>
                <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Continue<span className="sr-only">, HTML & CSS Fundamentals</span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

// Export all components for easy import
export const TailwindUIShowcase = {
  CourseHeroSection,
  PlatformFeaturesSection,
  CoursePricingSection,
  LearningProgressDashboard,
  CourseManagerTable,
};
