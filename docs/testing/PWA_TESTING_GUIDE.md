# PWA Installation Testing Guide

## Overview

This guide explains how to test Progressive Web App (PWA) installation on Android and iOS devices to ensure The Pickard app can be installed and functions properly as a standalone application.

---

## 📱 Why Test PWA Installation?

PWA installation testing is **critical** before app store submission because:

1. **App Store Requirement** - Both Google Play and Apple App Store require PWA functionality
2. **User Experience** - Ensures app installs correctly with proper icons and splash screens
3. **Offline Functionality** - Verifies service workers and caching work properly
4. **Performance** - Tests app load times and responsiveness on actual devices
5. **Icon Verification** - Confirms maskable icons display correctly on different device shapes

---

## 🤖 Android Testing (Chrome/Edge)

### Prerequisites

- Android device (physical or emulator) running Android 8.0+
- Chrome or Microsoft Edge browser installed
- Device connected to same network as development server OR deployed to production

### Testing Methods

#### Method 1: Local Development Testing

**Step 1: Enable Development Access**
```bash
# Find your local IP address
# Windows PowerShell:
ipconfig | findstr IPv4

# Mac/Linux:
ifconfig | grep "inet "

# Example output: 192.168.1.100
```

**Step 2: Start Development Server**
```bash
npm run dev -- --hostname 0.0.0.0
```

**Step 3: Access on Android Device**
1. Open Chrome on Android device
2. Navigate to `http://YOUR_LOCAL_IP:3000` (e.g., `http://192.168.1.100:3000`)
3. Allow connection if firewall prompts appear

**Step 4: Install PWA**
1. In Chrome, tap the **three-dot menu** (⋮) → **"Add to Home screen"** or **"Install app"**
2. Confirm the app name and icon in the install prompt
3. Tap **"Add"** or **"Install"**

#### Method 2: Production Testing

**Step 1: Deploy to Production**
```bash
# Vercel deployment
vercel --prod

# Or your production URL
```

**Step 2: Access Production URL**
1. Open Chrome on Android device
2. Navigate to your production URL (e.g., `https://the-pickard.vercel.app`)
3. Wait for page to fully load

**Step 3: Install PWA**
1. Chrome will show an **automatic install banner** at the bottom
2. Tap **"Install"** in the banner
3. OR tap three-dot menu → "Add to Home screen"

### Android Installation Verification Checklist

