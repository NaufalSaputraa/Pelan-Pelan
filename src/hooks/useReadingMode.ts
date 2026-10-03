import { useCallback, useEffect, useState } from 'react'
import { STORAGE_KEYS } from './useLocalStorage'

/**
 * useReadingMode — dua mode baca: Warm (default) ↔ Light.
 *
 * BAGAIMANA KERJANYA:
 *   CSS-nya sudah siap di `src/index.css`:
 *       html[data-reading-mode='light'] { --color-ivory: ...; ... }
 *   Jadi komponen ini tidak perlu mengatur warna apa pun — cukup memasang
 *   atribut `data-reading-mode` di elemen <html>:
 *       document.documentElement.dataset.readingMode = 'light' | 'warm'
 *   Semua token warna (ivory, charcoal, line, …) ikut berubah otomatis karena
 *   Tailwind v4 memakai variabel CSS untuk utility warna.
 *
 * Kenapa `warm` adalah default:
 *   Atributnya sengaja TIDAK ditulis di index.html, dan nilai bawaannya di sini
 *   adalah 'warm'. Kalau storage kosong / rusak / isinya mode lain, hasilnya
 *   tetap warm.
 *
 * Anti-kedip (flash):
 *   `readStoredReadingMode()` sengaja dibuat sinkron dan diekspor, supaya
 *   `main.tsx` bisa memasang atributnya SEBELUM React render pertama. Kalau
 *   prefs baru dibaca di dalam useEffect, halaman akan berkedip hangat → terang
 *   setiap kali tombolnya ditekan. Karena itu hook ini TIDAK memakai
 *   `useLocalStorage` (yang hydrasi di effect) — ia memakai fungsi baca yang
 *   sama supaya hanya ada satu sumber kebenaran.
 *
 * SSR: tidak dipakai di sini (Vite SPA), tapi `applyReadingMode` aman dipanggil
 * di server karena mengecek keberadaan `document`.
 */

export type ReadingMode = 'warm' | 'light'

/** Mode kalau tidak ada preferensi tersimpan. */
export const DEFAULT_READING_MODE: ReadingMode = 'warm'

/** Pasang atribut mode baca di <html>. Aman dipanggil berkali-kali. */
export function applyReadingMode(mode: ReadingMode): void {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.readingMode = mode
}

/**
 * Baca preferensi dari localStorage secara sinkron. Selalu mengembalikan nilai
 * yang valid: storage kosong, diblokir, atau isinya bukan 'warm'/'light' →
 * `DEFAULT_READING_MODE`.
 */
export function readStoredReadingMode(): ReadingMode {
  if (typeof window === 'undefined') return DEFAULT_READING_MODE
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.readingMode)
    if (raw === 'warm' || raw === 'light') return raw
    return DEFAULT_READING_MODE
  } catch {
    // Private mode / storage diblokir — mode bawaan tetap aman.
    return DEFAULT_READING_MODE
  }
}

function isReadingMode(value: unknown): value is ReadingMode {
  return value === 'warm' || value === 'light'
}

export interface ReadingModeControl {
  /** Mode yang sedang aktif. */
  mode: ReadingMode
  /** Mode kalau tombol ditekan sekali. */
  nextMode: ReadingMode
  setMode: (mode: ReadingMode) => void
  toggle: () => void
}

export function useReadingMode(): ReadingModeControl {
  // Lazy initializer: baca sinkron supaya render pertama sudah benar.
  const [mode, setModeState] = useState<ReadingMode>(readStoredReadingMode)

  // Pasang atribut + simpan preferensi setiap kali mode berubah.
  useEffect(() => {
    applyReadingMode(mode)
    try {
      window.localStorage.setItem(STORAGE_KEYS.readingMode, mode)
    } catch {
      // Diabaikan — gagal menyimpan bukan alasan gagal merender.
    }
  }, [mode])

  const setMode = useCallback((next: ReadingMode) => {
    setModeState(isReadingMode(next) ? next : DEFAULT_READING_MODE)
  }, [])

  const toggle = useCallback(() => {
    setModeState((current) => (current === 'warm' ? 'light' : 'warm'))
  }, [])

  return { mode, nextMode: mode === 'warm' ? 'light' : 'warm', setMode, toggle }
}