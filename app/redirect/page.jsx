"use client";

import { useEffect, useState } from 'react';

export default function RedirectPage() {
  const [delay, setDelay] = useState(8000); // Default 8 seconds
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let activeDelay = 8000;

    // 1. Check navigator connection API
    if (typeof navigator !== 'undefined' && navigator.connection) {
      const conn = navigator.connection;
      if (
        conn.effectiveType === '2g' ||
        conn.effectiveType === '3g' ||
        (conn.rtt && conn.rtt > 300) ||
        (conn.downlink && conn.downlink < 1.5)
      ) {
        activeDelay = 10000;
      }
    }

    setDelay(activeDelay);
    setLoaded(true);

    const startTime = Date.now();
    const timer = setTimeout(() => {
      window.location.href = "https://m.p3hm.my.id/login/";
    }, activeDelay);

    // 2. Perform a real-world ping check to double-check latency
    fetch('/api/settings')
      .then(() => {
        const elapsed = Date.now() - startTime;
        if (elapsed > 1200) {
          // Connection is slow, increase delay to 10s
          clearTimeout(timer);
          const newDelay = Math.max(0, 10000 - elapsed);
          setDelay(10000);
          setTimeout(() => {
            window.location.href = "https://m.p3hm.my.id/login/";
          }, newDelay);
        }
      })
      .catch(() => {
        // Fetch failed/offline, fallback to 10s to be safe
        clearTimeout(timer);
        setDelay(10000);
        setTimeout(() => {
          window.location.href = "https://m.p3hm.my.id/login/";
        }, 10000);
      });

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'radial-gradient(circle at center, #16342C 0%, #0F2B24 100%)',
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      textAlign: 'center',
      padding: '24px',
      color: '#e5ddd0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slow-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes horizontal-spin {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.05); opacity: 0.4; }
        }
        @keyframes fill-progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .premium-logo-container {
          position: relative;
          width: 140px;
          height: 140px;
          margin-bottom: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
        }
        
        .glow-ring {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(173,138,78,0.25) 0%, transparent 70%);
          animation: pulse-glow 4s ease-in-out infinite;
          z-index: 1;
        }

        .border-ring {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border-radius: 50%;
          border: 2px solid transparent;
          border-top-color: var(--gold-500, #AD8A4E);
          border-bottom-color: var(--gold-300, #D8BE8C);
          animation: slow-spin 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          z-index: 2;
        }
        
        .rotating-logo {
          position: relative;
          width: 110px;
          height: 110px;
          object-fit: contain;
          z-index: 3;
          animation: horizontal-spin 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          filter: drop-shadow(0 8px 16px rgba(0,0,0,0.4));
          transform-style: preserve-3d;
        }
        
        .info-card {
          max-width: 480px;
          z-index: 10;
          animation: fade-in-up 1s ease-out forwards;
        }

        .title-text {
          font-family: "Fraunces", serif;
          font-size: 24px;
          color: #ffffff;
          margin-bottom: 12px;
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        .desc-text {
          color: rgba(229, 221, 208, 0.7);
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 32px;
          font-weight: 400;
        }

        .progress-container {
          width: 240px;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          margin: 0 auto;
          overflow: hidden;
          position: relative;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--gold-300, #D8BE8C) 0%, var(--gold-500, #AD8A4E) 100%);
          border-radius: 10px;
          width: 0%;
        }

        .progress-bar-active {
          animation: fill-progress linear forwards;
        }

        .footer-note {
          margin-top: 48px;
          font-size: 12px;
          color: rgba(229, 221, 208, 0.4);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
      `}} />

      <div className="premium-logo-container">
        <div className="glow-ring"></div>
        <div className="border-ring"></div>
        <img src="/logo.png" alt="Logo P3HM" className="rotating-logo" />
      </div>

      <div className="info-card">
        <h2 className="title-text">Portal Wali & Akademik</h2>
        <p className="desc-text">
          Mohon tunggu sejenak, Anda sedang dialihkan secara aman ke sistem informasi akademik terpadu Madrasah P3HM Lirboyo.
        </p>

        <div className="progress-container">
          {loaded && (
            <div 
              className="progress-bar progress-bar-active" 
              style={{ animationDuration: `${delay}ms` }}
            ></div>
          )}
        </div>

        <div className="footer-note">
          Menghubungkan ke Server Aman &middot; P3HM Kediri
        </div>
      </div>
    </div>
  );
}

