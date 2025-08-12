import React, { useState, useEffect, useRef } from 'react';

export default function Sidebar({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (!open) return;
      if (sidebarRef.current && sidebarRef.current.contains(e.target)) return;
      if (e.target.closest && e.target.closest('.hamburger-button')) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  if (!user) return null;

  const displayName = user.displayName || 'Anonymous User';
  const email = user.email || 'No email provided';

  return (
    <>
      <button
        aria-label="Toggle menu"
        aria-expanded={open}
        className="hamburger-button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        style={{ position: 'fixed', top: 10, left: 10, zIndex: 2000 }}
      >
        ☰
      </button>

      <div
        className={`sidebar-backdrop ${open ? 'visible' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <div
        ref={sidebarRef}
        className={`sidebar ${open ? 'open' : ''}`}
        aria-hidden={!open}
        onClick={(e) => e.stopPropagation()}
        style={{ paddingTop: '60px' }}
      >
        {/* Logo + divider */}
        <div className="sidebar-logo" style={{ marginBottom: '8px' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--accent)' }}>GoalUp</h1>
        </div>
        <div
          style={{
            height: '1px',
            background: 'rgba(255,255,255,0.08)',
            marginBottom: '20px',
          }}
        />

        {/* Navigation */}
        <nav className="sidebar-nav">
          <button
            className="nav-item active"
            type="button"
            onClick={() => {
              setOpen(false); // close sidebar when "My Goals" is tapped
            }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span style={{ marginLeft: '8px' }}>My Goals</span>
          </button>
        </nav>

        <div style={{ flexGrow: 1 }} />

        {/* Profile + Logout */}
        <div className="sidebar-footer">
        <div className="profile-section side-profile">
  <h3 className="user-name">{displayName}</h3>
  <p className="user-email">{email}</p>
</div>
 <div className="divider" />

          <button
            onClick={onLogout}
            className="nav-item logout-button"
            type="button"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              justifyContent: 'flex-start',
              padding: '12px 15px',
              borderRadius: '8px',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}