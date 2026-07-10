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
          // Set tab default ke 'materi' untuk semua kelas
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
      <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--ink-soft)' }}>
        Memuat data kelas, materi ujian &amp; kurikulum P3HM...
      </div>
    );
  }

  return (
    <section style={{ margin: '36px 0 54px' }}>
      {/* JUDUL FORMULIR & INSTRUKSI PEMILIHAN KELAS (Sesuai Referensi Gambar 3) */}
      <div style={{ textAlign: 'center', marginBottom: '36px', padding: '0 16px' }}>
        <h2 style={{
          fontFamily: '"Fraunces", serif',
          fontSize: '28px',
          fontWeight: '700',
          color: 'var(--teal-900)',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          marginBottom: '10px'
        }}>
          FORMULIR PENDAFTARAN &amp; PILIHAN KELAS
        </h2>
        <p style={{
          fontSize: '14.5px',
          color: 'var(--ink)',
          fontWeight: '600',
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          marginBottom: '6px'
        }}>
          BACA DENGAN TELITI <span style={{ color: 'var(--gold-500)', fontWeight: '800' }}>MATERI UJIAN</span> DAN <span style={{ color: 'var(--gold-500)', fontWeight: '800' }}>KURIKULUM PENDIDIKAN</span> DALAM MEMILIH KELAS
        </p>
        <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', fontStyle: 'italic' }}>
          Harap memilih kelas diniyah sesuai dengan kemampuan dan jenjang pendidikan santriwati
        </p>
      </div>

      {/* GRID KARTU KELAS (Desain Zamrud Elegan P3HM terinspirasi Referensi Gambar 3) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px'
      }}>
        {classes.map((item) => {
          const activeTab = activeTabs[item.id] || 'materi';
          const materiList = (item.materi_ujian || '').split('\n').filter(Boolean);
          const kurikulumList = (item.kurikulum || '').split('\n').filter(Boolean);

          return (
            <div
              key={item.id}
              style={{
                background: '#0F2B24',
                borderRadius: '20px',
                border: '1.5px solid rgba(173, 138, 78, 0.4)',
                boxShadow: '0 16px 40px -12px rgba(15, 43, 36, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'hidden',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease'
              }}
            >
              <div>
                {/* HEADER JUDUL KELAS */}
                <div style={{
                  background: 'linear-gradient(135deg, #14382F 0%, #0F2B24 100%)',
                  padding: '20px 18px',
                  borderBottom: '1px solid rgba(173, 138, 78, 0.25)',
                  textAlign: 'center'
                }}>
                  <h3 style={{
                    fontFamily: '"Fraunces", serif',
                    fontSize: '16.5px',
                    fontWeight: '700',
                    color: '#FFFFFF',
                    letterSpacing: '0.02em',
                    margin: 0
                  }}>
                    {item.title}
                  </h3>
                </div>

                {/* TAB PILLS: MATERI UJIAN vs KURIKULUM */}
                <div style={{
                  display: 'flex',
                  borderBottom: '1px solid rgba(173, 138, 78, 0.25)',
                  background: '#0B1F1A'
                }}>
                  <button
                    type="button"
                    onClick={() => handleTabSwitch(item.id, 'materi')}
                    style={{
                      flex: 1,
                      padding: '12px 8px',
                      background: activeTab === 'materi' ? 'rgba(173, 138, 78, 0.2)' : 'transparent',
                      border: 'none',
                      borderBottom: activeTab === 'materi' ? '2.5px solid var(--gold-500)' : '2.5px solid transparent',
                      color: activeTab === 'materi' ? '#FAD692' : 'rgba(255,255,255,0.65)',
                      fontSize: '12.5px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>📋 MATERI UJIAN</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTabSwitch(item.id, 'kurikulum')}
                    style={{
                      flex: 1,
                      padding: '12px 8px',
                      background: activeTab === 'kurikulum' ? 'rgba(173, 138, 78, 0.2)' : 'transparent',
                      border: 'none',
                      borderBottom: activeTab === 'kurikulum' ? '2.5px solid var(--gold-500)' : '2.5px solid transparent',
                      color: activeTab === 'kurikulum' ? '#FAD692' : 'rgba(255,255,255,0.65)',
                      fontSize: '12.5px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>📖 KURIKULUM</span>
                  </button>
                </div>

                {/* ISI TAB DAFTAR CHECKLIST */}
                <div style={{ padding: '24px 20px', minHeight: '230px' }}>
                  {activeTab === 'materi' ? (
                    <div>
                      <div style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        color: 'var(--gold-500)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        marginBottom: '14px'
                      }}>
                        Daftar Materi Ujian Masuk:
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
                        {materiList.map((line, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: '#FBF8F1', fontSize: '13.5px', lineHeight: '1.5' }}>
                            <span style={{ color: 'var(--gold-500)', fontWeight: '800', flexShrink: 0 }}>✔</span>
                            <span>{line}</span>
                          </div>
                        ))}
                        {materiList.length === 0 && (
                          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>Belum ada rincian materi ujian.</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        color: 'var(--gold-500)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        marginBottom: '14px'
                      }}>
                        Kurikulum Kitab &amp; Diniyah:
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
                        {kurikulumList.map((line, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: '#FBF8F1', fontSize: '13.5px', lineHeight: '1.5' }}>
                            <span style={{ color: '#34D399', fontWeight: '800', flexShrink: 0 }}>✔</span>
                            <span>{line}</span>
                          </div>
                        ))}
                        {kurikulumList.length === 0 && (
                          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>Belum ada rincian kurikulum.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* FOOTER KARTU TOMBOL DAFTAR SEKARANG */}
              <div style={{ padding: '16px 20px 22px' }}>
                <a
                  href={item.daftar_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '13px',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    color: '#FFFFFF',
                    borderRadius: '12px',
                    fontWeight: '800',
                    fontSize: '14px',
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    boxShadow: '0 6px 18px rgba(16, 185, 129, 0.35)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  DAFTAR SEKARANG &rarr;
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
