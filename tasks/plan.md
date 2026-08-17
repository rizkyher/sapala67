# Implementation Plan: SAPALA 67 multipage experience

## Overview
Mengubah landing page SAPALA 67 menjadi situs multipage yang menempatkan identitas pecinta alam di depan, serta menyediakan halaman Set Goal yang dapat dipakai pengunjung untuk menyusun target personal.

## Architecture decisions
- Gunakan route SvelteKit yang sudah ada; tanpa dependensi atau perubahan basis data.
- Simpan goal personal pada `localStorage` agar langsung berguna tanpa akun.
- Pertahankan konten organisasi yang sudah tersedia dan tampilkan ulang pada halaman sesuai konteksnya.

## Task list
1. Perbarui navigasi dan beranda sebagai pintu masuk eksplorasi.
2. Tambah halaman identitas, kegiatan, dan Set Goal yang responsif.
3. Tambah planner goal di browser dan tautan SEO/sitemap.
4. Jalankan pemeriksaan tipe, format, dan build.

## Risks and mitigations
| Risk | Mitigation |
|---|---|
| Goal hilang saat data browser dibersihkan | Tampilkan keterangan bahwa goal tersimpan di perangkat ini. |
| Konten lama terlalu padat di beranda | Jadikan beranda ringkas dan arahkan ke halaman tematik. |
