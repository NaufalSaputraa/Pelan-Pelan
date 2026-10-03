import { useCallback, useEffect, useRef, useState } from 'react'
import type { TouchEvent } from 'react'

/**
 * useBookNavigation — prev/next, index halaman, keyboard, dan swipe dasar.
 *
 * Semua state + handler untuk pindah halaman dikumpulkan di satu hook supaya
 * `BookShell` tetap ramping dan logika navigasi gampang dites.
 *
 * PREFERS-REDUCED-MOTION: animasi transisinya TIDAK diatur di sini. CSS yang
 * override-nya lewat `@media (prefers-reduced-motion: reduce)` di index.css.
 *
 * `initialIndex` dipakai `App` untuk membuka buku langsung di halaman terakhir
 * yang tersimpan. Nilainya hanya dibaca sekali saat mount (lazy `useState`).
 *
 * SKEL UNTUK NANTI:
 *   - swipe dengan velocity (jadi lebih responsif di layar kecil)
 *   - scroll-snap antar halaman
 *   - tombol back Android menutup halaman sebelum keluar dari buku
 *   - bookmark / navigasi lewat daftar bab
 */

export interface BookNavigation {
  /** Index halaman sekarang, 0-based. */
  index: number
  /** Jumlah halaman total. */
  count: number
  /** Nomor halaman 1-based. */
  currentNumber: number
  /** 1..100, untuk progress bar. */
  progress: number
  hasPrev: boolean
  hasNext: boolean
  goNext: () => void
  goPrev: () => void
  goTo: (nextIndex: number) => void
  /** Arah transisi terakhir: 1 = maju, -1 = mundur. Dipakai BookShell. */
  direction: 1 | -1
  /** Spread ke elemen halaman supaya swipe jalan. */
  touchHandlers: {
    onTouchStart: (event: TouchEvent) => void
    onTouchEnd: (event: TouchEvent) => void
  }
}

/** Jarak minimal finger travel untuk dianggap swipe, dalam px. */
const SWIPE_THRESHOLD = 48

export function useBookNavigation(count: number, initialIndex = 0): BookNavigation {
  const safeCount = Math.max(count, 1)
  const [index, setIndex] = useState(() => clamp(initialIndex, 0, safeCount - 1))
  const [direction, setDirection] = useState<1 | -1>(1)

  // --- API publik -----------------------------------------------------------

  const goTo = useCallback(
    (nextIndex: number) => {
      setIndex((current) => {
        const target = clamp(nextIndex, 0, safeCount - 1)
        if (target === current) return current
        setDirection(target > current ? 1 : -1)
        return target
      })
    },
    [safeCount],
  )

  const goNext = useCallback(() => goTo(index + 1), [goTo, index])
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index])

  // --- Keyboard: ← → , PageUp/PageDown, Home/End ---------------------------

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // Jangan rebut event kalau pengguna sedang mengetik di input/textarea.
      const target = event.target as HTMLElement | null
      if (
        target &&
        (target.isContentEditable ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA')
      ) {
        return
      }

      // Jangan ganti halaman di belakang layar jika modal (Daftar Isi atau Lightbox) sedang terbuka.
      if (typeof document !== 'undefined' && document.querySelector('[role="dialog"][aria-modal="true"]')) {
        return
      }

      // Spasi & Enter memanggil elemen yang punya fokus. Kalau tombol musik /
      // mode baca / "Lanjut" sedang fokus, spasi harus milik TOMBOL itu — kalau
      // tidak, satu sentuhan menjalankan dua hal sekaligus (ganti halaman +
      // menyalakan musik). Panah & PageUp/Down tetap boleh lewat.
      if (
        (event.key === ' ' || event.key === 'Enter') &&
        target?.closest('button, a[href], [role="button"]')
      ) {
        return
      }

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          event.preventDefault()
          setDirection(1)
          setIndex((i) => Math.min(i + 1, safeCount - 1))
          break
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          event.preventDefault()
          setDirection(-1)
          setIndex((i) => Math.max(i - 1, 0))
          break
        case 'Home':
          event.preventDefault()
          setDirection(-1)
          setIndex(0)
          break
        case 'End':
          event.preventDefault()
          setDirection(1)
          setIndex(safeCount - 1)
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [safeCount])

  // --- Swipe touch (dasar) --------------------------------------------------

  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const onTouchStart = useCallback((event: TouchEvent) => {
    const touch = event.touches[0]
    if (!touch) return
    touchStartX.current = touch.clientX
    touchStartY.current = touch.clientY
  }, [])

  const onTouchEnd = useCallback(
    (event: TouchEvent) => {
      const startX = touchStartX.current
      const startY = touchStartY.current
      const touch = event.changedTouches[0]
      touchStartX.current = null
      touchStartY.current = null
      if (startX === null || startY === null || !touch) return

      const dx = touch.clientX - startX
      const dy = touch.clientY - startY

      // Gesture vertikal itu scroll, bukan ganti halaman.
      if (Math.abs(dy) > Math.abs(dx)) return
      if (Math.abs(dx) < SWIPE_THRESHOLD) return

      const step = dx < 0 ? 1 : -1
      setDirection(step)
      setIndex((i) => clamp(i + step, 0, safeCount - 1))
    },
    [safeCount],
  )

  return {
    index,
    count: safeCount,
    currentNumber: index + 1,
    progress: (index + 1) / safeCount,
    hasPrev: index > 0,
    hasNext: index < safeCount - 1,
    goNext,
    goPrev,
    goTo,
    direction,
    touchHandlers: { onTouchStart, onTouchEnd },
  }
}

function clamp(value: number, min: number, max: number): number {
  if (max < min) return min
  return Math.min(Math.max(value, min), max)
}

/** Format 1-based number jadi "01". Dipakai Navigation. */
export function pad2(n: number): string {
  return String(n).padStart(2, '0')
}