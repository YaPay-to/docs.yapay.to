# Linear-Style Documentation Transformation TODO

## Overview
Transform the MedicVizor Docusaurus documentation to match Linear's clean, modern documentation design.

## Phase 1: Core Configuration & Branding
- [ ] Update site metadata in `docusaurus.config.ts`
  - [ ] Change title to "MedicVizor Docs"
  - [ ] Update tagline to "Complete guide to MedicVizor's medical tourism platform"
  - [ ] Update favicon
  - [ ] Update organization name and project name
  - [ ] Remove GitHub edit links
  - [ ] Update social card image

## Phase 2: Color Scheme & Typography
- [ ] Update `custom.css` with Linear-inspired design system
  - [ ] Primary color: Blue/purple gradient (#5E6AD2 to #4752C4)
  - [ ] Dark mode colors matching Linear's dark theme
  - [ ] Typography: Inter font family
  - [ ] Clean spacing system (8px base unit)
  - [ ] Subtle shadows and borders
  - [ ] Remove default green color scheme

## Phase 3: Navigation Structure
- [ ] Restructure sidebar categories to match Linear's pattern
  - [ ] "Getting Started" section
    - [ ] Quick Start Guide
    - [ ] Core Concepts
    - [ ] Installation
  - [ ] "Platform Basics" section
    - [ ] Patient Portal
    - [ ] Provider Dashboard
    - [ ] Organization Management
  - [ ] "Features" section
    - [ ] Booking System
    - [ ] Messaging
    - [ ] Payments
    - [ ] Search & Discovery
  - [ ] "Administration" section
    - [ ] User Management
    - [ ] Settings
    - [ ] Analytics
  - [ ] "Developer" section (link to API docs)

## Phase 4: Homepage Redesign
- [ ] Create new homepage matching Linear's docs landing
  - [ ] Remove hero banner
  - [ ] Add clean title and subtitle
  - [ ] Create "Popular" section with feature cards
  - [ ] Create "Platform Basics" grid with icon cards
  - [ ] Implement hover effects on cards
  - [ ] Add search bar at the top

## Phase 5: Documentation Pages
- [ ] Create comprehensive Getting Started guide
  - [ ] Platform overview
  - [ ] Account setup
  - [ ] First steps for each user type
- [ ] Write Core Concepts page
  - [ ] User roles explanation
  - [ ] Platform workflow
  - [ ] Key terminology
- [ ] Document each major feature
  - [ ] Include screenshots
  - [ ] Step-by-step guides
  - [ ] Best practices

## Phase 6: Component Styling
- [ ] Create custom Linear-style components
  - [ ] Feature cards with icons and descriptions
  - [ ] Clean breadcrumb navigation
  - [ ] Minimal but functional search
  - [ ] Copy button for code blocks
  - [ ] Table of contents sidebar (right side)
  - [ ] "Next/Previous" navigation at bottom

## Phase 7: Visual Enhancements
- [ ] Add custom icons for each section
  - [ ] Use Lucide or Heroicons
  - [ ] Consistent icon style throughout
- [ ] Implement Linear's card grid layout
  - [ ] Responsive grid (1-3 columns)
  - [ ] Subtle borders and hover states
  - [ ] Consistent padding and spacing

## Phase 8: Dark Mode Support
- [ ] Implement Linear's dark theme
  - [ ] Dark background (#0E0E0F)
  - [ ] Adjusted text colors for readability
  - [ ] Proper contrast ratios
  - [ ] Smooth theme transitions

## Phase 9: Search & Navigation
- [ ] Configure Algolia DocSearch (if needed)
- [ ] Add keyboard shortcuts (Cmd+K for search)
- [ ] Implement smooth scroll behavior
- [ ] Add anchor links for all headings

## Phase 10: Footer Simplification
- [ ] Minimal footer design
  - [ ] Links to main product
  - [ ] Support/contact link
  - [ ] API documentation link
  - [ ] Remove social media clutter

## Phase 11: Content Migration
- [ ] Remove default tutorial content
- [ ] Remove blog section (or repurpose for updates)
- [ ] Create MedicVizor-specific documentation
  - [ ] Patient journey documentation
  - [ ] Provider onboarding guide
  - [ ] Organization setup guide
  - [ ] Admin configuration guide

## Phase 12: Mobile Optimization
- [ ] Ensure responsive design
- [ ] Collapsible sidebar on mobile
- [ ] Touch-friendly navigation
- [ ] Readable font sizes on all devices

## Phase 13: Performance & SEO
- [ ] Optimize images and assets
- [ ] Add proper meta descriptions
- [ ] Configure sitemap
- [ ] Implement OpenGraph tags

## Phase 14: Final Polish
- [ ] Add loading states
- [ ] Implement error pages (404)
- [ ] Add version dropdown (if needed)
- [ ] Test all navigation paths
- [ ] Verify all links work
- [ ] Cross-browser testing

## Technical Implementation Notes

### Key CSS Variables to Add:
```css
--linear-primary: #5E6AD2;
--linear-primary-dark: #4752C4;
--linear-bg: #FFFFFF;
--linear-bg-dark: #0E0E0F;
--linear-border: #E5E7EB;
--linear-border-dark: #1F2937;
--linear-text: #1F2937;
--linear-text-dark: #F3F4F6;
```

### Component Structure:
- Use CSS Modules for component-specific styles
- Implement Radix UI primitives where possible
- Keep accessibility in mind (ARIA labels, keyboard nav)

### Content Guidelines:
- Clear, concise writing
- Plenty of examples
- Visual aids (screenshots, diagrams)
- Consistent formatting

## Success Metrics
- [ ] Clean, modern appearance matching Linear's aesthetic
- [ ] Intuitive navigation structure
- [ ] Fast page loads
- [ ] Mobile-friendly
- [ ] Comprehensive documentation coverage
- [ ] Easy to maintain and update