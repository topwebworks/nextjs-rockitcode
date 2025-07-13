import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EnhancedLearningDashboard } from '../enhanced-learning-dashboard'

// Mock localStorage for tests
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

describe('EnhancedLearningDashboard', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue(null)
    localStorageMock.setItem.mockClear()
    localStorageMock.removeItem.mockClear()
    localStorageMock.clear.mockClear()
  })

  it('renders the main heading', () => {
    render(<EnhancedLearningDashboard />)
    expect(screen.getByText('🎯 Learning Mission Center')).toBeInTheDocument()
  })

  it('displays the mission intelligence section', () => {
    render(<EnhancedLearningDashboard />)
    expect(screen.getByText('📊 Mission Intelligence')).toBeInTheDocument()
    expect(screen.getByText('Missions Active')).toBeInTheDocument()
    expect(screen.getByText('Lessons Complete')).toBeInTheDocument()
    expect(screen.getByText('Overall Progress')).toBeInTheDocument()
    expect(screen.getByText('Day Streak')).toBeInTheDocument()
  })

  it('displays course cards', () => {
    render(<EnhancedLearningDashboard />)
    expect(screen.getByText('HTML & CSS Fundamentals')).toBeInTheDocument()
    expect(screen.getByText('JavaScript Essentials')).toBeInTheDocument()
    expect(screen.getByText('Python Programming')).toBeInTheDocument()
  })

  it('allows starting a course', async () => {
    const user = userEvent.setup()
    render(<EnhancedLearningDashboard />)
    
    const startButton = screen.getAllByText('🚀 Start Mission')[0]
    await user.click(startButton)
    
    // Should save progress to localStorage
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'course-progress',
      expect.stringContaining('html-css')
    )
  })

  it('displays course technologies', () => {
    render(<EnhancedLearningDashboard />)
    expect(screen.getByText('HTML5')).toBeInTheDocument()
    expect(screen.getByText('CSS3')).toBeInTheDocument()
    expect(screen.getByText('ES6+')).toBeInTheDocument()
    expect(screen.getByText('Python 3')).toBeInTheDocument()
  })

  it('shows next steps section', () => {
    render(<EnhancedLearningDashboard />)
    expect(screen.getByText('🎯 Next Steps')).toBeInTheDocument()
    expect(screen.getByText('Interview Prep')).toBeInTheDocument()
    expect(screen.getByText('Build Projects')).toBeInTheDocument()
    expect(screen.getByText('Developer Resources')).toBeInTheDocument()
  })

  it('loads saved progress from localStorage', () => {
    const mockProgress = JSON.stringify([
      {
        courseId: 'html-css',
        lessonsCompleted: 5,
        totalLessons: 12,
        completionPercentage: 42,
        currentLesson: 'css-basics'
      }
    ])
    
    localStorageMock.getItem.mockReturnValue(mockProgress)
    
    render(<EnhancedLearningDashboard />)
    
    expect(localStorageMock.getItem).toHaveBeenCalledWith('course-progress')
  })

  it('displays correct difficulty levels', () => {
    render(<EnhancedLearningDashboard />)
    expect(screen.getByText('Beginner')).toBeInTheDocument()
    expect(screen.getByText('Intermediate')).toBeInTheDocument()
  })

  it('shows course durations', () => {
    render(<EnhancedLearningDashboard />)
    expect(screen.getByText('4-6 hours')).toBeInTheDocument()
    expect(screen.getByText('8-10 hours')).toBeInTheDocument()
    expect(screen.getByText('10-12 hours')).toBeInTheDocument()
  })
})
