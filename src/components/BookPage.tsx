import { getPhotoById } from '../content/photos'
import type { PhotoEntry } from '../content/photos'
import PhotoPlaceholder from './PhotoPlaceholder'
import type { Chapter } from '../content/chapters'

/**
 * BookPage — merender SATU halaman buku sesuai `chapter.variant`.
 *
 * Semua variant sengaja berbagi struktur yang sama: ornamen → judul → subtitle
 * → body. Bedanya cuma di jarak, ukuran, dan apakah ada foto. Itu yang bikin
 * buku ini konsisten kalau nanti 18 bab ditambahkan.
 *
 * Ritme tipografi (PLAN 02):
 *   - judul   = Cormorant (display), subtitle = Lora italic, body = Lora
 *   - body serif line-height 1.9, jarak paragraf lega (space-y-6)
 *   - semua teks dibatasi `max-w-book` (38rem) dari wrapper luar
 *   - reveal: tiap blok cuma FADE (opacity) bergiliran 80ms — tanpa geser,
 *     karena halaman sudah masuk lewat transisi fade+slide dari BookShell.
 *     Dua gerakan sekaligus = pusing. Semua jeda mati di reduced-motion.
 *
 * DISTRIBUSI FOTO — sengaja tidak dikunci di chapters.ts:
 *   Peta `PHOTOS_BY_CHAPTER` di bawah memetakan id halaman ke DAFTAR id slot
 *   `photos.ts`. Nilainya array supaya satu halaman boleh punya banyak foto
 *   (grid scrapbook di Bab 11 & album penutup Bab 19). Keputusan foto sengaja
 *   di komponen, bukan di naskah — chapters.ts tetap murni teks. Halaman yang
 *   tidak ada di peta tampil tanpa foto, bukan foto yang dipaksakan.
 *
 * CATATAN overflow (penting untuk HP 360px):
 *   - tidak ada `w-screen` di sini — itu pemicu paling umum overflow-x
 *   - semua gambar dibungkus aspect-ratio + w-full, jadi tidak memaksa lebar
 *   - teks panjang/URL dijaga pakai `break-words`
 */
interface BookPageProps {
  chapter: Chapter
  /** 0-based, untuk key animasi & sudah dipages. */
  index: number
  /** Jumlah halaman, untuk folio "02". */
  total: number
  /** Dipanggil saat foto diklik untuk dibuka di lightbox. */
  onSelectPhoto?: (photo: PhotoEntry) => void
}

/**
 * Peta inline media: id halaman → { paragraphIndex → DAFTAR id slot }.
 *
 * Kunci angka = index paragraf (0-based) di `bodyPlaceholder`. Media yang
 * terdaftar di index itu ditampilkan SETELAH paragraf tersebut — pembaca
 * baca teks dulu, baru lihat foto/video yang relevan.
 *
 * Halaman yang tidak ada di peta ini (atau paragraf tanpa entri) merender
 * murni teks tanpa sisipan — tidak ada satu piksel pun yang berubah.
 *
 * Halaman scrapbook (Bab 11 & 19) tetap memakai grid, bukan inline, jadi
 * mereka punya peta sendiri di `SCRAPBOOK_PHOTOS` di bawah.
 *
 * ATURAN BARU: foto ditaruh tepat setelah kalimat yang dibahasnya, bukan
 * ditumpuk di atas semua teks. Misal foto DP Mall ditaruh setelah kalimat
 * "Jalan-jalan di mall." dan photo booth setelah "Photo booth."
 */
