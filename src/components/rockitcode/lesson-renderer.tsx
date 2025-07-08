'use client'

import React from 'react'
import { type RockitLesson } from '@/data/rockitcode-courses'
import { CodeDisplay, YouTubeEmbed } from '@/components/rockitcode'

interface RockitLessonRendererProps {
  lesson: RockitLesson
  courseId: string
  className?: string
}

export function RockitLessonRenderer({ 
  lesson, 
  courseId, 
  className = '' 
}: RockitLessonRendererProps) {
  return (
    <div className={className}>
      {/* Lesson Title and Description */}
      <h1>{lesson.title}</h1>
      <p className="lead text-xl text-gray-600 dark:text-gray-400">
        {lesson.description}
      </p>

      {/* Video Section */}
      {lesson.video && (
        <>
          <h2 id="video">Watch and Learn</h2>
          <p>Start by watching this video introduction to understand the key concepts we'll be covering.</p>
          <YouTubeEmbed
            videoId={lesson.video.youtubeId}
            title={lesson.title}
            onProgress={(progress) => {
              console.log(`Video progress: ${progress}%`)
            }}
          />
        </>
      )}

      {/* Visual Learning Aids */}
      {lesson.images && lesson.images.length > 0 && (
        <>
          <h2 id="visual-guides">Visual Learning Guides</h2>
          <p>These diagrams will help you understand the concepts visually before we dive into the code.</p>
          {lesson.images.map((image, index) => (
            <figure key={index} className="my-8">
              <img
                src={image.src}
                alt={image.alt}
                title={image.title}
                className="w-full rounded-lg shadow-lg"
                loading="lazy"
              />
              <figcaption className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
                <strong>{image.title}</strong>
                {image.caption && (
                  <>
                    <br />
                    {image.caption}
                  </>
                )}
              </figcaption>
            </figure>
          ))}
        </>
      )}

      {/* Code Examples */}
      {lesson.codeExamples.map((example, index) => (
        <React.Fragment key={index}>
          <h2 id={`example-${index + 1}`}>{example.title}</h2>
          <p>{example.explanation}</p>
          <CodeDisplay
            code={example.code}
            language={example.language}
            title={example.title}
            allowCopy={true}
          />
        </React.Fragment>
      ))}

      {/* Exercises */}
      {lesson.exercises.length > 0 && (
        <>
          <h2 id="practice-exercises">Practice Exercises</h2>
          <p>Now it's time to practice what you've learned! Complete these exercises to solidify your understanding.</p>
          
          {lesson.exercises.map((exercise, index) => (
            <div key={index} className="my-8">
              <h3 id={`exercise-${index + 1}`}>{exercise.title}</h3>
              <p>{exercise.description}</p>
              
              {exercise.starterCode && (
                <>
                  <h4>Starter Code</h4>
                  <p>Begin with this code template:</p>
                  <CodeDisplay
                    code={exercise.starterCode}
                    language="html"
                    title="Starter Code"
                    allowCopy={true}
                  />
                </>
              )}

              {exercise.hints.length > 0 && (
                <>
                  <h4>Hints</h4>
                  <ul>
                    {exercise.hints.map((hint, hintIndex) => (
                      <li key={hintIndex}>{hint}</li>
                    ))}
                  </ul>
                </>
              )}

              <details className="mt-4 p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-gray-100">
                  View Solution
                </summary>
                <div className="mt-4">
                  <CodeDisplay
                    code={exercise.solution}
                    language="html"
                    title="Solution"
                    allowCopy={true}
                  />
                </div>
              </details>
            </div>
          ))}
        </>
      )}

      {/* Interactive Playground */}
      {lesson.embeds.length > 0 && (
        <>
          <h2 id="interactive-playground">Interactive Playground</h2>
          <p>Experiment with the code in this interactive environment. Try making changes to see what happens!</p>
          
          {lesson.embeds.map((embed, index) => (
            <div key={index} className="my-8">
              <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800 px-4 py-3">
                  <p className="text-blue-800 dark:text-blue-200 text-sm font-medium">
                    🎮 {embed.title}
                  </p>
                  <p className="text-blue-600 dark:text-blue-300 text-xs mt-1">
                    Try editing the HTML code to see your changes in real-time!
                  </p>
                </div>
                <iframe
                  src={embed.url}
                  title={embed.title}
                  className="w-full h-96"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            </div>
          ))}
        </>
      )}

      {/* Summary */}
      <h2 id="lesson-summary">What You've Learned</h2>
      <p>Congratulations! In this lesson, you've learned:</p>
      <ul>
        <li>The basic structure of HTML documents</li>
        <li>How to use essential HTML elements like headings and paragraphs</li>
        <li>How HTML works like building blocks for web pages</li>
        <li>Hands-on practice creating your own web pages</li>
      </ul>
      <p>These fundamentals will serve as the foundation for everything else you'll learn in web development. Keep practicing and experimenting!</p>
    </div>
  )
}
