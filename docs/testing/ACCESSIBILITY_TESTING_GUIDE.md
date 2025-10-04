# Accessibility Testing Guide (WCAG 2.1 AA Compliance)

## Overview

This guide provides comprehensive instructions for testing The Pickard application's accessibility compliance with WCAG 2.1 AA standards, which is **mandatory** for app store submission and legal compliance.

---

## 🎯 What is Axe DevTools?

**Axe DevTools** is the industry-standard browser extension for automated accessibility testing created by Deque Systems.

### Why Use Axe DevTools?

- **Industry Standard** - Used by Microsoft, Google, Adobe, and government agencies
- **Accurate** - Very low false-positive rate (~0% compared to 30-50% for other tools)
- **WCAG Compliance** - Tests against WCAG 2.0, 2.1, 2.2 standards at A, AA, AAA levels
- **Detailed Reports** - Provides specific issue locations, impact levels, and fix recommendations
- **Free Version Available** - Basic testing is free, pro version adds advanced features

### What Axe DevTools Tests

- ✅ **ARIA usage** - Proper aria-label, aria-describedby, roles
- ✅ **Color contrast** - Text readability (4.5:1 for normal, 3:1 for large text)
- ✅ **Keyboard navigation** - Tab order, focus management
- ✅ **Form labels** - Proper label associations
- ✅ **Image alt text** - Descriptive alternative text
- ✅ **Heading hierarchy** - Proper h1→h2→h3 structure
- ✅ **Touch targets** - Minimum 44x44px clickable areas
- ✅ **Screen reader compatibility** - Semantic HTML, ARIA landmarks

---

## 🔧 Tool Installation

### 1. Axe DevTools Browser Extension

**Chrome/Edge Installation:**
1. Go to [Chrome Web Store](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)
2. Click **"Add to Chrome"** or **"Add to Edge"**
3. Accept permissions
4. Extension icon appears in toolbar

**Firefox Installation:**
1. Go to [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/axe-devtools/)
2. Click **"Add to Firefox"**
3. Accept permissions

**Verification:**
1. Press **F12** to open DevTools
2. Look for **"Axe DevTools"** tab (may need to click ">>" to see it)
3. If installed correctly, you'll see "Scan" button

### 2. Lighthouse (Built into Chrome)

**Already Installed** in Chrome/Edge - no installation needed

**Access:**
1. Press **F12** → **Lighthouse** tab
2. Select checkboxes: Performance, Accessibility, Best Practices, SEO, PWA
3. Click **"Analyze page load"**

### 3. WAVE Browser Extension

**Chrome Installation:**
1. Go to [Chrome Web Store](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh)
2. Click **"Add to Chrome"**
3. WAVE icon appears in toolbar

**Firefox Installation:**
1. Go to [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/wave-accessibility-tool/)
2. Click **"Add to Firefox"**

### 4. Screen Readers

**Windows - NVDA (Free)**
```bash
# Download from https://www.nvaccess.org/download/
# Install and run
# Toggle on/off: NVDA+Q (quit), Ctrl to stop speaking
```

**Mac - VoiceOver (Built-in)**
```bash
# Enable: System Preferences → Accessibility → VoiceOver → Enable
# Shortcut: Cmd+F5 (or Cmd+Touch ID 3 times)
# Toggle on/off: Cmd+F5
```

**Windows - JAWS (Paid - 40-minute trial sessions)**
```bash
# Download from https://www.freedomscientific.com/Downloads/JAWS
# Expensive ($90/year), but industry standard
```

### 5. Color Contrast Analyzers

**WebAIM Contrast Checker (Online)**
- https://webaim.org/resources/contrastchecker/

**Colour Contrast Analyser (Desktop App)**
- https://www.tpgi.com/color-contrast-checker/

---

## 📋 Step-by-Step Testing Process

### Phase 1: Automated Testing

#### Test 1: Axe DevTools Scan

**Step 1: Open Axe DevTools**
1. Navigate to page to test (e.g., `/search`)
2. Press **F12** → **Axe DevTools** tab
3. Click **"Scan ENTIRE page"** button

**Step 2: Review Results**

The scan will show:
- **Critical Issues** (red) - Must fix before launch
- **Serious Issues** (orange) - High priority fixes
- **Moderate Issues** (yellow) - Should fix
- **Minor Issues** (blue) - Nice to fix

