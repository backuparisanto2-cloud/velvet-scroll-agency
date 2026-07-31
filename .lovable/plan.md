## Masalah

Semua gambar/video sekarang hanya berupa file pointer `.asset.json` yang menunjuk ke URL CDN Lovable (`/__l5e/assets-v1/...`). File binernya tidak ada di repo, jadi saat di-clone dan di-build di luar Lovable, URL itu tidak dilayani siapa pun → aset hilang.

## Solusi

Kembalikan 33 file biner ke dalam repo dan pakai import Vite biasa, sehingga aset ikut ter-commit, ter-clone, dan ter-bundle di mana pun app di-build.

### Langkah

1. Unduh setiap aset dari URL CDN-nya ke lokasi aslinya:
   - `src/assets/` — `hero-city-640.mp4`, `hero-city-1280.mp4`, `hero-city-poster.jpg`
   - `src/assets/img/` — 30 file `.webp` (logo partner, logo SGK 4 ukuran, project, service, event)
2. Ganti semua referensi di 6 komponen (`Hero`, `Logo`, `Clients`, `Events`, `Services`, `Work`):
   ```ts
   // sebelum
   import imgServer from "@/assets/img/service-server-v2.webp.asset.json";
   ... src={imgServer.url}
   // sesudah
   import imgServer from "@/assets/img/service-server-v2.webp";
   ... src={imgServer}
   ```
   Untuk video dan `srcset` logo, pola sama: string hasil import langsung dipakai.
3. Hapus semua file `.asset.json` dari repo (pointer tidak lagi dipakai). Objek CDN dibiarkan (tidak dihapus) agar deployment lama tidak rusak.
4. Jalankan build + cek preview supaya semua gambar/video tampil.

### Catatan teknis

- Total biner yang masuk repo ± 3,4 MB (video hero 1,9 MB, sisanya WebP kecil). Masih wajar untuk git.
- Vite akan hashing + emit aset ini ke `dist/assets/` saat build, jadi caching tetap baik dan tidak ada dependensi ke infrastruktur Lovable.
- Sinkronisasi GitHub dua arah tetap berjalan seperti biasa: karena file biner ada di repo, clone → `bun install` → `bun run build` langsung jalan tanpa akses CDN.
- Trade-off: aset tidak lagi disajikan lewat CDN Lovable, tetapi dari hosting/CDN tempat app di-deploy.
