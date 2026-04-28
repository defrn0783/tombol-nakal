# Redirect berbasis waktu (Cloudflare Pages Functions)

Project ini memakai Cloudflare Pages Functions (file `functions/_middleware.js`) untuk redirect server-side dengan status 301 berdasarkan jam lokal.

## Cara kerja singkat
- 24 jam dibagi 3 blok sama besar (0-7, 8-15, 16-23).
- Jam diambil dari timezone `Asia/Jakarta`.
- Request langsung di-redirect tanpa HTML.

## Konfigurasi
Buka `functions/_middleware.js` dan ubah:
- `REDIRECT_URLS`: isi dengan URL website A, B, C.
- `TIME_ZONE`: timezone target (contoh `Asia/Jakarta`).
- `STATUS_CODE`: pakai `301` (permanent) atau `302` (temporary).

## Deploy (tanpa npm)
1. Push repo ini ke GitHub/GitLab.
2. Di Cloudflare Dashboard -> Pages -> Create a project, pilih repo ini.
3. Build settings tidak perlu (static). Functions otomatis terdeteksi dari folder `functions/`.
4. Setelah deploy, akses domain Pages dan redirect akan mengikuti jam lokal.

## Catatan penting
- 301 bisa di-cache browser/CDN. Jika ingin rotasi dinamis, pertimbangkan 302.
- `Cache-Control` sudah diset ke `no-store` untuk meminimalkan cache.
