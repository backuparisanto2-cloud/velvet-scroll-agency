## Splash Screen — Modern Tech, Fast

Overlay pembuka singkat (±1.2 detik) yang muncul saat halaman utama pertama kali dibuka, lalu menghilang mulus ke konten.

### Tampilan
- Layar penuh dengan warna latar sesuai tema (dark/light mengikuti token `--background`), tanpa kedip saat ganti tema.
- Logo SGK (komponen `Logo` yang sudah ada) di tengah, muncul dengan skala + fade halus dan sedikit glow biru→ungu sesuai aksen situs.
- Wordmark "MENTARI SATRIA" di bawah logo dengan titik gradient biru→ungu, sama seperti navbar.
- Elemen tech: garis grid tipis / sapuan cahaya (scanline) yang melintas sekali, plus progress bar tipis gradient biru→ungu yang terisi cepat.
- Tagline mikro "Solusi Infrastruktur IT" (mengikuti bahasa aktif ID/EN dari sistem i18n).

### Perilaku
- Durasi total maksimal ~1.2 detik, otomatis keluar (fade + sedikit scale-up) — tidak menahan pengguna.
- Hanya tampil di halaman utama, tidak di `/mystats`.
- Tampil sekali per sesi browser (sessionStorage), jadi navigasi berikutnya langsung ke konten.
- Body dikunci scroll selama splash aktif, dilepas setelah selesai.
- Menghormati `prefers-reduced-motion`: animasi diganti fade sederhana dan durasi dipangkas.
- Tidak mengubah layout Hero atau section mana pun.

### Teknis
- Komponen baru `src/components/SplashScreen.tsx` memakai Framer Motion (`AnimatePresence`, `motion`) yang sudah dipakai di proyek.
- Dirender di `src/routes/index.tsx` di atas konten; hanya di sisi klien agar tidak mengganggu SSR/hidrasi.
- Teks splash ditambahkan ke `src/i18n/dictionaries.ts` (ID & EN).
- Semua warna memakai token semantik yang ada, tanpa warna hardcoded.
