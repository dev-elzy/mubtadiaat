"use client";

import { useState, useEffect } from 'react';
import RichTextEditor from './RichTextEditor';

export default function TabPsb({ showToast, confirm }) {
  const [pages, setPages] = useState([]);
  const [settings, setSettings] = useState({
    psbPeriode: 'TA 1446 - 1447 H / 2025 - 2026 M',
    psbTitle: 'Penerimaan Santri Baru Pondok Pesantren Putri Hidayatul Mubtadiat'
  });
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);

  const [form, setForm] = useState({
    id: '',
    title: '',
    slug: '',
    icon: 'file',
    orderNum: 1,
    isDefaultHome: false,
    linkType: 'page',
    externalUrl: '',
    fileUrl: '',
    content: '',
    status: 'published'
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/psb');
      const data = await res.json();
      if (Array.isArray(data)) {
        setPages(data);
      }
      const setRes = await fetch('/api/settings');
      const setData = await setRes.json();
      if (setData && typeof setData === 'object') {
        setSettings(prev => ({
          ...prev,
          psbPeriode: setData.psbPeriode || prev.psbPeriode,
          psbTitle: setData.psbTitle || prev.psbTitle
        }));
      }
    } catch (e) {
      if (showToast) showToast('Gagal memuat data PSB', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        if (showToast) showToast('Periode & Pengaturan Banner PSB berhasil diperbarui!', 'success');
      }
    } catch (e) {
      if (showToast) showToast('Gagal menyimpan pengaturan PSB', 'error');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleOpenCreate = () => {
    setForm({
      id: 'psb-' + Date.now(),
      title: '',
      slug: '',
      icon: 'file',
      orderNum: pages.length + 1,
      isDefaultHome: false,
      linkType: 'page',
      externalUrl: '',
      fileUrl: '',
      content: '',
      status: 'published'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setForm({
      id: item.id,
      title: item.title || '',
      slug: item.slug || '',
      icon: item.icon || 'file',
      orderNum: item.order_num || 1,
      isDefaultHome: Boolean(item.is_default_home),
      linkType: item.link_type || 'page',
      externalUrl: item.external_url || '',
      fileUrl: item.file_url || '',
      content: item.content || '',
      status: item.status || 'published'
    });
    setModalOpen(true);
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    const autoSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    setForm(prev => ({
      ...prev,
      title: val,
      slug: prev.id.startsWith('psb-') && !prev.slug ? autoSlug : prev.slug
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Untuk upload file brosur/PDF (bisa ke Cloudinary atau base64 fallback)
    const reader = new FileReader();
    reader.onload = () => {
      setForm(prev => ({ ...prev, fileUrl: reader.result }));
      if (showToast) showToast('File berhasil dilampirkan', 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleSaveMenu = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) {
      if (showToast) showToast('Judul dan URL Slug wajib diisi', 'error');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/psb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const resData = await res.json();
      if (res.ok && resData.success) {
        if (showToast) showToast('Menu & Halaman PSB berhasil disimpan!', 'success');
        setModalOpen(false);
        loadData();
      } else {
        if (showToast) showToast(resData.error || 'Gagal menyimpan', 'error');
      }
    } catch (err) {
      if (showToast) showToast('Terjadi kesalahan jaringan', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    const ok = await confirm(`Hapus menu PSB "${item.title}"? Menu dan halamannya tidak akan bisa diakses lagi.`);
    if (!ok) return;

    try {
      const res = await fetch('/api/psb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id: item.id })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (showToast) showToast('Menu PSB berhasil dihapus', 'success');
        loadData();
      } else {
        if (showToast) showToast(data.error || 'Gagal menghapus', 'error');
      }
    } catch (err) {
      if (showToast) showToast('Terjadi kesalahan koneksi', 'error');
    }
  };

  return (
    <div>
      {/* PENGATURAN BANNER ATAS PSB (Periode TA & Judul) */}
      <form onSubmit={handleSaveSettings} style={{
        background: '#ffffff',
        border: '1px solid rgba(173,138,78,0.2)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '32px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
      }}>
        <h3 style={{ fontFamily: '"Fraunces", serif', fontSize: '19px', color: 'var(--teal-900)', margin: '0 0 16px 0' }}>
          ⚙️ Pengaturan Periode &amp; Banner Atas PSB Online
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--teal-900)', marginBottom: '8px' }}>
              Badge Periode Tahun Ajaran (Pojok Kanan Atas Header PSB)
            </label>
            <input
              type="text"
              value={settings.psbPeriode}
              onChange={(e) => setSettings({ ...settings, psbPeriode: e.target.value })}
              placeholder="Contoh: TA 1446 - 1447 H / 2025 - 2026 M"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid rgba(173,138,78,0.3)',
                fontSize: '14px',
                color: 'var(--ink)'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--teal-900)', marginBottom: '8px' }}>
              Judul Portal / Identitas Madrasah
            </label>
            <input
              type="text"
              value={settings.psbTitle}
              onChange={(e) => setSettings({ ...settings, psbTitle: e.target.value })}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid rgba(173,138,78,0.3)',
                fontSize: '14px',
                color: 'var(--ink)'
              }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            disabled={savingSettings}
            style={{
              background: 'var(--teal-900)',
              color: 'var(--gold-500)',
              border: 'none',
              padding: '10px 22px',
              borderRadius: '10px',
              fontWeight: '700',
              fontSize: '13.5px',
              cursor: 'pointer'
            }}
          >
            {savingSettings ? 'Menyimpan...' : 'Simpan Pengaturan Periode PSB'}
          </button>
        </div>
      </form>

      {/* HEADER DAFTAR MENU PSB */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontFamily: '"Fraunces", serif', fontSize: '22px', color: 'var(--teal-900)', margin: '0 0 6px 0' }}>
            Daftar Navigasi &amp; Halaman PSB (/pendaftaran)
          </h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: '13.5px', margin: 0 }}>
            Semua menu navigasi, ikon, tautan Google Form / Google Drive, atau halaman internal diatur sepenuhnya di sini (Tanpa teks statis).
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          style={{
            background: 'linear-gradient(90deg, var(--gold-500) 0%, #C4A05C 100%)',
            color: '#0F2B24',
            border: 'none',
            padding: '12px 22px',
            borderRadius: '12px',
            fontWeight: '700',
            fontSize: '14px',
            cursor: 'pointer',
            boxShadow: '0 6px 16px rgba(196,160,92,0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>+</span> Tambah Menu PSB Baru
        </button>
      </div>

      {/* TABEL DAFTAR MENU PSB */}
      <div style={{ background: '#fff', border: '1px solid rgba(173,138,78,0.2)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 25px rgba(15,43,36,0.03)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--ivory)', borderBottom: '1px solid rgba(173,138,78,0.2)' }}>
              <th style={{ padding: '16px 20px', fontSize: '13px', color: 'var(--teal-900)', fontWeight: '700', width: '70px' }}>No</th>
              <th style={{ padding: '16px 20px', fontSize: '13px', color: 'var(--teal-900)', fontWeight: '700' }}>Judul &amp; Ikon</th>
              <th style={{ padding: '16px 20px', fontSize: '13px', color: 'var(--teal-900)', fontWeight: '700' }}>Tipe Aksi / URL</th>
              <th style={{ padding: '16px 20px', fontSize: '13px', color: 'var(--teal-900)', fontWeight: '700' }}>Status</th>
              <th style={{ padding: '16px 20px', fontSize: '13px', color: 'var(--teal-900)', fontWeight: '700', textAlign: 'right' }}>Kelola</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: 'var(--ink-soft)' }}>
                  Memuat data menu PSB...
                </td>
              </tr>
            ) : pages.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: 'var(--ink-soft)' }}>
                  Belum ada menu pendaftaran.
                </td>
              </tr>
            ) : (
              pages.map((item, idx) => {
                const isHome = item.is_default_home || item.slug === 'beranda';
                const urlPath = isHome ? '/pendaftaran' : `/pendaftaran/${item.slug}`;

                return (
                  <tr key={item.id} style={{ borderBottom: '1px solid rgba(173,138,78,0.1)' }}>
                    <td style={{ padding: '16px 20px', fontWeight: '700', color: 'var(--teal-900)' }}>
                      {item.order_num || idx + 1}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: '700', color: 'var(--teal-900)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>
                          {item.icon === 'home' && '🏠'}
                          {item.icon === 'book' && '📖'}
                          {item.icon === 'info' && 'ℹ️'}
                          {item.icon === 'folder' && '📂'}
                          {item.icon === 'users' && '👥'}
                          {item.icon === 'chat' && '💬'}
                          {!['home','book','info','folder','users','chat'].includes(item.icon) && '📄'}
                        </span>
                        <span>{item.title}</span>
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>
                        {urlPath}
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      {item.link_type === 'external' ? (
                        <div>
                          <span style={{ background: '#EFF6FF', color: '#1D4ED8', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', marginRight: '6px' }}>
                            LINK EKSTERNAL
                          </span>
                          <a href={item.external_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12.5px', color: 'var(--teal-900)' }}>
                            {item.external_url} ↗
                          </a>
                        </div>
                      ) : item.link_type === 'download' ? (
                        <div>
                          <span style={{ background: '#FEF3C7', color: '#B45309', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', marginRight: '6px' }}>
                            FILE / GOOGLE DRIVE
                          </span>
                          <a href={item.file_url || item.external_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12.5px', color: 'var(--teal-900)' }}>
                            {item.external_url || 'File Uploaded'} ↗
                          </a>
                        </div>
                      ) : (
                        <div>
                          <span style={{ background: '#ECFDF5', color: '#047857', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', marginRight: '6px' }}>
                            HALAMAN INTERNAL
                          </span>
                          <a href={urlPath} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12.5px', color: 'var(--teal-900)' }}>
                            Lihat Halaman ↗
                          </a>
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{
                        background: item.status === 'published' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(100, 116, 139, 0.15)',
                        color: item.status === 'published' ? '#059669' : '#64748B',
                        padding: '4px 10px',
                        borderRadius: '100px',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}>
                        {item.status === 'published' ? 'Aktif' : 'Draf'}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => handleOpenEdit(item)}
                          style={{
                            background: '#0F2B24',
                            color: '#fff',
                            border: 'none',
                            padding: '8px 14px',
                            borderRadius: '8px',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            color: '#DC2626',
                            border: 'none',
                            padding: '8px 14px',
                            borderRadius: '8px',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* POPUP MODAL TAMBAH / EDIT MENU PSB */}
      {modalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(10, 26, 21, 0.7)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          zIndex: 1000
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '850px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '36px',
            boxShadow: '0 25px 50px -12px rgba(15,43,36,0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontFamily: '"Fraunces", serif', fontSize: '22px', color: 'var(--teal-900)', margin: 0 }}>
                {form.id && form.title ? 'Edit Menu & Halaman PSB' : 'Tambah Menu PSB Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--ink-soft)' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveMenu} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--teal-900)', marginBottom: '8px' }}>
                    Judul Menu Pendaftaran *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: PENDAFTARAN ONLINE, INFORMASI, BROSUR"
                    value={form.title}
                    onChange={handleTitleChange}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid rgba(173,138,78,0.3)',
                      fontSize: '14px',
                      color: 'var(--ink)'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--teal-900)', marginBottom: '8px' }}>
                    Pilihan Ikon Menu
                  </label>
                  <select
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid rgba(173,138,78,0.3)',
                      fontSize: '14px',
                      color: 'var(--ink)'
                    }}
                  >
                    <option value="home">🏠 Ikon Rumah (Beranda)</option>
                    <option value="book">📖 Ikon Buku (Pendaftaran Online)</option>
                    <option value="info">ℹ️ Ikon Info (Informasi)</option>
                    <option value="folder">📂 Ikon Folder (Brosur &amp; Materi Ujian)</option>
                    <option value="users">👥 Ikon Peserta (Daftar Santri)</option>
                    <option value="chat">💬 Ikon WhatsApp / Pesan</option>
                    <option value="file">📄 Ikon Dokumen Umum</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--teal-900)', marginBottom: '8px' }}>
                    Urutan Posisi Menu
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={form.orderNum}
                    onChange={(e) => setForm({ ...form, orderNum: parseInt(e.target.value || 1, 10) })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid rgba(173,138,78,0.3)',
                      fontSize: '14px',
                      color: 'var(--ink)'
                    }}
                  />
                </div>
              </div>

              {/* TIPE AKSI MENU */}
              <div style={{ background: 'var(--ivory)', padding: '18px', borderRadius: '12px', border: '1px solid rgba(173,138,78,0.2)' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--teal-900)', marginBottom: '12px' }}>
                  Tipe Aksi Saat Menu Diklik:
                </label>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', fontWeight: '600', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="linkType"
                      checked={form.linkType === 'page'}
                      onChange={() => setForm({ ...form, linkType: 'page' })}
                    />
                    Halaman Konten Internal (/pendaftaran/[slug])
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', fontWeight: '600', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="linkType"
                      checked={form.linkType === 'external'}
                      onChange={() => setForm({ ...form, linkType: 'external' })}
                    />
                    Tautan Eksternal (Link Google Form / WhatsApp)
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', fontWeight: '600', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="linkType"
                      checked={form.linkType === 'download'}
                      onChange={() => setForm({ ...form, linkType: 'download' })}
                    />
                    Unduhan Brosur / Link Google Drive
                  </label>
                </div>

                {form.linkType === 'external' && (
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: 'var(--teal-900)', marginBottom: '6px' }}>
                      Alamat URL Tujuan (Contoh: Link Formulir Google Form atau WhatsApp) *
                    </label>
                    <input
                      type="url"
                      placeholder="http://bit.ly/hidayatul-mubtadiaat atau https://wa.me/62856..."
                      value={form.externalUrl}
                      onChange={(e) => setForm({ ...form, externalUrl: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(173,138,78,0.3)', fontSize: '13.5px' }}
                    />
                  </div>
                )}

                {form.linkType === 'download' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: 'var(--teal-900)', marginBottom: '6px' }}>
                        Opsi 1: Tautan Folder / File Google Drive (Otomatis Menyesuaikan Realtime)
                      </label>
                      <input
                        type="url"
                        placeholder="https://drive.google.com/... atau https://sites.google.com/..."
                        value={form.externalUrl}
                        onChange={(e) => setForm({ ...form, externalUrl: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(173,138,78,0.3)', fontSize: '13.5px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: 'var(--teal-900)', marginBottom: '6px' }}>
                        Opsi 2: Atau Unggah File Langsung dari Komputer
                      </label>
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        style={{ fontSize: '13px' }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* EDITOR KONTEN (Hanya Jika Tipe Halaman Internal) */}
              {form.linkType === 'page' && (
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--teal-900)', marginBottom: '8px' }}>
                    Isi Konten Halaman PSB
                  </label>
                  <RichTextEditor
                    value={form.content}
                    onChange={(val) => setForm({ ...form, content: val })}
                  />
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  style={{
                    background: '#f1f5f9',
                    color: '#475569',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '10px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    background: 'var(--teal-900)',
                    color: 'var(--gold-500)',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: '10px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 6px 16px rgba(15,43,36,0.2)'
                  }}
                >
                  {saving ? 'Menyimpan...' : 'Simpan Menu PSB'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
