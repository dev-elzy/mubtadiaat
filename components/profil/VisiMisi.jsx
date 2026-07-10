import Reveal from '../ui/Reveal';

const DEFAULT_MISI = [
  "Terwujudnya generasi Islam Ahlussunnah wal Jama'ah.",
  "Tegaknya Agama Islam Ahlussunnah wal Jama'ah.",
  "Membantu program pemerintah dalam membangun manusia seutuhnya.",
  "Menjadi sarana pendidikan, pelatihan, dan pengembangan sumber daya manusia.",
  "Menjadi media dakwah bagi masyarakat sekitar.",
  "Menjadi sarana sosial kemasyarakatan.",
  "Menjadi media informasi dan komunikasi pendidikan."
];

export default function VisiMisi({ settings = {} }) {
  const eyebrow = settings.visiMisiEyebrow || "Arah Perjuangan";
  const titleHtml = settings.visiMisiTitleHtml || "Visi & <em>Misi</em> Yayasan";
  const visiText = settings.visiText || "Mewujudkan generasi Islam Ahlussunnah wal Jama'ah yang kokoh keilmuannya dan nyata kontribusinya bagi agama, bangsa, dan masyarakat.";

  let misiItems = DEFAULT_MISI;
  if (Array.isArray(settings.misiList)) {
    misiItems = settings.misiList;
  } else if (typeof settings.misiList === 'string') {
    try {
      const parsed = JSON.parse(settings.misiList);
      if (Array.isArray(parsed)) misiItems = parsed;
    } catch {}
  }

  return (
    <section className="visimisi">
      <div className="wrap">
        <Reveal className="section-head" style={{ marginBottom: 0 }}>
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="section-title" dangerouslySetInnerHTML={{ __html: titleHtml }} />
          <p className="visi-lead" style={{ whiteSpace: 'pre-line' }}>{visiText}</p>
        </Reveal>
        
        <Reveal as="ul" className="misi-list" style={{ listStyle: 'none', padding: 0, margin: 0, marginTop: '52px' }}>
          {misiItems.map((item, idx) => {
            const no = String(idx + 1).padStart(2, '0');
            return (
              <li key={idx} className="misi-item">
                <span className="no">{no}</span>
                <p>{typeof item === 'string' ? item : item.text || String(item)}</p>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
