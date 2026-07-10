"use client";

import { useState, useEffect } from 'react';

export default function PsbClassCards() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTabs, setActiveTabs] = useState({});

  useEffect(() => {
    fetch('/api/psb/classes')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setClasses(data);
          const initialTabs = {};
          data.forEach(c => {
            initialTabs[c.id] = 'materi';
          });
          setActiveTabs(initialTabs);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleTabSwitch = (id, tabName) => {
    setActiveTabs(prev => ({ ...prev, [id]: tabName }));
  };

  if (loading) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', color: '#475569', fontWeight: '600' }}>
        Memuat data kelas madrasah &amp; materi ujian masuk...
      </div>
    );
  }

  return (
    <section style={{ margin: '48px 0 64px' }}>
      {/* SECTION HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '44px', padding: '0 16px' }}>
        <div style={{
          display: 'inline-block',
          padding: '6px 16px',
          borderRadius: '99px',
          background: 'rgba(212, 175, 55, 0.15)',
          border: '1px solid rgba(212, 175, 55, 0.45)',
          color: '#856404',
          fontSize: '11.5px',
          fontWeight: '700',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '14px'
        }}>
          JENJANG &amp; KELAS DINIYAH
        </div>

        <h2 style={{
          fontFamily: '"Fraunces", serif',
          fontSize: 'clamp(26px, 3.5vw, 36px)',
          fontWeight: '700',
          color: '#0B241C',
          letterSpacing: '0.01em',
          marginBottom: '12px'
        }}>
          Pilihan Kelas &amp; Rincian Materi Ujian Masuk
        </h2>

        <p style={{
          fontSize: '15.5px',
          color: '#475569',
          maxWidth: '680px',
          margin: '0 auto',
          lineHeight: '1.7'
        }}>
          Silakan pelajari dengan teliti rincian <span style={{ color: '#0F766E', fontWeight: '700' }}>Materi Ujian Masuk</span> dan <span style={{ color: '#0F766E', fontWeight: '700' }}>Kurikulum Kitab</span> untuk menentukan pilihan kelas diniyah yang tepat bagi calon santriwati.
        </p>
      </div>

      {/* CLASS CARDS GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '28px'
      }}>
        {classes.map((item) => {
          const activeTab = activeTabs[item.id] || 'materi';
          const materiList = (item.materi_ujian || '').split('\n').filter(Boolean);
          const kurikulumList = (item.kurikulum || '').split('\n').filter(Boolean);

          return (
            <div
              key={item.id}
              style={{
                background: '#0D2920',
                borderRadius: '24px',
                border: '1.5px solid rgba(212, 175, 55, 0.4)',
                boxShadow: '0 20px 45px rgba(11, 36, 28, 0.22)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'hidden',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                position: 'relative'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 26px 55px rgba(11, 36, 28, 0.32)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 20px 45px rgba(11, 36, 28, 0.22)';
              }}
            >
              <div>
                {/* CARD TOP HEADER */}
                <div style={{
                  background: 'linear-gradient(135deg, #13392D 0%, #0A221A 100%)',
                  padding: '24px 24px 20px',
                  borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
                  position: 'relative'
                }}>
                  <div style={{
                    display: 'inline-block',
                    fontSize: '10.5px',
                    fontWeight: '800',
                    color: '#FAD692',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    background: 'rgba(212, 175, 55, 0.16)',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                    padding: '4px 11px',
                    borderRadius: '99px',
                    marginBottom: '10px'
                  }}>
                    JENJANG MADRASAH
                  </div>
                  <h3 style={{
                    fontFamily: '"Fraunces", serif',
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#FFFFFF',
                    lineHeight: '1.3',
                    margin: 0
                  }}>
                    {item.title}
                  </h3>
                </div>

                {/* SEGMENTED TAB SWITCHER */}
                <div style={{
                  padding: '12px 18px',
                  background: 'rgba(0, 0, 0, 0.22)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    background: 'rgba(255, 255, 255, 0.06)',
                    borderRadius: '12px',
                    padding: '4px',
                    gap: '4px'
                  }}>
                    <button
                      type="button"
                      onClick={() => handleTabSwitch(item.id, 'materi')}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '9px',
                        border: 'none',
                        background: activeTab === 'materi' ? 'linear-gradient(135deg, #FAD692 0%, #E2B863 100%)' : 'transparent',
                        color: activeTab === 'materi' ? '#0B241C' : 'rgba(255, 255, 255, 0.75)',
                        fontSize: '12.5px',
                        fontWeight: activeTab === 'materi' ? '800' : '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: activeTab === 'materi' ? '0 4px 12px rgba(226, 184, 99, 0.3)' : 'none'
                      }}
                    >
                      📋 MATERI UJIAN
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTabSwitch(item.id, 'kurikulum')}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '9px',
                        border: 'none',
                        background: activeTab === 'kurikulum' ? 'linear-gradient(135deg, #FAD692 0%, #E2B863 100%)' : 'transparent',
                        color: activeTab === 'kurikulum' ? '#0B241C' : 'rgba(255, 255, 255, 0.75)',
                        fontSize: '12.5px',
                        fontWeight: activeTab === 'kurikulum' ? '800' : '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: activeTab === 'kurikulum' ? '0 4px 12px rgba(226, 184, 99, 0.3)' : 'none'
                      }}
                    >
                      📖 KURIKULUM
                    </button>
                  </div>
                </div>

                {/* TAB LIST CONTENT */}
                <div style={{ padding: '28px 24px', minHeight: '260px' }}>
                  {activeTab === 'materi' ? (
                    <div>
                      <div style={{
                        fontSize: '11.5px',
                        fontWeight: '700',
                        color: '#FAD692',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        marginBottom: '16px'
                      }}>
                        Daftar Materi Ujian Masuk:
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
                        {materiList.map((line, idx) => (
                          <div key={idx} style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px',
                            color: '#FBF8F1',
                            fontSize: '14px',
                            lineHeight: '1.55'
                          }}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '20px',
                              height: '20px',
                              borderRadius: '6px',
                              background: 'rgba(212, 175, 55, 0.2)',
                              color: '#FAD692',
                              fontWeight: '800',
                              fontSize: '11px',
                              flexShrink: 0,
                              marginTop: '1px'
                            }}>
                              ✓
                            </span>
                            <span>{line}</span>
                          </div>
                        ))}
                        {materiList.length === 0 && (
                          <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>
                            Belum ada rincian materi ujian.
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{
                        fontSize: '11.5px',
                        fontWeight: '700',
                        color: '#34D399',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        marginBottom: '16px'
                      }}>
                        Kurikulum Kitab &amp; Diniyah:
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
                        {kurikulumList.map((line, idx) => (
                          <div key={idx} style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px',
                            color: '#FBF8F1',
                            fontSize: '14px',
                            lineHeight: '1.55'
                          }}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '20px',
                              height: '20px',
                              borderRadius: '6px',
                              background: 'rgba(52, 211, 153, 0.2)',
                              color: '#34D399',
                              fontWeight: '800',
                              fontSize: '11px',
                              flexShrink: 0,
                              marginTop: '1px'
                            }}>
                              ✓
                            </span>
                            <span>{line}</span>
                          </div>
                        ))}
                        {kurikulumList.length === 0 && (
                          <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>
                            Belum ada rincian kurikulum.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* CARD FOOTER CTA BUTTON */}
              <div style={{ padding: '20px 24px 26px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <a
                  href={item.daftar_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '14px',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    color: '#FFFFFF',
                    borderRadius: '14px',
                    fontWeight: '800',
                    fontSize: '14px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    boxShadow: '0 8px 20px rgba(16, 185, 129, 0.35)',
                    transition: 'all 0.2s ease',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.filter = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  ISI FORMULIR DAFTAR &rarr;
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
