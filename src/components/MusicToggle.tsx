import { useEffect, useRef, useState } from 'react'

/**
 * MusicToggle — tombol kecil "♪" di pojok kanan atas (baris `.corner-row`).
 *
 * ATURAN YANG DIJAGA DI SINI
 * ---------------------------------------------------------------------------
 * 1. TIDAK AUTOPLAY. Tidak ada atribut `autoPlay` di <audio>, dan `play()`
 *    hanya dipanggil dari dalam `onClick`. Semua browser mobile memblokir
 *    autoplay yang membawa audio, jadi autoplay hanya jadi sumber warning.
 * 2. USER GESTURE. `play()` dipanggil langsung di handler klik, jadi masih di
 *    dalam "user activation" browser. Kalau dipindah ke useEffect, iOS Safari
 *    tidak akan membunyikannya sama sekali.
 * 3. LOOP. Satu lagu, diputar terus. Dipasang sebagai atribut `loop`.
 * 4. VOLUME 0.6. `volume` BUKAN atribut HTML — harus lewat property DOM, jadi
 *    diset sekali setelah element ter-mount dan sekali lagi tiap mulai.
 * 5. GAGAL LOAD = TIDAK APA-APA. `preload="none"` (nol byte diunduh sebelum
 *    tombol ditekan) + `onError` → tombol disembunyikan, `<audio>` dibuang,
 *    buku tetap jalan normal tanpa error. `play()` yang reject juga ditelan.
 * 6. >= 44px. Memakai `.btn-nav` yang sama dengan tombol sebelumnya/berikutnya
 *    (min-height & min-width 2.75rem = 44px), supaya menyatu dengan buku.
 * 7. ANTI SPACE-TURN-PAGE. Spasi adalah tombol "halaman berikutnya" di
 *    `useBookNavigation`. Kalau tombol ini punya fokus dan spasi ditekan tanpa
 *    dicegat, jempol akan mengganti halaman DAN menyalakan musik sekaligus.
 */

/** Volume awal: cukup terasa, cukup pelan dan hangat untuk menemani membaca. */
const DEFAULT_VOLUME = 0.5

/**
 * File ada di `public/music/`.
 */
const MUSIC_SRC = '/music/dunia-yang-nanti.mp3'

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isUnavailable, setIsUnavailable] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const toastTimerRef = useRef<number | null>(null)

  // `volume` hanya bisa diset lewat property DOM, bukan atribut JSX.
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = DEFAULT_VOLUME
    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current)
    }
  }, [])

  const showToast = (msg: string, duration = 3500) => {
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current)
    setToastMessage(msg)
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null)
    }, duration)
  }

  const togglePlayback = async () => {
    const audio = audioRef.current
    if (!audio || isUnavailable) return

    if (!audio.paused) {
      audio.pause()
      setIsPlaying(false)
      showToast('Musik dijeda', 1800)
      return
    }

    try {
      // Volume diset ulang tiap mulai: panel HP bisa mematikan suara, dan
      // tombol ini sengaja tidak punya slider.
      audio.volume = DEFAULT_VOLUME
      showToast('Dunia Yang Nanti — Raim Laode', 3500)
      await audio.play()
      setIsPlaying(true)
    } catch {
      // Ditolak browser, format tidak didukung, atau file tidak ditemukan.
      // Dari sisi pembaca semuanya sama: tidak ada musik. Buku tetap normal.
      audio.pause()
      setIsPlaying(false)
      setToastMessage(null)
    }
  }

  // File hilang / tidak bisa diputar → kembalikan tampilan seperti buku tanpa
  // fitur musik. Tidak ada error yang sampai ke pengguna.
  if (isUnavailable) return null

  return (
    <div className="corner-row justify-end">
      <button
        type="button"
        onClick={togglePlayback}
        onKeyDown={(event) => {
          // Spasi/Enter di atas tombol ini milik TOMBOL, bukan navigasi halaman.
          if (event.key === ' ' || event.key === 'Enter') event.stopPropagation()
        }}
        aria-label={isPlaying ? 'Jeda musik latar' : 'Putar musik latar'}
        aria-pressed={isPlaying}
        title={isPlaying ? 'Jeda musik' : 'Putar musik'}
        className="btn-nav inline-flex items-center justify-center border border-line bg-ivory px-3 text-[0.9375rem] leading-none tracking-normal text-charcoal-soft hover:border-muted hover:bg-ivory-warm hover:text-charcoal"
      >
        <span aria-hidden="true">
          {isPlaying ? (
            // Jeda digambar dari div, bukan glif "❙❙" — beberapa font Android
            // tidak punya glyph itu dan akan tampil kotak kosong.
            <span className="flex items-center gap-[3px]">
              <span className="h-3 w-[2px] rounded-[1px] bg-current" />
              <span className="h-3 w-[2px] rounded-[1px] bg-current" />
            </span>
          ) : (
            <span className="font-display text-[1.0625rem] leading-none">♪</span>
          )}
        </span>
      </button>

      {/* Mini toast judul lagu saat musik diputar/dijeda */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed top-[3.75rem] right-5 z-50 flex items-center gap-2 rounded-full border border-line bg-ivory/95 px-3 py-1 shadow-sm backdrop-blur-xs text-xs font-body-serif italic text-charcoal animate-fade-in"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-clay shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* preload="none": nol byte terunduh sebelum pengguna menekan tombol.
          `hidden` (= display:none) menjaga supaya tidak ikut jadi anak flex —
          playback tetap jalan di elemen yang display:none. */}
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        preload="none"
        loop
        className="hidden"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setIsUnavailable(true)}
      >
        Browsermu tidak mendukung audio HTML5.
      </audio>
    </div>
  )
}