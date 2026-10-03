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
      'Fotbar pertama kita waktu MTs. Kalo dipikir sekarang, lucu juga. Dari foto sesederhana ini, ceritanya ternyata bisa sampai sejauh itu.',
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
      'Bukber pertama kita setelah lulus MTs, waktu masa COVID. Kalo lihat foto ini sekarang, aku masih inget suasananya. Dan jujur, kamu cantik banget waktu itu.',
    orientation: 'portrait',
    position: 'center',
    note: 'Bab 02 - Bukber pertama MTs era COVID.',
  },

  /* ------------------------------------------------------------------------
     BAB 03 — Dua foto photo booth kenangan jalan2
     ------------------------------------------------------------------------ */
  {
    id: 'foto-19',
    src: '/photos/photobooth-kotalama.jpg',
    caption:
      'Photo booth Kota Lama. Waktu itu Kota Lama lagi sepi karna gerimis. Setelahnya kita jalan sambil lihat jalanan dan city light sebelum pulang.',
    orientation: 'portrait',
    position: 'center',
    note: 'Bab 03 - Photo booth Kota Lama.',
  },
  {
    id: 'foto-24',
    src: '/photos/photobooth-jepara.jpg',
    caption:
      'Photo booth Jepara. Kayaknya ini salah satu photo booth terakhir kita. Outfitmu selalu bagus, dan entah kenapa foto2 seperti ini sekarang terasa jauh lebih berharga.',
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
    id: 'video-photobooth-jepara-live',
    src: '/photos/video-photobooth-jepara-live.mp4',
    caption:
      'Live photobooth di Jepara. Outfitnya lucu, cuma kemejaku nggak muat jadi nggak dikancingin.',
    orientation: 'landscape',
    ratio: '16 / 9',
    position: 'center',
    type: 'video',
    note: 'Bab 03 - Live video photobooth Jepara.',
  },
  {
    id: 'video-jepara-pagi-bri',
    src: '/photos/vlog-jepara-pagi-bri.mp4',
    caption:
      'Vlog pagi di Jepara Kota habis jemput cewek cantik, mampir ambil uang di BRI dulu.',
    orientation: 'portrait',
    ratio: '9 / 16',
    position: 'center',
    type: 'video',
    note: 'Bab 03 - Vlog pagi di Jepara Kota & BRI.',
  },
  {
    id: 'foto-dimsum-jepara',
    src: '/photos/dimsum-alun-alun-jepara.jpg',
    caption:
      'Sore hari beli dimsum di Alun-Alun Jepara yang waktu itu kuupload di SG karna fotonya lucu—atau lebih tepatnya, jadi lucu karna ada kamu.',
    orientation: 'portrait',
    ratio: '3 / 4',
    position: 'center',
    note: 'Bab 03 - Sore beli dimsum di Alun-Alun Jepara.',
  },
  {
    id: 'video-jepara-lamongan-malam',
    src: '/photos/vlog-jepara-lamongan-malam.mp4',
    caption:
      'Vlog lucu pas kita di Jepara, nyari lamongan enak dan berakhir makan di situ, terus lanjut jalan2 malam menikmati Jepara.',
    orientation: 'portrait',
    ratio: '3 / 4',
    position: 'center',
    type: 'video',
    note: 'Bab 03 - Vlog malam cari lamongan di Jepara.',
  },
  {
    id: 'foto-dp-mall',
    src: '/photos/buka-puasa-dp-mall.jpg',
    caption:
      'Nunggu buka puasa di DP Mall sampai bingung mau ngapain. Tapi aku bersyukur foto ini masih ada, kamu kelihatan lucu dan imut banget di sini.',
    orientation: 'portrait',
    ratio: '3 / 4',
    position: 'center',
    note: 'Bab 03 - Nunggu buka puasa di DP Mall.',
  },

  /* ------------------------------------------------------------------------
     BAB 08 — Satu foto nonton film Sore di bioskop
     ------------------------------------------------------------------------ */
  {
    id: 'foto-bioskop-sore',
    src: '/photos/nonton-bioskop-sore.jpg',
    caption:
      'Waktu kamu ngajakin aku nonton film Sore di bioskop. Salah satu momen berdua yang paling bikin kangen.',
    orientation: 'landscape',
    ratio: '4 / 3',
    position: 'center',
    note: 'Bab 08 - Nonton film Sore di bioskop.',
  },

  /* ------------------------------------------------------------------------
     BAB 12 — Tentang kamu (foto selfie & video kenangan)
     ------------------------------------------------------------------------ */
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
  {
    id: 'foto-butterhub',
    src: '/photos/butterhub-unnes-rapat.jpg',
    caption:
      'Makan di Butterhub sebelum aku rapat divisi di UNNES. Lucu banget kalo diingat, kamu ikut nemenin rapat dan akhirnya kukenalin ke semua temen2ku.',
    orientation: 'portrait',
    ratio: '3 / 4',
    position: 'center',
    note: 'Bab 12 - Makan di Butterhub UNNES sebelum rapat divisi.',
  },
  {
    id: 'video-coffeeshop-jepara-1',
    src: '/photos/vlog-coffeeshop-jepara-1.mp4',
    caption:
      'Ngevlog di coffee shop Jepara. Aku lupa tepatnya di mana, tapi suasananya masih kerasa banget.',
    orientation: 'portrait',
    ratio: '9 / 16',
    position: 'center',
    type: 'video',
    note: 'Bab 12 - Vlog coffee shop Jepara part 1.',
  },
  {
    id: 'video-coffeeshop-jepara-2',
    src: '/photos/vlog-coffeeshop-jepara-2.mp4',
    caption:
      'Cerita2 sambil ketawa lepas berdua. Momen sederhana kayak gini yang selalu bikin kangen.',
    orientation: 'landscape',
    ratio: '16 / 9',
    position: 'center',
    type: 'video',
    note: 'Bab 12 - Vlog coffee shop Jepara part 2.',
  },
  {
    id: 'video-momen-gemes',
    src: '/photos/vlog-momen-gemes.mp4',
    caption: 'Momen lucu banget waktu kamu lagi gemes-gemesnya.',
    orientation: 'portrait',
    ratio: '9 / 16',
    position: 'center',
    type: 'video',
    note: 'Bab 12 - Video momen gemes.',
  },
  {
    id: 'foto-cafe-jepara-kota',
    src: '/photos/foto-cafe-jepara-kota.jpg',
    caption:
      'Di salah satu cafe Jepara Kota. Lupa nama tempatnya, tapi nggak akan pernah lupa kenangan waktu ke sana bareng kamu.',
    orientation: 'portrait',
    ratio: '9 / 16',
    position: 'center',
    note: 'Bab 12 - Foto cafe di Jepara Kota.',
  },

  /* ------------------------------------------------------------------------
     BAB 10 — Tujuh tahun yang disyukuri (foto MAN + PAP cantik)
     ------------------------------------------------------------------------ */
  {
    id: 'foto-20',
    src: '/photos/hari-terakhir-man.jpg',
    caption:
      'Hari terakhir di MAN. Habis siram2an air dan perpisahan angkatan. Lucu banget kalo sekarang dikenang.',
    orientation: 'portrait',
    // File asli 568x1053 = ~9:16 vertikal.
    ratio: '9 / 16',
    position: 'center',
    note: 'Bab 10 - Hari terakhir MAN.',
  },
  {
    id: 'foto-pap-cantik-1',
    src: '/photos/pap-cantik-1.jpg',
    caption: 'PAP cantik yang selalu bikin senyum.',
    orientation: 'portrait',
    ratio: '9 / 16',
    position: 'center',
    note: 'Bab 10 - PAP cantik 1.',
  },
  {
    id: 'foto-pap-cantik-2',
    src: '/photos/pap-cantik-2.jpg',
    caption:
      'Melihat foto ini selalu bikin aku bersyukur pernah punya kamu selama tujuh tahun ini.',
    orientation: 'portrait',
    ratio: '9 / 16',
    position: 'center',
    note: 'Bab 10 - PAP cantik 2.',
  },

  /* ------------------------------------------------------------------------
     BAB 11 — Scrapbook kenangan kecil (foto + video)
     ------------------------------------------------------------------------ */
  {
    id: 'foto-17',
    src: '/photos/photocard-mts.jpg',
    caption:
      'Waktu MTs kita jarang ketemu, jadi aku sering ngeprint fotomu kayak gini. Lucu juga kalo diingat sekarang.',
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
      'Waktu kamu belajar ditemenin Nomi. Momen2 kecil kayak gini yang selalu bikin senyum.',
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
  {
    id: 'foto-photobooth-meja-belajar',
    src: '/photos/photobooth-meja-belajar.jpg',
    caption:
      'Foto favoritku. Melihat ada photo booth kita terpampang di atas meja belajarmu, waktu itu bikin aku ngerasa sangat dihargai sebagai pasanganmu.',
    orientation: 'portrait',
    ratio: '3 / 4',
    position: 'center',
    note: 'Bab 11 - Photo booth terpampang di atas meja belajar.',
  },
  {
    id: 'video-tiktok-cantik-1',
    src: '/photos/video-tiktok-cantik-1.mp4',
    caption:
      'Salah satu video TikTok favoritku, senyummu di sini manis banget.',
    orientation: 'portrait',
    ratio: '9 / 16',
    position: 'center',
    type: 'video',
    note: 'Bab 11 - Video TikTok favorit part 1.',
  },
  {
    id: 'video-tiktok-cantik-2',
    src: '/photos/video-tiktok-cantik-2.mp4',
    caption:
      'Masih tersimpan rapi sampai sekarang. Kamu bener2 secantik itu.',
    orientation: 'portrait',
    ratio: '9 / 16',
    position: 'center',
    type: 'video',
    note: 'Bab 11 - Video TikTok favorit part 2.',
  },

  /* ------------------------------------------------------------------------
     BAB 13 — Momen sunset Pantai Prau Jepara (foto favorit + vlog)
     ------------------------------------------------------------------------ */
  {
    id: 'foto-25',
    src: '/photos/sunset-pantai-favorit.jpg',
    caption:
      'Ini salah satu foto favoritku. Kayaknya aku yang motoin kamu. Outfit yang ini aku suka banget. Kamu kelihatan cantik dan bersinar pas sunset. Kalo aku kasih rating: ∞/10.',
    orientation: 'portrait',
    // File asli 853x1280 = 2:3 rasio.
    ratio: '2 / 3',
    position: 'center',
    note: 'Bab 13 - Sunset favorit.',
  },
  {
    id: 'video-pantai-prau',
    src: '/photos/vlog-pantai-prau.mp4',
    caption:
      'Vlog kita di Pantai Prau Jepara. Lucu banget kalo diingat, aslinya mau foto banyak tapi malah backlight, jadinya baru foto2 pas sunset.',
    orientation: 'landscape',
    ratio: '16 / 9',
    position: 'center',
    type: 'video',
    note: 'Bab 13 - Vlog Pantai Prau Jepara.',
  },

  /* ------------------------------------------------------------------------
     BAB 14 — Tapi kalo ternyata jalan kita memang berbeda (dua foto favorit)
     ------------------------------------------------------------------------ */
  {
    id: 'foto-pap-favorit-1',
    src: '/photos/pap-favorit-1.jpg',
    caption:
      'Foto darimu yang selalu bikin seneng. Rasanya beruntung banget pernah memilikimu.',
    orientation: 'portrait',
    ratio: '9 / 16',
    position: 'center',
    note: 'Bab 14 - Foto favorit 1.',
  },
  {
    id: 'foto-pap-favorit-2',
    src: '/photos/pap-favorit-2.jpg',
    caption:
      'Kamu selalu secantik ini, mau pakai apa pun dan dalam kondisi apa pun.',
    orientation: 'portrait',
    ratio: '9 / 16',
    position: 'center',
    note: 'Bab 14 - Foto favorit 2.',
  },

  /* ------------------------------------------------------------------------
     BAB 15 — Terima kasih (video pagi, foto photobooth MEF & video snippet)
     ------------------------------------------------------------------------ */
  {
    id: 'video-pagi-favorit',
    src: '/photos/vlog-pagi-favorit.mp4',
    caption:
      'Vlog pagi hari favoritku. Senyuman dan suaramu di pagi hari yang selalu berhasil bikin aku ikutan semangat menjalani hari.',
    orientation: 'portrait',
    ratio: '5 / 9',
    position: 'center',
    type: 'video',
    note: 'Bab 15 - Vlog pagi hari favorit.',
  },
  {
    id: 'foto-photobooth-mef',
    src: '/photos/photobooth-mef.jpg',
    caption:
      'Photobooth pas MEF yang lucu banget. Walau sayangnya waktu itu kita nggak sempat fotbar di depan panggungnya, momen ini tetap manis banget buat diingat.',
    orientation: 'portrait',
    ratio: '2 / 3',
    position: 'center',
    note: 'Bab 15 - Foto photobooth MEF.',
  },
  {
    id: 'video-photobooth-mef',
    src: '/photos/video-photobooth-mef.mp4',
    caption:
      'Live snippet pas kita photobooth MEF. Sayang waktu itu kita nggak sempat fotbar di depan panggungnya, tapi momen ini tetap selalu bikin senyum.',
    orientation: 'landscape',
    ratio: '3 / 2',
    position: 'center',
    type: 'video',
    note: 'Bab 15 - Video snippet photobooth MEF.',
  },

  /* ------------------------------------------------------------------------
     BAB 16 — Satu foto kenangan perpisahan di bandara
     ------------------------------------------------------------------------ */
  {
    id: 'foto-bandara-banjarmasin',
    src: '/photos/selfie-bandara-banjarmasin.jpg',
    caption:
      'Selfie di bandara sebelum kamu pulang ke Banjarmasin. Suasana bandara dan detik2 sebelum boarding yang selalu berat, tapi tetap jadi momen yang aku syukuri.',
    orientation: 'landscape',
    ratio: '4 / 3',
    position: 'center',
    note: 'Bab 16 - Selfie di bandara sebelum pulang ke Banjarmasin.',
  },

  /* ------------------------------------------------------------------------
     BAB 19 — Album Penutup: Kumpulan Kenangan Kita
     ------------------------------------------------------------------------ */
  {
    id: 'foto-11',
    src: '/photos/man-awal-1.jpg',
    caption:
      'Awal kita di MAN. Salah satu bagian dari cerita kita yang waktu itu masih panjang banget dan belum tau bakal sampai mana.',
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
    caption: 'Classmeet MAN. Lucu banget kalo momen ini diingat2.',
    orientation: 'landscape',
    ratio: '3 / 2',
    position: 'center',
    note: 'Album penutup - Classmeet 1.',
  },
  {
    id: 'foto-14',
    src: '/photos/classmeet-man-2.jpg',
    caption:
      'Kalo bisa mengulang waktu, ini salah satu momen yang mungkin bakal tetap aku pilih buat diingat.',
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
      'Hari kelulusan MAN. Kita serasi banget hari itu. Lucu kalo diingat.',
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
      'Pertama kalinya aku foto bareng mamahmu dan mamahku. Salah satu titik penting sebelum kita bener2 masuk ke masa LDR yang jauh.',
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
      'Pertama kali main PS di Kudus. Ketawa lepas banget waktu itu. Sampai sekarang kalo lihat fotonya, aku masih bisa kebayang suasananya.',
    orientation: 'portrait',
    ratio: '9 / 16',
    position: 'center',
    note: 'Album penutup - Main PS di Kudus.',
  },
  {
    id: 'foto-27',
    src: '/photos/azko-kudus.jpg',
    caption:
      'AZKO Kudus. Waktu itu kita cuma gabut, jalan2 sambil ngomongin furniture yang mungkin suatu hari bakal kita butuhin.',
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
    caption: 'Sore2 muter2, beli jajan. Ternyata waktu sesederhana itu bisa jadi salah satu bagian yang paling aku rindukan.',
    orientation: 'portrait',
    note: 'Slot cadangan - Kelas 12.',
  },
  {
    id: 'foto-3',
    src: null,
    caption: 'Waktu kita kehujanan. Bajuku basah kuyup, malamnya aku malah demam. Tapi kalo sekarang diingat, aku tetap senyum.',
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
    caption: 'Jepara–Semarang, mampir Indomaret. Nggak ada tujuan besar. Tapi waktu itu rasanya udah seperti petualangan sendiri.',
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
