## Tujuan
1. Situs terbuka dalam **mode terang** secara default, dengan tombol toggle Terang/Gelap di navbar (pilihan tersimpan di browser).
2. Semua teks tersedia dalam **Bahasa Indonesia (default) dan Inggris**, dengan switch ID/EN di navbar.

## Bagian 1 — Tema terang

Saat ini seluruh komponen memakai warna gelap yang ditulis langsung (putih/hitam), sehingga perlu dipindahkan ke token warna semantik agar bisa berganti tema.

- Tulis ulang palet di `src/styles.css`: `:root` menjadi versi terang (latar putih-kebiruan lembut, teks midnight blue #0c1128, kartu putih dengan border halus), dan blok `.dark` memegang palet midnight blue yang ada sekarang.
- Ganti kelas warna keras (`text-white`, `bg-black/…`, `border-white/10`, gradien gelap) di Navbar, About, Services, Tools, Work, Events, Clients/Partners, Contact, Footer menjadi token (`text-foreground`, `bg-card`, `border-border`, `bg-muted`, dll.). Efek kaca tetap ada, hanya nilainya menyesuaikan tema.
- **Hero ikut terang**: overlay video diubah jadi scrim terang (putih bergradasi) dengan teks gelap saat light mode, dan tetap scrim gelap + teks putih saat dark mode. Layer sketsa/reveal, posisi, dan animasi scroll tidak diubah.
- Logo SGK, tombol WhatsApp, dan warna aksen neon dijaga tetap kontras di kedua tema.
- Toggle: komponen `ThemeToggle` (ikon matahari/bulan) di navbar desktop dan menu mobile; disimpan di `localStorage`, plus skrip kecil di `__root.tsx` agar tidak ada kedipan tema saat halaman dimuat. Default = terang bila belum pernah memilih.

## Bagian 2 — Dwibahasa

- Buat kamus `src/i18n/id.ts` dan `src/i18n/en.ts` berisi seluruh teks situs (nav, hero, tentang kami + statistik, layanan termasuk Solusi AI Anda, tools, portofolio, event, partner, kontak, footer, CTA WhatsApp).
- Buat `LanguageProvider` + hook `useT()` di `src/i18n/context.tsx`; bahasa aktif disimpan di `localStorage`, default **ID**, dan atribut `lang` pada `<html>` ikut menyesuaikan.
- Semua komponen mengambil teks dari kamus, bukan string tertulis langsung.
- Switch bahasa "ID | EN" berupa pill kecil di navbar (desktop dan menu mobile), bersebelahan dengan toggle tema.
- Judul/deskripsi halaman (`head()` di `src/routes/index.tsx`) tetap Bahasa Indonesia sebagai bahasa utama SEO.

## Catatan teknis
- Tidak ada perubahan layout, urutan section, animasi parallax, maupun aset gambar/video.
- Verifikasi hasil dengan tangkapan layar Playwright pada 384px dan 1280px untuk kombinasi terang/gelap dan ID/EN.
