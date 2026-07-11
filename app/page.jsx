import Link from 'next/link';
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
  const heroSub = settings.heroSub || 'Pondok Pesantren Putri Hidayatul Mubtadiat mendidik santriwati dengan keilmuan agama yang mendalam dan kesiapan menjawab kebutuhan masyarakat — di bawah naungan Yayasan Hidayatul Mubtadiat, Lirboyo Kediri.';

  return (
    <main style={{ background: '#FAF7F0', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* =========================================================
          HERO SECTION BERANDA MEWAH & PROFESIONAL
      ========================================================= */}
      <section style={{
        position: 'relative',
        padding: '8px 24px 44px',
        background: 'radial-gradient(ellipse 900px 500px at 50% -10%, rgba(173, 138, 78, 0.12), transparent 70%), linear-gradient(180deg, #FAF7F0 0%, #F4EFE6 100%)',
        borderBottom: '1px solid rgba(173, 138, 78, 0.22)',
        overflow: 'hidden'
      }}>
        <div className="wrap" style={{ maxWidth: '1180px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Eyebrow Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(15, 43, 36, 0.08)',
            border: '1px solid rgba(173, 138, 78, 0.35)',
            padding: '6px 18px',
            borderRadius: '100px',
            fontSize: '11.5px',
            fontWeight: '700',
            color: '#16342C',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#AD8A4E' }}></span>
            {heroEyebrow}
          </div>

          {/* Arabic Calligraphy */}
          <div className="arabic" style={{
            fontSize: 'clamp(28px, 4.5vw, 42px)',
            color: '#0F2B24',
            lineHeight: '1.5',
            marginBottom: '14px',
            fontWeight: '700'
          }}>
            {heroArabic}
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontFamily: '"Fraunces", serif',
              fontSize: 'clamp(34px, 5.5vw, 56px)',
              fontWeight: '700',
              color: '#0F2B24',
              lineHeight: '1.18',
              letterSpacing: '-0.015em',
              maxWidth: '860px',
              margin: '0 auto 18px'
            }}
            dangerouslySetInnerHTML={{ __html: heroTitleHtml }}
          />

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(15px, 1.8vw, 17.5px)',
            color: '#475569',
            lineHeight: '1.7',
            maxWidth: '720px',
            margin: '0 auto 32px'
          }}>
            {heroSub}
          </p>

          {/* Action CTA Buttons */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '44px'
          }}>
            <Link
              href={settings.daftarUrl || '/pendaftaran'}
              style={{
                background: 'linear-gradient(135deg, #103B2E 0%, #0A241C 100%)',
                color: '#FFFFFF',
                padding: '14px 28px',
                borderRadius: '14px',
                fontSize: '15px',
                fontWeight: '700',
                textDecoration: 'none',
                border: '1.5px solid rgba(212, 175, 55, 0.45)',
                boxShadow: '0 10px 25px rgba(11, 36, 28, 0.22)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <span>✨ Pendaftaran Santri Baru</span>
            </Link>

            <Link
              href="/profil"
              style={{
                background: '#FFFFFF',
                color: '#0F2B24',
                padding: '14px 26px',
                borderRadius: '14px',
                fontSize: '15px',
                fontWeight: '700',
                textDecoration: 'none',
                border: '1.5px solid rgba(173, 138, 78, 0.35)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>📖 Profil Lengkap P3HM</span>
            </Link>

            <Link
              href="/portal/login"
              style={{
                background: 'rgba(15, 43, 36, 0.07)',
                color: '#16342C',
                padding: '14px 24px',
                borderRadius: '14px',
                fontSize: '15px',
                fontWeight: '700',
                textDecoration: 'none',
                border: '1.5px solid rgba(15, 43, 36, 0.15)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>🔐 Portal Wali &amp; Akademik</span>
            </Link>
          </div>

          {/* Highlight Stats Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            maxWidth: '1040px',
            margin: '0 auto'
          }}>
            {[
              {
                icon: '🕌',
                num: settings.stat1Num || '15 Sep 1985 M',
                label: settings.stat1Label || 'Berdiri Resmi di Lirboyo Kediri'
              },
              {
                icon: '📚',
                num: settings.stat2Num || 'Sistem Salaf',
                label: settings.stat2Label || 'Klasikal & Pengajian Kitab Kuning'
              },
              {
                icon: '🎓',
                num: settings.stat4Num || 'Khusus Putri',
                label: settings.stat4Label || 'Pembinaan Adab & Akhlak Muslimah'
              },
              {
                icon: '🌟',
                num: settings.stat3Num || 'TA 1446-1447 H',
                label: settings.stat3Label || 'Penerimaan Santriwati Baru'
              }
            ].map((stat, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '18px',
                  padding: '20px 18px',
                  border: '1px solid rgba(173, 138, 78, 0.25)',
                  boxShadow: '0 8px 22px rgba(11, 36, 28, 0.04)',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(173, 138, 78, 0.14)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  flexShrink: 0
                }}>
                  {stat.icon}
                </div>
                <div>
                  <div style={{
                    fontFamily: '"Fraunces", serif',
                    fontSize: '17px',
                    fontWeight: '700',
                    color: '#0F2B24'
                  }}>
                    {stat.num}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#64748b',
                    lineHeight: '1.4',
                    marginTop: '2px'
                  }}>
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 2: PORTAL INFORMASI, BERITA & AKSES PONDOK
      ========================================================= */}
      <section style={{ padding: '44px 24px 0' }}>
        <div className="wrap" style={{ maxWidth: '1180px', margin: '0 auto' }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: showBerita ? 'minmax(0, 2fr) minmax(0, 1fr)' : '1fr',
            gap: '36px',
            alignItems: 'start'
          }}>
            
            {/* KOLOM KIRI: BERITA & PENGUMUMAN TERKINI */}
            {showBerita && (
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '22px',
                  borderBottom: '2px solid rgba(15, 43, 36, 0.15)',
                  paddingBottom: '14px'
                }}>
                  <div>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#AD8A4E',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '4px'
                    }}>
                      KABAR PONDOK PESANTREN
                    </span>
                    <h2 style={{
                      fontFamily: '"Fraunces", serif',
                      fontSize: '26px',
                      fontWeight: '700',
                      color: '#0F2B24',
                      margin: 0
                    }}>
                      Berita &amp; <em>Pengumuman Terbaru</em>
                    </h2>
                  </div>
                  <Link
                    href="/berita"
                    style={{
                      fontSize: '13.5px',
                      fontWeight: '700',
                      color: '#103B2E',
                      textDecoration: 'none',
                      background: '#FFFFFF',
                      padding: '8px 16px',
                      borderRadius: '100px',
                      border: '1px solid rgba(173, 138, 78, 0.35)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Lihat Semua &rarr;
                  </Link>
                </div>

                {berita.length === 0 ? (
                  <div style={{
                    background: '#FFFFFF',
                    borderRadius: '20px',
                    padding: '40px 24px',
                    textAlign: 'center',
                    border: '1px solid rgba(173, 138, 78, 0.2)',
                    color: '#64748b'
                  }}>
                    Belum ada berita yang dipublikasikan.
                  </div>
                ) : (
                  <div>
                    {/* Featured Article */}
                    {berita[0] && (
                      <article style={{
                        background: '#FFFFFF',
                        borderRadius: '22px',
                        overflow: 'hidden',
                        border: '1px solid rgba(173, 138, 78, 0.28)',
                        boxShadow: '0 14px 35px rgba(11, 36, 28, 0.06)',
                        marginBottom: '24px'
                      }}>
                        <Link href={`/berita/${berita[0].slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <img
                            src={berita[0].image}
                            alt={berita[0].title}
                            style={{
                              width: '100%',
                              height: '300px',
                              objectFit: 'cover'
                            }}
                          />
                          <div style={{ padding: '26px 28px' }}>
                            <div style={{
                              display: 'inline-block',
                              background: 'rgba(173, 138, 78, 0.15)',
                              color: '#AD8A4E',
                              fontSize: '11.5px',
                              fontWeight: '700',
                              padding: '4px 12px',
                              borderRadius: '100px',
                              marginBottom: '12px'
                            }}>
                              {berita[0].category}
                            </div>
                            <h3 style={{
                              fontFamily: '"Fraunces", serif',
                              fontSize: '23px',
                              fontWeight: '700',
                              color: '#0F2B24',
                              lineHeight: '1.3',
                              marginBottom: '10px'
                            }}>
                              {berita[0].title}
                            </h3>
                            <p style={{
                              fontSize: '14.5px',
                              color: '#475569',
                              lineHeight: '1.65',
                              marginBottom: '18px'
                            }}>
                              {berita[0].summary}
                            </p>
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              fontSize: '12.5px',
                              color: '#64748b',
                              borderTop: '1px solid rgba(15, 43, 36, 0.08)',
                              paddingTop: '14px'
                            }}>
                              <span>✍️ {berita[0].author}</span>
                              <span>📅 {berita[0].date}</span>
                            </div>
                          </div>
                        </Link>
                      </article>
                    )}

                    {/* Secondary News Grid */}
                    {berita.length > 1 && (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '20px'
                      }}>
                        {berita.slice(1, 5).map(b => (
                          <article
                            key={b.id}
                            style={{
                              background: '#FFFFFF',
                              borderRadius: '18px',
                              overflow: 'hidden',
                              border: '1px solid rgba(173, 138, 78, 0.22)',
                              boxShadow: '0 8px 20px rgba(11, 36, 28, 0.04)',
                              display: 'flex',
                              flexDirection: 'column'
                            }}
                          >
                            <Link href={`/berita/${b.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}>
                              <img
                                src={b.image}
                                alt={b.title}
                                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                              />
                              <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                                <div>
                                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#AD8A4E', marginBottom: '8px' }}>
                                    {b.category}
                                  </div>
                                  <h4 style={{
                                    fontFamily: '"Fraunces", serif',
                                    fontSize: '16px',
                                    fontWeight: '700',
                                    color: '#0F2B24',
                                    lineHeight: '1.35',
                                    marginBottom: '12px'
                                  }}>
                                    {b.title}
                                  </h4>
                                </div>
                                <div style={{ fontSize: '12px', color: '#64748b', borderTop: '1px solid rgba(15, 43, 36, 0.08)', paddingTop: '10px' }}>
                                  📅 {b.date}
                                </div>
                              </div>
                            </Link>
                          </article>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* KOLOM KANAN: AKSES CEPAT & GALERI PONDOK */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              
              {/* Kartu Portal Pendaftaran Online */}
              <div style={{
                background: 'linear-gradient(135deg, #0A241C 0%, #11382C 100%)',
                borderRadius: '24px',
                padding: '28px 26px',
                color: '#FFFFFF',
                border: '1.5px solid rgba(212, 175, 55, 0.4)',
                boxShadow: '0 16px 35px rgba(11, 36, 28, 0.25)'
              }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#FAD692',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '10px'
                }}>
                  PENDAFTARAN RESMI
                </div>
                <h3 style={{
                  fontFamily: '"Fraunces", serif',
                  fontSize: '22px',
                  fontWeight: '700',
                  marginBottom: '12px',
                  lineHeight: '1.25'
                }}>
                  Penerimaan Santriwati Baru (PSB) Online P3HM
                </h3>
                <p style={{
                  fontSize: '13.5px',
                  color: 'rgba(255, 255, 255, 0.85)',
                  lineHeight: '1.6',
                  marginBottom: '22px'
                }}>
                  Bergabung bersama Pondok Pesantren Putri Hidayatul Mubtadiat Lirboyo Kediri untuk jenjang pendidikan keilmuan dan adab salafiyah.
                </p>
                <Link
                  href={settings.daftarUrl || '/pendaftaran'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    background: 'linear-gradient(135deg, #D4AF37 0%, #AA7C11 100%)',
                    color: '#0B241C',
                    padding: '13px 20px',
                    borderRadius: '12px',
                    fontWeight: '700',
                    fontSize: '14.5px',
                    textDecoration: 'none',
                    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <span>Buka Portal Pendaftaran &rarr;</span>
                </Link>
              </div>

              {/* Galeri Dokumentasi Kegiatan */}
              {showGaleri && (
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '26px',
                  border: '1px solid rgba(173, 138, 78, 0.25)',
                  boxShadow: '0 10px 28px rgba(11, 36, 28, 0.05)'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '18px',
                    borderBottom: '1px solid rgba(15, 43, 36, 0.1)',
                    paddingBottom: '12px'
                  }}>
                    <h3 style={{
                      fontFamily: '"Fraunces", serif',
                      fontSize: '19px',
                      fontWeight: '700',
                      color: '#0F2B24',
                      margin: 0
                    }}>
                      📸 Galeri Kegiatan
                    </h3>
                    <Link
                      href="/galeri"
                      style={{
                        fontSize: '12.5px',
                        fontWeight: '700',
                        color: '#AD8A4E',
                        textDecoration: 'none'
                      }}
                    >
                      Semua &rarr;
                    </Link>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px'
                  }}>
                    {galeri.slice(0, 4).map(g => (
                      <Link
                        key={g.id}
                        href="/galeri"
                        style={{
                          borderRadius: '12px',
                          overflow: 'hidden',
                          position: 'relative',
                          border: '1px solid rgba(173, 138, 78, 0.2)',
                          display: 'block'
                        }}
                      >
                        <img
                          src={g.image}
                          alt={g.title}
                          style={{
                            width: '100%',
                            height: '110px',
                            objectFit: 'cover',
                            display: 'block'
                          }}
                        />
                      </Link>
                    ))}
                    {galeri.length === 0 && (
                      <div style={{ gridColumn: 'span 2', fontSize: '13px', color: '#64748b', textAlign: 'center', padding: '16px 0' }}>
                        Belum ada foto kegiatan
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </section>
    </main>
  );
}
