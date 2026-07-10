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

  return (
    <header
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '80px',
        background: isScrolled ? 'rgba(10, 26, 21, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(218, 190, 140, 0.15)' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5%',
        zIndex: 100,
        transition: 'all 0.3s ease'
      }}
    >
      <Link href="/" className="logo-wrap" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
        <img src="/logo.png" alt="Logo P3HM" style={{ width: '42px', height: '42px' }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontFamily: '"Fraunces", serif', fontSize: '15px', color: '#fff', fontWeight: '600', letterSpacing: '0.02em', lineHeight: '1.2' }}>Hidayatul Mubtadiat</span>
          <span style={{ fontSize: '11px', color: 'var(--gold-500)', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '2px' }}>Pondok Pesantren Putri</span>
        </div>
      </Link>
      
      <div className="nav-links">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-link ${isActive(item) ? 'active' : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
      
      <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div className="desktop-ctas" style={{ display: 'flex', gap: '8px' }}>
          <Link href="/pendaftaran" className="nav-cta">Pendaftaran Santri Baru</Link>
          <Link href="/redirect" className="nav-cta" style={{ background: 'var(--gold-500)' }}>Portal Wali &amp; Akademik</Link>
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

      {/* Mobile Menu Overlay */}
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
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    textDecoration: 'none',
                    color: isActive(item) ? 'var(--gold-500)' : 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  {isActive(item) && <span style={{ width: '4px', height: '20px', borderRadius: '2px', background: 'var(--gold-500)' }} />}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(173,138,78,0.2)' }}>
            <Link
              href="/pendaftaran"
              className="nav-cta"
              style={{ textAlign: 'center', display: 'block', padding: '14px', fontSize: '14.5px' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              📝 Pendaftaran Santri Baru
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
