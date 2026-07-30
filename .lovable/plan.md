## Ganti logo dengan file baru

Gambar yang diunggah (`file_000000004e0881fa8c9459a19ce19e72-removebg-preview.png`) sudah berlatar transparan dan tanpa teks perusahaan — cocok langsung dipakai sebagai logo.

### Langkah

1. **Konversi & unggah aset**
   - Ubah PNG unggahan ke WebP transparan (kualitas tinggi, target < 100 KB), crop margin kosong berlebih agar logo terlihat proporsional.
   - Unggah ke CDN sebagai `src/assets/img/logo-sgk-v2.webp.asset.json`.
   - Hapus aset lama `logo-sgk.webp` dari CDN setelah semua referensi dipindah.

2. **Pemakaian di UI**
   - `src/components/Navbar.tsx`: ganti import logo ke aset baru, sesuaikan `width`/`height` intrinsik dengan dimensi baru (tinggi tampil tetap ~32px).
   - `src/components/Footer.tsx`: ganti import yang sama (tinggi tampil tetap ~40px).

3. **Favicon**
   - Buat turunan PNG persegi 512×512 dari logo baru → timpa `public/favicon.png` (registrasi di `src/routes/__root.tsx` sudah ada, tidak berubah).

### Verifikasi
Typecheck + screenshot headless desktop & mobile untuk memastikan logo tajam, transparan, dan tidak gepeng di navbar maupun footer.