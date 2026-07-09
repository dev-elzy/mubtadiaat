import './globals.css';
import LayoutWrapper from '../components/ui/LayoutWrapper';

export const runtime = 'edge';

export const metadata = {
  title: 'Pondok Pesantren Putri Hidayatul Mubtadiat - Lirboyo',
  description: 'Website Profil dan Portal Berita P3HM Lirboyo',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Amiri:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
