# Play Store & App Store Submission Checklist

## Overview

This checklist ensures all required assets and documentation are ready before submitting The Pickard to Google Play Store and Apple App Store.

---

## ⚠️ CRITICAL - Must Complete Before Submission

### 1. PWA Icons (REQUIRED)

**Location**: `public/icons/`

Generate the following icon sizes:

- [ ] `icon-72x72.png` - Small Android icon
- [ ] `icon-96x96.png` - Medium icon
- [ ] `icon-128x128.png` - Chrome Web Store
- [ ] `icon-144x144.png` - Windows tile
- [ ] `icon-152x152.png` - iOS Safari
- [ ] **`icon-192x192.png`** - ⚠️ **REQUIRED** - Android home screen (maskable)
- [ ] `icon-384x384.png` - High DPI displays
- [ ] **`icon-512x512.png`** - ⚠️ **REQUIRED** - Android splash screen (maskable)

**Shortcut Icons**:
- [ ] `diagnostic-96x96.png` - Diagnostic Center shortcut
- [ ] `parts-96x96.png` - Parts Database shortcut
- [ ] `dashboard-96x96.png` - Dashboard shortcut

**Instructions**: See `public/icons/README.md` for generation guide

**Tools**:
- [PWA Icon Generator](https://www.pwabuilder.com/imageGenerator)
- [Maskable Icon Editor](https://maskable.app/editor)
- ImageMagick (CLI tool)

**Testing**:
- [ ] Test icons load in Chrome DevTools → Application → Manifest
- [ ] Verify maskable icons in [Maskable.app](https://maskable.app/)
- [ ] Check icons on actual Android/iOS devices

---

### 2. App Screenshots (REQUIRED)

**Location**: `public/screenshots/`

#### Desktop/Wide Format (1280x720)
- [ ] `desktop-1.png` - Dashboard overview
- [ ] `desktop-2.png` - Diagnostic center interface
- [ ] `desktop-3.png` - Parts database search

#### Mobile/Narrow Format (750x1334 or 1080x1920)
- [ ] `mobile-1.png` - Mobile diagnostic search
- [ ] `mobile-2.png` - Mobile parts lookup
- [ ] `mobile-3.png` - Mobile dashboard

**Instructions**: See `public/screenshots/README.md` for capture guide

**Requirements**:
- High resolution (no compression artifacts)
- Real app interface (no mockups)
- Realistic data (no Lorem Ipsum)
- Readable text and UI elements

**Tools**:
- Chrome DevTools screenshot capture
- [Screely](https://screely.com/) - Add browser frames
- [Screenshot.rocks](https://screenshot.rocks/) - Device frames

---

### 3. Privacy Policy & Terms (REQUIRED)

**Status**: ⚠️ **NEEDS CREATION**

#### Privacy Policy
- [ ] Create `docs/legal/PRIVACY_POLICY.md`
- [ ] Host publicly accessible version (required by app stores)
- [ ] Include sections:
  - What data is collected (user accounts, search history, saved results)
  - How data is used (personalization, analytics)
  - Third-party services (Clerk, Google Custom Search, Neon)
  - User rights (GDPR, CCPA compliance)
  - Data retention policies
  - Contact information

#### Terms of Service
- [ ] Create `docs/legal/TERMS_OF_SERVICE.md`
- [ ] Host publicly accessible version
- [ ] Include sections:
  - Acceptable use policy
  - User responsibilities
  - Intellectual property rights
  - Liability limitations
  - Dispute resolution

**Public URLs Required**:
- Privacy Policy: `https://your-domain.com/privacy`
- Terms of Service: `https://your-domain.com/terms`

**Templates**:
- [TermsFeed Privacy Policy Generator](https://www.termsfeed.com/privacy-policy-generator/)
- [Privacy Policies Generator](https://www.privacypolicies.com/)

---

### 4. GitHub Repository URL (REQUIRED UPDATE)

**File**: `docs/developers/CONTRIBUTING.md`

- [ ] Replace `YOUR_ORG` with actual GitHub organization/username
- [ ] Update line 18: `git clone https://github.com/YOUR_ORG/the-pickard.git`
- [ ] Verify repository is public or properly licensed

**Current Status**: Contains placeholder `YOUR_ORG`

---

### 5. Content Rating (Google Play)

- [ ] Complete content rating questionnaire in Play Console
- [ ] Expected rating: **Everyone** or **Everyone 10+**
- [ ] No ads, gambling, mature content

---

### 6. App Store Metadata

#### Google Play Store
- [ ] **App Name**: "The Pickard - Auto Mechanics"
- [ ] **Short Description** (80 chars): "Professional automotive diagnostic and repair database"
- [ ] **Full Description** (4000 chars): Write compelling app description
- [ ] **Category**: Business or Productivity
- [ ] **Contact Email**: your-support@email.com
- [ ] **Website URL**: https://your-domain.com
- [ ] **Privacy Policy URL**: https://your-domain.com/privacy

#### Apple App Store
- [ ] **App Name**: "The Pickard"
- [ ] **Subtitle** (30 chars): "Auto Mechanics Database"
- [ ] **Description** (4000 chars): Same as Google Play
- [ ] **Keywords** (100 chars): "automotive,mechanic,diagnostic,repair,parts,database"
- [ ] **Category**: Business or Utilities
- [ ] **Support URL**: https://your-domain.com/support
- [ ] **Privacy Policy URL**: https://your-domain.com/privacy

---

## 📱 Technical Requirements

### Google Play Store

#### APK/AAB Generation
- [ ] Install Capacitor: `npm install @capacitor/core @capacitor/cli`
- [ ] Initialize: `npx cap init "The Pickard" "com.pickard.app"`
- [ ] Add Android: `npx cap add android`
- [ ] Build: `npm run build && npx cap sync`
- [ ] Generate release AAB in Android Studio

#### Testing
- [ ] Test on Android 8.0+ devices
- [ ] Test on tablets and phones
- [ ] Verify all features work offline
- [ ] Check performance on low-end devices

#### Requirements
- [ ] Minimum SDK: API 24 (Android 7.0)
- [ ] Target SDK: Latest (API 34+)
- [ ] 64-bit architecture support
- [ ] Signed with release keystore

---

### Apple App Store

#### iOS Build
- [ ] Apple Developer Account ($99/year)
- [ ] Add iOS: `npx cap add ios`
- [ ] Open Xcode: `npx cap open ios`
- [ ] Configure:
  - Bundle identifier: `com.pickard.app`
  - Signing certificates
  - Deployment target: iOS 14+
  - Required permissions in Info.plist

#### Testing
- [ ] Test on iPhone and iPad
- [ ] Test iOS 14, 15, 16, 17+
- [ ] TestFlight beta testing
- [ ] Handle safe areas (notch, Dynamic Island)

#### App Store Connect
- [ ] Create app listing
- [ ] Upload build via Xcode
- [ ] Submit for review
- [ ] Respond to rejection feedback (if any)

---

## 🔍 Quality Assurance

### Functionality Testing
- [ ] User authentication (sign up, sign in, sign out)
- [ ] Vehicle search with filters
- [ ] Parts database search
- [ ] Web search integration
- [ ] Save/bookmark functionality
- [ ] Offline mode works
- [ ] PWA installation works

### Performance Testing
- [ ] Lighthouse PWA score: 95+ ✅
- [ ] First Contentful Paint: < 2 seconds
- [ ] Time to Interactive: < 5 seconds
- [ ] Works on 3G network
- [ ] Bundle size optimized

### Accessibility Testing
- [ ] Screen reader compatible
- [ ] Keyboard navigation works
- [ ] Touch targets minimum 44x44px
- [ ] Color contrast WCAG AA compliant
- [ ] Test with VoiceOver (iOS) and TalkBack (Android)

### Security Testing
- [ ] All API endpoints secured
- [ ] Environment variables not exposed
- [ ] HTTPS enforced
- [ ] No security warnings in browser console
- [ ] OWASP security best practices followed

---

## 📄 Documentation Complete

- [x] API documentation (`docs/developers/API.md`) ✅
- [x] User guide (`docs/users/USER-GUIDE.md`) ✅
- [x] Admin guide (`docs/admins/ADMIN-GUIDE.md`) ✅
- [x] Contributing guide (`docs/developers/CONTRIBUTING.md`) ✅
- [x] Environment setup (`docs/developers/ENVIRONMENT.md`) ✅
- [x] Mobile deployment (`docs/deployment/MOBILE-DEPLOYMENT.md`) ✅
- [x] PWA manifest (`public/manifest.json`) ✅
- [ ] Privacy policy (⚠️ REQUIRED)
- [ ] Terms of service (⚠️ REQUIRED)

---

## 🚀 Deployment Steps

### Phase 1: Pre-Submission
1. Complete all checklist items above
2. Generate all required icons
3. Capture all required screenshots
4. Create privacy policy and terms of service
5. Test thoroughly on actual devices

### Phase 2: Google Play Store
1. Create Google Play Console account ($25 one-time)
2. Generate signed release AAB
3. Create store listing with metadata
4. Upload AAB and screenshots
5. Complete content rating questionnaire
6. Submit for review (typically 1-3 days)

### Phase 3: Apple App Store
1. Create Apple Developer account ($99/year)
2. Generate iOS build in Xcode
3. Create App Store Connect listing
4. Upload build and screenshots
5. Submit for review (typically 1-2 days)
6. Respond to any feedback

### Phase 4: Post-Launch
1. Monitor user reviews and ratings
2. Respond to user feedback
3. Track analytics and usage
4. Plan updates and improvements

---

## ⏰ Timeline Estimate

| Task | Time Estimate |
|------|---------------|
| Generate icons | 1-2 hours |
| Capture screenshots | 2-3 hours |
| Write privacy policy & terms | 4-6 hours |
| Android build setup | 2-4 hours |
| iOS build setup | 3-5 hours |
| Testing on devices | 4-8 hours |
| Store listing creation | 2-3 hours |
| **Total** | **18-31 hours** |

**Review Time**:
- Google Play: 1-3 days
- Apple App Store: 1-2 days (can be longer)

---

## 📞 Support Resources

### App Store Policies
- [Google Play Policy Center](https://play.google.com/about/developer-content-policy/)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)

### Technical Documentation
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [PWA Builder](https://www.pwabuilder.com/)
- [Web.dev PWA Guide](https://web.dev/progressive-web-apps/)

### Testing Tools
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [PWA Manifest Validator](https://manifest-validator.appspot.com/)
- [TestFlight (iOS)](https://developer.apple.com/testflight/)

---

## ✅ Final Pre-Submission Checklist

Right before submission, verify:

- [ ] All icons generated and loading correctly
- [ ] All screenshots captured and looking professional
- [ ] Privacy policy publicly accessible
- [ ] Terms of service publicly accessible
- [ ] App tested on multiple real devices
- [ ] No console errors or warnings
- [ ] Lighthouse PWA score 95+
- [ ] Build signed with release certificate
- [ ] Version number and build number set correctly
- [ ] Store listing text proofread and compelling
- [ ] Contact email working and monitored
- [ ] Support website live and functional

---

**Last Updated**: 2024-01-15

**Status**: 🟡 In Progress - Complete critical items above before submission
