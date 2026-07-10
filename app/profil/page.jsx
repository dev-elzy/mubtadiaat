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
    <main className="profil-layout">
      {/* 1. Komponen-komponen Profil Statis & Dinamis */}
      <HeroSection settings={settings} />
      <ProfilSingkat settings={settings} text={settings.profilSingkat} />
      <SejarahSection settings={settings} />
      <VisiMisi settings={settings} />
      <ProgramPendidikan settings={settings} />
      <EkstraFasilitas settings={settings} />
    </main>
  );
}