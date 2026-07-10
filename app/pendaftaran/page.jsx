"use client";

import { useState, useEffect } from 'react';
import PsbNavbar from '../../components/psb/PsbNavbar';
import PsbClassCards from '../../components/psb/PsbClassCards';

export const runtime = 'edge';

export default function PendaftaranPage() {
  const [homePage, setHomePage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    psbPeriode: 'TA 1446 - 1447 H / 2025 - 2026 M',
    psbFormUrl: 'http://bit.ly/hidayatul-mubtadiaat'
  });

  useEffect(() => {
    fetch('/api/psb')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const home = data.find(p => p.is_default_home === 1 || p.slug === 'beranda');
          setHomePage(home || null);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data === 'object') {
          setSettings(prev => ({
            ...prev,
            psbPeriode: data.psbPeriode || prev.psbPeriode,
            psbFormUrl: data.psbFormUrl || prev.psbFormUrl
          }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <main style={{ background: '#FAF7F0', minHeight: '100vh', paddingTop: '106px', paddingBottom: '90px', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      {/* PSB Navbar Premium */}
      <PsbNavbar />

      {/* LUXURY PSB HERO BANNER */}
      <section style={{
        background: 'linear-gradient(135deg, #071D17 0%, #0D2D23 50%, #0A221A 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: '64px 24px 72px',
        borderBottom: '2px solid rgba(212, 175, 55, 0.35)',
        color: '#FFFFFF'
      }}>
        {/* Glow & Islamic Decorative Ornaments */}
        <div style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.16) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-100px',
          left: '10%',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1160px', margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 18px',
            background: 'rgba(212, 175, 55, 0.14)',
            border: '1px solid rgba(212, 175, 55, 0.45)',
            borderRadius: '100px',
            color: '#FAD692',
            fontSize: '12.5px',
            fontWeight: '700',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: '20px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.25)'
          }}>
            <span>✨ RESMI DIBUKA — {settings.psbPeriode}</span>
          </div>

          <h1 style={{
            fontFamily: '"Fraunces", serif',
            fontSize: 'clamp(30px, 4.2vw, 48px)',
            fontWeight: '700',
            lineHeight: '1.2',
            color: '#FFFFFF',
            maxWidth: '860px',
            margin: '0 auto 16px',
            letterSpacing: '0.01em'
          }}>
            Membentuk Pribadi <span style={{ color: '#FAD692', fontStyle: 'italic' }}>Muslimah Sejati</span> Berlandaskan Kitab Salaf
          </h1>

          <p style={{
            fontSize: 'clamp(14.5px, 1.8vw, 17px)',
            color: 'rgba(255, 255, 255, 0.82)',
            maxWidth: '720px',
            margin: '0 auto 34px',
            lineHeight: '1.75'
          }}>
            Portal resmi pendaftaran santriwati baru Pondok Pesantren Putri Hidayatul Mubtadiat (P3HM) Lirboyo, Kota Kediri. Seluruh tahapan pendaftaran, seleksi, hingga pengumuman dapat dipantau secara terpadu melalui portal online ini.
          </p>

          {/* 4 Tahapan PSB Highlights */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            maxWidth: '980px',
            margin: '0 auto',
            textAlign: 'left'
          }}>
            {[
              { num: '01', title: 'Pendaftaran Online', desc: 'Pengisian formulir biodata & pemilihan jenjang diniyah.' },
              { num: '02', title: 'Verifikasi Berkas', desc: 'Pemeriksaan dokumen & persyaratan administrasi calon santri.' },
              { num: '03', title: 'Seleksi & Evaluasi', desc: 'Ujian materi kitab salaf, tahfidz, atau wawancara akhlak.' },
              { num: '04', title: 'Pengumuman Resmi', desc: 'Hasil seleksi diumumkan langsung melalui portal & konfirmasi WA.' }
            ].map((step, i) => (
              <div key={i} style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '16px',
                padding: '18px 20px',
                backdropFilter: 'blur(8px)',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}>
                <div style={{ fontSize: '11.5px', fontWeight: '800', color: '#FAD692', letterSpacing: '0.08em', marginBottom: '6px' }}>
                  TAHAP {step.num}
                </div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#FFFFFF', marginBottom: '4px' }}>
                  {step.title}
                </div>
                <div style={{ fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.68)', lineHeight: '1.5' }}>
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WRAP PERMUKAAN HALAMAN BERANDA */}
      <div className="wrap" style={{ maxWidth: '1200px', margin: '-30px auto 0', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        
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
            ⏳ Memuat informasi portal penerimaan santri baru...
          </div>
        ) : homePage && homePage.content ? (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            boxShadow: '0 20px 50px rgba(11, 36, 28, 0.07)',
            padding: '40px 44px',
            marginBottom: '44px'
          }}>
            <div 
              className="psb-dynamic-html"
              dangerouslySetInnerHTML={{ __html: homePage.content }}
            />
          </div>
        ) : null}

        {/* SECTION TABEL KELAS & MATERI UJIAN / KURIKULUM */}
        <PsbClassCards />

      </div>
    </main>
  );
}
