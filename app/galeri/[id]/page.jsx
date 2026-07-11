import { getRequestContext } from '@cloudflare/next-on-pages';
import Link from 'next/link';
import ViewCounter from '../../../components/ui/ViewCounter';
import CommentSection from '../../../components/ui/CommentSection';

export const runtime = 'edge';

async function getGaleriById(id) {
  if (!id) return null;
  const ctx = getRequestContext();
  if (!ctx || !ctx.env || !ctx.env.DB) throw new Error("Database not found");

  const { results } = await ctx.env.DB.prepare(
    "SELECT * FROM galeri WHERE id = ? AND (status = 'published' OR (status = 'scheduled' AND scheduled_at <= datetime('now'))) LIMIT 1"
  ).bind(id).all();
  return results[0] || null;
}

async function getAdjacentGaleri(currentId) {
  const ctx = getRequestContext();
  if (!ctx || !ctx.env || !ctx.env.DB) return { prev: null, next: null };

  const { results: allGaleri } = await ctx.env.DB.prepare(
    "SELECT id, title, image FROM galeri WHERE status = 'published' ORDER BY created_at DESC"
  ).all();

  const idx = (allGaleri || []).findIndex(g => g.id === currentId);
  return {
    prev: idx > 0 ? allGaleri[idx - 1] : null,
    next: idx < (allGaleri || []).length - 1 ? allGaleri[idx + 1] : null
  };
}

export default async function GaleriDetailPage({ params }) {
  const item = await getGaleriById(params.id);

  if (!item) {
    return (
      <main>
        <section className="page-hero" style={{ paddingBottom: '0' }}>
          <div className="wrap" style={{ textAlign: 'center' }}>
            <h1 className="page-hero-title display">404</h1>
            <p className="page-hero-sub">Foto yang Anda cari tidak ditemukan atau belum dipublikasikan.</p>
            <Link href="/galeri" className="btn-primary" style={{ display: 'inline-flex', marginTop: '24px' }}>← Kembali ke Galeri</Link>
          </div>
        </section>
      </main>
    );
  }

  const { prev, next } = await getAdjacentGaleri(item.id);
  const formattedDate = item.date || new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <main>
      <div className="paper-scroll">
      {/* Hero */}
      <section className="article-hero paper-section-hero">
        <div className="wrap">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link href="/">Beranda</Link>
            <span className="breadcrumb-sep">/</span>
            <Link href="/galeri">Galeri</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{item.title}</span>
          </nav>

          <div className="article-header">
            <h1 className="article-title display">{item.title}</h1>
            <div className="article-meta-row">
              <div className="article-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px', color: 'var(--gold-500)' }}>
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <div>
                  <span className="article-meta-label">Tanggal Upload</span>
                  <strong>{formattedDate}</strong>
                </div>
              </div>
              <div className="article-meta-item">
                <ViewCounter type="galeri" contentId={item.id} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo & Info */}
      <section className="article-body-section">
        <div className="wrap">
          <div className="galeri-detail-layout">
            <div className="galeri-detail-photo">
              <img src={item.image} alt={item.title} />
            </div>
            {item.caption && (
              <div className="galeri-detail-caption">
                <p>{item.caption}</p>
              </div>
            )}
          </div>

          {/* Photo Navigation */}
          <div className="galeri-nav">
            {prev ? (
              <Link href={`/galeri/${prev.id}`} className="galeri-nav-btn prev">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                <div>
                  <span className="galeri-nav-label">Foto Sebelumnya</span>
                  <span className="galeri-nav-title">{prev.title}</span>
                </div>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/galeri/${next.id}`} className="galeri-nav-btn next">
                <div style={{ textAlign: 'right' }}>
                  <span className="galeri-nav-label">Foto Selanjutnya</span>
                  <span className="galeri-nav-title">{next.title}</span>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            ) : <div />}
          </div>

          {/* Comments */}
          <CommentSection type="galeri" contentId={item.id} />
        </div>
      </section>
    </div>
    </main>
  );
}
