export const runtime = 'edge';

export default function DisclaimerPage() {
  return (
    <main style={{ background: '#fbf8f1', minHeight: '100vh', padding: '140px 0 80px 0', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      <div className="wrap" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-500)', display: 'block', marginBottom: '8px' }}>
            Ketentuan Situs
          </span>
          <h1 style={{ fontFamily: '"Fraunces", serif', fontSize: '38px', color: 'var(--teal-900)', fontWeight: '500', margin: 0 }}>
            Disclaimer (Penafian)
          </h1>
          <div style={{ width: '60px', height: '3px', background: 'var(--gold-500)', margin: '16px auto 0' }}></div>
        </div>

        {/* Content Card */}
        <div style={{ background: '#ffffff', border: '1px solid rgba(173,138,78,0.15)', borderRadius: '20px', padding: '40px', boxShadow: '0 10px 30px rgba(15,43,36,0.03)', color: 'var(--ink)', lineHeight: '1.8' }}>
          
          <p>
            Dengan menggunakan informasi yang tersedia di situs web resmi Pondok Pesantren Putri Hidayatul Mubtadiat (P3HM) Lirboyo Kediri (<strong>p3hm.my.id</strong>), Anda telah menyetujui seluruh ketentuan penafian (disclaimer) di bawah ini:
          </p>

          <h3 style={{ fontFamily: '"Fraunces", serif', color: 'var(--teal-900)', fontSize: '20px', marginTop: '28px', marginBottom: '12px' }}>
            Akurasi Informasi
          </h3>
          <p>
            Seluruh konten, pengumuman, berita, dan jadwal kegiatan yang disajikan di situs web ini bertujuan untuk memberikan informasi umum mengenai profil pondok pesantren, pendaftaran santri baru, serta kegiatan pendidikan. Kami berupaya menjaga keakuratan informasi tersebut. Namun, P3HM tidak memberikan jaminan mutlak bahwa semua informasi yang dipublikasikan bebas dari kesalahan ketik, keterlambatan pembaruan, atau ketidaklengkapan data yang bersifat non-krusial.
          </p>

          <h3 style={{ fontFamily: '"Fraunces", serif', color: 'var(--teal-900)', fontSize: '20px', marginTop: '28px', marginBottom: '12px' }}>
            Tautan Pihak Ketiga
          </h3>
          <p>
            Situs web ini mungkin berisi tautan eksternal ke situs pihak ketiga (seperti formulir registrasi eksternal, peta digital, atau media penyimpanan gambar Cloudinary). Tautan tersebut disediakan murni untuk kemudahan navigasi pengunjung. Kami tidak bertanggung jawab atas kebijakan privasi, akurasi, keandalan, atau konten yang terdapat pada situs web eksternal tersebut. Kunjungan Anda ke situs eksternal sepenuhnya menjadi risiko dan tanggung jawab pribadi Anda.
          </p>

          <h3 style={{ fontFamily: '"Fraunces", serif', color: 'var(--teal-900)', fontSize: '20px', marginTop: '28px', marginBottom: '12px' }}>
            Batasan Tanggung Jawab
          </h3>
          <p>
            Pondok Pesantren Putri Hidayatul Mubtadiat beserta jajaran pengurus, staf administrasi, dan pengelola situs tidak bertanggung jawab atas segala bentuk kerugian langsung, tidak langsung, atau dampak lanjutan yang timbul dari akses penggunaan informasi atau ketidakmampuan mengakses bagian tertentu dari situs web ini.
          </p>

          <h3 style={{ fontFamily: '"Fraunces", serif', color: 'var(--teal-900)', fontSize: '20px', marginTop: '28px', marginBottom: '12px' }}>
            Perubahan Ketentuan
          </h3>
          <p>
            Pihak pesantren berhak sepenuhnya untuk melakukan pembaruan, modifikasi, penghapusan konten, atau perubahan ketentuan penggunaan situs web tanpa pemberitahuan tertulis terlebih dahulu demi menyesuaikan dengan perkembangan administrasi dan kebijakan internal lembaga.
          </p>

          <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid rgba(173,138,78,0.15)', fontSize: '13.5px', color: 'var(--text-tertiary)', textAlign: 'center' }}>
            Terakhir Diperbarui: 10 Juli 2026
          </div>

        </div>

      </div>
    </main>
  );
}
