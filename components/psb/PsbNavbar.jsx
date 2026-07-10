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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileInfoOpen, setIsMobileInfoOpen] = useState(false);
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

  const sortedRegular = [...regularPages].sort((a, b) => (a.order_num || 0) - (b.order_num || 0));
  const pagesBeforeInfo = sortedRegular.slice(0, 2);
  const pagesAfterInfo = sortedRegular.slice(2);

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

  const renderNavItem = (page) => {
    const isHome = page.is_default_home === 1 || page.slug === 'beranda';
    const href = isHome ? '/pendaftaran' : `/pendaftaran/${page.slug}`;
    const isActive = pathname === href;

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
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: '13.5px',
            fontWeight: '700',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            borderBottom: '3px solid transparent',
            transition: 'all 0.2s ease'
          }}
        >
          <span style={{ color: '#FAD692' }}>{renderIcon(page.icon || 'file')}</span>
          <span>{page.title}</span>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>↗</span>
        </a>
      );
    }

    return (
      <Link
        key={page.id}
        href={href}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '16px 18px',
          textDecoration: 'none',
          color: isActive ? '#FAD692' : 'rgba(255, 255, 255, 0.85)',
          fontSize: '13.5px',
          fontWeight: isActive ? '800' : '700',
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          borderBottom: isActive ? '3px solid #FAD692' : '3px solid transparent',
          transition: 'all 0.2s ease',
          background: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent'
        }}
      >
        <span style={{ color: isActive ? '#FAD692' : 'rgba(255, 255, 255, 0.5)' }}>
          {renderIcon(page.icon || 'file')}
        </span>
        <span>{page.title}</span>
      </Link>
    );
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 9999, background: '#0F2B24', borderBottom: '1px solid rgba(173,138,78,0.35)', boxShadow: '0 4px 25px rgba(0,0,0,0.18)' }}>
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px', position: 'relative' }}>
        
        {/* LOGO & BRAND */}
        <Link href="/pendaftaran" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <img
            src="/logo.png"
            alt="Logo P3HM Lirboyo"
            style={{
              width: '42px',
              height: '42px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.25))'
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <div style={{
              fontFamily: '"Fraunces", serif',
              fontSize: '17px',
              fontWeight: '700',
              color: '#FAD692',
              letterSpacing: '0.02em',
              lineHeight: '1.2'
            }}>
              PSB <span style={{ fontStyle: 'italic', fontWeight: '400' }}>Online</span>
            </div>
            <div style={{
              fontSize: '11px',
              color: 'rgba(255,255,255,0.75)',
              letterSpacing: '0.01em',
              fontWeight: '500'
            }}>
              P3HM Lirboyo
            </div>
          </div>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="psb-desktop-links">
          {pagesBeforeInfo.map(page => renderNavItem(page))}

          {/* DROPDOWN INFORMASI */}
          <div
            ref={dropdownRef}
            style={{ position: 'relative', display: 'inline-block' }}
            onMouseEnter={() => setInfoDropdownOpen(true)}
            onMouseLeave={() => setInfoDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setInfoDropdownOpen(prev => !prev);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '16px 18px',
                background: isInfoActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                border: 'none',
                borderBottom: isInfoActive ? '3px solid #FAD692' : '3px solid transparent',
                color: isInfoActive ? '#FAD692' : 'rgba(255, 255, 255, 0.85)',
                fontSize: '13.5px',
                fontWeight: isInfoActive ? '800' : '700',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ color: isInfoActive ? '#FAD692' : 'rgba(255, 255, 255, 0.5)' }}>
                {renderIcon('info')}
              </span>
              <span>INFORMASI</span>
              <span style={{ fontSize: '10px', marginLeft: '2px', opacity: 0.7 }}>{infoDropdownOpen ? '▲' : '▼'}</span>
            </button>

            {/* POPUP DROPDOWN KARTU ELEGAN */}
            {infoDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                minWidth: '290px',
                background: '#0F2B24',
                border: '1.5px solid rgba(173, 138, 78, 0.4)',
                borderRadius: '16px',
                boxShadow: '0 20px 45px rgba(0, 0, 0, 0.45)',
                padding: '10px',
                zIndex: 99999,
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
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
                    background: pathname === `/pendaftaran/${infoPendaftaranPage.slug}` ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                    transition: 'background 0.15s ease'
                  }}
                >
                  <div style={{ fontSize: '13.5px', fontWeight: '700', color: '#FAD692' }}>
                    📋 {infoPendaftaranPage.title || 'Informasi Pendaftaran'}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.6)', marginTop: '2px' }}>
                    Jadwal, syarat berkas, &amp; ketentuan pendaftaran
                  </div>
                </Link>

                <div style={{ height: '1px', background: 'rgba(173, 138, 78, 0.2)', margin: '2px 6px' }} />

                <Link
                  href={`/pendaftaran/${infoPenerimaanPage.slug}`}
                  onClick={() => setInfoDropdownOpen(false)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    background: pathname === `/pendaftaran/${infoPenerimaanPage.slug}` ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                    transition: 'background 0.15s ease'
                  }}
                >
                  <div style={{ fontSize: '13.5px', fontWeight: '700', color: '#FAD692' }}>
                    👥 Informasi Penerimaan
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.6)', marginTop: '2px' }}>
                    Daftar santriwati lulus seleksi &amp; konfirmasi WA
                  </div>
                </Link>
              </div>
            )}
          </div>

          {pagesAfterInfo.map(page => renderNavItem(page))}
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="psb-desktop-actions">
          <div style={{
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            color: '#FFFFFF',
            fontSize: '11.5px',
            fontWeight: '700',
            padding: '6px 14px',
            borderRadius: '100px',
            boxShadow: '0 4px 12px rgba(5,150,105,0.25)',
            border: '1px solid rgba(255,255,255,0.15)',
            whiteSpace: 'nowrap'
          }}>
            {settings.psbPeriode}
          </div>

          <Link
            href="/"
            style={{
              textDecoration: 'none',
              color: 'rgba(255,255,255,0.9)',
              fontSize: '12.5px',
              fontWeight: '600',
              padding: '7px 14px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.22)',
              transition: 'all 0.2s ease',
              background: 'rgba(255,255,255,0.06)',
              whiteSpace: 'nowrap'
            }}
          >
            ← Website Utama
          </Link>
        </div>

        {/* MOBILE BURGER ICON */}
        <button
          type="button"
          className="psb-burger-icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }}>
            {isMobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* MOBILE DRAWER */}
        {isMobileMenuOpen && (
          <div className="psb-mobile-drawer">
            {pagesBeforeInfo.map(page => {
              const isHome = page.is_default_home === 1 || page.slug === 'beranda';
              const href = isHome ? '/pendaftaran' : `/pendaftaran/${page.slug}`;
              const isActive = pathname === href;
              return (
                <Link
                  key={page.id}
                  href={href}
                  className={`psb-mobile-drawer-link ${isActive ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span style={{ color: '#FAD692' }}>{renderIcon(page.icon || 'file')}</span>
                  <span>{page.title}</span>
                </Link>
              );
            })}

            {/* Accordion Informasi */}
            <div>
              <button
                type="button"
                className={`psb-mobile-accordion-btn ${isInfoActive ? 'active' : ''}`}
                onClick={() => setIsMobileInfoOpen(!isMobileInfoOpen)}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#FAD692' }}>{renderIcon('info')}</span>
                  <span>INFORMASI</span>
                </span>
                <span style={{ fontSize: '10px', opacity: 0.7 }}>{isMobileInfoOpen ? '▲' : '▼'}</span>
              </button>

              {isMobileInfoOpen && (
                <div className="psb-mobile-accordion-content">
                  <Link
                    href={`/pendaftaran/${infoPendaftaranPage.slug}`}
                    className={`psb-mobile-accordion-subitem ${pathname === `/pendaftaran/${infoPendaftaranPage.slug}` ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ textDecoration: 'none' }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#FAD692' }}>
                      📋 {infoPendaftaranPage.title || 'Informasi Pendaftaran'}
                    </div>
                    <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', marginTop: '2px' }}>
                      Jadwal, syarat berkas, &amp; ketentuan
                    </div>
                  </Link>
                  
                  <Link
                    href={`/pendaftaran/${infoPenerimaanPage.slug}`}
                    className={`psb-mobile-accordion-subitem ${pathname === `/pendaftaran/${infoPenerimaanPage.slug}` ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ textDecoration: 'none' }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#FAD692' }}>
                      👥 {infoPenerimaanPage.title || 'Informasi Penerimaan'}
                    </div>
                    <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', marginTop: '2px' }}>
                      Daftar kelulusan &amp; konfirmasi daftar ulang
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {pagesAfterInfo.map(page => {
              const href = `/pendaftaran/${page.slug}`;
              const isActive = pathname === href;
              const targetUrl = page.file_url || page.external_url || '#';
              const isExternal = page.link_type === 'external' || page.link_type === 'download';

              if (isExternal) {
                return (
                  <a
                    key={page.id}
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="psb-mobile-drawer-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span style={{ color: '#FAD692' }}>{renderIcon(page.icon || 'file')}</span>
                    <span>{page.title}</span>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginLeft: 'auto' }}>↗</span>
                  </a>
                );
              }

              return (
                <Link
                  key={page.id}
                  href={href}
                  className={`psb-mobile-drawer-link ${isActive ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span style={{ color: '#FAD692' }}>{renderIcon(page.icon || 'file')}</span>
                  <span>{page.title}</span>
                </Link>
              );
            })}

            {/* MOBILE DRAWER FOOTER (TA & BACK BUTTON) */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginTop: '16px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(173,138,78,0.2)',
              alignItems: 'center',
              width: '100%'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: '#FFFFFF',
                fontSize: '11.5px',
                fontWeight: '700',
                padding: '6px 16px',
                borderRadius: '100px',
                border: '1px solid rgba(255,255,255,0.15)',
                width: 'fit-content'
              }}>
                {settings.psbPeriode}
              </div>

              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  textDecoration: 'none',
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '12.5px',
                  fontWeight: '600',
                  padding: '9px 18px',
                  borderRadius: '100px',
                  border: '1px solid rgba(255,255,255,0.22)',
                  transition: 'all 0.2s ease',
                  background: 'rgba(255,255,255,0.06)',
                  width: '100%',
                  textAlign: 'center',
                  display: 'block'
                }}
              >
                ← Kembali ke Website Utama P3HM
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
