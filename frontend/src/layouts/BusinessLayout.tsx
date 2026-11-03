import { Outlet, NavLink, useNavigate } from 'react-router-dom';

/**
 * BusinessLayout — shell visuel du Business Side.
 *
 * Couleur identitaire : vert émeraude (#065f46).
 * Rôles concernés (A5) : Propriétaire/Dirigeant, Administrateur,
 * Gérant, Vendeur/Caissier, Responsable Stock, Responsable Finance.
 *
 * Sprint 0 : layout de démonstration sans authentification réelle.
 */
export default function BusinessLayout() {
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      {/* Sidebar Business */}
      <aside
        className="sidebar"
        style={{
          background: 'var(--color-business-sidebar)',
          color: 'var(--color-business-text)',
        }}
      >
        <div className="sidebar-logo">
          VNR
          <span className="sidebar-badge">Business</span>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/business/dashboard">
            📊 Dashboard
          </NavLink>
          <NavLink to="/business/sales">
            🛒 Ventes
          </NavLink>
          <NavLink to="/business/stock">
            📦 Stock
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
          style={{ borderLeft: '3px solid var(--color-business-accent)' }}
        >
          <span style={{ color: 'var(--color-business-accent)', fontWeight: 600 }}>
            🏪 Business Side
          </span>
          <span className="topbar-title">
            Boutique Téléphones & Accessoires — Démo Sprint 0
          </span>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
