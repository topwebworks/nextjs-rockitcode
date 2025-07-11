import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'

export default function BottomAlignedBanner() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8">
      <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-gray-900 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
        <p className="text-sm/6 text-white">
          <CheckCircleIcon aria-hidden="true" className="-mt-0.5 mr-3 inline h-5 w-5 text-green-400" />
          <strong className="font-semibold">Course Progress Saved!</strong>
          <svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline h-0.5 w-0.5 fill-current">
            <circle r={1} cx={1} cy={1} />
          </svg>
          You&apos;ve completed 3 out of 8 lessons in React Fundamentals.
        </p>
        <button type="button" className="-m-1.5 flex-none p-1.5">
          <span className="sr-only">Dismiss</span>
          <XMarkIcon aria-hidden="true" className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  )
}
