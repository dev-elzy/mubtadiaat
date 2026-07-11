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

  // Kuning Emas Premium — teks gelap agar kontras maksimal
  const textColor = '#1A3322';
  const subTextColor = '#5C3D0A';
  const navLinkColor = 'rgba(26, 51, 34, 0.82)';

  // Header background: Gradient kuning emas premium seperti logo
  const headerBg = isScrolled
    ? 'linear-gradient(135deg, #C9971C 0%, #D4AF37 40%, #C09520 100%)'
    : 'linear-gradient(135deg, #B88A14 0%, #D4AF37 45%, #C09520 100%)';

  return (
    <header
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '80px',
        background: headerBg,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '3px solid #0F2B24',
        display: 'flex',
        alignItems: 'center',
        zIndex: 9999,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isScrolled
          ? '0 6px 28px rgba(180, 130, 20, 0.45)'
          : '0 4px 20px rgba(180, 130, 20, 0.25)'
      }}
    >
      <div className="wrap" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand & Identitas P3HM */}
        <Link href="/" className="logo-wrap" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.15) 100%)',
            border: '1.5px solid rgba(255,255,255,0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.4)',
            flexShrink: 0
          }}>
            <img src="/logo.png" alt="Logo P3HM" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="brand-title" style={{ color: textColor, fontWeight: '800', fontSize: '17px', lineHeight: '1.15', textShadow: '0 1px 2px rgba(255,255,255,0.3)' }}>
              Hidayatul Mubtadiat
            </span>
            <span className="brand-subtitle" style={{ color: subTextColor, fontWeight: '700', fontSize: '10.5px', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '2px' }}>
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
                  color: active ? '#0F2B24' : navLinkColor,
                  fontWeight: active ? '800' : '600',
                  fontSize: '14px',
                  textDecoration: 'none',
                  padding: '6px 0',
                  transition: 'color 0.2s ease',
                  borderBottom: active ? '2px solid #0F2B24' : '2px solid transparent'
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
                background: '#0F2B24',
                color: '#FAD692',
                padding: '10px 20px',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: '700',
                textDecoration: 'none',
                border: '1px solid rgba(15,43,36,0.2)',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
            >
              Pendaftaran Santri Baru
            </Link>
            <Link
              href="/redirect"
              className="nav-cta"
              style={{
                background: 'rgba(255,255,255,0.35)',
                color: '#0F2B24',
                padding: '10px 20px',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: '700',
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.5)',
                backdropFilter: 'blur(8px)',
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
            <svg viewBox="0 0 24 24" fill="none" stroke={textColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '28px', height: '28px' }}>
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
            background: 'linear-gradient(180deg, #B88A14 0%, #C89820 60%, #A87C12 100%)',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflowY: 'auto',
            borderTop: '1px solid rgba(255,255,255,0.3)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)',
            zIndex: 999
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5C3D0A' }}>
              Menu Navigasi
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '18px', fontWeight: '700', color: '#1A3322' }}>
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    textDecoration: 'none',
                    color: isActive(item) ? '#0F2B24' : 'rgba(26,51,34,0.85)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontWeight: isActive(item) ? '800' : '700'
                  }}
                >
                  {isActive(item) && <span style={{ width: '4px', height: '22px', borderRadius: '2px', background: '#0F2B24' }} />}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.3)' }}>
            <Link
              href="/pendaftaran"
              style={{
                textAlign: 'center',
                display: 'block',
                padding: '14px',
                fontSize: '14.5px',
                background: '#0F2B24',
                color: '#FAD692',
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
                background: 'rgba(255,255,255,0.35)',
                color: '#1A3322',
                borderRadius: '12px',
                fontWeight: '700',
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.5)'
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
