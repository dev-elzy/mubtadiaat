import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

async function getArticleBySlug(slug) {
  if (!slug) return null;
  const ctx = getRequestContext();
  if (!ctx || !ctx.env || !ctx.env.DB) throw new Error("Database not found");
  
  const { results } = await ctx.env.DB.prepare("SELECT * FROM berita WHERE slug = ? AND status = 'published' LIMIT 1").bind(slug).all();
  return results[0] || null;
}

export default async function ArticlePage({ params }) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return (
      <main className="wrap" style={{ padding: '160px 0 100px 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', color: 'var(--teal-900)' }}>404 - Berita Tidak Ditemukan</h1>
        <p style={{ marginTop: '16px' }}>Artikel yang Anda cari tidak ada atau belum dipublikasikan.</p>
        <a href="/" className="btn-primary" style={{ display: 'inline-flex', marginTop: '24px' }}>Kembali ke Beranda</a>
      </main>
    );
  }

  return (
    <main className="wrap" style={{ padding: '140px 0 60px 0' }}>
      <article style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className="badge" style={{ background: 'var(--gold-200)', color: 'var(--teal-900)', padding: '6px 16px', borderRadius: '100px', fontWeight: '600', fontSize: '14px' }}>
            {article.category}
          </span>
          <h1 style={{ fontFamily: '"Fraunces", serif', fontSize: '42px', color: 'var(--teal-900)', marginTop: '24px', lineHeight: '1.2' }}>
            {article.title}
          </h1>
          <div style={{ color: 'var(--ink-soft)', marginTop: '16px', fontSize: '15px' }}>
            <span>Oleh <strong>{article.author}</strong></span>
            <span style={{ margin: '0 12px' }}>•</span>
            <span>{article.date}</span>
          </div>
        </div>

        <img src={article.image} alt={article.title} style={{ width: '100%', borderRadius: '16px', objectFit: 'cover', maxHeight: '500px', marginBottom: '48px', border: '1px solid var(--line)' }} />

        <div className="article-content" style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--ink)' }} dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>
    </main>
  );
}
