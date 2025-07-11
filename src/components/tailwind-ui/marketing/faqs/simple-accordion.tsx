'use client'

import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "How long does it take to complete a course?",
    answer:
      "Our courses are designed to be flexible. Most students complete our HTML/CSS course in 2-4 weeks, JavaScript in 4-6 weeks, and Python in 6-8 weeks when studying 1-2 hours per day.",
  },
  {
    question: "Do I need any prior programming experience?",
    answer:
      "Not at all! Our courses are designed for complete beginners. We start from the very basics and gradually build up your skills. Our interactive approach makes complex concepts easy to understand.",
  },
  {
    question: "What makes RockitCode different from other coding platforms?",
    answer:
      "RockitCode focuses on practical, project-based learning with real-time feedback. Our courses include live coding exercises, personalized mentorship, and career-focused projects that you can add to your portfolio.",
  },
  {
    question: "Can I get help if I'm stuck on a lesson?",
    answer:
      "Absolutely! We offer multiple support channels including live chat, community forums, and one-on-one mentorship sessions. Our instructors are available to help you overcome any challenges.",
  },
  {
    question: "What happens after I complete a course?",
    answer:
      "Upon completion, you'll receive a certificate and access to our career services including portfolio reviews, interview preparation, and job placement assistance. Many of our graduates land their first tech job within 3-6 months.",
  },
  {
    question: "Is there a money-back guarantee?",
    answer:
      "Yes! We offer a 30-day money-back guarantee. If you're not satisfied with your learning experience, we'll provide a full refund with no questions asked.",
  },
]

export default function SimpleAccordion() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          <ChevronDownIcon
                            className={`h-6 w-6 transform ${open ? 'rotate-180' : ''} transition-transform duration-200`}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
