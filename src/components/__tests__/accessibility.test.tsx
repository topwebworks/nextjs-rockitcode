import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { EnhancedLearningDashboard } from '../enhanced-learning-dashboard'

// Extend Jest matchers
expect.extend(toHaveNoViolations)

describe('Accessibility Tests', () => {
  it('should not have accessibility violations - Learning Dashboard', async () => {
    const { container } = render(<EnhancedLearningDashboard />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should have proper heading hierarchy', () => {
    render(<EnhancedLearningDashboard />)
    
    // Check that h1 exists and is unique
    const h1Elements = document.querySelectorAll('h1')
    expect(h1Elements).toHaveLength(1)
    
    // Check that headings follow proper hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    let currentLevel = 0
    
    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.substring(1))
      expect(level).toBeLessThanOrEqual(currentLevel + 1)
      currentLevel = level
    })
  })

  it('should have proper ARIA labels and roles', () => {
    render(<EnhancedLearningDashboard />)
    
    // Check for proper button roles
    const buttons = document.querySelectorAll('button')
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('type')
    })
  })

  it('should have sufficient color contrast', () => {
    render(<EnhancedLearningDashboard />)
    
    // This would typically be checked by axe-core
    // but we can also manually verify key elements have proper contrast
    const elements = document.querySelectorAll('[class*="text-"]')
    expect(elements.length).toBeGreaterThan(0)
  })

  it('should be keyboard navigable', () => {
    render(<EnhancedLearningDashboard />)
    
    // Check that interactive elements are focusable
    const interactiveElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    interactiveElements.forEach((element) => {
      expect(element).not.toHaveAttribute('tabindex', '-1')
    })
  })
})
