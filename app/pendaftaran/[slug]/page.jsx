"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PsbNavbar from '../../../components/psb/PsbNavbar';
import PsbClassCards from '../../../components/psb/PsbClassCards';

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

  return (
    <main style={{ background: '#fbf8f1', minHeight: '100vh', paddingTop: 0, paddingBottom: '80px', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      {/* PSB Navbar Sesuai Referensi Top Header + Navigasi Menu */}
      <PsbNavbar />

      <div className="wrap" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--ink-soft)' }}>
            Memuat halaman...
          </div>
        ) : !page ? (
          <div style={{ padding: '60px 0', textAlign: 'center' }}>
            <h2 style={{ fontFamily: '"Fraunces", serif', color: 'var(--teal-900)' }}>Halaman Tidak Ditemukan</h2>
            <p style={{ color: 'var(--ink-soft)', marginTop: '8px' }}>Halaman pendaftaran yang Anda cari tidak tersedia.</p>
          </div>
        ) : (
          <div style={{ margin: '24px 0' }}>
            {page.content ? (
              <div
                className="psb-dynamic-html"
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
            ) : null}
          </div>
        )}

        {/* TABEL KELAS & MATERI UJIAN / KURIKULUM (Tampil secara konsisten di setiap halaman PSB) */}
        <PsbClassCards />
      </div>
    </main>
  );
}
