import Reveal from '../ui/Reveal';

export default function VisiMisi() {
  return (
    <section className="visimisi">
      <div className="wrap">
        <Reveal className="section-head" style={{ marginBottom: 0 }}>
          <div className="eyebrow">Arah Perjuangan</div>
          <h2 className="section-title">Visi & <em>Misi</em> Yayasan</h2>
          <p className="visi-lead">Mewujudkan generasi Islam Ahlussunnah wal Jama'ah yang kokoh keilmuannya dan nyata kontribusinya bagi agama, bangsa, dan masyarakat.</p>
        </Reveal>
        
        <Reveal as="ul" className="misi-list" style={{ listStyle: 'none', padding: 0, margin: 0, marginTop: '52px' }}>
          <li className="misi-item"><span className="no">01</span><p>Terwujudnya generasi Islam Ahlussunnah wal Jama'ah.</p></li>
          <li className="misi-item"><span className="no">02</span><p>Tegaknya Agama Islam Ahlussunnah wal Jama'ah.</p></li>
          <li className="misi-item"><span className="no">03</span><p>Membantu program pemerintah dalam membangun manusia seutuhnya.</p></li>
          <li className="misi-item"><span className="no">04</span><p>Menjadi sarana pendidikan, pelatihan, dan pengembangan sumber daya manusia.</p></li>
          <li className="misi-item"><span className="no">05</span><p>Menjadi media dakwah bagi masyarakat sekitar.</p></li>
          <li className="misi-item"><span className="no">06</span><p>Menjadi sarana sosial kemasyarakatan.</p></li>
          <li className="misi-item"><span className="no">07</span><p>Menjadi media informasi dan komunikasi pendidikan.</p></li>
        </Reveal>
      </div>
    </section>
  );
}
