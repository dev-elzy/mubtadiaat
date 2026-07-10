"use client";

import { useState, useEffect } from 'react';

export default function ViewCounter({ type, contentId }) {
  const [count, setCount] = useState(null);

  useEffect(() => {
    if (!type || !contentId) return;
    
    // Fire POST to increment view
    fetch('/api/views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, contentId })
    })
      .then(res => res.json())
      .then(data => setCount(data.count || 0))
      .catch(() => {
        // Fallback: try GET
        fetch(`/api/views?type=${type}&id=${contentId}`)
          .then(r => r.json())
          .then(d => setCount(d.count || 0))
          .catch(() => setCount(0));
      });
  }, [type, contentId]);

  if (count === null) {
    return (
      <span className="view-badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span>—</span>
      </span>
    );
  }

  return (
    <span className="view-badge">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <span>{count.toLocaleString('id-ID')} dilihat</span>
    </span>
  );
}
