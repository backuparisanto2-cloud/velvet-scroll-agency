## Tujuan
Empat perbaikan kecil: logo responsif di mobile, teks layanan AI, gambar AI baru, teks CTA, dan keterbacaan kartu Portfolio.

## 1. Logo responsif (Navbar + Footer)
- Navbar: logo saat ini `h-8` tetap di semua ukuran. Ubah jadi `h-7 sm:h-8 md:h-9` dengan `shrink-0`, tambah sedikit jarak (`gap-2 sm:gap-2.5`) dan kecilkan wordmark di layar sempit (`text-base sm:text-lg`) agar tidak terpotong.
- Tambah `sizes`/dimensi eksplisit dan `loading="eager"` agar logo tajam di layar retina — sumber WebP sudah 434x368, jadi pada tinggi 28-36px sudah lebih dari 2x DPR (tidak perlu file @2x terpisah).
- Footer: samakan pola ukuran responsif dan padding agar konsisten.

## 2. Teks layanan AI
Di `src/components/Services.tsx`, ubah deskripsi kartu "Solusi AI Anda" menjadi:
"Solusi untuk pengadaan AI Based Hardware, AI Training, Implementasi, Consulting & Pembuatan Aplikasi."

## 3. Gambar baru kartu "Solusi AI Anda"
- Konversi gambar lampiran (mini PC + tiga monitor) ke WebP dengan kualitas terjaga, target maksimal 300KB.
- Unggah ke CDN sebagai `src/assets/img/service-ai-4.webp.asset.json`, pakai di `Services.tsx`, dan hapus pointer lama jika tidak dipakai lagi.

## 4. Teks CTA
"Diskusikan Project" → "Diskusikan Project Anda" (`src/components/Work.tsx`).

## 5. Keterbacaan Portfolio Project
- Perkuat overlay gradasi kartu (`from-black/90 via-black/45`) agar teks di atas foto terang tetap terbaca.
- Perbaiki susunan teks: urutan tag → judul → deskripsi dengan jarak konsisten, judul `text-lg sm:text-xl` dan `line-clamp` aman, tag lebih kecil dengan tracking rapi.
- Di mobile deskripsi selalu tampil (bukan tergantung state hover); di desktop tetap muncul saat kartu aktif, tapi tanpa terpotong saat kartu sempit — teks di kartu non-aktif disembunyikan sepenuhnya agar tidak tumpang tindih.
- Tambah padding responsif (`p-5 sm:p-6`) dan `min-w-0` agar teks tidak keluar kartu.

## Verifikasi
Type-check dan screenshot mobile (384px) + desktop untuk memastikan logo tajam, kartu portfolio terbaca, dan gambar AI tampil.
