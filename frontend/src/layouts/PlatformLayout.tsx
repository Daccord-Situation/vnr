import { Outlet, NavLink, useNavigate } from 'react-router-dom';

/**
 * PlatformLayout — shell visuel du Platform Side.
 *
 * Couleur identitaire : bleu foncé (#1a2f5e).
 * Rôles concernés (A5) : Super Admin VNR, Platform Admin,
 * Support Agent, Finance Platform, Customer Manager.
 *
 * Sprint 0 : layout de démonstration sans authentification réelle.
 */
export default function PlatformLayout() {
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      {/* Sidebar Platform */}
      <aside
        className="sidebar"
        style={{
          background: 'var(--color-platform-sidebar)',
          color: 'var(--color-platform-text)',
        }}
      >
        <div className="sidebar-logo">
          VNR
          <span className="sidebar-badge">Platform</span>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/platform/dashboard">
            📊 Dashboard
          </NavLink>
          <NavLink to="/platform/companies">
            🏢 Entreprises
          </NavLink>
          <NavLink to="/platform/subscriptions">
            💳 Abonnements
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,.5)',
              fontSize: '.75rem',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            ← Changer d'espace
          </button>
        </div>
      </aside>

      {/* Contenu principal */}
      <div className="main-content">
        <header
          className="topbar"
          style={{ borderLeft: '3px solid var(--color-platform-accent)' }}
        >
          <span style={{ color: 'var(--color-platform-accent)', fontWeight: 600 }}>
            🏢 Platform Side
          </span>
          <span className="topbar-title">
            Daccord Situation — Administration VNR
          </span>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
