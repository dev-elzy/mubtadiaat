"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './portal.css';
import TabOverview from '../../components/portal/TabOverview';
import TabTampilan from '../../components/portal/TabTampilan';
import TabProfil from '../../components/portal/TabProfil';
import TabBerita from '../../components/portal/TabBerita';
import TabGaleri from '../../components/portal/TabGaleri';
import TabKategori from '../../components/portal/TabKategori';
import TabPesan from '../../components/portal/TabPesan';
import CustomModal from '../../components/ui/CustomModal';

export default function PortalAdmin() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };
  const [berita, setBerita] = useState([]);
  const [galeri, setGaleri] = useState([]);
  const [settings, setSettings] = useState({});
  const [categories, setCategories] = useState([]);
  const [pesanList, setPesanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });
  const [modal, setModal] = useState({
    show: false,
    title: '',
    message: '',
    type: 'confirm',
    theme: 'teal',
    onConfirm: null,
    onCancel: null
  });
  const router = useRouter();

  const customConfirm = (message, title = 'Konfirmasi Tindakan', theme = 'danger') => {
    return new Promise((resolve) => {
      setModal({
        show: true,
        title,
        message,
        type: 'confirm',
        theme,
        onConfirm: () => {
          setModal(m => ({ ...m, show: false }));
          resolve(true);
        },
        onCancel: () => {
          setModal(m => ({ ...m, show: false }));
          resolve(false);
        }
      });
    });
  };

  const customAlert = (message, title = 'Pemberitahuan') => {
    return new Promise((resolve) => {
      setModal({
        show: true,
        title,
        message,
        type: 'alert',
        theme: 'teal',
        onConfirm: () => {
          setModal(m => ({ ...m, show: false }));
          resolve(true);
        },
        onCancel: null
      });
    });
  };

  function showToastMessage(msg, type = 'success') {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 3500);
  }

  async function loadData() {
    try {
      const authRes = await fetch('/api/auth/check').then(r => r.json()).catch(() => ({ authenticated: false }));
      if (!authRes.authenticated) {
        router.push('/portal/login');
        return;
      }
      setAuthenticated(true);

      const [bRes, gRes, sRes, cRes, pRes] = await Promise.all([
        fetch('/api/berita').then(r => r.json()).catch(() => []),
        fetch('/api/galeri').then(r => r.json()).catch(() => []),
        fetch('/api/settings').then(r => r.json()).catch(() => ({})),
        fetch('/api/categories').then(r => r.json()).catch(() => []),
        fetch('/api/pesan').then(r => r.json()).catch(() => [])
      ]);
      setBerita(Array.isArray(bRes) ? bRes : []);
      setGaleri(Array.isArray(gRes) ? gRes : []);
      setSettings(sRes || {});
      setCategories(Array.isArray(cRes) ? cRes : []);
      setPesanList(Array.isArray(pRes) ? pRes : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleReload() {
    setLoading(true);
    await loadData();
    showToastMessage('Data berhasil dimuat ulang!');
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = 'https://p3hm.my.id/';
  }

  async function handleSaveSettings(newSettings) {
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings)
      });
      showToastMessage('Pengaturan berhasil diperbarui!');
      loadData();
    } catch (e) {
      showToastMessage('Gagal menyimpan pengaturan: ' + e.message, 'error');
    }
  }

  const getTabTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Dasbor Ringkasan Inti';
      case 'tampilan': return 'Pengaturan Tata Letak & Mode Beranda';
      case 'profil': return 'Manajemen Profil & Kontak';
      case 'kategori': return 'Manajemen Kategori Kustom Berita & Galeri';
      case 'berita': return 'Manajemen Artikel & Publikasi Berita';
      case 'galeri': return 'Manajemen Dokumentasi & Galeri Kegiatan';
      case 'pesan': return 'Kotak Masuk Pesan & Kontak';
      default: return 'Portal CMS Admin';
    }
  };

  if (loading || !authenticated) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'radial-gradient(circle at center, #16342C 0%, #0F2B24 100%)',
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        color: '#e5ddd0'
      }}>
        <div className="spinner" style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(216, 190, 140, 0.1)',
          borderTopColor: '#D8BE8C',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          marginBottom: '16px'
        }}></div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}} />
        <span style={{ fontSize: '13.5px', letterSpacing: '0.05em', color: '#D8BE8C' }}>Memeriksa Otorisasi Akses...</span>
      </div>
    );
  }

  return (
    <div className="portal-root">
      {/* MOBILE OVERLAY */}
      <div className={`mobile-overlay ${sidebarOpen ? 'active' : ''}`} onClick={() => setSidebarOpen(false)} />

      {/* SIDEBAR NAVIGATION */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <img src="/logo.png" alt="Logo P3HM" />
          <div className="sidebar-brand-text">
            <h1>CMS P3HM</h1>
            <span>Pondok Pesantren Lirboyo</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-nav-label">Utama</div>
          <button
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => handleTabChange('overview')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="9" rx="1" />
              <rect x="14" y="3" width="7" height="5" rx="1" />
              <rect x="14" y="12" width="7" height="9" rx="1" />
              <rect x="3" y="16" width="7" height="5" rx="1" />
            </svg>
            <span>Ringkasan Dasbor</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'tampilan' ? 'active' : ''}`}
            onClick={() => handleTabChange('tampilan')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            <span>Atur Tampilan Beranda</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'kategori' ? 'active' : ''}`}
            onClick={() => handleTabChange('kategori')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
            <span>Manajemen Kategori</span>
            <span className="badge-count">{categories.length}</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'profil' ? 'active' : ''}`}
            onClick={() => handleTabChange('profil')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Manajemen Profil &amp; Kontak</span>
          </button>

          <div className="sidebar-nav-label">Konten Dinamis</div>
          <button
            className={`nav-item ${activeTab === 'berita' ? 'active' : ''}`}
            onClick={() => handleTabChange('berita')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
            <span>Manajemen Berita</span>
            <span className="badge-count">{berita.length}</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'galeri' ? 'active' : ''}`}
            onClick={() => handleTabChange('galeri')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span>Manajemen Galeri</span>
            <span className="badge-count">{galeri.length}</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'pesan' ? 'active' : ''}`}
            onClick={() => handleTabChange('pesan')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span>Pesan Masuk</span>
            {pesanList.filter(p => p.is_read === 0).length > 0 && (
              <span className="badge-count" style={{ background: '#3B82F6', color: '#fff' }}>
                {pesanList.filter(p => p.is_read === 0).length}
              </span>
            )}
          </button>
        </nav>

        <div className="sidebar-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: 'rgba(0,0,0,0.25)', borderRadius: '10px', border: '1px solid var(--border)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold-dark), #C4A05C)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#fff', fontSize: '13px' }}>
              A
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                admin.portalp3hm
              </div>
              <div style={{ fontSize: '11px', color: '#10B981', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }}></span>
                <span>Server Active</span>
              </div>
            </div>
          </div>

          <a href="/" className="sidebar-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            <span>Lihat Situs Publik</span>
          </a>
        </div>
      </aside>

      {/* MAIN WORKSPACE */}
      <main className="main">
        <div className="main-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
            {/* Mobile hamburger button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle Sidebar"
              style={{
                display: 'none',
                background: 'transparent',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '7px',
                color: 'var(--gold)',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
                {sidebarOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
            <div style={{ minWidth: 0 }}>
              <span style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '0.04em', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                Portal Manajemen Konten &middot; P3HM Lirboyo
              </span>
              <h2 className="main-title">{getTabTitle()}</h2>
            </div>
          </div>

          <div className="main-header-actions">
            <div className="server-badge online" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px' }}>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <span className="dot" style={{ background: '#10B981', width: '7px', height: '7px', borderRadius: '50%' }}></span>
                <span className="dot" style={{ background: '#F59E0B', width: '7px', height: '7px', borderRadius: '50%', animationDelay: '0.3s' }}></span>
                <span className="dot" style={{ background: '#EF4444', width: '7px', height: '7px', borderRadius: '50%', animationDelay: '0.6s' }}></span>
              </div>
              <span style={{ fontWeight: '700', letterSpacing: '0.03em' }}>SERVER ACTIVE</span>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={handleReload}>
              🔄 Muat Ulang
            </button>
            <a href="/" className="btn btn-ghost btn-sm">
              🌐 Website
            </a>
            <button
              onClick={handleLogout}
              className="btn btn-danger btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <span>🚪</span>
              <span>Keluar</span>
            </button>
          </div>
        </div>

        <div className="main-body">
          {loading ? (
            <div style={{ padding: '80px 32px', textAlign: 'center', color: 'var(--text-tertiary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '15px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Memuat data dasbor</span>
                <span className="dot-loading"><span></span><span></span><span></span></span>
              </div>
            </div>
          ) : (
            <>
              {activeTab === 'overview' && (
                <TabOverview
                  berita={berita}
                  galeri={galeri}
                  settings={settings}
                  onSelectTab={setActiveTab}
                />
              )}
              {activeTab === 'tampilan' && (
                <TabTampilan
                  settings={settings}
                  berita={berita}
                  galeri={galeri}
                  onSaveSettings={handleSaveSettings}
                />
              )}
              {activeTab === 'kategori' && (
                <TabKategori
                  categories={categories}
                  onRefresh={loadData}
                  showToast={showToastMessage}
                  confirm={customConfirm}
                  alert={customAlert}
                />
              )}
              {activeTab === 'profil' && (
                <TabProfil
                  settings={settings}
                  onSaveSettings={handleSaveSettings}
                />
              )}
              {activeTab === 'berita' && (
                <TabBerita
                  berita={berita}
                  categories={categories}
                  onRefresh={loadData}
                  showToast={showToastMessage}
                  confirm={customConfirm}
                  alert={customAlert}
                />
              )}
              {activeTab === 'galeri' && (
                <TabGaleri
                  galeri={galeri}
                  categories={categories}
                  onRefresh={loadData}
                  showToast={showToastMessage}
                  confirm={customConfirm}
                  alert={customAlert}
                />
              )}
              {activeTab === 'pesan' && (
                <TabPesan
                  pesanList={pesanList}
                  onRefresh={loadData}
                  showToast={showToastMessage}
                  confirm={customConfirm}
                />
              )}
            </>
          )}
        </div>
      </main>

      {/* TOAST NOTIFICATION */}
      {toast.show && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '28px',
            background: toast.type === 'error' ? 'var(--red)' : '#10B981',
            color: '#fff',
            padding: '14px 22px',
            borderRadius: '12px',
            boxShadow: '0 12px 28px rgba(0,0,0,0.4)',
            zIndex: 9999,
            fontWeight: '600',
            fontSize: '13.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <span>{toast.type === 'error' ? '❌' : '✅'}</span>
          <span>{toast.msg}</span>
        </div>
      )}

      {/* CUSTOM MODAL CONFIRMATION/ALERT */}
      <CustomModal
        show={modal.show}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        theme={modal.theme}
        onConfirm={modal.onConfirm}
        onCancel={modal.onCancel}
      />
    </div>
  );
}
