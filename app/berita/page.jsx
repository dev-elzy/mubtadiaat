import { getPublishedBerita } from '../lib/db';
import EmptyState from '../../components/ui/EmptyState';

export const runtime = 'edge';

export default async function BeritaPage() {
  const berita = await getPublishedBerita();

  return (
    <main className="wrap" style={{ padding: '140px 0 60px 0' }}>
      <h1 style={{ fontFamily: '"Fraunces", serif', fontSize: '36px', color: 'var(--teal-900)', marginBottom: '40px' }}>Portal Berita</h1>
      
      {berita.length === 0 ? (
        <EmptyState 
          title="Belum Ada Berita" 
          message="Saat ini belum ada artikel berita atau pengumuman terbaru yang diterbitkan. Silakan kembali dalam beberapa waktu ke depan." 
          icon="news" 
        />
      ) : (
        <div className="mag-grid">
          {berita.map(b => (
            <article key={b.id} className="mag-card">
              <a href={`/berita/${b.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
                <img src={b.image} alt={b.title} className="mag-img" />
                <div className="mag-body">
                  <div className="berita-meta">{b.category}</div>
                  <h3 className="berita-title" style={{ fontSize: '20px', margin: '8px 0' }}>{b.title}</h3>
                  <p className="berita-summary" style={{ fontSize: '14px', color: 'var(--ink-soft)' }}>{b.summary}</p>
                  <div className="berita-footer" style={{ marginTop: '16px', fontSize: '12px' }}>
                    <span>{b.date}</span>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
