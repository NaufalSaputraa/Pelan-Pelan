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
 * Peta foto per halaman: id halaman → DAFTAR id slot di `photos.ts`.
 *
 * Sengaja berupa array, bukan satu string, karena dua halaman sekarang
 * memakai grid multi-foto (Bab 11 dan album penutup Bab 19). Interface
 * terkecil yang bisa dipakai ulang: satu halaman boleh punya 0..n foto,
 * dan halaman lain tetap cukup menulis satu elemen.
 *
 * Keduanya melewati `ScrapbookPage` yang sama — grid, tilt selang-seling,
 * caption per foto, dan reveal berjenjang tidak perlu ditulis ulang.
 *
 * SATU SLOT = SATU BAB. Album penutup (Bab 19) sudah 13/13 foto asli:
 * `foto-11`..`foto-15` (awal di MAN + classmeet), `foto-21`..`foto-23` (set
 * kelulusan MAN), `foto-16` (main PS di Kudus), `foto-27` (Azko Kudus), lalu
 * trio `foto-28`..`foto-30` (photobooth LDR pertama) di akhir. Tidak ada
 * bingkai kosong di album lagi.
 * Halaman variant 'text' yang punya foto — `page-02` (dua foto: `foto-1`
 * fotbar MTs + `foto-18` bukber MTs), `page-03` (dua foto: `foto-19` photo
 * booth Kota Lama + `foto-24` photo booth Jepara), `page-10` (`foto-20` hari
 * terakhir MAN), dan `page-13` (`foto-25` sunset favorit) — semuanya melewati
 * array yang sama di `TextPage`, jadi tidak perlu komponen baru: foto
 * ditumpuk vertikal, bukan grid dua kolom.
 * `foto-17` tetap milik grid Bab 11 — grid itu 2 item saja (`foto-17`
 * photocard + `foto-26` Gramedia Semarang), jadi tiga bingkai kosong yang
 * pernah ada di sana (`foto-5`, `foto-10`, `foto-7`) sengaja dikeluarkan dari
 * peta. Definisinya di photos.ts sengaja DIBIARKAN supaya slot itu bisa
 * dipakai lagi nanti tanpa bikin ulang.
 * `foto-2`..`foto-10` selain `foto-17` seluruhnya belum dipetakan (termasuk
 * `foto-6` photo booth), jadi tidak ada slot foto yang tampil di dua bab.
 *
 * Hapus entri di sini begitu keputusan foto pindah ke chapters.ts.
 */
