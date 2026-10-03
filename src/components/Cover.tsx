/**
 * Cover — layar pembuka, terpisah dari halaman pertama di dalam buku.
 *
 * Sengaja sangat sederhana: satu ornamen, satu wordmark, satu subtitle,
 * satu tombol. Ini sampul buku fisik, bukan undangan — jadi tidak ada foto
 * besar, tidak ada gradient ramai, tidak ada tombol kedua.
 *
 * Satu pengecualian: kalau pembaca punya halaman terakhir yang tersimpan,
 * sampul menawarkannya melanjutkan lewat `resume` (lihat ResumePrompt di
 * bawah). Tetap satu blok, masih di halaman yang sama — bukan dialog.
 *
 * Yang bikin terasa "bukan layar app":
 *   - `.cover-sky`  : grain kertas + satu sapuan hangat di atas (lihat index.css)
 *   - wordmark      : Cormorant uppercase + tracking lebar (token --text-wordmark)
 *   - hairline      : garis 1px pendek di atas judul, satu-satunya ornamen
 *   - stagger       : tiap elemen naik pelan bergiliran (jeda 60-100ms)
 *
 * Motion: seluruh blok naik sekali (fade-rise). Semua jeda & durasi dimatikan
 * oleh blok prefers-reduced-motion di src/index.css — tidak ada cek JS di sini.
 */
interface CoverProps {
  /** Dipanggil saat "Buka buku" ditekan. */
  onOpen: () => void
  subtitle?: string
  /** Render info kecil di bawah tombol (mis. "18 halaman"). */
  footerNote?: string
  /**
   * Kalau pembaca punya halaman terakhir yang tersimpan, sampul mengganti
   * satu tombol "Buka buku" dengan pilihan yang tenang untuk melanjutkan.
   * Diberi `null` (default) → sampul tampil persis seperti biasa.
   */
  resume?: ResumePromptProps
}

/** Data untuk blok "Lanjut dari halaman terakhir?". */
export interface ResumePromptProps {
  /** Nomor halaman 1-based tempat pembaca terakhir berhenti. */
  pageNumber: number
  /** Buka buku langsung di halaman itu. */
  onResume: () => void
  /** Buka buku dari halaman pertama. */
  onStartOver: () => void
}

export default function Cover({
  onOpen,
  subtitle = 'Tentang kamu, tentang aku, dan tujuh tahun yang pernah kita punya.',
  footerNote,
  resume,
}: CoverProps) {
  return (
    <div className="cover-sky flex min-h-[100dvh] flex-col justify-center bg-ivory px-5 py-16 sm:px-6">
      <div className="mx-auto w-full max-w-book">
        {/* Hairline pendek di atas judul — jangkar mata sebelum kata pertama. */}
        <div
          aria-hidden="true"
          className="mb-8 h-px w-14 bg-line-strong animate-fade-rise [animation-delay:60ms]"
        />

        <h1 className="animate-fade-rise [animation-delay:140ms] text-wordmark text-charcoal uppercase">
          Pelan-Pelan
        </h1>

        <p className="mt-6 max-w-[34ch] animate-fade-rise [animation-delay:240ms] font-body-serif text-subtitle italic text-charcoal-soft">
          {subtitle}
        </p>

        {/* Ornamen pemisah: garis + titik clay. Memisahkan "isi" dari "aksi". */}
        <div
          aria-hidden="true"
          className="mt-9 flex max-w-[14rem] items-center gap-2 animate-fade-rise [animation-delay:340ms]"
        >
          <span className="h-px flex-1 bg-line" />
          <span className="h-[3px] w-[3px] rounded-full bg-clay" />
        </div>

        {/* Ada halaman terakhir tersimpan → tawarkan melanjutkan, tenang.
            Bukan popup: satu kalimat + dua tombol bergaya navigasi buku.
            Tanpa simpanan, sampul tetap satu tombol seperti biasa. */}
        {resume ? (
          <ResumePrompt {...resume} />
        ) : (
          <button
            type="button"
            onClick={onOpen}
            className="btn-book group mt-8 inline-flex items-center gap-3 animate-fade-rise [animation-delay:420ms] border border-charcoal bg-transparent text-charcoal hover:bg-charcoal hover:text-ivory"
          >
            Buka buku
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ease-page group-hover:translate-x-1"
            >
              →
            </span>
          </button>
        )}

        {footerNote && (
          <p className="mt-7 animate-fade-rise [animation-delay:520ms] text-meta text-charcoal-faint">
            {footerNote}
          </p>
        )}
      </div>
    </div>
  )
}

/**
 * ResumePrompt — "Kamu terakhir berhenti di halaman 07." + dua pilihan.
 *
 * Nada: tenang dan tanpa urgensi. Tidak ada "Lanjut baca?!" warna
 * mencolok, tidak ada hitung mundur, tidak ada modal. Dua tombol `.btn-nav`
 * dengan bentuk yang sama persis; pembeda cuma ketebalan border dan warna
 * teks, jadi hierarkinya ringan dan tidak menekan pengguna untuk melanjutkan.
 * "Lanjut" memakai perlakuan yang sama persis dengan tombol "Buka buku" di
 * atasnya (outline gelap, jadi terisi hanya saat disentuh).
 *
 * `stopPropagation` di onKeyDown: spasi/Enter milik tombol ini, bukan
 * navigasi halaman (lihat useBookNavigation).
 */
function ResumePrompt({
  pageNumber,
  onResume,
  onStartOver,
}: ResumePromptProps) {
  return (
    <div className="mt-8 animate-fade-rise [animation-delay:420ms]">
      <p className="font-body-serif text-[0.9375rem] leading-[1.7] text-charcoal-soft">
        Kamu terakhir berhenti di halaman{' '}
        <span className="font-display text-charcoal tabular-nums">
          {String(pageNumber).padStart(2, '0')}
        </span>
        .
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onResume}
          onKeyDown={(event) => {
            if (event.key === ' ' || event.key === 'Enter') event.stopPropagation()
          }}
          className="btn-nav border border-charcoal bg-transparent px-5 text-charcoal hover:bg-charcoal hover:text-ivory"
        >
          Lanjut
        </button>

        <button
          type="button"
          onClick={onStartOver}
          onKeyDown={(event) => {
            if (event.key === ' ' || event.key === 'Enter') event.stopPropagation()
          }}
          className="btn-nav border border-line bg-transparent px-5 text-charcoal-soft hover:border-muted hover:bg-ivory-warm hover:text-charcoal"
        >
          Mulai dari awal
        </button>
      </div>
    </div>
  )
}
