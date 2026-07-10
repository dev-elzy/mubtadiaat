import { getSettings } from '../lib/db';

export const revalidate = 0;
export const runtime = 'edge';

export default async function KontakPage() {
  const settings = await getSettings();

  const phoneRaw = settings.phoneWa || '0856-1985-565';
  const phoneClean = phoneRaw.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${phoneClean.startsWith('0') ? '62' + phoneClean.slice(1) : phoneClean}`;
  
  const address = settings.address || 'Jl. KH. Abdul Karim, PO. Box 140, Lirboyo, Mojoroto, Kota Kediri 64117, Jawa Timur';
  const instagram = settings.instagramHandle || '@p3hmlirboyo';
  const instagramUrl = `https://instagram.com/${instagram.replace('@', '')}`;

  return (
    <main style={{ background: '#fbf8f1', minHeight: '100vh', padding: '60px 0 80px 0', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      <div className="wrap" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-500)', display: 'block', marginBottom: '8px' }}>
            Hubungi Kami
          </span>
          <h1 style={{ fontFamily: '"Fraunces", serif', fontSize: '42px', color: 'var(--teal-900)', fontWeight: '500', margin: 0 }}>
            Silaturahmi &amp; Informasi
          </h1>
          <div style={{ width: '60px', height: '3px', background: 'var(--gold-500)', margin: '16px auto 0' }}></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'start' }}>
          
          {/* SISI KIRI: Informasi Kontak & Maps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Info Card */}
            <div style={{ background: '#ffffff', border: '1px solid rgba(173,138,78,0.15)', borderRadius: '16px', padding: '32px', boxShadow: '0 10px 30px rgba(15,43,36,0.03)' }}>
              <h2 style={{ fontFamily: '"Fraunces", serif', fontSize: '22px', color: 'var(--teal-900)', marginBottom: '24px', fontWeight: '600' }}>
                Kantor Sekretariat
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(173,138,78,0.1)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    📍
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', color: 'var(--teal-900)', fontWeight: '700' }}>Alamat Lengkap</h4>
                    <p style={{ margin: 0, fontSize: '14px', color: 'var(--ink-soft)', lineHeight: '1.6' }}>{address}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(173,138,78,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    💬
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', color: 'var(--teal-900)', fontWeight: '700' }}>WhatsApp Layanan</h4>
                    <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ margin: 0, fontSize: '14px', color: 'var(--gold-500)', fontWeight: '600', textDecoration: 'none' }}>
                      {phoneRaw}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(173,138,78,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    📸
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', color: 'var(--teal-900)', fontWeight: '700' }}>Instagram Resmi</h4>
                    <a href={instagramUrl} target="_blank" rel="noopener noreferrer" style={{ margin: 0, fontSize: '14px', color: 'var(--gold-500)', fontWeight: '600', textDecoration: 'none' }}>
                      {instagram}
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Google Maps Card */}
            <div style={{ background: '#ffffff', border: '1px solid rgba(173,138,78,0.15)', borderRadius: '16px', padding: '16px', boxShadow: '0 10px 30px rgba(15,43,36,0.03)', overflow: 'hidden' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.709971279144!2d112.0006764!3d-7.820468999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78f5f4d852a36b%3A0xc3ec5bf81c5d01ec!2sPondok%20Pesantren%20Putri%20Hidayatul%20Mubtadiat!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid" 
                width="100%" 
                height="280" 
                style={{ border: 0, borderRadius: '12px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>

          {/* SISI KANAN: Formulir Pesan */}
          <div style={{ background: '#ffffff', border: '1px solid rgba(173,138,78,0.15)', borderRadius: '16px', padding: '40px', boxShadow: '0 10px 30px rgba(15,43,36,0.03)' }}>
            <h2 style={{ fontFamily: '"Fraunces", serif', fontSize: '22px', color: 'var(--teal-900)', marginBottom: '12px', fontWeight: '600' }}>
              Kirim Pesan Langsung
            </h2>
            <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', lineHeight: '1.6', marginBottom: '28px', marginTop: 0 }}>
              Punya pertanyaan seputar pendaftaran santri baru, kegiatan, atau kebutuhan lainnya? Kirimkan pesan Anda melalui formulir di bawah ini.
            </p>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} action="#" method="POST" onSubmit={(e) => {
              e.preventDefault();
              alert('Terima kasih, pesan Anda telah terkirim! Staf sekretariat kami akan segera memproses atau menghubungi Anda.');
              e.target.reset();
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--teal-900)' }}>Nama Lengkap</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Masukkan nama Anda..." 
                  style={{ width: '100%', padding: '12px 16px', border: '1.5px solid rgba(173,138,78,0.2)', borderRadius: '8px', fontSize: '14px', outline: 'none', background: '#fcfbfa' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--teal-900)' }}>Alamat Email</label>
                <input 
                  type="email" 
                  required 
                  placeholder="name@example.com" 
                  style={{ width: '100%', padding: '12px 16px', border: '1.5px solid rgba(173,138,78,0.2)', borderRadius: '8px', fontSize: '14px', outline: 'none', background: '#fcfbfa' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--teal-900)' }}>Subjek</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Tujuan pesan (Pendaftaran / Informasi / dll)" 
                  style={{ width: '100%', padding: '12px 16px', border: '1.5px solid rgba(173,138,78,0.2)', borderRadius: '8px', fontSize: '14px', outline: 'none', background: '#fcfbfa' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--teal-900)' }}>Pesan Anda</label>
                <textarea 
                  required 
                  rows="5" 
                  placeholder="Tulis pesan lengkap Anda di sini..." 
                  style={{ width: '100%', padding: '12px 16px', border: '1.5px solid rgba(173,138,78,0.2)', borderRadius: '8px', fontSize: '14px', outline: 'none', background: '#fcfbfa', resize: 'vertical' }}
                ></textarea>
              </div>

              <button 
                type="submit" 
                style={{ marginTop: '8px', padding: '14px', background: 'var(--teal-900)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14.5px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(15,43,36,0.15)' }}
              >
                Kirim Pesan
              </button>
            </form>
          </div>

        </div>

      </div>
    </main>
  );
}
