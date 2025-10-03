# PWA Icons Directory

This directory contains the Progressive Web App (PWA) icons for The Pickard application.

## Required Icon Sizes

### Standard Sizes
- `icon-72x72.png` - Small Android icon
- `icon-96x96.png` - Medium icon
- `icon-128x128.png` - Chrome Web Store
- `icon-144x144.png` - Windows tile
- `icon-152x152.png` - iOS Safari
- `icon-192x192.png` - **Required** - Android home screen (maskable)
- `icon-384x384.png` - High DPI displays
- `icon-512x512.png` - **Required** - Android splash screen (maskable)

### Shortcut Icons
- `diagnostic-96x96.png` - Diagnostic Center shortcut
- `parts-96x96.png` - Parts Database shortcut
- `dashboard-96x96.png` - Dashboard shortcut

## Icon Guidelines

### Design Requirements
- **Format**: PNG with transparency
- **Background**: Transparent or solid color (#3b82f6 theme color)
- **Content**: The Pickard logo/symbol
- **Safe Area**: For maskable icons, keep content within 80% of canvas
- **Padding**: Minimum 10% padding on all sides for maskable icons

### Maskable Icons
Icons marked as "maskable" (192x192 and 512x512) should follow the maskable icon specification:
- Content should fit within the safe zone (80% of the canvas)
- Background should be solid or opaque
- Test with [Maskable.app](https://maskable.app/)

## How to Generate Icons

### Option 1: Using an Icon Generator
1. Go to [PWA Icon Generator](https://www.pwabuilder.com/imageGenerator)
2. Upload your source logo (preferably 1024x1024 PNG)
3. Download the generated icon pack
4. Extract icons to this directory

### Option 2: Using Figma/Photoshop
1. Create artboards for each required size
2. Place your logo with proper padding
3. Export as PNG with transparency
4. Save to this directory with correct filenames

### Option 3: Using ImageMagick (CLI)
```bash
# Install ImageMagick
# Then run from a 1024x1024 source image:

convert source.png -resize 72x72 icon-72x72.png
convert source.png -resize 96x96 icon-96x96.png
convert source.png -resize 128x128 icon-128x128.png
convert source.png -resize 144x144 icon-144x144.png
convert source.png -resize 152x152 icon-152x152.png
convert source.png -resize 192x192 icon-192x192.png
convert source.png -resize 384x384 icon-384x384.png
convert source.png -resize 512x512 icon-512x512.png

# For shortcut icons
convert source.png -resize 96x96 diagnostic-96x96.png
convert source.png -resize 96x96 parts-96x96.png
convert source.png -resize 96x96 dashboard-96x96.png
```

## Current Status

⚠️ **PLACEHOLDER** - Icons need to be generated

Please generate the required icons before deploying to production or submitting to app stores.

## Testing

After adding icons, test your PWA manifest:
1. Open Chrome DevTools → Application → Manifest
2. Verify all icons load correctly
3. Check for warnings about missing or incorrect sizes
4. Test installation on Android/iOS devices

## Validation

Use these tools to validate your icons:
- [PWA Manifest Validator](https://manifest-validator.appspot.com/)
- [Maskable Icon Editor](https://maskable.app/editor)
- Chrome DevTools → Lighthouse → PWA audit
