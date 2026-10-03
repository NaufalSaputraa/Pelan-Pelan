import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * useLocalStorage — pembungkus localStorage yang aman (tidak pernah lempar).
 *
 * Dipakai untuk:
 *   - `STORAGE_KEYS.lastPage`    → mengingat halaman terakhir dibaca
 *     (lihat App.tsx untuk prompt "Lanjut dari halaman terakhir?")
 *   - `STORAGE_KEYS.readingMode` → preferensi Warm / Light
 *     (lihat hooks/useReadingMode.ts)
 *
 * Sifat hook ini:
 *   - `isHydrated` = false sampai nilai dari storage sudah dibaca. Dipakai UI
 *     untuk tidak menampilkan apa pun berdasarkan nilai sementara yang belum
 *     tentu sama dengan nilai di storage.
 *   - `try/catch` di setiap akses WAJIB: Safari private mode & beberapa
 *     WebView Android melempar error saat `localStorage.setItem`.
 *   - `read`/`write`/`remove` stabil (useCallback dengan deps kosong), jadi
 *     aman dipakai sebagai dependency useEffect tanpa loop render.
 *
 * ⚠️ Jangan simpan nilai sensitif apa pun di sini. localStorage dibaca
 *    tanpa enkripsi dan bisa dibaca script di domain yang sama.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // useState lazy initializer: dipakai sebagai nilai awal sementara ini.
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [isHydrated, setIsHydrated] = useState(false)
  const keyRef = useRef(key)

  keyRef.current = key

  /** Baca nilai dari storage, atau `fallback` kalau tidak ada / tidak bisa. */
  const read = useCallback((): T => {
    try {
      const item = window.localStorage.getItem(keyRef.current)
      return item === null ? initialValue : (JSON.parse(item) as T)
    } catch {
      // Private mode / storage diblokir / JSON rusak.
      return initialValue
    }
    // initialValue sengaja tidak jadi dependency — nilai awal saja yang dipakai.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /** Tulis nilai ke storage. Fail quietly kalau storage tidak tersedia. */
  const write = useCallback((value: T) => {
    try {
      window.localStorage.setItem(keyRef.current, JSON.stringify(value))
    } catch {
      // Diabaikan — storage penuh atau diblokir bukan alasan gagal render.
    }
  }, [])

  /** Hapus kunci dari storage. */
  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(keyRef.current)
    } catch {
      // Diabaikan, lihat `write`.
    }
  }, [])

  // Baca nilai tersimpan sekali setelah mount. `read`/`write` stabil, jadi
  // efek ini hanya jalan saat `key` berubah.
  useEffect(() => {
    setStoredValue(read())
    setIsHydrated(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return {
    storedValue,
    setStoredValue,
    isHydrated,
    read,
    write,
    remove,
  }
}

/** Kunci storage yang dipakai buku ini. */
export const STORAGE_KEYS = {
  /** Index halaman terakhir (0-based) yang dibaca. */
  lastPage: 'pelan-pelan:last-page',
  /** Mode baca: 'warm' (default) atau 'light'. */
  readingMode: 'pelan-pelan:reading-mode',
} as const