// // src/components/Sidebar.js

// import React from 'react';

// // The `isOpen` prop is removed.
// // The `onLogout` prop is added.
// export default function Sidebar({ user, onLogout }) {
//   // Fix: Add a guard clause t,lo prevent rendering if the user prop is not yet available.
//   // This prevents the "Cannot read properties of undefined" error on initial load.
//   if (!user) {
//     return null;
//   }

//   const avatar = user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`;

//   return (
//     // The className is now just "sidebar"
//     <div className="sidebar">
//       <div className="sidebar-content">
//         <img src={avatar} alt="User Avatar" className="avatar" />
//         <h3 className="user-name">{user.displayName || 'Anonymous User'}</h3>
//         <p className="user-email">{user.email}</p>
//         <p className="user-id">ID: {user.uid}</p>

//         <hr className="divider" />

//         <nav className="sidebar-nav">
//           <a href="#" className="nav-item">
//             ⚙️ Settings
//           </a>
//           {/* Add the Logout button here */}
//           <button onClick={onLogout} className="nav-item logout-button">
//             🚪 Logout
//           </button>
//         </nav>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';


export default function Sidebar({ user, onLogout }) {


 const [open, setOpen] = useState(false);




  // This guard clause prevents errors if the user object isn't loaded yet.
  if (!user) {
    return null;
  }

 


  const avatar = user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`;

  return (
     <div className="sidebar-toggle" onClick={() => setOpen(!open)}>
        ☰
      </div>,
    
    <div className={`sidebar ${open ? 'open' : ''}`}>
      
      {/* User Profile Section */}
      <div className="profile-section">
        <img src={avatar} alt="User Avatar" className="avatar" />
        <h3 className="user-name">{user.displayName || 'Anonymous User'}</h3>
        <p className="user-email">{user.email || 'No email provided'}</p>
      </div>

      {/* Navigation Section */}
      <nav className="sidebar-nav">
        <a href="#" className="nav-item active">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span>My Goals</span>
        </a>
        <a href="#" className="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-4.44a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.88z"></path><path d="M18 2v6h6"></path><path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path></svg>
          <span>Settings</span>
        </a>
      </nav>

      {/* Footer section for User ID and Logout */}
      <div className="sidebar-footer">
        <div className="user-id-container">
          <p className="user-id-label">User ID</p>
          <p className="user-id">{user.uid}</p>
        </div>
        <button onClick={onLogout} className="nav-item logout-button">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          <span>Logout</span>
        </button>
      </div>
    </div>
 



);
}
