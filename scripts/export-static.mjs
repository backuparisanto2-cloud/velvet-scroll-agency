#!/usr/bin/env node
/**
 * export:site — build produksi statis lalu kemas jadi paket siap upload ke Apache.
 *
 *   npm run export
 *
 * Hasil:
 *   release/site/                      → isi folder ini yang di-upload ke public_html
 *   release/mentarisatria-site.zip     → versi terkompresi untuk upload lewat cPanel
 */
import { execSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
  readFileSync,
} from "node:fs";
import { join, resolve } from "node:path";

const root = process.cwd();
const releaseDir = resolve(root, "release");
const siteDir = join(releaseDir, "site");
const zipPath = join(releaseDir, "mentarisatria-site.zip");

const run = (cmd) => execSync(cmd, { stdio: "inherit", cwd: root });

function findClientDir() {
  const candidates = [
    "dist/client",
    ".output/public",
    "dist/public",
    ".tanstack/start/build/client-dist",
  ];
  for (const c of candidates) {
    const p = resolve(root, c);
    if (existsSync(join(p, "index.html"))) return p;
  }
  return null;
}

const HTACCESS = `# ============================================================
# Mentari Satria — konfigurasi Apache untuk hosting statis
# Letakkan file ini di root folder situs (public_html)
# ============================================================

Options -Indexes
DirectoryIndex index.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Paksa HTTPS (aktifkan jika sertifikat sudah terpasang)
  # RewriteCond %{HTTPS} !=on
  # RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # File / folder yang benar-benar ada dilayani apa adanya
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Halaman yang sudah di-prerender (misal /apache → /apache/index.html)
  RewriteCond %{DOCUMENT_ROOT}/$1/index.html -f
  RewriteRule ^(.+?)/?$ /$1/index.html [L]

  # Sisanya ditangani router di browser (SPA fallback)
  RewriteRule ^ /index.html [L]
</IfModule>

# MIME type media modern
<IfModule mod_mime.c>
  AddType image/webp .webp
  AddType image/avif .avif
  AddType video/mp4 .mp4
  AddType video/webm .webm
  AddType font/woff2 .woff2
  AddType application/manifest+json .webmanifest
</IfModule>

# Kompresi
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css text/xml
  AddOutputFilterByType DEFLATE application/javascript application/json application/xml image/svg+xml
</IfModule>

# Cache: aset ber-hash permanen, HTML selalu segar
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType video/mp4 "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

<IfModule mod_headers.c>
  <FilesMatch "\\.(css|js|webp|avif|png|jpe?g|svg|mp4|webm|woff2)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.html$">
    Header set Cache-Control "no-cache, must-revalidate"
  </FilesMatch>
</IfModule>

ErrorDocument 404 /index.html
`;

function dirSize(dir) {
  let total = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    total += entry.isDirectory() ? dirSize(p) : statSync(p).size;
  }
  return total;
}

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

console.log("\n▸ 1/4 Validasi environment");
run("node scripts/env-check.mjs");

console.log("\n▸ 2/4 Build produksi (prerender statis)");
run("npx vite build");

const clientDir = findClientDir();
if (!clientDir) {
  console.error(
    "\n✖ Output build tidak ditemukan. Pastikan `npx vite build` selesai tanpa error.\n",
  );
  process.exit(1);
}

console.log(`\n▸ 3/4 Menyusun paket dari ${clientDir.replace(root + "/", "")}`);
rmSync(siteDir, { recursive: true, force: true });
mkdirSync(siteDir, { recursive: true });
cpSync(clientDir, siteDir, { recursive: true });
writeFileSync(join(siteDir, ".htaccess"), HTACCESS);

// Fallback 404.html supaya deep-link tetap tampil walau mod_rewrite mati
const shell = join(siteDir, "_shell", "index.html");
const fallback = existsSync(shell) ? shell : join(siteDir, "index.html");
if (existsSync(fallback)) writeFileSync(join(siteDir, "404.html"), readFileSync(fallback));

console.log("\n▸ 4/4 Membuat arsip ZIP");
rmSync(zipPath, { force: true });
try {
  execSync(`cd "${siteDir}" && zip -qr "${zipPath}" . -x ".DS_Store"`, { stdio: "inherit" });
} catch {
  console.warn("  ! Perintah `zip` tidak tersedia — folder release/site tetap bisa di-upload.");
}

console.log(`
\u001b[32m✔ Paket siap.\u001b[0m

  Folder : release/site        (${mb(dirSize(siteDir))})
  Arsip  : ${existsSync(zipPath) ? "release/mentarisatria-site.zip" : "(tidak dibuat)"}

  Upload SELURUH isi release/site ke public_html di server Apache.
  Pastikan file .htaccess ikut terkirim (aktifkan "show hidden files" di FTP/cPanel).
`);
