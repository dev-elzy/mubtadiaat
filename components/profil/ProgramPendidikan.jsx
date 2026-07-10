import Reveal from '../ui/Reveal';

const DEFAULT_PROGRAM = [
  { title: "Kitab Salaf", desc: "Kajian kitab kuning secara klasikal dan berjenjang sebagai fondasi utama keilmuan agama." },
  { title: "Madrasah Diniyah", desc: "Kegiatan belajar mengajar formal yang terstruktur di bawah Madrasah Putri Hidayatul Mubtadiat." },
  { title: "Pembinaan Akhlak", desc: "Penanaman adab dan kepribadian muslimah sejati dalam keseharian pondok." },
  { title: "Kesiapan Sosial", desc: "Membekali santriwati agar berperan aktif menyukseskan dakwah di tengah masyarakat." }
];

const DEFAULT_JENJANG = [
  { name: "Madrasah Ibtidaiyah", yrs: "6 Th" },
  { name: "Madrasah Tsanawiyah", yrs: "3 Th" },
  { name: "Madrasah Aliyah", yrs: "3 Th" },
  { name: "Al-Robithoh", yrs: "1 Th" },
  { name: "Perkuliahan", yrs: "" },
  { name: "Tahfidzil Qur'an", yrs: "" },
  { name: "Tartilil Qur'an", yrs: "" },
  { name: "Bahtsul Masa-il", yrs: "" }
];

const ICONS = [
  <svg key="0" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="9"/></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-4.35-9.5-8.5C.5 8.5 3 5 6.5 5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 3.5 0 6 3.5 4 7.5C19 16.65 12 21 12 21z"/></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
];

export default function ProgramPendidikan({ settings = {} }) {
  const pEyebrow = settings.programEyebrow || "Arah Pendidikan";
  const pTitleHtml = settings.programTitleHtml || "Empat Pilar Pembinaan <em>Santriwati</em>";
  const jEyebrow = settings.jenjangEyebrow || "Jenjang & Unit";
  const jTitleHtml = settings.jenjangTitleHtml || "Satu Atap, <em>Delapan</em> Jenjang Belajar";

  let programItems = DEFAULT_PROGRAM;
  if (Array.isArray(settings.programList)) {
    programItems = settings.programList;
  } else if (typeof settings.programList === 'string') {
    try {
      const parsed = JSON.parse(settings.programList);
      if (Array.isArray(parsed)) programItems = parsed;
    } catch {}
  }

  let jenjangItems = DEFAULT_JENJANG;
  if (Array.isArray(settings.jenjangList)) {
    jenjangItems = settings.jenjangList;
  } else if (typeof settings.jenjangList === 'string') {
    try {
      const parsed = JSON.parse(settings.jenjangList);
      if (Array.isArray(parsed)) jenjangItems = parsed;
    } catch {}
  }

  return (
    <section id="program">
      <div className="wrap">
        <Reveal className="section-head">
          <div className="eyebrow">{pEyebrow}</div>
          <h2 className="section-title" dangerouslySetInnerHTML={{ __html: pTitleHtml }} />
        </Reveal>
        
        <Reveal as="ul" className="program-grid" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {programItems.map((p, i) => (
            <li key={i} className="program-card">
              <div className="program-icon">
                {ICONS[i % ICONS.length]}
              </div>
              <h3>{p.title || p.name || ''}</h3>
              <p>{p.desc || ''}</p>
            </li>
          ))}
        </Reveal>

        <Reveal className="section-head" style={{ marginTop: '80px', marginBottom: 0 }}>
          <div className="eyebrow">{jEyebrow}</div>
          <h2 className="section-title" dangerouslySetInnerHTML={{ __html: jTitleHtml }} />
        </Reveal>
        
        <Reveal as="ul" className="jenjang-wrap" style={{ listStyle: 'none', padding: 0, margin: 0, marginTop: '44px' }}>
          {jenjangItems.map((j, i) => (
            <li key={i} className="jenjang-chip">
              {j.name || (typeof j === 'string' ? j : '')}
              {j.yrs && <span className="yrs">{j.yrs}</span>}
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
