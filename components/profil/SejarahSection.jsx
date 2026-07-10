import Reveal from '../ui/Reveal';

export default function SejarahSection({ settings = {} }) {
  const eyebrow = settings.sejarahEyebrow || "Sekilas Sejarah";
  const titleHtml = settings.sejarahTitleHtml || "Berawal dari <em>Dua</em> Santri Perdana";
  const p1 = settings.sejarahP1 || "Gagasan mendirikan pesantren khusus putri di lingkungan PP. Lirboyo bermula dari dawuh KH. Mahrus Aly kepada menantu dan putrinya, KH. M. Anwar Manshur dan Ibu Nyai Hj. Ummi Kultsum. Setelah melalui pertimbangan yang matang tentang pentingnya pendidikan agama bagi perempuan, keduanya memutuskan memulai dengan mengajar dua santri putri yang datang dari Jakarta dan Karawang, bersama para khadimat keluarga ndalem.";
  const pullNote = settings.sejarahPullNote || "Wanita adalah tiang bagi bangsanya — semakin kokoh pendidikan yang ia terima, semakin kokoh pula generasi yang ia bentuk.";
  const p2 = settings.sejarahP2 || "Metode pengajian yang semula berbentuk halaqah sederhana kemudian dikembangkan menjadi sistem madrasah berjenjang pada 1407–1408 H, sambil tetap mempertahankan pengajian kitab kuning dengan sistem sorogan dan bandongan di luar jam sekolah. Seiring bertambahnya santri, dibangunlah asrama, MCK, dan gedung madrasah tersendiri — sebelumnya seluruh kegiatan santri masih menyatu dengan ndalem pengasuh.";

  const yr = settings.sejarahYr || "1406 H";
  const yrSub = settings.sejarahYrSub || "15 September 1985 M — resmi berdiri";
  const f1Title = settings.sejarahFounder1Title || "Pendiri & Pengasuh";
  const f1Name = settings.sejarahFounder1Name || "KH. M. Anwar Manshur";
  const f2Title = settings.sejarahFounder2Title || "Mendampingi Sejak Awal";
  const f2Name = settings.sejarahFounder2Name || "Ibu Nyai Hj. Ummi Kultsum";
  const f3Title = settings.sejarahFounder3Title || "Atas Dawuh";
  const f3Name = settings.sejarahFounder3Name || "KH. Mahrus Aly, Pengasuh PP. Lirboyo";

  return (
    <section className="sejarah" id="sejarah">
      <div className="wrap">
        <div className="sejarah-grid">
          
          <Reveal className="founder-card">
            <div className="yr">{yr}</div>
            <div className="yr-sub">{yrSub}</div>
            <div className="founder-row">
              <h5>{f1Title}</h5>
              <p>{f1Name}</p>
            </div>
            <div className="founder-row">
              <h5>{f2Title}</h5>
              <p>{f2Name}</p>
            </div>
            <div className="founder-row">
              <h5>{f3Title}</h5>
              <p>{f3Name}</p>
            </div>
          </Reveal>

          <Reveal className="sejarah-text">
            <div className="eyebrow">{eyebrow}</div>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: titleHtml }} />
            <p style={{ whiteSpace: 'pre-line' }}>{p1}</p>
            <p className="pull-note">{pullNote}</p>
            <p style={{ whiteSpace: 'pre-line' }}>{p2}</p>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
