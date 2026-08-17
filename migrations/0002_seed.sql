-- SAPALA 67 — seed content (articles, gallery, events)
-- Admin user is created on first run via /admin/setup (no hardcoded password).

INSERT OR IGNORE INTO articles (slug, title, category, excerpt, content, author, image, read_time, date) VALUES
('persiapan-pendakian-gunung-untuk-pemula', 'Persiapan Pendakian Gunung untuk Pemula', 'Tips & Trik',
 'Panduan lengkap mempersiapkan diri untuk pendakian pertama Anda, mulai dari peralatan hingga mental.',
 'Pendakian pertama adalah momen yang tak terlupakan. Persiapan yang matang menjadi kunci utama agar perjalanan aman dan menyenangkan.

Kenali medan dan batas kemampuan diri. Pastikan setiap perlengkapan — sepatu, jaket, headlamp, dan logistik — dalam kondisi baik. Latih fisik secara bertahap sebelum hari pendakian.

Yang tak kalah penting, jaga alam sebagaimana ia menjaga kita. Bawa kembali seluruh sampah dan tinggalkan jejak sekecil mungkin.',
 'Ahmad Fauzi', '/images/articles/pendakian.jpg', '5 menit', '2024-03-15'),

('leave-no-trace-7-prinsip-menjaga-alam', 'Leave No Trace: 7 Prinsip Menjaga Alam', 'Konservasi',
 'Memahami dan menerapkan tujuh prinsip Leave No Trace dalam setiap kegiatan alam bebas.',
 'Leave No Trace adalah etika dasar setiap pencinta alam: meninggalkan jejak sekecil mungkin demi kelestarian lingkungan.

Tujuh prinsipnya mencakup perencanaan matang, berjalan di jalur yang benar, mengelola sampah, menghormati flora dan fauna, serta meminimalkan dampak api unggun.

Bagi SAPALA 67, menjaga alam adalah wujud nyata dari moto "Mengenalimu untuk Mengenali-Nya".',
 'Rizky Hidayat', '/images/articles/lnt.jpg', '7 menit', '2024-02-20'),

('navigasi-darat-kompas-dan-peta', 'Navigasi Darat: Kompas dan Peta', 'Teknik',
 'Belajar navigasi darat menggunakan kompas dan peta topografi untuk petualangan yang lebih aman.',
 'Kemampuan navigasi darat adalah keterampilan wajib di alam bebas, terlebih saat sinyal dan GPS tak dapat diandalkan.

Pelajari cara membaca peta topografi, menentukan azimuth, serta mengorientasikan peta dengan kompas. Latihan rutin membuat keterampilan ini menjadi naluri.

Kompas pada lambang SAPALA 67 melambangkan arah dan cita-cita luhur — penunjuk jalan dalam setiap langkah.',
 'Santri Senior', '/images/articles/navigasi.jpg', '8 menit', '2024-01-10'),

('packing-carrier-yang-benar', 'Packing Carrier yang Benar', 'Tips & Trik',
 'Tips mengemas carrier yang efisien dan nyaman untuk pendakian agar perjalanan lebih lancar.',
 'Carrier yang dikemas dengan benar membuat beban terasa lebih ringan dan tubuh lebih seimbang di medan menanjak.

Letakkan barang berat dekat punggung dan setinggi bahu, barang ringan di dasar, serta benda yang sering dipakai di kantong atas.

Gunakan dry bag untuk memisahkan pakaian kering dan basah, dan manfaatkan setiap ruang seefisien mungkin.',
 'Dendi Kurniawan', '/images/articles/packing.jpg', '4 menit', '2024-01-05'),

('p3k-di-alam-bebas', 'Pertolongan Pertama di Alam Bebas (P3K)', 'Keselamatan',
 'Pengetahuan dasar pertolongan pertama yang wajib diketahui setiap pencinta alam.',
 'Di alam bebas, bantuan medis tidak selalu tersedia cepat. Karena itu setiap anggota wajib menguasai dasar P3K.

Pelajari penanganan luka, keseleo, hipotermia, dan dehidrasi. Selalu bawa kotak P3K yang lengkap dan periksa isinya sebelum berangkat.

Ketenangan dan pengambilan keputusan yang tepat sering kali lebih menyelamatkan daripada peralatan itu sendiri.',
 'Dr. Lutfi Hakim', '/images/articles/p3k.jpg', '6 menit', '2023-12-18'),

