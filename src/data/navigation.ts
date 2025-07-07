import { getRockitCourses, type RockitCourse } from './rockitcode-courses';
import { getModules, type Module } from './lessons';

export type NavigationSection = {
  id: string;
  title: string;
  description: string;
  type: 'template' | 'rockit-course' | 'general';
  items: NavigationItem[];
};

export type NavigationItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'lesson' | 'course' | 'page';
  icon?: string;
  color?: string;
  isActive?: boolean;
  estimatedMinutes?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
  isPaid?: boolean;
  children?: NavigationItem[];
};

// Convert template modules to navigation format
function convertTemplateModulesToNavigation(modules: Module[]): NavigationSection[] {
  return modules.map(module => ({
    id: module.id,
    title: module.title,
    description: module.description,
    type: 'template' as const,
    items: module.lessons.map(lesson => ({
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      url: `/${lesson.id}`,
      type: 'lesson' as const,
      estimatedMinutes: lesson.video?.duration ? Math.ceil(lesson.video.duration / 60) : undefined,
    }))
  }));
}

// Convert RockitCode courses to navigation format
function convertRockitCoursesToNavigation(courses: RockitCourse[]): NavigationSection[] {
  return courses.map(course => ({
    id: course.id,
    title: course.title,
    description: course.description,
    type: 'rockit-course' as const,
    items: [
      // Course landing page
      {
        id: `${course.id}-overview`,
        title: 'Course Overview',
        description: 'Course introduction and roadmap',
        url: `/${course.id}`,
        type: 'page' as const,
        icon: course.icon,
        color: course.color,
        difficulty: course.difficulty,
        category: course.category,
      },
      // Lessons from all milestones
      ...course.milestones.flatMap(milestone => 
        milestone.lessons.map(lesson => ({
          id: lesson.id,
          title: lesson.title,
          description: lesson.description,
          url: `/learn/${course.id}/${lesson.id}`,
          type: 'lesson' as const,
          estimatedMinutes: lesson.estimatedMinutes,
          isPaid: milestone.isPaid,
        }))
      )
    ]
  }));
}

// Get all navigation sections
export function getNavigationSections(): NavigationSection[] {
  const sections: NavigationSection[] = [];

  // Add RockitCode courses section
  const rockitCourses = getRockitCourses();
  if (rockitCourses.length > 0) {
    sections.push({
      id: 'rockit-courses',
      title: 'RockitCode Courses',
      description: 'Interactive coding courses with hands-on projects',
      type: 'general',
      items: rockitCourses.map(course => ({
        id: course.id,
        title: course.title,
        description: course.description,
        url: `/${course.id}`,
        type: 'course' as const,
        icon: course.icon,
        color: course.color,
        difficulty: course.difficulty,
        category: course.category,
        estimatedMinutes: course.estimatedHours * 60,
      }))
    });
  }

  // Add template lessons sections
  const templateModules = getModules();
  const templateSections = convertTemplateModulesToNavigation(templateModules);
  sections.push(...templateSections);

  // Add additional general pages
  sections.push({
    id: 'general-pages',
    title: 'Resources & Tools',
    description: 'Additional learning resources and tools',
    type: 'general',
    items: [
      {
        id: 'components-demo',
        title: 'Components Demo',
        description: 'Interactive showcase of all RockitCode components',
        url: '/components-demo',
        type: 'page' as const,
        icon: '🧩',
      },
      {
        id: 'interviews',
        title: 'Developer Interviews',
        description: 'Learn from experienced developers',
        url: '/interviews',
        type: 'page' as const,
        icon: '🎙️',
      },
      {
        id: 'resources',
        title: 'Learning Resources',
        description: 'Curated resources for developers',
        url: '/resources',
        type: 'page' as const,
        icon: '📚',
      }
    ]
  });

  return sections;
}

// Get navigation for a specific section
export function getNavigationSection(sectionId: string): NavigationSection | null {
  return getNavigationSections().find(section => section.id === sectionId) || null;
}

// Get flat list of all navigation items (for search, etc.)
export function getAllNavigationItems(): NavigationItem[] {
  return getNavigationSections().flatMap(section => section.items);
}

// Search navigation items
export function searchNavigationItems(query: string): NavigationItem[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllNavigationItems().filter(item => 
    item.title.toLowerCase().includes(lowercaseQuery) ||
    item.description.toLowerCase().includes(lowercaseQuery) ||
    item.category?.toLowerCase().includes(lowercaseQuery)
  );
}

// Get navigation breadcrumbs for current path
export function getNavigationBreadcrumbs(pathname: string): { title: string; url: string }[] {
  const breadcrumbs: { title: string; url: string }[] = [];
  
  // Add home
  breadcrumbs.push({ title: 'Home', url: '/' });
  
  // Find matching navigation item
  const allItems = getAllNavigationItems();
  const currentItem = allItems.find(item => item.url === pathname);
  
  if (currentItem) {
    // Find parent section
    const parentSection = getNavigationSections().find(section => 
      section.items.some(item => item.id === currentItem.id)
    );
    
    if (parentSection && parentSection.type === 'rockit-course') {
      // For RockitCode lessons, add course breadcrumb
      const courseMatch = pathname.match(/^\/learn\/([^\/]+)\/([^\/]+)$/);
      if (courseMatch) {
        const [, courseId] = courseMatch;
        breadcrumbs.push({ title: 'Courses', url: '#' });
        breadcrumbs.push({ title: currentItem.title, url: `/${courseId}` });
      }
    } else if (parentSection && parentSection.type === 'template') {
      // For template lessons, add module breadcrumb
      breadcrumbs.push({ title: parentSection.title, url: '#' });
    }
    
    // Add current page (only if it's not already the last item)
    if (breadcrumbs[breadcrumbs.length - 1].url !== pathname) {
      breadcrumbs.push({ title: currentItem.title, url: pathname });
    }
  }
  
  return breadcrumbs;
}
