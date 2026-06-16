# RESPONSIVE TESTING CHECKLIST

## Browser Viewport Sizes to Test

### Mobile Phones
- [ ] **iPhone SE (375x667)** - Smallest modern phone
- [ ] **iPhone 12/13 (390x844)** - Most common
- [ ] **iPhone 14 Pro Max (440x956)** - Large phone
- [ ] **Pixel 6 (412x915)** - Android common
- [ ] **Galaxy S10 (360x800)** - Smaller Android

### Tablets
- [ ] **iPad (768x1024)** - Standard tablet
- [ ] **iPad Air (820x1180)** - Larger tablet
- [ ] **iPad Pro 11" (834x1194)** - Large tablet
- [ ] **Galaxy Tab (600x960)** - Android tablet

### Desktop
- [ ] **Laptop (1366x768)** - Common laptop
- [ ] **Desktop (1920x1080)** - Standard desktop
- [ ] **Ultra-wide (2560x1440)** - Large monitor

---

## Critical Component Testing

### 1. Navbar Logo (High Priority)
**Location:** Fixed header, left side

| Device | Test | Expected | Status |
|--------|------|----------|--------|
| 320px | Logo width | NOT oversized, hamburger visible | ☐ |
| 375px | Logo width | Fits comfortably, hamburger clear | ☐ |
| 768px | Logo width | Medium size, nav links appear | ☐ |
| 1024px | Logo width | Full size, all nav elements visible | ☐ |

**Checklist:**
- [ ] Logo doesn't overflow container
- [ ] Hamburger menu icon is clickable (48px min)
- [ ] No horizontal scroll at 320px
- [ ] Navigation links appear/hide correctly at breakpoints
- [ ] Active nav link indicator visible

### 2. Mobile Menu (High Priority)
**Location:** Hamburger menu → slide-out panel

| Device | Test | Expected | Status |
|--------|------|----------|--------|
| 375px | Menu width | Takes 85% width max, no overlap | ☐ |
| 375px | Menu close | ESC key works | ☐ |
| 375px | Menu close | Clicking overlay closes | ☐ |
| 768px | Menu visibility | Hidden, nav links visible instead | ☐ |

**Checklist:**
- [ ] Menu slides in smoothly from right
- [ ] Overlay appears with correct opacity
- [ ] All menu links are clickable
- [ ] CTA button ("Start a Project") responsive
- [ ] Social icons visible and clickable
- [ ] Menu closes on link click
- [ ] No body scroll while menu open

### 3. Hero Section Buttons
**Location:** Homepage, below headline

| Device | Test | Expected | Status |
|--------|------|----------|--------|
| 320px | Button width | Stacked, full width with margins | ☐ |
| 375px | Button width | Stacked, not oversized | ☐ |
| 640px | Button layout | Side-by-side starts | ☐ |
| 1024px | Button layout | Side-by-side, left-aligned | ☐ |

**Checklist:**
- [ ] Buttons have min-height of 48px (touch-friendly)
- [ ] Buttons don't extend beyond container
- [ ] Hover state works on desktop
- [ ] No horizontal scroll
- [ ] Text inside buttons is readable
- [ ] Button spacing consistent

### 4. Grid Layouts (Services, Portfolio)
**Location:** All grid sections

| Device | Test | Expected | Status |
|--------|------|----------|--------|
| 320px | Column count | 1 column | ☐ |
| 480px | Column count | 1 column | ☐ |
| 640px | Column count | 2 columns | ☐ |
| 768px | Column count | 2-3 columns (check) | ☐ |
| 1024px | Column count | 3 columns | ☐ |

**Checklist:**
- [ ] Services section: 1 → 2 → 3 column progression smooth
- [ ] Portfolio section: 1 → 2 column progression smooth
- [ ] Footer: 2 → 3 → 4 column progression smooth
- [ ] Card spacing consistent across breakpoints
- [ ] No cards cut off or overlapping
- [ ] Gap between cards scales appropriately

### 5. Images & Media
**Location:** All image elements

| Device | Test | Expected | Status |
|--------|------|----------|--------|
| 320px | Image width | Fits within container, no scroll | ☐ |
| 375px | Image quality | Clear and sharp | ☐ |
| 768px | Aspect ratio | Maintained, no stretching | ☐ |
| 1024px | Loading | Lazy loading works | ☐ |

