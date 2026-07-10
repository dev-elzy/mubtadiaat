export const runtime = 'edge';

export default function PrivacyPolicyPage() {
  return (
    <main style={{ background: '#fbf8f1', minHeight: '100vh', padding: '140px 0 80px 0', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      <div className="wrap" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-500)', display: 'block', marginBottom: '8px' }}>
            Kebijakan Privasi
          </span>
          <h1 style={{ fontFamily: '"Fraunces", serif', fontSize: '38px', color: 'var(--teal-900)', fontWeight: '500', margin: 0 }}>
            Kebijakan Privasi
          </h1>
          <div style={{ width: '60px', height: '3px', background: 'var(--gold-500)', margin: '16px auto 0' }}></div>
        </div>

        {/* Content Card */}
        <div style={{ background: '#ffffff', border: '1px solid rgba(173,138,78,0.15)', borderRadius: '20px', padding: '40px', boxShadow: '0 10px 30px rgba(15,43,36,0.03)', color: 'var(--ink)', lineHeight: '1.8' }}>
          
          <p>
            Pondok Pesantren Putri Hidayatul Mubtadiat (P3HM) Lirboyo Kediri berkomitmen penuh untuk melindungi dan menghormati privasi data pribadi Anda sebagai pengunjung situs web resmi kami (<strong>p3hm.my.id</strong>). Dokumen Kebijakan Privasi ini menjelaskan jenis data yang kami kumpulkan, cara kami menggunakannya, serta hak-hak keamanan yang Anda miliki:
          </p>

          <h3 style={{ fontFamily: '"Fraunces", serif', color: 'var(--teal-900)', fontSize: '20px', marginTop: '28px', marginBottom: '12px' }}>
            1. Pengumpulan Informasi Pribadi
          </h3>
          <p>
            Kami hanya mengumpulkan informasi pribadi yang Anda berikan secara sadar dan sukarela melalui fitur interaktif situs kami:
          </p>
          <ul style={{ paddingLeft: '20px', margin: '0 0 20px 0' }}>
            <li>
              <strong>Formulir Kontak (Hubungi Kami)</strong>: Nama Lengkap, Alamat Email, Subjek Pesan, dan isi tulisan Pesan Anda. Data ini dikirim langsung ke basis data kami untuk keperluan merespons pertanyaan Anda.
            </li>
            <li>
              <strong>Kolom Komentar Berita &amp; Dokumentasi</strong>: Nama Lengkap, Alamat Email (opsional), dan isi opini komentar Anda. Nama Anda akan ditampilkan secara publik di samping komentar Anda, sedangkan alamat email disimpan secara internal.
            </li>
          </ul>

          <h3 style={{ fontFamily: '"Fraunces", serif', color: 'var(--teal-900)', fontSize: '20px', marginTop: '28px', marginBottom: '12px' }}>
            2. Penggunaan Data Kunjungan (Analisis Non-Pribadi)
          </h3>
          <p>
            Untuk memverifikasi jumlah pembaca secara real-time dan mencegah manipulasi statistik, situs web kami menggunakan pencatatan kunjungan (*view counter*). Sistem kami mengidentifikasi sidik jari peramban (*visitor hash*) berbasis kombinasi IP Address dan User-Agent perangkat Anda. Informasi ini dienkripsi secara satu arah (*one-way hash* SHA-256) untuk mengenali keunikan kunjungan Anda selama 24 jam tanpa melacak data identitas personal Anda.
          </p>

          <h3 style={{ fontFamily: '"Fraunces", serif', color: 'var(--teal-900)', fontSize: '20px', marginTop: '28px', marginBottom: '12px' }}>
            3. Penggunaan Cookie
          </h3>
          <p>
            Situs kami menggunakan cookie teknis yang terbatas. Bagi pengunjung umum, cookie hanya digunakan untuk kenyamanan penyimpanan sesi ringan. Bagi administrator portal CMS, cookie digunakan secara wajib untuk verifikasi keamanan otentikasi login sesi admin agar mencegah akses tidak sah (*unauthorized access*).
          </p>

          <h3 style={{ fontFamily: '"Fraunces", serif', color: 'var(--teal-900)', fontSize: '20px', marginTop: '28px', marginBottom: '12px' }}>
            4. Keamanan dan Pembagian Informasi
          </h3>
          <p>
            P3HM menjamin bahwa seluruh data kontak dan komentar yang terkumpul disimpan di dalam Database Server yang terlindungi oleh enkripsi industri. Kami **tidak akan pernah** menjual, menyewakan, membagikan, atau menyebarluaskan data pribadi pengunjung kepada pihak ketiga di luar kepentingan administrasi resmi lembaga pesantren.
          </p>

          <h3 style={{ fontFamily: '"Fraunces", serif', color: 'var(--teal-900)', fontSize: '20px', marginTop: '28px', marginBottom: '12px' }}>
            5. Hak Anda atas Data Pribadi
          </h3>
          <p>
            Anda memiliki hak penuh untuk meminta penghapusan komentar atau pesan masuk yang pernah Anda kirimkan ke situs web kami. Hubungi staf administrasi kami melalui saluran WhatsApp resmi yang tertera di halaman Kontak untuk mengajukan permohonan tersebut.
          </p>

          <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid rgba(173,138,78,0.15)', fontSize: '13.5px', color: 'var(--text-tertiary)', textAlign: 'center' }}>
            Terakhir Diperbarui: 10 Juli 2026
          </div>

        </div>

      </div>
    </main>
  );
}
