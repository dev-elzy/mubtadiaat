"use client";

import { useState } from 'react';
import Image from 'next/image';
import Reveal from '../ui/Reveal';

export default function ProfilSingkat({ settings = {}, text }) {
  const [imgFailed, setImgFailed] = useState(false);
  const eyebrow = settings.profilSingkatEyebrow || "Profil Singkat";
  const titleHtml = settings.profilSingkatTitleHtml || "Pendidikan yang Menyatukan <em>Ilmu</em> dan <em>Kepribadian</em>";
  const imageSrc = settings.profilSingkatImage || "/images/muhafadhah-akhirussanah.jpg";
  const tagBold = settings.profilSingkatTagBold || "Sejak 1406 H";
  const tagText = settings.profilSingkatTagText || "Diasuh oleh KH. M. Anwar Manshur & Ibu Nyai Hj. Ummi Kultsum";

  const rawText = text || settings.profilSingkat;
  const paragraphs = rawText
    ? rawText.split(/\r?\n\r?\n+/).filter(p => p.trim().length > 0)
    : [
        "Pondok Pesantren Putri Hidayatul Mubtadiat (P3HM) adalah unit pendidikan khusus santriwati di bawah naungan Pondok Pesantren Lirboyo, Kediri, dengan Pendiri sekaligus Pengasuh KH. M. Anwar Manshur bersama Ibu Nyai Hj. Ummi Kultsum.",
        "Melalui pembinaan yang konsisten, pondok ini mengarahkan santriwatinya menjadi kader-kader muslimah sejati yang berdaya guna dalam menyukseskan dakwah dan pengembangan Islam di lingkungannya masing-masing.",
        "Madrasah Putri Hidayatul Mubtadiat (MPHM), sebagai unit pendidikan formal keagamaan di bawah naungan yang sama, menerapkan sistem klasikal berjenjang dengan fokus pengajaran kitab-kitab salaf — ciri khas yang menjadi identitas pesantren ini secara turun-temurun."
      ];

  return (
    <section className="profil" id="profil">
      <div className="wrap">
        <div className="profil-grid">
          <Reveal className="profil-media">
            <div className={`art-panel ${imgFailed ? 'img-failed' : ''}`} id="profilPanel">
              <Image 
                src={imageSrc} 
                alt="Lingkungan Pondok Pesantren Putri Hidayatul Mubtadiat" 
                width={460}
                height={575}
                unoptimized
                onError={() => setImgFailed(true)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
              />
            </div>
            <div className="profil-tag">
              <b>{tagBold}</b>
              {tagText}
            </div>
          </Reveal>
          
          <Reveal className="profil-text">
            <div className="eyebrow">{eyebrow}</div>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: titleHtml }} />
            {paragraphs.map((p, idx) => (
              <p key={idx} style={{ whiteSpace: 'pre-line' }}>{p}</p>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
