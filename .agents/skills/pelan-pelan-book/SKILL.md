---
name: pelan-pelan-book
description: Panduan arsitektur, aturan emas, alur pemasangan foto, anti-crop, audio, dan verifikasi untuk website digital book Pelan-Pelan.
when_to_use: "When working on the Pelan-Pelan digital book, adding/adjusting photos, managing chapters, styling, or audio."
allowed-tools: Read, Grep, Glob, Bash, Edit
effort: low
---

# Pelan-Pelan — Digital Book Rules & Architecture

> Buku digital interaktif personal (18 bab + 1 album penutup = 19 halaman).
> Mobile-first, target utama layar HP. Tema ivory `#FAF7F2`, teks charcoal, aksen warm muted.

---

## 1. Aturan Emas (Golden Rules)

1. **JANGAN PERNAH REWRITE BAB:**
   Teks 18 bab + 1 album sudah final setelah review berlapis dan lolos koreksi fakta.
   HANYA lakukan micro-edit jika ada permintaan koreksi faktual langsung dari user.
2. **Gaya Bahasa & Tone:**
   Bahasa Indonesia kasual, intim, hangat (`aku/kamu`, `nggak`, `pelan2`).
   Natural, tidak puitis berlebihan, tidak manipulatif, dan tanpa gaya AI.
3. **Fakta Terkunci:**
   - **Demak:** Dia TIDAK jadi datang (dilarang).
   - **Lokasi:** Banjarmasin = dia; Jawa = user.
   - **Martabak:** Martabak Bang Ahmad = kesukaan dia.
   - **Boarding:** Suasana boarding dan perpisahan.
   - **Pronomina:** Gunakan "kita", bukan "kami".
4. **Nol Bingkai Kosong (0 Empty Frames):**
   Jangan pernah merender placeholder/frame kosong di pembaca buku jika slot belum ada foto.
5. **Kualitas Kode & Linting:**
   - Stack: Vite + React 19 + TypeScript + Tailwind CSS v4.
   - Oxlint (`npm run lint`) WAJIB 0 error & 0 warning.
   - Build (`npm run build`) WAJIB lolos tanpa error.

---

## 2. Alur Pemasangan Foto (Photo Workflow)

1. User mengirim file (biasanya di `Downloads/` atau subfolder) + menceritakan konteksnya.
2. Tentukan bab yang cocok:
   - Jika cocok dengan narasi bab tertentu, pasang di bab tersebut.
   - Jika foto umum/kebersamaan, masukkan ke Bab 19 (Album Penutup).
3. Salin file foto ke `public/photos/` menggunakan PowerShell `-LiteralPath`.
4. Beri nama file dengan format slug rapi (misal: `foto-XX-deskripsi.jpg`).
5. Pasang ke `PHOTOS_BY_CHAPTER` di `src/components/BookPage.tsx`.
6. Terapkan pola **Anti-Crop**:
   - Foto vertikal 9:16: gunakan `ratio: '9 / 16'`, `position: 'center'`.
   - Foto potret 2:3 / 3:4: gunakan `ratio: '2 / 3'`, `position: 'center'`.
7. Berikan caption dengan suara buku (ringkas, 13px, natural & personal).
8. Jalankan verifikasi: `npm run lint` dan `npm run build`.

---

## 3. Peta Foto Saat Ini (21 Terpasang)

- **Bab 02:** `foto-1` (fotbar MTs), `foto-18` (bukber pertama pasca-lulus MTs, era covid)
- **Bab 03:** `foto-19` (booth Kota Lama gerimis), `foto-24` (booth terakhir Jepara)
- **Bab 10:** `foto-20` (hari terakhir MAN, siram-siraman)
- **Bab 11 (Grid 2 Kolom):** `foto-17` (photocard MTs), `foto-26` (Gramedia pra-renov)
- **Bab 13:** `foto-25` (sunset pantai favorit, rating ∞/10)
- **Bab 19 Album (13 Foto):**
  - `foto-11`, `foto-12` (awal MAN)
  - `foto-13`, `foto-14`, `foto-15` (classmeet)
  - `foto-21`, `foto-22`, `foto-23` (wisuda + kedua mama)
  - `foto-16` (PS Kudus)
  - `foto-27` (Azko)
  - `foto-28`, `foto-29`, `foto-30` (booth LDR Kudus)

---

## 4. Fitur Interaktif

- **Musik ♪:** File lokal `public/music/kota-ini-tak-sama-tanpamu.mp3`. Tidak ada autoplay (kepatuhan iOS audio context).
- **Tema:** Toggle Warm / Light yang tersimpan di `localStorage`.
- **Navigasi & Resume:** Resume halaman terakhir via dialog + navigasi swipe touch, klik, dan keyboard.
- **Responsive:** Diuji dan optimal pada 320px, 360px, 412px, tablet, dan desktop.
