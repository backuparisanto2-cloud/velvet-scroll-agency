#!/usr/bin/env node
/**
 * export:source — kemas seluruh kode + aset jadi satu ZIP untuk dipindah ke laptop lain.
 * Setara "Clone": tanpa node_modules, dist, release, dan file rahasia (.env).
 *
 *   npm run export:source
 */
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const root = process.cwd();
const releaseDir = resolve(root, "release");
const zipPath = join(releaseDir, "mentarisatria-source.zip");

const EXCLUDES = [
  "node_modules/*",
  "dist/*",
  ".output/*",
  ".tanstack/*",
  ".nitro/*",
  ".wrangler/*",
  "release/*",
  ".git/*",
  ".env",
  ".env.local",
  ".env.production",
  "*.log",
  ".DS_Store",
];

mkdirSync(releaseDir, { recursive: true });
rmSync(zipPath, { force: true });

const args = EXCLUDES.map((p) => `-x "${p}"`).join(" ");

try {
  execSync(`zip -qr "${zipPath}" . ${args}`, { stdio: "inherit", cwd: root });
} catch {
  console.error(
    "\n✖ Perintah `zip` tidak tersedia.\n  Windows: gunakan `Compress-Archive` atau instal 7-Zip.\n",
  );
  process.exit(1);
}

const size = existsSync(zipPath) ? statSync(zipPath).size : 0;

console.log(`
\u001b[32m✔ Paket sumber siap.\u001b[0m

  Arsip : release/mentarisatria-source.zip (${(size / 1024 / 1024).toFixed(1)} MB)

  Isi    : seluruh kode + src/assets (gambar & video)
  Tidak  : node_modules, dist, release, .env

  Di laptop tujuan: ekstrak → npm ci → salin .env.example jadi .env → npm run dev
`);
