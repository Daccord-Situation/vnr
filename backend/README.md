# VNR — Backend

Socle backend de la plateforme SaaS VNR (Daccord Situation).
**Sprint 0 — Incrément I1 : socle SaaS sécurisé.**
Développeur backend : **Taphsir Abdoulaye**.

---

## Contexte

VNR est une plateforme SaaS multi-tenant de gestion et de pilotage d'entreprise.
Le backend est **l'autorité finale** pour toutes les décisions d'autorisation
(Phase A6 — gel définitif). L'interface ne constitue jamais un contrôle de sécurité.

Deux perspectives strictement séparées :

| Perspective | Utilisateur | Rôle |
|---|---|---|
| **Platform Side** | Daccord Situation | Exploite VNR (entreprises, plans, abonnements, support) |
| **Business Side** | Entreprise cliente | Gère son activité (ventes, stock, finance…) |

> ⚠️ Sprint 0 : aucun droit, workflow métier ou fonctionnalité non validée
> n'est implémenté. Le périmètre se limite au socle exécutable + `/health`.

---

## Stack technique (proposition à valider par VNR – Responsable)

| Composant | Choix | Motivation |
|---|---|---|
| Framework | **NestJS 10** (Node.js + TypeScript) | Architecture modulaire (DI), guards/interceptors pour la chaîne d'autorisation A6, Jest intégré |
| Base de données | **PostgreSQL** | Relationnel robuste, Row-Level Security pour l'isolation tenant |
| ORM | **Prisma** | Type-safe, migrations basées sur schéma, patterns multi-tenant |
| Tests | **Jest** | Tests unitaires et tests négatifs d'autorisation (exigés par le pack A6) |

> Le Node.js 20.17 ne supporte pas NestJS 11 (Node ≥ 22 requis). NestJS 10
> est donc retenu : stable et compatible.

---

## Pré-requis

- **Node.js** v20.x
- **npm** v10+
- **Git**
- **PostgreSQL** (pour la suite ; non requis pour le socle Sprint 0)

---

## Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Copier le modèle d'environnement
cp .env.example .env
#   (Windows PowerShell : Copy-Item .env.example .env)
```

---

## Lancement en local

### Mode développement (hot reload)

```bash
npm run start:dev
```

Le serveur démarre sur `http://localhost:3000` (ou le port défini dans `.env`).

### Mode production

```bash
npm run build
npm run start:prod
```

---

## Route de santé

```bash
# Vérifier que l'API est en ligne
curl http://localhost:3000/health
```

Réponse attendue :

```json
{
  "status": "ok",
  "service": "vnr-backend",
  "timestamp": "2026-10-21T08:30:00.000Z",
  "uptime": 12,
  "environment": "development",
  "version": "0.0.1"
}
```

Racine de l'API :

```bash
curl http://localhost:3000/
```

```json
{
  "name": "VNR Backend",
  "version": "0.0.1",
  "status": "running"
}
```

---

## Tests

### Tests unitaires

```bash
npm test
```

Exécute Jest (`*.spec.ts`). Preuve Sprint 0 : `HealthController` vérifie que
`GET /health` retourne le statut "ok".

### Tests de bout en bout

```bash
npm run test:e2e
```

### Couverture

```bash
npm run test:cov
```

---

## Base de données (proposition Sprint 0)

La configuration de la base est une **proposition** à valider par VNR – Responsable.
Le schéma Prisma initialise la fondation multi-tenant (Tenant, User).

### Commandes Prisma

```bash
# Générer le client Prisma
npx prisma generate

# Créer et appliquer une migration (base démarrée)
npx prisma migrate dev --name init

# Visualiser les données
npx prisma studio

# Formater le schéma
npx prisma format
```

> En Sprint 0, aucune base n'est requise pour le socle. Le schéma est fourni
> comme proposition de configuration.

---

## Structure du projet

```
backend/
├── src/
│   ├── main.ts                 # Point d'entrée (Nest bootstrap)
│   ├── app.module.ts            # Module racine
│   ├── app.controller.ts        # GET / — infos service
│   ├── app.service.ts
│   ├── health/                  # Module /health
│   │   ├── health.module.ts
│   │   ├── health.controller.ts # GET /health
│   │   └── health.service.ts
│   ├── common/                  # Code transversal (guards, audit, contexte tenant)
│   ├── platform/                # Modules Platform Side (Daccord Situation)
│   └── business/                # Modules Business Side (entreprise cliente)
├── prisma/
│   └── schema.prisma            # Fondation multi-tenant (proposition)
├── test/
│   └── app.e2e-spec.ts          # Tests e2e
├── .env.example                 # Modèle de variables d'environnement (sans secret)
├── .gitignore
├── nest-cli.json
├── tsconfig.json                # TypeScript strict activé
└── package.json
```

Les dossiers `common/`, `platform/` et `business/` préfigurent la séparation
des deux perspectives. Ils seront remplis au fil des incréments.

---

## Conventions Git

- **Aucun secret dans Git** : `.env` est ignoré, seul `.env.example` est versionné.
- Pas de données réelles dans le dépôt.
- Messages de commit clairs et descriptifs.
- Revue croisée entre développeurs avant fusion.
- Signaler immédiatement tout blocage ou décision technique à valider.

---

## Variables d'environnement

Voir [`.env.example`](.env.example) pour la liste complète et documentée.

| Variable | Description | Défaut |
|---|---|---|
| `NODE_ENV` | Environnement (development / production / test) | development |
| `PORT` | Port d'écoute du serveur | 3000 |
| `DATABASE_URL` | URL de connexion PostgreSQL (Prisma) | — |

---

## Preuves Sprint 0 (échéance 22/10)

| Preuve attendue | Statut |
|---|---|
| API lancée localement | ✅ `npm run start:dev` |
| `/health` fonctionnel | ✅ `GET /health` |
| Commandes documentées | ✅ Ce README |
| Test basique exécuté | ✅ `npm test` |

---

## Prochaines étapes (lots suivants)

- Connexion base de données effective (PostgreSQL + Prisma).
- Intégration frontend / API (en binôme avec Atou Diagne).
- CI simple et premiers tests d'intégration.
- Guards d'autorisation selon la chaîne A6 (Phase B).

---

## Références projet

- **A5** — Rôles & Profils utilisateurs du MVP (11 profils, principes RBAC).
- **A6** — Matrice Rôles × Permissions (79 Platform + 131 Business, gel définitif).
- **A6 Pack développeurs** — guide d'implémentation de la chaîne d'autorisation.
- **Cadrage Global / Platform Side / Business Side** — périmètre MVP.
- **Mandat Sprint 0** — consignes et preuves attendues.
