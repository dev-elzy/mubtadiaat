"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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

  const navItems = [
    { href: '/', label: 'Beranda', exact: true },
    { href: '/profil', label: 'Profil P3HM' },
    { href: '/berita', label: 'Portal Berita' },
    { href: '/galeri', label: 'Galeri' },
    { href: '/kontak', label: 'Kontak' },
  ];

  function isActive(item) {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  }

  // Warna teks menyesuaikan status scroll agar selalu berkontras tinggi & tajam
  const textColor = isScrolled ? '#FFFFFF' : 'var(--teal-900)';
  const subTextColor = 'var(--gold-500)';
  const navLinkColor = isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'var(--ink)';

  return (
    <header
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '80px',
        background: isScrolled ? 'rgba(15, 43, 36, 0.98)' : 'rgba(251, 248, 241, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: isScrolled ? '1px solid rgba(218, 190, 140, 0.25)' : '1px solid rgba(173, 138, 78, 0.18)',
        display: 'flex',
        alignItems: 'center',
        zIndex: 9999,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isScrolled ? '0 10px 30px rgba(0,0,0,0.15)' : '0 4px 20px rgba(15,43,36,0.03)'
      }}
    >
      <div className="wrap" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand & Identitas P3HM */}
        <Link href="/" className="logo-wrap" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <img src="/logo.png" alt="Logo P3HM" className="brand-logo" style={{ objectFit: 'contain' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="brand-title" style={{ color: textColor }}>
              Hidayatul Mubtadiat
            </span>
            <span className="brand-subtitle" style={{ color: subTextColor }}>
              Pondok Pesantren Putri
            </span>
          </div>
        </Link>
        
        {/* Navigasi Desktop */}
        <div className="nav-links" style={{ gap: '28px', alignItems: 'center' }}>
          {navItems.map(item => {
            const active = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${active ? 'active' : ''}`}
                style={{
                  color: active ? 'var(--gold-500)' : navLinkColor,
                  fontWeight: active ? '700' : '600',
                  fontSize: '14px',
                  textDecoration: 'none',
                  padding: '6px 0',
                  transition: 'color 0.2s ease',
                  borderBottom: active ? '2px solid var(--gold-500)' : '2px solid transparent'
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        
        {/* CTA Buttons */}
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div className="desktop-ctas" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Link
              href="/pendaftaran"
              className="nav-cta"
              style={{
                background: 'var(--teal-900)',
                color: '#ffffff',
                padding: '10px 20px',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: '700',
                textDecoration: 'none',
                border: '1px solid rgba(218, 190, 140, 0.3)',
                transition: 'all 0.2s ease'
              }}
            >
              Pendaftaran Santri Baru
            </Link>
            <Link
              href="/redirect"
              className="nav-cta"
              style={{
                background: 'linear-gradient(90deg, var(--gold-500) 0%, #C4A05C 100%)',
                color: '#0F2B24',
                padding: '10px 20px',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: '700',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              Portal Wali &amp; Akademik
            </Link>
          </div>
          
          {/* Tombol Mobile Menu */}
          <div
            className="burger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ padding: '8px', cursor: 'pointer', zIndex: 910 }}
            aria-label="Toggle Menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke={textColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '28px', height: '28px' }}>
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          style={{
            position: 'absolute',
            top: '80px',
            left: 0,
            right: 0,
            height: 'calc(100vh - 80px)',
            background: '#fbf8f1',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflowY: 'auto',
            borderTop: '1px solid rgba(173,138,78,0.2)',
            boxShadow: '0 25px 50px -12px rgba(15,43,36,0.25)',
            zIndex: 999
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-500)' }}>
              Menu Navigasi
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '18px', fontWeight: '700', color: 'var(--teal-900)' }}>
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    textDecoration: 'none',
                    color: isActive(item) ? 'var(--gold-500)' : 'var(--teal-900)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  {isActive(item) && <span style={{ width: '4px', height: '22px', borderRadius: '2px', background: 'var(--gold-500)' }} />}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(173,138,78,0.2)' }}>
            <Link
              href="/pendaftaran"
              style={{
                textAlign: 'center',
                display: 'block',
                padding: '14px',
                fontSize: '14.5px',
                background: 'var(--teal-900)',
                color: '#fff',
                borderRadius: '12px',
                fontWeight: '700',
                textDecoration: 'none'
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              📝 Pendaftaran Santri Baru
            </Link>
            <Link
              href="/redirect"
              style={{
                textAlign: 'center',
                display: 'block',
                padding: '14px',
                fontSize: '14.5px',
                background: 'var(--gold-500)',
                color: 'var(--teal-900)',
                borderRadius: '12px',
                fontWeight: '700',
                textDecoration: 'none'
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              🎓 Portal Wali &amp; Akademik
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
