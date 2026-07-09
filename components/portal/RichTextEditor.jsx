"use client";

import { useState, useRef } from 'react';

export default function RichTextEditor({ label, value, onChange, placeholder, rows = 6, helperText }) {
  const [showPreview, setShowPreview] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const textareaRef = useRef(null);

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
            title="Judul Sub-Seksi"
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
          </ul>
        </div>
      )}

      {/* Area Edit atau Pratinjau */}
      {showPreview ? (
        <div
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
