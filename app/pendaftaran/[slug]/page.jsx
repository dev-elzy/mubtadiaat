"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PsbNavbar from '../../../components/psb/PsbNavbar';
import PsbClassCards from '../../../components/psb/PsbClassCards';
import PsbAcceptedSantriPublic from '../../../components/psb/PsbAcceptedSantriPublic';

export const runtime = 'edge';

export default function PendaftaranSlugPage() {
  const params = useParams();
  const slug = params?.slug;

  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
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

  const isBeranda = slug === 'beranda';

  return (
    <main style={{ background: '#fbf8f1', minHeight: '100vh', paddingTop: 0, paddingBottom: '80px', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      {/* PSB Navbar Dinamis dari Database */}
      <PsbNavbar />

      <div className="wrap" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--ink-soft)' }}>
            Memuat halaman...
          </div>
        ) : slug === 'informasi-penerimaan' ? (
          <div>
            {page && page.content ? (
              <div className="psb-portal-card">
                <div
                  className="psb-dynamic-html"
                  dangerouslySetInnerHTML={{ __html: page.content }}
                />
              </div>
            ) : null}
            <PsbAcceptedSantriPublic />
          </div>
        ) : !page ? (
          <div style={{ padding: '60px 0', textAlign: 'center' }}>
            <h2 style={{ fontFamily: '"Fraunces", serif', color: 'var(--teal-900)' }}>Halaman Tidak Ditemukan</h2>
            <p style={{ color: 'var(--ink-soft)', marginTop: '8px' }}>Halaman pendaftaran yang Anda cari tidak tersedia.</p>
          </div>
        ) : (
          <div style={{ margin: '24px 0' }}>
            {page.content ? (
              <div className="psb-portal-card">
                <div
                  className="psb-dynamic-html"
                  dangerouslySetInnerHTML={{ __html: page.content }}
                />
              </div>
            ) : null}
          </div>
        )}

        {/* TABEL KELAS & MATERI UJIAN / KURIKULUM - HANYA MUNCUL DI BERANDA */}
        {isBeranda && <PsbClassCards />}
      </div>
    </main>
  );
}
