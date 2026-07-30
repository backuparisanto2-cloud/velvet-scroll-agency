## Masalah

Video hero terlihat blur di smartphone karena dua hal:

1. **Sumber video terlalu kecil.** `pickSource()` di `src/components/Hero.tsx` memilih versi 640p ketika `innerWidth * dpr <= 820`. Di perangkat yang sedang dipakai (384 CSS px, dpr 1.875 → ~720 px fisik), yang terpilih adalah 640p, padahal layar butuh ~720 px — jadi video di-upscale dan tampak lembut/blur.
2. **Lapisan blur justru paling kuat di mobile.** Overlay `backdrop-blur-[2px]` aktif secara default dan baru turun ke `1px` mulai breakpoint `sm`, jadi layar kecil malah dapat blur paling besar.

## Perubahan

Semua di `src/components/Hero.tsx`, tanpa mengubah layout:

- Perketat ambang pemilihan sumber: pakai 640p hanya untuk layar fisik yang benar-benar kecil (≈ ≤ 640 px) atau saat `saveData` aktif; selain itu pakai 1280p. Ponsel modern beresolusi tinggi akan mendapat 1280p sehingga tajam.
- Balik arah blur: hilangkan `backdrop-blur` pada layar kecil, dan terapkan blur halus (~1px) hanya mulai `sm` ke atas. Saturasi/kontras tetap dipertahankan agar nuansa premium tidak hilang.
- Sedikit kompensasi gelap-terang: karena blur mobile hilang, jaga keterbacaan teks lewat scrim/drop-shadow yang sudah ada (tidak menambah lapisan baru).

## Verifikasi

Cek dengan headless browser pada viewport ponsel (dpr 2 dan 3) bahwa sumber yang terpilih adalah versi 1280p dan tidak ada `backdrop-filter` aktif, lalu screenshot untuk memastikan teks tetap terbaca dan layout tidak berubah.
