"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      id="siteHeader"
      className={isScrolled ? 'scrolled' : ''}
      style={{
        background: isMobileMenuOpen ? '#fbf8f1' : undefined,
        backdropFilter: isMobileMenuOpen ? 'none' : undefined,
        WebkitBackdropFilter: isMobileMenuOpen ? 'none' : undefined,
      }}
    >
      <nav>
        <Link href="/" className="brand" style={{ textDecoration: 'none' }} onClick={() => setIsMobileMenuOpen(false)}>
          <span className="mark" style={{ background: 'transparent', overflow: 'hidden' }}>
            <img src="/logo.png" alt="Logo P3HM" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </span>
          <span>Hidayatul Mubtadiat</span>
        </Link>
        
        <div className="nav-links">
          <Link href="/">Beranda</Link>
          <Link href="/profil">Profil Madrasah</Link>
          <Link href="/berita">Portal Berita</Link>
          <Link href="/galeri">Galeri</Link>
          <Link href="/kontak">Kontak</Link>
        </div>
        
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="desktop-ctas" style={{ display: 'flex', gap: '8px' }}>
            <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfUOGLDZHGW7ApSoHTWbrMjbDJXALVHKdHEos95H5fkqxzHmg/viewform" target="_blank" className="nav-cta">Daftar Santri Baru</Link>
            <Link href="/redirect" className="nav-cta" style={{ background: 'var(--gold-500)' }}>Portal Wali & Akademik</Link>
          </div>
          
          <div
            className="burger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ padding: '8px', cursor: 'pointer', zIndex: 110 }}
            aria-label="Toggle Menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-900)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '28px', height: '28px' }}>
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Menggunakan position absolute agar tidak terpotong backdrop-filter header */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            height: 'calc(100vh - 70px)',
            background: '#fbf8f1',
            padding: '24px 28px 48px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflowY: 'auto',
            borderTop: '1px solid rgba(173,138,78,0.2)',
            boxShadow: '0 25px 50px -12px rgba(15,43,36,0.25)',
            zIndex: 999
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-500)' }}>
              Menu Navigasi
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '18px', fontWeight: '600', color: 'var(--teal-900)' }}>
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'inherit' }}>
                Beranda
              </Link>
              <Link href="/profil" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'inherit' }}>
                Profil Madrasah
              </Link>
              <Link href="/berita" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'inherit' }}>
                Portal Berita
              </Link>
              <Link href="/galeri" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'inherit' }}>
                Galeri Dokumentasi
              </Link>
              <Link href="/kontak" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'inherit' }}>
                Hubungi Kami
              </Link>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(173,138,78,0.2)' }}>
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSfUOGLDZHGW7ApSoHTWbrMjbDJXALVHKdHEos95H5fkqxzHmg/viewform"
              target="_blank"
              className="nav-cta"
              style={{ textAlign: 'center', display: 'block', padding: '14px', fontSize: '14.5px' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              📝 Daftar Santri Baru
            </Link>
            <Link
              href="/redirect"
              className="nav-cta"
              style={{ background: 'var(--gold-500)', textAlign: 'center', display: 'block', padding: '14px', fontSize: '14.5px' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              🔐 Portal Wali &amp; Akademik
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
