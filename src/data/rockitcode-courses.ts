export type RockitCourse = {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  icon: string;
  color: string;
  category: 'web' | 'programming' | 'data' | 'mobile' | 'backend'; // NEW: Easy categorization
  prerequisites: string[]; // NEW: Course dependencies
  tags: string[]; // NEW: For filtering/search
  isActive: boolean; // NEW: Enable/disable courses
  milestones: RockitMilestone[];
};

export type RockitMilestone = {
  id: string;
  title: string;
  description: string;
  order: number;
  isPaid: boolean;
  lessons: RockitLesson[];
};

export type RockitLesson = {
  id: string;
  title: string;
  description: string;
  order: number;
  estimatedMinutes: number;
  video: {
    youtubeId: string;
    duration: number;
    thumbnail: string;
  } | null;
  codeExamples: {
    title: string;
    language: string;
    code: string;
    explanation: string;
  }[];
  exercises: {
    title: string;
    description: string;
    starterCode?: string;
    solution: string;
    hints: string[];
  }[];
  embeds: {
    type: 'codepen' | 'replit' | 'stackblitz' | 'codesandbox'; // NEW: More embed options
    url: string;
    title: string;
  }[];
};

export function getRockitCourses(): RockitCourse[] {
  return rockitCourses.filter(course => course.isActive);
}

export function getRockitCoursesByCategory(category: RockitCourse['category']): RockitCourse[] {
  return getRockitCourses().filter(course => course.category === category);
}

export function getRockitCoursesByDifficulty(difficulty: RockitCourse['difficulty']): RockitCourse[] {
  return getRockitCourses().filter(course => course.difficulty === difficulty);
}

