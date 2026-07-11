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
    <main style={{ background: '#FAF7F0', minHeight: '100vh', paddingTop: '106px', paddingBottom: '90px', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      {/* PSB Navbar Dinamis Premium */}
      <PsbNavbar />

      {/* SUBPAGE HEADER BANNER */}
      {!loading && page && (
        <section style={{
          background: 'linear-gradient(135deg, #0A241C 0%, #11382C 100%)',
          padding: '44px 24px',
          borderBottom: '2px solid rgba(212, 175, 55, 0.3)',
          color: '#FFFFFF',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div style={{
              display: 'inline-block',
              fontSize: '11.5px',
              fontWeight: '700',
              color: '#FAD692',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}>
              PORTAL PSB ONLINE P3HM
            </div>
            <h1 style={{
              fontFamily: '"Fraunces", serif',
              fontSize: 'clamp(26px, 3.5vw, 38px)',
              fontWeight: '700',
              margin: 0
            }}>
              {page.title}
            </h1>
          </div>
        </section>
      )}

      <div className="wrap" style={{ maxWidth: '1180px', margin: '36px auto 0', padding: '0 24px' }}>
        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '70px 30px',
            background: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid rgba(173,138,78,0.25)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
            color: '#475569',
            fontSize: '15px',
            fontWeight: '600'
          }}>
            ⏳ Memuat halaman pendaftaran...
          </div>
        ) : slug === 'informasi-penerimaan' ? (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            boxShadow: '0 20px 50px rgba(11, 36, 28, 0.07)',
            padding: '44px 48px',
            marginBottom: '40px'
          }}>
            {page && page.content ? (
              <div
                className="psb-dynamic-html"
                style={{ marginBottom: '28px' }}
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
            ) : null}
            <PsbAcceptedSantriPublic />
          </div>
        ) : !page ? (
          <div style={{ padding: '80px 0', textAlign: 'center' }}>
            <h2 style={{ fontFamily: '"Fraunces", serif', color: '#0B241C', fontSize: '28px' }}>Halaman Tidak Ditemukan</h2>
            <p style={{ color: '#64748b', marginTop: '8px', fontSize: '15px' }}>Halaman pendaftaran yang Anda cari tidak tersedia atau belum dipublikasikan.</p>
          </div>
        ) : (
          <div style={{ margin: '0 0' }}>
            {page.content ? (
              <div style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                boxShadow: '0 20px 50px rgba(11, 36, 28, 0.07)',
                padding: '40px 44px'
              }}>
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
