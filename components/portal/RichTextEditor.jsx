"use client";

import { useState, useRef } from 'react';

export default function RichTextEditor({ label, value, onChange, placeholder, rows = 6, helperText }) {
  const [showPreview, setShowPreview] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const textareaRef = useRef(null);

  // Image modal state
  const [imgUrl, setImgUrl] = useState('');
  const [imgLayout, setImgLayout] = useState('img-large');
  const [imgAlt, setImgAlt] = useState('');
  const [uploading, setUploading] = useState(false);

  const insertTag = (openTag, closeTag = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const replacement = openTag + selectedText + closeTag;

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    // Set cursor post-insertion
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + openTag.length,
        start + openTag.length + selectedText.length
      );
    }, 10);
  };

  const handleInsertImage = () => {
    if (!imgUrl.trim()) return;
    
    // Generate img tag with corresponding size/layout class
    const altAttr = imgAlt.trim() ? ` alt="${imgAlt.replace(/"/g, '&quot;')}"` : '';
    const imgTag = `<img src="${imgUrl}"${altAttr} class="${imgLayout}" />`;
    
    insertTag(imgTag);
    
    // Reset state & close modal
    setImgUrl('');
    setImgLayout('img-large');
    setImgAlt('');
    setImageModalOpen(false);
  };

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'p3hm/artikel_internal');

    try {
      const res = await fetch('/api/cloudinary', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok && data.secure_url) {
        setImgUrl(data.secure_url);
      } else {
        alert(data.error || 'Gagal mengunggah foto');
      }
    } catch (err) {
      alert('Terjadi kesalahan pengunggahan: ' + err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label className="form-label" style={{ margin: 0 }}>{label}</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setShowHelp(!showHelp)}
              style={{
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              ❓ Panduan Tag HTML
            </button>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              style={{
                background: showPreview ? 'var(--gold-dark)' : 'transparent',
                border: '1px solid var(--border)',
                color: showPreview ? '#fff' : 'var(--text-secondary)',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {showPreview ? '✏️ Kembali Edit Teks' : '👁️ Pratinjau MS Word / Hasil'}
            </button>
          </div>
        </div>
      )}

      {/* MS Word Style Formatting Toolbar */}
      {!showPreview && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 12px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderBottom: 'none',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px'
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--gold)', marginRight: '6px' }}>
            FORMAT MS WORD:
          </span>
          <button
            type="button"
            onClick={() => insertTag('<b>', '</b>')}
            title="Tebalkan Teks (Bold)"
            style={toolbarBtnStyle}
          >
            <b>B Tebal</b>
          </button>
          <button
            type="button"
            onClick={() => insertTag('<i>', '</i>')}
            title="Miringkan Teks (Italic)"
            style={toolbarBtnStyle}
          >
            <i>I Miring</i>
          </button>
          <button
            type="button"
            onClick={() => insertTag('<br>')}
            title="Pindah Baris Baru tanpa enter paragraf baru"
            style={{ ...toolbarBtnStyle, background: 'rgba(216,190,140,0.15)', color: 'var(--gold-bright)' }}
          >
            ↵ Baris Baru &lt;br&gt;
          </button>
          <button
            type="button"
            onClick={() => insertTag('<p>', '</p>')}
            title="Paragraf Baru"
            style={toolbarBtnStyle}
          >
            ¶ Paragraf &lt;p&gt;
          </button>
          <button
            type="button"
            onClick={() => insertTag('<h2>', '</h2>')}
            title="Judul Sub-Bagian"
            style={toolbarBtnStyle}
          >
            H2 Judul
          </button>
          <button
            type="button"
            onClick={() => insertTag('<blockquote>', '</blockquote>')}
            title="Kotak Catatan Khusus"
            style={toolbarBtnStyle}
          >
            💡 Catatan
          </button>
          <button
            type="button"
            onClick={() => setImageModalOpen(true)}
            title="Sisipkan Gambar di Dalam Berita"
            style={{
              ...toolbarBtnStyle,
              background: 'var(--gold-dark)',
              borderColor: 'var(--gold-dark)',
              color: '#fff',
              fontWeight: '700'
            }}
          >
            📷 Sisipkan Gambar
          </button>
        </div>
      )}

      {/* Panduan HTML Edukatif */}
      {showHelp && (
        <div
          style={{
            padding: '12px 16px',
            background: 'rgba(173,138,78,0.08)',
            border: '1px solid var(--border-strong)',
            borderRadius: '8px',
            fontSize: '12px',
            color: 'var(--text-secondary)',
            lineHeight: 1.6
          }}
        >
          <div style={{ fontWeight: '700', color: 'var(--gold-bright)', marginBottom: '6px' }}>
            📖 Panduan Format Profesional (Fungsi Tag HTML):
          </div>
          <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <li>
              <b>&lt;br&gt; (Baris Baru):</b> Digunakan untuk turun 1 baris tanpa memberi jarak jauh paragraf. Sangat cocok untuk judul 2 baris atau alamat.
            </li>
            <li>
              <b>&lt;b&gt; ... &lt;/b&gt; (Tebal):</b> Menandai kata penting agar terlihat lebih tebal dan mencolok.
            </li>
            <li>
              <b>&lt;i&gt; ... &lt;/i&gt; (Miring):</b> Digunakan untuk istilah bahasa asing, bahasa Arab, atau nama kitab salaf.
            </li>
            <li>
              <b>&lt;p&gt; ... &lt;/p&gt; (Paragraf):</b> Memisahkan antar paragraf agar ada jarak pemisah yang nyaman dibaca.
            </li>
            <li>
              <b>Sisipkan Gambar:</b> Memungkinkan penempatan gambar di tengah teks (Lebar Penuh) atau disebelah teks kiri/kanan (Ukuran Kecil) seperti koran.
            </li>
          </ul>
        </div>
      )}

      {/* Area Edit atau Pratinjau */}
      {showPreview ? (
        <div
          className="article-content"
          style={{
            minHeight: `${rows * 24}px`,
            padding: '14px 16px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            color: 'var(--text)',
            lineHeight: 1.7
          }}
          dangerouslySetInnerHTML={{ __html: value || '<em style="color:var(--text-tertiary)">Belum ada konten tertulis</em>' }}
        />
      ) : (
        <textarea
          ref={textareaRef}
          className="form-input"
          style={{
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            fontFamily: 'monospace',
            fontSize: '13.5px',
            lineHeight: 1.6
          }}
          rows={rows}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}

      {helperText && (
        <span style={{ fontSize: '11.5px', color: 'var(--text-tertiary)' }}>
          {helperText}
        </span>
      )}

      {/* MODAL POP-UP SISIPKAN GAMBAR */}
      {imageModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10005,
            padding: '20px'
          }}
        >
          <div
            style={{
              background: 'var(--bg-elevated, #16342c)',
              border: '1px solid var(--border-strong, rgba(218, 190, 140, 0.2))',
              borderRadius: '16px',
              padding: '24px',
              width: '100%',
              maxWidth: '460px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontFamily: '"Fraunces", serif', fontSize: '18px', color: 'var(--gold-bright)', margin: 0 }}>
                📷 Sisipkan Gambar Internal
              </h4>
              <button
                type="button"
                onClick={() => setImageModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '18px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ color: 'var(--gold)' }}>1. Unggah Gambar dari Komputer</label>
              <input type="file" accept="image/*" className="form-input" onChange={handleImageUpload} />
              {uploading && (
                <p style={{ fontSize: '11.5px', color: 'var(--gold)', marginTop: '4px' }}>
                  Mengunggah gambar ke server...
                </p>
              )}
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ color: 'var(--gold)' }}>2. Atau Isi Tautan URL Gambar</label>
              <input
                type="url"
                placeholder="https://example.com/gambar.jpg"
                className="form-input"
                value={imgUrl}
                onChange={e => setImgUrl(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ color: 'var(--gold)' }}>3. Ukuran &amp; Posisi Teks (Layout Koran)</label>
              <select className="form-input" value={imgLayout} onChange={e => setImgLayout(e.target.value)}>
                <option value="img-large">📏 Lebar Penuh (Besar - Berada di Tengah)</option>
                <option value="img-float-left">⬅️ Sebelah Kiri (Kecil - Teks Melingkar Kanan)</option>
                <option value="img-float-right">➡️ Sebelah Kanan (Kecil - Teks Melingkar Kiri)</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ color: 'var(--gold)' }}>4. Deskripsi Gambar / Alt (Opsional)</label>
              <input
                type="text"
                placeholder="Misal: Foto suasana kajian"
                className="form-input"
                value={imgAlt}
                onChange={e => setImgAlt(e.target.value)}
              />
            </div>

            {imgUrl && (
              <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
                <img src={imgUrl} alt="Preview" style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setImageModalOpen(false)}
                style={{ padding: '8px 16px', fontSize: '13px' }}
              >
                Batal
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={!imgUrl || uploading}
                onClick={handleInsertImage}
                style={{ padding: '8px 16px', fontSize: '13px' }}
              >
                Sisipkan Foto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const toolbarBtnStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid var(--border)',
  color: 'var(--text)',
  padding: '5px 10px',
  borderRadius: '6px',
  fontSize: '11.5px',
  cursor: 'pointer',
  transition: 'all 0.2s'
};
