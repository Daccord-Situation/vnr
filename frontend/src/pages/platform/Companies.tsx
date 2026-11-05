/**
 * Platform Companies — gestion des entreprises clientes.
 * Sprint 0 : données statiques de démonstration.
 */
const companies = [
  { id: 'C001', name: 'Boutique Alpha',  plan: 'Starter', status: 'active',    users: 3,  created: '01/09/2026' },
  { id: 'C002', name: 'Tech Dakar',      plan: 'Pro',     status: 'active',    users: 8,  created: '15/08/2026' },
  { id: 'C003', name: 'Diallo & Frères', plan: 'Starter', status: 'trial',     users: 1,  created: '25/10/2026' },
  { id: 'C004', name: 'MobiPlus',        plan: 'Pro',     status: 'grace',     users: 5,  created: '01/07/2026' },
  { id: 'C005', name: 'SénéTech',        plan: 'Starter', status: 'suspended', users: 2,  created: '10/06/2026' },
  { id: 'C006', name: 'InfoShop',        plan: 'Starter', status: 'trial',     users: 1,  created: '28/10/2026' },
];

const statusBadge: Record<string, string> = {
  active: 'badge badge-green', trial: 'badge badge-blue',
  grace: 'badge badge-yellow', suspended: 'badge badge-red',
};
const statusLabel: Record<string, string> = {
  active: 'Actif', trial: 'Essai', grace: 'Grâce', suspended: 'Suspendu',
};

export default function PlatformCompanies() {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Entreprises clientes</h1>
        <p>Gestion du portefeuille d'entreprises clientes de VNR</p>
      </div>

      <div className="table-card">
        <div className="table-card-header">
          {companies.length} entreprises
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Entreprise</th>
              <th>Plan</th>
              <th>Statut</th>
              <th>Utilisateurs</th>
              <th>Créée le</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((c) => (
              <tr key={c.id}>
                <td style={{ fontFamily: 'monospace', fontSize: '.8rem', color: '#6b7280' }}>{c.id}</td>
                <td style={{ fontWeight: 500 }}>{c.name}</td>
                <td>{c.plan}</td>
                <td><span className={statusBadge[c.status]}>{statusLabel[c.status]}</span></td>
                <td>{c.users}</td>
                <td>{c.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
