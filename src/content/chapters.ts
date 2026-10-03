/* ==========================================================================
   DAFTAR HALAMAN / BAB — "Pelan-Pelan"
   --------------------------------------------------------------------------
   Digital Book:
   “Pelan-Pelan — Tentang kamu, tentang aku, dan tujuh tahun yang pernah kita punya.”
   Naskah asli & personal: 18 bab teks otentik + 1 bab album penutup (19 halaman).
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
  {
    "id": "page-01",
    "slug": "bab-01-sebelum-membuka",
    "title": "Sebelum kamu membuka halaman ini",
    "subtitle": "Pelan-pelan aja.",
    "variant": "text",
    "bodyPlaceholder": [
      "Aku nggak tau harus mulai dari mana.",
      "Ada banyak hal yang selama ini sebenarnya pengen aku ceritain ke kamu, tapi selama kita masih bersama pun aku sering nggak tau gimana cara menyampaikannya. Kadang aku simpan sendiri, kadang aku pikir nanti aja, sampai akhirnya banyak hal yang nggak pernah benar-benar keluar dari aku.",
      "Jadi kali ini aku coba tulis semuanya di sini.",
      "Bukan buat maksa kamu kembali.",
      "Bukan juga buat bikin kamu merasa bersalah atas keputusan yang kamu ambil.",
      "Aku cuma pengen kamu tau apa yang ada di kepalaku dan di hatiku selama ini. Tentang kita, tentang kesalahan yang baru sekarang bisa aku lihat lebih jelas, tentang hal-hal yang kamu pernah ajarkan ke aku, dan tentang perasaan yang sampai sekarang masih ada.",
      "Kamu nggak harus langsung baca semuanya.",
      "Buka kalau kamu memang lagi siap.",
      "Dan kalau nanti kamu berhenti di tengah jalan pun nggak apa-apa.",
      "Aku cuma berharap, kalau kamu membacanya, kamu bisa membacanya pelan2.",
      "Karena ini bukan sesuatu yang aku tulis dalam satu malam."
    ]
  },
  {
    "id": "page-02",
    "slug": "bab-02-dua-anak",
    "title": "Dulu, kita cuma dua anak yang nggak tau akan sejauh ini",
    "subtitle": "Awalnya sesederhana itu.",
    "variant": "text",
    "bodyPlaceholder": [
      "Dulu kita cuma kenal dari temen.",
      "Terus lanjut chattingan, saling cerita, saling curhat, sampai akhirnya kita sama-sama mulai punya rasa.",
      "Aku bahkan nggak inget pasti siapa yang lebih dulu suka.",
      "Rasanya kita ngalamin itu bareng-bareng.",
      "Yang paling aku inget justru masa ketika kita masih suka curi-curi waktu buat ketemu. Kadang cuma buat ngobrol sebentar, bertukar kabar, atau sekadar bisa lihat satu sama lain.",
      "Waktu itu kita masih MTs.",
      "Kita pernah sembunyi2 buat ketemu, tuker surat, kasih barang-barang kecil yang mungkin sekarang kelihatannya sederhana banget.",
      "Tapi waktu itu hal-hal kecil itu cukup buat bikin kita senyum.",
      "Dan tanpa kita sadari, dari hal-hal kecil itu kita tumbuh bareng.",
      "Kita nggak pernah tau waktu itu kalau dua anak yang cuma suka saling curhat ini akhirnya bakal berjalan sejauh tujuh tahun."
    ]
  },
  {
    "id": "page-03",
    "slug": "bab-03-mengingat-kita",
    "title": "Kalau aku mengingat kita",
    "subtitle": "Aku selalu ingat hal-hal kecil.",
    "variant": "text",
    "bodyPlaceholder": [
      "Kalau aku mengingat kita, ternyata yang paling sering muncul bukan kejadian besar.",
      "Justru hal-hal kecil.",
      "Aku inget masa kelas 12.",
      "Hampir tiap sore kita jalan-jalan. Kadang beli makan, beli jajan, atau cuma muter2 nggak jelas tanpa tujuan.",
      "Nggak ada sesuatu yang istimewa sebenarnya.",
      "Tapi waktu itu aku bahagia banget.",
      "Sampai kadang aku pengen bisa ngestuck di waktu itu aja.",
      "Aku inget kita pernah menerobos hujan sore2 cuma buat jalan-jalan.",
      "Bajuku sampai basah kuyup karena aku berusaha nutupin kamu dari hujan, dan malamnya aku malah demam.",
      "Kalau dipikir sekarang lucu juga.",
      "Tapi itu salah satu kenangan yang paling aku inget.",
      "Aku inget jalan-jalan malam menelusuri jalanan Kudus setelah les di GO.",
      "Aku inget Muria cuma karena kita pengen cari pentol.",
      "Aku inget perjalanan Jepara-Semarang.",
      "Mampir Indomaret cuma buat beli sesuatu.",
      "Jalan tanpa tujuan.",
      "VC malam.",
      "Berteduh waktu hujan.",
      "Jalan-jalan di mall.",
      "Photo booth.",
      "Lihat city lights.",
      "Foto-foto random yang sampai sekarang masih ada di Google Photos.",
      "Dulu semua itu mungkin terasa biasa.",
      "Sekarang aku baru sadar, justru hal-hal sederhana itu yang paling susah diganti."
    ]
  },
  {
    "id": "page-04",
    "slug": "bab-04-melihat-diri-sendiri",
    "title": "Setelah semuanya berhenti, aku mulai melihat diriku sendiri",
    "subtitle": "Untuk pertama kalinya aku benar-benar berhenti dan melihat ke belakang.",
    "variant": "text",
    "bodyPlaceholder": [
      "Setelah semuanya berhenti, aku punya banyak waktu untuk mikir.",
      "Bukan cuma mikirin kenapa kita bisa sampai di titik ini.",
      "Tapi juga mikirin diriku sendiri.",
      "Aku mulai sadar kalau selama ini aku sering merasa sudah melakukan yang terbaik.",
      "Dan mungkin memang aku berusaha.",
      "Tapi sekarang aku ngerti, **niat baik dan dampak yang dirasakan orang lain itu nggak selalu sama.**",
      "Aku bisa merasa sedang perhatian, tapi mungkin kamu tetap merasa sendirian.",
      "Aku bisa merasa sedang memahami kesibukanmu, tapi mungkin kamu tetap merasa jauh.",
      "Aku bisa merasa sudah memberikan jawaban yang masuk akal, tapi ternyata itu bukan jawaban yang kamu butuhkan.",
      "Dan bagian itu yang paling banyak aku pikirkan.",
      "Aku nggak mau menyalahkan jarak.",
      "Aku nggak mau menyalahkan kesibukanmu.",
      "Aku juga nggak mau menyalahkan kamu.",
      "Aku cuma pengen jujur sama diriku sendiri tentang bagian mana dari diriku yang memang perlu diperbaiki."
    ]
  },
  {
    "id": "page-05",
    "slug": "bab-05-tentang-perasaanmu",
    "title": "Tentang perasaanmu yang dulu sering nggak aku mengerti",
    "subtitle": "Ini mungkin salah satu hal yang paling aku sesali.",
    "variant": "text",
    "bodyPlaceholder": [
      "Aku sekarang sadar, dulu aku sering terlalu cepat mencari jawaban sebelum benar-benar memahami perasaanmu.",
      "Ketika kamu bilang:",
      "**“Aku kok ngerasa jauh gitu sama kamu ya.”**",
      "Aku malah menjelaskan kalau kita sama-sama punya kesibukan, kamu sedang PLT, dan kita memang sedang menjalani banyak hal.",
      "Padahal sekarang aku sadar...",
      "Mungkin waktu itu kamu nggak sedang meminta penjelasan.",
      "Kamu cuma sedang bilang:",
      "**“Aku merasa jauh.”**",
      "Dan mungkin jawaban yang kamu butuhkan waktu itu bukan penjelasan dari aku.",
      "Mungkin kamu cuma butuh aku bilang:",
      "**“Kamu ngerasa jauh yaa? Bagian mana yang paling kerasa buat kamu?”**",
      "Aku baru ngerti sekarang.",
      "Kadang seseorang nggak butuh kita langsung menyelesaikan perasaannya.",
      "Kadang dia cuma butuh didengar.",
      "Aku terlalu sering berpikir dari sisi logika, sementara kamu sedang berbicara dari sisi perasaan.",
      "Bukan karena aku nggak peduli.",
      "Aku cuma belum cukup ngerti cara mencintai seseorang dari sisi yang kamu butuhkan.",
      "Dan aku minta maaf untuk itu."
    ]
  },
  {
    "id": "page-06",
    "slug": "bab-06-yang-dulu-diajarkan",
    "title": "Hal-hal yang dulu kamu ajarkan",
    "subtitle": "Banyak yang baru sekarang benar-benar aku pahami.",
    "variant": "text",
    "bodyPlaceholder": [
      "Aku masih inget kamu pernah bilang:",
      "**“Ya gimana caranya kamu diruang aku sendiri itu, aku tetep bisa inget km.”**",
      "Dulu mungkin aku belum benar-benar memahami kalimat itu.",
      "Sekarang aku mulai ngerti.",
      "Aku harus belajar membuat orang yang aku sayang merasa **diingat**, bukan cuma dicari.",
      "Kamu juga pernah ngajarin aku untuk mengolah kata-kata dengan baik.",
      "Memahami dari hati.",
      "Memikirkan sesuatu itu bukan cuma soal benar atau salah menurut logikaku, tapi juga bagaimana sesuatu itu diterima oleh orang lain.",
      "Kamu pernah bilang aku jangan terlalu idealis.",
      "Aku harus keluar dari zona nyaman.",
      "Aku harus lebih perhatian.",
      "Kalau punya sesuatu, kalau bisa berbagi ya berbagi.",
      "Jangan terlalu memikirkan diri sendiri.",
      "Dan mungkin dulu aku mendengar semuanya sebagai nasihat satu per satu.",
      "Sekarang aku melihat semuanya seperti satu kesatuan.",
      "Kamu sebenarnya sedang ngajarin aku bagaimana menjadi seseorang yang lebih peka terhadap orang yang aku sayang.",
      "Dan ternyata banyak dari hal itu memang masih harus aku pelajari."
    ]
  },
  {
    "id": "page-07",
    "slug": "bab-07-belajar-dari-banyak-hal",
    "title": "Aku belajar dari banyak hal",
    "subtitle": "Bukan untuk mencari siapa yang salah.",
    "variant": "text",
    "bodyPlaceholder": [
      "Selama sekitar sebulan ini aku benar-benar banyak belajar.",
      "Aku baca banyak hal.",
      "Aku dengerin berbagai sudut pandang.",
      "Aku coba memahami lagi tentang komunikasi, tentang hubungan, tentang bagaimana seseorang menerima perhatian, tentang emosi, dan tentang kesalahan-kesalahan yang mungkin selama ini nggak aku sadari.",
      "Bukan buat mencari pembenaran.",
      "Bukan buat menentukan siapa yang paling salah.",
      "Tapi karena aku pengen ngerti.",
      "Aku mulai belajar satu pola yang sekarang terus aku coba ingat:",
      "**Dengar → Validasi → Gali → Baru cari solusi.**",
      "Bukan:",
      "**Dengar → Analisis → Jelaskan → Selesaikan.**",
      "Aku belajar untuk bertanya sebelum berasumsi.",
      "Belajar untuk memahami sebelum menjelaskan.",
      "Belajar untuk menerima kalau sudut pandangku nggak selalu menjadi satu-satunya yang benar.",
      "Dan yang paling penting, aku belajar bahwa ketika seseorang yang aku sayang sedang merasa berat, aku nggak harus selalu punya jawaban.",
      "Kadang aku cuma perlu ada."
    ]
  },
  {
    "id": "page-08",
    "slug": "bab-08-belum-berubah",
    "title": "Aku nggak mau bilang aku sudah berubah",
    "subtitle": "Aku nggak mau menjanjikan sesuatu yang belum bisa aku buktikan.",
    "variant": "text",
    "bodyPlaceholder": [
      "Aku nggak mau bilang:",
      "**“Aku sudah berubah.”**",
      "Karena aku rasa kalimat itu terlalu mudah diucapkan.",
      "Aku juga nggak mau bilang aku bakal jadi sempurna.",
      "Aku masih manusia.",
      "Aku masih bisa salah.",
      "Tapi sekarang setidaknya aku sudah lebih ngerti bagian mana dari diriku yang harus aku perbaiki.",
      "Aku sedang belajar lebih peka.",
      "Belajar lebih bisa mendengarkan.",
      "Belajar nggak buru-buru memberikan solusi.",
      "Belajar membedakan kapan seseorang cuma ingin didengar dan kapan dia memang meminta pendapat.",
      "Belajar nggak terlalu idealis sama pikiranku sendiri.",
      "Belajar lebih berani menunjukkan perasaan.",
      "Belajar menjadi seseorang yang bisa membuat orang yang aku sayang merasa aman dan nyaman.",
      "Aku nggak tau nanti perubahan ini akan membawa aku ke mana.",
      "Tapi aku tau aku nggak mau berhenti di penyesalan.",
      "Aku pengen semua yang terjadi ini benar-benar membuatku menjadi orang yang lebih baik.",
      "Bukan cuma untuk kamu.",
      "Tapi juga untuk diriku sendiri dan orang-orang yang akan ada dalam hidupku nanti.",
      "Dan kalau boleh berharap, aku tetap pengen bareng kamu saat aku sudah jadi lebih baik nanti."
    ]
  },
  {
    "id": "page-09",
    "slug": "bab-09-maaf",
    "title": "Maaf",
    "subtitle": "Satu per satu.",
    "variant": "text",
    "bodyPlaceholder": [
      "Aku minta maaf.",
      "Karena ada saatnya aku nggak cukup mendengar kamu.",
      "Karena aku terlalu cepat memikirkan maksudku sendiri.",
      "Karena ada saatnya kamu mungkin cuma ingin dipahami, tapi aku malah memberikan penjelasan.",
      "Karena aku kurang sering menginisiasi VC dan membuat komunikasi kita lebih banyak kamu yang memulai.",
      "Karena aku kurang bisa memahami masalah emosionalmu.",
      "Karena aku kurang bisa membuatmu merasa nyaman ketika kita sedang LDR.",
      "Karena aku terlalu takut mengganggu ketika kamu sibuk, sampai akhirnya mungkin justru membuat jarak di antara kita semakin terasa.",
      "Aku minta maaf untuk semua kekuranganku selama tujuh tahun.",
      "Untuk kesalahan yang aku sadari.",
      "Dan untuk kesalahan yang mungkin baru akan aku pahami setelah ini.",
      "Aku juga minta maaf untuk semua hal yang pernah membuatmu capek, kecewa, merasa sendiri, atau merasa nggak cukup dimengerti.",
      "Aku nggak bisa mengulang waktu.",
      "Tapi aku nggak mau semua ini berhenti cuma sebagai penyesalan."
    ]
  },
  {
    "id": "page-10",
    "slug": "bab-10-tujuh-tahun-disyukuri",
    "title": "Tujuh tahun yang aku syukuri",
    "subtitle": "Kalau ditanya apakah aku menyesal pernah memilih kamu, jawabannya nggak.",
    "variant": "text",
    "bodyPlaceholder": [
      "Tujuh tahun itu bukan waktu yang sebentar buat aku.",
      "Kita tumbuh bareng.",
      "Dari dua anak yang awalnya cuma saling curhat, sampai akhirnya menjalani banyak fase kehidupan bersama.",
      "Aku pernah bahagia banget sama kamu.",
      "Aku pernah merasa punya partner yang selalu ada dan mendukungku.",
      "Aku pernah merasa punya seseorang yang bisa aku ceritain banyak hal.",
      "Dan aku bersyukur pernah merasakan semua itu.",
      "Aku nggak mau menganggap tujuh tahun kita gagal hanya karena akhirnya kita sampai di titik ini.",
      "Ada bagian yang menyakitkan.",
      "Ada kesalahan.",
      "Ada hal-hal yang seharusnya bisa aku lakukan lebih baik.",
      "Tapi ada juga begitu banyak hal baik yang akan selalu aku syukuri.",
      "Kalau waktu bisa diulang dan aku kembali menjadi diriku yang dulu...",
      "Aku rasa aku tetap akan memilih kamu.",
      "Bukan karena aku ingin mengubah akhir cerita.",
      "Tapi karena tujuh tahun bersamamu tetap menjadi bagian hidup yang sangat berarti buat aku."
    ]
  },
  {
    "id": "page-11",
    "slug": "bab-11-hal-kecil-yang-tinggal",
    "title": "Hal-hal kecil tentang kamu yang masih tinggal",
    "subtitle": "Kadang yang paling susah hilang justru yang paling sederhana.",
    "variant": "scrapbook",
    "bodyPlaceholder": [
      "Ada banyak hal tentang kamu yang masih tinggal.",
      "Nomi.",
      "Nopi.",
      "Lego bunga-bunga.",
      "Bunga yang pernah aku kasih.",
      "Surat-surat kecil.",
      "Hadiah-hadiah yang pernah kita tukarkan.",
      "Foto random.",
      "Foto perjalanan.",
      "Panggilan **“noney”**.",
      "Hal-hal kecil yang mungkin buat orang lain nggak berarti apa-apa.",
      "Tapi buat aku punya cerita sendiri.",
      "Kadang aku membuka Google Photos dan menemukan foto yang bahkan mungkin sudah lama nggak aku lihat.",
      "Terus tiba-tiba aku inget lagi tempatnya.",
      "Hari itu.",
      "Obrolannya.",
      "Atau cuma perasaan waktu itu.",
      "Aku nggak mau menyimpan semua itu untuk membuat diriku terus hidup di masa lalu.",
      "Aku cuma nggak mau berpura-pura bahwa semua itu nggak pernah berarti.",
      "Karena memang berarti."
    ]
  },
  {
    "id": "page-12",
    "slug": "bab-12-tentang-kamu",
    "title": "Tentang kamu",
    "subtitle": "Kenapa selama itu aku memilih kamu.",
    "variant": "text",
    "bodyPlaceholder": [
      "Aku suka sifat lucumu.",
      "Aku suka sifat manjamu.",
      "Aku suka ketika kamu membutuhkan aku.",
      "Aku suka cara kamu menyayangiku ketika aku sehat maupun ketika aku sakit.",
      "Aku suka perhatian-perhatian kecilmu.",
      "Memanggilku “noney”.",
      "Mengingatkanku ketika aku salah.",
      "Memberikan saran tentang kehidupanku.",
      "Bahkan kadang hal yang dulu mungkin terasa biasa, sekarang baru terasa berharga.",
      "Kamu juga orang yang lembut.",
      "Aku tahu kamu nggak cocok dibentak.",
      "Nggak cocok diajak bicara dengan nada tinggi.",
      "Dan seharusnya aku lebih memahami itu.",
      "Tapi lebih dari semua sifat itu, aku nyaman sama kamu karena dulu kamu bisa membuat aku merasa aman ketika bercerita.",
      "Aku bisa cerita apa aja.",
      "Entah akhirnya kita ketawa, serius, atau cuma ngobrol nggak jelas.",
      "Rasanya nyaman.",
      "Kamu bukan cuma pasangan buat aku.",
      "Kamu partner seperjalanan.",
      "Seseorang yang membuat hidupku terasa lebih menyenangkan dan lebih berarti.",
      "Dan mungkin itu juga alasan kenapa kehilangan kamu terasa sebesar ini."
    ]
  },
  {
    "id": "page-13",
    "slug": "bab-13-kalau-suatu-hari",
    "title": "Kalau suatu hari...",
    "subtitle": "Ini bukan permintaan. Cuma sebuah harapan.",
    "variant": "text",
    "bodyPlaceholder": [
      "Kalau suatu hari nanti kita dipertemukan lagi...",
      "Aku nggak tau kita akan menjadi apa.",
      "Aku juga nggak tau apakah kamu masih akan melihat aku dengan cara yang sama.",
      "Tapi kalau suatu hari kamu memberikan kesempatan itu, aku nggak ingin sekadar kembali ke hubungan kita yang dulu.",
      "Aku ingin kita memulai sesuatu yang baru.",
      "Dengan dua orang yang sudah belajar dari apa yang pernah terjadi.",
      "Aku ingin bisa lebih mengerti kamu.",
      "Lebih mendengarkan.",
      "Lebih peka.",
      "Lebih bisa membuat kamu merasa aman.",
      "Aku ingin ketika kamu cerita, kamu nggak lagi merasa harus menjelaskan berkali-kali supaya aku mengerti.",
      "Aku ingin ketika dunia kamu sedang berat dan rasanya nggak ada yang mendukungmu, kamu tau ada seseorang yang bisa mendengarkanmu tanpa langsung menghakimi atau buru-buru mencari solusi.",
      "Aku ingin menjadi tempat yang nyaman untuk kamu pulang.",
      "Tapi semua itu hanya kalau suatu hari kamu sendiri memang menginginkannya.",
      "Aku nggak akan memaksamu."
    ]
  },
  {
    "id": "page-14",
    "slug": "bab-14-jalan-berbeda",
    "title": "Tapi kalau ternyata jalan kita memang berbeda",
    "subtitle": "Karena pilihan itu tetap milikmu.",
    "variant": "text",
    "bodyPlaceholder": [
      "Aku masih berharap.",
      "Aku nggak mau bohong soal itu.",
      "Tapi aku juga sadar, berharap bukan berarti aku berhak meminta kamu kembali.",
      "Kalau ternyata jalan kita memang berbeda, aku mungkin akan tetap sedih.",
      "Mungkin tetap rindu.",
      "Mungkin butuh waktu yang panjang untuk benar-benar terbiasa.",
      "Tapi aku nggak ingin cintaku berubah menjadi sesuatu yang membuat kamu merasa harus memilih aku.",
      "Kamu punya hidupmu sendiri.",
      "Kamu punya cita-citamu.",
      "Kamu punya jalan yang ingin kamu jalani.",
      "Dan aku ingin kamu bahagia di jalan itu.",
      "Bahkan kalau suatu hari kebahagiaan itu ternyata bukan bersamaku.",
      "Aku mungkin nggak bisa langsung menerima semuanya dengan mudah.",
      "Tapi aku akan belajar.",
      "Karena mencintai seseorang juga berarti menghargai pilihannya."
    ]
  },
  {
    "id": "page-15",
    "slug": "bab-15-terima-kasih",
    "title": "Terima kasih",
    "subtitle": "Untuk tujuh tahun yang pernah kita punya.",
    "variant": "text",
    "bodyPlaceholder": [
      "Terima kasih sudah pernah memilih aku.",
      "Terima kasih sudah pernah menjadi tempatku bercerita.",
      "Terima kasih sudah pernah mendengarkan ceritaku.",
      "Terima kasih untuk surat-surat kecil.",
      "Untuk hadiah-hadiah kecil.",
      "Untuk martabak.",
      "Untuk pentol.",
      "Untuk Muria.",
      "Untuk jalan-jalan di Kudus.",
      "Untuk les dan perjalanan setelahnya.",
      "Untuk Jepara-Semarang.",
      "Untuk berhenti di Indomaret.",
      "Untuk sore-sore kelas 12 yang cuma muter2 tanpa tujuan.",
      "Untuk hujan.",
      "Untuk VC malam.",
      "Untuk photo booth.",
      "Untuk city lights.",
      "Untuk foto-foto random.",
      "Untuk semua tawa.",
      "Untuk semua obrolan.",
      "Bahkan untuk semua pertengkaran dan air mata yang akhirnya mengajarkan sesuatu kepadaku.",
      "Dan terutama...",
      "Terima kasih karena selama tujuh tahun kamu sudah menjadi bagian dari hidupku."
    ]
  },
  {
    "id": "page-16",
    "slug": "bab-16-mengingat-aku",
    "title": "Kalau suatu hari kamu mengingat aku",
    "subtitle": "Semoga bukan cuma akhirnya yang kamu ingat.",
    "variant": "text",
    "bodyPlaceholder": [
      "Kalau suatu hari nanti kamu mengingat aku...",
      "Aku nggak ingin kamu cuma mengingat bagaimana semuanya berakhir.",
      "Kalau bisa, ingat juga dua anak yang dulu saling curhat dan nggak tau akan berjalan sejauh ini.",
      "Ingat surat-surat kecil.",
      "Ingat sore-sore kelas 12.",
      "Ingat kita yang cuma keluar buat beli jajan.",
      "Ingat jalanan Kudus setelah les GO.",
      "Ingat Muria dan pentol.",
      "Ingat hujan yang bikin bajuku basah sampai demam.",
      "Ingat saat kamu tetap ingin menjengukku dari Kudus ketika aku dirawat di Demak.",
      "Ingat semua hal kecil yang pernah bikin kita ketawa.",
      "Nggak perlu merasa bersalah.",
      "Nggak perlu merasa terbebani.",
      "Aku cuma berharap kalau suatu hari kamu mengingatku, yang muncul bukan cuma rasa sakit.",
      "Semoga ada sedikit senyum juga.",
      "Karena ketika aku mengingat kamu, meskipun sekarang ada rasa sakitnya, aku tetap masih bisa menemukan banyak hal yang membuatku tersenyum."
    ]
  },
  {
    "id": "page-17",
    "slug": "bab-17-dari-aku-yang-sekarang",
    "title": "Untuk kamu, dari aku yang sekarang",
    "subtitle": "Ada banyak hal yang dulu nggak sempat aku katakan.",
    "variant": "text",
    "bodyPlaceholder": [
      "Aku nggak tau kamu akan melihat aku seperti apa setelah membaca ini.",
      "Aku juga nggak tau apakah tulisan ini akan mengubah sesuatu atau nggak.",
      "Dan aku nggak mau menjadikan tulisan ini sebagai alat untuk mengubah keputusanmu.",
      "Aku cuma ingin kamu tau bahwa aku benar-benar belajar dari semuanya.",
      "Dari kesalahan yang aku lakukan.",
      "Dari hal-hal yang pernah kamu keluhkan.",
      "Dari nasihat yang pernah kamu kasih.",
      "Dari semua hal yang dulu mungkin aku dengar, tapi belum benar-benar aku pahami.",
      "Sekarang aku sedang berusaha membawa semuanya ke dalam hidupku.",
      "Aku ingin menjadi orang yang lebih peka.",
      "Lebih bisa mendengar.",
      "Lebih bisa memahami.",
      "Lebih bisa menyesuaikan diri dengan orang yang aku sayang.",
      "Dan kalau suatu hari aku kembali mencintai seseorang, aku ingin mencintai dia dengan cara yang lebih sehat dari dulu.",
      "Tapi kalau suatu hari orang itu ternyata masih kamu...",
      "Aku akan sangat bersyukur.",
      "Karena jujur, sampai sekarang aku masih sayang.",
      "Masih mencintai kamu.",
      "Dan masih menyayangi kamu sepenuh hati."
    ]
  },
  {
    "id": "page-18",
    "slug": "bab-18-halaman-terakhir",
    "title": "Halaman terakhir",
    "subtitle": "Pelan-pelan sampai sini.",
    "variant": "text",
    "bodyPlaceholder": [
      "Aku nggak tau setelah halaman ini selesai, apa yang akan kamu rasakan.",
      "Mungkin biasa aja.",
      "Mungkin sedih.",
      "Mungkin marah.",
      "Mungkin bingung.",
      "Mungkin nggak merasakan apa-apa.",
      "Dan semuanya nggak apa-apa.",
      "Kamu nggak punya kewajiban untuk membalas apa pun setelah membaca ini.",
      "Aku cuma ingin sekali, untuk pertama kalinya, kamu benar-benar tahu semua yang selama ini jarang aku ceritakan.",
      "Aku masih sayang kamu.",
      "Itu nggak berubah.",
      "Tapi sekarang aku juga belajar bahwa sayang nggak selalu berarti harus memaksa seseorang untuk tetap tinggal.",
      "Aku akan tetap membawa semua pelajaran dari tujuh tahun kita.",
      "Tentang mendengarkan.",
      "Tentang memahami.",
      "Tentang perhatian.",
      "Tentang rasa aman.",
      "Tentang bagaimana menjadi seseorang yang bisa menjadi tempat pulang, bukan hanya seseorang yang ingin dicari ketika merasa kehilangan.",
      "Dan kalau suatu hari jalan kita bertemu lagi...",
      "Semoga saat itu kita sudah menjadi dua orang yang lebih siap untuk saling memahami.",
      "Kalau ternyata tidak...",
      "Terima kasih.",
      "Untuk semuanya.",
      "Untuk tujuh tahun.",
      "Untuk pernah menjadi partnerku.",
      "Untuk pernah membuat hidupku terasa lebih menyenangkan.",
      "Untuk pernah menjadi tempatku bercerita.",
      "Dan untuk pernah membuatku merasa punya rumah di seseorang.",
      "Aku akan selalu menghargai itu.",
      "**Jaga diri baik-baik yaa.**",
      "**— aku**"
    ]
  },
  {
    "id": "page-19",
    "slug": "bab-19-album-kenangan",
    "title": "Album Kenangan",
    "subtitle": "Tujuh tahun dalam bingkai-bingkai kecil.",
    "variant": "scrapbook",
    "bodyPlaceholder": [
      "Ada hal-hal yang nggak bisa dijelaskan dengan kata-kata, tapi tersimpan rapi di setiap sudut foto ini.",
      "Dari masa awal di MTs, hari-hari di MAN, sudut-sudut kota, sampai perjalanan yang pernah kita lewati bareng.",
      "Setiap foto di bawah punya ceritanya sendiri. Terima kasih untuk tujuh tahun yang pernah ada."
    ]
  }
]

/** Jumlah halaman total. Dipakai footer & indikator navigasi. */
export const totalChapters = chapters.length

/** Cari bab berdasarkan `id` (mis. 'page-07'). */
export function getChapterById(id: string): Chapter | undefined {
  return chapters.find((chapter) => chapter.id === id)
}
