export default function WithBackgroundImage() {
  return (
    <main className="relative isolate min-h-full">
      {/* Background image with coding theme */}
      <div 
        className="absolute inset-0 -z-10 size-full bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3Ccircle cx='53' cy='7' r='7'/%3E%3Ccircle cx='30' cy='30' r='7'/%3E%3Ccircle cx='7' cy='53' r='7'/%3E%3Ccircle cx='53' cy='53' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
        <p className="text-base/8 font-semibold text-white">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-white/70 sm:text-xl/8">
          Looks like this code path doesn&apos;t exist. Let&apos;s get you back to learning!
        </p>
        <div className="mt-10 flex justify-center gap-x-6">
          <a 
            href="/" 
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span aria-hidden="true">&larr;</span> Back to home
          </a>
          <a 
            href="/courses" 
            className="rounded-md border border-white/30 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Browse courses
          </a>
        </div>
      </div>
    </main>
  )
}
