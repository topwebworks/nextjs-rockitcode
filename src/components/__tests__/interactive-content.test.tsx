import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { InteractiveCodeBlock, InteractiveQuiz, ProgressTracker } from '../interactive-content'

describe('InteractiveCodeBlock', () => {
  const mockProps = {
    language: 'javascript',
    code: 'console.log("Hello World");',
    explanation: ['This code prints Hello World to the console'],
    editable: true
  }

  it('renders code block with syntax highlighting', () => {
    render(<InteractiveCodeBlock {...mockProps} />)
    expect(screen.getByText('console.log("Hello World");')).toBeInTheDocument()
  })

  it('displays explanation text', () => {
    render(<InteractiveCodeBlock {...mockProps} />)
    expect(screen.getByText('This code prints Hello World to the console')).toBeInTheDocument()
  })

  it('shows edit button when editable', () => {
    render(<InteractiveCodeBlock {...mockProps} />)
    expect(screen.getByText('✏️ Edit Code')).toBeInTheDocument()
  })

  it('does not show edit button when not editable', () => {
    render(<InteractiveCodeBlock {...mockProps} editable={false} />)
    expect(screen.queryByText('✏️ Edit Code')).not.toBeInTheDocument()
  })
})

describe('InteractiveQuiz', () => {
  const mockQuiz = {
    id: 'test-quiz',
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 1,
    explanation: '2 + 2 equals 4'
  }

  const mockOnAnswer = jest.fn()

  beforeEach(() => {
    mockOnAnswer.mockClear()
  })

  it('renders quiz question', () => {
    render(<InteractiveQuiz quiz={mockQuiz} onAnswer={mockOnAnswer} />)
    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument()
  })

  it('renders all options', () => {
    render(<InteractiveQuiz quiz={mockQuiz} onAnswer={mockOnAnswer} />)
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('6')).toBeInTheDocument()
  })

  it('calls onAnswer when option is selected', async () => {
    const user = userEvent.setup()
    render(<InteractiveQuiz quiz={mockQuiz} onAnswer={mockOnAnswer} />)
    
    const correctOption = screen.getByText('4')
    await user.click(correctOption)
    
    expect(mockOnAnswer).toHaveBeenCalledWith(true)
  })

  it('shows explanation after answering', async () => {
    const user = userEvent.setup()
    render(<InteractiveQuiz quiz={mockQuiz} onAnswer={mockOnAnswer} />)
    
    const option = screen.getByText('4')
    await user.click(option)
    
    expect(screen.getByText('2 + 2 equals 4')).toBeInTheDocument()
  })
})

describe('ProgressTracker', () => {
  const mockProps = {
    currentLesson: 3,
    totalLessons: 10,
    completedLessons: [1, 2, 3],
    onLessonComplete: jest.fn()
  }

  it('displays progress information', () => {
    render(<ProgressTracker {...mockProps} />)
    expect(screen.getByText('Lesson 3 of 10')).toBeInTheDocument()
  })

  it('shows completion percentage', () => {
    render(<ProgressTracker {...mockProps} />)
    // 3 out of 10 lessons = 30%
    expect(screen.getByText('30%')).toBeInTheDocument()
  })

  it('displays correct number of completed lessons', () => {
    render(<ProgressTracker {...mockProps} />)
    expect(screen.getByText('3 lessons completed')).toBeInTheDocument()
  })
})
