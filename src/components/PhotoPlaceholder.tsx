import { useState } from 'react'
import { orientationRatio } from '../content/photos'
import type { PhotoEntry } from '../content/photos'

/**
 * PhotoPlaceholder — bingkai foto yang aman (tidak pernah broken image).
 *
 * Aturan main:
 *   - `src` masih `null` (default di photos.ts) → bingkai kosong yang estetis
 *   - `src` diisi DAN file-nya ada → tampil `<img>` asli, fade-in 0.42s
 *   - `src` diisi tapi file-nya typo/hilang → `onError` jatuh kembali ke
 *     bingkai kosong. Jadi user tidak pernah lihat ikon rusak.
 *
 * Bingkai kosong (PLAN 02) dibuat seperti slot di album fisik, bukan error box:
 *   - kertas `ivory-deep` + grain halus + sapuan radial hangat (ada isinya,
 *     bukan kotak kosong menganga)
 *   - hairline dalam + empat photo corner + satu titik clay di tengah
 *   - TANPA teks "belum ada foto" dan TANPA nama file — pembaca tidak perlu tahu
 *
 * Struktur: <figure> TANPA aspect-ratio, bingkai di dalam <div>. Dulu caption
 * ikut di dalam kotak ber-aspect-ratio + overflow-hidden → caption kepotong.
 *
 * `className` diteruskan ke bingkai (untuk rotasi/shadow dari BookPage),
 * bukan ke <figure> — supaya bayangan ikut berputar bareng fotonya.
 *
 * RASIO & POSISI (opsional, per slot di photos.ts):
 *   - `aspect-ratio` bingkai = prop `ratio` → `photo.ratio` → `orientationRatio`.
 *     Kalau sebuah foto punya rasionya sendiri (mis. 9 / 16), isi `photo.ratio`
 *     supaya bingkai ikut dan `object-cover` tidak memotong apa pun.
 *   - `object-position` foto = `photo.position`, default `center` ( sama dengan
 *     bawaan CSS, jadi kosong berarti tidak ada perubahan).
 */
interface PhotoPlaceholderProps {
  photo: PhotoEntry
  className?: string
  /** Rasio bingkai, kalau mau memaksa (mis. thumbnail kecil di cover). */
  ratio?: string
  /** Dipanggil saat foto diklik untuk diperbesar. */
  onSelect?: (photo: PhotoEntry) => void
}

export default function PhotoPlaceholder({
  photo,
  className = '',
  ratio,
  onSelect,
}: PhotoPlaceholderProps) {
  // Dua state kecil: gagal load, dan selesai load (buat fade-in).
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const showImage = Boolean(photo.src) && !failed

  // Rasio bingkai, dari yang paling spesifik:
  //   1. prop `ratio`    → perintah eksplisit dari pemanggil (mis. cover)
  //   2. `photo.ratio`   → koreksi per slot di photos.ts (anti-crop)
  //   3. `orientation`   → default portofolio lama (3/4, 4/3, 1/1)
  // 1 & 2 & 3 semuanya jatuh ke nilai yang sama untuk foto yang tidak
  // mengisi `ratio`, jadi perilaku defaultnya tidak berubah sama sekali.
  const aspectRatio = ratio ?? photo.ratio ?? orientationRatio[photo.orientation]

  // `object-position` default CSS juga `center`, jadi menulis 'center' secara
  // eksplisit tidak mengubah tampilan apa pun — hanya membuat override
  // per slot bisa dipakai tanpa kompromi.
  const objectPosition = photo.position ?? 'center'

  return (
    <figure className="w-full">
      <div
        className={`relative w-full overflow-hidden border border-line bg-ivory-deep ${
          showImage && onSelect ? 'cursor-zoom-in group/frame' : ''
        } ${className}`}
        style={{ aspectRatio }}
        onClick={() => {
          if (showImage && onSelect) onSelect(photo)
        }}
        onKeyDown={(e) => {
          if (showImage && onSelect && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            onSelect(photo)
          }
        }}
        role={showImage && onSelect ? 'button' : undefined}
        tabIndex={showImage && onSelect ? 0 : undefined}
        aria-label={showImage && onSelect ? `Perbesar foto: ${photo.caption ?? photo.note}` : undefined}
      >
        {showImage ? (
          <img
            src={photo.src as string}
            alt={photo.caption ?? photo.note ?? 'Foto di buku Pelan-Pelan'}
            loading="lazy"
            decoding="async"
            // Fade-in setelah gambar benar-benar siap: tidak ada kilatan
            // kotak kosong dulu baru foto. Kalau gagal, onError yang ambil alih.
            className={`h-full w-full object-cover transition duration-[420ms] ease-page group-hover/frame:scale-[1.02] ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
            // Titik fokus per slot; default 'center' = perilaku bawaan CSS.
            style={{ objectPosition }}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        ) : (
          <EmptyFrame />
        )}
      </div>

      {photo.caption && (
        <figcaption className="mt-3 flex items-start gap-2 font-body-serif text-[0.8125rem] italic leading-[1.7] text-charcoal-soft">
          <span
            aria-hidden="true"
            className="mt-[0.7em] h-px w-4 shrink-0 bg-clay"
          />
          <span className="min-w-0 break-words">{photo.caption}</span>
        </figcaption>
      )}
    </figure>
  )
}

/**
 * Isi bingkai kosong: kertas hangat + empat sudut foto + titik clay.
 * Tanpa ikon "gambar rusak" dan tanpa nama file — pembaca tidak perlu tahu.
 */
function EmptyFrame() {
  return (
    <div aria-hidden="true" className="grain absolute inset-0">
      {/* Sapuan hangat dari atas — bikin kotak terasa "punya isi", bukan void. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(196,164,132,0.18),rgba(196,164,132,0)_70%)]" />

      {/* Empat sudut foto (photo corner). */}
      <span className="absolute top-3 left-3 h-4 w-4 border-t border-l border-line-strong" />
      <span className="absolute top-3 right-3 h-4 w-4 border-t border-r border-line-strong" />
      <span className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-line-strong" />
      <span className="absolute right-3 bottom-3 h-4 w-4 border-r border-b border-line-strong" />

      {/* Titik clay di tengah — penanda halus, bukan ilustrasi. */}
      <span className="absolute top-1/2 left-1/2 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-clay" />
    </div>
  )
}
