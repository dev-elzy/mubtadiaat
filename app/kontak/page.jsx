import { getSettings } from '../lib/db';
import ContactForm from '../../components/ui/ContactForm';

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
    <main>
      <div className="paper-scroll">
        <div className="paper-section-hero" style={{ paddingBottom: '48px' }}>
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
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7905.4219870463285!2d111.99477514016729!3d-7.820383967588941!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7857d659b0d9bb%3A0xeb9af58aef8914eb!2sPondok%20Pesantren%20Putri%20Hidayatul%20Mubtadi&#39;aat%20%5BP3HM%5D%20Lirboyo!5e0!3m2!1sid!2sid!4v1783649645613!5m2!1sid!2sid" 
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

            <ContactForm />
          </div>

        </div>

      </div>
      </div>
      </div>
    </main>
  );
}
