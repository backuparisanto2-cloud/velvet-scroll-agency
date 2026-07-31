// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Mode export statis (dipakai oleh `npm run export`): matikan deploy plugin
// Cloudflare, prerender semua halaman jadi HTML biasa untuk hosting Apache.
const STATIC_EXPORT = process.env.STATIC_EXPORT === "1";

export default defineConfig({
  nitro: STATIC_EXPORT ? false : undefined,
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(STATIC_EXPORT
      ? {
          // Setiap halaman di-prerender jadi file HTML statis.
          prerender: { enabled: true, crawlLinks: true, failOnError: false },
          pages: [{ path: "/" }, { path: "/nginx" }, { path: "/apache" }, { path: "/mystats" }],
          // Shell SPA dipakai sebagai fallback deep-link (rewrite .htaccess).
          spa: { enabled: false },
        }
      : {}),
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
