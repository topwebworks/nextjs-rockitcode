// RockitCode Design System
// Leveraging FULL Tailwind UI Plus Library (500+ components)

import React from 'react';

// 🎯 MARKETING COMPONENTS (for landing pages, pricing, etc.)
// Source: https://tailwindcss.com/plus/ui-blocks/marketing/

export const HeroSection = () => (
  <div className="relative isolate overflow-hidden bg-white">
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
        <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Learn to Code Like a Pro
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Master programming with our interactive, block-based learning platform. 
          Build real projects, get instant feedback, and join a community of learners.
        </p>
        <div className="mt-10 flex items-center gap-x-6">
          <a
            href="#"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Start Learning
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Watch Demo <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  </div>
);

// 📊 STATS SECTION (show learning metrics)
export const StatsSection = () => (
  <div className="bg-white py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
        <div className="mx-auto flex max-w-xs flex-col gap-y-4">
          <dt className="text-base leading-7 text-gray-600">Students Learning</dt>
          <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            50,000+
          </dd>
        </div>
        <div className="mx-auto flex max-w-xs flex-col gap-y-4">
          <dt className="text-base leading-7 text-gray-600">Projects Built</dt>
          <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            125,000+
          </dd>
        </div>
        <div className="mx-auto flex max-w-xs flex-col gap-y-4">
          <dt className="text-base leading-7 text-gray-600">Success Rate</dt>
          <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            94%
          </dd>
        </div>
      </dl>
    </div>
  </div>
);

// 🎯 APPLICATION UI COMPONENTS (for learning interface)
// Source: https://tailwindcss.com/plus/ui-blocks/application-ui/

// Progress Bar from Application UI
export const LessonProgressBar = ({ progress }: { progress: number }) => (
  <div>
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-900">Lesson Progress</p>
      <p className="text-sm text-gray-600">{progress}%</p>
    </div>
    <div className="mt-2">
      <div className="overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  </div>
);

// Table from Application UI (for course catalog)
export const CourseTable = () => (
  <div className="mt-8 flow-root">
    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Course
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Duration
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Level
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Progress
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">HTML & CSS Foundations</div>
                    <div className="text-gray-500">Learn the basics of web development</div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                8 hours
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                  Beginner
                </span>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                85%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// Modal from Application UI (for interactive exercises)
export const CodeChallengeModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443a55.381 55.381 0 015.25 2.882V15" />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Challenge Completed!
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Great job! You've successfully completed this coding challenge. 
                  You've earned 50 XP points.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={onClose}
            >
              Continue Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
