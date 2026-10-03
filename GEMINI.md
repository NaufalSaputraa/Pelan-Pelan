---
trigger: always_on
---

# GEMINI.md — Aturan & Konfigurasi Agen "Pelan-Pelan"

> Konfigurasi kecerdasan buatan, arsitektur agen, dan protokol kerja untuk proyek website digital book **Pelan-Pelan**.

---

## 🛑 ATURAN EMAS PROYEK (P0 — PALING TINGGI)

1. **JANGAN PERNAH REWRITE BAB:**
   - Konten 18 bab + 1 album penutup (total 19 halaman) adalah isi **FINAL** yang sudah melewati review berlapis dan verifikasi fakta mendalam.
   - **DILARANG MEROMBAK/MERETAS/REWRITE TEKS BAB.**
   - HANYA lakukan micro-edit faktual bila user secara eksplisit meminta perbaikan kata atau fakta tertentu.

2. **GAYA BAHASA & TONE:**
   - Kasual intim (`aku/kamu`, `nggak`, `pelan2`), hangat, jujur, personal.
   - Tanpa kata puitis picisan, tanpa manipulasi emosional, dan dilarang keras terdengar seperti gaya bahasa klise AI.

3. **FAKTA KUNCI YANG SUDAH TERKUNCI:**
   - **Demak:** Dia TIDAK jadi datang (dilarang).
   - **Lokasi Geografis:** Banjarmasin = tempat dia; Jawa = tempat user.
   - **Makanan Kesukaan:** Martabak Bang Ahmad = kesukaan dia.
   - **Boarding:** Suasana boarding dan kenangan perpisahan.
   - **Pronomina:** Gunakan "kita", bukan "kami".

4. **ALUR & INTEGRITAS FOTO:**
   - **0 Bingkai Kosong:** Tidak boleh ada bingkai/placeholder kosong yang dirender di reader sebelum foto benar-benar terpasang.
   - **Anti-Crop:** Selalu terapkan pola anti-crop:
     - Foto 9:16 vertikal: `ratio: '9 / 16'` dengan `position: 'center'`.
     - Foto 2:3 / 3:4: `ratio: '2 / 3'` dengan `position: 'center'`.
   - **Salin Foto:** Selalu gunakan PowerShell `-LiteralPath` saat memindahkan file dari folder user/Downloads ke `public/photos/`.
   - **Caption:** Suara buku, pendek, ukuran 13px, natural & personal.

5. **STANDAR TEKNOLOGI & VERIFIKASI:**
   - Vite 8 + React 19 + TypeScript + Tailwind CSS v4.
   - **Oxlint:** WAJIB selalu 0 errors dan 0 warnings (`npm run lint`).
   - **Build:** WAJIB selalu lolos bersih (`npm run build`).
   - **Mobile-First:** Selalu perhatikan kenyamanan baca di layar HP (320px, 360px, 412px) dan kebijakan audio iOS (no autoplay).

---

## 🧠 OMNIMEMORY & AST CODE GRAPH

Proyek ini terhubung dengan **OmniMemory Local Engine**:
- **Active Namespace:** `pelan-pelan`
- **Engine Path:** `D:\Coding\AG-Kit\.agent\engine`
- **MCP Server:** FastMCP via `D:\Coding\AG-Kit\.agent\engine\mcp_server.py`
- **Blast Radius Guard:** Sebelum memodifikasi modul inti (seperti `BookShell.tsx`, `BookPage.tsx`, `App.tsx`), periksa ketergantungan agar tidak merusak navigasi atau render bab.
- **Status Check:** Jalankan `python D:\Coding\AG-Kit\.agent\engine\cli.py status` untuk memantau status memori dan code graph.

---

## 🤖 INTELLIGENT AGENT ROUTING

Sebelum merespons atau menulis kode, kenali spesialisasi yang relevan:

| Kategori | Spesialis Utama | Skill Terkait |
| -------- | --------------- | ------------- |
| **Buku / Bab / Foto** | `pelan-pelan-book` | `pelan-pelan-book`, `frontend-design` |
| **UI, Tipografi & Layout** | `frontend-specialist` | `frontend-design`, `tailwind-patterns`, `ui-ux-pro-max` |
| **Mobile & Touch Interaction** | `mobile-developer` | `mobile-design`, `webapp-testing` |
| **Debugging & Issue Isolation** | `debugger` | `systematic-debugging`, `simplify-code` |
| **QA, Lint & Verifikasi** | `qa-automation-engineer` | `lint-and-validate`, `verify-changes` |
| **Performa & Aset Ringan** | `performance-optimizer` | `clean-code` |

### Format Pengumuman Spesialis (Opsional / Direkomendasikan):
```markdown
🚀 **Applying knowledge of `@[agent-name]`...**
```

---

## 🛠️ SKILL LOADING & ATURAN KERJA

1. Jika mengerjakan penambahan foto atau bab: muat skill `pelan-pelan-book`.
2. Jika melakukan styling UI: terapkan palet ivory `#FAF7F2`, charcoal `#2D2926`, dan warm tone.
3. Jalankan verifikasi otomatis sebelum menyatakan tugas selesai:
   ```powershell
   npm run lint
   npm run build
   ```
