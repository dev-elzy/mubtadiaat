import Reveal from '../ui/Reveal';

export default function KontakSection() {
  return (
    <section className="kontak" id="kontak">
      <div className="wrap">
        <div className="kontak-grid">
          <Reveal>
            <div className="eyebrow">Hubungi Kami</div>
            <h2 className="section-title">Kami Siap Menjawab <em>Pertanyaan</em> Anda</h2>
            <ul className="kontak-list" style={{ listStyle: 'none' }}>
              <li className="kontak-item">
                <div className="ic"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z"/></svg></div>
                <div>
                  <h4>Telepon / WhatsApp</h4>
                  <a href="https://wa.me/628561985565" target="_blank">0856-1985-565</a>
                </div>
              </li>
              <li className="kontak-item">
                <div className="ic"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
                <div>
                  <h4>Alamat</h4>
                  <p>Jl. KH. Abdul Karim, PO. Box 140, Lirboyo, Mojoroto, Kota Kediri 64117, Jawa Timur</p>
                </div>
              </li>
              <li className="kontak-item">
                <div className="ic"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></div>
                <div>
                  <h4>Instagram</h4>
                  <a href="https://www.instagram.com/p3hmlirboyo/" target="_blank">@p3hmlirboyo</a>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal className="kontak-card">
            <div className="arabic">بَارَكَ اللهُ فِيْكُمْ</div>
            <p>Untuk informasi lebih lanjut seputar penerimaan santri baru maupun kegiatan pondok, silakan hubungi kami langsung melalui WhatsApp atau ikuti kabar terbaru di Instagram.</p>
            <div className="kontak-social">
              <a className="soc-btn" href="https://wa.me/628561985565" target="_blank">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                WhatsApp
              </a>
              <a className="soc-btn" href="https://www.instagram.com/p3hmlirboyo/" target="_blank">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>
                Instagram
              </a>
            </div>
          </Reveal>
        </div>
        
        <Reveal className="map-container" style={{ marginTop: '48px', borderRadius: '18px', overflow: 'hidden', border: '1px solid var(--line)', boxShadow: 'var(--shadow)' }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.725015210142!2d111.9913233750054!3d-7.818903992201817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7857d659b0d9bb%3A0xeb9af58aef8914eb!2sPondok%20Pesantren%20Putri%20Hidayatul%20Mubtadi&#39;aat%20%5BP3HM%5D%20Lirboyo!5e0!3m2!1sid!2sid!4v1783608139333!5m2!1sid!2sid" 
            width="100%" 
            height="450" 
            style={{ border: 0, display: 'block' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        </Reveal>
      </div>
    </section>
  );
}
