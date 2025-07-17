import { Metadata } from 'next'
import VSCodeLearningJourney from '@/components/lessons/vscode-basics/VSCodeLearningJourney'

export const metadata: Metadata = {
  title: 'VSCode Getting Started: Learn Your Development Environment | RockitCode',
  description: 'Learn the fundamentals of VSCode with beginner-friendly lessons covering installation, workspace setup, extensions, and basic terminal usage.',
  keywords: ['VSCode basics', 'Visual Studio Code tutorial', 'beginner development environment', 'code editor fundamentals', 'getting started programming'],
}

export default function VSCodeBasicsPage() {
  return <VSCodeLearningJourney />
}
