"use client";

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isPortal = pathname?.startsWith('/portal');
  const isPendaftaran = pathname?.startsWith('/pendaftaran');

  // Halaman Admin Portal tidak menggunakan Header maupun Footer publik
  if (isPortal) {
    return <>{children}</>;
  }

  // Halaman PSB (/pendaftaran) memiliki PsbNavbar mandiri di bagian atas, sehingga tidak menggunakan Header publik agar tidak bertabrakan
  if (isPendaftaran) {
    return (
      <>
        {children}
        <Footer />
      </>
    );
  }

  // Halaman website utama (/ , /profil , /berita , /galeri , /kontak , dll.)
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
