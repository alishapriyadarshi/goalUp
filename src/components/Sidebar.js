import React, { useState, useEffect, useRef } from 'react';

export default function Sidebar({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);

  // All hooks are unconditional; guard early for rendering
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
      if (open && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  if (!user) return null;

  const avatar = user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`;

  return (
    <>
      <button
        aria-label="Toggle menu"
        className="hamburger-button"
        onClick={() => setOpen(o => !o)}
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
      >
        <div className="profile-section">
          <img src={avatar} alt="User Avatar" className="avatar" />
          <h3 className="user-name">{user.displayName || 'Anonymous User'}</h3>
          <p className="user-email">{user.email || 'No email provided'}</p>
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item active" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>My Goals</span>
          </button>
          <button className="nav-item" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12.22 2h-4.44a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.88z" />
              <path d="M18 2v6h6" />
              <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
              <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
            </svg>
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-id-container">
            <p className="user-id-label">User ID</p>
            <p className="user-id">{user.uid}</p>
          </div>
          <button onClick={onLogout} className="nav-item logout-button" type="button">
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