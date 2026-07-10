"use client";

import { useState, useEffect } from 'react';
import PsbNavbar from '../../components/psb/PsbNavbar';
import PsbClassCards from '../../components/psb/PsbClassCards';

export const runtime = 'edge';

export default function PendaftaranPage() {
  const [homePage, setHomePage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/psb')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const home = data.find(p => p.is_default_home === 1 || p.slug === 'beranda');
          setHomePage(home);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ background: '#fbf8f1', minHeight: '100vh', paddingTop: 0, paddingBottom: '80px', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      {/* PSB Navbar Sesuai Referensi Top Header + Navigasi Menu */}
      <PsbNavbar />

      <div className="wrap" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--ink-soft)' }}>
            Memuat portal penerimaan santri baru...
          </div>
        ) : homePage && homePage.content ? (
          <div 
            className="psb-dynamic-html"
            dangerouslySetInnerHTML={{ __html: homePage.content }}
          />
        ) : null}

        {/* TABEL KELAS & MATERI UJIAN / KURIKULUM (Sesuai Referensi Gambar Ke-3) */}
        <PsbClassCards />

      </div>
    </main>
  );
}
