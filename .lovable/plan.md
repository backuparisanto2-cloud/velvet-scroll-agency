## 1. Dark mode jadi default

- `src/routes/__root.tsx`: skrip anti-flash diubah — kelas `dark` dipasang kecuali pengguna pernah memilih terang (`localStorage "msg-theme" === "light"`).
- `src/components/ThemeToggle.tsx`: state awal menjadi `dark`; hanya beralih ke terang jika tersimpan `light`.
- Toggle Terang/Gelap tetap berfungsi seperti sekarang dan pilihan tetap tersimpan.

## 2. OG image & favicon dari mentarisatria.net.id

Sumber yang ditemukan di situs asli:
- OG/Twitter image: `https://mentarisatria.net.id/ogimage.png`
- Favicon: `https://mentarisatria.net.id/logo_sgk.png`

Langkah:
- Unduh `ogimage.png` dan `logo_sgk.png`, unggah sebagai aset CDN (WebP/PNG terkompresi bila perlu).
- `src/routes/index.tsx`: ganti `OG_IMAGE` lama (`service-server-...jpg`) dengan URL absolut gambar OG baru untuk `og:image` dan `twitter:image`.
- `src/routes/__root.tsx`: `link rel="icon"` diarahkan ke favicon baru; `public/favicon.png` lama diganti/dihapus.

Catatan: pratinjau tautan di WhatsApp/Facebook baru berubah setelah cache mereka disegarkan.

## Teknis
- Tidak ada perubahan layout, teks, atau i18n.
- Verifikasi dengan tangkapan layar Playwright (dark default saat kunjungan pertama) dan cek tag head.
