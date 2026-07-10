"use client";

import { useState, useEffect } from 'react';
import RichTextEditor from './RichTextEditor';

export default function TabPsb({ showToast, confirm }) {
  const [pages, setPages] = useState([]);
  const [classes, setClasses] = useState([]);
  const [settings, setSettings] = useState({
    psbPeriode: 'TA 1446 - 1447 H / 2025 - 2026 M',
    psbTitle: 'Penerimaan Santri Baru Pondok Pesantren Putri Hidayatul Mubtadiat'
  });
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [classModalOpen, setClassModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savingClass, setSavingClass] = useState(false);
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

  const [classForm, setClassForm] = useState({
    id: '',
    title: '',
    materi_ujian: '',
    kurikulum: '',
    status_note: '',
    daftar_url: 'http://bit.ly/hidayatul-mubtadiaat',
    order_num: 1
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/psb');
      const data = await res.json();
      if (Array.isArray(data)) {
        setPages(data);
      }

      const classRes = await fetch('/api/psb/classes');
      const classData = await classRes.json();
      if (Array.isArray(classData)) {
        setClasses(classData);
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

  // MANAGEMENT CLASS CARDS (MATERI UJIAN & KURIKULUM)
  const handleOpenCreateClass = () => {
    setClassForm({
      id: 'class-' + Date.now(),
      title: '',
      materi_ujian: '',
      kurikulum: '',
      status_note: '',
      daftar_url: 'http://bit.ly/hidayatul-mubtadiaat',
      order_num: classes.length + 1
    });
    setClassModalOpen(true);
  };

  const handleOpenEditClass = (item) => {
    setClassForm({
      id: item.id,
      title: item.title || '',
      materi_ujian: item.materi_ujian || '',
      kurikulum: item.kurikulum || '',
      status_note: item.status_note || '',
      daftar_url: item.daftar_url || 'http://bit.ly/hidayatul-mubtadiaat',
      order_num: item.order_num || 1
    });
    setClassModalOpen(true);
  };

  const handleSaveClass = async (e) => {
    e.preventDefault();
    if (!classForm.title.trim()) {
      if (showToast) showToast('Judul kelas wajib diisi', 'error');
      return;
    }

    setSavingClass(true);
    try {
      const res = await fetch('/api/psb/classes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(classForm)
      });
      const resData = await res.json();
      if (res.ok && resData.success) {
        if (showToast) showToast('Tabel kelas berhasil disimpan!', 'success');
        setClassModalOpen(false);
        loadData();
      } else {
        if (showToast) showToast(resData.error || 'Gagal menyimpan tabel kelas', 'error');
      }
    } catch (err) {
      if (showToast) showToast('Terjadi kesalahan jaringan', 'error');
    } finally {
      setSavingClass(false);
    }
  };

  const handleDeleteClass = async (item) => {
    const ok = await confirm(`Hapus kartu kelas "${item.title}"?`);
    if (!ok) return;

    try {
      const res = await fetch('/api/psb/classes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id: item.id })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (showToast) showToast('Tabel kelas berhasil dihapus', 'success');
        loadData();
      } else {
        if (showToast) showToast(data.error || 'Gagal menghapus', 'error');
      }
    } catch (err) {
      if (showToast) showToast('Terjadi kesalahan koneksi', 'error');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* 1. PENGATURAN PERIODE & BANNER ATAS PSB ONLINE */}
      <div className="card">
        <div className="card-head">
          <div className="card-head-left">
            <h3>⚙️ Pengaturan Periode &amp; Banner Atas PSB Online</h3>
            <p>Atur teks tahun ajaran yang tampil di pojok kanan atas Header PSB dan judul portal resmi</p>
          </div>
        </div>
        <form onSubmit={handleSaveSettings} className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--gold)', marginBottom: '8px' }}>
                Badge Periode Tahun Ajaran (Pojok Kanan Atas Header PSB)
              </label>
              <input
                type="text"
                value={settings.psbPeriode}
                onChange={(e) => setSettings({ ...settings, psbPeriode: e.target.value })}
                placeholder="Contoh: TA 1446 - 1447 H / 2025 - 2026 M"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  fontSize: '13.5px'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--gold)', marginBottom: '8px' }}>
                Judul Portal / Identitas Madrasah
              </label>
              <input
                type="text"
                value={settings.psbTitle}
                onChange={(e) => setSettings({ ...settings, psbTitle: e.target.value })}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  fontSize: '13.5px'
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              disabled={savingSettings}
              className="btn btn-primary"
              style={{
                background: 'var(--gold-dark)',
                color: '#0B1A16',
                fontWeight: '700'
              }}
            >
              {savingSettings ? 'Menyimpan...' : 'Simpan Pengaturan Periode PSB'}
            </button>
          </div>
        </form>
      </div>

      {/* 2. MANAJEMEN TABEL KARTU KELAS (MATERI UJIAN & KURIKULUM - Sesuai Gambar Referensi ke-3) */}
      <div className="card">
        <div className="card-head">
          <div className="card-head-left">
            <h3>🎓 Manajemen Tabel Kelas (Materi Ujian &amp; Kurikulum PSB)</h3>
            <p>Kelola daftar kartu kelas interaktif berisi tab Materi Ujian dan Kurikulum Pendidikan untuk seleksi masuk</p>
          </div>
          <button
            onClick={handleOpenCreateClass}
            className="btn btn-primary"
            style={{
              background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
              color: '#0B1A16',
              fontWeight: '700'
            }}
          >
            <span>+</span> Tambah Kelas Baru
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>No</th>
                <th>Judul Kelas</th>
                <th>Materi Ujian (Ringkas)</th>
                <th>Kurikulum Kitab (Ringkas)</th>
                <th>URL Pendaftaran</th>
                <th style={{ textAlign: 'right' }}>Kelola</th>
              </tr>
            </thead>
            <tbody>
              {classes.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '36px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    Belum ada kartu kelas PSB.
                  </td>
                </tr>
              ) : (
                classes.map((c, idx) => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: '700', color: 'var(--gold)' }}>{c.order_num || idx + 1}</td>
                    <td style={{ fontWeight: '700', color: 'var(--text)' }}>{c.title}</td>
                    <td style={{ fontSize: '12.5px', color: 'var(--text-secondary)', whiteSpace: 'pre-line', maxWidth: '240px' }}>
                      {(c.materi_ujian || '').split('\n').slice(0, 3).join('\n')}
                      {(c.materi_ujian || '').split('\n').length > 3 && ' ...'}
                    </td>
                    <td style={{ fontSize: '12.5px', color: 'var(--text-secondary)', whiteSpace: 'pre-line', maxWidth: '240px' }}>
                      {(c.kurikulum || '').split('\n').slice(0, 3).join('\n')}
                      {(c.kurikulum || '').split('\n').length > 3 && ' ...'}
                    </td>
                    <td>
                      <a href={c.daftar_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12.5px', color: 'var(--gold)', textDecoration: 'underline' }}>
                        Daftar &rarr;
                      </a>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => handleOpenEditClass(c)}
                          className="btn"
                          style={{ background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', padding: '7px 14px', fontSize: '12px' }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClass(c)}
                          className="btn"
                          style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#F87171', border: '1px solid rgba(239,68,68,0.2)', padding: '7px 12px', fontSize: '12px' }}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. DAFTAR NAVIGASI & HALAMAN PSB (/pendaftaran) */}
      <div className="card">
        <div className="card-head">
          <div className="card-head-left">
            <h3>📋 Daftar Navigasi &amp; Halaman PSB (/pendaftaran)</h3>
            <p>Semua menu navigasi, ikon, tautan Google Form / Google Drive, atau halaman internal diatur sepenuhnya di sini (Tanpa teks statis)</p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="btn btn-primary"
            style={{
              background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
              color: '#0B1A16',
              fontWeight: '700'
            }}
          >
            <span>+</span> Tambah Menu PSB Baru
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>No</th>
                <th>Judul &amp; Ikon</th>
                <th>Tipe Aksi / URL</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Kelola</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    Memuat data menu PSB...
                  </td>
                </tr>
              ) : pages.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    Belum ada menu pendaftaran.
                  </td>
                </tr>
              ) : (
                pages.map((item, idx) => {
                  const isHome = item.is_default_home || item.slug === 'beranda';
                  const urlPath = isHome ? '/pendaftaran' : `/pendaftaran/${item.slug}`;

                  return (
                    <tr key={item.id}>
                      <td style={{ fontWeight: '700', color: 'var(--gold)' }}>
                        {item.order_num || idx + 1}
                      </td>
                      <td>
                        <div style={{ fontWeight: '600', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                        <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                          {urlPath}
                        </div>
                      </td>
                      <td>
                        {item.link_type === 'external' ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span style={{ background: 'rgba(59,130,246,0.15)', color: '#60A5FA', padding: '3px 8px', borderRadius: '4px', fontSize: '10.5px', fontWeight: '700' }}>
                              LINK EKSTERNAL
                            </span>
                            <a href={item.external_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12.5px', color: 'var(--gold)', textDecoration: 'underline' }}>
                              {item.external_url} ↗
                            </a>
                          </div>
                        ) : item.link_type === 'download' ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span style={{ background: 'rgba(245,158,11,0.15)', color: '#FBBF24', padding: '3px 8px', borderRadius: '4px', fontSize: '10.5px', fontWeight: '700' }}>
                              FILE / GOOGLE DRIVE
                            </span>
                            <a href={item.file_url || item.external_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12.5px', color: 'var(--gold)', textDecoration: 'underline' }}>
                              {item.external_url || 'File Uploaded'} ↗
                            </a>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span style={{ background: 'rgba(16,185,129,0.15)', color: '#34D399', padding: '3px 8px', borderRadius: '4px', fontSize: '10.5px', fontWeight: '700' }}>
                              HALAMAN INTERNAL
                            </span>
                            <a href={urlPath} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                              Lihat Halaman ↗
                            </a>
                          </div>
                        )}
                      </td>
                      <td>
                        <span style={{
                          background: item.status === 'published' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(107, 138, 128, 0.2)',
                          color: item.status === 'published' ? '#34D399' : 'var(--text-tertiary)',
                          padding: '4px 10px',
                          borderRadius: '100px',
                          fontSize: '11.5px',
                          fontWeight: '700'
                        }}>
                          {item.status === 'published' ? 'Aktif' : 'Draf'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="btn"
                            style={{
                              background: 'var(--surface)',
                              color: 'var(--text)',
                              border: '1px solid var(--border)',
                              padding: '7px 14px',
                              fontSize: '12px'
                            }}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            className="btn"
                            style={{
                              background: 'rgba(239, 68, 68, 0.12)',
                              color: '#F87171',
                              border: '1px solid rgba(239,68,68,0.2)',
                              padding: '7px 12px',
                              fontSize: '12px'
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
      </div>

      {/* POPUP MODAL TAMBAH / EDIT KELAS (MATERI UJIAN & KURIKULUM) */}
      {classModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(5, 15, 12, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          zIndex: 1100
        }}>
          <div style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-lg)',
            width: '100%',
            maxWidth: '650px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '32px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
              <h3 style={{ fontFamily: '"Fraunces", serif', fontSize: '20px', color: 'var(--gold)', margin: 0 }}>
                {classForm.id && classes.some(c => c.id === classForm.id) ? 'Edit Kartu Kelas PSB' : 'Tambah Kartu Kelas PSB Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setClassModalOpen(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '22px', cursor: 'pointer', color: 'var(--text-secondary)' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveClass} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--gold)', marginBottom: '6px' }}>
                    Judul Kelas / Jenjang *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: MADRASAH IBTIDAIYAH (KELAS I)"
                    value={classForm.title}
                    onChange={(e) => setClassForm({ ...classForm, title: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: '13.5px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--gold)', marginBottom: '6px' }}>
                    Urutan
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={classForm.order_num}
                    onChange={(e) => setClassForm({ ...classForm, order_num: parseInt(e.target.value || 1, 10) })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: '13.5px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--gold)', marginBottom: '6px' }}>
                  Daftar Poin Materi Ujian (1 Poin per Baris)
                </label>
                <textarea
                  rows={5}
                  placeholder="CTBQ An-Nahdliyah&#10;Ilmu Tauhid Dasar&#10;Hidayatul Mubtadi' I"
                  value={classForm.materi_ujian}
                  onChange={(e) => setClassForm({ ...classForm, materi_ujian: e.target.value })}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: '13.5px', lineHeight: '1.6' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--gold)', marginBottom: '6px' }}>
                  Daftar Poin Kurikulum Kitab &amp; Diniyah (1 Poin per Baris)
                </label>
                <textarea
                  rows={5}
                  placeholder="Al-Qur'an &amp; Tajwid Praktis&#10;Tauhid (Aqidatul Awam)&#10;Fiqih Dasar (Safinatun Naja)"
                  value={classForm.kurikulum}
                  onChange={(e) => setClassForm({ ...classForm, kurikulum: e.target.value })}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: '13.5px', lineHeight: '1.6' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--gold)', marginBottom: '6px' }}>
                  Alamat URL Tombol &ldquo;DAFTAR SEKARANG&rdquo;
                </label>
                <input
                  type="url"
                  placeholder="http://bit.ly/hidayatul-mubtadiaat atau https://wa.me/..."
                  value={classForm.daftar_url}
                  onChange={(e) => setClassForm({ ...classForm, daftar_url: e.target.value })}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: '13.5px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setClassModalOpen(false)}
                  className="btn"
                  style={{ background: 'var(--surface)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={savingClass}
                  className="btn btn-primary"
                  style={{ background: 'var(--gold-dark)', color: '#0B1A16', fontWeight: '700' }}
                >
                  {savingClass ? 'Menyimpan...' : 'Simpan Tabel Kelas'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POPUP MODAL TAMBAH / EDIT MENU PSB (/pendaftaran/...) */}
      {modalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(5, 15, 12, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          zIndex: 1000
        }}>
          <div style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-lg)',
            width: '100%',
            maxWidth: '850px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '32px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
              <h3 style={{ fontFamily: '"Fraunces", serif', fontSize: '20px', color: 'var(--gold)', margin: 0 }}>
                {form.id && form.title ? 'Edit Menu & Halaman PSB' : 'Tambah Menu PSB Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '22px', cursor: 'pointer', color: 'var(--text-secondary)' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveMenu} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--gold)', marginBottom: '8px' }}>
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
                      padding: '11px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      fontSize: '13.5px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--gold)', marginBottom: '8px' }}>
                    Pilihan Ikon Menu
                  </label>
                  <select
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      fontSize: '13.5px'
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
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--gold)', marginBottom: '8px' }}>
                    Urutan Posisi Menu
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={form.orderNum}
                    onChange={(e) => setForm({ ...form, orderNum: parseInt(e.target.value || 1, 10) })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      fontSize: '13.5px'
                    }}
                  />
                </div>
              </div>

              {/* TIPE AKSI MENU */}
              <div style={{ background: 'var(--surface)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--gold)', marginBottom: '12px' }}>
                  Tipe Aksi Saat Menu Diklik:
                </label>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text)', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="linkType"
                      checked={form.linkType === 'page'}
                      onChange={() => setForm({ ...form, linkType: 'page' })}
                    />
                    Halaman Konten Internal (/pendaftaran/[slug])
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text)', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="linkType"
                      checked={form.linkType === 'external'}
                      onChange={() => setForm({ ...form, linkType: 'external' })}
                    />
                    Tautan Eksternal (Google Form / WhatsApp)
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text)', cursor: 'pointer' }}>
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
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'var(--gold)', marginBottom: '6px' }}>
                      Alamat URL Tujuan (Contoh: Link Formulir Google Form atau WhatsApp) *
                    </label>
                    <input
                      type="url"
                      placeholder="http://bit.ly/hidayatul-mubtadiaat atau https://wa.me/62856..."
                      value={form.externalUrl}
                      onChange={(e) => setForm({ ...form, externalUrl: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: '13px' }}
                    />
                  </div>
                )}

                {form.linkType === 'download' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'var(--gold)', marginBottom: '6px' }}>
                        Opsi 1: Tautan Folder / File Google Drive (Otomatis Menyesuaikan Realtime)
                      </label>
                      <input
                        type="url"
                        placeholder="https://drive.google.com/... atau https://sites.google.com/..."
                        value={form.externalUrl}
                        onChange={(e) => setForm({ ...form, externalUrl: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: '13px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'var(--gold)', marginBottom: '6px' }}>
                        Opsi 2: Atau Unggah File Langsung dari Komputer
                      </label>
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        style={{ fontSize: '13px', color: 'var(--text-secondary)' }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* EDITOR KONTEN (Hanya Jika Tipe Halaman Internal) */}
              {form.linkType === 'page' && (
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--gold)', marginBottom: '8px' }}>
                    Isi Konten Halaman PSB (Ketik Visual Ala MS Word)
                  </label>
                  <div style={{ background: '#ffffff', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                    <RichTextEditor
                      value={form.content}
                      onChange={(val) => setForm({ ...form, content: val })}
                    />
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn"
                  style={{
                    background: 'var(--surface)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)'
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary"
                  style={{
                    background: 'var(--gold-dark)',
                    color: '#0B1A16',
                    fontWeight: '700'
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