**Example Output:**
```
✅ 0 Critical Issues
⚠️  2 Serious Issues
⚠️  5 Moderate Issues
ℹ️  3 Minor Issues
```

**Step 3: Fix Issues**

Click each issue to see:
- **Issue description** - What's wrong
- **Affected element** - Where the problem is (highlights in page)
- **Impact** - Severity level (critical/serious/moderate/minor)
- **How to fix** - Specific recommendations
- **WCAG criteria** - Which WCAG rule is violated

**Common Issues and Fixes:**

**Issue: "Button does not have accessible name"**
```tsx
// ❌ Before
<button onClick={handleClick}>
  <SearchIcon />
</button>

// ✅ After
<button onClick={handleClick} aria-label="Search vehicles">
  <SearchIcon aria-hidden="true" />
</button>
```

**Issue: "Form element does not have a label"**
```tsx
// ❌ Before
<input type="text" placeholder="Enter year" />

// ✅ After
<label htmlFor="year">Vehicle Year</label>
<input id="year" type="text" placeholder="Enter year" />
```

**Issue: "Color contrast is insufficient"**
```css
/* ❌ Before - 3:1 ratio (fails WCAG AA) */
color: #999999;
background: #ffffff;

/* ✅ After - 4.5:1 ratio (passes WCAG AA) */
color: #666666;
background: #ffffff;
```

**Step 4: Re-scan**

After fixing issues:
1. Save changes
2. Refresh page
3. Click **"Scan ENTIRE page"** again
4. Verify issues are resolved

**Step 5: Test All Pages**

Repeat for every page:
- [ ] `/` (Homepage)
- [ ] `/search`
- [ ] `/search-by-category`
- [ ] `/parts`
- [ ] `/problems`
- [ ] `/database`
- [ ] `/dashboard`
- [ ] `/profile`
- [ ] `/about`
- [ ] `/contact`
- [ ] `/privacy`
- [ ] `/terms`

#### Test 2: Lighthouse Accessibility Audit

**Step 1: Run Lighthouse**
1. Press **F12** → **Lighthouse** tab
2. Select: ✅ Accessibility, ✅ Performance, ✅ Best Practices, ✅ SEO, ✅ PWA
3. Click **"Analyze page load"**

**Step 2: Review Accessibility Score**

**Target Score: 95+**

If score < 95:
1. Scroll to **"Accessibility"** section
2. Expand **"Failed audits"**
3. Fix each issue (similar to Axe DevTools)

**Common Lighthouse Issues:**

- **"Document does not have a <meta name=\"viewport\"> tag"**
  ```html
  <!-- Add to <head> in layout.tsx -->
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  ```

- **"Heading elements are not in sequentially descending order"**
  ```tsx
  // ❌ Before
  <h1>Dashboard</h1>
  <h3>Recent Searches</h3> {/* Skips h2 */}

  // ✅ After
  <h1>Dashboard</h1>
  <h2>Recent Searches</h2>
  ```

- **"Links do not have discernible text"**
  ```tsx
  // ❌ Before
  <a href="/search"><Icon /></a>

  // ✅ After
  <a href="/search" aria-label="Go to search">
    <Icon aria-hidden="true" />
  </a>
  ```

**Step 3: Optimize Performance**

While testing accessibility, also check:
- **Performance score: 90+**
- **First Contentful Paint: < 2 seconds**
- **Time to Interactive: < 5 seconds**

**Step 4: Document Results**

Save Lighthouse report:
1. Click **"Save report"** (floppy disk icon)
2. Save as HTML or JSON
3. Store in `docs/testing/lighthouse-reports/`

#### Test 3: WAVE Evaluation

**Step 1: Run WAVE**
1. Navigate to page
2. Click **WAVE extension icon** in browser toolbar
3. Wait for scan to complete

**Step 2: Review Results**

WAVE shows:
- **Errors** (red) - Accessibility failures
- **Alerts** (yellow) - Potential issues
- **Features** (green) - Accessibility features found
- **Structural elements** (blue) - Headings, lists, etc.
- **Contrast errors** (pink) - Color contrast failures

**Step 3: Use WAVE Sidebar**

Click icons in sidebar to see:
- **Details** - Description of issue
- **Code** - HTML code snippet
- **Location** - Highlighted on page

**Step 4: Check Contrast**

