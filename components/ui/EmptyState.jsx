"use client";

import Link from 'next/link';

export default function EmptyState({ 
  title = "Belum Ada Data", 
  message = "Konten yang Anda cari saat ini belum tersedia atau masih dalam proses penyusunan.",
  icon = "news" 
}) {
  const renderIcon = () => {
    switch (icon) {
      case 'gallery':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '48px', height: '48px', color: 'var(--gold-500)' }}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        );
      case 'news':
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '48px', height: '48px', color: 'var(--gold-500)' }}>
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <path d="M16 8h2M16 12h2M8 8h5M8 12h5M8 16h10" />
          </svg>
        );
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '60px 24px',
      background: 'rgba(216, 190, 140, 0.05)',
      border: '1px dashed rgba(173, 138, 78, 0.3)',
      borderRadius: '16px',
      maxWidth: '600px',
      margin: '40px auto',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 4px 20px rgba(15, 43, 36, 0.02)'
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'rgba(173, 138, 78, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '24px',
        boxShadow: 'inset 0 2px 4px rgba(173, 138, 78, 0.05)'
      }}>
        {renderIcon()}
      </div>
      <h3 style={{
        fontFamily: '"Fraunces", serif',
        fontSize: '22px',
        color: 'var(--teal-900)',
        marginBottom: '12px',
        fontWeight: '600'
      }}>
        {title}
      </h3>
      <p style={{
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        fontSize: '14.5px',
        color: 'var(--ink-soft, rgba(15, 43, 36, 0.7))',
        lineHeight: '1.6',
        maxWidth: '440px',
        margin: '0 auto 28px'
      }}>
        {message}
      </p>
      <Link href="/" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 24px',
        background: 'var(--teal-900, #0F2B24)',
        color: '#fff',
        borderRadius: '30px',
        fontSize: '14px',
        fontWeight: '600',
        textDecoration: 'none',
        transition: 'all 0.2s',
        border: '1px solid var(--teal-900, #0F2B24)',
        boxShadow: '0 4px 12px rgba(15, 43, 36, 0.15)'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = 'var(--teal-900)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = 'var(--teal-900)';
        e.currentTarget.style.color = '#fff';
      }}
      >
        <span>&larr;</span> Kembali ke Beranda
      </Link>
    </div>
  );
}
