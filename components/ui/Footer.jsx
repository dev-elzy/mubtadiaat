import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, #B88A14 0%, #A07810 60%, #8C6A0C 100%)',
      color: '#1A3322',
      padding: '72px 0 28px 0',
      marginTop: 'auto',
      borderTop: '3px solid #0F2B24',
      boxShadow: '0 -4px 32px rgba(180,130,20,0.25)'
    }}>
      <div className="wrap">
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '48px', marginBottom: '56px' }}>
          
          {/* Brand Column */}
          <div className="footer-grid-col" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="footer-brand-wrap" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '14px',
                background: 'rgba(255,255,255,0.28)',
                border: '1.5px solid rgba(255,255,255,0.45)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35)'
              }}>
                <img src="/logo.png" alt="Logo P3HM" style={{ width: '34px', height: '34px', objectFit: 'contain' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ margin: 0, fontSize: '18px', color: '#0F2B24', fontFamily: '"Fraunces", serif', fontWeight: '700' }}>
                  Hidayatul Mubtadiat
                </h3>
                <p style={{ margin: '3px 0 0', fontSize: '13px', color: 'rgba(15,43,36,0.7)', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Pondok Pesantren Putri
                </p>
              </div>
            </div>
            <p style={{ fontSize: '14px', lineHeight: '1.8', color: 'rgba(26,51,34,0.82)', margin: 0 }}>
              Menempa muslimah sejati yang berakar pada Kitab Salaf dan siap menyukseskan dakwah di tengah masyarakat.
            </p>
          </div>

          {/* Navigasi Column */}
          <div className="footer-grid-col">
            <h4 style={{ color: '#0F2B24', fontSize: '15px', fontWeight: '800', marginBottom: '22px', letterSpacing: '0.02em' }}>Tautan Cepat</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { href: '/', label: 'Beranda' },
                { href: '/profil', label: 'Profil P3HM' },
                { href: '/berita', label: 'Portal Berita' },
                { href: '/galeri', label: 'Galeri Dokumentasi' },
                { href: '/pendaftaran', label: 'Pendaftaran Santri Baru', highlight: true },
              ].map(({ href, label, highlight }) => (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      color: highlight ? '#0F2B24' : 'rgba(26,51,34,0.78)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: highlight ? '700' : '500',
                      transition: 'color 0.2s',
                      borderBottom: highlight ? '1.5px solid rgba(15,43,36,0.4)' : 'none',
                      paddingBottom: highlight ? '2px' : '0'
                    }}
                  >{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hubungi Kami Column */}
          <div className="footer-grid-col">
            <h4 style={{ color: '#0F2B24', fontSize: '15px', fontWeight: '800', marginBottom: '22px', letterSpacing: '0.02em' }}>Hubungi Kami</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#0F2B24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '19px', height: '19px', flexShrink: 0, marginTop: '2px', opacity: 0.7 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span style={{ fontSize: '14px', lineHeight: '1.6', color: 'rgba(26,51,34,0.78)' }}>
                  Jl. KH. Abdul Karim, PO. Box 140, Lirboyo, Mojoroto, Kota Kediri 64117, Jawa Timur
                </span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#0F2B24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '19px', height: '19px', flexShrink: 0, opacity: 0.7 }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z"/>
                </svg>
                <a href="https://wa.me/628561985565" target="_blank" style={{ fontSize: '14px', color: 'rgba(26,51,34,0.82)', textDecoration: 'none', fontWeight: '500' }}>
                  0856-1985-565
                </a>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#0F2B24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '19px', height: '19px', flexShrink: 0, opacity: 0.7 }}>
                  <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>
                </svg>
                <a href="https://www.instagram.com/p3hmlirboyo/" target="_blank" style={{ fontSize: '14px', color: 'rgba(26,51,34,0.82)', textDecoration: 'none', fontWeight: '500' }}>
                  @p3hmlirboyo
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom" style={{
          paddingTop: '28px',
          borderTop: '1px solid rgba(15,43,36,0.2)',
          display: 'flex', flexWrap: 'wrap', gap: '20px',
          justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div style={{ fontSize: '13.5px', color: 'rgba(26,51,34,0.65)', fontWeight: '500' }}>
            © {new Date().getFullYear()} Yayasan Hidayatul Mubtadiat · Lirboyo, Kediri.
          </div>
          <div className="footer-bottom-links" style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', fontSize: '13.5px' }}>
            {[
              { href: '/tentang-kami', label: 'Tentang Kami' },
              { href: '/disclaimer', label: 'Disclaimer' },
              { href: '/privacy-policy', label: 'Privacy Policy' },
              { href: '/portal', label: 'Portal Admin' },
            ].map(({ href, label }, i, arr) => (
              <span key={href} style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                <Link href={href} style={{ color: 'rgba(26,51,34,0.75)', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}>
                  {label}
                </Link>
                {i < arr.length - 1 && <span style={{ color: 'rgba(15,43,36,0.3)' }}>|</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
