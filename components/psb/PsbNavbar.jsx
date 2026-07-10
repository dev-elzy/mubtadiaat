"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PsbNavbar() {
  const [pages, setPages] = useState([]);
  const [settings, setSettings] = useState({
    psbPeriode: 'TA 1446 - 1447 H / 2025 - 2026 M',
    psbTitle: 'Penerimaan Santri Baru Pondok Pesantren Putri Hidayatul Mubtadiat'
  });
  const [infoDropdownOpen, setInfoDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    // Ambil daftar menu dari API PSB
    fetch('/api/psb')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPages(data.filter(p => p.status === 'published'));
        }
      })
      .catch(() => {});

    // Ambil pengaturan umum (periode TA dll)
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data === 'object') {
          setSettings(prev => ({
            ...prev,
            psbPeriode: data.psbPeriode || prev.psbPeriode,
            psbTitle: data.psbTitle || prev.psbTitle
          }));
        }
      })
      .catch(() => {});
  }, []);

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setInfoDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'home':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        );
      case 'book':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        );
      case 'info':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        );
      case 'folder':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
        );
      case 'users':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case 'chat':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        );
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        );
    }
  };

  // Pisahkan halaman reguler dari informasi-pendaftaran & informasi-penerimaan
  const regularPages = pages.filter(
    p => p.slug !== 'informasi-pendaftaran' && p.slug !== 'informasi-penerimaan'
  );

  const infoPendaftaranPage = pages.find(p => p.slug === 'informasi-pendaftaran') || {
    title: 'Informasi Pendaftaran',
    slug: 'informasi-pendaftaran'
  };

  const infoPenerimaanPage = pages.find(p => p.slug === 'informasi-penerimaan') || {
    title: 'Informasi Penerimaan (Hasil Seleksi)',
    slug: 'informasi-penerimaan'
  };

  const isInfoActive =
    pathname === '/pendaftaran/informasi-pendaftaran' ||
    pathname === '/pendaftaran/informasi-penerimaan';

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 9999, background: '#ffffff', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
      
      {/* 1. TOP BAR DARK EMERALD (Sesuai Referensi Gambar Ke-1 & Ke-2) */}
      <div style={{
        background: '#0F2B24',
        borderBottom: '1px solid rgba(173,138,78,0.3)',
        color: '#ffffff',
        padding: '12px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {/* LOGO & TITLE PSB ONLINE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #FAD692 0%, #AD8A4E 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(250,214,146,0.35)',
              border: '2px solid #FFFFFF'
            }}>
              <span style={{ fontSize: '20px' }}>🕌</span>
            </div>
            <div>
              <div style={{
                fontFamily: '"Fraunces", serif',
                fontSize: '18px',
                fontWeight: '700',
                color: '#FAD692',
                letterSpacing: '0.02em',
                lineHeight: '1.2'
              }}>
                PSB <span style={{ fontStyle: 'italic', fontWeight: '400' }}>Online</span>
              </div>
              <div style={{
                fontSize: '11.5px',
                color: 'rgba(255,255,255,0.85)',
                letterSpacing: '0.01em'
              }}>
                {settings.psbTitle}
              </div>
            </div>
          </div>

          {/* BADGE TAHUN AJARAN & KEMBALI KE WEBSITE UTAMA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: '#FFFFFF',
              fontSize: '12.5px',
              fontWeight: '700',
              padding: '6px 14px',
              borderRadius: '100px',
              boxShadow: '0 4px 12px rgba(5,150,105,0.3)',
              border: '1px solid rgba(255,255,255,0.15)'
            }}>
              {settings.psbPeriode}
            </div>

            <Link
              href="/"
              style={{
                textDecoration: 'none',
                color: 'rgba(255,255,255,0.85)',
                fontSize: '13px',
                fontWeight: '600',
                padding: '7px 14px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.22)',
                transition: 'all 0.2s ease',
                background: 'rgba(255,255,255,0.06)'
              }}
            >
              ← Website Utama P3HM
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN WHITE NAVIGATION BAR (Dengan Dropdown Informasi & Daftar Menu Dinamis) */}
      <div style={{
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          overflowX: 'auto',
          scrollbarWidth: 'none'
        }}>
          {regularPages.map((page, idx) => {
            const isHome = page.is_default_home === 1 || page.slug === 'beranda';
            const href = isHome ? '/pendaftaran' : `/pendaftaran/${page.slug}`;
            const isActive = pathname === href;

            // Jika eksternal atau download
            if (page.link_type === 'external' || page.link_type === 'download') {
              const targetUrl = page.file_url || page.external_url || '#';
              return (
                <a
                  key={page.id}
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '16px 18px',
                    textDecoration: 'none',
                    color: '#334155',
                    fontSize: '13.5px',
                    fontWeight: '700',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    borderBottom: '3px solid transparent',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ color: '#0F2B24' }}>{renderIcon(page.icon || 'file')}</span>
                  <span>{page.title}</span>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>↗</span>
                </a>
              );
            }

            const element = (
              <Link
                key={page.id}
                href={href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '16px 18px',
                  textDecoration: 'none',
                  color: isActive ? '#0F2B24' : '#334155',
                  fontSize: '13.5px',
                  fontWeight: isActive ? '800' : '700',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  borderBottom: isActive ? '3px solid #0F2B24' : '3px solid transparent',
                  transition: 'all 0.2s ease',
                  background: isActive ? 'rgba(15, 43, 36, 0.04)' : 'transparent'
                }}
              >
                <span style={{ color: isActive ? '#0F2B24' : '#64748b' }}>
                  {renderIcon(page.icon || 'file')}
                </span>
                <span>{page.title}</span>
              </Link>
            );

            // Sisipkan dropdown INFORMASI setelah menu urutan ke-2 (atau setelah Beranda/Pendaftaran Online)
            if (idx === 1 || (regularPages.length === 1 && idx === 0)) {
              return (
                <div key={`wrap-${page.id}`} style={{ display: 'flex', alignItems: 'center' }}>
                  {element}

                  {/* DROPDOWN MENU INFORMASI (Informasi Pendaftaran & Informasi Penerimaan) */}
                  <div
                    ref={dropdownRef}
                    style={{ position: 'relative', display: 'inline-block' }}
                    onMouseEnter={() => setInfoDropdownOpen(true)}
                    onMouseLeave={() => setInfoDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setInfoDropdownOpen(!infoDropdownOpen)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '16px 18px',
                        background: isInfoActive ? 'rgba(15, 43, 36, 0.04)' : 'transparent',
                        border: 'none',
                        borderBottom: isInfoActive ? '3px solid #0F2B24' : '3px solid transparent',
                        color: isInfoActive ? '#0F2B24' : '#334155',
                        fontSize: '13.5px',
                        fontWeight: isInfoActive ? '800' : '700',
                        letterSpacing: '0.02em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span style={{ color: isInfoActive ? '#0F2B24' : '#64748b' }}>
                        {renderIcon('info')}
                      </span>
                      <span>INFORMASI</span>
                      <span style={{ fontSize: '10px', marginLeft: '2px' }}>▼</span>
                    </button>

                    {/* POPUP DROPDOWN KARTU ELEGAN */}
                    {infoDropdownOpen && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        minWidth: '290px',
                        background: '#FFFFFF',
                        border: '1.5px solid rgba(173, 138, 78, 0.35)',
                        borderRadius: '14px',
                        boxShadow: '0 15px 35px rgba(15, 43, 36, 0.18)',
                        padding: '8px',
                        zIndex: 1100,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                      }}>
                        <Link
                          href={`/pendaftaran/${infoPendaftaranPage.slug}`}
                          onClick={() => setInfoDropdownOpen(false)}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            textDecoration: 'none',
                            background: pathname === `/pendaftaran/${infoPendaftaranPage.slug}` ? 'rgba(15, 43, 36, 0.07)' : 'transparent',
                            transition: 'background 0.15s ease'
                          }}
                        >
                          <div style={{ fontSize: '13.5px', fontWeight: '700', color: '#0F2B24' }}>
                            📋 {infoPendaftaranPage.title || 'Informasi Pendaftaran'}
                          </div>
                          <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
                            Jadwal, syarat berkas, &amp; ketentuan pendaftaran
                          </div>
                        </Link>

                        <div style={{ height: '1px', background: '#F1F5F9', margin: '2px 6px' }} />

                        <Link
                          href={`/pendaftaran/${infoPenerimaanPage.slug}`}
                          onClick={() => setInfoDropdownOpen(false)}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            textDecoration: 'none',
                            background: pathname === `/pendaftaran/${infoPenerimaanPage.slug}` ? 'rgba(15, 43, 36, 0.07)' : 'transparent',
                            transition: 'background 0.15s ease'
                          }}
                        >
                          <div style={{ fontSize: '13.5px', fontWeight: '700', color: '#0F2B24' }}>
                            👥 Informasi Penerimaan
                          </div>
                          <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
                            Daftar santriwati lulus seleksi &amp; konfirmasi WA
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            return element;
          })}
        </div>
      </div>
    </header>
  );
}
