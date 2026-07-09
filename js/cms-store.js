/**
 * P3HM CMS Store — Data Persistence & Server-Side Cloudinary Integration
 * 
 * All Cloudinary operations go through /api/cloudinary (Cloudflare Pages Function)
 * with credentials stored as server-side secrets. No API keys in the browser.
 */

const P3HM_STORAGE_KEY = 'p3hm_cms_data_v2';

const DEFAULT_CMS_DATA = {
  settings: {
    heroEyebrow: "Lirboyo · Kota Kediri · Jawa Timur",
    heroArabic: "مَعْهَدْ لِلْبَنَاتْ هِدَايَةُ الْمُبْتَدِئَاتْ",
    heroTitleHtml: 'Menempa Muslimah <em>Sejati</em>,<br>Berakar pada Kitab Salaf',
    heroSub: "Pondok Pesantren Putri Hidayatul Mubtadiat mendidik santriwati dengan keilmuan agama yang mendalam dan kesiapan menjawab kebutuhan masyarakat — di bawah naungan Yayasan Hidayatul Mubtadiat, Lirboyo Kediri.",
    daftarUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfUOGLDZHGW7ApSoHTWbrMjbDJXALVHKdHEos95H5fkqxzHmg/viewform",
    portalWaliUrl: "https://m.p3hm.my.id/",
    phoneWa: "0856-1985-565",
    phoneWaLink: "https://wa.me/628561985565",
    address: "Jl. KH. Abdul Karim, PO. Box 140, Lirboyo, Mojoroto, Kota Kediri 64117, Jawa Timur",
    instagramHandle: "@p3hmlirboyo",
    instagramUrl: "https://www.instagram.com/p3hmlirboyo/"
  },
  berita: [
    {
      id: "b1",
      title: "Pembukaan Pengajian Rutin Kitab Salaf Semester Genap 1446 H",
      slug: "pembukaan-pengajian-rutin-kitab-salaf",
      category: "Akademik & Pengajian",
      status: "published",
      author: "Redaksi P3HM",
      date: "2026-07-05",
      image: "https://lirboyo.net/wp-content/uploads/2022/02/Sorogan-Kitab-1024x561.jpg",
      cloudinaryId: "",
      summary: "Pengajian rutin kitab kuning kembali dimulai dengan bimbingan langsung para ustadzah senior Pondok Pesantren Putri Hidayatul Mubtadiat Lirboyo.",
      content: "Pondok Pesantren Putri Hidayatul Mubtadiat (P3HM) Lirboyo resmi memulai kembali kegiatan belajar mengajar dan pengajian rutin kitab salaf untuk semester genap 1446 H."
    },
    {
      id: "b2",
      title: "Prestasi Santriwati dalam Bahtsul Masa-il Se-Jawa Timur",
      slug: "prestasi-santriwati-bahtsul-masail",
      category: "Prestasi & Kegiatan",
      status: "published",
      author: "Tim Jurnalistik P3HM",
      date: "2026-06-28",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80",
      cloudinaryId: "",
      summary: "Delegasi santriwati P3HM berhasil meraih predikat unggulan dalam forum Bahtsul Masa-il putri tingkat pesantren se-Jawa Timur.",
      content: "Musyawarah ilmiah dalam memecahkan persoalan fikih kontemporer berbasis rujukan kitab-kitab muktabarah menjadi salah satu tradisi kuat di P3HM Lirboyo."
    },
    {
      id: "b3",
      title: "Pelatihan Keterampilan Mandiri: Menjahit & Vokal Sholawat",
      slug: "pelatihan-keterampilan-mandiri",
      category: "Ekstrakurikuler",
      status: "draft",
      author: "Pengurus Jam'iyyah",
      date: "2026-06-15",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=1000&q=80",
      cloudinaryId: "",
      summary: "Program pengembangan diri santriwati melalui kursus keterampilan praktis sebagai bekal kemandirian pasca lulus pesantren.",
      content: "Selain mendalami keilmuan agama, santriwati P3HM juga dibekali keterampilan hidup (life skills) seperti menjahit, tata busana, dan seni rebana sholawat."
    }
  ],
  galeri: [
    { id: "g1", title: "Sorogan Kitab", caption: "Bimbingan membaca kitab langsung dengan ustadzah, satu per satu.", image: "https://lirboyo.net/wp-content/uploads/2022/02/Sorogan-Kitab-1024x561.jpg", cloudinaryId: "", folder: "p3hm/galeri", status: "published", date: "2026-07-01" },
    { id: "g2", title: "Bahtsul Masa-il", caption: "Musyawarah memecahkan persoalan fikih kontemporer bersama-sama.", image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80", cloudinaryId: "", folder: "p3hm/galeri", status: "published", date: "2026-06-29" },
    { id: "g3", title: "Kamar Santri", caption: "Asrama sebagai ruang tumbuh keseharian dan kebersamaan santriwati.", image: "https://lirboyo.net/wp-content/uploads/2025/01/Kamar-Santri-1-1024x683.png", cloudinaryId: "", folder: "p3hm/galeri", status: "published", date: "2026-06-25" },
    { id: "g4", title: "Perpustakaan", caption: "Koleksi kitab dan referensi sebagai ruang belajar mandiri santriwati.", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1000&q=80", cloudinaryId: "", folder: "p3hm/galeri", status: "published", date: "2026-06-20" },
    { id: "g5", title: "Koreksian Kitab", caption: "Penyelarasan makna dan harakat kitab agar sesuai kaidah yang benar.", image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1000&q=80", cloudinaryId: "", folder: "p3hm/galeri", status: "published", date: "2026-06-18" },
    { id: "g6", title: "Muhafadhah", caption: "Ujian hafalan santriwati di penghujung tahun ajaran, akhirussanah.", image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=1000&q=80", cloudinaryId: "", folder: "p3hm/galeri", status: "published", date: "2026-06-15" },
    { id: "g7", title: "Haul & Haflah", caption: "Peringatan tahunan sekaligus wisuda purna santriwati akhirussanah.", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=80", cloudinaryId: "", folder: "p3hm/galeri", status: "published", date: "2026-06-10" },
    { id: "g8", title: "Kunjungan Ulama", caption: "Silaturahmi dan mau'idzoh dari tamu ulama ke lingkungan pondok.", image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80", cloudinaryId: "", folder: "p3hm/galeri", status: "published", date: "2026-06-05" }
  ]
};

const CMSStore = {
  getData() {
    try {
      const stored = localStorage.getItem(P3HM_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(P3HM_STORAGE_KEY, JSON.stringify(DEFAULT_CMS_DATA));
        return JSON.parse(JSON.stringify(DEFAULT_CMS_DATA));
      }
      const data = JSON.parse(stored);
      return {
        settings: { ...DEFAULT_CMS_DATA.settings, ...(data.settings || {}) },
        berita: Array.isArray(data.berita) ? data.berita : DEFAULT_CMS_DATA.berita,
        galeri: Array.isArray(data.galeri) ? data.galeri : DEFAULT_CMS_DATA.galeri
      };
    } catch (e) {
      console.error("CMS Store read error:", e);
      return JSON.parse(JSON.stringify(DEFAULT_CMS_DATA));
    }
  },

  saveData(data) {
    try {
      localStorage.setItem(P3HM_STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent('p3hm-cms-updated', { detail: data }));
    } catch (e) {
      console.error("CMS Store save error:", e);
    }
  },

  getItems(type) {
    return this.getData()[type] || [];
  },

  getItemById(type, id) {
    return this.getItems(type).find(item => item.id === id);
  },

  addItem(type, item) {
    const data = this.getData();
    item.id = item.id || (type.charAt(0) + '_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4));
    data[type] = [item, ...(data[type] || [])];
    this.saveData(data);
    return item;
  },

  updateItem(type, id, updatedProps) {
    const data = this.getData();
    const list = data[type] || [];
    const idx = list.findIndex(i => i.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updatedProps };
      data[type] = list;
      this.saveData(data);
      return list[idx];
    }
    return null;
  },

  async deleteItem(type, id) {
    const data = this.getData();
    const item = (data[type] || []).find(i => i.id === id);

    if (item && item.cloudinaryId) {
      await this.deleteFromCloudinary(item.cloudinaryId);
    } else if (item && item.image && item.image.includes('cloudinary.com')) {
      const match = item.image.match(/upload\/(?:v\d+\/)?(.+?)(?:\.[a-zA-Z0-9]+)?$/);
      if (match && match[1]) {
        await this.deleteFromCloudinary(match[1]);
      }
    }

    data[type] = (data[type] || []).filter(i => i.id !== id);
    this.saveData(data);
    return true;
  },

  /**
   * Upload image via server-side API (no credentials in browser)
   */
  async uploadToCloudinary(file, folder = 'p3hm/galeri') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const res = await fetch('/api/cloudinary?action=upload', {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Upload failed (${res.status})`);
    }

    return await res.json();
  },

  /**
   * Delete image via server-side API
   */
  async deleteFromCloudinary(publicId) {
    if (!publicId || publicId.startsWith('local_')) return false;

    try {
      const res = await fetch('/api/cloudinary?action=delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_id: publicId })
      });
      const result = await res.json();
      return result.result === 'ok';
    } catch (e) {
      console.error("Cloudinary delete error:", e);
      return false;
    }
  },

  /**
   * Check if Cloudinary server connection is alive
   */
  async pingCloudinary() {
    try {
      const res = await fetch('/api/cloudinary?action=ping', { method: 'POST' });
      if (!res.ok) return { status: 'error' };
      return await res.json();
    } catch {
      return { status: 'offline' };
    }
  }
};

window.CMSStore = CMSStore;
