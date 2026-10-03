import { useEffect, useRef } from 'react'
import { chapters } from '../content/chapters'
import { pad2 } from '../hooks/useBookNavigation'

interface TableOfContentsProps {
  isOpen: boolean
  onClose: () => void
  currentIndex: number
  onSelectChapter: (index: number) => void
}

/**
 * TableOfContents — lembar daftar isi minimalis.
 *
 * Membantu pembaca melihat gambaran 19 halaman (18 bab + 1 album kenangan)
 * dan melompat langsung ke halaman yang diinginkan tanpa harus menekan
 * tombol "Berikutnya" berkali-kali.
 */
export default function TableOfContents({
  isOpen,
  onClose,
  currentIndex,
  onSelectChapter,
}: TableOfContentsProps) {
  const activeItemRef = useRef<HTMLButtonElement>(null)

  // Kunci scroll halaman belakang saat modal terbuka
  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Scroll ke bab aktif saat pertama terbuka
    const timer = setTimeout(() => {
      activeItemRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }, 120)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      clearTimeout(timer)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Daftar Isi Buku"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
    >
      {/* Backdrop redup hangat */}
      <div
        className="fixed inset-0 bg-charcoal/40 backdrop-blur-[2px] transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Kontainer Lembar Daftar Isi */}
      <div className="relative flex flex-col w-full max-w-lg max-h-[85vh] sm:max-h-[80vh] bg-ivory rounded-t-2xl sm:rounded-2xl border border-line shadow-2xl z-10 overflow-hidden animate-fade-rise">
        {/* Handle tarik untuk layar sentuh ponsel */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center" aria-hidden="true">
          <span className="h-1 w-10 rounded-full bg-line-strong" />
        </div>

        {/* Header Lembar */}
        <div className="flex items-center justify-between px-6 pt-3 pb-4 border-b border-line">
          <div>
            <h2 className="font-display text-xl text-charcoal tracking-wide">
              Daftar Isi
            </h2>
            <p className="font-body-serif text-xs italic text-charcoal-faint">
              18 bab & 1 album kenangan
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup daftar isi"
            className="btn-nav h-8 w-8 min-h-0 min-w-0 rounded-full border border-line bg-transparent text-charcoal-soft hover:bg-ivory-warm hover:text-charcoal"
          >
            ✕
          </button>
        </div>

        {/* Daftar 19 Halaman */}
        <div className="flex-1 overflow-y-auto px-4 py-3 sm:px-6 divide-y divide-line/40">
          {chapters.map((chapter, index) => {
            const isActive = index === currentIndex
            const isAlbum = chapter.id === 'page-19'
            const isClosing = chapter.id === 'page-18'

            return (
              <button
                key={chapter.id}
                ref={isActive ? activeItemRef : null}
                type="button"
                onClick={() => {
                  onSelectChapter(index)
                  onClose()
                }}
                className={`group w-full py-3 px-3 text-left flex items-start gap-4 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-ivory-warm/80 font-medium'
                    : 'hover:bg-ivory-warm/40'
                }`}
              >
                {/* Nomor Bab */}
                <span
                  className={`font-display text-sm tabular-nums tracking-normal pt-0.5 ${
                    isActive ? 'text-clay font-bold' : 'text-charcoal-faint'
                  }`}
                >
                  {pad2(index + 1)}
                </span>

                {/* Judul & Keterangan */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p
                      className={`font-body-serif text-sm leading-snug line-clamp-1 ${
                        isActive ? 'text-charcoal font-semibold' : 'text-charcoal-soft group-hover:text-charcoal'
                      }`}
                    >
                      {chapter.title}
                    </p>
                    {isAlbum && (
                      <span className="shrink-0 text-[0.6875rem] font-sans px-1.5 py-0.5 rounded border border-clay/40 bg-clay/10 text-clay">
                        13 Foto
                      </span>
                    )}
                    {isClosing && (
                      <span className="shrink-0 text-[0.6875rem] font-sans px-1.5 py-0.5 rounded border border-line-strong text-charcoal-faint">
                        Penutup
                      </span>
                    )}
                  </div>
                  {chapter.subtitle && (
                    <p className="mt-0.5 font-body-serif text-xs italic text-charcoal-faint line-clamp-1">
                      {chapter.subtitle}
                    </p>
                  )}
                </div>

                {/* Indikator bab sekarang */}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="self-center h-2 w-2 rounded-full bg-clay shrink-0"
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
