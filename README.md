# Pelan-Pelan

Buku digital 18 bab. Satu halaman web statis, tanpa akun, tanpa backend, tanpa
server-side. Isi dan naskahnya final — yang tersisa hanya mengganti foto asli,
musik, dan deploy.

| | |
| --- | --- |
| Halaman | 18 bab (`src/content/chapters.ts`) |
| Musik | satu lagu, manual, tanpa autoplay (`public/music/`) |
| Foto | 10 slot, siap diisi (`src/content/photos.ts`) |
| Halaman/Control | mode baca Warm (default) / Light, disimpan di localStorage |
| Dependency runtime | hanya `react` + `react-dom` |

---

## Menjalankan

Prasyarat: **Node.js 20+** (diuji di Node 24) dan npm.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + bundle produksi ke dist/
npm run preview    # serve hasil build di http://localhost:4173
npm run lint       # oxlint
```

### Tes di HP

Buku ini dirancang untuk layar **360px** dan harus diuji di HP sungguhan:

```bash
npm run dev -- --host
```

Lalu buka `http://<IP-KOMPUTER>:5173` dari HP yang tersambung ke WiFi yang sama.
Kalau tidak mau lewat WiFi, lihat bagian [Deploy](#deploy) — `npm run preview
-- --host` juga bisa dipakai untuk mengecek hasil build di HP.

---

## Struktur folder

```
src/
├─ components/
│  ├─ Cover.tsx              Sampul + tombol "Buka buku" / pilihan lanjut
│  ├─ BookShell.tsx          Kerangka buku + Running head + footer nav
│  ├─ BookPage.tsx           Render 1 bab sesuai chapter.variant
│  ├─ Navigation.tsx         Prev/Next + "01 — 18" + progress hairline
│  ├─ MusicToggle.tsx        Tombol "♪" pojok kanan atas
│  ├─ ReadingModeToggle.tsx  Tombol Warm/Light pojok kiri atas
│  └─ PhotoPlaceholder.tsx   Bingkai foto aman (tidak pernah broken image)
├─ content/
│  ├─ chapters.ts            ⚠️ SELURUH NASKAH BUKU — diedit paling sering
│  └─ photos.ts              ⚠️ DAFTAR FOTO — diedit paling sering
├─ hooks/
│  ├─ useBookNavigation.ts   Index halaman, prev/next, keyboard ←/→, swipe
│  ├─ useLocalStorage.ts     Pembungkus localStorage + kunci storage
│  └─ useReadingMode.ts      Mode baca warm/light → atribut data-reading-mode
├─ index.css                 ⚠️ DESIGN TOKENS (@theme Tailwind v4)
├─ App.tsx                   Cover ↔ BookShell + last-page
└─ main.tsx

public/
├─ music/
│  └─ kota-ini-tak-sama-tanpamu.mp3
└─ photos/                   ← taruh file foto asli di sini
```

### File yang paling sering dibuka

| File                       | Untuk apa                                          |
| -------------------------- | -------------------------------------------------- |
| `src/content/chapters.ts`  | Mengedit tulisan seluruh buku                        |
| `src/content/photos.ts`    | Memasang foto                                       |
| `src/components/MusicToggle.tsx` | Mengganti lagu                            |
| `src/index.css`            | Warna, font, ukuran teks, jarak antar elemen        |

---

## Mengedit tulisan

**Semua teks buku ada di satu file: `src/content/chapters.ts`.** Tidak ada teks
yang tersebar di komponen — mengedit file itu sama dengan mengedit buku.

```ts
{
  id: 'page-07',                       // unik & stabil, jangan diubah
  slug: 'bab-07-aku-belajar',          // cadangan untuk URL per bab
  title: 'Aku belajar dari banyak hal',
  subtitle: 'Ini masih proses, bukan cerita perubahan instan.',
  variant: 'text',
  bodyPlaceholder: [                   // satu elemen = satu paragraf
    'Sejak semuanya berhenti, sekitar sebulan ini aku banyak diam dan banyak mikir.',
    'Aku juga baca ulang percakapan kita, dan semua yang pernah kamu keluhkan.',
  ],
},
```

Aturan praktis:

- **Urutan array = urutan baca.** Nomor halaman ("01 — 18") dihitung otomatis,
  jadi jangan menulis nomor halaman di dalam teks.
- **Satu elemen = satu paragraf.** Di 360px, paragraf pendek jauh lebih enak
  dibaca daripada satu blok panjang.
- **Jangan pakai markdown.** `*`, `**`, `#`, `---` akan tampil apa adanya —
  formatannya ditentukan oleh `variant`.
- Tambah bab = tambah satu objek di dalam array. Tidak ada tempat lain yang
  perlu disentuh (foto, footer, progress, dan penyimpanan halaman ikut adapting).

### Pilihan `variant`

| Variant     | Tampilan                                  |
| ----------- | ----------------------------------------- |
| `cover`     | Halaman sampul di dalam buku              |
| `text`      | Judul + beberapa paragraf (paling banyak) |
| `quote`     | Satu kutipan besar + teks pendukung        |
| `scrapbook` | Foto + caption + sedikit teks             |
| `minimal`   | Sangat sedikit teks, banyak ruang kosong  |

---

## Mengganti foto

Ada 10 slot foto, semuanya masih `null` — sengaja, supaya tidak pernah muncul
broken image. Slot yang kosong tampil sebagai bingkai yang bersih dan hangat.

Ringkasnya:

1. Simpan file ke `public/photos/` → `public/photos/kita-2023.jpg`
2. Ubah `src: null` jadi `src: '/photos/kita-2023.jpg'` di `src/content/photos.ts`
3. Selesai

Detailnya (ukuran, orientasi, kompresi) ada di
**[`public/photos/README.md`](public/photos/README.md)**.

Kalau `src` sudah diisi tapi file-nya salah ketik atau terhapus,
`PhotoPlaceholder` otomatis kembali ke bingkai — jadi halaman yang sedang dibaca
tidak pernah rusak di tengah jalan.

---

## Mengganti musik 🎵

1. Simpan filenya di `public/music/` (format `.mp3` atau `.m4a`)
2. Buka `src/components/MusicToggle.tsx`, ubah satu baris:

   ```ts
   const MUSIC_SRC = '/music/kota-ini-tak-sama-tanpamu.mp3'
   ```

Sudah ada satu lagu di `public/music/kota-ini-tak-sama-tanpamu.mp3` (± 11 MB,
320 kbps).

Aturan yang sudah diterapkan di komponennya, dan sebaiknya tidak diubah:

- **Tidak ada autoplay.** Semua browser mobile memblokir autoplay yang membawa
  audio. `play()` hanya dipanggil dari dalam `onClick`, jadi tetap di dalam
  "user gesture" yang diizinkan iOS Safari.
- **`preload="none"`.** Nol byte diunduh sebelum tombol ditekan. consequence:
  sambungan pertama bisa delaying beberapa detik.
- **Loop + volume 0.6.** Satu lagu, diputar terus, cukup pelan untuk tetap
  bisa membaca. Tombolnya bergantian antara `♪` (belum main) dan jeda.
- **Gagal load ≠ error.** Kalau file tidak ada / format tidak didukung,
  tombolnya hilang begitu saja dan buku tetap jalan normal.
- **Bisa dimatikan.** Tombolnya selalu ada di pojok kanan atas — musik yang
  tidak bisa dimatikan akan membuat aplikasi langsung dibuang.

Kalau file-nya terlalu besar, kompres dulu (mis. 128 kbps mono). Target < 3 MB
supaya tetap ringan di koneksi seluler.

---

## Halaman terakhir & mode baca

Dua hal yang disimpan di `localStorage` (kuncinya di `STORAGE_KEYS`,
`src/hooks/useLocalStorage.ts`):

| Kunci                       | Isi                                                |
| --------------------------- | -------------------------------------------------- |
| `pelan-pelan:last-page`     | Index bab terakhir yang dibaca                      |
| `pelan-pelan:reading-mode`  | `warm` (bawaan) atau `light`                        |

**Halaman terakhir.** Tiap kali bab berganti, index-nya disimpan. Saat buku
dibuka lagi, kalau simpanannya bukan halaman pertama, sampul menampilkan satu
pilihan tenang: *"Kamu terakhir berhenti di halaman 07 — Lanjut / Mulai dari
awal"*. Tidak ada popup, tidak ada hitung mundur. Memilih "Mulai dari awal"
langsung menghapus tawaran itu di pembukaan berikutnya.

**Mode baca.** Tombol Warm/Light di pojok kiri atas mengganti atribut
`data-reading-mode` di elemen `<html>`. Warnanya bukan dihitung di JS — blok
`html[data-reading-mode='light']` di `src/index.css` yang menimpa token warna,
dan seluruh buku ikut berubah karena Tailwind v4 memakai variabel CSS. Warm
adalah bawaannya, dan preferensinya dipasang sebelum render pertama supaya
tidak ada kedip saat halaman dibuka.

---

## Design token

Semua token ada di satu tempat: blok `@theme` di `src/index.css`. Pada
Tailwind v4, `@theme` adalah padanan `tailwind.config.js extend` yang ditulis
sebagai CSS.

| Token               | Nilai                 | Dipakai untuk              |
| ------------------- | --------------------- | -------------------------- |
| `--color-ivory`     | `#FAF7F2`             | Background utama           |
| `--color-charcoal`  | `#2B2B2B`             | Teks utama                 |
| `--color-muted`     | `#8C7A6B`             | Accent: muted brown        |
| `--color-clay`      | `#C4A484`             | Subtle warm accent         |
| `--color-line`      | `#E3DAD0`             | Garis tipis / divider      |
| `--font-display`    | Cormorant Garamond    | Heading                    |
| `--font-body`       | Inter                 | UI, navigasi               |
| `--font-body-serif` | Lora                  | Isi paragraf               |
| `--container-book`  | `38rem`               | Lebar baca maksimum         |
| `--text-body`       | `1.0625rem` / `1.85`  | Ukuran & ritme teks         |

Font dimuat dari Google Fonts lewat `<link>` di `index.html`.

### Anti horizontal overflow di 360px

Tiga lapis, jangan sampai salah satu dihapus:

1. `overflow-x: hidden` di `html` dan `body` (`src/index.css`)
2. Wrapper `mx-auto w-full max-w-book px-5` — **jangan pernah `w-screen`**
3. `* { min-width: 0 }` global, supaya child flex/grid tidak memaksa melebar

Kontrol pojok (`MusicToggle`, `ReadingModeToggle`) memakai `position: fixed`
lewat kelas `.corner-row`, jadi tidak pernah menambah lebar dokumen.

---

## Deploy

`npm run build` menghasilkan `dist/` — site statis biasa, tanpa Node.js di
server. Cek dulu secara lokal dengan `npm run preview`.

| Cara                    | Build command    | Publish dir |
| ----------------------- | ---------------- | ----------- |
| Netlify / Vercel        | `npm run build`  | `dist`      |
| GitHub Pages            | `npm run build`  | `dist`      |
| Static host / S3 / R2   | upload isi `dist/` | —         |

- **Domain root** (`https://contoh.com/`): apa adanya, tidak perlu pengaturan
  tambahan.
- **Sub-path** (mis. `username.github.io/pelan-pelan/`): tambahkan
  `base: '/pelan-pelan/'` di `vite.config.ts`, lalu build ulang.
- **HTTPs, cache, dan kompresi** — tidak ada yang perlu diubah di kode.
  `dist/` sudah pakai hash di nama file-nya, jadi cache aman untuk jangka
  panjang.

Kalau folder `dist/` di-host di sub-path, file musik dan foto ikut terbawa
karena keduanya ada di `public/`.

---

## Stack

| Paket        | Versi |
| ------------ | ----- |
| Vite         | 8.x   |
| React        | 19.x  |
| TypeScript   | 7.x   |
| Tailwind CSS | 4.x   |
| oxlint       | 1.x   |

Tailwind 4 dipakai lewat plugin resmi `@tailwindcss/vite`, jadi **tidak ada**
file `tailwind.config.js` — token warna & font ditulis sebagai CSS di blok
`@theme` pada `src/index.css`. Itu padanan `theme.extend` di v4.

Hanya dua dependency runtime (`react`, `react-dom`), supaya buku ini tetap
ringan di HP.

---

## Yang belum

- **Foto asli.** Semua `src` di `src/content/photos.ts` masih `null`, jadi yang
  tampil sekarang bingkai yang bersih. Fotonya tinggal diisi sesuai
  langkah di bagian [Mengganti foto](#mengganti-foto).
- **Daftar bab.** Belum ada cara lompat ke bab tertentu selain satu per satu
  (swipe / tombol).
- **Optimasi gambar.** `loading="lazy"` sudah ada, tapi belum ada `srcset`
  responsif.
- **URL per bab.** `slug` sudah disiapkan di `chapters.ts`, tapi belum dipakai
  sebagai route — jadi satu bab belum bisa di-*share* lewat link.