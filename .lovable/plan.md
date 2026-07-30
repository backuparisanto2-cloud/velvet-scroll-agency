## Tujuan

1. Tambah section baru **Tools** (teknologi/tools yang dipakai).
2. Setiap section punya **animasi parallax framer-motion yang smooth**.
3. Di Hero, tepat di atas judul "Solusi Infrastruktur IT", tambah baris teks lebih kecil: **PT. SEKAWAN GLOBAL KOMUNIKA - Mentarisatria.net.id**.

## 1. Section Tools baru — `src/components/Tools.tsx`

Grid kartu glass (2 kolom mobile, 3–4 kolom desktop) berisi tools/teknologi yang digunakan, tiap kartu: ikon lucide + nama + satu baris keterangan singkat. Isi mengikuti stack infrastruktur perusahaan, misalnya: Mikrotik & Cisco Routing, Fortinet Firewall, VMware Virtualization, Windows Server & Linux, Ruckus/Ruijie Wireless, Veeam Backup, Zabbix Monitoring, UniFi Controller.

- Eyebrow "Tools & Teknologi", judul "Tools yang Kami Gunakan", subjudul singkat.
- Hover: border menyala + lift halus, konsisten dengan Services.
- Dipasang di `src/routes/index.tsx` setelah `Services`, dan link "Tools" (`#tools`) ditambahkan di Navbar serta Footer.

## 2. Parallax smooth per section — `src/components/ParallaxSection.tsx`

Komponen pembungkus reusable:
- `useScroll({ target, offset: ["start end", "end start"] })` + `useTransform` untuk `y` (misal 60px → -60px) dan `opacity` masuk-keluar halus.
- `useSpring` (stiffness rendah, damping tinggi) agar gerakan tidak patah-patah.
- `useReducedMotion` → parallax dimatikan bila user minta reduced motion.
- Intensitas bisa diatur lewat prop `strength` supaya tiap section beda kedalaman (heading bergerak lebih jauh daripada konten).

Diterapkan ke: Clients, Services, Tools, Work, Events, About, Contact, Footer CTA. Hero tidak diubah (sudah punya efek scroll sendiri). Layout, ukuran, dan urutan konten tidak berubah — hanya transform.

## 3. Hero eyebrow — `src/components/Hero.tsx`

Di kedua layer (layer sketsa dan layer video reveal), tambah baris di atas judul:

```text
PT. SEKAWAN GLOBAL KOMUNIKA - Mentarisatria.net.id
```

Ukuran lebih kecil dari judul (`text-xs sm:text-sm`, tracking lebar, uppercase, warna gray-200/300 dengan drop-shadow) agar tetap terbaca di atas video. Judul dan animasi clipPath tidak diubah; hanya heading dibungkus flex-col agar eyebrow duduk di atasnya.

## Catatan teknis

- Semua parallax pakai transform GPU (`y`/`opacity`) — tidak memicu layout shift.
- Section tetap `will-change: transform` seperlunya untuk kelancaran di mobile.
- Verifikasi: typecheck + screenshot headless desktop & mobile pada beberapa posisi scroll.
