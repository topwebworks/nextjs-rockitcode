import { Metadata } from 'next'
import GitHubLearningJourney from '@/components/lessons/github-basics/GitHubLearningJourney'

export const metadata: Metadata = {
  title: 'Chapter 2: Git & GitHub Getting Started | RockitCode Foundation Course',
  description: 'Chapter 2 of the Foundation Course: Learn the fundamentals of Git version control and GitHub with beginner-friendly lessons covering installation, basic commands, and repository management.',
  keywords: ['Git basics', 'GitHub tutorial', 'version control', 'beginner git', 'chapter 2', 'foundation course'],
}

export default function Chapter2GitPage() {
  return <GitHubLearningJourney />
}
