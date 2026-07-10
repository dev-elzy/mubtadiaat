"use client";

import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';

export default function RichTextEditor({ label, value, onChange, placeholder, helperText }) {
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [imgAlt, setImgAlt] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        }
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Image.configure({
        inline: true,
        allowBase64: true
      }),
      Link.configure({
        openOnClick: false
      })
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });

  // Sinkronisasi nilai ketika editor dimuat atau value berubah dari luar (misal edit item baru)
  useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  async function handleImageUpload(e) {
    const file = e.target.files?.[0];
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

  const insertImageToEditor = () => {
    if (!imgUrl.trim() || !editor) return;
    editor.chain().focus().setImage({ src: imgUrl, alt: imgAlt }).run();
    setImgUrl('');
    setImgAlt('');
    setImageModalOpen(false);
  };

  const insertLinkToEditor = () => {
    if (!linkUrl.trim() || !editor) return;
    editor.chain().focus().setLink({ href: linkUrl, target: '_blank' }).run();
    setLinkUrl('');
    setLinkModalOpen(false);
  };

  if (!editor) {
    return (
      <div style={{ padding: '24px', background: 'var(--surface)', borderRadius: '8px', color: 'var(--text-secondary)' }}>
        Memuat Editor Teks MS Word...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {label && (
        <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--gold)', margin: 0 }}>
          {label}
        </label>
      )}

      <div style={{
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        background: 'var(--surface)',
        boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
      }}>
        {/* TOOLBAR MS WORD STYLE */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '4px',
          padding: '10px 12px',
          background: 'var(--bg-elevated)',
          borderBottom: '1px solid var(--border)'
        }}>
          {/* Kelompok Format Huruf */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: 'none',
              background: editor.isActive('bold') ? 'var(--gold)' : 'transparent',
              color: editor.isActive('bold') ? '#0B1A16' : 'var(--text)',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer'
            }}
            title="Tebal (Bold)"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: 'none',
              background: editor.isActive('italic') ? 'var(--gold)' : 'transparent',
              color: editor.isActive('italic') ? '#0B1A16' : 'var(--text)',
              fontStyle: 'italic',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer'
            }}
            title="Miring (Italic)"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: 'none',
              background: editor.isActive('underline') ? 'var(--gold)' : 'transparent',
              color: editor.isActive('underline') ? '#0B1A16' : 'var(--text)',
              textDecoration: 'underline',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer'
            }}
            title="Garis Bawah (Underline)"
          >
            U
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: 'none',
              background: editor.isActive('strike') ? 'var(--gold)' : 'transparent',
              color: editor.isActive('strike') ? '#0B1A16' : 'var(--text)',
              textDecoration: 'line-through',
              fontSize: '13px',
              cursor: 'pointer'
            }}
            title="Coretan (Strikethrough)"
          >
            S
          </button>

          <span style={{ width: '1px', height: '22px', background: 'var(--border)', margin: '0 4px' }} />

          {/* Heading / Hierarchy */}
          <button
            type="button"
            onClick={() => editor.chain().focus().setParagraph().run()}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: 'none',
              background: editor.isActive('paragraph') ? 'var(--gold)' : 'transparent',
              color: editor.isActive('paragraph') ? '#0B1A16' : 'var(--text)',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
            title="Teks Normal"
          >
            Paragraf
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: 'none',
              background: editor.isActive('heading', { level: 1 }) ? 'var(--gold)' : 'transparent',
              color: editor.isActive('heading', { level: 1 }) ? '#0B1A16' : 'var(--text)',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
            title="Judul Utama (H1)"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: 'none',
              background: editor.isActive('heading', { level: 2 }) ? 'var(--gold)' : 'transparent',
              color: editor.isActive('heading', { level: 2 }) ? '#0B1A16' : 'var(--text)',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
            title="Sub-judul (H2)"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: 'none',
              background: editor.isActive('heading', { level: 3 }) ? 'var(--gold)' : 'transparent',
              color: editor.isActive('heading', { level: 3 }) ? '#0B1A16' : 'var(--text)',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
            title="Judul Bagian (H3)"
          >
            H3
          </button>

          <span style={{ width: '1px', height: '22px', background: 'var(--border)', margin: '0 4px' }} />

          {/* Rata Teks (Align) */}
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: 'none',
              background: editor.isActive({ textAlign: 'left' }) ? 'var(--gold)' : 'transparent',
              color: editor.isActive({ textAlign: 'left' }) ? '#0B1A16' : 'var(--text)',
              fontSize: '13px',
              cursor: 'pointer'
            }}
            title="Rata Kiri"
          >
            ⬅️ Kiri
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: 'none',
              background: editor.isActive({ textAlign: 'center' }) ? 'var(--gold)' : 'transparent',
              color: editor.isActive({ textAlign: 'center' }) ? '#0B1A16' : 'var(--text)',
              fontSize: '13px',
              cursor: 'pointer'
            }}
            title="Rata Tengah"
          >
            ↔️ Tengah
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: 'none',
              background: editor.isActive({ textAlign: 'right' }) ? 'var(--gold)' : 'transparent',
              color: editor.isActive({ textAlign: 'right' }) ? '#0B1A16' : 'var(--text)',
              fontSize: '13px',
              cursor: 'pointer'
            }}
            title="Rata Kanan"
          >
            ➡️ Kanan
          </button>

          <span style={{ width: '1px', height: '22px', background: 'var(--border)', margin: '0 4px' }} />

          {/* Daftar Poin & Angka */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: 'none',
              background: editor.isActive('bulletList') ? 'var(--gold)' : 'transparent',
              color: editor.isActive('bulletList') ? '#0B1A16' : 'var(--text)',
              fontSize: '13px',
              cursor: 'pointer'
            }}
            title="Daftar Poin"
          >
            • Poin
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: 'none',
              background: editor.isActive('orderedList') ? 'var(--gold)' : 'transparent',
              color: editor.isActive('orderedList') ? '#0B1A16' : 'var(--text)',
              fontSize: '13px',
              cursor: 'pointer'
            }}
            title="Daftar Angka"
          >
            1. Angka
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: 'none',
              background: editor.isActive('blockquote') ? 'var(--gold)' : 'transparent',
              color: editor.isActive('blockquote') ? '#0B1A16' : 'var(--text)',
              fontSize: '13px',
              cursor: 'pointer'
            }}
            title="Kutipan"
          >
            &ldquo;&rdquo; Kutipan
          </button>

          <span style={{ width: '1px', height: '22px', background: 'var(--border)', margin: '0 4px' }} />

          {/* Sisipkan Media */}
          <button
            type="button"
            onClick={() => setImageModalOpen(true)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid var(--border)',
              background: 'rgba(216, 190, 140, 0.08)',
              color: 'var(--gold)',
              fontSize: '12.5px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            🖼️ Sisipkan Gambar
          </button>
          <button
            type="button"
            onClick={() => setLinkModalOpen(true)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid var(--border)',
              background: 'rgba(216, 190, 140, 0.08)',
              color: 'var(--gold)',
              fontSize: '12.5px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            🔗 Sisipkan Link
          </button>

          <span style={{ width: '1px', height: '22px', background: 'var(--border)', margin: '0 4px' }} />

          {/* Undo / Redo */}
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: 'none',
              background: 'transparent',
              color: editor.can().undo() ? 'var(--text)' : 'var(--text-tertiary)',
              cursor: editor.can().undo() ? 'pointer' : 'not-allowed',
              fontSize: '14px'
            }}
            title="Batalkan (Undo)"
          >
            ↩️
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: 'none',
              background: 'transparent',
              color: editor.can().redo() ? 'var(--text)' : 'var(--text-tertiary)',
              cursor: editor.can().redo() ? 'pointer' : 'not-allowed',
              fontSize: '14px'
            }}
            title="Ulangi (Redo)"
          >
            ↪️
          </button>
        </div>

        {/* KANVAS EDITOR WYSIWYG LUXURY DARK */}
        <div style={{
          background: 'var(--bg)',
          color: 'var(--text)',
          padding: '24px',
          minHeight: '320px',
          maxHeight: '600px',
          overflowY: 'auto',
          fontSize: '15px',
          lineHeight: '1.7',
          fontFamily: '"Plus Jakarta Sans", sans-serif'
        }}>
          <style jsx global>{`
            .ProseMirror {
              outline: none !important;
              min-height: 270px;
            }
            .ProseMirror p {
              margin-bottom: 12px;
              color: var(--text);
            }
            .ProseMirror h1 {
              font-size: 26px;
              font-weight: 700;
              margin: 18px 0 10px;
              color: var(--gold-bright);
            }
            .ProseMirror h2 {
              font-size: 21px;
              font-weight: 700;
              margin: 16px 0 8px;
              color: var(--gold-bright);
            }
            .ProseMirror h3 {
              font-size: 18px;
              font-weight: 600;
              margin: 14px 0 6px;
              color: var(--gold);
            }
            .ProseMirror ul, .ProseMirror ol {
              padding-left: 24px;
              margin-bottom: 12px;
              color: var(--text);
            }
            .ProseMirror blockquote {
              border-left: 4px solid var(--gold);
              padding-left: 14px;
              color: var(--text-secondary);
              font-style: italic;
              margin: 14px 0;
            }
            .ProseMirror img {
              max-width: 100%;
              height: auto;
              border-radius: 8px;
              margin: 14px 0;
            }
            .ProseMirror a {
              color: var(--gold);
              text-decoration: underline;
            }
          `}</style>
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* MODAL SISIPKAN GAMBAR */}
      {imageModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-lg)',
            width: '100%',
            maxWidth: '480px',
            padding: '24px',
            color: 'var(--text)'
          }}>
            <h4 style={{ fontSize: '16px', color: 'var(--gold)', marginBottom: '16px' }}>
              🖼️ Sisipkan Gambar ke Dokumen
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'var(--gold)', marginBottom: '6px' }}>
                  Opsi 1: Unggah dari Komputer / Perangkat
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ fontSize: '13px', color: 'var(--text)' }}
                />
                {uploading && (
                  <p style={{ fontSize: '12px', color: 'var(--gold)', marginTop: '6px' }}>
                    ⏳ Sedang mengunggah gambar...
                  </p>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'var(--gold)', marginBottom: '6px' }}>
                  Opsi 2: Atau Masukkan URL Gambar Langsung
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'var(--gold)', marginBottom: '6px' }}>
                  Keterangan Gambar / Caption (Pilihan)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Suasana kegiatan santriwati"
                  value={imgAlt}
                  onChange={(e) => setImgAlt(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    fontSize: '13px'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button
                type="button"
                onClick={() => setImageModalOpen(false)}
                className="btn"
                style={{ background: 'var(--surface)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
              >
                Batal
              </button>
              <button
                type="button"
                onClick={insertImageToEditor}
                disabled={!imgUrl.trim()}
                className="btn btn-primary"
                style={{ background: 'var(--gold-dark)', color: '#0B1A16', fontWeight: '700' }}
              >
                Sisipkan ke Dokumen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL SISIPKAN LINK */}
      {linkModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-lg)',
            width: '100%',
            maxWidth: '440px',
            padding: '24px',
            color: 'var(--text)'
          }}>
            <h4 style={{ fontSize: '16px', color: 'var(--gold)', marginBottom: '16px' }}>
              🔗 Sisipkan Tautan (Link)
            </h4>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: 'var(--gold)', marginBottom: '6px' }}>
                Alamat URL Tautan
              </label>
              <input
                type="url"
                placeholder="https://..."
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  fontSize: '13px'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button
                type="button"
                onClick={() => setLinkModalOpen(false)}
                className="btn"
                style={{ background: 'var(--surface)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
              >
                Batal
              </button>
              <button
                type="button"
                onClick={insertLinkToEditor}
                disabled={!linkUrl.trim()}
                className="btn btn-primary"
                style={{ background: 'var(--gold-dark)', color: '#0B1A16', fontWeight: '700' }}
              >
                Pasang Tautan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
