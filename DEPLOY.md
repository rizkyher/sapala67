# Deployment — SAPALA 67

Proyek ini menggunakan **SvelteKit + Cloudflare Pages**, dengan **D1** untuk konten dan **R2** untuk foto yang diunggah dari admin.

Konfigurasi produksi sudah mengarah ke proyek Cloudflare `sapala67`, basis data D1 `sapala67`, dan bucket R2 `sapala67-media` pada akun Cloudflare yang dipilih.

## Rilis produksi

Pastikan sudah masuk ke akun Cloudflare yang tepat, lalu jalankan:

```bash
npm install
npm run check
npm run build
npm run db:migrate
npm run deploy:pages
```

Perintah terakhir akan menerbitkan versi produksi ke [sapala67.pages.dev](https://sapala67.pages.dev/). Migrasi basis data aman dijalankan ulang; hanya migrasi baru yang akan diterapkan.

## Uji lokal dengan layanan Cloudflare

```bash
npm run build
npm run cf:dev .svelte-kit/cloudflare
```

## Domain sendiri

Di dashboard Cloudflare, buka **Workers & Pages → sapala67 → Custom domains**, lalu tambahkan domain. Setelah aktif, perbarui URL utama di `src/lib/data/site.ts` agar metadata, sitemap, dan tautan berbagi sesuai domain tersebut.

## Yang perlu dijaga

- Jangan menghapus binding `DB` atau `MEDIA` dari `wrangler.jsonc`—keduanya diperlukan untuk konten admin dan unggahan foto.
- File unggahan menerima JPG, PNG, atau WebP hingga 8 MB per foto.
- Kredensial admin disimpan sebagai hash di D1, bukan di kode sumber.
