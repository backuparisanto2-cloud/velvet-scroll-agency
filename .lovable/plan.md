## Tujuan

Ganti seluruh isi konten situs (teks, gambar, section, title/description, plus peta Google) dengan konten dari **mentarisatria.net.id** (PT Sekawan Global Komunika), tanpa mengambil logo mereka. Hero tetap memakai gambar sketsa + video yang sekarang — hanya teksnya yang diganti.

## Perubahan per bagian

**`src/routes/index.tsx`**
- Title: "Solusi Infrastruktur IT, Server, Internet & Network Terpercaya".
- Description: teks perusahaan dari situs sumber (PT Sekawan Global Komunika).
- Tambah section baru `Contact` (peta + info kontak) setelah About.

**`src/components/Navbar.tsx`**
- Wordmark teks "MENTARI SATRIA" (bukan logo mereka, murni tipografi seperti sekarang).
- Menu: Tentang, Layanan, Portfolio, Event, Kontak.

**`src/components/Hero.tsx`** (visual tidak diubah)
- Judul: "Solusi Infrastruktur IT" → reveal "Server, Internet & Network".
- Video/gambar/animasi clipPath tetap seperti sekarang.

**`src/components/Services.tsx`** — 5 layanan dari situs sumber, memakai gambar aslinya:
Pengadaan Server/Part/Upgrade & Data Center, Network & Router Enterprise, Pengadaan Perangkat IT, Managed Service IT, Internet Service Provider (ISP) — dengan deskripsi asli dan foto `service-*.jpg` dari mentarisatria.net.id. Grid disesuaikan agar muat 5 kartu dengan gambar.

**`src/components/Work.tsx`** — "Portfolio Project", 6 project asli (RSU PKU Muhammadiyah Gombong, Plataran Makassar, RS Siaga Medika Banyumas, ISP Korporat Gymnest, RSUD Margono Soekarjo, Teras Menara Sudirman) beserta gambar dan deskripsi aslinya. Layout accordion tetap.

**Section baru `src/components/Events.tsx`** — "Event & Kegiatan": 4 kartu (Huawei/Infoblox/Forcepoint 2022, HPE 2024, DELL 2023, Ruijie/Sonicwall/Robustel 2024) dengan foto, judul, dan lokasi/tanggal asli.

**`src/components/About.tsx`** — "Tentang Kami" dengan dua paragraf asli, tiga keunggulan (Tim Berpengalaman, Solusi Scalable & Aman, SLA Profesional), dan statistik asli: 200+ Klien Aktif, 1000+ Project Selesai, 99.9% Uptime Guarantee.

**`src/components/Clients.tsx`** — jadi "Technology Partners": nama partner (Cisco, Dell, HP, Fortinet, Ruijie, Ruckus, Gigabyte, Sangfor, APC, APJII, Netviel, WPS) sebagai teks dalam ticker berjalan — tidak memakai file logo mereka, sesuai permintaan.

**Section baru `src/components/Contact.tsx`** — "Hubungi Kami": alamat kantor lengkap (Jl. Overste Isdiman No.25, Purwokerto), telepon +62 281 7920477, WhatsApp +62 812 1295 1737, email info@mentarisatria.net.id, jam operasional Senin–Sabtu 08.00–17.00 WIB, plus **peta Google embed** untuk alamat tersebut (iframe `google.com/maps?q=<alamat>&output=embed`, lazy-load, tanpa API key) dengan sudut membulat mengikuti gaya glass yang ada.

**`src/components/Footer.tsx`** — CTA "Siap Transformasi Infrastruktur IT Perusahaan Anda?" dengan tombol WhatsApp asli, navigasi baru, kontak singkat, dan copyright PT Sekawan Global Komunika.

## Catatan teknis

- Gambar diambil langsung lewat URL remote milik situs sumber (tidak diunduh ke repo), memakai `loading="lazy"` dan `alt` deskriptif.
- Tidak ada file logo yang disalin — semua identitas merek dirender sebagai teks.
- Gaya visual (midnight blue, glassmorphism, animasi framer-motion) dipertahankan sepenuhnya.
- Verifikasi: typecheck + screenshot headless desktop & mobile, termasuk cek iframe peta termuat.