export function searchRockitCourses(query: string): RockitCourse[] {
  const lowercaseQuery = query.toLowerCase();
  return getRockitCourses().filter(course => 
    course.title.toLowerCase().includes(lowercaseQuery) ||
    course.description.toLowerCase().includes(lowercaseQuery) ||
    course.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

export async function getRockitCourse(courseId: string): Promise<RockitCourse | null> {
  return rockitCourses.find(course => course.id === courseId && course.isActive) || null;
}

export async function getRockitLesson(
  courseId: string, 
  lessonId: string
): Promise<(RockitLesson & { 
  course: RockitCourse; 
  milestone: RockitMilestone;
  next: RockitLesson | null;
  previous: RockitLesson | null;
}) | null> {
  const course = await getRockitCourse(courseId);
  if (!course) return null;

  // Find the lesson across all milestones
  let foundMilestone: RockitMilestone | null = null;
  let lessonIndex = -1;
  let allLessons: RockitLesson[] = [];

  // Build flat list of all lessons for navigation
  course.milestones.forEach(milestone => {
    milestone.lessons.forEach(lesson => {
      allLessons.push(lesson);
      if (lesson.id === lessonId) {
        foundMilestone = milestone;
        lessonIndex = allLessons.length - 1;
      }
    });
  });

  if (!foundMilestone || lessonIndex === -1) return null;

  const lesson = allLessons[lessonIndex];
  
  return {
    ...lesson,
    course,
    milestone: foundMilestone,
    next: lessonIndex < allLessons.length - 1 ? allLessons[lessonIndex + 1] : null,
    previous: lessonIndex > 0 ? allLessons[lessonIndex - 1] : null,
  };
}

export async function getRockitLessonContent(courseId: string, lessonId: string) {
  try {
    return (await import(`@/data/rockitcode-lessons/${courseId}/${lessonId}.mdx`)).default;
  } catch {
    return null;
  }
}

const rockitCourses: RockitCourse[] = [
  {
    id: "html-css",
    title: "HTML & CSS Fundamentals",
    description: "Master the building blocks of the web. Learn to create beautiful, responsive websites from scratch.",
    difficulty: "beginner",
    estimatedHours: 15,
    icon: "🎨",
    color: "bg-orange-500",
    category: "web",
    prerequisites: [], // No prerequisites for beginner course
    tags: ["web development", "frontend", "design", "responsive"],
    isActive: true,
    milestones: [
      {
        id: "html-css-milestone-1",
        title: "Web Foundations",
        description: "Learn HTML structure and basic CSS styling",
        order: 1,
        isPaid: false, // FREE milestone
        lessons: [
          {
            id: "html-basics",
            title: "HTML Structure & Elements",
            description: "Understanding the skeleton of web pages",
            order: 1,
            estimatedMinutes: 45,
            video: {
              youtubeId: "UB1O30fR-EE", // Placeholder - replace with actual YouTube video
              duration: 2700, // 45 minutes in seconds
              thumbnail: "https://img.youtube.com/vi/UB1O30fR-EE/maxresdefault.jpg"
            },
            codeExamples: [
              {
                title: "Basic HTML Document",
                language: "html",
                code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <h1>Welcome to RockitCode!</h1>
    <p>This is your first HTML document.</p>
</body>
</html>`,
                explanation: "Every HTML document starts with this basic structure. The DOCTYPE tells the browser this is HTML5."
              }
            ],
            exercises: [
              {
                title: "Create Your First Page",
                description: "Build a simple HTML page about yourself with a heading and paragraph.",
                starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>About Me</title>
</head>
<body>
    <!-- Add your content here -->
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>About Me</title>
</head>
<body>
    <h1>About Me</h1>
    <p>Hi! I'm learning HTML with RockitCode.</p>
</body>
</html>`,
                hints: [
                  "Use an <h1> tag for your main heading",
                  "Use a <p> tag for your paragraph",
                  "Remember to close all your tags!"
                ]
              }
            ],
            embeds: [
              {
                type: "codepen",
                url: "https://codepen.io/pen?template=zYqQGpg", // Placeholder
                title: "HTML Basics Practice"
              }
            ]
          },
          // Additional lessons for milestone 1...
          {
            id: "css-basics",
            title: "CSS Styling Fundamentals",
            description: "Add colors, fonts, and layouts to your HTML",
            order: 2,
            estimatedMinutes: 50,
            video: null, // No video for this lesson
            codeExamples: [
              {
                title: "Basic CSS Styling",
                language: "css",
                code: `body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 20px;
}

h1 {
    color: #333;
    text-align: center;
}

p {
    color: #666;
    line-height: 1.6;
}`,
                explanation: "CSS controls how your HTML looks. We're styling the body, headings, and paragraphs."
              }
            ],
            exercises: [
              {
                title: "Style Your Page",
                description: "Add CSS to make your HTML page look beautiful.",
                hints: [
                  "Link your CSS file in the <head> section",
                  "Try changing colors with the 'color' property",
                  "Use 'font-family' to change fonts"
                ],
                solution: `/* Complete CSS solution here */`
              }
            ],
            embeds: []
          }
        ]
      },
      {
        id: "html-css-milestone-2",
        title: "Responsive Design",
        description: "Make websites that work on all devices",
        order: 2,
        isPaid: true, // PAID milestone
        lessons: [
          // Lessons 11-20 would go here
        ]
      },
      {
        id: "html-css-milestone-3",
        title: "Advanced Layouts",
        description: "Master Flexbox, Grid, and modern CSS",
        order: 3,
        isPaid: true, // PAID milestone
        lessons: [
          // Lessons 21-30 would go here
        ]
      }
    ]
  },
  {
    id: "javascript",
    title: "JavaScript Programming",
    description: "Bring your websites to life with interactive JavaScript. From basics to building real applications.",
    difficulty: "beginner",
    estimatedHours: 20,
    icon: "⚡",
    color: "bg-yellow-500",
    category: "programming",
    prerequisites: ["html-css"], // Recommend HTML/CSS first
    tags: ["programming", "interactive", "web development", "frontend"],
    isActive: true,
    milestones: [
      {
        id: "javascript-milestone-1",
        title: "JavaScript Fundamentals",
        description: "Variables, functions, and basic programming concepts",
        order: 1,
        isPaid: false, // FREE milestone
        lessons: [
          {
            id: "js-variables",
            title: "Variables and Data Types",
            description: "Store and work with different types of data",
            order: 1,
            estimatedMinutes: 40,
            video: null,
            codeExamples: [
              {
                title: "JavaScript Variables",
                language: "javascript",
                code: `// Different ways to declare variables
let name = "Alex";
const age = 25;
var city = "New York";

// Different data types
let isStudent = true;        // Boolean
let score = 95.5;           // Number
let hobbies = ["coding", "reading"]; // Array`,
                explanation: "Variables store data. Use 'let' for changeable values, 'const' for constants."
              }
            ],
            exercises: [
              {
                title: "Create Your Variables",
                description: "Practice declaring variables for different data types.",
                hints: [
                  "Use 'let' for values that might change",
                  "Use 'const' for values that stay the same",
                  "Try storing numbers, text, and true/false values"
                ],
                solution: `// Sample solution here`
              }
            ],
            embeds: []
          }
        ]
      }
    ]
  },
  {
    id: "python",
    title: "Python Programming",
    description: "Learn the most beginner-friendly programming language. Perfect for automation, data, and more.",
    difficulty: "beginner",
    estimatedHours: 18,
    icon: "🐍",
    color: "bg-green-500",
    category: "programming",
    prerequisites: [], // Python is beginner-friendly, no prerequisites
    tags: ["programming", "automation", "data science", "beginner-friendly"],
    isActive: true,
    milestones: [
      {
        id: "python-milestone-1",
        title: "Python Basics",
        description: "Variables, functions, and Python fundamentals",
        order: 1,
        isPaid: false, // FREE milestone
        lessons: [
          {
            id: "python-intro",
            title: "Getting Started with Python",
            description: "Your first Python program and basic syntax",
            order: 1,
            estimatedMinutes: 35,
            video: null,
            codeExamples: [
              {
                title: "Hello Python",
                language: "python",
                code: `# Your first Python program
print("Hello, RockitCode!")

# Variables in Python
name = "Alex"
age = 25
is_learning = True

print(f"Hi {name}, you are {age} years old!")`,
                explanation: "Python is clean and readable. Notice how simple it is compared to other languages!"
              }
            ],
            exercises: [
              {
                title: "Your First Python Program",
                description: "Write a program that introduces yourself.",
                hints: [
                  "Use print() to display text",
                  "Use variables to store your information",
                  "Try using f-strings for formatting"
                ],
                solution: `# Sample solution here`
              }
            ],
            embeds: [
              {
                type: "replit",
                url: "https://replit.com/@rockitcode/python-intro", // Placeholder
                title: "Python Introduction Practice"
              }
            ]
          }
        ]
      }
    ]
  }
];
