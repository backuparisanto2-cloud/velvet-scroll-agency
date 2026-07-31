## Tujuan

Repo bisa di-clone ke laptop, `npm run dev` untuk development, `npm run export` untuk menghasilkan paket statis (HTML + aset) yang tinggal di-upload ke `public_html` Apache — tanpa Node di server.

## Yang berubah

### 1. Mode build statis (prerender + SPA fallback)

- Aktifkan prerender di `vite.config.ts` untuk semua halaman: `/`, `/nginx`, `/apache`, `/mystats`, plus halaman 404, sehingga hasil build berupa file HTML statis di `dist/client`.
- Tambah SPA fallback (`index.html`/`404.html`) agar deep-link tetap jalan lewat rewrite Apache.
- Semua aset sudah lokal di `src/assets` (sudah dikerjakan sebelumnya) — tidak ada referensi CDN.

### 2. Analytics dipindah ke browser (wajib untuk mode statis)

Saat ini `/mystats` dan pelacakan pengunjung memakai server function (`src/lib/analytics.functions.ts` + `analytics.server.ts`), yang butuh Node dan tidak akan ada di Apache statis. Rencana:

- Buat `src/lib/analytics.client.ts` yang menulis/membaca tabel `page_visits` & event langsung ke backend memakai client publik + kunci publishable (RLS publik yang sudah ada tetap dipakai).
- Geolokasi IP diambil di browser lewat panggilan ke layanan IP publik (menggantikan pengambilan IP dari header server).
- `AnalyticsTracker.tsx` dan `mystats.tsx` diarahkan ke modul client tersebut.
- File server function analytics dihapus agar build tidak lagi memerlukan runtime server.

### 3. Tombol & skrip export

- **`npm run export`** (`scripts/export-static.mjs`): jalankan env:check → build → salin `dist/client` ke `release/site/`, tambahkan `.htaccess`, lalu buat `release/mentarisatria-site.zip` siap upload.
- **`npm run export:source`**: buat `release/mentarisatria-source.zip` berisi seluruh kode + `src/assets` (tanpa `node_modules`, `dist`, `.env`) — setara "Clone" untuk dipindah antar laptop.
- **Halaman `/apache`** baru: panduan lengkap + dua tombol.
  - Saat dijalankan di laptop (dev), tombol memicu unduhan paket dari folder `release/` bila sudah dibuat, dan menampilkan perintah yang harus dijalankan.
  - Tombol ketiga: "Salin perintah export" untuk clipboard.
  - Karena hosting statis tidak bisa membuat ZIP sendiri, tombol download hanya aktif setelah `npm run export` dijalankan di laptop; UI menjelaskan ini secara eksplisit.

### 4. Halaman `/apache` (isi)

- Checklist environment (dipakai ulang dari halaman `/nginx`).
- Langkah: clone → `npm ci` → isi `.env` → `npm run export` → upload isi `release/site/` ke `public_html`.
- Blok konfigurasi `.htaccess` siap salin: rewrite SPA, gzip/deflate, cache-control aset ber-hash 1 tahun, `Content-Type` untuk `.webp`/`.mp4`, force HTTPS opsional.
- Catatan: halaman `/nginx` tetap ada, ditambah tautan silang antar keduanya.

### 5. Kebersihan struktur

- Perbarui `.env.example` dan `scripts/env-check.mjs`: hanya `VITE_SUPABASE_*` yang benar-benar wajib untuk build statis; variabel Node SSR (`PORT`, `NITRO_PRESET`) jadi opsional/khusus mode NGINX.
- Perbarui `README.md` dengan alur kerja: clone → dev → export → upload Apache.
- Tambahkan `release/` ke `.gitignore`.

## Catatan teknis

- Mode statis berarti tidak ada server function; semua data lewat backend langsung dari browser. IP visitor akan berasal dari layanan geolokasi publik, bukan header proxy — hasilnya sedikit berbeda dari versi SSR sekarang, tapi tetap berisi negara/kota/ISP.
- Kunci publishable memang ikut ter-bundle ke browser (normal, dilindungi RLS). Service-role key tidak dipakai sama sekali.
- Verifikasi akhir: jalankan build, sajikan `release/site/` sebagai folder statis, dan cek dengan Playwright bahwa `/`, `/apache`, `/nginx`, `/mystats` termuat tanpa 404 aset.
