# PWA Icon Generation Guide

This guide explains how to generate all required PWA icons for The Pickard application.

## Required Icon Sizes

### Critical (REQUIRED for App Stores)
- **icon-192x192.png** - Android home screen (maskable)
- **icon-512x512.png** - Android splash screen (maskable)

### Additional Sizes (Recommended)
- icon-72x72.png - Small Android icon
- icon-96x96.png - Medium icon
- icon-128x128.png - Chrome Web Store
- icon-144x144.png - Windows tile
- icon-152x152.png - iOS Safari
- icon-384x384.png - High DPI displays

### Shortcut Icons (Optional)
- diagnostic-96x96.png - Diagnostic Center shortcut
- parts-96x96.png - Parts Database shortcut
- dashboard-96x96.png - Dashboard shortcut

## Source Image Requirements

### Prepare Your Source Logo
1. Use the existing logo: `/images/the-pickard-logo.png`
2. Ideal source: Square image (1024x1024px minimum)
3. Format: PNG with transparency
4. Design: Simple, recognizable at small sizes
5. Safe area: Keep important elements within center 80%

## Method 1: Online Tools (Easiest)

### PWA Builder Image Generator
1. Go to https://www.pwabuilder.com/imageGenerator
2. Upload your source logo
3. Select "Generate Icons"
4. Download the icon package
5. Extract to `public/icons/` directory

### Maskable.app Editor (for maskable icons)
1. Go to https://maskable.app/editor
2. Upload your logo
3. Adjust position and padding (20% minimum safe area)
4. Preview across different mask shapes
5. Export 192x192 and 512x512 versions
6. Save as `icon-192x192.png` and `icon-512x512.png`

## Method 2: ImageMagick (CLI - Automated)

### Install ImageMagick
```bash
# Windows (via Chocolatey)
choco install imagemagick

# Mac (via Homebrew)
brew install imagemagick

# Linux (Ubuntu/Debian)
sudo apt-get install imagemagick
```

### Generate All Icons
```bash
# Navigate to icons directory
cd public/icons

# Generate from source logo (replace path to your logo)
SOURCE="../images/the-pickard-logo.png"

# Generate all sizes
magick convert $SOURCE -resize 72x72 icon-72x72.png
magick convert $SOURCE -resize 96x96 icon-96x96.png
magick convert $SOURCE -resize 128x128 icon-128x128.png
magick convert $SOURCE -resize 144x144 icon-144x144.png
magick convert $SOURCE -resize 152x152 icon-152x152.png
magick convert $SOURCE -resize 192x192 icon-192x192.png
magick convert $SOURCE -resize 384x384 icon-384x384.png
magick convert $SOURCE -resize 512x512 icon-512x512.png

# Generate shortcut icons
magick convert $SOURCE -resize 96x96 diagnostic-96x96.png
magick convert $SOURCE -resize 96x96 parts-96x96.png
magick convert $SOURCE -resize 96x96 dashboard-96x96.png
```

## Method 3: Sharp (Node.js - Programmatic)

### Install Sharp
```bash
npm install --save-dev sharp
```

### Create Generation Script
Create `scripts/generate-icons.js`:

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const source = path.join(__dirname, '../public/images/the-pickard-logo.png');
const output = path.join(__dirname, '../public/icons');

// Ensure output directory exists
if (!fs.existsSync(output)) {
  fs.mkdirSync(output, { recursive: true });
}

async function generateIcons() {
  for (const size of sizes) {
    await sharp(source)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .toFile(path.join(output, `icon-${size}x${size}.png`));

    console.log(`Generated icon-${size}x${size}.png`);
  }

  // Generate shortcut icons
  const shortcuts = ['diagnostic', 'parts', 'dashboard'];
  for (const name of shortcuts) {
    await sharp(source)
      .resize(96, 96, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .toFile(path.join(output, `${name}-96x96.png`));

    console.log(`Generated ${name}-96x96.png`);
  }

  console.log('All icons generated successfully!');
}

generateIcons().catch(console.error);
```

### Run the Script
```bash
node scripts/generate-icons.js
```

## Maskable Icon Guidelines

### What are Maskable Icons?
Maskable icons adapt to different device shapes (circle, squircle, rounded square) without cutting off important content.

### Safe Area Requirements
- **Minimum safe area**: 80% of icon size (20% padding)
- **Center your logo** within the safe area
- **Fill the entire icon** with background color or design
- **Test with different masks** at https://maskable.app/

### Creating Maskable Icons
1. Start with 512x512px canvas
2. Add background color or gradient
3. Place logo centered with 20% padding on all sides
4. Logo should be within center 80% (410x410px area)
5. Export as PNG with transparency preserved

## Verification Checklist

After generating icons:

- [ ] All required sizes present (192x192, 512x512 minimum)
- [ ] Icons display correctly at small sizes
- [ ] Maskable icons tested at https://maskable.app/
- [ ] Icons referenced in `public/manifest.json`
- [ ] Icons load in Chrome DevTools → Application → Manifest
- [ ] No transparency issues on different backgrounds
- [ ] File sizes optimized (use TinyPNG if needed)

## Update manifest.json

After generating icons, ensure `public/manifest.json` references them:

```json
{
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

## Testing Icons

### Chrome DevTools
1. Open application in Chrome
2. F12 → Application tab
3. Click "Manifest" in sidebar
4. Verify all icons load correctly

### Lighthouse Audit
1. F12 → Lighthouse tab
2. Select "Progressive Web App"
3. Click "Generate report"
4. Check "Installable" section for icon warnings

### Real Device Testing
1. Add to home screen on Android device
2. Verify icon appears correctly
3. Check splash screen (uses 512x512 icon)
4. Test on iOS Safari (uses 152x152)

## Optimization Tips

### Reduce File Size
```bash
# Using ImageMagick
magick convert input.png -quality 95 -define png:compression-level=9 output.png

# Using pngquant (lossy but smaller)
pngquant --quality=85-95 input.png -o output.png
```

### Online Tools
- **TinyPNG**: https://tinypng.com/ (drag and drop compression)
- **Squoosh**: https://squoosh.app/ (advanced settings)

## Troubleshooting

### Icons Not Showing
- Clear browser cache
- Check file paths in manifest.json
- Verify MIME types are correct
- Check browser console for 404 errors

### Maskable Icons Cut Off
- Increase padding (use 25-30% safe area)
- Test at https://maskable.app/ before finalizing
- Ensure logo is centered

### Poor Quality at Small Sizes
- Simplify logo design
- Use bold, clear shapes
- Increase contrast
- Test at actual icon sizes

## Resources

- **PWA Builder**: https://www.pwabuilder.com/imageGenerator
- **Maskable App**: https://maskable.app/
- **ImageMagick Docs**: https://imagemagick.org/
- **Sharp Documentation**: https://sharp.pixelplumbing.com/
- **Web.dev PWA Guide**: https://web.dev/pwa-checklist/
