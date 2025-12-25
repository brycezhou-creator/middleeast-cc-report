# 51Talk Middle East - Student Report Application

## Project Handover Document

**Version:** 1.0  
**Date:** December 25, 2025  
**Purpose:** Technical handover to the Middle East development team for frontend modifications and backend integration.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Project Structure](#3-project-structure)
4. [Design System & Brand Guidelines](#4-design-system--brand-guidelines)
5. [Data Architecture](#5-data-architecture)
6. [Component Reference](#6-component-reference)
7. [Modal Dialogs](#7-modal-dialogs)
8. [Backend Integration Points](#8-backend-integration-points)
9. [Getting Started](#9-getting-started)
10. [Deployment Notes](#10-deployment-notes)
11. [Future Development Recommendations](#11-future-development-recommendations)

---

## 1. Project Overview

### 1.1 What is this application?

This is a **mobile-first, single-page student report application** designed for parents of 51Talk students in the Middle East region. After a child completes a trial class, this report is generated to:

1. **Showcase the child's performance** during the trial class
2. **Visualize the child's current English level** compared to global averages
3. **Recommend a personalized learning path** with clear milestones
4. **Drive conversion** to paid course packages
5. **Enable social sharing** via WhatsApp (primary communication channel in Middle East)

### 1.2 Target Audience

- **Primary users:** Parents of children aged 5-15 in Middle East countries (UAE, Saudi Arabia, Egypt, etc.)
- **Device:** Primarily mobile phones (optimized for 375px - 428px viewport)
- **Language:** Currently English, designed to be easily localized to Arabic

### 1.3 Business Goals

| Goal | Implementation |
|------|----------------|
| **Engagement** | Interactive elements (audio playback, clickable radar chart labels, expandable sections) |
| **Trust** | Teacher voice message, AI analysis, international standard references (CEFR, Cambridge) |
| **Urgency** | Limited-time offer countdown timer, scarcity indicators ("Only 100 spots!") |
| **Virality** | Shareable poster generation, WhatsApp share buttons throughout |
| **Conversion** | Fixed bottom CTA, plan selection dialog with promotional pricing |

---

## 2. Technology Stack

### 2.1 Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.0 | UI framework |
| **TypeScript** | 5.8.2 | Type safety |
| **Vite** | 6.2.0 | Build tool & dev server |
| **Tailwind CSS** | CDN (latest) | Utility-first styling |
| **Framer Motion** | 11.0.8 | Animations and transitions |
| **Recharts** | 3.5.1 | Radar chart visualization |
| **Lucide React** | 0.555.0 | Icon library |
| **html2canvas** | 1.4.1 | Poster image generation |

### 2.2 CDN Dependencies

The project uses CDN-hosted React for development simplicity. See `index.html` for import map configuration:

```javascript
{
  "imports": {
    "react": "https://aistudiocdn.com/react@^19.2.0",
    "react-dom/": "https://aistudiocdn.com/react-dom@^19.2.0/",
    "react/": "https://aistudiocdn.com/react@^19.2.0/",
    "lucide-react": "https://aistudiocdn.com/lucide-react@^0.555.0",
    "recharts": "https://aistudiocdn.com/recharts@^3.5.1",
    "framer-motion": "https://aistudiocdn.com/framer-motion@^11.0.8"
  }
}
```

---

## 3. Project Structure

```
MiddleEast-CC-Report/
├── App.tsx                    # Main application component
├── index.tsx                  # React entry point
├── index.html                 # HTML template with Tailwind config
├── package.json               # Dependencies
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
│
├── data/
│   └── reportData.ts          # Mock data & TypeScript interfaces
│
└── components/
    ├── index.ts               # Component exports barrel file
    │
    │── # Page Sections (in order of appearance)
    ├── HeroSection.tsx        # Student avatar, name, badge, title
    ├── ClassRecordingSection.tsx   # Video placeholder + AI subtitles
    ├── KnowledgeCarousel.tsx  # Today's vocabulary horizontal scroll
    ├── RadarAnalysisSection.tsx    # Skills radar chart
    ├── LevelProgressionMap.tsx     # CEFR/Cambridge level bar chart
    ├── CurriculumJourneySection.tsx # CEJ curriculum S-curve map
    ├── TeacherMessageSection.tsx   # Teacher voice message + comment
    ├── SharePosterCTA.tsx     # "Create Learning Poster" card
    ├── BottomCTA.tsx          # Fixed bottom "Get Personalized Plan" button
    │
    │── # Modal Dialogs
    ├── Dialog.tsx             # Reusable dialog wrapper component
    ├── MetricDetailDialog.tsx # Radar chart label detail popup
    ├── PlanSelectionDialog.tsx    # Course package selection
    ├── ShareablePosterModal.tsx   # Full-screen poster generator
    │
    │── # Utility Components
    ├── ScrollHint.tsx         # Horizontal scroll indicator arrow
    ├── PosterGenerationAnimation.tsx  # Poster loading animation
    └── MilestoneDetailDialog.tsx  # (Legacy) Milestone detail popup
```

---

## 4. Design System & Brand Guidelines

### 4.1 Brand Colors

Defined in `index.html` Tailwind configuration:

| Name | CSS Variable | Hex Code | Usage |
|------|--------------|----------|-------|
| **Royal (皓月蓝)** | `royal` | `#00B4EE` | Primary brand blue, headers, buttons, links |
| **Brand (宝贝黄)** | `brand` | `#FDE700` | Accent color, highlights, CTAs, progress indicators |
| **Success** | `success` | `#50C878` | Emerald green, WhatsApp/confirmation buttons |
| **Surface** | `surface` | `rgba(255,255,255,0.95)` | Card backgrounds with glass effect |
| **Dark** | `dark` | `#0F172A` | Text color |
| **Light** | `light` | `#F8FAFC` | Light backgrounds |

### 4.2 Typography

- **Font Family:** System fonts (`system-ui, -apple-system, sans-serif`)
- **Headings:** Bold/Black weight, Royal blue color
- **Body:** Regular weight, dark gray
- **Arabic Support:** Font family supports Arabic characters (RTL ready)

### 4.3 Component Styling Patterns

All major sections follow a consistent card pattern:

```jsx
<div className="bg-surface backdrop-blur-sm border border-white/20 rounded-2xl shadow-card overflow-hidden">
  {/* Header */}
  <div className="p-4 flex items-center border-b border-gray-100">
    <h3 className="text-dark font-bold flex items-center gap-2">
      <span className="w-2 h-6 bg-brand rounded-full"></span>
      Section Title
    </h3>
  </div>
  {/* Content */}
  <div className="p-5">
    ...
  </div>
</div>
```

### 4.4 Animation Guidelines

- **Entry animations:** Fade up with `framer-motion` (y: 20→0, opacity: 0→1)
- **Floating elements:** Gentle vertical bounce (3-5px amplitude, 2.5s duration)
- **Interactive feedback:** Scale on hover (1.02-1.05), scale on tap (0.95-0.98)
- **Transitions:** Spring physics with damping 25, stiffness 300

---

## 5. Data Architecture

### 5.1 Main Data Interface

All student data is defined in `data/reportData.ts`. The main interface:

```typescript
interface StudentData {
  name: string;                    // Student's first name
  avatar: string;                  // Avatar URL (DiceBear API)
  levelCurrent: string;            // Current level description
  levelCode: string;               // Level ID (e.g., "L1")
  levelTarget: string;             // Target level description
  targetLevelCode: string;         // Target level ID (e.g., "L4")
  badges: Badge[];                 // Achievement badges
  videoUrl: string;                // Class recording video URL
  subtitles: Subtitle[];           // AI-generated speech transcript
  vocabularyMastery: VocabularyItem[];  // Today's learned words
  radarData: RadarMetric[];        // Skills assessment data
  teacher: TeacherInfo;            // Teacher information
  pathMilestones: PathMilestone[]; // Learning journey milestones
  packages: Record<string, PackageInfo>;  // Course packages
  sharePoster: SharePosterData;    // Social sharing data
}
```

### 5.2 Key Sub-Interfaces

#### VocabularyItem
```typescript
interface VocabularyItem {
  id: string;
  word: string;              // English word
  translation: string;       // Arabic translation
  imageUrl: string;          // Illustrative image
  rating: 1 | 2 | 3;         // Star rating (pronunciation quality)
  ratingLabel: string;       // "Perfect!", "Great!", "Good"
  studentAudioUrl: string;   // Student's pronunciation audio
}
```

#### RadarMetric
```typescript
interface RadarMetric {
  subject: string;           // Skill name (Vocabulary, Grammar, etc.)
  student: number;           // Student's score (0-100)
  average: number;           // Global average score
  fullMark: number;          // Maximum score (100)
  analysis?: string;         // Detailed feedback text
  tip?: string;              // Improvement suggestion
}
```

#### PackageInfo
```typescript
interface PackageInfo {
  id: string;
  title: string;             // Package name
  lessonCount: number;       // Total lessons
  frequency: string;         // "3 lessons/week"
  price: string;             // Display price
  tags: string[];            // Feature tags
}
```

### 5.3 Data Flow

Currently, all data is **hardcoded mock data** in `reportData.ts`. For production:

1. **Backend API** should provide a similar JSON structure
2. **App.tsx** should fetch data on mount
3. Store in React state or context
4. Pass down to components as props

---

## 6. Component Reference

### 6.1 HeroSection

**File:** `components/HeroSection.tsx`  
**Purpose:** First impression - displays student avatar with animated badge, personalized headline.

**Props:**
- `name: string` - Student's first name
- `avatar: string` - Avatar image URL
- `badge: { icon: string, label: string }` - Achievement badge

**Key Features:**
- Animated ripple effect behind avatar
- Floating badge with spring animation
- Background image overlay with gradient

---

### 6.2 ClassRecordingSection

**File:** `components/ClassRecordingSection.tsx`  
**Purpose:** Display class recording video with AI-analyzed speech transcript.

**Props:**
- `subtitles: Subtitle[]` - Array of transcript segments

**Key Features:**
- Video thumbnail with play button overlay
- Smart subtitle display with highlighted vocabulary words
- "AI Speech Analysis" badge

**Backend Integration Point:**
- Video URL needs to come from backend
- Subtitles should be generated by speech-to-text API

---

### 6.3 KnowledgeCarousel

**File:** `components/KnowledgeCarousel.tsx`  
**Purpose:** Horizontal scrolling carousel of vocabulary words learned in class.

**Props:**
- `vocabularyItems: VocabularyItem[]` - Array of vocabulary data

**Key Features:**
- Swipeable horizontal scroll
- Audio playback of student pronunciation
- Star rating display
- Arabic translation
- Scroll hint indicator (auto-hides after scrolling)

**Backend Integration Point:**
- Each vocabulary item needs image URL, audio URL, translation, and AI-assessed rating

---

### 6.4 RadarAnalysisSection

**File:** `components/RadarAnalysisSection.tsx`  
**Purpose:** Skills assessment visualization comparing student to global average.

**Props:**
- `radarData: RadarMetric[]` - Array of 5 skill metrics
- `onMetricClick: (subject: string) => void` - Handler when label is clicked

**Key Features:**
- Recharts `RadarChart` component
- Custom floating animated labels (clickable)
- Legend showing student vs. average
- Lazy load on scroll into view

**Design Note:**
- Labels are precisely positioned using custom offset calculations
- Yellow (brand) fill for student area, gray dashed line for average

---

### 6.5 LevelProgressionMap

**File:** `components/LevelProgressionMap.tsx`  
**Purpose:** Visual representation of English level progression from LS to L9.

**Props:**
- `currentLevel: string` - Student's current level code (e.g., "L1")
- `targetLevel: string` - Recommended target level code (e.g., "L4")

**Key Features:**
- Animated bar chart (heights increase progressively)
- "Sara's Level" and "Recommended Level" callout bubbles
- CEFR and Cambridge standard reference rows
- Horizontal scroll for all 11 levels

---

### 6.6 CurriculumJourneySection

**File:** `components/CurriculumJourneySection.tsx`  
**Purpose:** Showcase the CEJ (Communication English for Juniors) curriculum structure.

**Internal Data:**
- Hardcoded `CURRICULUM_DATA` array with 4 skill areas:
  - Vocabulary (TreeDeciduous icon)
  - Listening & Speaking (Mic icon)
  - Reading (BookOpen icon)
  - Writing (PenTool icon)

**Key Features:**
- Collapsible "Why CEJ?" advantages panel
- S-shaped SVG path connecting curriculum nodes
- Each node opens a detailed dialog with level-by-level breakdown
- Alternating left/right layout

---

### 6.7 TeacherMessageSection

**File:** `components/TeacherMessageSection.tsx`  
**Purpose:** Display personalized message from the teacher.

**Props:**
- `teacher: TeacherInfo` - Teacher data object

**Key Features:**
- Teacher avatar and name
- Play/pause audio message button
- Toggle between original English and Arabic translation
- Decorative quote styling

**Backend Integration Point:**
- Voice message audio URL
- Teacher avatar, name, rating
- Message text in both languages

---

### 6.8 SharePosterCTA

**File:** `components/SharePosterCTA.tsx`  
**Purpose:** Call-to-action card inviting users to generate a shareable poster.

**Props:**
- `studentName: string`
- `onOpenPoster: () => void` - Handler to open poster modal

**Key Features:**
- Polaroid-style class photo preview
- "Create Learning Poster" button
- Sparkle decorations

---

### 6.9 BottomCTA

**File:** `components/BottomCTA.tsx`  
**Purpose:** Fixed bottom bar with primary conversion CTA.

**Props:**
- `studentName: string`
- `onOpenPlanSelection: () => void`

**Key Features:**
- Sticky/fixed positioning at bottom
- Green (success) color matching WhatsApp
- Safe area padding for mobile devices

---

## 7. Modal Dialogs

### 7.1 Dialog (Base Component)

**File:** `components/Dialog.tsx`  
**Purpose:** Reusable modal wrapper with backdrop, animation, and close button.

**Props:**
- `isOpen: boolean`
- `onClose: () => void`
- `title: string`
- `children: React.ReactNode`

---

### 7.2 MetricDetailDialog

**File:** `components/MetricDetailDialog.tsx`  
**Purpose:** Detailed view when user taps a skill label on the radar chart.

**Props:**
- `isOpen: boolean`
- `onClose: () => void`
- `metric: RadarMetric`

**Key Features:**
- Circular progress indicator showing 51Talk ranking percentile
- "Detailed Assessment" card with analysis text
- "Improvement Tips" card with actionable advice
- LTR layout (left-aligned)
- Uses brand yellow (#FDE700) for progress ring

---

### 7.3 PlanSelectionDialog

**File:** `components/PlanSelectionDialog.tsx`  
**Purpose:** Display available course packages with promotional pricing.

**Props:**
- `isOpen: boolean`
- `onClose: () => void`
- `packages: StudentData['packages']`

**Key Features:**
- Limited-time offer countdown banner (8 hours)
- 45% OFF badges on each package
- "10 FREE AI Lessons" highlight
- "Only 100 spots!" scarcity indicator
- "Select Plan" and "Share" buttons per package
- WhatsApp share functionality

---

### 7.4 ShareablePosterModal

**File:** `components/ShareablePosterModal.tsx`  
**Purpose:** Full-screen modal for generating and sharing a learning report poster.

**Props:**
- `isOpen: boolean`
- `onClose: () => void`
- `posterData: SharePosterData`

**Key Features:**
- Poster generation animation on open
- Complete poster layout:
  - Header with avatar, name, date
  - Happy Moment photo
  - Today's Words tags
  - Teacher Feedback quote
  - 51Talk logo + QR code footer
- **Download as PNG** using `html2canvas`
- **Share via WhatsApp** using Web Share API or fallback
- Fixed bottom action bar with share/download buttons

---

## 8. Backend Integration Points

This section outlines what data the backend needs to provide:

### 8.1 Required API Endpoints

| Endpoint | Purpose | Response |
|----------|---------|----------|
| `GET /api/report/{student_id}` | Fetch complete report data | `StudentData` JSON |
| `GET /api/video/{session_id}` | Get class recording video | Video URL or stream |
| `GET /api/audio/{item_id}` | Get student pronunciation audio | Audio URL |
| `GET /api/teacher/{teacher_id}/message` | Get teacher voice message | Audio URL |

### 8.2 Data Generation Services

| Service | Purpose | Output |
|---------|---------|--------|
| **Speech-to-Text** | Transcribe class recording | `Subtitle[]` with timestamps |
| **Pronunciation Assessment** | Score student pronunciation | Rating (1-3) per word |
| **Skills Analysis** | Generate radar chart data | `RadarMetric[]` with scores |
| **AI Feedback Generation** | Generate analysis & tips | Text strings per skill |
| **Level Assessment** | Determine student level | Level code (L0-L9) |

### 8.3 Static Assets

| Asset | Current Source | Production Recommendation |
|-------|----------------|--------------------------|
| Student avatars | DiceBear API | Backend-generated or uploaded |
| Teacher avatars | DiceBear API | 51Talk CDN |
| Vocabulary images | Unsplash | 51Talk CDN or educational image library |
| Class photos | Unsplash | Actual class screenshots |
| QR code | External API | Generate dynamically with student referral link |

---

## 9. Getting Started

### 9.1 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### 9.2 Installation

```bash
# Clone the repository
git clone https://github.com/brycezhou-creator/middleeast-cc-report.git

# Navigate to project directory
cd MiddleEast-CC-Report

# Install dependencies
npm install
```

### 9.3 Development

```bash
# Start development server
npm run dev

# Start with network access (for mobile testing)
npm run dev -- --host
```

The app will be available at:
- Local: http://localhost:3000
- Network: http://[your-ip]:3000

### 9.4 Build for Production

```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

Output will be in the `dist/` folder.

---

## 10. Deployment Notes

### 10.1 Static Site Deployment

This is a static React SPA. Deploy to any static hosting:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Azure Static Web Apps

### 10.2 Environment Variables

Currently none required. For production:

```env
VITE_API_BASE_URL=https://api.51talk.com/v1
VITE_CDN_BASE_URL=https://cdn.51talk.com
VITE_WHATSAPP_NUMBER=+971XXXXXXXXXX
```

### 10.3 RTL Considerations

The app is designed LTR but with RTL-ready patterns:
- Using `start` and `end` instead of `left` and `right` where appropriate
- Tailwind RTL support can be enabled with `dir="rtl"` on root element
- Font family supports Arabic characters

---

## 11. Future Development Recommendations

### 11.1 Priority Enhancements

1. **Backend Integration**
   - Replace mock data with real API calls
   - Implement loading states and error handling
   - Add authentication for secure report access

2. **Localization**
   - Add Arabic language support
   - Implement RTL layout toggle
   - Use i18n library (react-i18next recommended)

3. **Video Player**
   - Implement actual video playback (currently placeholder)
   - Add video controls and progress bar
   - Sync subtitles with video timestamp

4. **Audio Player**
   - Full audio player with progress, pause/resume
   - Preload optimization

### 11.2 Performance Optimizations

- Lazy load images with `loading="lazy"`
- Consider virtual scrolling for vocabulary carousel
- Optimize bundle size by removing unused Recharts components
- Cache API responses

### 11.3 Analytics Integration

Track key events:
- Report view
- Section scrolls (visibility)
- Audio/video plays
- Radar label clicks
- Poster generation
- WhatsApp shares
- Plan selection
- CTA clicks

---

## Contact & Support

For questions about this project, please contact the original development team before the handover deadline.

---

*Document generated on December 25, 2025*
