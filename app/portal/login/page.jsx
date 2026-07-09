"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../portal.css';

export default function PortalLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        router.push('/portal');
        router.refresh();
      } else {
        setError(data.error || 'Username atau password salah.');
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi. Coba beberapa saat lagi.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at top center, #142F28 0%, #0B1A16 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        color: '#fff',
        fontFamily: '"Inter", sans-serif'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'rgba(14, 37, 32, 0.85)',
          border: '1px solid rgba(216, 190, 140, 0.25)',
          borderRadius: '20px',
          padding: '36px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.55)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}
      >
        {/* Header Logo */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #AD8A4E, #D8BE8C)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(173, 138, 78, 0.35)',
              padding: '8px'
            }}
          >
            <img src="/logo.png" alt="Logo P3HM" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
          </div>
          <div>
            <h1 style={{ fontFamily: '"Fraunces", serif', fontSize: '24px', color: '#EAD4A6', margin: 0 }}>
              Portal CMS Admin P3HM
            </h1>
            <p style={{ fontSize: '13px', color: '#A0B2AC', margin: '4px 0 0' }}>
              Pondok Pesantren Putri Hidayatul Mubtadiat &middot; Lirboyo
            </p>
          </div>
        </div>

        {error && (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#FCA5A5',
              padding: '12px 16px',
              borderRadius: '10px',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#D8BE8C' }}>
              Username Admin
            </label>
            <input
              type="text"
              required
              placeholder="Masukkan username admin..."
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(216, 190, 140, 0.25)',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12.5px', fontWeight: '600', color: '#D8BE8C' }}>
              Password Admin
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Masukkan kata sandi..."
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 14px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(216, 190, 140, 0.25)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#A0B2AC',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '8px',
              padding: '13px',
              background: 'linear-gradient(135deg, #AD8A4E, #C4A05C)',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontWeight: '700',
              fontSize: '14.5px',
              cursor: loading ? 'wait' : 'pointer',
              boxShadow: '0 4px 15px rgba(173, 138, 78, 0.35)',
              transition: 'all 0.2s'
            }}
          >
            {loading ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', justifyContent: 'center', width: '100%' }}>
                <span>Memverifikasi Akun</span>
                <span className="dot-loading"><span></span><span></span><span></span></span>
              </span>
            ) : '🔑 Masuk ke Portal CMS'}
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '11.5px', color: '#748C84', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
          Sistem Terotentikasi Server Database &middot; Pondok Pesantren Putri Hidayatul Mubtadiat
        </div>
      </div>
    </div>
  );
}
