import { pad2 } from '../hooks/useBookNavigation'

/**
 * Navigation — footer tetap: Prev / Next + indikator "01 — 03" + progress
 * hairline.
 *
 * PLAN 02 (visual):
 *   - footer pakai `sticky bottom-0` + background ivory solid → navigasi tidak
 *     pernah hilang di halaman panjang, tanpa perlu fixed + padding kompensasi
 *   - `padding-bottom` pakai `env(safe-area-inset-bottom)` → tombol tidak
 *     ketimpa home-indicator iPhone
 *   - indikator halaman pakai Cormorant + tracking lebar → terasa seperti
 *     nomor halaman di buku cetak, bukan badge aplikasi
 *   - progress jadi hairline 1px; isi pakai `transform: scaleX()`
 *     (bukan `width: %`) supaya tidak layout thrash tiap swipe → 60fps di HP murah
 *   - tombol tetap >= 44px (`.btn-nav`) dan punya state hover/disabled
 *
 * Layout: Prev kiri, nomor tengah, Next kanan (grid 3 kolom supaya nomor
 * benar-benar di tengah, bukan ikut sisa ruang). Swipe tetap urusan
 * useBookNavigation — komponen ini tidak menyentuhnya.
 */
interface NavigationProps {
  currentNumber: number
  total: number
  progress: number
  hasPrev: boolean
  hasNext: boolean
  onPrev: () => void
  onNext: () => void
  onOpenToc?: () => void
}

export default function Navigation({
  currentNumber,
  total,
  progress,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  onOpenToc,
}: NavigationProps) {
  // Dibatasi 0..100 supaya aman dari float error saat aria-valuenow.
  const pct = Math.round(Math.min(Math.max(progress * 100, 0), 100))

  return (
    <nav
      aria-label="Navigasi halaman"
      className="grain sticky bottom-0 z-30 mx-auto w-full max-w-book bg-ivory px-5 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-6"
    >
      {/* Progress hairline — satu garis tipis, tanpa warna mencolok.
          Garis ini juga pemisah visual antara halaman dan kontrol. */}
      <div
        className="mb-4 h-px w-full rounded-full bg-line"
        role="progressbar"
        aria-label="Kemajuan baca"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
      >
        <div
          className="h-px origin-left rounded-full bg-muted transition-transform duration-[420ms] ease-page"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={!hasPrev}
          aria-label="Halaman sebelumnya"
          className="btn-nav justify-self-start border border-line bg-transparent text-charcoal-soft hover:border-muted hover:bg-ivory-warm hover:text-charcoal disabled:pointer-events-none disabled:opacity-30"
        >
          ← <span className="hidden sm:inline">Sebelumnya</span>
        </button>

        <button
          type="button"
          onClick={onOpenToc}
          aria-label={`Halaman ${pad2(currentNumber)} dari ${pad2(total)}. Ketuk untuk melihat daftar isi.`}
          title="Buka daftar isi"
          className="group inline-flex items-center justify-center rounded-full px-2.5 py-1 font-display text-[0.9375rem] text-charcoal-soft transition-colors hover:bg-ivory-warm hover:text-charcoal focus:outline-none focus:ring-1 focus:ring-line-strong"
        >
          <span className="tabular-nums tracking-normal">{pad2(currentNumber)}</span>
          <span className="mx-2 tracking-widest text-charcoal-faint group-hover:text-charcoal-soft">—</span>
          <span className="tabular-nums tracking-normal">{pad2(total)}</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!hasNext}
          aria-label="Halaman berikutnya"
          className="btn-nav justify-self-end border border-line bg-transparent text-charcoal-soft hover:border-muted hover:bg-ivory-warm hover:text-charcoal disabled:pointer-events-none disabled:opacity-30"
        >
          <span className="hidden sm:inline">Berikutnya</span> →
        </button>
      </div>
    </nav>
  )
}
