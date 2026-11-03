/**
 * Business Stock — état du stock.
 * Sprint 0 : données statiques de démonstration.
 */
const products = [
  { ref: 'TEL-001', name: 'iPhone 15 128GB',       category: 'Téléphone', stock: 4,  threshold: 3,  price: '650 000 F' },
  { ref: 'TEL-002', name: 'Samsung Galaxy A55',    category: 'Téléphone', stock: 2,  threshold: 3,  price: '280 000 F' },
  { ref: 'TEL-003', name: 'Xiaomi 14T',            category: 'Téléphone', stock: 7,  threshold: 3,  price: '420 000 F' },
  { ref: 'ACC-001', name: 'Coque silicone iPhone', category: 'Accessoire',stock: 18, threshold: 5,  price: '3 500 F' },
  { ref: 'ACC-002', name: 'Câble USB-C 2m',        category: 'Accessoire',stock: 1,  threshold: 10, price: '5 000 F' },
  { ref: 'ACC-003', name: 'Chargeur rapide 45W',   category: 'Accessoire',stock: 0,  threshold: 5,  price: '12 000 F' },
  { ref: 'ACC-004', name: 'Écouteurs Bluetooth',   category: 'Accessoire',stock: 9,  threshold: 5,  price: '35 000 F' },
];

function stockBadge(stock: number, threshold: number) {
  if (stock === 0)             return <span className="badge badge-red">Rupture</span>;
  if (stock <= threshold)      return <span className="badge badge-yellow">Stock bas</span>;
  return <span className="badge badge-green">OK</span>;
}

export default function BusinessStock() {
  const alerts = products.filter((p) => p.stock <= p.threshold).length;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Stock</h1>
        <p>État du stock — Boutique Téléphones & Accessoires</p>
      </div>

      <div className="cards-grid">
        <div className="card">
          <div className="card-label">Références actives</div>
          <div className="card-value">{products.length}</div>
        </div>
        <div className="card">
          <div className="card-label">Alertes stock bas</div>
          <div className="card-value" style={{ color: alerts > 0 ? '#b45309' : 'inherit' }}>
            {alerts}
          </div>
          <div className="card-sub">seuil bas ou rupture</div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-card-header">Catalogue & niveaux de stock</div>
        <table>
          <thead>
            <tr>
              <th>Réf.</th>
              <th>Produit</th>
              <th>Catégorie</th>
              <th>Stock dispo</th>
              <th>Seuil alerte</th>
              <th>Prix vente</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.ref}>
                <td style={{ fontFamily: 'monospace', fontSize: '.8rem', color: '#6b7280' }}>{p.ref}</td>
                <td style={{ fontWeight: 500 }}>{p.name}</td>
                <td>{p.category}</td>
                <td style={{ textAlign: 'center', fontWeight: p.stock <= p.threshold ? 700 : 400 }}>
                  {p.stock}
                </td>
                <td style={{ textAlign: 'center', color: '#6b7280' }}>{p.threshold}</td>
                <td>{p.price}</td>
                <td>{stockBadge(p.stock, p.threshold)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