const INLINE_MEDIA_MAP: Record<string, Record<number, string[]>> = {
  /* Bab 02 — fotbar MTs + bukber MTs. Ditaruh di akhir bab (setelah paragraf
     terakhir index 9) supaya teks nostalgia dibaca dulu baru lihat foto. */
  'page-02': {
    9: ['foto-1', 'foto-18'],
  },
  /* Bab 03 — "Kalau aku mengingat kita"
     Index 13 = "Aku inget perjalanan Jepara-Semarang."
     Index 18 = "Jalan-jalan di mall."
     Index 19 = "Photo booth." */
  'page-03': {
    13: [
      'video-1',
      'video-jepara-pagi-bri',
      'foto-dimsum-jepara',
      'video-jepara-lamongan-malam',
    ],
    18: ['foto-dp-mall'],
    19: [
      'foto-19',
      'foto-24',
      'video-photobooth-jepara-1',
      'video-photobooth-jepara-2',
      'video-photobooth-jepara-live',
    ],
  },
  /* Bab 08 — foto nonton bioskop Sore. Di akhir bab (index 19). */
  'page-08': {
    19: ['foto-bioskop-sore'],
  },
  /* Bab 10 — tujuh tahun yang disyukuri. Di akhir (index 19). */
  'page-10': {
    19: ['foto-20', 'foto-pap-cantik-1', 'foto-pap-cantik-2'],
  },
  /* Bab 12 — "Tentang kamu". Di akhir (index 33). */
  'page-12': {
    33: [
      'foto-katsukai',
      'foto-butterhub',
      'video-momen-gemes',
      'foto-cafe-jepara-kota',
      'video-coffeeshop-jepara-1',
      'video-coffeeshop-jepara-2',
    ],
  },
  /* Bab 13 — "Kalo suatu hari..." Di akhir (index 25). */
  'page-13': {
    25: ['foto-25', 'video-pantai-prau'],
  },
  /* Bab 14 — jalan berbeda / jujur masih berharap. Di akhir (index 43). */
  'page-14': {
    43: ['foto-pap-favorit-1', 'foto-pap-favorit-2'],
  },
  /* Bab 15 — terima kasih. Di akhir (index 47). */
  'page-15': {
    47: [
      'video-pagi-favorit',
      'foto-photobooth-mef',
      'video-photobooth-mef',
    ],
  },
  /* Bab 16 — mengingat aku. Di akhir (index 29). */
  'page-16': {
    29: ['foto-bandara-banjarmasin'],
  },
}

/**
 * Peta foto untuk halaman scrapbook — grid 2-kolom, bukan inline.
 * Bab 11 & 19 tetap memakai model lama (array flat).
 */
const SCRAPBOOK_PHOTOS: Record<string, string[]> = {
  'page-11': [
    'foto-17',
    'foto-26',
    'video-nomi',
    'foto-nomi-boneka',
    'foto-photobooth-meja-belajar',
    'video-tiktok-cantik-1',
    'video-tiktok-cantik-2',
  ],
  'page-19': [
    'foto-11',
    'foto-12',
    'foto-13',
    'foto-14',
    'foto-15',
    'foto-21',
    'foto-22',
    'foto-23',
    'foto-16',
    'foto-27',
    'foto-28',
    'foto-29',
    'foto-30',
  ],
}

/**
 * Reveal berjenjang: blok pertama 0ms, sisanya +80ms, maksimum 320ms.
 */
const reveal = (step: number) => ({
  animationDelay: `${Math.min(step * 80, 320)}ms`,
})

/**
 * Reveal khusus item grid scrapbook.
 *
 * Item grid butuh jatah stagger sendiri: jumlahnya bisa 4-6, jadi pakai
 * `reveal()` biasa akan mentok di cap 320ms dan item terakhir kehilangan
 * giliran. Jendela 60ms per item, lebar 300ms.
 *
 * `startDelay` bisa digeser kalau ada blok yang mendahului grid (paragraf
 * pembuka album penutup, mulai 320ms). Default 240ms dipertahankan supaya
 * tampilan Bab 11 persis seperti sebelumnya.
 *
 * Inline `animationDelay` ini TIDAK perlu penanganan reduced-motion khusus:
 * blok `@media (prefers-reduced-motion: reduce)` di index.css menulis
 * `animation-delay: 0ms !important` untuk semua elemen, jadi stagger langsung
 * mati dan item muncul bersamaan.
 */
