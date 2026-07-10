"use client";

import { useEffect } from 'react';

export default function CustomModal({
  show,
  title,
  message,
  type = 'confirm', // 'confirm' | 'alert'
  onConfirm,
  onCancel,
  confirmText = 'Oke',
  cancelText = 'Batal',
  theme = 'teal' // 'teal' | 'danger'
}) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [show]);

  if (!show) return null;

  const isDanger = theme === 'danger';

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(10, 26, 21, 0.65)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '24px',
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      animation: 'fadeIn 0.25s ease-out forwards'
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalScale {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .modal-card {
          animation: modalScale 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}} />

      <div className="modal-card" style={{
        backgroundColor: '#ffffff',
        border: isDanger ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(173, 138, 78, 0.25)',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '440px',
        boxShadow: '0 20px 50px rgba(15, 43, 36, 0.15)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Decorative Top Accent line */}
        <div style={{
          height: '6px',
          background: isDanger 
            ? 'linear-gradient(90deg, #EF4444 0%, #FCA5A5 100%)' 
            : 'linear-gradient(90deg, var(--teal-900, #0F2B24) 0%, var(--gold-500, #AD8A4E) 100%)'
        }}></div>

        <div style={{ padding: '32px 28px 24px' }}>
          {/* Header Icon & Title */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '18px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: isDanger ? 'rgba(239, 68, 68, 0.1)' : 'rgba(173, 138, 78, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              flexShrink: 0
            }}>
              {isDanger ? '⚠️' : '❓'}
            </div>
            <div>
              <h3 style={{
                fontFamily: '"Fraunces", serif',
                fontSize: '20px',
                color: 'var(--teal-900, #0F2B24)',
                margin: '0 0 6px 0',
                fontWeight: '600'
              }}>
                {title}
              </h3>
              <p style={{
                margin: 0,
                fontSize: '14.5px',
                lineHeight: '1.6',
                color: 'rgba(15, 43, 36, 0.75)'
              }}>
                {message}
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end',
            marginTop: '28px',
            borderTop: '1px solid rgba(173, 138, 78, 0.1)',
            paddingTop: '20px'
          }}>
            {type === 'confirm' && (
              <button
                type="button"
                onClick={onCancel}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: '1px solid rgba(173, 138, 78, 0.25)',
                  background: 'transparent',
                  color: 'rgba(15, 43, 36, 0.7)',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(173, 138, 78, 0.05)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {cancelText}
              </button>
            )}
            <button
              type="button"
              onClick={onConfirm}
              style={{
                padding: '10px 24px',
                borderRadius: '10px',
                border: 'none',
                background: isDanger 
                  ? '#EF4444' 
                  : 'var(--teal-900, #0F2B24)',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: isDanger 
                  ? '0 4px 12px rgba(239, 68, 68, 0.2)' 
                  : '0 4px 12px rgba(15, 43, 36, 0.15)'
              }}
              onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.15)'}
              onMouseOut={(e) => e.currentTarget.style.filter = 'none'}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
