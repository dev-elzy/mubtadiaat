"use client";

import { useState } from 'react';
import CustomModal from './CustomModal';

export default function ContactForm() {
  const [modal, setModal] = useState({ show: false, title: '', message: '' });
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    
    // Simulate sending message
    setTimeout(() => {
      setLoading(false);
      setModal({
        show: true,
        title: 'Pesan Terkirim',
        message: 'Terima kasih, pesan Anda telah berhasil dikirim! Staf sekretariat Madrasah P3HM Lirboyo akan segera merespons pesan Anda.'
      });
      e.target.reset();
    }, 800);
  }

  return (
    <>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--teal-900)' }}>Nama Lengkap</label>
          <input 
            type="text" 
            required 
            placeholder="Masukkan nama Anda..." 
            style={{ width: '100%', padding: '12px 16px', border: '1.5px solid rgba(173, 138, 78, 0.2)', borderRadius: '8px', fontSize: '14px', outline: 'none', background: '#fcfbfa' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--teal-900)' }}>Alamat Email</label>
          <input 
            type="email" 
            required 
            placeholder="name@example.com" 
            style={{ width: '100%', padding: '12px 16px', border: '1.5px solid rgba(173, 138, 78, 0.2)', borderRadius: '8px', fontSize: '14px', outline: 'none', background: '#fcfbfa' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--teal-900)' }}>Subjek</label>
          <input 
            type="text" 
            required 
            placeholder="Tujuan pesan (Pendaftaran / Informasi / dll)" 
            style={{ width: '100%', padding: '12px 16px', border: '1.5px solid rgba(173, 138, 78, 0.2)', borderRadius: '8px', fontSize: '14px', outline: 'none', background: '#fcfbfa' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--teal-900)' }}>Pesan Anda</label>
          <textarea 
            required 
            rows="5" 
            placeholder="Tulis pesan lengkap Anda di sini..." 
            style={{ width: '100%', padding: '12px 16px', border: '1.5px solid rgba(173, 138, 78, 0.2)', borderRadius: '8px', fontSize: '14px', outline: 'none', background: '#fcfbfa', resize: 'vertical' }}
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            marginTop: '8px', 
            padding: '14px', 
            background: 'var(--teal-900)', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '8px', 
            fontWeight: '700', 
            fontSize: '14.5px', 
            cursor: loading ? 'wait' : 'pointer', 
            transition: 'all 0.2s', 
            boxShadow: '0 4px 15px rgba(15,43,36,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          {loading ? (
            <>
              <span>Mengirim Pesan...</span>
              <span className="dot-loading"><span></span><span></span><span></span></span>
            </>
          ) : 'Kirim Pesan'}
        </button>
      </form>

      <CustomModal
        show={modal.show}
        type="alert"
        title={modal.title}
        message={modal.message}
        onConfirm={() => setModal({ show: false, title: '', message: '' })}
        confirmText="Tutup"
        theme="teal"
      />
    </>
  );
}
