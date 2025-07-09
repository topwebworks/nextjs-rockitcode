// RockitCode Developer Success Stories
export type DeveloperStory = {
  id: string;
  name: string;
  role: string;
  company: string;
  subtitle: string;
  story: string;
  skills: string[];
  careerPath: string;
  testimonial?: string;
  timeToLanding?: string;
  previousRole?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
};

export function getDeveloperStories(): DeveloperStory[] {
  return [
    {
      id: 'sarah-chen',
      name: 'Sarah Chen',
      role: 'Full-Stack Developer',
      company: 'TechStart Inc.',
      subtitle: 'From Marketing to Full-Stack Developer in 8 Months',
      story: 'Sarah transitioned from marketing to becoming a full-stack developer using RockitCode\'s comprehensive curriculum. She now builds scalable web applications and leads a development team.',
      skills: ['React', 'Node.js', 'PostgreSQL', 'Express', 'AWS'],
      careerPath: 'Marketing Manager → RockitCode Student → Junior Developer → Full-Stack Developer',
      testimonial: 'RockitCode\'s hands-on approach and real-world projects gave me the confidence to make the leap into tech.',
      timeToLanding: '8 months',
      previousRole: 'Marketing Manager'
    },
    {
      id: 'marcus-rodriguez',
      name: 'Marcus Rodriguez',
      role: 'Frontend Developer',
      company: 'Creative Digital Agency',
      subtitle: 'Building Beautiful UIs with Modern React',
      story: 'Marcus mastered modern frontend development through RockitCode and now creates stunning user interfaces for major brands.',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Figma'],
      careerPath: 'Graphic Designer → Frontend Developer → Senior UI Developer',
      testimonial: 'The visual learning approach and practical projects helped everything click for me.',
      timeToLanding: '6 months',
      previousRole: 'Graphic Designer'
    },
    {
      id: 'priya-patel',
      name: 'Priya Patel',
      role: 'Backend Engineer',
      company: 'FinTech Solutions',
      subtitle: 'Mastering API Development and Database Design',
      story: 'Priya specialized in backend development and now builds secure, scalable APIs for financial applications.',
      skills: ['Node.js', 'Python', 'MongoDB', 'Docker', 'Kubernetes'],
      careerPath: 'CS Graduate → RockitCode Backend Track → Junior Backend Engineer → Senior Backend Engineer',
      testimonial: 'RockitCode made complex backend concepts accessible and gave me real project experience.',
      timeToLanding: '4 months',
      previousRole: 'CS Graduate'
    },
    {
      id: 'david-kim',
      name: 'David Kim',
      role: 'DevOps Engineer',
      company: 'CloudScale Solutions',
      subtitle: 'From IT Support to Cloud Infrastructure Expert',
      story: 'David leveraged his IT background and RockitCode\'s DevOps track to become a cloud infrastructure specialist.',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
      careerPath: 'IT Support → RockitCode DevOps Track → Junior DevOps → DevOps Engineer',
      testimonial: 'The hands-on cloud projects at RockitCode prepared me for real-world DevOps challenges.',
      timeToLanding: '7 months',
      previousRole: 'IT Support Specialist'
    },
    {
      id: 'jennifer-wilson',
      name: 'Jennifer Wilson',
      role: 'Software Engineer',
      company: 'EdTech Innovations',
      subtitle: 'Career Transition at 35: Teacher to Software Engineer',
      story: 'After 10 years in education, Jennifer successfully transitioned to software engineering using RockitCode\'s structured learning path.',
      skills: ['Python', 'Django', 'JavaScript', 'SQL', 'React'],
      careerPath: 'High School Teacher → RockitCode Student → Junior Developer → Software Engineer',
      testimonial: 'RockitCode made complex concepts accessible and gave me a clear roadmap to follow.',
      timeToLanding: '10 months',
      previousRole: 'High School Teacher'
    }
  ];
}

export function getDeveloperStory(id: string): DeveloperStory | null {
  const stories = getDeveloperStories();
  return stories.find(story => story.id === id) || null;
}
