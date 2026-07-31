## Splash Tampil Lebih Dulu, Baru Halaman

Saat ini splash baru dipasang setelah React hidrasi (`mounted` state), sehingga isi halaman (Hero/Navbar) sempat terlihat sekejap sebelum splash menutupinya. Tujuan: begitu halaman dibuka, yang pertama terlihat adalah splash — konten baru muncul setelah splash selesai.

### Perubahan perilaku
- Overlay splash sudah ada di HTML pertama (server-render), bukan menunggu hidrasi — tidak ada kedipan konten.
- Konten halaman utama disembunyikan (opacity 0 / tidak terlihat) selama splash aktif, lalu fade-in halus setelah splash keluar.
- Skrip inline kecil di `<head>` langsung menandai body sebagai "splash aktif" (lock scroll + sembunyikan konten) sebelum CSS/JS aplikasi selesai dimuat, jadi urutannya pasti: splash dulu → halaman.
- Tetap sekali per sesi (sessionStorage): jika splash sudah pernah tampil, konten langsung terlihat tanpa penundaan.
- Durasi tetap sinkron dengan kesiapan aplikasi (min 0,45 detik, failsafe 7 detik) seperti sekarang, plus fade-in konten ~0,4 detik.
- `prefers-reduced-motion` tetap dihormati: fade sederhana tanpa scale/scanline.

### Teknis
- `src/routes/__root.tsx`: tambahkan skrip inline (menyatu dengan theme script) yang menyetel `data-splash="1"` pada `<html>` jika sesi belum menampilkan splash.
- `src/styles.css`: aturan `[data-splash="1"] body { overflow: hidden }` dan konten utama disembunyikan, dengan transisi opacity saat atribut dilepas.
- `src/components/SplashScreen.tsx`: render overlay sejak render pertama (hapus gate `mounted`), dan hapus `data-splash` dari `<html>` saat animasi keluar selesai; scroll lock dipindah ke atribut tersebut.
- `src/routes/index.tsx`: bungkus konten dengan penanda kelas agar bisa di-fade-in; urutan section dan layout tidak berubah.
