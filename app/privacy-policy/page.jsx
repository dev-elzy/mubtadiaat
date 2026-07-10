export const runtime = 'edge';

export default function PrivacyPolicyPage() {
  return (
    <main style={{ background: '#fbf8f1', minHeight: '100vh', padding: '140px 0 80px 0', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      <div className="wrap" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-500)', display: 'block', marginBottom: '8px' }}>
            Kebijakan Privasi
          </span>
          <h1 style={{ fontFamily: '"Fraunces", serif', fontSize: '38px', color: 'var(--teal-900)', fontWeight: '500', margin: 0 }}>
            Kebijakan Privasi
          </h1>
          <div style={{ width: '60px', height: '3px', background: 'var(--gold-500)', margin: '16px auto 0' }}></div>
        </div>

        {/* Content Card */}
        <div style={{ background: '#ffffff', border: '1px solid rgba(173,138,78,0.15)', borderRadius: '20px', padding: '40px', boxShadow: '0 10px 30px rgba(15,43,36,0.03)', color: 'var(--ink)', lineHeight: '1.8' }}>
          
          <h3 style={{ fontFamily: '"Fraunces", serif', color: 'var(--teal-900)', fontSize: '20px', marginTop: 0, marginBottom: '12px' }}>
            Cookies dan Teknologi Lainnya
          </h3>
          <p>
            Cookie adalah satu bagian data yang disimpan di komputer pengguna yang berkaitan dengan informasi tentang pengguna tersebut. Kami menggunakan session ID cookie, yang berarti ketika pengguna menutup browser, cookie tersebut dihapus. Cookie juga digunakan untuk manajemen session di website kami. Pengguna harus mengaktifkan cookie untuk menggunakan website kami.
          </p>
          <p>
            Ke depan, pengguna juga dapat menggunakan cookie untuk mengingat password mereka agar secara otomatis bisa log in pada situs kami. Kami tidak dan tidak akan menggunakan cookie untuk mengumpulkan informasi pribadi dari pengguna manapun yang tidak dimaksudkan untuk disampaikan pada kami.
          </p>

          <h3 style={{ fontFamily: '"Fraunces", serif', color: 'var(--teal-900)', fontSize: '20px', marginTop: '28px', marginBottom: '12px' }}>
            IP Addresses
          </h3>
          <p>
            <strong>p3hm.my.id</strong> menyimpan IP (Internet Protocol) address, atau lokasi komputer Anda di Internet, untuk keperluan administrasi sistem dan troubleshooting. Kami menggunakan IP address secara keseluruhan (agregat) untuk mengetahui lokasi-lokasi yang mengakses situs kami.
          </p>

          <h3 style={{ fontFamily: '"Fraunces", serif', color: 'var(--teal-900)', fontSize: '20px', marginTop: '28px', marginBottom: '12px' }}>
            Log Files
          </h3>
          <p>
            Data log hanya digunakan dalam bentuk agregat (keseluruhan) untuk menganalisa penggunaan web kami.
          </p>

          <h3 style={{ fontFamily: '"Fraunces", serif', color: 'var(--teal-900)', fontSize: '20px', marginTop: '28px', marginBottom: '12px' }}>
            Analisa Statistik
          </h3>
          <p>
            <strong>p3hm.my.id</strong> dapat melakukan analisa statistik, demografi dan marketing dari para pengguna dan pelanggannya serta kebiasaan serta pola-pola penggunaan yang terjadi untuk pengembangan produk dan menarik pengiklan terhadap kebiasaan pengguna. Kami juga menggunakan informasi ini untuk memungkinkan iklan yang lebih sesuai target pengguna. <strong>p3hm.my.id</strong> juga dapat berbagi informasi pengguna dengan instansi lain untuk tujuan analisa, termasuk analisa untuk meningkatkan hubungan pelanggan.
          </p>

          <h3 style={{ fontFamily: '"Fraunces", serif', color: 'var(--teal-900)', fontSize: '20px', marginTop: '28px', marginBottom: '12px' }}>
            Produk dan Layanan p3hm.my.id
          </h3>
          <p>
            Secara rutin, kami akan memberikan berbagai informasi dan penawaran produk dan layanan lain <strong>p3hm.my.id</strong> pada pembaca kami. Informasi ini hanya akan kami bagi secara internal. Anda bisa memilih untuk tidak menerima penawaran-penawaran ini.
          </p>

          <h3 style={{ fontFamily: '"Fraunces", serif', color: 'var(--teal-900)', fontSize: '20px', marginTop: '28px', marginBottom: '12px' }}>
            Iklan Banner
          </h3>
          <p>
            Kami dapat menggunakan informasi demografi dan preferensi untuk memungkinkan pemasangan iklan di situs web kami agar lebih tepat sasaran. Hal ini berarti pengguna dapat melihat iklan yang hanya menarik bagi mereka, dan pengiklan dapat menyampaikan pesan hanya kepada target yang tepat bagi produk mereka. Hal ini meningkatkan pengalaman pengguna dan keefektifan iklan. Kami hanya menyampaikan informasi kepada pihak ketiga dalam format agregat (keseluruhan).
          </p>

          <h3 style={{ fontFamily: '"Fraunces", serif', color: 'var(--teal-900)', fontSize: '20px', marginTop: '28px', marginBottom: '12px' }}>
            Konten yang Dibuat oleh Pengguna (Forum, Komunitas)
          </h3>
          <p>
            Ke depan Kami akan menawarkan banyak fasilitas bagi pembaca di sejumlah area situs kami. Informasi apapun yang Anda sampaikan dan dipublikasikan di forum bersama dengan nama pengguna (screen name atau ID), adalah di area publik dan dapat digunakan oleh <strong>p3hm.my.id</strong> untuk keperluan promosi di seluruh media online dan offline. Untuk informasi lebih lanjut, silakan melihat Persetujuan Pengguna di masing-masing fasilitas dan layanan kami.
          </p>

        </div>

      </div>
    </main>
  );
}
