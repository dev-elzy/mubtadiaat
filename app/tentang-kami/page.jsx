export const runtime = 'edge';

export default function TentangKamiPage() {
  return (
    <main style={{ background: '#fbf8f1', minHeight: '100vh', padding: '140px 0 80px 0', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      <div className="wrap" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-500)', display: 'block', marginBottom: '8px' }}>
            Profil Kelembagaan
          </span>
          <h1 style={{ fontFamily: '"Fraunces", serif', fontSize: '38px', color: 'var(--teal-900)', fontWeight: '500', margin: 0 }}>
            Tentang Kami
          </h1>
          <div style={{ width: '60px', height: '3px', background: 'var(--gold-500)', margin: '16px auto 0' }}></div>
        </div>

        {/* Content Card */}
        <div style={{ background: '#ffffff', border: '1px solid rgba(173,138,78,0.15)', borderRadius: '20px', padding: '40px', boxShadow: '0 10px 30px rgba(15,43,36,0.03)', color: 'var(--ink)', lineHeight: '1.8' }}>
          
          <h2 style={{ fontFamily: '"Fraunces", serif', color: 'var(--teal-900)', fontSize: '24px', marginTop: 0, marginBottom: '16px' }}>
            Pondok Pesantren Putri Hidayatul Mubtadiat (P3HM)
          </h2>
          <p>
            Pondok Pesantren Putri Hidayatul Mubtadiat (P3HM) Lirboyo merupakan bagian integral dari kompleks pendidikan Pondok Pesantren Lirboyo, Kota Kediri, Jawa Timur. Didirikan khusus untuk mendidik santriwati (putri), P3HM berkomitmen melahirkan generasi muslimah yang kokoh dalam keilmuan agama, berakhlak mulia, serta mandiri secara sosial dan dakwah kemasyarakatan.
          </p>

          <h3 style={{ fontFamily: '"Fraunces", serif', color: 'var(--teal-900)', fontSize: '20px', marginTop: '32px', marginBottom: '12px' }}>
            Visi dan Misi Lembaga
          </h3>
          <p>
            <strong>Visi:</strong> Terwujudnya generasi wanita muslimah salafiyah yang bertafaqquh fid-din, berakhlakul karimah, dan siap mengabdi di tengah-tengah masyarakat berlandaskan akidah Ahlussunnah wal Jama'ah An-Nahdliyah.
          </p>
          <p>
            <strong>Misi:</strong>
          </p>
          <ul style={{ paddingLeft: '20px', margin: '0 0 20px 0' }}>
            <li>Menyelenggarakan pendidikan kajian kitab-kitab salaf (kuning) secara terstruktur dan mendalam.</li>
            <li>Menanamkan nilai-nilai kedisiplinan ibadah, kesopanan, dan kepribadian luhur khas pesantren Lirboyo.</li>
            <li>Membekali santriwati dengan kecakapan hidup (life skills) serta kesiapan mental untuk membina umat.</li>
            <li>Memelihara tradisi keilmuan Islam klasik sembari bersikap adaptif terhadap perkembangan kemajuan zaman yang positif.</li>
          </ul>

          <h3 style={{ fontFamily: '"Fraunces", serif', color: 'var(--teal-900)', fontSize: '20px', marginTop: '32px', marginBottom: '12px' }}>
            Metodologi Pendidikan
          </h3>
          <p>
            Pendidikan di P3HM berpusat pada sistem klasikal Madrasah Diniyah Hidayatul Mubtadiat serta kajian non-klasikal (sorogan dan bandongan). Kurikulum menitikberatkan pada penguasaan tata bahasa Arab (Nahwu, Sharaf), Fikih ibadah dan kemasyarakatan, Tauhid (akidah), Akhlak-Tasawuf, serta Tafsir dan Hadis. Melalui bimbingan langsung para Masyayikh dan Asatidz, santriwati dididik untuk memahami teks-teks klasik Islam secara mendalam guna menjawab berbagai problematika umat kontemporer.
          </p>

          <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid rgba(173,138,78,0.15)', textAlign: 'center' }}>
            <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--gold-500)', fontWeight: '600' }}>
              "Mendidik dengan Hati, Merawat Tradisi Keilmuan Islami."
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}
