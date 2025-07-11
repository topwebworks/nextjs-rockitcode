export default function PrivacyNoticeBanner() {
  return (
    <div className="bg-indigo-600 px-6 py-2.5 sm:px-3.5">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm/6 text-white">
          <strong className="font-semibold">Privacy Notice</strong>
          <svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline h-0.5 w-0.5 fill-current">
            <circle r={1} cx={1} cy={1} />
          </svg>
          We use cookies to enhance your learning experience and provide personalized content.
        </p>
        <div className="flex flex-1 justify-end gap-x-3">
          <button
            type="button"
            className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
          >
            <span className="sr-only">Dismiss</span>
            <span className="text-sm font-semibold text-white">Dismiss</span>
          </button>
          <a
            href="#"
            className="flex-none rounded-full bg-white px-3.5 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-gray-100"
          >
            Learn more <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  )
}
