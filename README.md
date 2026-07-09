# Website Profil Pondok Pesantren Putri Hidayatul Mubtadiat (`p3hm.my.id`)

Website profil resmi Pondok Pesantren Putri Hidayatul Mubtadiat (P3HM) Lirboyo, Kediri. Halaman ini dirancang untuk menampilkan profil pesantren, arah pendidikan (Kitab Salaf, Madrasah Diniyah, Pembinaan Akhlak), pendaftaran santri baru, serta tautan menuju **Portal Wali & Akademik MPHM**.

---

## 1. Domain Resmi
- **Domain Utama**: `p3hm.my.id` / `www.p3hm.my.id`
- **Subdomain Portal Akademik & Wali**: `portal.p3hm.my.id`

---

## 2. Cara Deploy ke Cloudflare Pages (`p3hm.my.id`)

Proyek ini telah dikonfigurasi menggunakan **Cloudflare Pages Static Assets (`wrangler.jsonc`)**.

### Langkah Deploy Cepat:
1. Masuk ke direktori proyek ini:
   ```bash
   cd D:\DEVELZY\mubtadiaat
   ```
2. Jalankan perintah deploy menggunakan Wrangler CLI:
   ```bash
   npx wrangler pages deploy . --project-name=p3hm-landing-profile
   ```
3. Di Dasbor Cloudflare Pages -> **Custom Domains**, tambahkan domain:
   - `p3hm.my.id`
   - `www.p3hm.my.id`

Cloudflare akan secara otomatis menerbitkan sertifikat SSL gratis untuk domain `p3hm.my.id`.

---

## 3. Fitur Utama Landing Page
- **SEO & Open Graph Lengkap**: Dioptimasi untuk pembagian tautan di WhatsApp, Telegram, Instagram, & Google Search.
- **Tampilan Responsif & Elegan**: Menggabungkan tipografi salaf khas pesantren (Amiri Arabic & Fraunces) dengan desain antarmuka modern.
- **Akses Langsung ke Portal MPHM**: Tersedia tombol **"Portal Wali & Akademik"** pada navigasi utama.
