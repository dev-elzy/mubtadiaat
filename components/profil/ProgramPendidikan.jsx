import Reveal from '../ui/Reveal';

export default function ProgramPendidikan() {
  return (
    <section id="program">
      <div className="wrap">
        <Reveal className="section-head">
          <div className="eyebrow">Arah Pendidikan</div>
          <h2 className="section-title">Empat Pilar Pembinaan <em>Santriwati</em></h2>
        </Reveal>
        
        <Reveal as="ul" className="program-grid" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li className="program-card">
            <div className="program-icon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div>
            <h3>Kitab Salaf</h3>
            <p>Kajian kitab kuning secara klasikal dan berjenjang sebagai fondasi utama keilmuan agama.</p>
          </li>
          <li className="program-card">
            <div className="program-icon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="9"/></svg></div>
            <h3>Madrasah Diniyah</h3>
            <p>Kegiatan belajar mengajar formal yang terstruktur di bawah Madrasah Putri Hidayatul Mubtadiat.</p>
          </li>
          <li className="program-card">
            <div className="program-icon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-4.35-9.5-8.5C.5 8.5 3 5 6.5 5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 3.5 0 6 3.5 4 7.5C19 16.65 12 21 12 21z"/></svg></div>
            <h3>Pembinaan Akhlak</h3>
            <p>Penanaman adab dan kepribadian muslimah sejati dalam keseharian pondok.</p>
          </li>
          <li className="program-card">
            <div className="program-icon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
            <h3>Kesiapan Sosial</h3>
            <p>Membekali santriwati agar berperan aktif menyukseskan dakwah di tengah masyarakat.</p>
          </li>
        </Reveal>

        <Reveal className="section-head" style={{ marginTop: '80px', marginBottom: 0 }}>
          <div className="eyebrow">Jenjang & Unit</div>
          <h2 className="section-title">Satu Atap, <em>Delapan</em> Jenjang Belajar</h2>
        </Reveal>
        
        <Reveal as="ul" className="jenjang-wrap" style={{ listStyle: 'none', padding: 0, margin: 0, marginTop: '44px' }}>
          <li className="jenjang-chip">Madrasah Ibtidaiyah <span className="yrs">6 Th</span></li>
          <li className="jenjang-chip">Madrasah Tsanawiyah <span className="yrs">3 Th</span></li>
          <li className="jenjang-chip">Madrasah Aliyah <span className="yrs">3 Th</span></li>
          <li className="jenjang-chip">Al-Robithoh <span className="yrs">1 Th</span></li>
          <li className="jenjang-chip">Perkuliahan</li>
          <li className="jenjang-chip">Tahfidzil Qur'an</li>
          <li className="jenjang-chip">Tartilil Qur'an</li>
          <li className="jenjang-chip">Bahtsul Masa-il</li>
        </Reveal>
      </div>
    </section>
  );
}
