import Image from 'next/image';
import Link from 'next/link';
import Reveal from '../ui/Reveal';

export default function HeroSection({ settings = {} }) {
  const eyebrow = settings.heroEyebrow || "Lirboyo · Kota Kediri · Jawa Timur";
  const arabic = settings.heroArabic || "مَعْهَدْ لِلْبَنَاتْ هِدَايَةُ الْمُبْتَدِئَاتْ";
  const titleHtml = settings.heroTitleHtml || 'Menempa Muslimah <em>Sejati</em>,<br />Berakar pada Kitab Salaf';
  const sub = settings.heroSub || "Pondok Pesantren Putri Hidayatul Mubtadiat mendidik santriwati dengan keilmuan agama yang mendalam dan kesiapan menjawab kebutuhan masyarakat — di bawah naungan Yayasan Hidayatul Mubtadiat, Lirboyo Kediri.";
  const daftarUrl = settings.daftarUrl || "https://docs.google.com/forms/d/e/1FAIpQLSfUOGLDZHGW7ApSoHTWbrMjbDJXALVHKdHEos95H5fkqxzHmg/viewform";

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="hero-eyebrow eyebrow">{eyebrow}</div>
          <div className="hero-arabic arabic">{arabic}</div>
          <Reveal className="hero-title" as="h1" style={{ margin: '0 auto 20px', padding: 0 }}>
            <span dangerouslySetInnerHTML={{ __html: titleHtml }} />
          </Reveal>
          <Reveal className="hero-sub">
            <p>{sub}</p>
          </Reveal>
          <Reveal className="hero-actions">
            <Link href={daftarUrl} target="_blank" className="btn-primary">
              Pendaftaran Online 1446–1447 H
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </Link>
            <Link href="#profil" className="btn-ghost">Lihat Profil Pondok</Link>
          </Reveal>

          <Reveal className="hero-frame" id="heroFrame">
            <Image 
              src="https://lirboyo.net/wp-content/uploads/2022/02/Bangunan-dalam.jpg" 
              alt="Lingkungan Pondok Pesantren Putri Hidayatul Mubtadiat, Lirboyo Kediri" 
              width={920}
              height={448}
              priority
              unoptimized
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
            />
            <div className="hero-fallback">
              <svg viewBox="0 0 920 448" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="glow" cx="50%" cy="20%" r="70%">
                    <stop offset="0%" stopColor="#AD8A4E" stopOpacity="0.18"/>
                    <stop offset="100%" stopColor="#AD8A4E" stopOpacity="0"/>
                  </radialGradient>
                </defs>
                <rect width="920" height="448" fill="url(#glow)"/>
                <g fill="#D8BE8C" opacity="0.5">
                  <circle cx="120" cy="60" r="1.4"/><circle cx="240" cy="40" r="1.1"/><circle cx="700" cy="55" r="1.4"/>
                  <circle cx="800" cy="90" r="1.1"/><circle cx="560" cy="35" r="1.1"/><circle cx="360" cy="30" r="1.1"/>
                </g>
                <line x1="0" y1="392" x2="920" y2="392" stroke="#D8BE8C" strokeOpacity="0.25" strokeWidth="1"/>
                <g stroke="#D8BE8C" strokeOpacity="0.22" strokeWidth="1" fill="none">
                  <path d="M40 392 L40 250 L100 250 L100 392 M160 392 L160 260 L220 260 L220 392 M700 392 L700 260 L760 260 L760 392 M820 392 L820 250 L880 250 L880 392"/>
                </g>
                <g stroke="#D8BE8C" strokeWidth="1.6" fill="none" strokeLinejoin="round">
                  <path d="M300 392 V180 Q300 150 330 150 H590 Q620 150 620 180 V392"/>
                  <path d="M330 392 V210 H590 V392"/>
                  <path d="M420 392 V270 Q420 250 460 250 Q500 250 500 270 V392"/>
                  <path d="M300 195 H620"/>
                  <path d="M270 210 V392 M650 210 V392"/>
                </g>
                <g stroke="#AD8A4E" strokeWidth="1.8" fill="none" strokeLinecap="round">
                  <path d="M330 150 Q460 90 590 150"/>
                  <path d="M410 150 Q460 118 510 150"/>
                  <circle cx="460" cy="96" r="7"/>
                  <path d="M460 89 V70"/>
                </g>
                <g stroke="#D8BE8C" strokeWidth="1" fill="none" opacity="0.75">
                  <polygon points="460,166 468,182 486,182 472,193 478,210 460,199 442,210 448,193 434,182 452,182"/>
                </g>
                <g fill="#0F2B24" opacity="0.55">
                  <rect x="60" y="300" width="150" height="92"/>
                  <rect x="710" y="300" width="150" height="92"/>
                </g>
                <g stroke="#D8BE8C" strokeOpacity="0.3" strokeWidth="1">
                  <rect x="60" y="300" width="150" height="92" fill="none"/>
                  <rect x="710" y="300" width="150" height="92" fill="none"/>
                  <line x1="90" y1="300" x2="90" y2="392"/><line x1="130" y1="300" x2="130" y2="392"/>
                  <line x1="170" y1="300" x2="170" y2="392"/>
                  <line x1="740" y1="300" x2="740" y2="392"/><line x1="780" y1="300" x2="780" y2="392"/>
                  <line x1="820" y1="300" x2="820" y2="392"/>
                </g>
              </svg>
            </div>
            <div className="hero-frame-caption" style={{ position: 'relative', zIndex: 2 }}><span className="dot"></span> Lingkungan Pondok Putri Hidayatul Mubtadiat, Lirboyo Kediri</div>
          </Reveal>

          <Reveal className="stat-row stat-row-4">
            <div>
              <div className="stat-num">1406 H</div>
              <div className="stat-label">Berdiri 15 September 1985 M</div>
            </div>
            <div>
              <div className="stat-num">Salaf</div>
              <div className="stat-label">Sistem Klasikal Kitab Kuning</div>
            </div>
            <div>
              <div className="stat-num">1446 H</div>
              <div className="stat-label">Periode Pendaftaran 2025–2026</div>
            </div>
            <div>
              <div className="stat-num">Putri</div>
              <div className="stat-label">Khusus Santriwati</div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="girih-divider">
        <svg viewBox="0 0 240 20" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#AD8A4E" strokeWidth="1" fill="none">
            <path d="M0 10 H90"/>
            <polygon points="100,2 108,10 100,18 92,10"/>
            <path d="M116 10 h8"/>
            <polygon points="130,2 138,10 130,18 122,10"/>
            <path d="M146 10 H240"/>
          </g>
        </svg>
      </div>
    </>
  );
}
