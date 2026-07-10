"use client";

import { useState, useEffect } from 'react';
import PsbNavbar from '../../components/psb/PsbNavbar';

export const runtime = 'edge';

export default function PendaftaranPage() {
  const [homePage, setHomePage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/psb')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const home = data.find(p => p.is_default_home === 1 || p.slug === 'beranda') || data[0];
          setHomePage(home);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ background: '#fbf8f1', minHeight: '100vh', paddingBottom: '80px', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      {/* PSB Navbar Sesuai Referensi Top Header + Navigasi Menu */}
      <PsbNavbar />

      <div className="wrap" style={{ maxWidth: '1150px', margin: '0 auto', padding: '0 24px' }}>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--ink-soft)' }}>
            Memuat portal penerimaan santri baru...
          </div>
        ) : homePage && homePage.content ? (
          <div 
            className="psb-dynamic-html"
            dangerouslySetInnerHTML={{ __html: homePage.content }}
          />
        ) : (
          <div style={{ background: '#ffffff', border: '1px solid rgba(173,138,78,0.2)', borderRadius: '16px', padding: '36px' }}>
            <h2 style={{ fontFamily: '"Fraunces", serif', color: 'var(--teal-900)', fontSize: '24px', margin: '0 0 12px 0' }}>
              Selamat Datang di Portal Resmi PSB P3HM
            </h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: '15px', lineHeight: '1.8', margin: 0 }}>
              Silakan pilih menu informasi pendaftaran atau isi formulir online melalui menu navigasi di atas.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}
