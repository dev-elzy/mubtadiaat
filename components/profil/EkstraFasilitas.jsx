import Reveal from '../ui/Reveal';

export default function EkstraFasilitas() {
  return (
    <>
      <section className="ekstra">
        <div className="wrap">
          <Reveal className="section-head">
            <div className="eyebrow">Di Luar Jam Sekolah</div>
            <h2 className="section-title">Jam'iyyah & <em>Kursus</em> Keterampilan</h2>
          </Reveal>
          
          <div className="ekstra-cols">
            <Reveal as="ul" className="ekstra-col" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '16px' }}>
                <h3>Jam'iyyah</h3>
                <p className="ekstra-sub">Kegiatan rutin malam Jum'at & mingguan</p>
              </li>
              <li className="ekstra-entry"><h4>Khitobah</h4><p>Latihan berpidato dan berbicara di depan umum dengan bahasa yang baik dan lugas.</p></li>
              <li className="ekstra-entry"><h4>Diba'iyyah & Barzanji</h4><p>Pembacaan sholawat dan syair pujian kepada Nabi Muhammad ﷺ.</p></li>
              <li className="ekstra-entry"><h4>Manaqib</h4><p>Mengkaji sejarah dan keutamaan para wali serta ulama besar.</p></li>
              <li className="ekstra-entry"><h4>Simtuth Duror</h4><p>Pembacaan kitab Maulid karya Al-Habib Ali bin Muhammad Al-Habsyi.</p></li>
              <li className="ekstra-entry"><h4>Izalatun Najasah & Tajhizul Mayyit</h4><p>Pembelajaran tata cara bersuci dan mengurus jenazah sesuai syariat.</p></li>
            </Reveal>
            
            <Reveal as="ul" className="ekstra-col" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '16px' }}>
                <h3>Kursus Keterampilan</h3>
                <p className="ekstra-sub">Bekal kemandirian di luar keilmuan agama</p>
              </li>
              <li className="ekstra-entry"><h4>Murottilil Qur'an</h4><p>Pelatihan membaca Al-Qur'an dengan tartil sesuai kaidah tajwid.</p></li>
              <li className="ekstra-entry"><h4>Vokal & Rebana</h4><p>Pengembangan seni suara serta latihan mengiringi sholawat dan qosidah.</p></li>
              <li className="ekstra-entry"><h4>Menjahit</h4><p>Keterampilan menjahit untuk kebutuhan pribadi maupun usaha.</p></li>
              <li className="ekstra-entry"><h4>Kepribadian</h4><p>Pelatihan etika dan pengembangan diri agar santriwati berakhlak baik.</p></li>
              <li className="ekstra-entry"><h4>Make Up</h4><p>Dasar-dasar tata rias yang sesuai norma kepantasan.</p></li>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="fasilitas">
        <div className="wrap">
          <Reveal className="section-head" style={{ marginBottom: 0 }}>
            <div className="eyebrow">Sarana Penunjang</div>
            <h2 className="section-title">Fasilitas <em>Pondok</em></h2>
          </Reveal>
          
          <Reveal as="ul" className="fas-wrap" style={{ listStyle: 'none', padding: 0, margin: 0, marginTop: '40px' }}>
            <li className="fas-chip">Kamar Santri</li>
            <li className="fas-chip">Kamar Pengurus</li>
            <li className="fas-chip">MCK</li>
            <li className="fas-chip">Mushola</li>
            <li className="fas-chip">Lokal / Kelas</li>
            <li className="fas-chip">Aula</li>
            <li className="fas-chip">Rental Komputer</li>
            <li className="fas-chip">Wartel</li>
            <li className="fas-chip">Kantin</li>
            <li className="fas-chip">Ruang Serbaguna</li>
            <li className="fas-chip">Ruang Penyimpanan Barang</li>
            <li className="fas-chip">Perpustakaan</li>
            <li className="fas-chip">Jemuran</li>
            <li className="fas-chip">Ruang Panggilan</li>
            <li className="fas-chip">UKS</li>
            <li className="fas-chip">Toko Buku / Kitab</li>
            <li className="fas-chip">Dapur</li>
            <li className="fas-chip">Kantor</li>
          </Reveal>
        </div>
      </section>
    </>
  );
}
