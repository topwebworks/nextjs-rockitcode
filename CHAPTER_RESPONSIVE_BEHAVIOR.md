# Chapter Button Responsive Behavior

## 🎯 Feature Overview

The video player now intelligently hides chapter buttons when the video is displayed in smaller views to maintain a clean, uncluttered interface.

## 📱 Responsive Behavior

### Automatic Size Detection
- **Large Videos**: Full chapter buttons with timestamps and titles
- **Medium Videos**: Smaller chapter buttons, still fully functional
- **Small Videos**: Chapter buttons hidden completely
- **Auto-responsive**: Chapters automatically hide when container < 400px wide or < 200px tall

### Manual Control
- `size` prop: 'small' | 'medium' | 'large'
- `showChapters` prop: boolean to force show/hide
- Combines both manual and automatic logic

### Visual Feedback
- When chapters are hidden, a small indicator (📚 N) appears in the top-right corner
- Hover tooltip shows "N chapters available (hidden in small view)"
- Maintains user awareness of available navigation options

## 🛠️ Implementation Details

### VideoPlayer Component Props
```tsx
interface VideoPlayerProps {
  // ...existing props
  showChapters?: boolean // Control chapter visibility
  size?: 'small' | 'medium' | 'large' // Size hint for responsive behavior
}
```

### Usage in Synchronized Learning
- **Full Video Mode**: `size="large"`, `showChapters={true}`
- **Split View Mode**: `size="medium"`, `showChapters={true}`
- **Mini Video Mode**: `size="small"`, `showChapters={false}`

### Automatic Detection
- Uses ResizeObserver to monitor container dimensions
- Hides chapters when width < 400px or height < 200px
- Maintains performance with efficient observer cleanup

## 🎨 UI Adaptations

### Chapter Button Sizes
- **Large**: Full-size buttons with timestamp and title
- **Medium**: Compact buttons, reduced padding
- **Small**: Hidden entirely with indicator

### YouTube vs Local Videos
- **YouTube**: Overlay chapter buttons positioned above iframe
- **Local Videos**: Control bar chapter navigation buttons
- Both implementations respect the responsive logic

## 🧪 Testing

Visit `/chapter-test` to see interactive testing of:
- Different video sizes (small, medium, large)
- Manual chapter visibility toggle
- Automatic responsive behavior
- Visual feedback when chapters are hidden

## 📋 Examples

### Mini Video (Chapters Hidden)
```tsx
<VideoPlayer
  src={video.url}
  chapters={video.chapters}
  size="small"
  showChapters={false}
  className="w-80 h-48"
/>
```

### Split View (Compact Chapters)
```tsx
<VideoPlayer
  src={video.url}
  chapters={video.chapters}
  size="medium"
  showChapters={true}
  className="w-96 h-56"
/>
```

### Full View (Full Chapters)
```tsx
<VideoPlayer
  src={video.url}
  chapters={video.chapters}
  size="large"
  showChapters={true}
  className="w-full"
/>
```

This enhancement ensures that the learning experience remains clean and focused across all viewing modes while preserving quick navigation capabilities when space allows.
