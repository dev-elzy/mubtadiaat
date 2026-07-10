"use client";

export default function TabOverview({ berita, galeri, settings, onSelectTab }) {
  const publishedBeritaCount = berita.filter(b => b.status === 'published').length;
  const publishedGaleriCount = galeri.filter(g => g.status === 'published').length;

  return (
    <div>
      {/* 4 Kartu Statistik */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">Total Artikel Berita</div>
          <div className="stat-value">{berita.length}</div>
          <div className="stat-sub">{publishedBeritaCount} artikel diterbitkan</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Foto Galeri</div>
          <div className="stat-value">{galeri.length}</div>
          <div className="stat-sub">{publishedGaleriCount} foto aktif</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Mode Beranda</div>
          <div className="stat-value" style={{ fontSize: '20px' }}>
            {settings.homeBeritaMode === 'manual' ? '🎯 Manual Pilihan' : '⚡ Auto Terbaru'}
          </div>
          <div className="stat-sub">Bagian Berita: {settings.showSectionBerita === 'true' ? 'Tampil' : 'Disembunyikan'}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Kontak &amp; WhatsApp</div>
          <div className="stat-value" style={{ fontSize: '18px' }}>{settings.phoneWa || '0856-1985-565'}</div>
          <div className="stat-sub">{settings.instagramHandle || '@p3hmlirboyo'}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Kartu Navigasi Cepat */}
        <div className="card">
          <div className="card-head">
            <div className="card-head-left">
              <h3>⚡ Aksi Cepat Admin</h3>
              <p>Pilih menu untuk mengelola konten atau tata letak situs</p>
            </div>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button className="btn btn-primary" onClick={() => onSelectTab('berita')} style={{ justifyContent: 'space-between', padding: '12px 18px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>✍️</span>
                <span>Tulis atau Edit Berita</span>
              </span>
              <span>&rarr;</span>
            </button>
            <button className="btn btn-primary" onClick={() => onSelectTab('galeri')} style={{ justifyContent: 'space-between', padding: '12px 18px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>🖼️</span>
                <span>Unggah Foto Kegiatan</span>
              </span>
              <span>&rarr;</span>
            </button>
            <button className="btn btn-ghost" onClick={() => onSelectTab('tampilan')} style={{ justifyContent: 'space-between', padding: '12px 18px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>⚙️</span>
                <span>Atur Tampilan Beranda (Auto/Manual)</span>
              </span>
              <span>&rarr;</span>
            </button>
            <button className="btn btn-ghost" onClick={() => onSelectTab('profil')} style={{ justifyContent: 'space-between', padding: '12px 18px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>🏫</span>
                <span>Perbarui Teks Profil &amp; Kontak</span>
              </span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>

        {/* Kartu Daftar Berita Terbaru */}
        <div className="card">
          <div className="card-head">
            <div className="card-head-left">
              <h3>📰 Pembaruan Artikel Terakhir</h3>
              <p>Daftar artikel yang baru saja dibuat / diperbarui</p>
            </div>
          </div>
          <div className="item-list">
            {berita.slice(0, 5).map(b => (
              <div key={b.id} className="item-row">
                <img src={b.image} alt={b.title} className="item-thumb" />
                <div className="item-body">
                  <h4>{b.title}</h4>
                  <p>{b.date} · {b.category}</p>
                </div>
                <div className="item-actions">
                  <span className={`badge ${b.status === 'published' ? 'badge-published' : 'badge-draft'}`}>
                    {b.status === 'published' ? 'TERBIT' : 'DRAF'}
                  </span>
                </div>
              </div>
            ))}
            {berita.length === 0 && (
              <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
                Belum ada artikel berita yang ditambahkan
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
