import { getRequestContext } from '@cloudflare/next-on-pages';
import Link from 'next/link';
import ViewCounter from '../../../components/ui/ViewCounter';
import CommentSection from '../../../components/ui/CommentSection';

export const runtime = 'edge';

async function getArticleBySlug(slug) {
  if (!slug) return null;
  const ctx = getRequestContext();
  if (!ctx || !ctx.env || !ctx.env.DB) throw new Error("Database not found");
  
  const { results } = await ctx.env.DB.prepare(
    "SELECT * FROM berita WHERE slug = ? AND (status = 'published' OR (status = 'scheduled' AND scheduled_at <= datetime('now'))) LIMIT 1"
  ).bind(slug).all();
  return results[0] || null;
}

export default async function ArticlePage({ params }) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return (
      <main>
        <section className="page-hero" style={{ paddingBottom: '0' }}>
          <div className="wrap" style={{ textAlign: 'center' }}>
            <h1 className="page-hero-title display">404</h1>
            <p className="page-hero-sub">Artikel yang Anda cari tidak ada atau belum dipublikasikan.</p>
            <Link href="/berita" className="btn-primary" style={{ display: 'inline-flex', marginTop: '24px' }}>← Kembali ke Portal Berita</Link>
          </div>
        </section>
      </main>
    );
  }

  const formattedDate = article.date || new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <main>
      <div className="paper-scroll">
      {/* Article Hero */}
      <section className="article-hero paper-section-hero">
        <div className="wrap">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link href="/">Beranda</Link>
            <span className="breadcrumb-sep">/</span>
            <Link href="/berita">Portal Berita</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{article.title}</span>
          </nav>

          <div className="article-header">
            {article.category && (
              <span className="article-cat-badge">{article.category}</span>
            )}
            <h1 className="article-title display">{article.title}</h1>
            <div className="article-meta-row">
              {article.author && (
                <div className="article-meta-item">
                  <div className="article-author-avatar">
                    {article.author.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <span className="article-meta-label">Ditulis oleh</span>
                    <strong>{article.author}</strong>
                  </div>
                </div>
              )}
              <div className="article-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px', color: 'var(--gold-500)' }}>
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <div>
                  <span className="article-meta-label">Tanggal Publikasi</span>
                  <strong>{formattedDate}</strong>
                </div>
              </div>
              <div className="article-meta-item">
                <ViewCounter type="berita" contentId={article.id} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="article-body-section">
        <div className="wrap">
          <div className="article-layout">
            <article className="article-content-wrap">
              {article.image && (
                <div className="article-featured-img">
                  <img src={article.image} alt={article.title} />
                </div>
              )}
              <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />
            </article>
          </div>

          {/* Comments */}
          <CommentSection type="berita" contentId={article.id} />
        </div>
      </section>
    </div>
    </main>
  );
}
