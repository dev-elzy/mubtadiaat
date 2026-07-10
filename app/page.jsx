import { getSettings, getPublishedBerita, getPublishedGaleri } from './lib/db';

export const revalidate = 0;
export const runtime = 'edge';

export default async function HomePage() {
  const settings = await getSettings();
  const allBerita = await getPublishedBerita();
  const allGaleri = await getPublishedGaleri();

  // Parse Manual selection if configured
  let homeBeritaIds = [];
  let homeGaleriIds = [];
  try { homeBeritaIds = JSON.parse(settings.homeBeritaIds || "[]"); } catch {}
  try { homeGaleriIds = JSON.parse(settings.homeGaleriIds || "[]"); } catch {}

  const berita = settings.homeBeritaMode === 'manual' && homeBeritaIds.length > 0
    ? allBerita.filter(b => homeBeritaIds.includes(b.id))
    : allBerita;

  const galeri = settings.homeGaleriMode === 'manual' && homeGaleriIds.length > 0
    ? allGaleri.filter(g => homeGaleriIds.includes(g.id))
    : allGaleri;

  const showBerita = settings.showSectionBerita !== 'false';
  const showGaleri = settings.showSectionGaleri !== 'false';

  const heroEyebrow = settings.heroEyebrow || 'Lirboyo · Kota Kediri · Jawa Timur';
  const heroArabic = settings.heroArabic || 'مَعْهَدْ لِلْبَنَاتْ هِدَايَةُ الْمُبْتَدِئَاتْ';
  const heroTitleHtml = settings.heroTitleHtml || 'Menempa Muslimah <em>Sejati</em>,<br>Berakar pada Kitab Salaf';
  const heroSub = settings.heroSub || 'Pondok Pesantren Putri Hidayatul Mubtadiat mendidik santriwati...';
  
  return (
    <main>
      <div className="wrap">
        <div className="dual-layout" style={{ gridTemplateColumns: !showBerita ? '1fr' : undefined }}>
          
          {/* SISI 1: PROFIL & IDENTITAS (Sidebar Kiri) */}
          <aside className="side-profil">
            <div className="hero-eyebrow eyebrow" style={{ justifyContent: 'flex-start' }}>{heroEyebrow}</div>
            <div className="hero-arabic arabic" style={{ fontSize: '24px', textAlign: 'left', marginBottom: '16px' }}>{heroArabic}</div>
            <h1 className="hero-title" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', textAlign: 'left', lineHeight: '1.2' }} dangerouslySetInnerHTML={{ __html: heroTitleHtml }}></h1>
            <p className="hero-sub" style={{ textAlign: 'left', fontSize: '15px' }}>{heroSub}</p>
            
            <div className="hero-actions" style={{ justifyContent: 'flex-start', marginTop: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <a href={settings.daftarUrl || '#'} target="_blank" className="btn-primary" style={{ flex: '1 1 200px', minWidth: '150px', justifyContent: 'center' }}>Pendaftaran Online</a>
              <a href="/profil" className="btn-ghost" style={{ flex: '1 1 200px', minWidth: '150px', justifyContent: 'center' }}>Lihat Profil Lengkap</a>
            </div>

            {showGaleri && (
              <div style={{ marginTop: '48px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '2px solid var(--gold-300)', paddingBottom: '8px' }}>
                  <h3 style={{ fontFamily: '"Fraunces", serif', fontSize: '18px', color: 'var(--teal-900)', margin: 0 }}>Dokumentasi Kegiatan</h3>
                  <a href="/galeri" style={{ fontSize: '12px', color: 'var(--gold-500)', fontWeight: '600' }}>Semua &rarr;</a>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {galeri.slice(0, 4).map(g => (
                    <div key={g.id} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <img src={g.image} alt={g.title} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--line)' }} />
                      <div>
                        <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--teal-900)' }}>{g.title}</h4>
                        <p style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>{g.date}</p>
                      </div>
                    </div>
                  ))}
                  {galeri.length === 0 && <p style={{ fontSize: '13px', color: 'var(--ink-soft)' }}>Belum ada foto kegiatan</p>}
                </div>
              </div>
            )}
          </aside>

          {/* SISI 2: PORTAL BERITA (Magazine Grid Kanan) */}
          {showBerita && (
            <section className="side-berita">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '2px solid var(--teal-900)', paddingBottom: '12px' }}>
                <h2 style={{ fontFamily: '"Fraunces", serif', fontSize: '24px', color: 'var(--teal-900)' }}>Portal <em>Informasi & Berita</em></h2>
                <a href="/berita" style={{ fontSize: '14px', color: 'var(--gold-500)', fontWeight: '600' }}>Lihat Semua &rarr;</a>
              </div>

              {berita.length === 0 ? (
                <p style={{ color: 'var(--ink-soft)' }}>Belum ada berita yang dipublikasikan.</p>
              ) : (
                <>
                  {/* Featured Post (Artikel Pertama) */}
                  <article className="mag-card" style={{ marginBottom: '24px' }}>
                    <a href={`/berita/${berita[0].slug}`} style={{ display: 'block', textDecoration: 'none' }}>
                      <img src={berita[0].image} alt={berita[0].title} style={{ width: '100%', height: 'auto', aspectRatio: '16/10', objectFit: 'cover' }} />
                      <div className="mag-body">
                        <div className="berita-meta">{berita[0].category}</div>
                        <h3 className="berita-title" style={{ fontSize: '24px' }}>{berita[0].title}</h3>
                        <p className="berita-summary">{berita[0].summary}</p>
                        <div className="berita-footer" style={{ marginTop: '16px' }}>
                          <span>Oleh: {berita[0].author}</span>
                          <span>{berita[0].date}</span>
                        </div>
                      </div>
                    </a>
                  </article>

                  {/* Grid Posts (Artikel Sisanya) */}
                  <div className="mag-grid">
                    {berita.slice(1, 7).map(b => (
                      <article key={b.id} className="mag-card">
                        <a href={`/berita/${b.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
                          <img src={b.image} alt={b.title} className="mag-img" />
                          <div className="mag-body">
                            <div className="berita-meta">{b.category}</div>
                            <h3 className="berita-title">{b.title}</h3>
                            <div className="berita-footer" style={{ marginTop: '12px' }}>
                              <span>{b.date}</span>
                            </div>
                          </div>
                        </a>
                      </article>
                    ))}
                  </div>
                </>
              )}
            </section>
          )}

        </div>
      </div>
    </main>
  );
}
