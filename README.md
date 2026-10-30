# VNR

Plateforme SaaS de gestion et de pilotage d'entreprise.
Développée par **Daccord Situation**.

---

## Contexte

VNR permet aux dirigeants de TPE/PME de voir, suivre, comprendre, contrôler
et optimiser leur activité — même à distance.

```
Voir → Suivre → Comprendre → Contrôler → Décider → Optimiser
```

Deux perspectives strictement séparées :

| Perspective | Utilisateur | Rôle |
|---|---|---|
| **Platform Side** | Daccord Situation | Exploite VNR comme plateforme SaaS (entreprises, plans, abonnements, support) |
| **Business Side** | Entreprise cliente (tenant) | Gère son activité (ventes, stock, finance, pilotage) |

> VNR est une plateforme **multi-tenant**. Chaque entreprise cliente est un
> tenant isolé. Le backend est l'**autorité finale** pour toutes les décisions
> d'autorisation.

---

## Structure du dépôt

```
vnr/
├── README.md          ← ce fichier
├── .gitignore          ← règles communes (secrets, builds, OS)
├── .editorconfig       ← formatage harmonisé frontend/backend
│
├── backend/            ← Taphsir Abdoulaye
│   ├── src/
│   │   ├── health/     → GET /health
│   │   ├── common/     → guards, audit, contexte tenant
│   │   ├── platform/   → modules Platform Side
│   │   └── business/   → modules Business Side
│   ├── prisma/         → schéma de base de données (PostgreSQL)
│   ├── .env.example    → variables d'environnement (modèle sans secret)
│   └── README.md       → documentation backend
│
└── frontend/           ← Atou Diagne (à initialiser)
    └── README.md
```

---

## Démarrage rapide

### Backend

```bash
cd backend
npm install
cp .env.example .env   # puis adapter les valeurs
npm run start:dev      # API sur http://localhost:3000
curl http://localhost:3000/health
npm test
```

### Frontend

```bash
cd frontend
# voir frontend/README.md
```

---

## Stack technique

| Composant | Choix |
|---|---|
| Backend | NestJS 10 · TypeScript strict · Node.js 20 |
| Base de données | PostgreSQL |
| ORM | Prisma |
| Tests backend | Jest |
| Frontend | À définir — Atou Diagne |

> Les choix de stack ont été soumis et validés par VNR – Responsable
> conformément au mandat Sprint 0.

---

## Conventions Git

- **Aucun secret dans Git** — `.env` est ignoré ; seul `.env.example` est versionné.
- Pas de données réelles dans le dépôt.
- Messages de commit clairs et descriptifs.
- Revue croisée obligatoire entre les deux développeurs avant fusion.
- Tout blocage ou décision technique structurante → remonter immédiatement à VNR – Responsable.

---

## Équipe

| Rôle | Développeur |
|---|---|
| Backend | Taphsir Abdoulaye |
| Frontend | Atou Diagne |
| Responsable produit / validation | VNR – Responsable |

---

## Références projet (Phase A — clôturée)

| Document | Objet |
|---|---|
| Vision & Objectifs | Raison d'être, mission, principes produit |
| Cadrage Global MVP | Multi-tenant, Golden Paths Platform & Business |
| Cadrage Platform Side | Périmètre fonctionnel Platform |
| Cadrage Business Side | Périmètre fonctionnel Business |
| Rôles & Profils (A5) | 11 profils, principes RBAC |
| Matrice Rôles × Permissions (A6) | 79 permissions Platform + 131 Business — gel définitif |
| Pack développeurs A6 | Guide d'implémentation de la chaîne d'autorisation |
| Mandat Sprint 0 | Consignes, preuves attendues, calendrier |

---

*Incrément I1 — Socle SaaS sécurisé · Sprint 0*
