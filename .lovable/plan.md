## Goal
In the Hero, replace the realistic city photo (the layer revealed on scroll) with the uploaded video, autoplaying and looping.

## Steps
1. Upload `gemini_generated_video_fcb39657.mp4` (1280x720, 10s) to the Lovable CDN with `lovable-assets`, storing the pointer at `src/assets/hero-city.mp4.asset.json` — the binary never enters the repo.
2. In `src/components/Hero.tsx`:
   - Remove the `REAL_IMG` constant and import the asset pointer instead.
   - Swap the `motion.img` on the top (revealed) layer for a `motion.video` with `autoPlay`, `loop`, `muted`, `playsInline`, `preload="auto"`, keeping the same `scale` motion value, `object-cover`, and full-size classes so the scroll clip-path reveal and zoom behave exactly as now.
   - Use the current photo URL as the video `poster` so the first frame isn't blank before playback starts.
3. Leave the sketch-outline base layer, headline overlays, gradients, and scroll indicator unchanged.
4. Verify with a headless browser: confirm the video element is playing (not paused) and screenshot the hero mid-scroll on desktop and mobile.

## Notes
`muted` + `playsInline` are required for autoplay to work in Chrome and iOS Safari; the video ships without audible sound.
