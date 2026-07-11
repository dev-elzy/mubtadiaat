import { getPublishedBerita, getCategories } from '../lib/db';
import EmptyState from '../../components/ui/EmptyState';
import Link from 'next/link';

export const runtime = 'edge';

export default async function BeritaPage() {
  const berita = await getPublishedBerita();
  const allCategories = await getCategories();
  const beritaCategories = allCategories.filter(c => c.type === 'berita');

  return (
    <main>
      <div className="paper-scroll">
      {/* Page Hero */}
      <section className="page-hero paper-section-hero">
        <div className="wrap">
          <div className="page-hero-eyebrow eyebrow">Portal Berita &amp; Pengumuman</div>
          <h1 className="page-hero-title display">
            Berita <em>Terkini</em> &amp; Informasi
          </h1>
          <p className="page-hero-sub">
            Kumpulan artikel, kabar terbaru, dan pengumuman resmi dari Pondok Pesantren Putri Hidayatul Mubtadiat Lirboyo.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: '0' }}>
        <div className="wrap">
          {berita.length === 0 ? (
            <EmptyState
              title="Belum Ada Berita"
              message="Saat ini belum ada artikel berita atau pengumuman terbaru yang diterbitkan. Silakan kembali dalam beberapa waktu ke depan."
              icon="news"
            />
          ) : (
            <>
              {/* Category Filter Tabs */}
              {beritaCategories.length > 0 && (
                <div className="category-tabs">
                  <span className="category-tab active">Semua</span>
                  {beritaCategories.map(cat => (
                    <span key={cat.id} className="category-tab">{cat.name}</span>
                  ))}
                </div>
              )}

              {/* Berita Grid */}
              <div className="berita-grid-pro">
                {berita.map(b => (
                  <Link href={`/berita/${b.slug}`} key={b.id} className="berita-card-pro">
                    <div className="berita-card-img-wrap">
                      <img src={b.image} alt={b.title} className="berita-card-pro-img" />
                      {b.category && <span className="berita-card-cat">{b.category}</span>}
                    </div>
                    <div className="berita-card-pro-body">
                      <h3 className="berita-card-pro-title">{b.title}</h3>
                      <p className="berita-card-pro-summary">{b.summary}</p>
                      <div className="berita-card-pro-footer">
                        <div className="berita-card-pro-meta">
                          {b.author && (
                            <span className="berita-card-author">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '12px', height: '12px' }}>
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                              </svg>
                              {b.author}
                            </span>
                          )}
                          <span className="berita-card-date">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '12px', height: '12px' }}>
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                              <line x1="16" y1="2" x2="16" y2="6" />
                              <line x1="8" y1="2" x2="8" y2="6" />
                              <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            {b.date}
                          </span>
                        </div>
                        <span className="berita-card-read">
                          Baca Selengkapnya →
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
