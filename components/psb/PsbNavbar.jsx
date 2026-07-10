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
    fetch('/api/psb')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPages(data.filter(p => p.status === 'published'));
        }
      })
      .catch(() => {});

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
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        );
      case 'book':
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        );
      case 'info':
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        );
      case 'folder':
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
        );
      case 'users':
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case 'chat':
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        );
      default:
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        );
    }
  };

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
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            padding: '8px 14px',
            borderRadius: '99px',
            textDecoration: 'none',
            color: 'rgba(255, 255, 255, 0.88)',
            fontSize: '13px',
            fontWeight: '600',
            letterSpacing: '0.01em',
            transition: 'all 0.2s ease',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(212, 175, 55, 0.18)';
            e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.45)';
            e.currentTarget.style.color = '#FAD692';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.88)';
          }}
        >
          <span style={{ color: '#FAD692', display: 'flex', alignItems: 'center' }}>{renderIcon(page.icon || 'file')}</span>
          <span>{page.title} ↗</span>
        </a>
      );
    }

    return (
      <Link
        key={page.id}
        href={href}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '7px',
          padding: '8px 15px',
          borderRadius: '99px',
          textDecoration: 'none',
          color: isActive ? '#0A1E17' : 'rgba(255, 255, 255, 0.9)',
          fontSize: '13px',
          fontWeight: isActive ? '700' : '600',
          background: isActive ? 'linear-gradient(135deg, #FAD692 0%, #E2B863 100%)' : 'transparent',
          boxShadow: isActive ? '0 4px 14px rgba(226, 184, 99, 0.3)' : 'none',
          transition: 'all 0.2s ease',
          border: isActive ? '1px solid #FAD692' : '1px solid transparent'
        }}
        onMouseEnter={e => {
          if (!isActive) {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.color = '#FAD692';
          }
        }}
        onMouseLeave={e => {
          if (!isActive) {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
          }
        }}
      >
        <span style={{ color: isActive ? '#0A1E17' : '#FAD692', display: 'flex', alignItems: 'center' }}>
          {renderIcon(page.icon || 'file')}
        </span>
        <span>{page.title}</span>
      </Link>
    );
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      zIndex: 1000,
      margin: 0,
      background: 'linear-gradient(180deg, #071813 0%, #0B241C 100%)',
      borderBottom: '1px solid rgba(212, 175, 55, 0.28)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)'
    }}>
      {/* Top Bar Announcement */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.25)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        padding: '6px 24px',
        fontSize: '11.5px',
        color: 'rgba(255, 255, 255, 0.75)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            display: 'inline-block',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#34D399',
            boxShadow: '0 0 8px #34D399'
          }} />
          <span>Portal Resmi Penerimaan Santri Baru (PSB) Online P3HM Lirboyo Kediri</span>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          fontWeight: '600'
        }}>
          <span style={{ color: '#FAD692' }}>📅 {settings.psbPeriode}</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        {/* Brand Logo */}
        <Link href="/pendaftaran" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #103B2E 0%, #0A241C 100%)',
            border: '1.5px solid rgba(212, 175, 55, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            flexShrink: 0
          }}>
            <img src="/images/logo-p3hm.png" alt="Logo P3HM" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
          </div>
          <div>
            <div style={{
              fontFamily: '"Fraunces", serif',
              fontSize: '17px',
              fontWeight: '700',
              color: '#FFFFFF',
              letterSpacing: '0.02em',
              lineHeight: '1.15'
            }}>
              PSB Online P3HM
            </div>
            <div style={{
              fontSize: '10.5px',
              fontWeight: '600',
              color: '#FAD692',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginTop: '2px'
            }}>
              Lirboyo Kediri
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="psb-desktop-links" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {pagesBeforeInfo.map(page => renderNavItem(page))}

          {/* Dropdown Informasi */}
          <div style={{ position: 'relative' }} ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setInfoDropdownOpen(!infoDropdownOpen)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '8px 15px',
                borderRadius: '99px',
                border: isInfoActive ? '1px solid #FAD692' : '1px solid transparent',
                background: isInfoActive ? 'linear-gradient(135deg, #FAD692 0%, #E2B863 100%)' : 'transparent',
                color: isInfoActive ? '#0A1E17' : 'rgba(255, 255, 255, 0.9)',
                fontSize: '13px',
                fontWeight: isInfoActive ? '700' : '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ color: isInfoActive ? '#0A1E17' : '#FAD692', display: 'flex', alignItems: 'center' }}>
                {renderIcon('info')}
              </span>
              <span>INFORMASI</span>
              <span style={{ fontSize: '10px', opacity: 0.75 }}>▼</span>
            </button>

            {/* Dropdown Menu */}
            {infoDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                left: 0,
                minWidth: '310px',
                background: '#0B241C',
                border: '1.5px solid rgba(212, 175, 55, 0.4)',
                borderRadius: '16px',
                boxShadow: '0 20px 45px rgba(0, 0, 0, 0.55)',
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
                    borderRadius: '12px',
                    textDecoration: 'none',
                    background: pathname === `/pendaftaran/${infoPendaftaranPage.slug}` ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ fontSize: '13.5px', fontWeight: '700', color: '#FAD692' }}>
                    📋 {infoPendaftaranPage.title || 'Informasi Pendaftaran'}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.65)', marginTop: '2px' }}>
                    Jadwal, syarat berkas, &amp; panduan alur pendaftaran
                  </div>
                </Link>

                <div style={{ height: '1px', background: 'rgba(212, 175, 55, 0.18)', margin: '2px 6px' }} />

                <Link
                  href={`/pendaftaran/${infoPenerimaanPage.slug}`}
                  onClick={() => setInfoDropdownOpen(false)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    background: pathname === `/pendaftaran/${infoPenerimaanPage.slug}` ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ fontSize: '13.5px', fontWeight: '700', color: '#FAD692' }}>
                    👥 Informasi Penerimaan
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.65)', marginTop: '2px' }}>
                    Daftar santriwati lolos seleksi &amp; konfirmasi
                  </div>
                </Link>
              </div>
            )}
          </div>

          {pagesAfterInfo.map(page => renderNavItem(page))}
        </nav>

        {/* Desktop Actions */}
        <div className="psb-desktop-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '99px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              fontSize: '12.5px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
          >
            ← Website Utama
          </Link>
        </div>

        {/* Mobile Burger Icon */}
        <button
          type="button"
          className="psb-burger-icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '26px', height: '26px' }}>
            {isMobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
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
              <span style={{ fontSize: '11px', opacity: 0.7 }}>{isMobileInfoOpen ? '▲' : '▼'}</span>
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
                </Link>
                <Link
                  href={`/pendaftaran/${infoPenerimaanPage.slug}`}
                  className={`psb-mobile-accordion-subitem ${pathname === `/pendaftaran/${infoPenerimaanPage.slug}` ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ textDecoration: 'none' }}
                >
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#FAD692' }}>
                    👥 Informasi Penerimaan
                  </div>
                </Link>
              </div>
            )}
          </div>

          {pagesAfterInfo.map(page => {
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

          <div style={{ height: '1px', background: 'rgba(212, 175, 55, 0.25)', margin: '8px 0' }} />

          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#FFFFFF',
              fontWeight: '600',
              textDecoration: 'none',
              fontSize: '13.5px'
            }}
          >
            ← Kembali ke Website Utama
          </Link>
        </div>
      )}
    </header>
  );
}
