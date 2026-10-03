import { useState } from 'react'
import BookShell from './components/BookShell'
import Cover from './components/Cover'
import MusicToggle from './components/MusicToggle'
import ReadingModeToggle from './components/ReadingModeToggle'
import { chapters } from './content/chapters'
import { pad2 } from './hooks/useBookNavigation'
import { STORAGE_KEYS, useLocalStorage } from './hooks/useLocalStorage'

/**
 * App — dua layar saja: Cover, lalu BookShell. Tidak ada router; buku ini
 * cukup satu halaman, jadi react-router hanya menambah dependensi.
 */

/** Ubah nilai dari storage jadi index halaman yang aman (0..maxIndex). */
function sanitizeIndex(value: unknown, maxIndex: number): number {
  const numeric = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(numeric)) return 0
  return Math.min(Math.max(Math.trunc(numeric), 0), maxIndex)
}

/** Baca hash URL (#01, #02) saat pertama kali buka untuk direct linking. */
function getInitialHashPage(): number | null {
  if (typeof window === 'undefined') return null
  const hash = window.location.hash
  if (hash && hash !== '#') {
    const pageNum = parseInt(hash.replace(/[^0-9]/g, ''), 10)
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= chapters.length) {
      return pageNum - 1
    }
  }
  return null
}

export default function App() {
  const [initialHash] = useState(getInitialHashPage)
  const [opened, setOpened] = useState(() => initialHash !== null)
  /** null = belum ada pilihan; dipakai sebagai initialIndex BookShell. */
  const [startIndex, setStartIndex] = useState<number | null>(() => initialHash)

  useEffect(() => {
    const handleHashChange = () => {
      const page = getInitialHashPage()
      if (page !== null) {
        setStartIndex(page)
        setOpened(true)
      } else if (!window.location.hash || window.location.hash === '#') {
        setOpened(false)
      }
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const { storedValue, isHydrated } = useLocalStorage<number>(
    STORAGE_KEYS.lastPage,
    0,
  )

  const lastIndex = chapters.length - 1
  const resumeIndex = isHydrated ? sanitizeIndex(storedValue, lastIndex) : 0
  const hasResume = isHydrated && resumeIndex > 0

  const openAt = (index: number) => {
    const safeIdx = sanitizeIndex(index, lastIndex)
    setStartIndex(safeIdx)
    setOpened(true)
    const targetHash = `#${pad2(safeIdx + 1)}`
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash)
    }
  }

  const handleExitToCover = () => {
    setOpened(false)
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }

  return (
    // overflow-x-hidden di sini juga, biar aman walau CSS global berubah.
    <div className="min-h-[100dvh] overflow-x-hidden bg-ivory">
      {/* Top scrim: gradasi halus transparan di atas agar teks yang di-scroll
          tidak bertabrakan dengan tombol pojok yang fixed. */}
      <div className="top-scrim" aria-hidden="true" />

      {/* Kontrol pojok melayang di atas kedua layar — musik dan mode baca
          berlaku untuk sampul juga, bukan hanya setelah buku dibuka. */}
      <ReadingModeToggle />
      <MusicToggle />

      {opened ? (
        <BookShell
          initialIndex={startIndex ?? 0}
          onExitToCover={handleExitToCover}
        />
      ) : (
        <Cover
          onOpen={() => openAt(0)}
          footerNote={`${chapters.length} halaman · Pelan-Pelan`}
          resume={
            hasResume
              ? {
                  pageNumber: resumeIndex + 1,
                  onResume: () => openAt(resumeIndex),
                  onStartOver: () => openAt(0),
                }
              : undefined
          }
        />
      )}
    </div>
  )
}