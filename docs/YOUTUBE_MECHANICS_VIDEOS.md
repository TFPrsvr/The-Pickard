# YouTube Mechanics Videos Reference

This document contains a curated list of embeddable YouTube mechanics videos used on The Pickard website.

## Current Videos in Rotation

### ChrisFix Videos
ChrisFix is one of the most popular automotive DIY channels with clear, step-by-step tutorials.

1. **How to Change Your Oil (COMPLETE Guide)**
   - Video ID: `O1hF25Cowv8`
   - Channel: ChrisFix
   - URL: https://www.youtube.com/watch?v=O1hF25Cowv8

2. **How to Fix a Flat Tire (EASY)**
   - Video ID: `aoWMzz7uyXQ`
   - Channel: ChrisFix
   - URL: https://www.youtube.com/watch?v=aoWMzz7uyXQ

3. **How to Replace Brake Pads and Rotors**
   - Video ID: `n2LjTgd0C9M`
   - Channel: ChrisFix
   - URL: https://www.youtube.com/watch?v=n2LjTgd0C9M

4. **How to Jump Start a Car**
   - Video ID: `Bkc_RnJe9xE`
   - Channel: ChrisFix
   - URL: https://www.youtube.com/watch?v=Bkc_RnJe9xE

5. **How to Detail Your Car Interior**
   - Video ID: `SWsNh1jkYAM`
   - Channel: ChrisFix
   - URL: https://www.youtube.com/watch?v=SWsNh1jkYAM

### Engineering Explained
Technical explanations of how automotive systems work.

6. **How Car Engine Works**
   - Video ID: `Azz_PnmhS_c`
   - Channel: Engineering Explained
   - URL: https://www.youtube.com/watch?v=Azz_PnmhS_c

7. **How Manual Transmissions Work**
   - Video ID: `WvB4Kk9XM_0`
   - Channel: Engineering Explained
   - URL: https://www.youtube.com/watch?v=WvB4Kk9XM_0

### Scotty Kilmer
Popular automotive repair advice and maintenance tips.

8. **Top 5 Car Maintenance Tips**
   - Video ID: `CFdJyEGeuCI`
   - Channel: Scotty Kilmer
   - URL: https://www.youtube.com/watch?v=CFdJyEGeuCI

---

## Additional Recommended Channels (For Future Addition)

### Scotty Kilmer
- Popular automotive repair advice and product reviews
- Channel: https://www.youtube.com/@scottykilmer

### Eric The Car Guy
- Detailed repair guides and diagnostic procedures
- Channel: https://www.youtube.com/@EricTheCarGuy

### Pine Hollow Auto Diagnostics
- Advanced diagnostics and electrical troubleshooting
- Channel: https://www.youtube.com/@PineHollowAutoDiagnostics

### ETCG1
- Eric The Car Guy's secondary channel for longer repairs
- Channel: https://www.youtube.com/@ETCG1

### HumbleMechanic
- VW/Audi specialist with general automotive content
- Channel: https://www.youtube.com/@humblemerchanic

---

## How to Add New Videos

1. Find a mechanics video on YouTube
2. Check that the video allows embedding (most do by default)
3. Extract the video ID from the URL:
   - Format: `https://www.youtube.com/watch?v=VIDEO_ID_HERE`
   - Example: From `https://www.youtube.com/watch?v=devo3kdSPQY`, the ID is `devo3kdSPQY`
4. Add to the `MECHANICS_VIDEOS` array in `src/components/mechanics-video-player.tsx`:
   ```typescript
   {
     id: 'VIDEO_ID_HERE',
     title: 'Video Title - Topic',
     channel: 'Channel Name'
   }
   ```
5. Update this reference document with the new video details

---

## Embedding Restrictions

**Note**: Some videos may have embedding disabled by the uploader. Always test new videos before adding them to production.

### Common Reasons Videos May Not Embed:
- Copyright claims on the video
- Uploader disabled embedding in video settings
- Geographic restrictions
- Age-restricted content

### Testing New Videos:
1. Open the video on YouTube
2. Click "Share" → "Embed"
3. If you see an embed code, the video is embeddable
4. If you see "Video unavailable" or similar, try a different video

---

## Implementation Location

The video player component is located at:
- **Component**: `src/components/mechanics-video-player.tsx`
- **Used on**: Homepage (`src/app/page.tsx`)

## Features

- Navigation between videos (Prev/Next buttons)
- Displays current video title and channel
- Shows position in playlist (e.g., "1 / 8")
- Full YouTube player controls (play, volume, fullscreen, quality)
- Responsive design for mobile and desktop

---

**Last Updated**: 2025-01-16
**Total Videos**: 8
