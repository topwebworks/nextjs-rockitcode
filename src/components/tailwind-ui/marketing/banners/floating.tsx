import { MegaphoneIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function FloatingBanner() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 px-6 pb-6">
      <div className="pointer-events-auto ml-auto max-w-xl rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-900/10">
        <div className="flex">
          <div className="flex-shrink-0">
            <MegaphoneIcon aria-hidden="true" className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="ml-3 w-0 flex-1">
            <h3 className="text-sm font-medium text-gray-900">Live Coding Session Tomorrow!</h3>
            <p className="mt-1 text-sm text-gray-500">
              Join us for a live React coding session tomorrow at 2 PM EST. We&apos;ll be building a real-world project from scratch.
            </p>
            <div className="mt-4 flex">
              <div className="flex">
                <a
                  href="#"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Register now
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </div>
              <div className="ml-6 flex">
                <button
                  type="button"
                  className="text-sm font-medium text-gray-500 hover:text-gray-400"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button type="button" className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500">
              <span className="sr-only">Close</span>
              <XMarkIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