const revealGrid = (index: number, startDelay = 240) => ({
  animationDelay: `${Math.min(startDelay + index * 60, startDelay + 300)}ms`,
})

/**
 * Halaman yang paragraf pembukanya harus tampil SEBELUM grid foto.
 *
 * ScrapbookPage selalu me-render grid dulu, baru paragraf — itu sudah pas
 * untuk Bab 11. Album penutup (page-19) kebalikannya: paragraf keduanya
 * berbunyi "Setiap foto di bawah punya ceritanya sendiri", jadi teksnya
 * harus mendahului foto supaya kalimatnya benar di halaman.
 *
 * Disimpan di sini (bukan di chapters.ts) supaya naskah tetap murni teks,
 * sama seperti PHOTOS_BY_CHAPTER di atas.
 */
const INTRO_BEFORE_GRID = new Set(['page-19'])

/**
 * Miring selang-seling, rasa ditempel tangan.
 *
 * Urutan ini penting: kolom kiri (index genap) condong +0.8° dan kolom kanan
 * (index ganjil) condong -1.1°, jadi keduanya melebar KE LUAR grid — bukan
 * saling menyudut di tengah. Pertambahan lebarnya cuma ~2-4px pada foto
 * setinggi ~200px, masih jauh di dalam padding 20px; `main` di BookShell
 * tetap memakai overflow-x-clip sebagai jaring pengaman terakhir.
 */
const SCRAPBOOK_TILT = ['rotate-[0.8deg]', '-rotate-[1.1deg]']

/**
 * Tilt untuk tumpukan foto di halaman baca (`TextPage`).
 *
 * Halaman baca perlu tenang, jadi sudutnya lebih kecil dan arahnya dibalik dari
 * grid scrapbook: hanya ±0.6-0.7°. `origin-top-left` dipakai lagi supaya
 * pelebaran rotasi menghadap ke dalam halaman.
 */
const TEXT_STACK_TILT = ['-rotate-[0.7deg]', 'rotate-[0.6deg]']

/**
 * Render inline formatting sederhana: **tebal** jadi <strong> dan *miring* jadi <em>
 * sehingga tanda bintang markdown tidak ikut muncul mentah di layar pembaca.
 */
function renderInlineFormatted(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|\*[^*\n]+?\*)/g)
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={index} className="font-semibold text-charcoal">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return (
        <em key={index} className="italic text-charcoal-soft">
          {part.slice(1, -1)}
        </em>
      )
    }
    return part
  })
}

export default function BookPage({
  chapter,
  index,
  total,
  onSelectPhoto,
}: BookPageProps) {
  const paragraphs = chapter.bodyPlaceholder

  // Foto untuk halaman scrapbook (grid 2-kolom).
  const scrapbookPhotos = (SCRAPBOOK_PHOTOS[chapter.id] ?? [])
    .map((photoId) => getPhotoById(photoId))
    .filter((photo): photo is PhotoEntry => Boolean(photo))

  // Inline media map untuk halaman text — diresolved ke PhotoEntry.
  const rawInlineMap = INLINE_MEDIA_MAP[chapter.id]
  const inlineMediaMap: Record<number, PhotoEntry[]> = {}
  if (rawInlineMap) {
    for (const [idx, ids] of Object.entries(rawInlineMap)) {
      const resolved = ids
        .map((id) => getPhotoById(id))
        .filter((p): p is PhotoEntry => Boolean(p))
      if (resolved.length > 0) {
        inlineMediaMap[Number(idx)] = resolved
      }
    }
  }

  return (
    <article className="mx-auto w-full max-w-book px-5 pt-9 pb-6 sm:px-6 sm:pt-12">
      {chapter.variant === 'cover' && (
        <CoverPage
          chapter={chapter}
          paragraphs={paragraphs}
        />
      )}

      {chapter.variant === 'minimal' && (
        <MinimalPage chapter={chapter} paragraphs={paragraphs} />
      )}

      {chapter.variant === 'text' && (
        <TextPage
          chapter={chapter}
          paragraphs={paragraphs}
          inlineMedia={inlineMediaMap}
          onSelectPhoto={onSelectPhoto}
        />
      )}

      {chapter.variant === 'quote' && (
        <QuotePage chapter={chapter} paragraphs={paragraphs} />
      )}

      {chapter.variant === 'scrapbook' && (
        <ScrapbookPage
          chapter={chapter}
          paragraphs={paragraphs}
          photos={scrapbookPhotos}
          introFirst={INTRO_BEFORE_GRID.has(chapter.id)}
          onSelectPhoto={onSelectPhoto}
        />
      )}

      {/* Folio: nomor halaman gaya buku cetak. Totalnya sudah ada di nav. */}
      <div
        className="mt-14 mb-2 flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="h-px w-8 bg-line" />
        <span className="folio">{String(index + 1).padStart(2, '0')}</span>
        <span className="sr-only">
          Halaman {index + 1} dari {total}
        </span>
      </div>
    </article>
  )
}

