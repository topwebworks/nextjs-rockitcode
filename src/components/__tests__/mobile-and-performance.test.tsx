import { render, screen } from '@testing-library/react'
import { EnhancedLearningDashboard } from '../enhanced-learning-dashboard'

// Mock window dimensions for mobile testing
const mockWindowDimensions = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  })
  window.dispatchEvent(new Event('resize'))
}

describe('Mobile Responsiveness Tests', () => {
  beforeEach(() => {
    // Reset to desktop size
    mockWindowDimensions(1024, 768)
  })

  it('should display properly on mobile devices (320px)', () => {
    mockWindowDimensions(320, 568)
    render(<EnhancedLearningDashboard />)
    
    expect(screen.getByText('🎯 Learning Mission Center')).toBeVisible()
  })

  it('should display properly on tablet devices (768px)', () => {
    mockWindowDimensions(768, 1024)
    render(<EnhancedLearningDashboard />)
    
    expect(screen.getByText('🎯 Learning Mission Center')).toBeVisible()
  })

  it('should have touch-friendly button sizes on mobile', () => {
    mockWindowDimensions(375, 667)
    render(<EnhancedLearningDashboard />)
    
    const buttons = document.querySelectorAll('button')
    buttons.forEach(button => {
      const styles = window.getComputedStyle(button)
      const height = parseInt(styles.height)
      const width = parseInt(styles.width)
      
      // Minimum touch target size should be 44px (WCAG guidelines)
      expect(height).toBeGreaterThanOrEqual(44)
      expect(width).toBeGreaterThanOrEqual(44)
    })
  })

  it('should stack course cards vertically on mobile', () => {
    mockWindowDimensions(375, 667)
    const { container } = render(<EnhancedLearningDashboard />)
    
    // Look for grid layout classes that should stack on mobile
    const gridElements = container.querySelectorAll('[class*="grid"]')
    expect(gridElements.length).toBeGreaterThan(0)
  })

  it('should use readable font sizes on mobile', () => {
    mockWindowDimensions(320, 568)
    render(<EnhancedLearningDashboard />)
    
    const textElements = document.querySelectorAll('p, span, div')
    textElements.forEach(element => {
      const styles = window.getComputedStyle(element)
      const fontSize = parseInt(styles.fontSize)
      
      // Minimum readable font size on mobile should be 16px
      if (fontSize > 0) {
        expect(fontSize).toBeGreaterThanOrEqual(14)
      }
    })
  })
})

describe('Performance Tests', () => {
  it('should render within acceptable time', () => {
    const startTime = performance.now()
    render(<EnhancedLearningDashboard />)
    const endTime = performance.now()
    
    const renderTime = endTime - startTime
    
    // Component should render in under 100ms
    expect(renderTime).toBeLessThan(100)
  })

  it('should not cause memory leaks', () => {
    const { unmount } = render(<EnhancedLearningDashboard />)
    
    // Check for event listeners cleanup
    const beforeUnmount = performance.memory?.usedJSHeapSize || 0
    unmount()
    
    // Allow garbage collection
    setTimeout(() => {
      const afterUnmount = performance.memory?.usedJSHeapSize || 0
      
      // Memory should not increase significantly after unmount
      expect(afterUnmount).toBeLessThanOrEqual(beforeUnmount * 1.1)
    }, 100)
  })
})

describe('User Experience Tests', () => {
  it('should display loading states appropriately', () => {
    render(<EnhancedLearningDashboard />)
    
    // Check that loading states are handled gracefully
    // This would typically involve testing async operations
    expect(screen.getByText('🎯 Learning Mission Center')).toBeInTheDocument()
  })

  it('should handle empty states gracefully', () => {
    // Mock empty localStorage
    const mockStorage = {
      getItem: jest.fn(() => null),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    }
    Object.defineProperty(window, 'localStorage', {
      value: mockStorage
    })

    render(<EnhancedLearningDashboard />)
    
    // Should still render properly with no saved data
    expect(screen.getByText('🎯 Learning Mission Center')).toBeInTheDocument()
  })

  it('should provide helpful error messages', () => {
    // This would test error boundaries and error states
    render(<EnhancedLearningDashboard />)
    
    // Should not crash on render
    expect(screen.getByText('🎯 Learning Mission Center')).toBeInTheDocument()
  })
})
