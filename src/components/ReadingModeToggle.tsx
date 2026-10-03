import { useReadingMode } from '../hooks/useReadingMode'

/**
 * ReadingModeToggle — tombol kecil Warm / Light di pojok kiri atas.
 *
 * Teks di tombol = mode yang SEDANG aktif. `aria-label` menjelaskan aksi kalau
 * ditekan, jadi "Warm" di layar berarti "sekarang hangat", dan sekali ditekan
 * menjadi terang.
 *
 * Yang dikerjakan komponen ini HANYA memasang atribut `data-reading-mode` di
 * <html> (lewat `useReadingMode`). Warnanya bukan dihitung di sini: semua token
 * warna ikut berubah karena Tailwind v4 memakai variabel CSS, dan blok
 * `html[data-reading-mode='light']` di `src/index.css` sudah menimpanya.
 *
 * Default `warm`, disimpan di localStorage (`pelan-pelan:reading-mode`).
 * Preferensi dipasang sebelum render pertama oleh `main.tsx`, jadi tidak ada
 * kedip warm lalu terang setiap kali halaman dibuka.
 *
 * >= 44px dan memakai `.btn-nav`, sama seperti tombol navigasi buku.
 */
export default function ReadingModeToggle() {
  const { mode, nextMode, toggle } = useReadingMode()

  const labelNow = mode === 'warm' ? 'Hangat' : 'Terang'
  const labelNext = nextMode === 'warm' ? 'Hangat' : 'Terang'

  return (
    <div className="corner-row justify-start">
      <button
        type="button"
        onClick={toggle}
        onKeyDown={(event) => {
          // Spasi/Enter milik tombol ini, bukan navigasi halaman.
          if (event.key === ' ' || event.key === 'Enter') event.stopPropagation()
        }}
        aria-label={`Mode baca ${labelNow}. Ketuk untuk mengganti ke mode ${labelNext}.`}
        title={`Mode baca ${labelNow} — ketuk untuk ${labelNext}`}
        className="btn-nav border border-line bg-ivory px-3 text-charcoal-soft hover:border-muted hover:bg-ivory-warm hover:text-charcoal"
      >
        {mode === 'warm' ? 'Warm' : 'Light'}
      </button>
    </div>
  )
}