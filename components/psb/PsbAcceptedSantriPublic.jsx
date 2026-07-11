"use client";

import { useState, useEffect } from 'react';

export default function PsbAcceptedSantriPublic() {
  const [santriList, setSantriList] = useState([]);
  const [waInstansi, setWaInstansi] = useState('628561985565');
  const [psbPeriode, setPsbPeriode] = useState('TA 1446 - 1447 H / 2025 - 2026 M');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/psb/accepted')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.santriList)) {
          setSantriList(data.santriList);
          if (data.waInstansi) setWaInstansi(data.waInstansi);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data && data.psbPeriode) {
          setPsbPeriode(data.psbPeriode);
        }
      })
      .catch(() => {});
  }, []);

  const filtered = santriList.filter(item => {
    const q = search.toLowerCase();
    return (
      (item.no_reg || '').toLowerCase().includes(q) ||
      (item.nama_lengkap || '').toLowerCase().includes(q) ||
      (item.kecamatan || '').toLowerCase().includes(q) ||
      (item.kabupaten || '').toLowerCase().includes(q) ||
      (item.nama_wali || '').toLowerCase().includes(q)
    );
  });

  const generateWaLink = (item) => {
    const text = `Assalamu’alaikum Warahmatullahi Wabarakatuh. Saya wali dari santriwati yang diterima di Pondok Pesantren Putri Hidayatul Mubtadiat Lirboyo:

• No. Registrasi : ${item.no_reg}
• Nama Santriwati: ${item.nama_lengkap}
• Nama Wali      : ${item.nama_wali}
• Asal           : Kec. ${item.kecamatan}, Kab. ${item.kabupaten}

Ingin melakukan konfirmasi daftar ulang resmi. Terima kasih. Wassalamu’alaikum.`;

    const cleanNumber = waInstansi.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
  };

  if (loading) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--ink-soft)' }}>
        Memuat data santriwati yang diterima...
      </div>
    );
  }

  return (
    <div style={{ margin: '0 0' }}>
      {/* KOTAK PENCARIAN SANTRI */}
      <div style={{
        background: '#0F2B24',
        borderRadius: '18px',
        padding: '24px 28px',
        border: '1.5px solid rgba(173, 138, 78, 0.4)',
        boxShadow: '0 12px 30px rgba(15, 43, 36, 0.25)',
        marginBottom: '28px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{
            fontFamily: '"Fraunces", serif',
            fontSize: '20px',
            color: '#FAD692',
            margin: 0
          }}>
            🔍 Cari Hasil Seleksi Santriwati Baru
          </h3>
          <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.85)', margin: 0 }}>
            Ketik No. Registrasi, Nama Santriwati, Kecamatan, atau Kabupaten untuk menemukan data kelulusan dengan cepat:
          </p>
          <input
            type="text"
            placeholder="Contoh: REG-2026-001 atau Aisyah atau Kediri..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 18px',
              borderRadius: '12px',
              border: '1.5px solid rgba(173, 138, 78, 0.5)',
              background: '#0B1F1A',
              color: '#FFFFFF',
              fontSize: '14.5px',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* TABEL SANTRI DITERIMA */}
      <div style={{
        background: '#ffffff',
        borderRadius: '18px',
        border: '1px solid rgba(173, 138, 78, 0.25)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
        overflow: 'hidden'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #14382F 0%, #0F2B24 100%)',
          padding: '18px 24px',
          borderBottom: '1px solid rgba(173, 138, 78, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <h4 style={{
            fontFamily: '"Fraunces", serif',
            fontSize: '17px',
            color: '#FFFFFF',
            margin: 0
          }}>
            📋 Daftar Santriwati Yang Diterima ({filtered.length} Santri)
          </h4>
          <span style={{
            fontSize: '12.5px',
            background: 'rgba(173, 138, 78, 0.2)',
            color: '#FAD692',
            padding: '5px 12px',
            borderRadius: '100px',
            fontWeight: '700'
          }}>
            {psbPeriode}
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left'
          }}>
            <thead>
              <tr style={{
                background: '#FBF8F1',
                borderBottom: '2px solid rgba(173, 138, 78, 0.3)'
              }}>
                <th style={{ padding: '14px 18px', fontSize: '13px', fontWeight: '700', color: '#0F2B24' }}>No. Registrasi</th>
                <th style={{ padding: '14px 18px', fontSize: '13px', fontWeight: '700', color: '#0F2B24' }}>Nama Lengkap</th>
                <th style={{ padding: '14px 18px', fontSize: '13px', fontWeight: '700', color: '#0F2B24' }}>Kecamatan</th>
                <th style={{ padding: '14px 18px', fontSize: '13px', fontWeight: '700', color: '#0F2B24' }}>Kabupaten</th>
                <th style={{ padding: '14px 18px', fontSize: '13px', fontWeight: '700', color: '#0F2B24' }}>Nama Wali</th>
                <th style={{ padding: '14px 18px', fontSize: '13px', fontWeight: '700', color: '#0F2B24', textAlign: 'center' }}>Status &amp; Konfirmasi Resmi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '48px 24px', textAlign: 'center', color: '#6B7280' }}>
                    Data santriwati dengan kata kunci &ldquo;{search}&rdquo; tidak ditemukan.
                  </td>
                </tr>
              ) : (
                filtered.map((item, idx) => {
                  const isActive = Number(item.confirm_status) === 1;
                  return (
                    <tr
                      key={item.id || idx}
                      style={{
                        borderBottom: '1px solid #E5E7EB',
                        background: idx % 2 === 0 ? '#FFFFFF' : '#FAF8F5'
                      }}
                    >
                      <td style={{ padding: '14px 18px', fontSize: '13.5px', fontWeight: '700', color: '#0F2B24' }}>
                        {item.no_reg}
                      </td>
                      <td style={{ padding: '14px 18px', fontSize: '14px', fontWeight: '700', color: '#111827' }}>
                        {item.nama_lengkap}
                      </td>
                      <td style={{ padding: '14px 18px', fontSize: '13.5px', color: '#4B5563' }}>
                        {item.kecamatan}
                      </td>
                      <td style={{ padding: '14px 18px', fontSize: '13.5px', color: '#4B5563' }}>
                        {item.kabupaten}
                      </td>
                      <td style={{ padding: '14px 18px', fontSize: '13.5px', color: '#1F2937', fontWeight: '600' }}>
                        {item.nama_wali}
                      </td>
                      <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '4px 10px',
                            borderRadius: '100px',
                            fontSize: '11.5px',
                            fontWeight: '700',
                            background: 'rgba(16, 185, 129, 0.14)',
                            color: '#059669'
                          }}>
                            ✔ Diterima
                          </span>

                          {isActive ? (
                            <a
                              href={generateWaLink(item)}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '8px 14px',
                                borderRadius: '10px',
                                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                color: '#FFFFFF',
                                fontSize: '12px',
                                fontWeight: '700',
                                textDecoration: 'none',
                                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
                              }}
                            >
                              <span>💬 Konfirmasi Daftar Ulang WA</span>
                            </a>
                          ) : (
                            <span style={{ fontSize: '11px', color: '#9CA3AF', fontStyle: 'italic' }}>
                              (Konfirmasi WA Dinonaktifkan)
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
