/* ==========================================================================
   DAFTAR FOTO & CAPTION — "Pelan-Pelan"
   --------------------------------------------------------------------------
   Digital Book:
   “Pelan-Pelan — Tentang kamu, tentang aku, dan tujuh tahun yang pernah kita punya.”
   Caption Master Verbatim dari Perbaikan.txt.
   Semua rasio disetel presisi ke dimensi file asli (Anti-Crop 100%).
   ========================================================================== */

export type PhotoOrientation = 'portrait' | 'landscape' | 'square'

export interface PhotoEntry {
  /** Unik, stabil, dipakai untuk mencari foto. */
  id: string
  /**
   * Path file di dalam /public/photos/.
   * null = slot cadangan yang belum ada file fisiknya.
   */
  src: string | null
  /** Caption kecil di bawah foto. */
  caption?: string
  /** Rasio bingkai (portrait 3:4, landscape 4:3, square 1:1). */
  orientation: PhotoOrientation
  /**
   * Rasio CSS spesifik untuk anti-crop (misal: '9 / 16', '2 / 3', '16 / 9').
   * Menimpa default orientation bila diisi.
   */
  ratio?: string
  /** Titik fokus object-position CSS (misal: 'center'). */
  position?: string
  /** Tipe media: image (default) atau video. */
  type?: 'image' | 'video'
  /** Catatan internal bab dan momen. */
  note: string
}

