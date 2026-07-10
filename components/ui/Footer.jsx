import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#0a1a15', color: '#e5ddd0', padding: '80px 0 32px 0', marginTop: 'auto', borderTop: '4px solid var(--gold-500)' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '48px', marginBottom: '64px' }}>
          
          {/* Brand Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img src="/logo.png" alt="Logo P3HM" style={{ width: '48px', height: '48px' }} />
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', color: 'white', fontFamily: '"Fraunces", serif' }}>Hidayatul Mubtadiat</h3>
                <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--gold-500)' }}>Pondok Pesantren Putri</p>
              </div>
            </div>
            <p style={{ fontSize: '14px', lineHeight: '1.8', color: 'rgba(229, 221, 208, 0.8)', margin: 0 }}>
              Menempa muslimah sejati yang berakar pada Kitab Salaf dan siap menyukseskan dakwah di tengah masyarakat.
            </p>
          </div>

          {/* Navigasi Column */}
          <div>
            <h4 style={{ color: 'white', fontSize: '16px', marginBottom: '24px', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Tautan Cepat</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link href="/" style={{ color: 'rgba(229, 221, 208, 0.8)', textDecoration: 'none', transition: 'color 0.2s' }}>Beranda</Link></li>
              <li><Link href="/profil" style={{ color: 'rgba(229, 221, 208, 0.8)', textDecoration: 'none', transition: 'color 0.2s' }}>Profil P3HM</Link></li>
              <li><Link href="/berita" style={{ color: 'rgba(229, 221, 208, 0.8)', textDecoration: 'none', transition: 'color 0.2s' }}>Portal Berita</Link></li>
              <li><Link href="/galeri" style={{ color: 'rgba(229, 221, 208, 0.8)', textDecoration: 'none', transition: 'color 0.2s' }}>Galeri Dokumentasi</Link></li>
              <li><Link href="/pendaftaran" style={{ color: 'var(--gold-500)', textDecoration: 'none', fontWeight: '500' }}>Pendaftaran Santri Baru</Link></li>
            </ul>
          </div>

          {/* Kontak Column */}
          <div>
            <h4 style={{ color: 'white', fontSize: '16px', marginBottom: '24px', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Hubungi Kami</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px', flexShrink: 0, marginTop: '2px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span style={{ fontSize: '14px', lineHeight: '1.6', color: 'rgba(229, 221, 208, 0.8)' }}>Jl. KH. Abdul Karim, PO. Box 140, Lirboyo, Mojoroto, Kota Kediri 64117, Jawa Timur</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px', flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z"/></svg>
                <a href="https://wa.me/628561985565" target="_blank" style={{ fontSize: '14px', color: 'rgba(229, 221, 208, 0.8)', textDecoration: 'none' }}>0856-1985-565</a>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px', flexShrink: 0 }}><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>
                <a href="https://www.instagram.com/p3hmlirboyo/" target="_blank" style={{ fontSize: '14px', color: 'rgba(229, 221, 208, 0.8)', textDecoration: 'none' }}>@p3hmlirboyo</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(229, 221, 208, 0.1)', display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '14px', color: 'rgba(229, 221, 208, 0.6)' }}>
            © {new Date().getFullYear()} Yayasan Hidayatul Mubtadiat · Lirboyo, Kediri.
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '14px' }}>
            <Link href="/tentang-kami" style={{ color: 'rgba(229, 221, 208, 0.8)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = 'rgba(229, 221, 208, 0.8)'}>Tentang Kami</Link>
            <span style={{ color: 'rgba(229, 221, 208, 0.3)' }}>|</span>
            <Link href="/disclaimer" style={{ color: 'rgba(229, 221, 208, 0.8)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = 'rgba(229, 221, 208, 0.8)'}>Disclaimer</Link>
            <span style={{ color: 'rgba(229, 221, 208, 0.3)' }}>|</span>
            <Link href="/privacy-policy" style={{ color: 'rgba(229, 221, 208, 0.8)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = 'rgba(229, 221, 208, 0.8)'}>Privacy Policy</Link>
            <span style={{ color: 'rgba(229, 221, 208, 0.3)' }}>|</span>
            <Link href="/portal" style={{ color: 'rgba(229, 221, 208, 0.8)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = 'rgba(229, 221, 208, 0.8)'}>Portal Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
