// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    // Serve every bundled asset from this app's own origin (dev + prod).
    // Never point at an external CDN base.
    base: "/",
    publicDir: "public",
    // Media types that must be emitted as real files in dist/client/assets.
    assetsInclude: ["**/*.mp4", "**/*.webm", "**/*.webp", "**/*.avif"],
    build: {
      // Keep media as separate files instead of inlining them as data: URLs.
      assetsInlineLimit: 0,
      rollupOptions: {
        // Nothing is treated as an external/remote module: all assets get bundled.
        external: [],
      },
    },
  },
});
