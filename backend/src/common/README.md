# common/

Code partagé transversal aux deux perspectives Platform Side et Business Side.

Contiendra notamment (hors périmètre Sprint 0 validé) :

- **Tenant context** — résolution du tenant actif et de la branche courante
  (Data Scope : SELF / CURRENT_BRANCH / ASSIGNED_BRANCHES / ALL_BRANCHES).
- **Guards d'autorisation** — chaîne d'autorisation serveur (A6) :
  Identity → Context/Tenant → Invariants → Data Scope → RBAC/ALLOW →
  Protection/Délégation → Support → SoD → État de ressource → Autorisation finale.
  Un DENY est terminal.
- **Audit** — socle d'audit (actor, target, tenant/branch, before/after,
  reason, result, timestamp serveur, correlation_id).
- **Validation** — pipes de validation serveur.

> ⚠️ Aucun droit ou workflow métier non validé ne doit être implémenté en Sprint 0.