/* -------------------------------------------------------------------------
   VARIANTS
   ------------------------------------------------------------------------- */

function CoverPage({
  chapter,
  paragraphs,
}: {
  chapter: Chapter
  paragraphs: string[]
}) {
  return (
    <div className="flex min-h-[calc(100dvh-15rem)] flex-col justify-center py-8">
      {/* Ornamen: dua hairline dengan titik clay — dekorasi satu-satunya. */}
      <div
        className="rule-ornament mb-9 animate-fade-in"
        aria-hidden="true"
        style={reveal(0)}
      >
        <span className="h-[3px] w-[3px] rounded-full bg-clay" />
      </div>

      <h1
        className="animate-fade-in text-wordmark text-charcoal uppercase"
        style={reveal(1)}
      >
        {chapter.title}
      </h1>

      {chapter.subtitle && (
        <p
          className="mt-6 max-w-[32ch] animate-fade-in font-body-serif text-subtitle italic text-charcoal-soft"
          style={reveal(2)}
        >
          {chapter.subtitle}
        </p>
      )}

      <div
        className="mt-9 max-w-[34ch] animate-fade-in space-y-5 font-body-serif text-[1rem] leading-[1.85] text-charcoal-soft"
        style={reveal(3)}
      >
        {paragraphs.map((text, i) => (
          <p key={i} className="break-words">
            {text}
          </p>
        ))}
      </div>
    </div>
  )
}

/**
 * Halaman baca — hairline, judul, subtitle, lalu paragraf dengan media inline.
 *
 * Media (foto/video) disisipkan DI ANTARA paragraf, tepat setelah kalimat
 * yang dibahasnya. Mapping disediakan oleh `INLINE_MEDIA_MAP`: kunci = index
 * paragraf, nilai = daftar foto yang ditampilkan SETELAH paragraf itu.
 *
 * Halaman tanpa entri di peta TIDAK berubah satu piksel pun — semua paragraf
 * dirender biasa tanpa sisipan, dengan langkah reveal yang sama persis.
 *
 * Bingkai memakai `PhotoPlaceholder` yang sama, tilt kecil lewat
 * `TEXT_STACK_TILT`, dan shadow menempel ke bingkai.
 */
