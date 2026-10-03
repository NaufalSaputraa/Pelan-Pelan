import { useEffect } from 'react'
import type { PhotoEntry } from '../content/photos'

interface PhotoLightboxProps {
  photo: PhotoEntry | null
  onClose: () => void
}

/**
 * PhotoLightbox — tampilan foto layar penuh yang intim dan jernih.
 *
 * Memberikan kesempatan kepada pembaca untuk melihat foto-foto kenangan
 * 7 tahun secara utuh tanpa terpotong bingkai grid.
 */
export default function PhotoLightbox({ photo, onClose }: PhotoLightboxProps) {
  useEffect(() => {
    if (!photo) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [photo, onClose])

  if (!photo || !photo.src) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tampilan foto layar penuh"
      className="fixed inset-0 z-50 flex flex-col justify-between items-center bg-charcoal/92 backdrop-blur-sm p-4 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      {/* Baris Atas: Tombol Tutup */}
      <div
        className="w-full max-w-4xl flex items-center justify-between text-ivory/80 pt-1 pb-2"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-display text-xs tracking-widest uppercase text-ivory/60">
          Foto Kenangan
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup tampilan foto"
          className="rounded-full p-2 text-ivory/80 hover:text-ivory hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-ivory/50"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Tengah: Foto Resolusi Penuh */}
      <div
        className="flex-1 flex items-center justify-center w-full max-w-4xl p-2 min-h-0"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={photo.caption ?? photo.note}
          className="max-h-[72vh] max-w-full object-contain rounded-sm shadow-2xl select-none"
        />
      </div>

      {/* Baris Bawah: Caption Foto */}
      {photo.caption && (
        <div
          className="w-full max-w-xl pb-2 px-2 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="font-body-serif text-sm sm:text-base italic leading-relaxed text-ivory/95 bg-charcoal/60 px-5 py-3 rounded-xl border border-white/10 backdrop-blur-xs">
            {photo.caption}
          </p>
        </div>
      )}
    </div>
  )
}
