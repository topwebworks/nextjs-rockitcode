# Compass Theme Alignment - Improvement Plan

## ✅ Already Fixed
- Typography: Changed to use Compass custom `.prose` class
- Dark mode: Full theme toggle working
- Image switching: Scheme-based image replacement working

## 🎯 Priority Improvements Needed

### 1. **Code Block Styling**
- Current: Using Shiki with Tailwind CSS theme
- Compass: Custom dark code blocks with specific styling
- **Action**: Verify code blocks match Compass theme exactly

### 2. **HTMLPlayground Component Styling** 
- Current: Modern but might not match Compass exactly
- **Action**: Adjust colors, borders, spacing to match Compass components
- **Focus**: Browser chrome, panel layout, typography

### 3. **Lesson Content Layout**
- Current: Basic structure matches
- **Improvements needed**:
  - Image spacing and borders
  - Content width and margins
  - Heading hierarchy and spacing
  - Link styling consistency

### 4. **Video Component**
- Current: Using YouTubeEmbed with PiP
- Compass: Uses custom Video component
- **Action**: Style YouTube embed to match Compass video player

### 5. **Interactive Elements**
- Current: HTMLPlayground is unique to our site
- **Action**: Ensure it feels integrated with Compass design language
- **Focus**: Button styles, borders, shadows, typography

### 6. **Sidebar Navigation**
- Current: Basic structure
- **Action**: Verify lesson navigation matches Compass exactly
- **Focus**: Active states, hover effects, typography

### 7. **Table of Contents**
- Current: Using existing TOC component
- **Action**: Verify styling matches Compass lessons

### 8. **Next Page Links**
- Current: Using Compass NextPageLink component
- **Status**: Should already match

## 🔧 Implementation Priority

1. **High Priority**: Code blocks, HTMLPlayground styling
2. **Medium Priority**: Content spacing, image styling  
3. **Low Priority**: Minor typography tweaks

## 📋 Testing Checklist

- [ ] Code blocks look identical to Compass lessons
- [ ] HTMLPlayground feels native to Compass design
- [ ] Images have proper spacing and borders
- [ ] Typography hierarchy matches exactly
- [ ] Dark/light mode transitions smoothly
- [ ] Interactive elements feel consistent
- [ ] Mobile responsive design works perfectly