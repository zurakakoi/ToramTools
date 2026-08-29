# Toram Tools

Kalkulator EXP, Main Quest, Spina, dan material untuk pemain Toram Online.

## Menjalankan secara lokal

```bash
npm install
npm start
```

Server jalan di http://localhost:3000

## Struktur

- `server.js` — static file server (Express). Tidak ada logic kalkulator di sini,
  semuanya jalan di browser (SPA).
- `public/index.html` — shell halaman: nav, theme switcher, container `#app`.
- `public/css/tokens.css` — 3 preset tema (Japanese, Dark Purple, Light Blue)
  lewat CSS variables. Ganti tema = ganti `data-theme` di `<html>`.
- `public/css/japanese-fx.css` — kanji watermark & noise texture, eksklusif
  tema Japanese.
- `public/js/router.js` — router hash-based sederhana (`#/xp`, `#/mq`, dst).
- `public/js/pages/*.js` — satu module per halaman/kalkulator.
- `public/js/data/mqData.js` — data Main Quest (15 bab) + helper pengelompokan
  per bab, dipakai oleh Exp Calc dan MQ/Skip MQ Calculator.
- `public/js/utils/` — logic murni (matematika level/XP, konversi Spina↔IDR),
  dipisah dari DOM biar gampang di-tes ulang.

## Menambah kalkulator baru

1. Buat `public/js/pages/nama.js`, ekspor `renderNama(root)`.
2. Daftarkan di `public/js/app.js`: `registerRoute("/nama", renderNama)`.
3. Tambah link di nav (`public/index.html`) dan entri di `routeKanji`
   (`public/js/app.js`) kalau mau kanji khusus di tema Japanese.

## Deploy

Static server biasa — bisa di-deploy ke VPS, Railway, Render, dsb. Pastikan
`npm install` dijalankan dulu di server (butuh koneksi internet untuk
Express & compression).
