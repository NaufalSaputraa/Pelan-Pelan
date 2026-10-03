import { useEffect, useState } from 'react'
import BookPage from './BookPage'
import Navigation from './Navigation'
import PhotoLightbox from './PhotoLightbox'
import TableOfContents from './TableOfContents'
import { chapters } from '../content/chapters'
import type { PhotoEntry } from '../content/photos'
import { pad2, useBookNavigation } from '../hooks/useBookNavigation'
import { STORAGE_KEYS, useLocalStorage } from '../hooks/useLocalStorage'

interface BookShellProps {
  /**
   * Index halaman tempat buku dibuka (0-based). Dipakai `App` untuk membuka
   * langsung di halaman terakhir yang tersimpan. Default 0 = halaman pertama.
   * Nilai ini hanya dibaca saat mount — `useBookNavigation` memakai
   * `useState` lazy initializer, jadi berganti halaman tetap wajar.
   */
  initialIndex?: number
  /** Dipanggil saat pengguna menekan tombol Back sampai kembali ke sampul. */
  onExitToCover?: () => void
}

export default function BookShell({
  initialIndex = 0,
  onExitToCover,
}: BookShellProps) {
  const nav = useBookNavigation(chapters.length, initialIndex)
  const { write: writeLastPage } = useLocalStorage<number>(STORAGE_KEYS.lastPage, 0)

  // State untuk modal Daftar Isi dan Photo Lightbox
  const [isTocOpen, setIsTocOpen] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoEntry | null>(null)

  // Setiap ganti halaman, balik ke atas. Pakai `auto` (bukan `smooth`) supaya
  // tidak menggeser halaman di bawah jempol user.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [nav.index])

  // Ingat halaman terakhir di localStorage.
  useEffect(() => {
    writeLastPage(nav.index)
  }, [nav.index, writeLastPage])

  // Sinkronkan halaman ke URL hash (#01, #02, dst.) agar tombol Back di browser/HP
  // berfungsi mundur per halaman secara alami tanpa keluar dari website.
  useEffect(() => {
    const targetHash = `#${pad2(nav.currentNumber)}`
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash)
    }
  }, [nav.currentNumber])

  // Tangani event navigasi history (tombol Back / gesture swipe-back HP).
  useEffect(() => {
    const onPopState = () => {
      const hash = window.location.hash
      if (!hash || hash === '#') {
        onExitToCover?.()
        return
      }
      const pageNum = parseInt(hash.replace(/[^0-9]/g, ''), 10)
      if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= chapters.length) {
        nav.goTo(pageNum - 1)
      }
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [nav, onExitToCover])

  const chapter = chapters[nav.index]

  return (
    <div
      className="grain flex min-h-[100dvh] flex-col bg-ivory"
      {...nav.touchHandlers}
    >
      {/* Skip link — tetap berguna walau book-nya cuma 3 halaman. */}
      <a
        href="#halaman"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:border focus:border-muted focus:bg-ivory focus:px-4 focus:py-2 focus:text-sm"
      >
        Lewati ke halaman
      </a>

      {/* Running head: nama buku diapit dua hairline — gaya kepala halaman
          buku cetak. Halaman 1 = sampul di dalam buku, jadi cuma garis penuh. */}
      <div
        aria-hidden="true"
        className="mx-auto w-full max-w-book px-5 pt-5 sm:px-6"
      >
        {nav.index === 0 ? (
          <div className="h-px w-full bg-line" />
        ) : (
          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-line" />
            <p className="text-center text-[0.625rem] tracking-[0.4em] text-charcoal-faint uppercase">
              Pelan-Pelan
            </p>
            <span className="h-px flex-1 bg-line" />
          </div>
        )}
      </div>

      <main
        id="halaman"
        className="flex-1 overflow-x-clip"
        // Key = id halaman → remount → animasi CSS jalan ulang tiap pindah.
        // `direction` menentukan dari kiri atau kanan halaman masuk.
        key={`${chapter.id}-${nav.direction}`}
        aria-live="polite"
        aria-atomic="false"
        aria-label={`Halaman ${nav.currentNumber} dari ${nav.count}: ${chapter.title}`}
      >
        <div
          className={
            nav.direction === 1 ? 'animate-page-in-next' : 'animate-page-in-prev'
          }
        >
          <BookPage
            chapter={chapter}
            index={nav.index}
            total={nav.count}
            onSelectPhoto={setSelectedPhoto}
          />
        </div>
      </main>

      <Navigation
        currentNumber={nav.currentNumber}
        total={nav.count}
        progress={nav.progress}
        hasPrev={nav.hasPrev}
        hasNext={nav.hasNext}
        onPrev={nav.goPrev}
        onNext={nav.goNext}
        onOpenToc={() => setIsTocOpen(true)}
      />

      {/* Lembar Daftar Isi (Table of Contents Drawer) */}
      <TableOfContents
        isOpen={isTocOpen}
        onClose={() => setIsTocOpen(false)}
        currentIndex={nav.index}
        onSelectChapter={(targetIndex) => nav.goTo(targetIndex)}
      />

      {/* Lightbox Foto Layar Penuh */}
      <PhotoLightbox
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  )
}
