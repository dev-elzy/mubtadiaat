import { getPublishedGaleri } from '../lib/db';

export const runtime = 'edge';

export default async function GaleriPage() {
  const galeri = await getPublishedGaleri();

  return (
    <main className="wrap" style={{ padding: '60px 0' }}>
      <h1 style={{ fontFamily: '"Fraunces", serif', fontSize: '36px', color: 'var(--teal-900)', marginBottom: '40px' }}>Galeri Dokumentasi</h1>
      
      {galeri.length === 0 ? (
        <p>Belum ada dokumentasi.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {galeri.map(g => (
            <div key={g.id} style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--line)', background: 'var(--ivory)' }}>
              <img src={g.image} alt={g.title} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
              <div style={{ padding: '16px' }}>
                <h3 style={{ fontSize: '18px', color: 'var(--teal-900)', marginBottom: '8px' }}>{g.title}</h3>
                {g.caption && <p style={{ fontSize: '14px', color: 'var(--ink-soft)' }}>{g.caption}</p>}
                <p style={{ fontSize: '12px', color: 'var(--ink-soft)', marginTop: '12px' }}>{g.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
