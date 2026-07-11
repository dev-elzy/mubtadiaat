import Reveal from '../../components/ui/Reveal';
import HeroSection from '../../components/profil/HeroSection';
import ProfilSingkat from '../../components/profil/ProfilSingkat';
import SejarahSection from '../../components/profil/SejarahSection';
import VisiMisi from '../../components/profil/VisiMisi';
import ProgramPendidikan from '../../components/profil/ProgramPendidikan';
import EkstraFasilitas from '../../components/profil/EkstraFasilitas';
import { getSettings } from '../lib/db';

export const revalidate = 0;
export const runtime = 'edge';

export default async function ProfilPage() {
  const settings = await getSettings();

  return (
    <main>
      <div className="paper-scroll">
        {/* 1. Hero */}
        <div className="paper-section-hero">
          <HeroSection settings={settings} />
        </div>
        {/* 2. Profil Singkat */}
        <div className="paper-section-white">
          <ProfilSingkat settings={settings} text={settings.profilSingkat} />
        </div>
        {/* 3. Sejarah */}
        <div className="paper-section-cream">
          <SejarahSection settings={settings} />
        </div>
        {/* 4. Visi Misi */}
        <div className="paper-section-white">
          <VisiMisi settings={settings} />
        </div>
        {/* 5. Program Pendidikan */}
        <div className="paper-section-gold">
          <ProgramPendidikan settings={settings} />
        </div>
        {/* 6. Ekstra & Fasilitas */}
        <div className="paper-section-cream">
          <EkstraFasilitas settings={settings} />
        </div>
      </div>
    </main>
  );
}