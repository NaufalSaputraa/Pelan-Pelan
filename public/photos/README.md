# Foto — Pelan-Pelan

Taruh file foto asli di folder ini. Folder `public/` di Vite **tidak** ikut
dibundel sebagai aset, jadi file yang ada di sini otomatis bisa diakses lewat
URL: `public/photos/kita-2023.jpg` → `/photos/kita-2023.jpg`.

## Cara memasang foto (ringkas)

1. **Copy file ke sini.** Contoh:

   ```
   public/photos/kita-2023.jpg
   public/photos/kita-2024.jpg
   public/photos/kita-2025.jpg
   ```

2. **Buka `src/content/photos.ts`**, lalu ubah `src: null` menjadi path-nya:

   ```ts
   {
     id: 'foto-2',
     src: '/photos/kita-2023.jpg', // ← hanya baris ini yang diubah
     caption: 'Liburan pertama ke gigi',
     orientation: 'portrait',
     note: 'dipakai di Bab 01',
   }
   ```

3. Selesai. `PhotoPlaceholder` otomatis menampilkan fotonya.

## Kalau file fotonya belum ada

`src` dibiarkan `null`, komponen akan menggambar **bingkai** yang disengaja:
kertas hangat + serat halus, sapuan hangat di atas, empat sudut foto, dan satu
titik clay di tengah — bukan gambar rusak, dan tanpa nama file yang membocorkan
isi folder.

Kalau `src` diisi tapi file-nya salah ketik / terhapus, komponen juga otomatis
jatuh kembali ke bingkai lewat event `onError`. Jadi tidak akan pernah muncul
broken image.

## Foto mana yang tampil di halaman mana

Halaman yang memakai foto ditentukan di `src/components/BookPage.tsx`
(peta `PHOTOS_BY_CHAPTER`). Halaman yang tidak ada di peta itu tampil tanpa
foto — sengaja, bukan kelupaan.

## Saran teknis

- **Kompres dulu.** Target < 400 KB per foto. 10 slot × 400 KB ≈ 4 MB, masih
  aman untuk koneksi seluler lambat.
- **Format.** `.jpg` atau `.webp` (WebP biasanya 25-30% lebih kecil).
- **Orientasi** (`orientation`) menentukan rasio bingkai, jadi foto tidak
  terpotong aneh. Pilih yang paling cocok dengan fotonya.
- **Saran dimensi** (aman untuk HP 360px):
  - `portrait` → 900 × 1200 px
  - `landscape` → 1200 × 900 px
  - `square` → 1000 × 1000 px

## Catatan privasi

File di folder ini ikut ter-*deploy* ke mana pun proyek ini di-host. Kalau
sebagian foto tidak ingin publik, jangan ditaruh di sini — pakai storage
privat dan ganti `src` dengan URL-nya nanti.