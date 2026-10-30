# platform/

Modules du **Platform Side** — exploitation de VNR par Daccord Situation.

Perspective : administre VNR comme plateforme SaaS. Gère les entreprises
clientes, les plans, les abonnements, les paiements Platform, le support,
les utilisateurs internes et les paramètres globaux.

Rôles concernés (A5) : Super Admin VNR, Platform Admin, Support Agent,
Finance Platform, Customer Manager / Commercial.

Namespaces de permissions : `platform.*` (79 permissions — A6 gelé).

> ⚠️ Aucun rôle Platform ne donne implicitement accès aux données métier
> d'un tenant. Aucune implémentation métier non validée en Sprint 0.
