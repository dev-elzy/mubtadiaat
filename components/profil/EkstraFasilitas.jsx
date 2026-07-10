import Reveal from '../ui/Reveal';

const DEFAULT_EKSTRA_COL1 = [
  { name: "Khitobah", desc: "Latihan berpidato dan berbicara di depan umum dengan bahasa yang baik dan lugas." },
  { name: "Diba'iyyah & Barzanji", desc: "Pembacaan sholawat dan syair pujian kepada Nabi Muhammad ﷺ." },
  { name: "Manaqib", desc: "Mengkaji sejarah dan keutamaan para wali serta ulama besar." },
  { name: "Simtuth Duror", desc: "Pembacaan kitab Maulid karya Al-Habib Ali bin Muhammad Al-Habsyi." },
  { name: "Izalatun Najasah & Tajhizul Mayyit", desc: "Pembelajaran tata cara bersuci dan mengurus jenazah sesuai syariat." }
];

const DEFAULT_EKSTRA_COL2 = [
  { name: "Murottilil Qur'an", desc: "Pelatihan membaca Al-Qur'an dengan tartil sesuai kaidah tajwid." },
  { name: "Vokal & Rebana", desc: "Pengembangan seni suara serta latihan mengiringi sholawat dan qosidah." },
  { name: "Menjahit", desc: "Keterampilan menjahit untuk kebutuhan pribadi maupun usaha." },
  { name: "Kepribadian", desc: "Pelatihan etika dan pengembangan diri agar santriwati berakhlak baik." },
  { name: "Make Up", desc: "Dasar-dasar tata rias yang sesuai norma kepantasan." }
];

const DEFAULT_FASILITAS = [
  "Kamar Santri", "Kamar Pengurus", "MCK", "Mushola", "Lokal / Kelas", "Aula",
  "Rental Komputer", "Wartel", "Kantin", "Ruang Serbaguna", "Ruang Penyimpanan Barang",
  "Perpustakaan", "Jemuran", "Ruang Panggilan", "UKS", "Toko Buku / Kitab",
  "Dapur", "Kantor"
];

export default function EkstraFasilitas({ settings = {} }) {
  const eEyebrow = settings.ekstraEyebrow || "Di Luar Jam Sekolah";
  const eTitleHtml = settings.ekstraTitleHtml || "Jam'iyyah & <em>Kursus</em> Keterampilan";
  const c1Title = settings.ekstraCol1Title || "Jam'iyyah";
  const c1Sub = settings.ekstraCol1Sub || "Kegiatan rutin malam Jum'at & mingguan";
  const c2Title = settings.ekstraCol2Title || "Kursus Keterampilan";
  const c2Sub = settings.ekstraCol2Sub || "Bekal kemandirian di luar keilmuan agama";

  const fEyebrow = settings.fasilitasEyebrow || "Sarana Penunjang";
  const fTitleHtml = settings.fasilitasTitleHtml || "Fasilitas <em>Pondok</em>";

  let col1Items = DEFAULT_EKSTRA_COL1;
  if (Array.isArray(settings.ekstraCol1List)) {
    col1Items = settings.ekstraCol1List;
  } else if (typeof settings.ekstraCol1List === 'string') {
    try {
      const parsed = JSON.parse(settings.ekstraCol1List);
      if (Array.isArray(parsed)) col1Items = parsed;
    } catch {}
  }

  let col2Items = DEFAULT_EKSTRA_COL2;
  if (Array.isArray(settings.ekstraCol2List)) {
    col2Items = settings.ekstraCol2List;
  } else if (typeof settings.ekstraCol2List === 'string') {
    try {
      const parsed = JSON.parse(settings.ekstraCol2List);
      if (Array.isArray(parsed)) col2Items = parsed;
    } catch {}
  }

  let fasilitasItems = DEFAULT_FASILITAS;
  if (Array.isArray(settings.fasilitasList)) {
    fasilitasItems = settings.fasilitasList;
  } else if (typeof settings.fasilitasList === 'string') {
    try {
      const parsed = JSON.parse(settings.fasilitasList);
      if (Array.isArray(parsed)) fasilitasItems = parsed;
    } catch {}
  }

  return (
    <>
      <section className="ekstra">
        <div className="wrap">
          <Reveal className="section-head">
            <div className="eyebrow">{eEyebrow}</div>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: eTitleHtml }} />
          </Reveal>
          
          <div className="ekstra-cols">
            <Reveal as="ul" className="ekstra-col" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '16px' }}>
                <h3>{c1Title}</h3>
                <p className="ekstra-sub">{c1Sub}</p>
              </li>
              {col1Items.map((item, idx) => (
                <li key={idx} className="ekstra-entry">
                  <h4>{item.name || item.title || ''}</h4>
                  <p>{item.desc || ''}</p>
                </li>
              ))}
            </Reveal>
            
            <Reveal as="ul" className="ekstra-col" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '16px' }}>
                <h3>{c2Title}</h3>
                <p className="ekstra-sub">{c2Sub}</p>
              </li>
              {col2Items.map((item, idx) => (
                <li key={idx} className="ekstra-entry">
                  <h4>{item.name || item.title || ''}</h4>
                  <p>{item.desc || ''}</p>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="fasilitas">
        <div className="wrap">
          <Reveal className="section-head" style={{ marginBottom: 0 }}>
            <div className="eyebrow">{fEyebrow}</div>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: fTitleHtml }} />
          </Reveal>
          
          <Reveal as="ul" className="fas-wrap" style={{ listStyle: 'none', padding: 0, margin: 0, marginTop: '40px' }}>
            {fasilitasItems.map((f, idx) => (
              <li key={idx} className="fas-chip">
                {typeof f === 'string' ? f : f.name || String(f)}
              </li>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
