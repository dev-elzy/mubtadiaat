"use client";

import { useState } from 'react';
import Image from 'next/image';
import Reveal from '../ui/Reveal';

export default function ProfilSingkat({ text }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section className="profil" id="profil">
      <div className="wrap">
        <div className="profil-grid">
          <Reveal className="profil-media">
            <div className={`art-panel ${imgFailed ? 'img-failed' : ''}`} id="profilPanel">
              <Image 
                src="https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=1200" 
                alt="Kamar santri di Pondok Pesantren Putri Hidayatul Mubtadiat" 
                width={460}
                height={575}
                unoptimized
                onError={() => setImgFailed(true)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
              />
            </div>
            <div className="profil-tag">
              <b>Sejak 1406 H</b>
              Diasuh oleh KH. M. Anwar Manshur & Ibu Nyai Hj. Ummi Kultsum
            </div>
          </Reveal>
          
          <Reveal className="profil-text">
            <div className="eyebrow">Profil Singkat</div>
            <h2 className="section-title">Pendidikan yang Menyatukan <em>Ilmu</em> dan <em>Kepribadian</em></h2>
            {text ? (
              <p style={{ whiteSpace: 'pre-line' }}>{text}</p>
            ) : (
              <>
                <p>Pondok Pesantren Putri Hidayatul Mubtadiat (P3HM) adalah unit pendidikan khusus santriwati di bawah naungan Pondok Pesantren Lirboyo, Kediri, dengan Pendiri sekaligus Pengasuh KH. M. Anwar Manshur bersama Ibu Nyai Hj. Ummi Kultsum.</p>
                <p>Melalui pembinaan yang konsisten, pondok ini mengarahkan santriwatinya menjadi kader-kader muslimah sejati yang berdaya guna dalam menyukseskan dakwah dan pengembangan Islam di lingkungannya masing-masing.</p>
                <p>Madrasah Putri Hidayatul Mubtadiat (MPHM), sebagai unit pendidikan formal keagamaan di bawah naungan yang sama, menerapkan sistem klasikal berjenjang dengan fokus pengajaran kitab-kitab salaf — ciri khas yang menjadi identitas pesantren ini secara turun-temurun.</p>
              </>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