- [ ] **Install prompt appears** automatically or in menu
- [ ] **App icon displays correctly** on home screen
- [ ] **App name shows** as "The Pickard" (not URL)
- [ ] **Icon is not cut off** (maskable icon safe area working)
- [ ] **Splash screen appears** when launching app (uses 512x512 icon)
- [ ] **App opens in standalone mode** (no browser UI/address bar)
- [ ] **Status bar color** matches theme color (#3b82f6)
- [ ] **Shortcuts work** (long-press app icon shows diagnostic/parts/dashboard shortcuts)
- [ ] **Offline mode works** (airplane mode still shows cached content)
- [ ] **App updates properly** when online again

### Android Testing Tools

**Chrome DevTools Remote Debugging**

1. Connect Android device via USB
2. Enable USB debugging on Android: Settings → Developer Options → USB Debugging
3. Open Chrome on desktop → `chrome://inspect`
4. Click "Inspect" next to your device
5. Use DevTools to inspect PWA manifest, service worker, and cache

**Lighthouse Audit on Android**

1. In Chrome DevTools (remote debugging):
   - Click **Lighthouse** tab
   - Select **Progressive Web App**
   - Click **"Generate report"**
2. Target scores:
   - PWA: 95+
   - Performance: 90+
   - Accessibility: 95+

---

## 🍎 iOS Testing (Safari)

### Prerequisites

- iPhone or iPad running iOS 14+
- Safari browser (default browser on iOS)
- Deployed to production (iOS **does not support** localhost PWA installation)

### Important iOS Limitations

⚠️ **iOS has strict PWA requirements**:
- **No localhost installation** - Must be deployed to HTTPS production URL
- **Safari only** - Chrome/Firefox on iOS cannot install PWAs
- **Limited features** - Some PWA features not supported (push notifications, background sync)
- **No automatic install prompt** - Users must manually add to home screen

### Testing Method: Production Only

**Step 1: Deploy to Production**
```bash
vercel --prod
# Ensure using HTTPS (required for iOS PWA)
```

**Step 2: Access on iOS Device**
1. Open **Safari** on iPhone/iPad
2. Navigate to your production URL
3. Wait for page to fully load

**Step 3: Install PWA**
1. Tap the **Share button** (square with arrow pointing up)
2. Scroll down and tap **"Add to Home Screen"**
3. Edit app name if needed (default: "The Pickard")
4. Tap **"Add"** in top-right corner

### iOS Installation Verification Checklist

- [ ] **Share menu shows** "Add to Home Screen" option
- [ ] **App icon displays correctly** (uses 152x152 icon)
- [ ] **App name shows** on home screen
- [ ] **Icon preview looks correct** in add-to-home-screen dialog
- [ ] **App opens in standalone mode** (no Safari UI)
- [ ] **Status bar style** is correct (light/dark based on theme)
- [ ] **Safe area insets respected** (notch/Dynamic Island on iPhone)
- [ ] **Splash screen appears** (iOS generates from icon and background color)
- [ ] **Offline mode works** (limited - iOS caches less aggressively)
- [ ] **App persists** after closing and reopening

### iOS Testing Tools

**Safari Web Inspector**

1. On Mac, open **Safari** → **Preferences** → **Advanced** → Enable "Show Develop menu"
2. Connect iPhone/iPad via USB and trust computer
3. On iPhone, open your PWA in Safari
4. On Mac, Safari → **Develop** → [Your iPhone Name] → [Your PWA]
5. Use Web Inspector to check manifest, console errors, network

**iOS Simulator Testing (Mac Only)**

```bash
# Install Xcode from App Store

# Open Simulator
open -a Simulator

# In Simulator, open Safari and navigate to production URL
# Add to Home Screen (same steps as real device)
```

**Lighthouse Audit via Desktop Chrome**

1. Open Chrome DevTools on desktop
2. Click **Device toolbar** (Ctrl+Shift+M / Cmd+Shift+M)
3. Select **iPhone 12 Pro** or similar iOS device
4. Navigate to production URL
5. Run Lighthouse audit (PWA, Performance, Accessibility)

---

## 🧪 Comprehensive Testing Checklist

### Pre-Installation Testing

**Desktop Browser (Development)**

- [ ] Run `npm run dev`
- [ ] Open Chrome → F12 → **Application** tab
- [ ] Verify **Manifest** section shows:
  - ✅ Name: "The Pickard - Automotive Mechanics Database"
  - ✅ Short name: "The Pickard"
  - ✅ Start URL: "/"
  - ✅ Display: "standalone"
  - ✅ Theme color: "#3b82f6"
  - ✅ All icons loading (no 404 errors)
  - ✅ Shortcuts: Diagnostic Center, Parts, Dashboard
- [ ] Verify **Service Worker** is registered and active
- [ ] Check **Cache Storage** has cached files
- [ ] Run **Lighthouse audit**: PWA score 95+

**Manifest Validator**

- [ ] Go to https://manifest-validator.appspot.com/
- [ ] Paste manifest.json content
- [ ] Fix any validation errors

**Maskable Icon Testing**

- [ ] Go to https://maskable.app/editor
- [ ] Upload icon-192x192.png and icon-512x512.png
- [ ] Test with different mask shapes (circle, squircle, rounded square)
- [ ] Verify logo is within safe area (20% padding)
- [ ] Ensure important content is not cut off

### Android Device Testing

**Installation**
- [ ] Install via Chrome on Android 8.0+
- [ ] Install via Microsoft Edge (alternative browser)
- [ ] Test on multiple devices (phone, tablet)
- [ ] Test on different Android versions (8, 9, 10, 11, 12, 13+)

**Visual Appearance**
- [ ] Icon displays correctly on home screen
- [ ] Icon matches preview in install dialog
- [ ] Splash screen uses correct icon and colors
- [ ] App name is correct (not URL)

**Functionality**
- [ ] App opens in standalone mode (no browser UI)
- [ ] Navigation works correctly
- [ ] Authentication works (Clerk login)
- [ ] All features accessible (search, parts, dashboard)
- [ ] Shortcuts work (long-press app icon)

**Offline Mode**
- [ ] Enable airplane mode on Android
- [ ] Open PWA app
- [ ] Verify cached pages load
- [ ] Verify offline message appears for uncached content
- [ ] Disable airplane mode
- [ ] Verify app syncs and updates

**Updates**
- [ ] Make a change to app code
- [ ] Deploy updated version
- [ ] Open installed PWA
- [ ] Verify service worker detects update
- [ ] Verify app prompts user to reload (if implemented)
- [ ] Verify app updates successfully

### iOS Device Testing

**Installation**
- [ ] Install via Safari on iOS 14+
- [ ] Test on iPhone (standard, Plus, Pro, Pro Max)
- [ ] Test on iPad
- [ ] Test on different iOS versions (14, 15, 16, 17+)

**Visual Appearance**
- [ ] Icon displays correctly on home screen
- [ ] Icon preview in add-to-home dialog is correct
- [ ] Splash screen appears with correct icon
- [ ] Safe area insets respected (notch, Dynamic Island)

**Functionality**
- [ ] App opens in standalone mode
- [ ] Navigation works correctly
- [ ] Authentication works (Clerk login)
- [ ] All features accessible
- [ ] Viewport scales correctly on different screen sizes

**Offline Mode (Limited)**
- [ ] Enable airplane mode on iOS
- [ ] Open PWA app
- [ ] Verify some content still loads (iOS caches less)
- [ ] Disable airplane mode
- [ ] Verify app resumes normal operation

---

## 🔍 Common Issues & Solutions

### Issue: "Add to Home Screen" Not Appearing

**Android (Chrome)**

**Possible Causes:**
- Manifest.json not found or has errors
- Icons missing or wrong sizes
- Not served over HTTPS (production)
- Service worker not registered

**Solutions:**
1. Check Chrome DevTools → Application → Manifest (fix errors)
2. Verify all icon files exist in /public/icons/
3. Deploy to HTTPS production URL
4. Register service worker in next.config.js or app code

**iOS (Safari)**

**Possible Causes:**
- Accessing via localhost (not supported)
- Not using Safari browser
- Manifest errors

**Solutions:**
1. Deploy to production HTTPS URL
2. Use Safari (not Chrome/Firefox on iOS)
3. Validate manifest.json

### Issue: Icons Appear Cut Off or Blurry

**Cause:** Maskable icons don't have proper safe area padding

**Solution:**
1. Go to https://maskable.app/editor
2. Upload your icon
3. Ensure logo is within 80% safe area (20% padding on all sides)
4. Re-export icon
5. Update manifest.json with `"purpose": "any maskable"`

### Issue: Offline Mode Not Working

**Cause:** Service worker not registered or caching strategy incorrect

**Solutions:**
1. Check if service worker is registered:
   ```javascript
   // In Chrome DevTools → Application → Service Workers
   // Should show "activated and running"
   ```
2. Verify cache strategy in service worker code
3. Check Network tab → Disable cache is OFF
4. Clear cache and reinstall PWA

### Issue: App Opens in Browser Instead of Standalone

**Android:**
- Uninstall and reinstall PWA
- Ensure manifest.json has `"display": "standalone"`
- Check for conflicting browser settings

**iOS:**
- Ensure added via Safari → Share → "Add to Home Screen" (not "Add Bookmark")
- Check manifest.json display mode
- Reinstall if needed

### Issue: Updates Not Appearing

**Cause:** Service worker not detecting updates or user not clearing cache

**Solutions:**
1. Implement update detection in service worker
2. Show "New version available" prompt to user
3. Clear cache and reload
4. For testing: Chrome DevTools → Application → Service Workers → "Update on reload"

---

## 📊 Testing Checklist Summary

### Before Submission to App Stores

- [ ] **Desktop Chrome DevTools**
  - [ ] Manifest valid, all icons load
  - [ ] Service worker registered
  - [ ] Lighthouse PWA score: 95+
  - [ ] Lighthouse Performance score: 90+
  - [ ] Lighthouse Accessibility score: 95+

- [ ] **Maskable Icons**
  - [ ] Tested at https://maskable.app/
  - [ ] Logo within 80% safe area
  - [ ] All mask shapes look correct

- [ ] **Android Installation**
  - [ ] Installed successfully on 2+ devices
  - [ ] Icons display correctly
  - [ ] Standalone mode works
  - [ ] Offline mode works
  - [ ] Shortcuts work

- [ ] **iOS Installation**
  - [ ] Installed successfully on iPhone
  - [ ] Installed successfully on iPad
  - [ ] Icons display correctly
  - [ ] Standalone mode works
  - [ ] Safe areas respected

- [ ] **Cross-Device Testing**
  - [ ] Different screen sizes
  - [ ] Different OS versions
  - [ ] Portrait and landscape orientations
  - [ ] Touch interactions work properly

---

## 🔗 Resources

### Testing Tools

- **Chrome DevTools**: F12 → Application tab
- **Lighthouse**: Chrome DevTools → Lighthouse tab
- **Manifest Validator**: https://manifest-validator.appspot.com/
- **Maskable Icon Editor**: https://maskable.app/editor
- **PWA Builder**: https://www.pwabuilder.com/

### Documentation

- **MDN Web App Manifest**: https://developer.mozilla.org/en-US/docs/Web/Manifest
- **Google PWA Checklist**: https://web.dev/pwa-checklist/
- **Apple iOS Web App Guide**: https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html

### Debugging Tools

- **Chrome Remote Debugging**: chrome://inspect
- **Safari Web Inspector**: Safari → Develop → [Device Name]
- **iOS Simulator**: Xcode → Open Developer Tool → Simulator

---

## 🎯 Key Takeaways

1. **Android is easier** - Supports localhost, automatic prompts, better PWA support
2. **iOS requires production** - Must deploy to HTTPS, manual installation only
3. **Test on real devices** - Simulators don't catch all issues
4. **Maskable icons are critical** - Test with https://maskable.app/ before submission
5. **Offline functionality varies** - Android caches aggressively, iOS is limited
6. **Updates need testing** - Verify app updates properly after code changes

---

**Last Updated**: 2025-01-16
**Related Guides**:
- `public/icons/ICON_GENERATION_GUIDE.md` - Icon creation
- `docs/testing/ACCESSIBILITY_TESTING_GUIDE.md` - Accessibility testing
- `docs/deployment/PLAY_STORE_CHECKLIST.md` - App store submission
