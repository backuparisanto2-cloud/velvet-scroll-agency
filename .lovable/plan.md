## 1. Logo SGK

- Ambil `logo-sgk-vL78SFat_1.png`, crop/hapus baris teks "PT SEKAWAN GLOBAL KOMUNIKA" di bawah, sisakan bola-bola + "SGK" + globe.
- Buat background transparan, konversi ke WebP (lossless/quality tinggi, target < 100 KB), unggah ke CDN sebagai `src/assets/img/logo-sgk.webp.asset.json`.

Pemakaian:
- **Navbar** (`src/components/Navbar.tsx`): logo di kiri, tinggi ~32px, mendampingi wordmark "MENTARI SATRIA".
- **Footer** (`src/components/Footer.tsx`): logo kecil di atas wordmark kolom pertama.
- **Favicon**: turunan PNG persegi dari logo → `public/favicon.png`, didaftarkan di `src/routes/__root.tsx`, dan `public/favicon.ico` bawaan dihapus.

## 2. Layanan AI

Di `src/components/Services.tsx`:
- Judul kartu "AI Solutions" → **"Solusi AI Anda"** (teks keterangan tetap).
- Gambar diganti dengan `service-ai-2.png` (mini PC + monitor analytics), dikonversi WebP (quality ~82, lebar 1200px) dan di-host via CDN sebagai aset baru.
- Aset AI lama (`service-ai-v2.webp`) dihapus dari CDN.
- Entri "AI Solutions" di daftar Layanan pada `src/components/Footer.tsx` ikut diganti jadi "Solusi AI Anda".

## Verifikasi
Typecheck + screenshot headless (desktop & mobile) untuk memastikan logo tajam/transparan di navbar-footer dan kartu AI tampil rapi.
