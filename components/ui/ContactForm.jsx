"use client";

import { useState } from 'react';
import CustomModal from './CustomModal';

export default function ContactForm() {
  const [modal, setModal] = useState({ show: false, title: '', message: '' });
  const [loading, setLoading] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/pesan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setModal({
          show: true,
          title: 'Pesan Terkirim',
          message: 'Terima kasih, pesan Anda telah berhasil dikirim! Staf sekretariat Madrasah P3HM Lirboyo akan segera merespons pesan Anda.'
        });
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setModal({
          show: true,
          title: 'Gagal Mengirim',
          message: data.error || 'Terjadi kesalahan saat mengirim pesan. Silakan coba kembali.'
        });
      }
    } catch (err) {
      setModal({
        show: true,
        title: 'Kesalahan Jaringan',
        message: 'Tidak dapat menghubungi server. Pastikan koneksi internet Anda aktif dan coba lagi.'
      });
    } finally {
      setLoading(false);
    }
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
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', border: '1.5px solid rgba(173, 138, 78, 0.2)', borderRadius: '8px', fontSize: '14px', outline: 'none', background: '#fcfbfa' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--teal-900)' }}>Alamat Email</label>
          <input 
            type="email" 
            required 
            placeholder="name@example.com" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', border: '1.5px solid rgba(173, 138, 78, 0.2)', borderRadius: '8px', fontSize: '14px', outline: 'none', background: '#fcfbfa' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--teal-900)' }}>Subjek</label>
          <input 
            type="text" 
            required 
            placeholder="Tujuan pesan (Pendaftaran / Informasi / dll)" 
            value={subject}
            onChange={e => setSubject(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', border: '1.5px solid rgba(173, 138, 78, 0.2)', borderRadius: '8px', fontSize: '14px', outline: 'none', background: '#fcfbfa' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--teal-900)' }}>Pesan Anda</label>
          <textarea 
            required 
            rows="5" 
            placeholder="Tulis pesan lengkap Anda di sini..." 
            value={message}
            onChange={e => setMessage(e.target.value)}
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
