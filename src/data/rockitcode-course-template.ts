import { RockitCourse } from './rockitcode-courses';

/**
 * TEMPLATE: Use this as a starting point for new courses
 * 
 * Steps to add a new course:
 * 1. Copy this template
 * 2. Update the course details
 * 3. Add lessons to each milestone
 * 4. Add to the main rockitCourses array
 * 5. Create lesson MDX files in /data/rockitcode-lessons/[course-id]/
 */

export const COURSE_TEMPLATE: RockitCourse = {
  id: "new-course-id", // URL-friendly, lowercase with hyphens
  title: "Course Title",
  description: "Brief description of what students will learn",
  difficulty: "beginner", // beginner | intermediate | advanced
  estimatedHours: 15, // Total course time
  icon: "🚀", // Emoji icon for the course
  color: "bg-blue-500", // Tailwind color class
  category: "programming", // web | programming | data | mobile | backend
  prerequisites: [], // Array of course IDs that should be completed first
  tags: ["tag1", "tag2", "tag3"], // For search and filtering
  isActive: true, // Set to false to hide course
  milestones: [
    {
      id: "new-course-milestone-1",
      title: "Milestone 1 Title",
      description: "What students learn in this milestone",
      order: 1,
      isPaid: false, // Milestone 1 is always free
      lessons: [
        {
          id: "lesson-1-id",
          title: "Lesson 1 Title", 
          description: "What this lesson teaches",
          order: 1,
          estimatedMinutes: 45,
          video: {
            youtubeId: "VIDEO_ID_HERE", // YouTube video ID (part after watch?v=)
            duration: 2700, // Duration in seconds
            thumbnail: "https://img.youtube.com/vi/VIDEO_ID_HERE/maxresdefault.jpg"
          },
          codeExamples: [
            {
              title: "Example Title",
              language: "javascript", // Language for syntax highlighting
              code: `// Your code example here
console.log("Hello, RockitCode!");`,
              explanation: "Explanation of what this code does"
            }
          ],
          exercises: [
            {
              title: "Practice Exercise",
              description: "What the student should build/do",
              starterCode: "// Starting code (optional)",
              solution: "// Complete solution",
              hints: [
                "Helpful hint 1",
                "Helpful hint 2"
              ]
            }
          ],
          embeds: [
            {
              type: "codepen", // codepen | replit | stackblitz | codesandbox
              url: "https://codepen.io/pen/example",
              title: "Interactive Practice"
            }
          ]
        }
        // Add more lessons here (up to 10 per milestone)
      ]
    },
    {
      id: "new-course-milestone-2", 
      title: "Milestone 2 Title",
      description: "Advanced concepts",
      order: 2,
      isPaid: true, // Milestones 2 & 3 are paid
      lessons: [
        // Lessons 11-20 go here
      ]
    },
    {
      id: "new-course-milestone-3",
      title: "Milestone 3 Title", 
      description: "Expert level content",
      order: 3,
      isPaid: true, // Milestones 2 & 3 are paid
      lessons: [
        // Lessons 21-30 go here
      ]
    }
  ]
};

/**
 * FUTURE COURSE IDEAS (just add when ready):
 * 
 * Web Development:
 * - React Fundamentals
 * - Vue.js Basics
 * - Node.js Backend
 * - Database Design
 * 
 * Programming:
 * - Java Fundamentals
 * - C++ Basics
 * - Go Programming
 * 
 * Data:
 * - SQL Databases
 * - Data Analysis with Python
 * - Excel/Spreadsheet Mastery
 * 
 * Mobile:
 * - React Native
 * - Flutter Basics
 * - iOS Swift
 * 
 * Backend:
 * - API Development
 * - Cloud Computing
 * - DevOps Basics
 */
