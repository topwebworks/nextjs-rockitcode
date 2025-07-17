import { Metadata } from 'next'
import VSCodeLearningJourney from '@/components/lessons/vscode-basics/VSCodeLearningJourney'

export const metadata: Metadata = {
  title: 'Chapter 1: VSCode Getting Started | RockitCode Foundation Course',
  description: 'Chapter 1 of the Foundation Course: Learn the fundamentals of VSCode with beginner-friendly lessons covering installation, workspace setup, extensions, and basic terminal usage.',
  keywords: ['VSCode basics', 'Visual Studio Code tutorial', 'beginner development environment', 'code editor fundamentals', 'chapter 1', 'foundation course'],
}

export default function Chapter1VSCodePage() {
  return <VSCodeLearningJourney />
}