**Checklist:**
- [ ] Homepage about section image responsive
- [ ] Hero background image loads (if visible)
- [ ] Portfolio project images scale properly
- [ ] Learn section images: 1 → 2 column layout correct
- [ ] Project images use correct aspect ratio
- [ ] Alt text present on all images
- [ ] Images don't cause layout shift

### 6. Forms & Inputs (Waitlist)
**Location:** All form sections

| Device | Test | Expected | Status |
|--------|------|----------|--------|
| 320px | Input height | Min 48px (touch-friendly) | ☐ |
| 320px | Input focus | Border changes color | ☐ |
| 375px | Button responsive | Full width, readable | ☐ |
| 768px | Form width | Appropriate max-width | ☐ |

**Checklist:**
- [ ] Input fields have minimum height of 48px
- [ ] Input fields have proper padding
- [ ] Focus state visible (border/ring)
- [ ] Placeholder text readable
- [ ] Button text not cut off
- [ ] Disabled state visible
- [ ] Error messages display properly
- [ ] Success messages display properly
- [ ] Form styling consistent

### 7. Typography & Readability
**Location:** All text content

| Device | Test | Expected | Status |
|--------|------|----------|--------|
| 320px | Headline size | Readable, not oversized | ☐ |
| 375px | Body text | 16px minimum (mobile-friendly) | ☐ |
| 768px | Line length | Not too wide (readability) | ☐ |
| 1024px | Heading size | Professional scale | ☐ |

**Checklist:**
- [ ] Headline on mobile: legible without excessive size
- [ ] Body text: 16px minimum
- [ ] Line height: 1.5-1.8 (readable)
- [ ] Letter spacing: not too tight
- [ ] Font weights appropriate
- [ ] No text overflow from container
- [ ] Link colors adequate contrast
- [ ] Heading hierarchy maintained

### 8. Padding & Margins
**Location:** All sections and components

| Device | Test | Expected | Status |
|--------|------|----------|--------|
| 320px | Section padding | Adequate, not cramped | ☐ |
| 375px | Card padding | Consistent spacing | ☐ |
| 768px | Section padding | Smooth increase from mobile | ☐ |
| 1024px | Section padding | Full 10rem desktop spacing | ☐ |

**Checklist:**
- [ ] No cramped content on mobile
- [ ] Consistent padding across sections
- [ ] Spacing increases smoothly at breakpoints
- [ ] No sudden jumps in spacing
- [ ] Container margins appropriate
- [ ] Component gaps scale properly

### 9. Touch Targets & Interactions
**Location:** All clickable elements

| Device | Test | Expected | Status |
|--------|------|----------|--------|
| 320px (touch) | Button tap | Easy to tap, 48x48 minimum | ☐ |
| 375px (touch) | Link tap | Nav links easy to hit | ☐ |
| 375px (touch) | Form input | Easy to tap and type | ☐ |
| 768px | Hover state | Desktop hover effects work | ☐ |

**Checklist:**
- [ ] All buttons: minimum 48x48px
- [ ] All nav links: adequate tap target
- [ ] All icons: minimum 48x48px
- [ ] Form inputs: 48px height minimum
- [ ] Social links: 48x48px minimum
- [ ] Active states visible
- [ ] No accidental double-tap issues
- [ ] Swipe gestures work (if applicable)

### 10. Overall Layout
**Location:** Entire page, all sections

| Device | Test | Expected | Status |
|--------|------|----------|--------|
| 320px | Horizontal scroll | None present | ☐ |
| 320px | Vertical scroll | Smooth, proper height | ☐ |
| 375px | Layout flow | Top to bottom logical | ☐ |
| 768px | Breakpoint transition | Smooth at exactly 768px | ☐ |
| 1024px | Full layout | All elements visible and aligned | ☐ |

**Checklist:**
- [ ] No horizontal scrolling at any breakpoint
- [ ] No content overflow
- [ ] Logical vertical flow
- [ ] Sections stack properly on mobile
- [ ] Sections arrange properly on tablet/desktop
- [ ] Content max-width appropriate
- [ ] No layout shift on scroll
- [ ] Navbar stays fixed properly
- [ ] Footer displays correctly

---

## Specific Responsiveness Tests by Page

### Home Page
- [ ] Hero section layout (text + image placement)
- [ ] About section image responsive
- [ ] Services cards grid progression
- [ ] Case studies grid progression
- [ ] Reviews section displays correctly
- [ ] Footer contact info readable
- [ ] CTA buttons responsive

