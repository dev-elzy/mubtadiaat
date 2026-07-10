"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PsbNavbar from '../../../components/psb/PsbNavbar';

export const runtime = 'edge';

export default function PendaftaranSlugPage() {
  const params = useParams();
  const slug = params?.slug;
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch('/api/psb')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const found = data.find(p => p.slug === slug);
          setPage(found || null);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <main style={{ background: '#fbf8f1', minHeight: '100vh', paddingBottom: '80px', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      {/* PSB Navbar Sesuai Referensi Top Header + Navigasi Menu */}
      <PsbNavbar />

      <div className="wrap" style={{ maxWidth: '1150px', margin: '0 auto', padding: '0 24px' }}>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--ink-soft)' }}>
            Memuat halaman pendaftaran...
          </div>
        ) : page ? (
          <div>
            <div 
              className="psb-dynamic-html"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        ) : (
          <div style={{ background: '#fff', border: '1px solid rgba(173,138,78,0.18)', borderRadius: '20px', padding: '48px', textAlign: 'center' }}>
            <h2 style={{ fontFamily: '"Fraunces", serif', color: 'var(--teal-900)', fontSize: '24px', margin: '0 0 12px 0' }}>Halaman Tidak Ditemukan</h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: '15px', margin: 0 }}>
              Halaman pendaftaran yang Anda cari tidak tersedia atau sedang diperbarui oleh Admin.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}
