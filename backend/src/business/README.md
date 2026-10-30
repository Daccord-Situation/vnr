# business/

Modules du **Business Side** — gestion de l'activité de l'entreprise cliente.

Perspective : gère l'activité métier dans le tenant de l'entreprise cliente.
Modules MVP (A4) : Administration, CRM simplifié, Catalogue Produits,
Purchasing simplifié, Inventory, Sales, Finance simplifiée, Retours/remboursements
simplifiés, Dashboard, Journal d'activité.

Rôles concernés (A5) : Propriétaire/Dirigeant, Administrateur de l'entreprise,
Gérant/Responsable opérationnel, Vendeur/Caissier, Responsable de stock,
Responsable Finance.

Namespaces de permissions : `business.*` (131 permissions — A6 gelé).

Golden Path Business : Configurer → Utilisateurs → Produits → Acheter →
Stocker → Vendre → Encaisser → Piloter → Tracer.

> ⚠️ Toutes les données Business sont scoppées au tenant. Aucun droit ou
> workflow métier non validé ne doit être implémenté en Sprint 0.
