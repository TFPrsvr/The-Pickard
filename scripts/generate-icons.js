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
  console.log('🎨 Starting PWA icon generation...\n');

  // Get source image dimensions
  const metadata = await sharp(source).metadata();
  console.log(`📏 Source image: ${metadata.width}x${metadata.height}px\n`);

  for (const size of sizes) {
    try {
      // For maskable icons (192 and 512), add extra padding (20% safe area)
      const isMaskable = size === 192 || size === 512;
      const padding = isMaskable ? Math.round(size * 0.2) : Math.round(size * 0.1);

      // Calculate the logo size (80% of icon for maskable, 90% for others)
      const logoSize = size - (padding * 2);

      await sharp(source)
        .resize(logoSize, logoSize, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 } // White background
        })
        .extend({
          top: padding,
          bottom: padding,
          left: padding,
          right: padding,
          background: { r: 255, g: 255, b: 255, alpha: 1 } // White background
        })
        .png({ quality: 100, compressionLevel: 9 })
        .toFile(path.join(output, `icon-${size}x${size}.png`));

      console.log(`✅ Generated icon-${size}x${size}.png ${isMaskable ? '(maskable)' : ''}`);
    } catch (error) {
      console.error(`❌ Failed to generate icon-${size}x${size}.png:`, error.message);
    }
  }

  // Generate shortcut icons (all use 96x96)
  const shortcuts = [
    { name: 'diagnostic', displayName: 'Diagnostic Center' },
    { name: 'parts', displayName: 'Parts Database' },
    { name: 'dashboard', displayName: 'Dashboard' }
  ];

  console.log('\n🔗 Generating shortcut icons...\n');

  for (const shortcut of shortcuts) {
    try {
      const shortcutSize = 96;
      const padding = Math.round(shortcutSize * 0.1);
      const logoSize = shortcutSize - (padding * 2);

      await sharp(source)
        .resize(logoSize, logoSize, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .extend({
          top: padding,
          bottom: padding,
          left: padding,
          right: padding,
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .png({ quality: 100, compressionLevel: 9 })
        .toFile(path.join(output, `${shortcut.name}-96x96.png`));

      console.log(`✅ Generated ${shortcut.name}-96x96.png (${shortcut.displayName})`);
    } catch (error) {
      console.error(`❌ Failed to generate ${shortcut.name}-96x96.png:`, error.message);
    }
  }

  console.log('\n✨ All icons generated successfully!');
  console.log(`📁 Icons saved to: ${output}`);
  console.log('\n⚠️  IMPORTANT: Text-based logos may not display well at small sizes.');
  console.log('   Consider creating a simplified icon (e.g., "P" monogram or wrench icon)');
  console.log('   for better visibility at 72x72 and 96x96 sizes.\n');
  console.log('📝 Next steps:');
  console.log('   1. Test icons in Chrome DevTools → Application → Manifest');
  console.log('   2. Verify maskable icons at https://maskable.app/');
  console.log('   3. Test installation on Android/iOS devices\n');
}

generateIcons().catch(error => {
  console.error('❌ Icon generation failed:', error);
  process.exit(1);
});
