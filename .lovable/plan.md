## Masalah

`/mystats` (dan pencatatan pengunjung) memakai **kunci service-role** yang hanya disuntikkan di server Lovable. File `.env` yang ikut ter-clone hanya berisi URL + kunci publik, sehingga saat `npm run build` / `npm run dev` di komputer sendiri muncul:

> Missing Supabase environment variable(s): SUPABASE_SERVICE_ROLE_KEY

Verifikasi: `src/lib/analytics.server.ts` memakai `supabaseAdmin` (service role) untuk insert/update/select, dan `.env` memang tidak punya `SUPABASE_SERVICE_ROLE_KEY`.

## Solusi

Pindahkan seluruh analytics ke **kunci publik** yang sudah ada di `.env`, dengan aturan akses database yang mengizinkannya. Sesuai pilihan Anda, `/mystats` tetap terbuka tanpa proteksi.

### 1. Aturan akses database (migrasi)
- Beri izin `anon` untuk mencatat kunjungan dan event pada tabel `page_visits` dan `visit_events`.
- Beri izin `anon` untuk memperbarui durasi/scroll pada kunjungan (heartbeat).
- Beri izin `anon` membaca kedua tabel, supaya dashboard bisa menampilkan statistik tanpa login.

### 2. Kode server analytics
- `src/lib/analytics.server.ts`: ganti `supabaseAdmin` dengan klien Supabase yang dibuat di dalam handler memakai `SUPABASE_URL` + `SUPABASE_PUBLISHABLE_KEY` (tanpa sesi tersimpan, dengan shim header `apikey` untuk kunci `sb_` seperti pada klien bawaan).
- Logika pengumpulan geo/IP, insert, heartbeat, dan agregasi statistik tetap sama persis.
- Tambahkan pesan error yang lebih jelas bila variabel lingkungan hilang.

### 3. Verifikasi
- Jalankan build produksi dari clone bersih, buka `/` untuk memicu satu pageview, lalu buka `/mystats` dan pastikan angka muncul tanpa error.

## Catatan teknis & risiko

Karena `/mystats` dibuka tanpa proteksi, data kunjungan (termasuk alamat IP, kota, ISP) bisa dibaca siapa pun yang punya kunci publik situs atau membuka URL `/mystats`. Ini konsekuensi langsung dari pilihan "terbuka"; bila nanti ingin ditutup, saya bisa tambahkan gerbang kata sandi atau login admin dan mencabut izin baca `anon`.
