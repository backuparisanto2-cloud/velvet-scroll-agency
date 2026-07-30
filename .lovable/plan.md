## Tujuan

Membuat halaman statistik pengunjung lengkap di URL `/mystats` (sejajar dengan halaman utama `/`), dengan pelacakan otomatis setiap kunjungan ke halaman utama.

Catatan: proyek ini bukan situs HTML statis, melainkan aplikasi TanStack Start. Jadi "mystats.html" akan dibuat sebagai route `/mystats` (satu level dengan `/`), bukan file .html — hasilnya sama bagi pengunjung.

## Yang akan dibangun

### 1. Aktifkan Lovable Cloud
Diperlukan database untuk menyimpan data kunjungan. Ini otomatis, tanpa akun eksternal.

### 2. Tabel `page_visits`
Kolom yang dicatat tiap kunjungan (sesuai pilihan "Lengkap"):
- waktu kunjungan, path halaman
- visitor_id (anonim, disimpan di localStorage) + session_id
- perangkat: tipe (mobile/tablet/desktop), browser, OS, ukuran layar
- sumber trafik: referrer, domain referrer, UTM source/medium/campaign
- bahasa browser, zona waktu
- perkiraan lokasi: negara & kota (dari header geo permintaan)
- durasi sesi (detik) dan kedalaman scroll maksimum (%)
- event: klik tombol WhatsApp, klik CTA, klik link partner

Tidak menyimpan IP mentah maupun data pribadi.

### 3. Pelacakan (`src/lib/analytics.ts` + server function)
- Saat halaman dibuka: kirim satu event `pageview`.
- Saat scroll/keluar halaman: kirim update durasi & scroll depth.
- Klik CTA/WhatsApp: kirim event terpisah.
- Dipasang di `__root.tsx` supaya berlaku otomatis untuk halaman utama.

### 4. Halaman `/mystats`
Dashboard gelap bergaya sama dengan situs (glass card, aksen gradien biru–ungu):
- Kartu ringkas: total kunjungan, pengunjung unik, sesi, rata-rata durasi, bounce rate, rata-rata scroll depth
- Grafik garis: kunjungan per hari (rentang 7 / 30 / 90 hari, bisa dipilih)
- Grafik batang: kunjungan per jam (jam ramai)
- Donat: perangkat (mobile/desktop/tablet)
- Tabel: browser, sistem operasi, bahasa
- Tabel: negara & kota teratas
- Tabel: sumber trafik & kampanye UTM teratas
- Tabel: event/klik CTA teratas
- Daftar 50 kunjungan terakhir (waktu, perangkat, lokasi, sumber)
- Tombol ekspor CSV

Halaman bersifat publik sesuai permintaan, dan diberi `noindex` agar tidak muncul di Google.

## Detail teknis

- Migrasi SQL membuat `public.page_visits` + `public.visit_events`, index pada `created_at`, GRANT untuk `anon`/`authenticated` (INSERT terbatas) dan `service_role`, RLS aktif.
- Penulisan data lewat `createServerFn` (`src/lib/analytics.functions.ts`) yang memvalidasi input dengan Zod; geo dibaca dari header permintaan di server, bukan dari klien.
- Pembacaan agregat lewat server function publik read-only yang hanya mengembalikan angka agregat (bukan baris mentah berisi identitas).
- Route baru `src/routes/mystats.tsx` dengan `head()` sendiri (title/description + robots noindex), data lewat `useQuery`.
- Grafik memakai `recharts` (sudah lazim di stack ini; akan diinstal bila belum ada).
- Tidak ada perubahan pada tampilan/tata letak halaman utama.

## Batasan
Data mulai terkumpul sejak fitur ini aktif; kunjungan sebelumnya tidak tersedia. Estimasi lokasi bergantung pada header geo penyedia hosting dan bisa kosong di lingkungan preview.