('sejarah-organisasi-pecinta-alam-indonesia', 'Sejarah Organisasi Pecinta Alam di Indonesia', 'Sejarah',
 'Mengenal sejarah perkembangan organisasi pecinta alam di Indonesia dari masa ke masa.',
 'Gerakan pecinta alam di Indonesia tumbuh sejak era 1960-an dan terus berkembang menjadi wadah pembentukan karakter generasi muda.

Organisasi pecinta alam tidak hanya berpetualang, tetapi juga berperan dalam konservasi, SAR, dan pengabdian masyarakat.

SAPALA 67 hadir sebagai bagian dari semangat itu, memadukan kecintaan pada alam dengan nilai-nilai kepesantrenan.',
 'Tim Redaksi', '/images/articles/sejarah.jpg', '10 menit', '2023-11-25');

INSERT OR IGNORE INTO gallery (src, alt, category, span, sort) VALUES
('/images/gallery/1.jpg', 'Pendakian Gunung', 'Pendakian', 'col-span-2 row-span-2', 1),
('/images/gallery/2.jpg', 'Kemah Bersama', 'Kemah', 'col-span-1 row-span-1', 2),
('/images/gallery/3.jpg', 'Diklat Anggota', 'Diklat', 'col-span-1 row-span-1', 3),
('/images/gallery/4.jpg', 'Penghijauan', 'Konservasi', 'col-span-1 row-span-2', 4),
('/images/gallery/5.jpg', 'Arung Jeram', 'Ekspedisi', 'col-span-1 row-span-1', 5),
('/images/gallery/6.jpg', 'Lomba Panjat Tebing', 'Lomba', 'col-span-2 row-span-1', 6),
('/images/gallery/7.jpg', 'Bakti Sosial', 'Pengabdian', 'col-span-1 row-span-1', 7),
('/images/gallery/8.jpg', 'Latihan Wall Climbing', 'Latihan', 'col-span-1 row-span-1', 8),
('/images/gallery/9.jpg', 'Ekspedisi SAR', 'SAR', 'col-span-1 row-span-1', 9),
('/images/gallery/10.jpg', 'Foto Bersama Anggota', 'Anggota', 'col-span-1 row-span-1', 10);

INSERT OR IGNORE INTO events (slug, title, category, description, content, image, location, start_date, end_date) VALUES
('diksar-angkatan-vii', 'Pendidikan Dasar (Diksar) Angkatan VII', 'Diklat',
 'Pembinaan awal calon anggota: dasar kepencintaan alam, mental, dan fisik.',
 'Diksar Angkatan VII merupakan gerbang utama keanggotaan SAPALA 67. Selama kegiatan, calon anggota dibekali materi navigasi, survival, P3K, serta pembinaan mental dan spiritual.

Kegiatan ditutup dengan pelantikan di alam terbuka sebagai simbol kesiapan mengabdi pada alam dan organisasi.',
 '/images/sapala-ridge-dawn.png', 'Pesantren Persis 67 Benda & Gunung Galunggung', '2025-07-12', '2025-07-15'),

('ekspedisi-gunung-ciremai', 'Ekspedisi Gunung Ciremai', 'Ekspedisi',
 'Pendakian ke puncak Ciremai, mengenang lokasi pelantikan angkatan pertama.',
 'Gunung Ciremai memiliki nilai sejarah istimewa bagi SAPALA 67 — di puncaknya angkatan pertama dilantik pada 2004.

Ekspedisi ini menjadi sarana pelatihan teknis sekaligus napak tilas jejak para pendiri organisasi.',
 '/images/sapala-ridge-dawn.png', 'Gunung Ciremai, Jawa Barat', '2025-08-17', '2025-08-19'),

('baksos-penghijauan-desa-binaan', 'Bakti Sosial & Penghijauan Desa Binaan', 'Pengabdian',
 'Pengabdian masyarakat: penghijauan dan sosialisasi lingkungan di desa binaan.',
 'Sebagai wujud dakwah bi lisanil hal, SAPALA 67 rutin menggelar bakti sosial dan penanaman pohon di desa binaan.

Kegiatan ini mempererat silaturahim dengan masyarakat sekaligus menumbuhkan kepedulian terhadap kelestarian lingkungan.',
 '/images/sapala-ridge-dawn.png', 'Desa Binaan, Tasikmalaya', '2025-09-06', '2025-09-07');
