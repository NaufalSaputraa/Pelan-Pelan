/* ==========================================================================
   DAFTAR HALAMAN / BAB — "Pelan-Pelan"
   --------------------------------------------------------------------------
   Digital Book:
   “Pelan-Pelan — Tentang kamu, tentang aku, dan tujuh tahun yang pernah kita punya.”
   Teks Master Verbatim dari Perbaikan.txt.
   ========================================================================== */

export type ChapterVariant = 'cover' | 'text' | 'quote' | 'scrapbook' | 'minimal'

export interface Chapter {
  id: string
  slug: string
  title: string
  subtitle?: string
  variant: ChapterVariant
  bodyPlaceholder: string[]
}

export const chapters: Chapter[] = [
  /* ------------------------------------------------------------------------
     HALAMAN 01
     ------------------------------------------------------------------------ */
  {
    id: 'page-01',
    slug: 'bab-01-sebelum-membuka',
    title: 'Sebelum kamu membuka halaman ini',
    subtitle: 'Pelan-pelan aja.',
    variant: 'text',
    bodyPlaceholder: [
      'Aku nggak tau kamu akan membuka halaman ini kapan, atau apakah kamu akan membacanya sampai habis. Tapi aku tetap mau nulis.',
      'Sebelum masuk lebih jauh, aku pengen bilang dulu: ini bukan bantahan, bukan cara buat bikin kamu merasa bersalah, dan bukan permintaan supaya kamu kembali.',
      'Ada banyak hal yang selama ini pengen aku ceritain, tapi entah kenapa sering aku simpan sendiri. Kadang karena mikir “nanti aja”, kadang karena takut mengganggu, sampai akhirnya banyak hal yang nggak pernah benar-benar keluar dari aku.',
      'Kali ini aku coba tulis semuanya di sini. Pelan-pelan, satu per satu.',
      'Kamu nggak harus langsung baca semuanya. Buka kalau kamu memang lagi siap.',
      'Kalau nanti kamu berhenti di tengah jalan, juga nggak apa-apa. Aku nggak akan menghitung halaman mana yang sudah kamu baca.',
      'Nggak ada kewajiban untuk membalas, dan nggak ada jawaban yang harus kamu kasih setelah selesai membaca.',
    ],
  },

  /* ------------------------------------------------------------------------
     HALAMAN 02
     ------------------------------------------------------------------------ */
  {
    id: 'page-02',
    slug: 'bab-02-dua-anak',
    title: 'Dulu, kita cuma dua anak yang nggak tau akan sejauh ini',
    subtitle: 'Awalnya sesederhana itu.',
    variant: 'text',
    bodyPlaceholder: [
      'Awalnya cuma dari seorang teman. Lama-lama kita jadi sering ngobrol, saling cerita, saling curhat, sampai akhirnya sama-sama punya rasa.',
      'Aku bahkan nggak inget siapa yang lebih dulu suka. Rasanya kita ngalamin semuanya bareng-bareng.',
      'Yang paling aku inget justru waktu kita masih suka curi-curi waktu buat ketemu. Kadang cuma buat ngobrol sebentar, bertukar kabar, atau sekadar bisa lihat satu sama lain.',
      'Waktu itu kita masih MTs.',
      'Tempatnya bisa di mana aja. Kadang di sela waktu yang kita punya, kadang cuma sebentar. Kita tuker surat, kasih barang kecil, dan melakukan hal-hal sederhana yang kalau dilihat sekarang mungkin kelihatannya nggak seberapa.',
      'Tapi waktu itu semuanya cukup buat bikin kita senang.',
      'Dan tanpa kita sadari, dari hal-hal kecil itu kita tumbuh bareng.',
      'Tujuh tahun.',
      'Pelan-pelan, tanpa pernah benar-benar tahu awalnya akan sampai sejauh ini.',
    ],
  },

  /* ------------------------------------------------------------------------
     HALAMAN 03
     ------------------------------------------------------------------------ */
  {
    id: 'page-03',
    slug: 'bab-03-kalau-aku-mengingat',
    title: 'Kalau aku mengingat kita',
    subtitle: 'Aku selalu ingat hal-hal kecil.',
    variant: 'text',
    bodyPlaceholder: [
      'Kalau aku mengingat kita, yang paling sering muncul bukan kejadian besar. Justru hal-hal kecil.',
      'Masa kelas 12, hampir tiap sore kita jalan-jalan. Kadang cuma buat beli makan, beli jajan, atau muter-muter tanpa tujuan yang jelas.',
      'Nggak ada yang istimewa dari itu semua. Tapi aku bahagia banget. Sampai sekarang kadang aku masih pengen berhenti di waktu itu aja.',
      'Aku inget kita pernah kehujanan sore-sore cuma buat jalan-jalan. Bajuku sampai basah kuyup karena aku berusaha nutupin kamu dari hujan, dan malamnya aku malah demam. Kalau dipikir sekarang, lucu juga. Tapi itu salah satu kenangan yang paling nempel.',
      'Aku inget jalan-jalan malam di Kudus setelah les di GO. Aku inget kita pergi ke Muria cuma buat beli pentol Muria, terus langsung turun lagi.',
      'Aku inget perjalanan Jepara–Semarang, mampir Indomaret sebentar, jalan-jalan di mall, lihat city light, photo booth, dan foto-foto random yang sampai sekarang masih ada di Google Photos. VC sampai malam. Berteduh waktu hujan. Dulu semua itu mungkin kelihatan biasa aja.',
      'Dan waktu aku dirawat di Demak, kamu sempat pengen datang menjenguk dari Kudus. Padahal aku sempat melarang karena jauh dan nggak ada yang bisa menemani kamu ke sini. Kamu tetap ngotot pengen datang. Niatmu waktu itu bikin aku ngerasa benar-benar diperhatikan.',
      'Kita juga pernah ngobrol soal rumah. Soal Solo atau Jepara. Soal anak. Sampai hal kecil seperti membayangkan anak kita sekolah di SDIT Sula.',
      'Aku nggak membawa semua itu sekarang sebagai tuntutan. Itu cuma bagian dari masa ketika dua orang pernah membayangkan hidup bareng.',
      'Dulu semua itu terasa biasa karena kita menjalaninya hampir tanpa berpikir. Sekarang aku baru sadar, ternyata banyak bagian hidupku yang tersimpan di dalam hal-hal sederhana itu.',
    ],
  },

  /* ------------------------------------------------------------------------
     HALAMAN 04
     ------------------------------------------------------------------------ */
  {
    id: 'page-04',
    slug: 'bab-04-melihat-diri-sendiri',
    title: 'Setelah semuanya berhenti, aku mulai melihat diriku sendiri',
    subtitle: 'Untuk pertama kalinya aku benar-benar berhenti dan melihat ke belakang.',
    variant: 'text',
    bodyPlaceholder: [
      'Setelah semuanya berhenti, aku punya banyak waktu buat mikir. Bukan cuma kenapa kita bisa sampai di titik ini, tapi juga tentang diriku sendiri.',
      'Aku kuliah Informatika dan kamu Kedokteran. Aku tetap di Jawa, kamu akhirnya di Banjarmasin. Bahkan kita hidup dengan waktu yang berbeda. WIB dan WITA.',
      'Yang dulu hampir tiap sore bisa ketemu, lama-lama jadi hubungan yang cuma memungkinkan kita bertemu sekitar setengah tahun sekali.',
      'Aku nggak mau menyalahkan jarak, kuliah, kesibukan kamu, atau masa PLT kamu. Semua itu memang keadaan yang kita hadapi. Tapi keadaan bukan alasan buat aku menghindari bagian dari diriku yang memang perlu aku lihat.',
      'Aku juga nggak mau bilang kalau semuanya sepenuhnya salahku. Aku cuma mau jujur bahwa ada bagian dari diriku yang sebelumnya nggak aku lihat.',
      'Aku sering nggak menginisiasi VC, dan kamu yang lebih sering menelepon lebih dulu. Aku juga sering takut mengganggu waktu kamu sibuk.',
      'Dulu aku pikir memberi ruang berarti memahami kamu. Sekarang aku sadar, ternyata ada saat-saat ketika kamu mungkin nggak membutuhkan ruang. Kamu membutuhkan kehadiran.',
      'Dan aku baru benar-benar memahami itu setelah semuanya berhenti.',
    ],
  },

  /* ------------------------------------------------------------------------
     HALAMAN 05
     ------------------------------------------------------------------------ */
  {
    id: 'page-05',
    slug: 'bab-05-tentang-perasaanmu',
    title: 'Tentang perasaanmu yang dulu sering nggak aku mengerti',
    subtitle: 'Ini mungkin salah satu hal yang paling aku sesali.',
    variant: 'text',
    bodyPlaceholder: [
      'Dulu, kalau kamu menyampaikan sesuatu soal perasaan, aku sering langsung masuk ke mode berpikir dan menjelaskan.',
      'Contohnya waktu kamu bilang: “aku kok ngerasa jauh gitu sama kamu ya”. Aku malah menjelaskan bahwa kita sama-sama punya kesibukan, kamu sedang PLT, dan kita lagi menjalani banyak hal.',
      'Sekarang aku sadar, waktu itu kamu nggak sedang meminta penjelasan. Kamu cuma sedang bilang bahwa kamu merasa jauh.',
      'Seharusnya aku berhenti sebentar. Seharusnya aku bertanya: “Kamu ngerasa jauh yaa? Bagian mana yang paling kerasa buat kamu?” Sesederhana itu.',
      'Nggak semua cerita butuh solusi. Kadang seseorang cuma mau didengar dulu. Perasaannya diterima dulu. Baru setelah itu, kalau memang dibutuhkan, kita bicara soal jalan keluarnya.',
      'Dulu polaku: Dengar → Analisis → Jelaskan → Selesaikan.',
      'Sekarang aku belajar: Dengar → Validasi → Gali → Baru cari solusi kalau memang dibutuhkan.',
      'Aku terlalu sering berpikir pakai logika ketika kamu sedang bicara dari sisi perasaan. Bukan karena aku nggak peduli. Aku cuma belum cukup belajar memahami cara mencintai dari sisi yang kamu butuhkan. Dan untuk itu, aku minta maaf.',
    ],
  },

  /* ------------------------------------------------------------------------
     HALAMAN 06
     ------------------------------------------------------------------------ */
  {
    id: 'page-06',
    slug: 'bab-06-yang-kamu-ajar',
    title: 'Hal-hal yang dulu kamu ajarkan',
    subtitle: 'Kamu, dulu.',
    variant: 'quote',
    bodyPlaceholder: [
      'ya gimana caranya kamu diruang aku sendiri itu, aku tetep bisa inget km',
      'Waktu itu mungkin aku belum benar-benar paham. Sekarang aku mulai ngerti. Tentang bagaimana caranya tetap membuat seseorang merasa diingat, bahkan ketika kita nggak sedang berada di dekatnya.',
      'Kamu juga pernah bilang: “itu pr justru buat kamu.” Dan ternyata memang begitu.',
      'Kamu pernah mengingatkan aku soal cara mengolah kata-kata dengan baik. Tentang memahami dari hati, bukan cuma dari logika. Tentang memikirkan sesuatu itu etis atau nggak. Tentang jangan terlalu idealis. Tentang harus keluar dari zona nyaman. Tentang lebih perhatian.',
      'Tentang kalau beli sesuatu, kalau bisa mikirin berdua, bukan cuma diri sendiri. Tentang berbagi dan belajar nggak egois.',
      'Dulu aku mendengar semuanya seperti nasihat yang berdiri sendiri-sendiri. Sekarang aku melihat satu benang merah di antara semuanya.',
      'Aku harus belajar melihat orang lain. Bukan cuma melihat apa yang menurutku benar. Aku harus belajar memperhatikan. Bukan cuma menunggu diminta. Aku harus belajar memahami. Bukan cuma menjelaskan.',
      'Dan aku harus belajar membuat orang yang aku sayang merasa diingat, bukan cuma dicari ketika aku sedang membutuhkannya. Ternyata banyak dari itu yang masih harus aku pelajari.',
    ],
  },

  /* ------------------------------------------------------------------------
     HALAMAN 07
     ------------------------------------------------------------------------ */
  {
    id: 'page-07',
    slug: 'bab-07-aku-belajar',
    title: 'Aku belajar dari banyak hal',
    subtitle: 'Ini masih proses, bukan cerita perubahan instan.',
    variant: 'text',
    bodyPlaceholder: [
      'Sejak semuanya berhenti, sekitar sebulan ini aku banyak diam dan banyak mikir. Aku baca ulang percakapan kita. Aku mengingat lagi hal-hal yang pernah kamu keluhkan.',
      'Aku juga membaca banyak hal dan mendengarkan berbagai sudut pandang. Bukan buat mencari pembenaran. Aku cuma pengen benar-benar ngerti.',
      'Aku jadi lebih sering bertanya sebelum menyimpulkan. Lebih berusaha memahami sebelum menjelaskan. Dan mulai menerima bahwa sudut pandangku nggak selalu yang paling benar.',
      'Aku juga belajar bahwa ketika seseorang yang aku sayang sedang mengalami sesuatu yang berat, aku nggak selalu harus punya jawaban.',
      'Kadang aku cuma perlu ada. Kadang yang dibutuhkan bukan solusi. Cuma seseorang yang mau mendengarkan sampai selesai.',
      'Aku masih dalam proses. Tapi setidaknya sekarang aku mulai tahu bagian mana dari diriku yang selama ini perlu diperbaiki.',
    ],
  },

  /* ------------------------------------------------------------------------
     HALAMAN 08
     ------------------------------------------------------------------------ */
  {
    id: 'page-08',
    slug: 'bab-08-belum-berubah',
    title: 'Aku nggak mau bilang aku sudah berubah',
    subtitle: 'Aku nggak mau menjanjikan sesuatu yang belum bisa aku buktikan.',
    variant: 'text',
    bodyPlaceholder: [
      'Aku nggak mau bilang aku sudah berubah. Kalimat itu terlalu gampang diucapkan, dan aku belum berhak mengatakannya.',
      'Aku juga nggak mau bilang aku bakal sempurna. Aku masih manusia. Aku masih bisa salah.',
      'Yang bisa aku bilang adalah aku sedang belajar. Belajar mendengar lebih baik. Belajar memahami perasaan sebelum buru-buru menjelaskan. Belajar memberi validasi sebelum memberikan saran.',
      'Belajar jadi lebih peka. Lebih sering bertanya. Lebih hati-hati mengolah kata.',
      'Aku juga belajar membedakan kapan seseorang cuma ingin didengar dan kapan dia memang meminta pendapat. Dan belajar bagaimana membuat orang yang aku sayang merasa aman untuk bercerita.',
      'Aku nggak tau perubahan ini akan membawa aku ke mana. Tapi aku tau satu hal. Aku nggak mau berhenti di penyesalan.',
      'Semua ini juga bukan alat untuk menuntut kamu kembali. Aku melakukannya karena aku sadar memang ada bagian dari diriku yang perlu diperbaiki. Untuk diriku sendiri. Dan untuk siapa pun yang nanti ada dalam hidupku.',
    ],
  },

  /* ------------------------------------------------------------------------
     HALAMAN 09
     ------------------------------------------------------------------------ */
  {
    id: 'page-09',
    slug: 'bab-09-maaf',
    title: 'Maaf',
    subtitle: 'Satu per satu, dan spesifik.',
    variant: 'minimal',
    bodyPlaceholder: [
      'Maaf karena ada waktunya aku nggak cukup mendengar kamu.',
      'Maaf karena aku terlalu cepat menjelaskan.',
      'Maaf karena aku sering menggunakan logika ketika kamu sedang bicara dari sisi perasaan.',
      'Maaf karena aku kurang memahami sisi emosional kamu.',
      'Maaf karena aku jarang menginisiasi VC.',
      'Maaf karena aku kurang bisa membuat kamu merasa nyaman ketika kita LDR.',
      'Maaf karena aku terlalu takut mengganggu waktu kamu sibuk.',
      'Maaf karena niat baikku kadang nggak sampai dengan cara yang baik di kamu.',
      'Maaf kalau pernah ada waktu ketika kamu merasa sendirian, padahal kamu sedang punya aku.',
      'Maaf untuk semua kekuranganku selama tujuh tahun. Untuk hal-hal yang sekarang sudah aku sadari. Dan untuk hal-hal yang mungkin baru akan benar-benar aku pahami setelah ini.',
      'Aku nggak bisa mengulang waktu. Aku juga nggak bisa memperbaiki satu per satu semua yang sudah terjadi. Tapi aku nggak mau semua ini berhenti cuma sebagai penyesalan.',
    ],
  },

  /* ------------------------------------------------------------------------
     HALAMAN 10
     ------------------------------------------------------------------------ */
  {
    id: 'page-10',
    slug: 'bab-10-tujuh-tahun',
    title: 'Tujuh tahun yang aku syukuri',
    subtitle: 'Kalau ditanya apakah aku menyesal pernah memilih kamu, jawabannya nggak.',
    variant: 'text',
    bodyPlaceholder: [
      'Tujuh tahun itu bukan waktu yang sebentar. Kita tumbuh bareng. Dari dua anak yang awalnya cuma saling curhat, sampai akhirnya menjalani banyak fase kehidupan bersama.',
      'Aku pernah bahagia banget sama kamu. Aku pernah merasa punya partner yang selalu bisa aku ceritain banyak hal.',
      'Jadi kalau ditanya apakah aku menyesal pernah memilih kamu, jawabannya nggak.',
      'Aku nggak mau menyebut tujuh tahun ini gagal hanya karena akhirnya kita sampai di titik ini. Ada bagian yang menyakitkan. Ada kesalahan. Ada banyak hal yang seharusnya bisa kulakukan lebih baik.',
      'Tapi ada juga banyak hal baik yang akan selalu aku syukuri. Sebagian besar diriku yang sekarang juga terbentuk dari tujuh tahun ini.',
      'Kalau waktu bisa diulang dan aku kembali menjadi aku yang dulu, aku rasa aku tetap akan memilih untuk mengenal kamu. Bukan karena aku ingin mengubah akhir cerita. Tapi karena aku tahu tujuh tahun itu pernah berarti. Dan sampai sekarang pun masih berarti.',
    ],
  },

  /* ------------------------------------------------------------------------
     HALAMAN 11
     ------------------------------------------------------------------------ */
  {
    id: 'page-11',
    slug: 'bab-11-hal-hal-kecil',
    title: 'Hal-hal kecil tentang kamu yang masih tinggal',
    subtitle: 'Kadang yang paling susah hilang justru yang paling sederhana.',
    variant: 'scrapbook',
    bodyPlaceholder: [
      'Nomi. Nopi. Lego bunga-bunga. Bunga yang pernah aku kasih. Surat-surat kecil. Hadiah-hadiah yang pernah kita tukar. Foto random. Foto perjalanan. Panggilan “noney”.',
      'Hal-hal yang buat orang lain mungkin nggak berarti apa-apa. Tapi buat aku semuanya punya cerita sendiri. Aku masih bisa ingat tempatnya. Harinya. Obrolannya.',
      'Kadang aku buka Google Photos, nemu foto yang sudah lama nggak aku lihat, lalu tiba-tiba semuanya terasa dekat lagi.',
      'Nomi, Nopi, atau lego bunga-bunga yang pernah aku kasih — kalau masih ada, tolong rawat dengan sayang yaa. Buat aku, itu bukan cuma benda. Itu bagian kecil dari masa ketika aku pernah mencintai dan menyayangi kamu dengan caraku.',
      'Aku nggak mau menyimpan semua itu supaya terus hidup di masa lalu. Aku cuma nggak mau berpura-pura bahwa semua itu nggak pernah berarti.',
    ],
  },

  /* ------------------------------------------------------------------------
     HALAMAN 12
     ------------------------------------------------------------------------ */
  {
    id: 'page-12',
    slug: 'bab-12-tentang-kamu',
    title: 'Tentang kamu',
    subtitle: 'Kenapa selama itu aku memilih kamu.',
    variant: 'text',
    bodyPlaceholder: [
      'Aku suka sisi lucumu. Sisi manjamu. Caramu yang kadang butuh aku. Aku suka cara kamu menyayangiku ketika aku sehat maupun ketika aku sakit.',
      'Aku suka perhatian-perhatian kecilmu. Cara kamu memanggilku “noney”. Cara kamu mengingatkan aku ketika aku salah. Cara kamu memberi saran tentang hidupku.',
      'Hal-hal yang dulu mungkin terasa biasa, sekarang justru terasa berharga.',
      'Kamu juga orang yang lembut. Aku tahu kamu nggak cocok dibentak. Nggak cocok diajak bicara dengan nada tinggi. Dan seharusnya aku lebih memahami itu.',
      'Tapi lebih dari semua sifat itu, ada satu alasan yang menurutku paling besar. Aku nyaman sama kamu.',
      'Aku nggak cuma suka kamu karena kamu baik sama aku. Aku suka kamu karena sama kamu aku nggak perlu terlalu mikir harus jadi siapa. Bisa cerita hal kecil maupun hal besar. Bisa bercanda. Bisa serius. Bisa jadi diriku sendiri. Aku merasa didengar. Dan aku merasa punya seseorang untuk menjalani perjalanan hidup.',
      'Dulu kamu adalah orang yang membuat aku nyaman untuk bercerita. Sekarang aku sadar, aku juga seharusnya belajar menjadi orang yang bisa membuat kamu merasa nyaman untuk bercerita.',
      'Kamu bukan cuma pasangan buat aku. Kamu partner seperjalanan. Dan mungkin itu juga alasan kenapa kehilangan kamu terasa sebesar ini.',
    ],
  },

  /* ------------------------------------------------------------------------
     HALAMAN 13
     ------------------------------------------------------------------------ */
  {
    id: 'page-13',
    slug: 'bab-13-kalau-suatu-hari',
    title: 'Kalau suatu hari...',
    subtitle: 'Ini bukan permintaan. Cuma sebuah harapan.',
    variant: 'text',
    bodyPlaceholder: [
      'Aku masih sayang kamu. Aku masih mencintai kamu. Aku cuma mau jujur soal itu tanpa menjadikannya alasan untuk menekan kamu.',
      'Kalau suatu hari kamu sedang tenang, dan kamu sendiri ingin memberi kesempatan, aku nggak ingin sekadar kembali ke hubungan kita yang dulu. Aku pengen kita memulai sesuatu yang baru. Dengan dua orang yang sudah belajar dari apa yang pernah terjadi.',
      'Karena kalau cuma kembali ke cara yang sama, mungkin kita hanya akan mengulang luka yang sama.',
      'Kalau itu benar-benar terjadi, aku pengen lebih banyak mendengarkan. Lebih banyak memahami. Lebih peka terhadap hal-hal kecil. Lebih hadir. Bukan lewat janji besar, tapi lewat hal-hal sederhana yang dilakukan setiap hari.',
      'Aku pengen lebih tahu bagian mana yang paling terasa buat kamu. Dan ketika kamu cerita, aku pengen kamu nggak perlu menjelaskan berkali-kali cuma supaya aku mengerti.',
      'Tapi semua itu cuma kalau kamu memang mau. Aku nggak akan memaksamu.',
    ],
  },

  /* ------------------------------------------------------------------------
     HALAMAN 14
     ------------------------------------------------------------------------ */
  {
    id: 'page-14',
    slug: 'bab-14-jalan-kita-berbeda',
    title: 'Tapi kalau ternyata jalan kita memang berbeda',
    subtitle: 'Karena pilihan itu tetap milikmu.',
    variant: 'text',
    bodyPlaceholder: [
      'Aku masih berharap. Dan aku nggak mau bohong soal itu.',
      'Tapi aku juga sadar: berharap nggak memberiku hak untuk minta kamu kembali. Itu hak kamu. Bukan hak aku.',
      'Kalau jalan kita memang berbeda, aku mungkin tetap sedih. Tetap rindu. Mungkin juga butuh waktu yang panjang untuk benar-benar terbiasa.',
      'Dulu, kalau hubungan kita hampir berakhir, aku terbiasa membujuk, meyakinkan, dan mencari cara supaya kamu kembali. Waktu itu kita masih dekat. Aku masih bisa menunjukkan usaha itu secara langsung.',
      'Sekarang aku belajar bahwa nggak semua keputusan bisa dilawan dengan bujukan. Sebagian keputusan justru perlu dihargai.',
      'Aku nggak mau berpura-pura menerima semua ini dengan mudah. Tapi aku juga nggak mau cintaku berubah menjadi alasan untuk menahan kamu.',
      'Aku pengen kamu bahagia di jalan kamu. Bahkan kalau kebahagiaan itu ternyata bukan bersamaku.',
      'Kalau itu yang terjadi, aku tetap ingin tujuh tahun ini menjadi sesuatu yang bisa kita ingat sebagai bagian hidup yang berarti. Bukan trauma. Bukan hutang. Bukan beban.',
    ],
  },

  /* ------------------------------------------------------------------------
     HALAMAN 15
     ------------------------------------------------------------------------ */
  {
    id: 'page-15',
    slug: 'bab-15-terima-kasih',
    title: 'Terima kasih',
    subtitle: 'Untuk tujuh tahun yang pernah kita punya.',
    variant: 'text',
    bodyPlaceholder: [
      'Terima kasih sudah pernah memilih aku. Terima kasih sudah pernah jadi tempat aku bercerita. Tempat aku curhat tentang hal-hal yang nggak bisa aku ceritain ke siapa pun.',
      'Terima kasih buat surat-surat kecil dan hadiah-hadiah kecil dulu. Buat martabak Bang Ahmad yang ternyata jadi kesukaanmu. Buat pentol di Muria. Buat jalan-jalan malam di Kudus setelah les. Buat perjalanan Jepara–Semarang. Buat mampir sebentar di Indomaret.',
      'Buat sore-sore kelas 12 yang cuma muter-muter tanpa tujuan. Buat hujan yang bikin kita berteduh di pinggir jalan. Buat waktu-waktu ketika kita malah memilih menerobos hujan karena takut kesorean dan kamu nggak bisa masuk boarding.',
      'Terima kasih buat VC sampai malam. Buat photo booth. Buat city lights. Buat foto-foto random yang sampai sekarang masih tersimpan di Google Photos.',
      'Terima kasih buat semua tawa. Semua obrolan. Semua nasihat. Semua teguran waktu aku salah. Aku jadi lebih baik karena pernah mendengar semua itu.',
      'Dan terima kasih juga untuk hal-hal yang nggak selalu mudah. Karena dari sana aku belajar banyak hal tentang diriku sendiri.',
      'Selama tujuh tahun, kamu bukan cuma bagian dari hidupku. Kamu adalah bagian dari hidupku.',
    ],
  },

  /* ------------------------------------------------------------------------
     HALAMAN 16
     ------------------------------------------------------------------------ */
  {
    id: 'page-16',
    slug: 'bab-16-kalau-kamu-mengingat',
    title: 'Kalau suatu hari kamu mengingat aku',
    subtitle: 'Semoga yang muncul bukan cuma hari ketika semuanya berakhir.',
    variant: 'text',
    bodyPlaceholder: [
      'Kalau suatu hari kamu mengingat aku, aku harap yang muncul bukan cuma hari ketika semuanya berakhir.',
      'Aku harap kamu juga ingat dua anak yang dulu curi-curi waktu buat ketemu. Yang tuker surat. Yang sembunyi-sembunyi supaya bisa bertemu. Yang bisa bahagia cuma karena punya waktu sebentar untuk ngobrol.',
      'Ingat sore-sore kelas 12 yang cuma buat jajan. Ingat jalanan Kudus setelah les GO. Ingat Muria dan pentol. Ingat hujan yang bikin bajuku basah sampai demam.',
      'Ingat waktu aku dirawat di Demak dan kamu tetap ngotot pengen datang dari Kudus meskipun aku sempat melarang. Ingat semua hal kecil yang pernah bikin kita ketawa. Termasuk rumah-rumah kecil yang dulu pernah kita bayangkan.',
      'Nggak perlu merasa bersalah. Nggak perlu merasa terbebani. Aku cuma berharap kalau suatu hari kenangan itu datang, yang ikut datang bukan cuma rasa sakit. Mungkin sedikit hangat. Mungkin sedikit senyum.',
      'Karena ketika aku mengingat kamu, sekarang memang ada rasa sakitnya. Tapi aku masih bisa menemukan banyak hal yang bikin aku tersenyum.',
    ],
  },

  /* ------------------------------------------------------------------------
     HALAMAN 17
     ------------------------------------------------------------------------ */
  {
    id: 'page-17',
    slug: 'bab-17-dari-aku-yang-sekarang',
    title: 'Untuk kamu, dari aku yang sekarang',
    subtitle: 'Ada banyak hal yang dulu nggak sempat aku katakan.',
    variant: 'text',
    bodyPlaceholder: [
      'Aku nggak tau kamu akan melihat aku seperti apa setelah membaca semua ini. Aku juga nggak tau apakah tulisan ini akan mengubah sesuatu. Dan aku nggak menulis ini untuk mengubah keputusanmu. Aku cuma pengen kamu tahu bahwa aku benar-benar belajar dari semuanya.',
      'Aku mengingat semua hal yang pernah kamu katakan. Semua yang pernah kamu keluhkan. Semua nasihat yang pernah kamu kasih. Sekarang aku sedang berusaha membawa semua itu ke dalam hidupku. Bukan cuma buat kamu. Tapi juga buat diriku sendiri.',
      'Aku belajar jadi lebih peka. Lebih bisa mendengar. Lebih bisa memahami. Lebih hati-hati dalam memilih kata. Lebih tahu kapan harus bicara dan kapan cukup mendengarkan.',
      'Dan lebih sadar bahwa orang yang aku sayang juga perlu merasa aman untuk menjadi dirinya sendiri.',
      'Kalau suatu hari orang yang masih ingin aku cintai itu ternyata masih kamu, aku akan sangat bersyukur. Karena jujur, sampai sekarang aku masih sayang. Masih mencintai. Masih peduli. Dan sebagian dari diriku masih berharap.',
      'Aku nggak tau apa yang akan terjadi nanti. Tapi sekarang aku ingin cintaku jadi lebih dewasa daripada sebelumnya.',
    ],
  },

  /* ------------------------------------------------------------------------
     HALAMAN 18 / ALBUM (page-19)
     ------------------------------------------------------------------------ */
  {
    id: 'page-19',
    slug: 'bab-19-kumpulan-kenangan',
    title: 'Kumpulan kenangan kita',
    subtitle: 'Potongan-potongan yang tersimpan.',
    variant: 'scrapbook',
    bodyPlaceholder: [
      'Aku kumpulin foto-foto kita di sini. Bukan buat menahan masa lalu. Cuma biar semua yang pernah kita jalani tetap punya tempat.',
      'Setiap foto punya ceritanya sendiri. Baca pelan-pelan yaa.',
    ],
  },

  /* ------------------------------------------------------------------------
     HALAMAN 19 / HALAMAN TERAKHIR (page-18)
     ------------------------------------------------------------------------ */
  {
    id: 'page-18',
    slug: 'bab-18-halaman-terakhir',
    title: 'Halaman terakhir',
    subtitle: 'Sampai sini saja.',
    variant: 'minimal',
    bodyPlaceholder: [
      'Kita sampai di sini. Aku nggak tau rasanya semua ini buat kamu. Dan aku juga nggak perlu tahu.',
      'Kalau semua yang aku tulis di sini terasa apa adanya, biarkan saja seperti itu. Ini bukan sesuatu yang harus kamu tanggung. Bukan sesuatu yang harus kamu jawab.',
      'Kamu nggak wajib membalas. Nggak wajib punya jawaban. Dan nggak wajib memberi kepastian apa pun. Sesudah ini, keputusan tetap ada di tangan kamu.',
      'Aku masih sayang kamu. Aku masih menghargai tujuh tahun kita. Dan aku masih menyimpan harapan kecil tentang kemungkinan suatu hari kita bertemu lagi dengan cara yang berbeda.',
      'Tapi aku juga sedang belajar bahwa mencintai seseorang nggak selalu berarti memaksanya untuk tetap tinggal.',
      'Pelajaran yang aku bawa dari tujuh tahun ini adalah tentang mendengarkan. Tentang memahami. Tentang perhatian. Tentang rasa aman. Dan tentang bagaimana menjadi seseorang yang nyaman untuk diajak menjalani hidup, bukan cuma dicari ketika sedang merasa kehilangan.',
      'Kalau suatu hari jalan kita bertemu lagi, aku berharap kita sudah menjadi dua orang yang lebih siap. Lebih dewasa. Dan lebih mampu menjaga satu sama lain.',
      'Kalau ternyata tidak, aku tetap akan bersyukur pernah mengenalmu. Pernah mencintaimu. Pernah menjadi bagian dari hidupmu. Dan pernah berbagi begitu banyak cerita bersamamu.',
      'Jaga diri baik-baik yaa.',
      '— aku',
    ],
  },
]

/** Jumlah halaman total. Dipakai footer & indikator navigasi. */
export const totalChapters = chapters.length

/** Cari bab berdasarkan `id` (mis. 'page-07'). */
export function getChapterById(id: string): Chapter | undefined {
  return chapters.find((chapter) => chapter.id === id)
}
