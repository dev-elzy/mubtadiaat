"use client";

import { useState, useEffect } from 'react';

function timeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return 'Baru saja';
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} hari lalu`;
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

function Avatar({ name }) {
  const initials = name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
  const colors = ['#16342C', '#AD8A4E', '#7C9188', '#204238', '#54503f'];
  const idx = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length;
  return (
    <div className="comment-avatar" style={{ background: colors[idx] }}>
      {initials}
    </div>
  );
}

function ReplyForm({ commentId, onSubmitted }) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setSending(true);
    try {
      await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reply', commentId, name, text })
      });
      setName('');
      setText('');
      onSubmitted();
    } catch (err) {
      console.error(err);
    }
    setSending(false);
  }

  return (
    <form className="reply-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Nama Anda" value={name} onChange={e => setName(e.target.value)} required className="comment-input" />
      <textarea placeholder="Tulis balasan..." value={text} onChange={e => setText(e.target.value)} required className="comment-textarea" rows={2} />
      <button type="submit" disabled={sending} className="comment-submit-btn reply-btn">
        {sending ? 'Mengirim...' : 'Kirim Balasan'}
      </button>
    </form>
  );
}

export default function CommentSection({ type, contentId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);

  async function loadComments() {
    try {
      const res = await fetch(`/api/comments?type=${type}&id=${contentId}`);
      const data = await res.json();
      setComments(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (type && contentId) loadComments();
  }, [type, contentId]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setSending(true);
    try {
      await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, contentId, name, text })
      });
      setName('');
      setText('');
      await loadComments();
    } catch (err) {
      console.error(err);
    }
    setSending(false);
  }

  return (
    <section className="comment-section">
      <div className="comment-section-header">
        <h3>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Komentar ({comments.length})
        </h3>
      </div>

      {/* Comment Form */}
      <form className="comment-form" onSubmit={handleSubmit}>
        <div className="comment-form-row">
          <input type="text" placeholder="Nama Anda *" value={name} onChange={e => setName(e.target.value)} required className="comment-input" />
        </div>
        <textarea placeholder="Tulis komentar Anda..." value={text} onChange={e => setText(e.target.value)} required className="comment-textarea" rows={3} />
        <button type="submit" disabled={sending} className="comment-submit-btn">
          {sending ? (
            <span>Mengirim...</span>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px' }}>
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              Kirim Komentar
            </>
          )}
        </button>
      </form>

      {/* Comments List */}
      <div className="comment-list">
        {loading ? (
          <div className="comment-loading">Memuat komentar...</div>
        ) : comments.length === 0 ? (
          <div className="comment-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '36px', height: '36px', color: 'var(--sage)' }}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <p>Belum ada komentar. Jadilah yang pertama berkomentar!</p>
          </div>
        ) : (
          comments.map(c => (
            <div key={c.id} className="comment-item">
              <div className="comment-main">
                <Avatar name={c.name} />
                <div className="comment-content">
                  <div className="comment-meta">
                    <strong>{c.name}</strong>
                    <span className="comment-time">{timeAgo(c.created_at)}</span>
                  </div>
                  <p className="comment-body">{c.body}</p>
                  <button className="comment-reply-toggle" onClick={() => setReplyingTo(replyingTo === c.id ? null : c.id)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '13px', height: '13px' }}>
                      <polyline points="9 17 4 12 9 7" />
                      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
                    </svg>
                    Balas
                  </button>
                </div>
              </div>

              {/* Reply form */}
              {replyingTo === c.id && (
                <div className="comment-reply-area">
                  <ReplyForm commentId={c.id} onSubmitted={() => { setReplyingTo(null); loadComments(); }} />
                </div>
              )}

              {/* Replies */}
              {c.replies && c.replies.length > 0 && (
                <div className="comment-replies">
                  {c.replies.map(r => (
                    <div key={r.id} className="comment-item reply">
                      <div className="comment-main">
                        <Avatar name={r.name} />
                        <div className="comment-content">
                          <div className="comment-meta">
                            <strong>{r.name}</strong>
                            <span className="comment-time">{timeAgo(r.created_at)}</span>
                          </div>
                          <p className="comment-body">{r.body}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
