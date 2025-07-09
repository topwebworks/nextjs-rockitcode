import { Book, Bookshelf } from "@/components/bookshelf";
import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbSeparator,
  Breadcrumbs,
} from "@/components/breadcrumbs";
import { CenteredPageLayout } from "@/components/centered-layout";
import { ContentLink } from "@/components/content-link";
import { PageSection } from "@/components/page-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning Resources - RockitCode",
  description:
    "A curated collection of coding resources, tools, and guides to accelerate your programming journey.",
};

export default function Page() {
  return (
    <CenteredPageLayout
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbHome />
          <BreadcrumbSeparator />
          <Breadcrumb>Resources</Breadcrumb>
        </Breadcrumbs>
      }
    >
      <h1 className="mt-10 text-3xl/10 font-normal tracking-tight text-gray-950 sm:mt-14 dark:text-white">
        Learning Resources
      </h1>
      <p className="mt-6 max-w-xl text-base/7 text-gray-600 dark:text-gray-400">
        A curated collection of coding resources, tools, and guides to accelerate your programming journey and career development.
      </p>

      <div className="mt-16 space-y-16">
        <PageSection title={<h2>Essential Tools</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Professional development tools every coder should know.
          </p>
          <div className="mt-8 max-w-2xl space-y-6">
            <ContentLink
              type="article"
              title="Visual Studio Code Setup"
              description="Complete guide to setting up VS Code for web development."
              href="#"
            />
            <ContentLink
              type="article"
              title="Git & GitHub Essentials"
              description="Version control fundamentals for coding projects."
              href="#"
            />
            <ContentLink
              type="article"
              title="Chrome DevTools Mastery"
              description="Debug and optimize your code like a professional."
              href="#"
            />
          </div>
        </PageSection>

        <PageSection title={<h2>Practice Platforms</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Interactive platforms to sharpen your coding skills.
          </p>
          <div className="mt-8 max-w-2xl space-y-6">
            <ContentLink
              type="article"
              title="Codepen for Frontend"
              description="Build and share HTML, CSS, and JavaScript projects."
              href="#"
            />
            <ContentLink
              type="article"
              title="LeetCode Challenges"
              description="Algorithm and data structure practice problems."
              href="#"
            />
            <ContentLink
              type="article"
              title="JavaScript30"
              description="30 days of vanilla JavaScript coding challenges."
              href="#"
            />
          </div>
        </PageSection>

        <PageSection title={<h2>Career Resources</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Resources for landing your first developer job.
          </p>
          <div className="mt-8 max-w-2xl space-y-6">
            <ContentLink
              type="article"
              title="Portfolio Building Guide"
              description="Create a portfolio that gets you hired."
              href="#"
            />
            <ContentLink
              type="article"
              title="Technical Interview Prep"
              description="Common coding interview questions and strategies."
              href="#"
            />
            <ContentLink
              type="article"
              title="Resume Templates"
              description="Developer resume templates and writing tips."
              href="#"
            />
          </div>
        </PageSection>

        <PageSection title={<h2>Recommended Books</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Essential reading for aspiring and professional developers.
          </p>
          <Bookshelf className="mt-8">
            <Book
              title="Clean Code"
              author="Robert C. Martin"
              imageUrl="/images/books/clean-code.jpg"
              imageWidth={1024}
              imageHeight={1280}
              href="#"
            />
            <Book
              title="The Pragmatic Programmer"
              author="David Thomas & Andrew Hunt"
              imageUrl="/images/books/pragmatic-programmer.jpg"
              imageWidth={1024}
              imageHeight={1536}
              href="#"
            />
            <Book
              title="JavaScript: The Good Parts"
              author="Douglas Crockford"
              imageUrl="/images/books/js-good-parts.jpg"
              imageWidth={1024}
              imageHeight={1280}
              href="#"
            />
            <Book
              title="You Don't Know JS"
              author="Kyle Simpson"
              imageUrl="/images/books/you-dont-know-js.jpg"
              imageWidth={1024}
              imageHeight={1536}
              href="#"
            />
          </Bookshelf>
        </PageSection>

        <PageSection title={<h2>Learning Paths</h2>}>
          <p className="text-sm/8 text-gray-600 dark:text-gray-400">
            Structured learning paths for different coding specializations.
          </p>
          <div className="mt-8 max-w-2xl space-y-6">
            <ContentLink
              type="article"
              title="Frontend Developer Roadmap"
              description="Complete path from beginner to professional frontend developer."
              href="#"
            />
            <ContentLink
              type="article"
              title="Backend Developer Path"
              description="Server-side development with Node.js, Python, and databases."
              href="#"
            />
            <ContentLink
              type="article"
              title="Full-Stack Journey"
              description="Combine frontend and backend skills for complete web development."
              href="#"
            />
          </div>
        </PageSection>
      </div>
    </CenteredPageLayout>
  );
}
