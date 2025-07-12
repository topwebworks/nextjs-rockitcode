# Editor Settings Guide

## Overview

RockitCode provides a flexible editor settings system that allows learners to customize their coding experience based on their skill level and preferences. The system includes three predefined layouts and fine-grained controls for individual features.

## Editor Layouts

### 📝 Simple Layout
- **Target Audience**: Complete beginners, young learners
- **Features**: 
  - Clean code editor
  - Output panel for results
  - Line numbers
  - Basic syntax highlighting
- **Philosophy**: Minimal distractions, focus on writing and running code

### 💻 Standard Layout  
- **Target Audience**: Learning programmers, students
- **Features**:
  - File explorer sidebar
  - Code editor with IntelliSense
  - Output panel
  - Status bar with file info
  - Error detection
- **Philosophy**: Balanced experience with essential development tools

### 🚀 Advanced Layout
- **Target Audience**: Experienced learners, professional practice
- **Features**:
  - Full activity bar
  - File explorer
  - Minimap navigation
  - All keyboard shortcuts
  - Status bar
  - Command palette
  - Professional VS Code experience
- **Philosophy**: Complete development environment

## How to Switch Layouts

### Method 1: Settings Button
1. Click the "Editor Settings" button when in code mode
2. Choose your preferred layout from the panel
3. Settings save automatically

### Method 2: Quick Settings Dropdown
1. Click the gear icon (⚙️) in the toolbar
2. Select Simple, Standard, or Advanced
3. Layout switches immediately

### Method 3: Keyboard Shortcuts
- `Alt + 1` - Switch to Simple layout
- `Alt + 2` - Switch to Standard layout  
- `Alt + 3` - Switch to Advanced layout

## Fine-Grained Controls

In addition to layouts, you can toggle individual features:

- **Minimap**: Bird's eye view of your code
- **Keyboard Shortcuts**: Enable/disable VS Code shortcuts
- **Theme**: Light or dark editor theme
- **Line Numbers**: Show/hide line numbers
- **Sidebar**: File explorer visibility
- **Activity Bar**: Left sidebar with icons
- **Status Bar**: Bottom information bar
- **Output Panel**: Code execution results

## Persistence

All settings are automatically saved to browser localStorage and persist across:
- Different lessons
- Browser sessions
- Page reloads

## First-Time Experience

New users see a brief tutorial explaining the layout options and how to switch between them. This tutorial can be dismissed and won't show again.

## Technical Implementation

### Components
- `EditorSettingsProvider` - React context for settings state
- `EditorSettingsButton` - Full settings panel
- `QuickSettings` - Compact dropdown
- `EditorTutorial` - First-time user guide

### Settings Structure
```typescript
interface EditorSettings {
  layout: 'simple' | 'standard' | 'advanced'
  showActivityBar: boolean
  showSidebar: boolean
  showStatusBar: boolean
  showMinimap: boolean
  showOutput: boolean
  showLineNumbers: boolean
  enableKeyboardShortcuts: boolean
  theme: 'vs-light' | 'vs-dark'
}
```

### Integration
The Monaco editor component receives settings as props and updates its interface accordingly. The settings context provides keyboard shortcuts and automatic persistence.

## Usage in Lessons

Enhanced lessons automatically include:
- Quick settings dropdown in the toolbar
- Full settings panel on desktop
- Tutorial for new users
- Keyboard shortcuts

The editor respects the current settings and provides a consistent experience across all coding exercises.
