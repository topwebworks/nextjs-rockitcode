'use client'

import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const leftColumnFaqs = [
  {
    question: "Getting Started",
    answer:
      "Begin with our HTML/CSS fundamentals course. No prior experience needed - we'll guide you through setting up your development environment and writing your first lines of code.",
  },
  {
    question: "Course Structure",
    answer:
      "Each course includes video lessons, hands-on coding exercises, real-world projects, and interactive quizzes. Progress at your own pace with 24/7 access to all materials.",
  },
  {
    question: "Time Commitment",
    answer:
      "Most students study 1-2 hours per day. Our bite-sized lessons fit into busy schedules, and you can pause and resume anytime.",
  },
]

const rightColumnFaqs = [
  {
    question: "Career Support",
    answer:
      "We provide resume reviews, mock interviews, portfolio guidance, and access to our job board with partner companies actively hiring our graduates.",
  },
  {
    question: "Certification",
    answer:
      "Earn industry-recognized certificates upon course completion. Our certificates are accepted by leading tech companies and can boost your career prospects.",
  },
  {
    question: "Community Access",
    answer:
      "Join our active community of 10,000+ learners and alumni. Network, collaborate on projects, and get peer support throughout your coding journey.",
  },
]

export default function TwoColumn() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to know
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Have questions about our courses? We've got answers. Can't find what you're looking for?{' '}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Contact our support team
            </a>
            .
          </p>
        </div>
        <div className="mx-auto mt-20 max-w-4xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
            <div>
              <dl className="space-y-6 divide-y divide-gray-900/10">
                {leftColumnFaqs.map((faq) => (
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
            <div>
              <dl className="space-y-6 divide-y divide-gray-900/10">
                {rightColumnFaqs.map((faq) => (
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
      </div>
    </div>
  )
}
