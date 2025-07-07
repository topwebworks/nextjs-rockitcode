# RockitCode.com - Project Roadmap

## 🎯 Core Vision
**"The easiest and fastest way to learn to code for any age (13+)"**
- Target: Foundational languages (HTML/CSS, JavaScript, Python)
- Platform: Vercel free tier hosting
- Audience: 13+ (avoid COPPA)

## 📋 Key Decisions Made

### Technical Stack
- ✅ TypeScript Next.js (Compass template)
- ✅ Vercel hosting (free tier)
- ✅ YouTube for videos (zero bandwidth cost)
- ✅ MDX for content (not headless CMS)
- ✅ No cloud backup services (cost control)
- ✅ Token-based analytics (no PII)

### Content Structure
- ✅ 3 Languages: HTML/CSS, JavaScript, Python
- ✅ 3 Milestones × 10 Lessons = 30 lessons per language
- ✅ Interactive coding via CodePen/Replit embeds + built-in editor
- ✅ GitHub account recommendations for portfolios

### User Experience
- ✅ 13+ only (legal simplicity)
- ✅ Single adaptive UI with customization
- ✅ Local storage for progress (no cloud backup)
- ✅ Gamification: badges, streaks, progress bars
- ✅ Freemium model ready

## 🏗️ Implementation Phases

### Phase 1: MVP Framework (CURRENT) - UNIFIED APPROACH
**Strategy: Use existing template structure, add only what's needed with clear naming**

**Foundation Complete:**
- ✅ Base npm modules installed (react-youtube, prism-react-renderer, use-local-storage-state)
- ✅ Development environment verified and working
- ✅ GitHub repository created: https://github.com/topwebworks/nextjs-rockitcode
- ✅ Clean baseline committed with template update protection

**Next Implementation Steps:**
- [ ] Add `rockitcode-courses.ts` data file (follows existing patterns)
- [ ] Create course pages in existing `(sidebar)/` structure
- [ ] Add `rockitcode-*` components (reuse existing UI patterns)
- [ ] Extend existing localStorage for progress tracking
- [ ] Add YouTube embed component
- [ ] Add CodePen/Replit embed components
- [ ] Create simple code display component

### Phase 2: Monetization Ready
- [ ] GitHub OAuth authentication
- [ ] Payment integration (Stripe)
- [ ] Content gating system
- [ ] Certificate generation
- [ ] Enhanced analytics (GTM)
- [ ] User dashboard

### Phase 3: Scale & Expand
- [ ] Additional languages
- [ ] Community features
- [ ] Corporate packages
- [ ] Advanced assessments
- [ ] Mobile optimization

## 📊 Success Metrics
- Lesson completion rates
- Time spent per lesson
- Free-to-paid conversion
- User engagement patterns
- Learning path popularity

## 🎮 Gamification Elements
- Progress bars per milestone
- Achievement badges
- Learning streaks
- Completion certificates
- Language mastery rings

## 💰 Monetization Strategy
**Free Tier:** Milestone 1 (10 lessons) for all languages
**Paid Tier:** Milestones 2 & 3 (lessons 11-30) + certificates + advanced features

## 🔧 Technical Strategy: Unified Template Approach

### Core Principle: Build ON Template, Don't Duplicate
- **Use existing structure**: All routes use current `(sidebar)/` layout
- **Add with naming convention**: Prefix new files with `rockitcode-` 
- **Leverage existing patterns**: Follow template's data, component, and routing patterns
- **Zero modifications**: Never change existing template files

### Unified File Organization
```
src/
├── data/
│   ├── lessons.ts (KEEP - original template lessons)
│   ├── interviews.ts (KEEP - original template interviews)
│   └── rockitcode-courses.ts (NEW - our coding courses, same patterns)
├── components/
│   ├── [all existing] (KEEP - button.tsx, navbar.tsx, etc.)
│   ├── rockitcode-course-card.tsx (NEW)
│   ├── rockitcode-code-display.tsx (NEW)
│   └── rockitcode-progress-bar.tsx (NEW)
└── app/
    └── (sidebar)/ (USE EXISTING - add new pages here)
        ├── page.tsx (KEEP - original home)
        ├── [slug]/ (KEEP - original lessons)
        ├── html-css/ (NEW - course landing)
        ├── javascript/ (NEW - course landing)
        ├── python/ (NEW - course landing)
        └── learn/
            └── [course]/
                └── [lesson]/ (NEW - lesson pages)
```

### URL Structure (Using Existing Patterns)
- **Home**: `/` (existing template home)
- **Course hubs**: `/html-css`, `/javascript`, `/python`
- **Lessons**: `/learn/html-css/lesson-1`, `/learn/javascript/lesson-1`
- **Original content**: `/[slug]` (unchanged)

### Benefits of Unified Approach
- ✅ Single navigation system
- ✅ Consistent UI/UX throughout
- ✅ Template updates remain compatible
- ✅ Simpler development and maintenance
- ✅ No duplicate routing or layout logic

---
*Last Updated: Phase 1 - Framework Setup*
