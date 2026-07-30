## 1. Layanan: tambah "AI Solutions" — `src/components/Services.tsx`

Kartu ke-6:
- Judul: **AI Solutions**
- Keterangan: "Solusi untuk pengadaan AI Based Hardware, AI Training, Consulting & Pembuatan Aplikasi."
- Ikon lucide `BrainCircuit`, gambar header bertema AI/GPU server (di-generate agar konsisten dengan kartu lain, format WebP).

## 2. Angka statistik dengan animasi count-up — `src/components/About.tsx`

Hook kecil `useCountUp` (framer-motion `useMotionValue` + `animate`, dipicu `useInView`, sekali jalan):
- 200+ → menghitung 0→200, 1000+ → 0→1000, 99.9% → 0→99.9 (satu desimal).
- Suffix `+` / `%` dipertahankan, `prefers-reduced-motion` → langsung tampil nilai akhir.

## 3. Section Tools → Network Tools asli — `src/components/Tools.tsx`

Ganti daftar tools generik dengan 9 utilitas dari mentarisatria.net.id, tiap kartu jadi link `target="_blank" rel="noopener noreferrer"`:

```text
UPS Calculator  — Calculate UPS requirements for your infrastructure
Wifi Plan       — Plan your wireless network coverage
Cable Building  — Calculate cable requirements for your project
Check IP        — Check IP address details and geolocation
MAC Lookup      — Lookup MAC address vendor information
Server Perf     — Simulate and test server performance
Port Scanner    — Scan host for open ports
Pen-Test        — Penetration testing tools suite
RAID Calc       — Calculate RAID storage configurations
```

Heading jadi "Network Tools" + subjudul "Professional IT utilities at your fingertips". Ikon lucide per tool, hover glow tetap.

## 4. Technology Partners jadi grid logo — `src/components/Clients.tsx`

Mengikuti attachment: judul di tengah, lalu grid kartu logo (3 kolom mobile, 4–6 kolom desktop) dengan kartu rounded gelap semi-transparan. Logo pakai URL resmi dari situs sumber (Cisco, Gigabyte, Ruijie, Dell, HP, Ruckus, Netviel, WPS, Fortinet, Sangfor, APJII, APC), `object-contain` + tinggi seragam supaya tidak ada kartu kosong/terpotong, plus filter grayscale/brightness agar semua logo terbaca di background gelap dan berwarna penuh saat hover. Marquee lama dihapus.

## 5. Urutan section — `src/routes/index.tsx`

```text
Hero → Tentang Kami → Layanan → Network Tools → Portfolio → Event → Technology Partners → Kontak → Footer
```

Semua tetap dibungkus `ParallaxSection`; urutan link Navbar & Footer disesuaikan.

## 6. Optimasi & crop gambar

- Semua `<img>` konten diberi `width`/`height`, `loading="lazy"`, `decoding="async"`.
- Gambar remote dari mentarisatria.net.id yang JPG di-download, dikonversi ke WebP (quality ~82) lewat ffmpeg, lalu di-host via Lovable Assets CDN sehingga ukuran turun signifikan.
- Rasio kartu dibakukan (`aspect-[16/10]` untuk Services/Events, `aspect-[4/3]` untuk Work) dengan `object-cover object-center` — beberapa gambar yang subjeknya tidak di tengah diberi `object-top` agar crop tidak memotong bagian penting.

## Verifikasi
Typecheck + screenshot headless desktop & mobile untuk cek grid partner, crop gambar, dan animasi count.
