/**
 * Platform Dashboard — vue d'ensemble de la plateforme VNR.
 *
 * Axe Dashboard Platform (Cadrage Global §12.1) :
 * entreprises, abonnements, revenus, utilisation, santé.
 *
 * Sprint 0 : données statiques de démonstration.
 */
const stats = [
  { label: 'Entreprises actives',  value: '12',  sub: '+2 ce mois' },
  { label: 'En période d\'essai',  value: '4',   sub: '3 expirent bientôt' },
  { label: 'Abonnements actifs',   value: '10',  sub: '2 en grâce' },
  { label: 'Revenus du mois',      value: '840 000 F', sub: 'CFA' },
];

const companies = [
  { name: 'Boutique Alpha',    plan: 'Starter', status: 'active',   since: '01/09/2026' },
  { name: 'Tech Dakar',        plan: 'Pro',     status: 'active',   since: '15/08/2026' },
  { name: 'Diallo & Frères',   plan: 'Starter', status: 'trial',    since: '25/10/2026' },
  { name: 'MobiPlus',          plan: 'Pro',     status: 'grace',    since: '01/07/2026' },
  { name: 'SénéTech',          plan: 'Starter', status: 'suspended',since: '10/06/2026' },
];

const statusBadge: Record<string, string> = {
  active:    'badge badge-green',
  trial:     'badge badge-blue',
  grace:     'badge badge-yellow',
  suspended: 'badge badge-red',
};

const statusLabel: Record<string, string> = {
  active: 'Actif', trial: 'Essai', grace: 'Grâce', suspended: 'Suspendu',
};

export default function PlatformDashboard() {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Dashboard Platform</h1>
        <p>Vue d'ensemble de la plateforme VNR — Daccord Situation</p>
      </div>

      <div className="cards-grid">
        {stats.map((s) => (
          <div className="card" key={s.label}>
            <div className="card-label">{s.label}</div>
            <div className="card-value">{s.value}</div>
            <div className="card-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="table-card">
        <div className="table-card-header">Entreprises clientes récentes</div>
        <table>
          <thead>
            <tr>
              <th>Entreprise</th>
              <th>Plan</th>
              <th>Statut</th>
              <th>Depuis</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((c) => (
              <tr key={c.name}>
                <td>{c.name}</td>
                <td>{c.plan}</td>
                <td>
                  <span className={statusBadge[c.status]}>
                    {statusLabel[c.status]}
                  </span>
                </td>
                <td>{c.since}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