export const photos: PhotoEntry[] = [
  /* ------------------------------------------------------------------------
     BAB 02 — Dua foto kenangan masa MTs
     ------------------------------------------------------------------------ */
  {
    id: 'foto-1',
    src: '/photos/fotbar-pertama-mts.jpg',
    caption:
      'Fotbar pertama kita waktu MTs. Kalau dipikir sekarang, lucu juga. Dari foto sesederhana ini, ceritanya ternyata bisa sampai sejauh itu.',
    orientation: 'landscape',
    // File asli 1280x720 = 16:9 persis. ratio '16 / 9' mencegah sisi kiri/kanan terpotong.
    ratio: '16 / 9',
    position: 'center',
    note: 'Bab 02 - Fotbar pertama MTs.',
  },
  {
    id: 'foto-18',
    src: '/photos/bukber-mts.jpg',
    caption:
      'Bukber pertama kita setelah lulus MTs, waktu masa COVID. Kalau lihat foto ini sekarang, aku masih inget suasananya. Dan jujur, kamu cantik banget waktu itu.',
    orientation: 'portrait',
    position: 'center',
    note: 'Bab 02 - Bukber pertama MTs era COVID.',
  },

  /* ------------------------------------------------------------------------
     BAB 03 — Dua foto photo booth kenangan jalan-jalan
     ------------------------------------------------------------------------ */
  {
    id: 'foto-19',
    src: '/photos/photobooth-kotalama.jpg',
    caption:
      'Photo booth Kota Lama. Waktu itu Kota Lama lagi sepi karena gerimis. Setelahnya kita jalan sambil lihat jalanan dan city light sebelum pulang.',
    orientation: 'portrait',
    position: 'center',
    note: 'Bab 03 - Photo booth Kota Lama.',
  },
  {
    id: 'foto-24',
    src: '/photos/photobooth-jepara.jpg',
    caption:
      'Photo booth Jepara. Kayaknya ini salah satu photo booth terakhir kita. Outfitmu selalu bagus, dan entah kenapa foto-foto seperti ini sekarang terasa jauh lebih berharga.',
    orientation: 'portrait',
    // File asli 853x1280 = 2:3 rasio.
    ratio: '2 / 3',
    position: 'center',
    note: 'Bab 03 - Photo booth Jepara.',
  },
  {
    id: 'video-1',
    src: '/photos/vlog-jepara.mp4',
    caption:
      'Kamu ngevlog waktu kita lagi otw ke Jepara Kota. Aku inget banget momen ini.',
    orientation: 'portrait',
    ratio: '9 / 16',
    position: 'center',
    type: 'video',
    note: 'Bab 03 - Video vlog otw Jepara Kota.',
  },
  {
    id: 'video-photobooth-jepara-1',
    src: '/photos/vlog-photobooth-jepara-1.mp4',
    caption:
      'Vlog pas kita photobooth di Jepara yang aku pakai baju muslim dan vibes-nya kayak habis lebaran banget. Momen yang lucu buat dikenang.',
    orientation: 'portrait',
    ratio: '9 / 16',
    position: 'center',
    type: 'video',
    note: 'Bab 03 - Vlog photobooth Jepara part 1.',
  },
  {
    id: 'video-photobooth-jepara-2',
    src: '/photos/vlog-photobooth-jepara-2.mp4',
    caption:
      'Lanjutan vlog pas kita photobooth di Jepara. Masih dengan vibes habis lebaran yang lucu buat diingat.',
    orientation: 'portrait',
    ratio: '9 / 16',
    position: 'center',
    type: 'video',
    note: 'Bab 03 - Vlog photobooth Jepara part 2.',
  },
  {
    id: 'foto-katsukai',
    src: '/photos/katsukai-unnes.jpg',
    caption:
      'Foto selfiemu yang cantik pas kita lagi makan katsukai di UNNES. Aku nggak pernah makan katsukai di tempatnya langsung setelah ini.',
    orientation: 'portrait',
    ratio: '9 / 16',
    position: 'center',
    note: 'Foto selfie makan Katsukai di UNNES.',
  },

  /* ------------------------------------------------------------------------
     BAB 10 — Satu foto perpisahan MAN
     ------------------------------------------------------------------------ */
  {
    id: 'foto-20',
    src: '/photos/hari-terakhir-man.jpg',
    caption:
      'Hari terakhir di MAN. Habis siram-siraman air dan perpisahan angkatan. Lucu banget kalau sekarang dikenang.',
    orientation: 'portrait',
    // File asli 568x1053 = ~9:16 vertikal.
    ratio: '9 / 16',
    position: 'center',
    note: 'Bab 10 - Hari terakhir MAN.',
  },

  /* ------------------------------------------------------------------------
     BAB 11 — Scrapbook kenangan kecil (foto + video)
     ------------------------------------------------------------------------ */
  {
    id: 'foto-17',
    src: '/photos/photocard-mts.jpg',
    caption:
      'Waktu MTs kita jarang ketemu, jadi aku sering ngeprint fotomu kayak gini. Lucu juga kalau diingat sekarang.',
    orientation: 'portrait',
    ratio: '9 / 16',
    position: 'center',
    note: 'Bab 11 - Photocard MTs.',
  },
  {
    id: 'foto-26',
    src: '/photos/gramedia-semarang.jpg',
    caption:
      'Gramedia Semarang sebelum direnov. Aku masih ingat waktu itu kamu pose kayak gini dan aku langsung pengen foto.',
    orientation: 'portrait',
    ratio: '9 / 16',
    position: 'center',
    note: 'Bab 11 - Gramedia Semarang sebelum renov.',
  },
  {
    id: 'video-nomi',
    src: '/photos/belajar-bareng-nomi.mp4',
    caption:
      'Waktu kamu belajar ditemenin Nomi. Momen-momen kecil kayak gini yang selalu bikin senyum.',
    orientation: 'portrait',
    ratio: '9 / 16',
    position: 'center',
    type: 'video',
    note: 'Bab 11 - Video belajar bareng Nomi.',
  },
  {
    id: 'foto-nomi-boneka',
    src: '/photos/nomi-dan-boneka.jpg',
    caption:
      'Nomi sama bonekamu yang aku lupa namanya (maaf yaa). Walau aku nggak punya foto bareng Nopi dan Nomi langsung, mereka tetap jadi bagian yang selalu aku inget.',
    orientation: 'portrait',
    ratio: '9 / 16',
    position: 'center',
    note: 'Bab 11 - Foto Nomi dan boneka.',
  },

  /* ------------------------------------------------------------------------
     BAB 13 — Satu foto favorit personal
     ------------------------------------------------------------------------ */
  {
    id: 'foto-25',
    src: '/photos/sunset-pantai-favorit.jpg',
    caption:
      'Ini salah satu foto favoritku. Kayaknya aku yang motoin kamu. Outfit yang ini aku suka banget. Kamu kelihatan cantik dan bersinar pas sunset. Kalau aku kasih rating: ∞/10.',
    orientation: 'portrait',
    // File asli 853x1280 = 2:3 rasio.
    ratio: '2 / 3',
    position: 'center',
    note: 'Bab 13 - Sunset favorit.',
  },

  /* ------------------------------------------------------------------------
     BAB 19 — Album Penutup: Kumpulan Kenangan Kita
     ------------------------------------------------------------------------ */
  {
    id: 'foto-11',
    src: '/photos/man-awal-1.jpg',
    caption:
      'Awal kita di MAN. Salah satu bagian dari cerita kita yang waktu itu masih panjang banget dan belum tahu bakal sampai mana.',
    orientation: 'portrait',
    position: 'center',
    note: 'Album penutup - Awal di MAN.',
  },
  {
    id: 'foto-12',
    src: '/photos/man-awal-2.jpg',
    caption:
      'Jujur, salah satu foto favoritku sampai sekarang. Entah kenapa setiap lihat foto ini, suasananya masih kerasa.',
    orientation: 'landscape',
    position: 'center',
    note: 'Album penutup - Foto favorit MAN.',
  },
  {
    id: 'foto-13',
    src: '/photos/classmeet-man-1.jpg',
    caption: 'Classmeet MAN. Lucu banget kalau momen ini diingat-ingat.',
    orientation: 'landscape',
    ratio: '3 / 2',
    position: 'center',
    note: 'Album penutup - Classmeet 1.',
  },
  {
    id: 'foto-14',
    src: '/photos/classmeet-man-2.jpg',
    caption:
      'Kalau bisa mengulang waktu, ini salah satu momen yang mungkin bakal tetap aku pilih buat diingat.',
    orientation: 'landscape',
    ratio: '3 / 2',
    position: 'center',
    note: 'Album penutup - Classmeet 2.',
  },
  {
    id: 'foto-15',
    src: '/photos/classmeet-man-3.jpg',
    caption:
      'Tawa kayak gini yang paling gampang bikin aku balik ke suasana waktu itu.',
    orientation: 'landscape',
    ratio: '3 / 2',
    position: 'center',
    note: 'Album penutup - Classmeet 3.',
  },
  {
    id: 'foto-21',
    src: '/photos/wisuda-man-1.jpg',
    caption:
      'Hari kelulusan MAN. Kita serasi banget hari itu. Lucu kalau diingat.',
    orientation: 'portrait',
    // File asli 720x1280 = 9:16 persis. Anti-crop penuh.
    ratio: '9 / 16',
    position: 'center',
    note: 'Album penutup - Kelulusan MAN 1.',
  },
  {
    id: 'foto-22',
    src: '/photos/wisuda-man-2.jpg',
    caption:
      'Kamu cantik banget hari itu. Aku masih ingat outfit dan makeup-mu.',
    orientation: 'portrait',
    // File asli 720x1280 = 9:16 persis. Anti-crop penuh.
    ratio: '9 / 16',
    position: 'center',
    note: 'Album penutup - Kelulusan MAN 2.',
  },
  {
    id: 'foto-23',
    src: '/photos/wisuda-man-3.jpg',
    caption:
      'Pertama kalinya aku foto bareng mamahmu dan mamahku. Salah satu titik penting sebelum kita benar-benar masuk ke masa LDR yang jauh.',
    orientation: 'portrait',
    // File asli 720x1280 = 9:16 persis. Anti-crop penuh.
    ratio: '9 / 16',
    position: 'center',
    note: 'Album penutup - Foto bareng mamah.',
  },
  {
    id: 'foto-16',
    src: '/photos/main-ps-kudus.jpg',
    caption:
      'Pertama kali main PS di Kudus. Ketawa lepas banget waktu itu. Sampai sekarang kalau lihat fotonya, aku masih bisa kebayang suasananya.',
    orientation: 'portrait',
    ratio: '9 / 16',
    position: 'center',
    note: 'Album penutup - Main PS di Kudus.',
  },
  {
    id: 'foto-27',
    src: '/photos/azko-kudus.jpg',
    caption:
      'AZKO Kudus. Waktu itu kita cuma gabut, jalan-jalan sambil ngomongin furniture yang mungkin suatu hari bakal kita butuhin.',
    orientation: 'portrait',
    ratio: '9 / 16',
    position: 'center',
    note: 'Album penutup - AZKO Kudus.',
  },
  {
    id: 'foto-28',
    src: '/photos/booth-ldr-1.jpg',
    caption:
      'Photobooth pertama kita pas LDR, di Kudus. Happy banget waktu itu.',
    orientation: 'portrait',
    ratio: '2 / 3',
    position: 'center',
    note: 'Album penutup - LDR pertama.',
  },
  {
    id: 'foto-29',
    src: '/photos/booth-ldr-2.jpg',
    caption:
      'Momen lucu. Almet kita warnanya couple walaupun beda universitas.',
    orientation: 'portrait',
    ratio: '2 / 3',
    position: 'center',
    note: 'Album penutup - Almet couple.',
  },
  {
    id: 'foto-30',
    src: '/photos/booth-ldr-3.jpg',
    caption:
      'Ketawa kayak gini yang dulu bikin jarak terasa sedikit lebih dekat.',
    orientation: 'portrait',
    ratio: '9 / 16',
    position: 'center',
    note: 'Album penutup - Ketawa LDR.',
  },

  /* ------------------------------------------------------------------------
     SLOT CADANGAN (src: null, tidak dipetakan ke tampilan)
     ------------------------------------------------------------------------ */
  {
    id: 'foto-2',
    src: null,
    caption: 'Sore-sore muter-muter, beli jajan. Ternyata waktu sesederhana itu bisa jadi salah satu bagian yang paling aku rindukan.',
    orientation: 'portrait',
    note: 'Slot cadangan - Kelas 12.',
  },
  {
    id: 'foto-3',
    src: null,
    caption: 'Waktu kita kehujanan. Bajuku basah kuyup, malamnya aku malah demam. Tapi kalau sekarang diingat, aku tetap senyum.',
    orientation: 'square',
    note: 'Slot cadangan - Hujan.',
  },
  {
    id: 'foto-4',
    src: null,
    caption: 'Muria. Pentol. Terus pulang. Sesederhana itu, tapi tetap jadi kenangan.',
    orientation: 'portrait',
    note: 'Slot cadangan - Muria.',
  },
  {
    id: 'foto-5',
    src: null,
    caption: 'Jepara–Semarang, mampir Indomaret. Nggak ada tujuan besar. Tapi waktu itu rasanya sudah seperti petualangan sendiri.',
    orientation: 'square',
    note: 'Slot cadangan - Jepara-Semarang.',
  },
  {
    id: 'foto-6',
    src: null,
    caption: 'Photo booth dan city lights.',
    orientation: 'landscape',
    note: 'Slot cadangan.',
  },
  {
    id: 'foto-7',
    src: null,
    caption: 'Martabak Bang Ahmad.',
    orientation: 'landscape',
    note: 'Slot cadangan.',
  },
  {
    id: 'foto-8',
    src: null,
    caption: 'Jepara–Semarang mampir Indomaret.',
    orientation: 'portrait',
    note: 'Slot cadangan.',
  },
  {
    id: 'foto-9',
    src: null,
    caption: 'Waktu dirawat di Demak.',
    orientation: 'portrait',
    note: 'Slot cadangan.',
  },
  {
    id: 'foto-10',
    src: null,
    caption: 'Hadiah dan surat kecil.',
    orientation: 'square',
    note: 'Slot cadangan.',
  },
]

/** Cari slot foto berdasarkan id. */
export function getPhotoById(id: string): PhotoEntry | undefined {
  return photos.find((photo) => photo.id === id)
}

/** Rasio CSS untuk tiap orientasi (dipakai PhotoPlaceholder). */
export const orientationRatio: Record<PhotoOrientation, string> = {
  portrait: '3 / 4',
  landscape: '4 / 3',
  square: '1 / 1',
}