1. Click **"Contrast"** tab in WAVE
2. All text elements analyzed for contrast ratio
3. Fix any that fail WCAG AA (4.5:1 for normal text)

---

### Phase 2: Manual Testing

#### Test 4: Keyboard Navigation

**Why Important:** Users with motor impairments or visual impairments rely on keyboard-only navigation.

**Testing Steps:**

1. **Close/Disconnect Mouse** (forces keyboard-only)

2. **Tab Through Page**
   - Press **Tab** to move forward
   - Press **Shift+Tab** to move backward
   - Every interactive element should be reachable

3. **Verify Focus Indicators**
   - Each focused element has visible outline (2px minimum)
   - Focus indicator has sufficient contrast
   - Focus order is logical (top to bottom, left to right)

4. **Test Keyboard Actions**
   - **Enter/Space** - Activates buttons and links
   - **Arrow keys** - Navigate dropdowns, radio buttons, tabs
   - **Escape** - Closes modals, dropdowns, menus
   - **Home/End** - Jump to beginning/end of lists

5. **Test Forms**
   - Tab through all form fields
   - Labels are announced by screen readers
   - Error messages appear on invalid input
   - Submit with Enter key

**Checklist:**

- [ ] All interactive elements reachable via Tab
- [ ] Focus indicator visible on all elements (2px outline minimum)
- [ ] Focus order is logical (matches visual order)
- [ ] Skip link appears on Tab (jumps to main content)
- [ ] Modals trap focus (can't Tab out of modal)
- [ ] Escape key closes modals/dropdowns
- [ ] Enter/Space activates buttons
- [ ] Arrow keys work in dropdowns
- [ ] Can submit forms with Enter
- [ ] No keyboard traps (can always navigate away)

**Common Keyboard Issues:**

**Issue: Focus not visible**
```css
/* ❌ Before */
button:focus {
  outline: none; /* Never do this! */
}

/* ✅ After */
button:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
  box-shadow: 0 0 0 4px hsla(var(--ring) / 0.2);
}
```

**Issue: Modal doesn't trap focus**
```tsx
// ✅ Use Radix UI Dialog or implement focus trap
import { Dialog } from '@radix-ui/react-dialog';

<Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Content>
    {/* Focus automatically trapped */}
  </Dialog.Content>
</Dialog.Root>
```

#### Test 5: Screen Reader Testing

**Why Important:** Blind and visually impaired users rely on screen readers to navigate websites.

**NVDA Testing (Windows)**

**Step 1: Start NVDA**
```bash
# Launch NVDA
# Ctrl = Stop speaking
# NVDA+Down Arrow = Read next line
# NVDA+Up Arrow = Read previous line
# NVDA+Space = Toggle browse/focus mode
```

**Step 2: Navigate Page**
1. Press **H** - Jump to next heading
2. Press **K** - Jump to next link
3. Press **B** - Jump to next button
4. Press **F** - Jump to next form field
5. Press **L** - Jump to next list
6. Press **T** - Jump to next table

**Step 3: Verify Announcements**

- [ ] Page title is announced
- [ ] Skip link is announced first
- [ ] Headings are announced with level (e.g., "Dashboard, heading level 1")
- [ ] Links are announced with text (not "link" or URL)
- [ ] Buttons are announced with labels
- [ ] Form fields announced with labels
- [ ] Error messages are announced (use aria-live)
- [ ] Dynamic content updates announced

**VoiceOver Testing (Mac)**

**Step 1: Enable VoiceOver**
```bash
# Cmd+F5 to toggle VoiceOver
# VO = Ctrl+Option
```

**Step 2: Navigate Page**
1. **VO+Right Arrow** - Next element
2. **VO+Left Arrow** - Previous element
3. **VO+U** - Rotor menu (list headings, links, form controls)
4. **VO+A** - Read all
5. **VO+Shift+Down** - Interact with element

**Step 3: Test Forms**
1. Navigate to form field
2. Verify label is read
3. Enter text
4. Verify value is read
5. Submit form
6. Verify success/error message is read

**Common Screen Reader Issues:**

**Issue: Icon-only button not announced**
```tsx
// ❌ Before
<button onClick={handleSearch}>
  <SearchIcon />
</button>
// Announces: "Button" (no context)

// ✅ After
<button onClick={handleSearch} aria-label="Search vehicles">
  <SearchIcon aria-hidden="true" />
</button>
// Announces: "Search vehicles, button"
```

**Issue: Dynamic content not announced**
```tsx
// ❌ Before
<div>{searchResults.length} results found</div>

// ✅ After
<div aria-live="polite" aria-atomic="true">
  {searchResults.length} results found
</div>
// Announces update when results change
```

#### Test 6: Color Contrast Testing

**Why Important:** Users with low vision or color blindness need sufficient contrast to read text.

**WCAG AA Requirements:**
- Normal text (< 18.66px bold, < 24px): **4.5:1 minimum**
- Large text (≥ 18.66px bold, ≥ 24px): **3:1 minimum**
- UI components and graphics: **3:1 minimum**

**Testing with WebAIM Contrast Checker:**

1. Go to https://webaim.org/resources/contrastchecker/
2. Enter **Foreground color** (text color)
3. Enter **Background color**
4. Check if "WCAG AA" passes

**Testing in Browser DevTools:**

Chrome/Edge:
1. Inspect element (right-click → Inspect)
2. Hover over color in Styles panel
3. Color picker shows contrast ratio
4. ✅ = Passes WCAG AA, ❌ = Fails

**Common Contrast Failures:**

```css
/* ❌ Fails WCAG AA - 2.8:1 */
color: #999999;
background: #ffffff;

/* ✅ Passes WCAG AA - 4.5:1 */
color: #666666;
background: #ffffff;

/* ❌ Fails WCAG AA - 3.2:1 */
color: #007bff; /* Primary blue */
background: #ffffff;

/* ✅ Passes WCAG AA - 4.5:1 */
color: #0056b3; /* Darker blue */
background: #ffffff;
```

**Fix Low Contrast:**
- Darken text color
- Lighten background color
- Use bold font weight (lowers required ratio to 3:1 for large text)
- Add text shadow or background for better readability

#### Test 7: Touch Target Testing

**Why Important:** Mobile users need adequately sized touch targets to tap accurately.

**WCAG 2.1 AA Requirement: Minimum 44x44px**

**Testing Method:**

1. Open Chrome DevTools → **Device toolbar** (Ctrl+Shift+M)
2. Select mobile device (e.g., iPhone 12 Pro)
3. Inspect each interactive element
4. Check computed dimensions

**Testing with Browser Extensions:**

**Install:** https://chrome.google.com/webstore/detail/a11y-tools/kpfleokokmllclahndmochhenmhncoej

**Use:**
1. Click extension icon
2. Select "Touch Target" overlay
3. Red boxes = too small (< 44px)
4. Green boxes = adequate size (≥ 44px)

**Common Touch Target Fixes:**

```css
/* ❌ Before - 32x32px (too small) */
button {
  padding: 8px;
  font-size: 14px;
}

/* ✅ After - 48x48px (adequate) */
button {
  min-height: 48px;
  min-width: 48px;
  padding: 12px 16px;
  font-size: 16px;
}

/* ✅ Alternative - Increase clickable area without changing visuals */
.icon-button {
  position: relative;
}

.icon-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 44px;
  min-height: 44px;
}
```

#### Test 8: Zoom Testing

**Why Important:** Users with low vision often zoom to 200-400%.

**WCAG 2.1 AA Requirement: Content readable and functional at 200% zoom**

**Testing Steps:**

1. Open page in browser
2. Press **Ctrl/Cmd and +** to zoom to 200%
3. Verify:
   - [ ] All text is readable (no truncation)
   - [ ] No horizontal scrolling required
   - [ ] All functionality still works
   - [ ] Layout doesn't break
   - [ ] Images scale properly

**Common Zoom Issues:**

```css
/* ❌ Fixed width containers */
.container {
  width: 1200px; /* Breaks at zoom */
}

/* ✅ Max-width with responsive units */
.container {
  max-width: 1200px;
  width: 100%;
  padding: 0 1rem;
}

/* ❌ Fixed font sizes */
p {
  font-size: 14px; /* Doesn't respect browser zoom */
}

/* ✅ Relative font sizes */
p {
  font-size: 0.875rem; /* Respects browser zoom */
}
```

---

### Phase 3: Cross-Browser Testing

Test on multiple browsers to catch browser-specific issues:

- [ ] **Chrome** (latest)
- [ ] **Firefox** (latest)
- [ ] **Safari** (latest) - Mac/iOS
- [ ] **Edge** (latest)
- [ ] **Mobile Safari** (iOS)
- [ ] **Chrome Mobile** (Android)

---

## 📊 Accessibility Scorecard

### Target Scores

| Tool | Score | Status |
|------|-------|--------|
| Axe DevTools | 0 Critical, 0 Serious | 🎯 Required |
| Lighthouse | 95+ | 🎯 Required |
| WAVE | 0 Errors | 🎯 Required |
| Keyboard Navigation | 100% operable | 🎯 Required |
| Screen Reader | All content accessible | 🎯 Required |
| Color Contrast | All text 4.5:1+ | 🎯 Required |
| Touch Targets | All ≥ 44x44px | 🎯 Required |
| Zoom | Readable at 200% | 🎯 Required |

### Current Status (Update After Testing)

```markdown
## Accessibility Test Results

**Last Tested**: YYYY-MM-DD

### Axe DevTools Scan
- ✅ Homepage: 0 issues
- ✅ Search: 0 issues
- ⚠️  Parts: 2 moderate issues (in progress)
- ⚠️  Dashboard: 1 serious issue (fixing)

### Lighthouse Scores
- ✅ Homepage: 98
- ✅ Search: 96
- ⚠️  Parts: 92 (needs improvement)

### WAVE Results
- ✅ All pages: 0 errors
- ⚠️  Total alerts: 5 (reviewed, acceptable)

### Manual Testing
- ✅ Keyboard navigation: All pages pass
- ✅ Screen reader (NVDA): All content accessible
- ✅ Color contrast: All text meets WCAG AA
- ✅ Touch targets: All ≥ 44x44px
- ✅ Zoom: All pages readable at 200%
```

---

## 🔧 Common Accessibility Fixes

### Fix 1: Add ARIA Labels to Icon Buttons

```tsx
// All navbar/search/action buttons
<button onClick={handleClick} aria-label="Descriptive action">
  <Icon aria-hidden="true" />
</button>
```

### Fix 2: Associate Labels with Inputs

```tsx
// All form fields
<label htmlFor="make">Vehicle Make</label>
<input id="make" type="text" />
```

### Fix 3: Add aria-live for Dynamic Content

```tsx
// Search results, notifications, loading states
<div aria-live="polite" aria-atomic="true">
  {searchResults.length} results found
</div>
```

### Fix 4: Ensure Semantic HTML

```tsx
// Use proper HTML5 elements
<nav>...</nav>          // Navigation
<main>...</main>        // Main content
<article>...</article>  // Independent content
<section>...</section>  // Thematic grouping
<aside>...</aside>      // Sidebars/related content
<footer>...</footer>    // Page footer
```

### Fix 5: Implement Skip Links

```tsx
// Already in layout.tsx - verify working
<a href="#main-content" className="skip-link">
  Skip to main content
</a>
```

---

## 📝 Testing Schedule

### Before Every Commit
- [ ] Run Axe DevTools on changed pages
- [ ] Test keyboard navigation on changed components

### Weekly
- [ ] Full Lighthouse audit on all pages
- [ ] WAVE scan on all pages
- [ ] Keyboard navigation test on all pages

### Before Release
- [ ] Complete Axe DevTools scan (all pages)
- [ ] Full Lighthouse audit (all pages)
- [ ] Screen reader testing (NVDA + VoiceOver)
- [ ] Color contrast audit (all text)
- [ ] Touch target verification (all buttons/links)
- [ ] Zoom testing at 200%
- [ ] Cross-browser testing

---

## 🔗 Resources

### Tools
- **Axe DevTools**: https://www.deque.com/axe/devtools/
- **Lighthouse**: Built into Chrome
- **WAVE**: https://wave.webaim.org/extension/
- **NVDA**: https://www.nvaccess.org/
- **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/

### Documentation
- **WCAG 2.1 Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **MDN Accessibility**: https://developer.mozilla.org/en-US/docs/Web/Accessibility
- **A11y Project Checklist**: https://www.a11yproject.com/checklist/

### Training
- **Web Accessibility by Google**: https://web.dev/learn/accessibility/
- **Deque University**: https://dequeuniversity.com/
- **WebAIM Articles**: https://webaim.org/articles/

---

**Last Updated**: 2025-01-16
**Related Guides**:
- `docs/testing/PWA_TESTING_GUIDE.md` - PWA installation testing
- `docs/deployment/PLAY_STORE_CHECKLIST.md` - App store requirements