const PHOTOS_BY_CHAPTER: Record<string, string[]> = {
  'page-02': ['foto-1', 'foto-18'],
  'page-03': ['foto-19', 'foto-24', 'video-1'],
  'page-10': ['foto-20'],
  'page-11': ['foto-17', 'foto-26'],
  'page-12': ['foto-katsukai'],
  'page-13': ['foto-25'],
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

  // Semua slot yang terdaftar untuk halaman ini. Id yang tidak ditemukan di
  // photos.ts dilewat senyap — halaman tetap valid tanpa foto itu.
  const photos = (PHOTOS_BY_CHAPTER[chapter.id] ?? [])
    .map((photoId) => getPhotoById(photoId))
    .filter((photo): photo is PhotoEntry => Boolean(photo))

  return (
    <article className="mx-auto w-full max-w-book px-5 pt-9 pb-6 sm:px-6 sm:pt-12">
      {chapter.variant === 'cover' && (
        <CoverPage
          chapter={chapter}
          paragraphs={paragraphs}
          photo={photos[0]}
          onSelectPhoto={onSelectPhoto}
        />
      )}

      {chapter.variant === 'minimal' && (
        <MinimalPage chapter={chapter} paragraphs={paragraphs} />
      )}

      {chapter.variant === 'text' && (
        <TextPage
          chapter={chapter}
          paragraphs={paragraphs}
          photos={photos}
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
          photos={photos}
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
  photo,
  onSelectPhoto,
}: {
  chapter: Chapter
  paragraphs: string[]
  photo?: ReturnType<typeof getPhotoById>
  onSelectPhoto?: (photo: PhotoEntry) => void
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

      {/* Foto kecil opsional — otomatis jadi placeholder kalau file belum ada. */}
      {photo && (
        <div className="mt-10 max-w-[15rem] animate-fade-in" style={reveal(3)}>
          <PhotoPlaceholder photo={photo} ratio="4 / 3" onSelect={onSelectPhoto} />
        </div>
      )}

      <div
        className="mt-9 max-w-[34ch] animate-fade-in space-y-5 font-body-serif text-[1rem] leading-[1.85] text-charcoal-soft"
        style={reveal(4)}
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
 * Halaman baca — hairline, judul, subtitle, foto sisipan, teks.
 *
 * Foto (0..n slot dari `photos.ts`) diletakkan DI ANTARA subtitle dan paragraf
 * pertama: pembaca sudah punya konteks dari judul + subtitle, lalu ketemu
 * gambarnya, baru masuk ke paragraf yang panjang. Foto ada dijilid di
 * antara keduanya.
 *
 * Kalau halamannya tidak punya foto, blok foto tidak dirender sama sekali,
 * jadi bab text tanpa foto TIDAK berubah satu piksel pun — termasuk langkah
 * reveal blok paragraf, yang tetap `reveal(3)` seperti semula.
 *
 * Bingkai memakai `PhotoPlaceholder` yang sama dengan CoverPage/ScrapbookPage,
 * jadi caption per foto, rasio, grain, dan fallback ke bingkai kosong
 * otomatis sama. Tumpukannya vertikal dengan `space-y-10` (jarak lega),
 * tiap sel memakai `w-full` + `max-w-[26rem]` supaya di 360px (320px setelah
 * padding) tidak memaksa lebar; pelebaran akibat rotasi kecil (~2px per sisi)
 * masih jauh di dalam padding halaman. Tilt selang-seling kecil lewat
 * `TEXT_STACK_TILT` (±0.6-0.7°, arah dibalik dari grid scrapbook).
 *
 * Ritme teks TIDAK berubah: `mt-9` + `space-y-6` antar paragraf tetap sama.
 */
function TextPage({
  chapter,
  paragraphs,
  photos,
  onSelectPhoto,
}: {
  chapter: Chapter
  paragraphs: string[]
  photos: PhotoEntry[]
  onSelectPhoto?: (photo: PhotoEntry) => void
}) {
  const hasPhotos = photos.length > 0

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

      {/* Tumpukan foto sisipan — hanya kalau halaman ini punya slot di peta.
          Bab 02 (foto-1, foto-18) yang memakainya; bab text lain kosong dan
          melewati blok ini. Bayangan menempel ke bingkai (PhotoPlaceholder
          meneruskan className ke frame-nya) dan ikut miring bareng foto. */}
      {hasPhotos && (
        <div className="mt-9 space-y-10">
          {photos.map((photo, i) => (
            <div
              key={photo.id}
              className={`w-full max-w-[26rem] origin-top-left ${TEXT_STACK_TILT[i % TEXT_STACK_TILT.length]} animate-fade-in`}
              style={revealGrid(i, 200)}
            >
              <PhotoPlaceholder
                photo={photo}
                onSelect={onSelectPhoto}
                className="shadow-[0_12px_26px_-22px_rgba(43,43,43,0.65)]"
              />
            </div>
          ))}
        </div>
      )}

      {/* Jarak panjang dari judul ke paragraf pertama: ritme halaman baca.
          `mt-9` + `space-y-6` tidak disentuh — blok foto hanya menyisip di
          atasnya. Langkah reveal dihitung: `reveal(3)` kalau halaman tanpa
          foto (persis seperti semula), `reveal(4)` kalau ada foto, supaya
          blok terakhir tetap bergiliran setelah hairline/judul/subtitle. */}
      <div
        className="mt-9 animate-fade-in space-y-6 font-body-serif text-body-serif text-charcoal"
        style={reveal(hasPhotos ? 4 : 3)}
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