### Portfolio Page
- [ ] Project grid responsive (1 → 2 columns)
- [ ] Project cards readable on all sizes
- [ ] Expanded project view doesn't break
- [ ] Back button accessible
- [ ] Load more button responsive

### Services Page
- [ ] Service cards grid responsive
- [ ] Icons visible and appropriately sized
- [ ] Text content readable
- [ ] CTA buttons responsive

### Contact Page
- [ ] Contact form fully responsive
- [ ] Contact info readable
- [ ] WhatsApp link tappable
- [ ] Email link accessible
- [ ] Form inputs meet touch requirements

### Education Page
- [ ] Learn section layout responsive
- [ ] Image gallery responsive
- [ ] Text content readable
- [ ] CTA button responsive

---

## Breakpoint Verification Checklist

### At 767px (just below 768px tablet breakpoint)
- [ ] Hamburger menu visible
- [ ] Nav links hidden
- [ ] Mobile menu operational
- [ ] Navbar height is 5.5rem
- [ ] Grids still single column
- [ ] Section padding is 5rem

### At 768px (exact tablet breakpoint)
- [ ] Hamburger menu hidden OR visible (verify consistency)
- [ ] Nav links visible OR hidden (verify consistency)
- [ ] Layout changes appropriately
- [ ] Navbar height transitions smoothly
- [ ] Grids change to 2 columns where applicable

### At 769px (just above 768px)
- [ ] Same as 768px
- [ ] No changes from 768px

### At 1024px (lg breakpoint)
- [ ] 3-column grids display
- [ ] Large layouts engage
- [ ] Hero visual column appears
- [ ] Padding increases to 10rem

---

## Browser-Specific Tests

### Chrome / Edge
- [ ] Chrome DevTools device emulation
- [ ] Responsive design mode viewport dragging
- [ ] Device pixel ratio testing (1x, 2x, 3x)
- [ ] Network throttling (slow 3G, 4G)

### Firefox
- [ ] Responsive design mode
- [ ] Different font rendering
- [ ] Flex/grid behavior

### Safari (if possible)
- [ ] Mobile Safari on iOS
- [ ] Desktop Safari rendering
- [ ] WebKit-specific styles

---

## Performance Tests (Related to Responsive)

- [ ] Page load time at different breakpoints
- [ ] Image loading performance (lazy load works)
- [ ] Menu open/close animation smooth
- [ ] Scroll performance smooth at all sizes
- [ ] No layout shift (Cumulative Layout Shift < 0.1)
- [ ] Lighthouse score 80+

---

## Accessibility Tests (Responsive Context)

- [ ] Focus order logical on mobile
- [ ] Focus ring visible on touch devices
- [ ] Zoom to 200% doesn't break layout
- [ ] Text contrast adequate on all devices
- [ ] Touch targets accessible (min 48px)
- [ ] Screen reader navigation works
- [ ] Keyboard navigation works
- [ ] Form labels associated with inputs

---

## Sign-Off Checklist

| Area | Critical | High | Medium | Low |
|------|----------|------|--------|-----|
| Navbar | ✓ | ✓ | ✓ | ✓ |
| Mobile Menu | ✓ | ✓ | ✓ | ✓ |
| Hero Section | ✓ | ✓ | ✓ | ✓ |
| Grids/Layouts | ✓ | ✓ | ✓ | ✓ |
| Images | ✓ | ✓ | ✓ | ✓ |
| Forms | ✓ | ✓ | ✓ | ✓ |
| Typography | ✓ | ✓ | ✓ | ✓ |
| Touch Targets | ✓ | ✓ | ✓ | ✓ |

---

## Final Quality Check

Before deploying, verify:

- [ ] All critical fixes implemented
- [ ] All tests above passed
- [ ] No console errors on mobile
- [ ] No layout shifts during interactions
- [ ] All breakpoints transition smoothly
- [ ] Performance acceptable (LCP < 2.5s)
- [ ] Mobile usability score 90+
- [ ] Accessibility score 90+
- [ ] No regressions from fixes

---

## Testing Tools

**Built-in:**
- Chrome DevTools (Ctrl+Shift+I)
- Firefox DevTools (F12)
- Safari Web Inspector (Cmd+Option+I)

**Online Tools:**
- Google PageSpeed Insights
- Lighthouse CLI
- WebPageTest
- BrowserStack (cross-device testing)

**Mobile Testing:**
- Test on actual devices
- iOS Simulator (Mac)
- Android Emulator
- Android Chrome Remote Debugging

---

Generated: April 20, 2026
Last Updated: April 20, 2026
