/**
 * Business Dashboard — pilotage de l'activité de l'entreprise cliente.
 *
 * Axe Dashboard Business (Cadrage Global §12.2) :
 * ventes, encaissements, créances, stock, alertes.
 *
 * Sprint 0 : données statiques de démonstration.
 * Cas de référence : boutique de téléphones et accessoires.
 */
const stats = [
  { label: "Ventes du jour",        value: "8",         sub: "185 000 F CFA" },
  { label: "Chiffre d'affaires",    value: "3 240 000 F", sub: "Ce mois" },
  { label: "Créances clients",      value: "420 000 F", sub: "4 clients" },
  { label: "Alertes stock",         value: "3",         sub: "Seuils bas atteints" },
];

const recentSales = [
  { id: 'V-0041', client: 'Mamadou Diallo',  product: 'iPhone 15',         amount: '650 000 F', status: 'paid' },
  { id: 'V-0042', client: 'Fatou Ndiaye',    product: 'Samsung A55',       amount: '280 000 F', status: 'partial' },
  { id: 'V-0043', client: 'Client comptoir', product: 'Coque + câble USB', amount: '8 500 F',  status: 'paid' },
  { id: 'V-0044', client: 'Ibrahima Sow',    product: 'Xiaomi 14T',        amount: '420 000 F', status: 'pending' },
];

const statusBadge: Record<string, string> = {
  paid: 'badge badge-green', partial: 'badge badge-yellow', pending: 'badge badge-blue',
};
const statusLabel: Record<string, string> = {
  paid: 'Payé', partial: 'Partiel', pending: 'En attente',
};

export default function BusinessDashboard() {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Vue d'ensemble de l'activité — Boutique Téléphones & Accessoires</p>
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
        <div className="table-card-header">Ventes récentes</div>
        <table>
          <thead>
            <tr>
              <th>N°</th>
              <th>Client</th>
              <th>Produit</th>
              <th>Montant</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {recentSales.map((s) => (
              <tr key={s.id}>
                <td style={{ fontFamily: 'monospace', fontSize: '.8rem', color: '#6b7280' }}>{s.id}</td>
                <td>{s.client}</td>
                <td>{s.product}</td>
                <td style={{ fontWeight: 500 }}>{s.amount}</td>
                <td><span className={statusBadge[s.status]}>{statusLabel[s.status]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
