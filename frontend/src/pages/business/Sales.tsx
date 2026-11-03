/**
 * Business Sales — historique des ventes.
 * Sprint 0 : données statiques de démonstration.
 */
const sales = [
  { id: 'V-0041', date: '01/11/2026', client: 'Mamadou Diallo',  items: 1, amount: '650 000 F', paid: '650 000 F', status: 'paid' },
  { id: 'V-0042', date: '01/11/2026', client: 'Fatou Ndiaye',    items: 1, amount: '280 000 F', paid: '150 000 F', status: 'partial' },
  { id: 'V-0043', date: '31/10/2026', client: 'Client comptoir', items: 2, amount: '8 500 F',   paid: '8 500 F',  status: 'paid' },
  { id: 'V-0044', date: '31/10/2026', client: 'Ibrahima Sow',    items: 1, amount: '420 000 F', paid: '0 F',      status: 'pending' },
  { id: 'V-0040', date: '30/10/2026', client: 'Aïssatou Ba',     items: 3, amount: '45 000 F',  paid: '45 000 F', status: 'paid' },
];

const statusBadge: Record<string, string> = {
  paid: 'badge badge-green', partial: 'badge badge-yellow', pending: 'badge badge-blue',
};
const statusLabel: Record<string, string> = {
  paid: 'Payé', partial: 'Partiel', pending: 'En attente',
};

export default function BusinessSales() {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Ventes</h1>
        <p>Historique des ventes de l'entreprise</p>
      </div>

      <div className="cards-grid">
        <div className="card">
          <div className="card-label">Total ce mois</div>
          <div className="card-value">3 240 000 F</div>
        </div>
        <div className="card">
          <div className="card-label">Encaissé</div>
          <div className="card-value">2 820 000 F</div>
        </div>
        <div className="card">
          <div className="card-label">Créances</div>
          <div className="card-value">420 000 F</div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-card-header">Liste des ventes</div>
        <table>
          <thead>
            <tr>
              <th>N°</th>
              <th>Date</th>
              <th>Client</th>
              <th>Articles</th>
              <th>Montant</th>
              <th>Payé</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((s) => (
              <tr key={s.id}>
                <td style={{ fontFamily: 'monospace', fontSize: '.8rem', color: '#6b7280' }}>{s.id}</td>
                <td>{s.date}</td>
                <td>{s.client}</td>
                <td style={{ textAlign: 'center' }}>{s.items}</td>
                <td style={{ fontWeight: 500 }}>{s.amount}</td>
                <td>{s.paid}</td>
                <td><span className={statusBadge[s.status]}>{statusLabel[s.status]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
