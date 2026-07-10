export const runtime = 'edge';

export default function TentangKamiPage() {
  return (
    <main style={{ background: '#fbf8f1', minHeight: '100vh', padding: '140px 0 80px 0', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      <div className="wrap" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-500)', display: 'block', marginBottom: '8px' }}>
            Profil Situs
          </span>
          <h1 style={{ fontFamily: '"Fraunces", serif', fontSize: '38px', color: 'var(--teal-900)', fontWeight: '500', margin: 0 }}>
            Tentang Kami
          </h1>
          <div style={{ width: '60px', height: '3px', background: 'var(--gold-500)', margin: '16px auto 0' }}></div>
        </div>

        {/* Content Card */}
        <div style={{ background: '#ffffff', border: '1px solid rgba(173,138,78,0.15)', borderRadius: '20px', padding: '40px', boxShadow: '0 10px 30px rgba(15,43,36,0.03)', color: 'var(--ink)', lineHeight: '1.8' }}>
          
          <p>
            <strong>p3hm.my.id</strong> hadir sebagai portal informasi resmi Pondok Pesantren Putri Hidayatul Mubtadiat (P3HM) Lirboyo Kediri. Website ini menyajikan informasi tentang pondok pesantren secara teks, audio, dan video, yang terbentuk berdasarkan teknologi hipermedia dan hiperteks.
          </p>

          <p>
            Dengan kemajuan informasi dan perkembangan sosial media, <strong>p3hm.my.id</strong> kini hadir dengan berbagai fitur baru yang merupakan percampuran komunikasi media digital. Informasi yang disampaikan diperbarui secara berkelanjutan yang terangkum dalam sejumlah kanal, menjadikannya sebuah portal informasi yang bisa dipercaya.
          </p>

          <p>
            Selain menyajikan informasi, <strong>p3hm.my.id</strong> juga menjadi rumah singgah dunia maya bagi seluruh santri, wali santri, dan alumni Pondok Pesantren Putri Hidayatul Mubtadiat Lirboyo Kediri.
          </p>

        </div>

      </div>
    </main>
  );
}
