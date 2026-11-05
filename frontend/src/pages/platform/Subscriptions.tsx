/**
 * Platform Subscriptions — gestion des abonnements.
 * Sprint 0 : données statiques de démonstration.
 */
const subscriptions = [
  { company: 'Boutique Alpha',  plan: 'Starter', amount: '25 000 F',  cycle: 'Mensuel', status: 'active',  renewal: '01/12/2026' },
  { company: 'Tech Dakar',      plan: 'Pro',     amount: '75 000 F',  cycle: 'Mensuel', status: 'active',  renewal: '15/11/2026' },
  { company: 'Diallo & Frères', plan: 'Starter', amount: '—',         cycle: '—',       status: 'trial',   renewal: '08/11/2026' },
  { company: 'MobiPlus',        plan: 'Pro',     amount: '75 000 F',  cycle: 'Mensuel', status: 'grace',   renewal: '01/11/2026' },
  { company: 'SénéTech',        plan: 'Starter', amount: '25 000 F',  cycle: 'Mensuel', status: 'suspended', renewal: '—' },
];

const statusBadge: Record<string, string> = {
  active: 'badge badge-green', trial: 'badge badge-blue',
  grace: 'badge badge-yellow', suspended: 'badge badge-red',
};
const statusLabel: Record<string, string> = {
  active: 'Actif', trial: 'Essai', grace: 'Grâce', suspended: 'Suspendu',
};

export default function PlatformSubscriptions() {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Abonnements</h1>
        <p>Suivi des abonnements et renouvellements — Platform Side</p>
      </div>

      <div className="cards-grid">
        <div className="card">
          <div className="card-label">Actifs</div>
          <div className="card-value">10</div>
        </div>
        <div className="card">
          <div className="card-label">En essai</div>
          <div className="card-value">4</div>
        </div>
        <div className="card">
          <div className="card-label">En période de grâce</div>
          <div className="card-value">2</div>
        </div>
        <div className="card">
          <div className="card-label">Suspendus</div>
          <div className="card-value">1</div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-card-header">Abonnements en cours</div>
        <table>
          <thead>
            <tr>
              <th>Entreprise</th>
              <th>Plan</th>
              <th>Montant</th>
              <th>Cycle</th>
              <th>Statut</th>
              <th>Renouvellement</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((s) => (
              <tr key={s.company}>
                <td style={{ fontWeight: 500 }}>{s.company}</td>
                <td>{s.plan}</td>
                <td>{s.amount}</td>
                <td>{s.cycle}</td>
                <td><span className={statusBadge[s.status]}>{statusLabel[s.status]}</span></td>
                <td>{s.renewal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
