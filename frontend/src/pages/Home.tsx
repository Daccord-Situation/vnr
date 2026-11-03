import { useNavigate } from 'react-router-dom';

/**
 * Home — page de sélection de l'espace.
 *
 * Permet de choisir entre Platform Side et Business Side.
 * Sprint 0 : pas d'authentification réelle — navigation directe.
 */
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home-logo">
        <h1>VNR</h1>
        <p>Plateforme de gestion et de pilotage d'entreprise</p>
      </div>

      <p className="home-tagline">
        Voir · Suivre · Comprendre · Contrôler · Décider · Optimiser
      </p>

      <div className="home-spaces">
        {/* Platform Side */}
        <div className="space-card">
          <div className="space-card-icon">🏢</div>
          <h2>Platform Side</h2>
          <p>
            Espace d'administration de la plateforme VNR.<br />
            Réservé à Daccord Situation : gestion des entreprises clientes,
            plans, abonnements et supervision.
          </p>
          <button
            className="space-card-btn btn-platform"
            onClick={() => navigate('/platform')}
          >
            Accéder →
          </button>
        </div>

        {/* Business Side */}
        <div className="space-card">
          <div className="space-card-icon">🏪</div>
          <h2>Business Side</h2>
          <p>
            Espace de gestion de l'entreprise cliente.<br />
            Ventes, stock, finances et pilotage de l'activité
            depuis un tableau de bord.
          </p>
          <button
            className="space-card-btn btn-business"
            onClick={() => navigate('/business')}
          >
            Accéder →
          </button>
        </div>
      </div>
    </div>
  );
}
