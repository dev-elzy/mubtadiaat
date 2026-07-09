import Reveal from '../ui/Reveal';

export default function SejarahSection() {
  return (
    <section className="sejarah" id="sejarah">
      <div className="wrap">
        <div className="sejarah-grid">
          
          <Reveal className="founder-card">
            <div className="yr">1406 H</div>
            <div className="yr-sub">15 September 1985 M — resmi berdiri</div>
            <div className="founder-row">
              <h5>Pendiri &amp; Pengasuh</h5>
              <p>KH. M. Anwar Manshur</p>
            </div>
            <div className="founder-row">
              <h5>Mendampingi Sejak Awal</h5>
              <p>Ibu Nyai Hj. Ummi Kultsum</p>
            </div>
            <div className="founder-row">
              <h5>Atas Dawuh</h5>
              <p>KH. Mahrus Aly, Pengasuh PP. Lirboyo</p>
            </div>
          </Reveal>

          <Reveal className="sejarah-text">
            <div className="eyebrow">Sekilas Sejarah</div>
            <h2 className="section-title">Berawal dari <em>Dua</em> Santri Perdana</h2>
            <p>Gagasan mendirikan pesantren khusus putri di lingkungan PP. Lirboyo bermula dari dawuh KH. Mahrus Aly kepada menantu dan putrinya, KH. M. Anwar Manshur dan Ibu Nyai Hj. Ummi Kultsum. Setelah melalui pertimbangan yang matang tentang pentingnya pendidikan agama bagi perempuan, keduanya memutuskan memulai dengan mengajar dua santri putri yang datang dari Jakarta dan Karawang, bersama para khadimat keluarga ndalem.</p>
            <p className="pull-note">Wanita adalah tiang bagi bangsanya — semakin kokoh pendidikan yang ia terima, semakin kokoh pula generasi yang ia bentuk.</p>
            <p>Metode pengajian yang semula berbentuk halaqah sederhana kemudian dikembangkan menjadi sistem madrasah berjenjang pada 1407–1408 H, sambil tetap mempertahankan pengajian kitab kuning dengan sistem sorogan dan bandongan di luar jam sekolah. Seiring bertambahnya santri, dibangunlah asrama, MCK, dan gedung madrasah tersendiri — sebelumnya seluruh kegiatan santri masih menyatu dengan ndalem pengasuh.</p>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