function TextPage({
  chapter,
  paragraphs,
  inlineMedia,
  onSelectPhoto,
}: {
  chapter: Chapter
  paragraphs: string[]
  inlineMedia: Record<number, PhotoEntry[]>
  onSelectPhoto?: (photo: PhotoEntry) => void
}) {
  // Precompute running photo offset per paragraph so we can derive tilt index
  // without mutating state during render (avoids React Compiler warning).
  const photoOffsets: number[] = []
  let runningTotal = 0
  for (let i = 0; i < paragraphs.length; i++) {
    photoOffsets.push(runningTotal)
    const mediaAtI = inlineMedia[i]
    if (mediaAtI) {
      runningTotal += mediaAtI.length
    }
  }

  return (
    <div className="pt-3">
      {/* Hairline di atas judul — penanda awal bab, sangat tipis. */}
      <div
        aria-hidden="true"
        className="mb-6 h-px w-10 bg-line-strong animate-fade-in"
        style={reveal(0)}
      />

      <h2 className="animate-fade-in text-title" style={reveal(1)}>
        {chapter.title}
      </h2>

      {chapter.subtitle && (
        <p
          className="mt-4 max-w-[36ch] animate-fade-in font-body-serif text-[1rem] italic leading-[1.8] text-charcoal-soft"
          style={reveal(2)}
        >
          {chapter.subtitle}
        </p>
      )}

      {/* Paragraf + inline media: loop setiap paragraf, lalu cek apakah ada
          media yang harus disisipkan setelah paragraf itu. */}
      <div
        className="mt-9 animate-fade-in font-body-serif text-body-serif text-charcoal"
        style={reveal(3)}
      >
        {paragraphs.map((text, i) => {
          const mediaAfter = inlineMedia[i]
          const baseOffset = photoOffsets[i]
          return (
            <div key={i}>
              <p className={`break-words ${i > 0 ? 'mt-6' : ''}`}>
                {renderInlineFormatted(text)}
              </p>
              {mediaAfter && mediaAfter.length > 0 && (
                <div className="mt-8 mb-8 space-y-10">
                  {mediaAfter.map((photo, j) => {
                    const tiltIdx = baseOffset + j
                    return (
                      <div
                        key={photo.id}
                        className={`w-full max-w-[26rem] origin-top-left ${TEXT_STACK_TILT[tiltIdx % TEXT_STACK_TILT.length]} animate-fade-in`}
                        style={revealGrid(tiltIdx, 200)}
                      >
                        <PhotoPlaceholder
                          photo={photo}
                          onSelect={onSelectPhoto}
                          className="shadow-[0_12px_26px_-22px_rgba(43,43,43,0.65)]"
                        />
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function MinimalPage({
  chapter,
  paragraphs,
}: {
  chapter: Chapter
  paragraphs: string[]
}) {
  return (
    <div className="flex min-h-[calc(100dvh-15rem)] flex-col items-center justify-center py-14 text-center">
      <h2 className="animate-fade-in text-title" style={reveal(0)}>
        {chapter.title}
      </h2>

      {chapter.subtitle && (
        <p
          className="mt-5 max-w-[32ch] animate-fade-in font-body-serif text-[1rem] italic leading-[1.85] text-charcoal-soft"
          style={reveal(1)}
        >
          {chapter.subtitle}
        </p>
      )}

      <div
        aria-hidden="true"
        className="mt-10 mb-10 h-px w-12 bg-line-strong animate-fade-in"
        style={reveal(2)}
      />

      <div
        className="max-w-[34ch] animate-fade-in space-y-5 font-body-serif text-body-serif text-charcoal-soft"
        style={reveal(3)}
      >
        {paragraphs.map((text, i) => (
          <p key={i} className="break-words">
            {renderInlineFormatted(text)}
          </p>
        ))}
      </div>
    </div>
  )
}

function QuotePage({
  chapter,
  paragraphs,
}: {
  chapter: Chapter
  paragraphs: string[]
}) {
  // Elemen pertama = kutipan besarnya. Kalau kosong, kutipan dilewati saja
  // (tidak ada teks placeholder yang pernah ikut tampil).
  const mainQuote = paragraphs[0]

  return (
    <div className="flex min-h-[calc(100dvh-15rem)] flex-col justify-center py-12">
      <p
        className="animate-fade-in text-meta text-charcoal-faint uppercase"
        style={reveal(0)}
      >
        {chapter.title}
      </p>

      {/* Tanda kutip besar: ornamen DI ALUR teks (bukan absolute) supaya
          tidak pernah menimpa kalimat pertama di layar kecil. */}
      <span
        aria-hidden="true"
        className="mt-6 -mb-4 block font-display text-[3.5rem] leading-none text-clay/70 select-none"
      >
        &ldquo;
      </span>

      {mainQuote && (
        <blockquote
          className="animate-fade-in border-l border-clay pl-5 font-display text-quote italic text-charcoal"
          style={reveal(1)}
        >
          {mainQuote}
        </blockquote>
      )}

      {chapter.subtitle && (
        <p
          className="mt-6 pl-5 animate-fade-in font-body-serif text-[0.875rem] italic leading-[1.7] text-charcoal-faint"
          style={reveal(2)}
        >
          — {chapter.subtitle}
        </p>
      )}

      {/* Paragraf tambahan setelah kutipan (opsional). */}
      {paragraphs.length > 1 && (
        <div
          className="mt-9 animate-fade-in space-y-6 font-body-serif text-body-serif text-charcoal-soft"
          style={reveal(3)}
        >
          {paragraphs.slice(1).map((text, i) => (
            <p key={i} className="break-words">
              {renderInlineFormatted(text)}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

function ScrapbookPage({
  chapter,
  paragraphs,
  photos,
  introFirst = false,
  onSelectPhoto,
}: {
  chapter: Chapter
  paragraphs: string[]
  photos: PhotoEntry[]
  introFirst?: boolean
  onSelectPhoto?: (photo: PhotoEntry) => void
}) {
  const hasGrid = photos.length > 0

  /** Blok paragraf bab. Sama persis di kedua posisi; cuma beda langkah reveal. */
  const paragraphBlock = (step: number) => (
    <div
      className="mt-9 animate-fade-in space-y-6 font-body-serif text-body-serif text-charcoal"
      style={reveal(step)}
    >
      {paragraphs.map((text, i) => (
        <p key={i} className="break-words">
          {renderInlineFormatted(text)}
        </p>
      ))}
    </div>
  )

  return (
    <div className="pt-3">
      <div
        aria-hidden="true"
        className="mb-6 h-px w-10 bg-line-strong animate-fade-in"
        style={reveal(0)}
      />

      <h2 className="animate-fade-in text-title" style={reveal(1)}>
        {chapter.title}
      </h2>

      {chapter.subtitle && (
        <p
          className="mt-4 max-w-[36ch] animate-fade-in font-body-serif text-[1rem] italic leading-[1.8] text-charcoal-soft"
          style={reveal(2)}
        >
          {chapter.subtitle}
        </p>
      )}

      {/* Paragraf pembuka — hanya dirender di sini untuk halaman yang masuk
          INTRO_BEFORE_GRID. Halaman lain melewati blok ini, jadi tampilan
          Bab 11 tidak berubah sama sekali. */}
      {introFirst && paragraphBlock(3)}

      {/* GRID SCRAPBOOK — 2 kolom di HP.
          Lebar di 360px: (360 - 40 padding - 16 gap) / 2 = 152px per kolom,
          masih lega untuk foto rasio 1:1 / 4:3 dan caption 13px di bawahnya.
          `items-start` supaya tiap sel rata atas dan caption tidak ikut
          tersebar mengikuti foto paling tinggi — biar ritme albumnya organik. */}
      {hasGrid && (
        <div className="mt-9 grid grid-cols-2 items-start gap-x-4 gap-y-8">
          {photos.map((photo, i) => (
            <div
              key={photo.id}
              className={`animate-fade-in origin-top-left ${SCRAPBOOK_TILT[i % SCRAPBOOK_TILT.length]}`}
              style={revealGrid(i, introFirst ? 320 : 240)}
            >
              {/* Bayangan ikut ke bingkai (PhotoPlaceholder meneruskan className
                  ke frame-nya), jadi tiap foto "terangkat" dari kertas. */}
              <PhotoPlaceholder
                photo={photo}
                onSelect={onSelectPhoto}
                className="shadow-[0_14px_30px_-22px_rgba(43,43,43,0.7)]"
              />
            </div>
          ))}
        </div>
      )}

      {/* Paragraf penutup — dilewati kalau sudah dirender di atas grid. */}
      {!introFirst && paragraphBlock(hasGrid ? 4 : 3)}
    </div>
  )
}
