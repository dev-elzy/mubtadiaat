import { getPublishedGaleri, getCategories } from '../lib/db';
import EmptyState from '../../components/ui/EmptyState';
import Link from 'next/link';

export const runtime = 'edge';

export default async function GaleriPage() {
  const galeri = await getPublishedGaleri();
  const allCategories = await getCategories();
  const galeriCategories = allCategories.filter(c => c.type === 'galeri');

  return (
    <main>
      <div className="paper-scroll">
      {/* Page Hero */}
      <section className="page-hero paper-section-hero">
        <div className="wrap">
          <div className="page-hero-eyebrow eyebrow">Galeri Dokumentasi</div>
          <h1 className="page-hero-title display">
            Dokumentasi <em>Kegiatan</em> Pondok
          </h1>
          <p className="page-hero-sub">
            Koleksi foto dokumentasi kegiatan, fasilitas, dan momen-momen berharga di lingkungan Pondok Pesantren Putri Hidayatul Mubtadiat.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: '0' }}>
        <div className="wrap">
          {galeri.length === 0 ? (
            <EmptyState
              title="Belum Ada Dokumentasi"
              message="Galeri dokumentasi foto kegiatan santriwati belum tersedia atau sedang diperbarui. Silakan kembali beberapa saat lagi."
              icon="gallery"
            />
          ) : (
            <>
              {/* Category Filter Tabs */}
              {galeriCategories.length > 0 && (
                <div className="category-tabs">
                  <span className="category-tab active">Semua</span>
                  {galeriCategories.map(cat => (
                    <span key={cat.id} className="category-tab">{cat.name}</span>
                  ))}
                </div>
              )}

              {/* Gallery Grid */}
              <div className="galeri-grid-pro">
                {galeri.map(g => (
                  <Link href={`/galeri/${g.id}`} key={g.id} className="galeri-card-pro">
                    <div className="galeri-card-img-wrap">
                      <img src={g.image} alt={g.title} className="galeri-card-pro-img" />
                      <div className="galeri-card-overlay">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '28px', height: '28px' }}>
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          <line x1="11" y1="8" x2="11" y2="14" />
                          <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                        <span>Lihat Detail</span>
                      </div>
                    </div>
                    <div className="galeri-card-pro-body">
                      <h3 className="galeri-card-pro-title">{g.title}</h3>
                      {g.caption && <p className="galeri-card-pro-caption">{g.caption}</p>}
                      <div className="galeri-card-pro-footer">
                        <span className="galeri-card-date">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '12px', height: '12px' }}>
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                          {g.date || new Date(g.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      </div>
    </main>
  );
}
