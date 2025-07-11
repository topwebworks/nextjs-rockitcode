const posts = [
  {
    id: 1,
    title: 'Master JavaScript Array Methods in 2024',
    href: '#',
    description:
      'Learn the most powerful JavaScript array methods including map, filter, reduce, and forEach. Complete with practical examples and coding exercises to solidify your understanding.',
    date: 'Jan 15, 2025',
    datetime: '2025-01-15',
    category: { title: 'JavaScript', href: '#' },
    author: {
      name: 'Sarah Chen',
      role: 'Senior JavaScript Instructor',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: 'CSS Grid vs Flexbox: When to use each layout method',
    href: '#',
    description: 'Understanding the differences between CSS Grid and Flexbox. Learn when to use each layout method with real-world examples and best practices.',
    date: 'Jan 10, 2025',
    datetime: '2025-01-10',
    category: { title: 'CSS', href: '#' },
    author: {
      name: 'Alex Rodriguez',
      role: 'CSS Expert & UI Developer',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 3,
    title: 'Python Data Structures: Lists, Tuples, and Dictionaries',
    href: '#',
    description:
      'Master Python\'s core data structures with practical examples. Learn when to use lists vs tuples vs dictionaries and common operations for each type.',
    date: 'Jan 8, 2025',
    datetime: '2025-01-08',
    category: { title: 'Python', href: '#' },
    author: {
      name: 'Dr. Maya Patel',
      role: 'Python Instructor & Data Scientist',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
]

export default function ThreeColumn() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Latest coding tutorials</h2>
          <p className="mt-2 text-lg/8 text-gray-600">Learn new programming concepts with our step-by-step tutorials and expert insights.</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.datetime} className="text-gray-500">
                  {post.date}
                </time>
                <a
                  href={post.category.href}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {post.category.title}
                </a>
              </div>
              <div className="group relative grow">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <a href={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{post.description}</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                <img alt="" src={post.author.imageUrl} className="size-10 rounded-full bg-gray-50" />
                <div className="text-sm/6">
                  <p className="font-semibold text-gray-900">
                    <a href={post.author.href}>
                      <span className="absolute inset-0" />
                      {post.author.name}
                    </a>
                  </p>
                  <p className="text-gray-600">{post.author.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
