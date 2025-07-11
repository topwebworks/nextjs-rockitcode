import { StarIcon } from '@heroicons/react/20/solid'

interface TestimonialWithStarRatingProps {
  rating?: number
  quote?: string
  authorName?: string
  authorTitle?: string
  authorImage?: string
}

export default function TestimonialWithStarRating({
  rating = 5,
  quote = "Qui dolor enim consectetur do et non ex amet culpa sint in ea non dolore. Enim minim magna anim id minim eu cillum sunt dolore aliquip. Amet elit laborum culpa irure incididunt adipisicing culpa amet officia exercitation. Eu non aute velit id velit Lorem elit anim pariatur.",
  authorName = "Judith Black",
  authorTitle = "CEO of Workcation",
  authorImage = "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80"
}: TestimonialWithStarRatingProps) {
  return (
    <section className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <figure className="mx-auto max-w-2xl">
        <p className="sr-only">{rating} out of 5 stars</p>
        <div className="flex gap-x-1 text-indigo-600">
          {[...Array(5)].map((_, i) => (
            <StarIcon 
              key={i}
              aria-hidden="true" 
              className={`size-5 flex-none ${i < rating ? 'text-indigo-600' : 'text-gray-300'}`} 
            />
          ))}
        </div>
        <blockquote className="mt-10 text-xl/8 font-semibold tracking-tight text-gray-900 sm:text-2xl/9">
          <p>
            "{quote}"
          </p>
        </blockquote>
        <figcaption className="mt-10 flex items-center gap-x-6">
          <img
            alt=""
            src={authorImage}
            className="size-12 rounded-full bg-gray-50"
          />
          <div className="text-sm/6">
            <div className="font-semibold text-gray-900">{authorName}</div>
            <div className="mt-0.5 text-gray-600">{authorTitle}</div>
          </div>
        </figcaption>
      </figure>
    </section>
  )
}
