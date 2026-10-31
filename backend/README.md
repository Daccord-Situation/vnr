# VNR — Backend

Backend de la plateforme SaaS VNR.
**Sprint 0 — Incrément I1 : socle SaaS sécurisé.**
Développeur : **Taphsir Abdoulaye**

Stack validée : **Node.js · TypeScript · Express · PostgreSQL · Prisma**

---

## Prérequis

- Node.js v20+
- npm v10+
- PostgreSQL 17 (en cours d'exécution)
- Git

---

## Installation

```bash
# 1. Cloner le dépôt
git clone git@github.com:Daccord-Situation/vnr.git
cd vnr/backend

# 2. Installer les dépendances
npm install

# 3. Générer le client Prisma
npx prisma generate

# 4. Configurer l'environnement
cp .env.example .env
# Éditer .env avec les valeurs réelles (voir section Configuration)
```

---

## Configuration

Copier `.env.example` en `.env` et renseigner les variables :

| Variable | Description | Exemple |
|---|---|---|
| `NODE_ENV` | Environnement d'exécution | `development` |
| `PORT` | Port d'écoute du serveur | `3000` |
| `DATABASE_URL` | URL de connexion PostgreSQL | `postgresql://user:password@localhost:5432/vnr_dev?schema=public` |

> ⚠️ Ne jamais committer `.env` — il est dans `.gitignore`.

### Créer la base de données PostgreSQL

```sql
-- Dans psql en tant que superuser
CREATE USER vnr_user WITH PASSWORD 'vnr_password';
CREATE DATABASE vnr_dev OWNER vnr_user;
GRANT ALL PRIVILEGES ON DATABASE vnr_dev TO vnr_user;
```

### Appliquer les migrations Prisma

```bash
npx prisma migrate dev --name init
```

---

## Démarrage

```bash
# Mode développement (hot reload)
npm run dev
# → http://localhost:3000

# Mode production
npm run build
npm start
```

---

## Routes disponibles

| Méthode | Route | Description |
|---|---|---|
| GET | `/` | Informations du service |
| GET | `/health` | État de santé + connexion base de données |

### Exemple — GET /health (base connectée)

```bash
curl http://localhost:3000/health
```

```json
{
  "status": "ok",
  "service": "vnr-backend",
  "timestamp": "2026-10-22T10:00:00.000Z",
  "uptime": 5,
  "database": { "connected": true }
}
```

### Exemple — GET /health (base non joignable)

```json
{
  "status": "degraded",
  "service": "vnr-backend",
  "timestamp": "2026-10-22T10:00:00.000Z",
  "uptime": 1,
  "database": { "connected": false, "error": "..." }
}
```

---

## Tests

```bash
# Exécuter les tests
npm test

# Avec couverture
npm run test:cov
```

Résultat attendu :

```
PASS  src/routes/health.test.ts
  GET /health
    ✓ retourne HTTP 200 et { status: "ok" } quand la base est connectée
    ✓ retourne HTTP 503 et status "degraded" quand la base est inaccessible
    ✓ retourne un timestamp ISO 8601 valide
  GET /
    ✓ retourne les informations de service
  Route inconnue
    ✓ retourne HTTP 404 pour une route inexistante

Tests: 5 passed, 5 total
```

---

## Structure du projet

```
backend/
├── src/
│   ├── index.ts          ← point d'entrée (démarrage serveur)
│   ├── app.ts             ← configuration Express (routes, middlewares)
│   ├── routes/
│   │   ├── health.ts      ← GET /health
│   │   └── health.test.ts ← tests automatisés
│   └── lib/
│       └── db.ts          ← client Prisma + vérification connexion DB
├── prisma/
│   └── schema.prisma      ← schéma PostgreSQL (fondation multi-tenant)
├── .env.example            ← variables d'environnement (modèle sans secret)
├── .gitignore
├── tsconfig.json           ← TypeScript strict
├── package.json
└── README.md
```

---

## Base de données — schéma initial (Sprint 0)

La fondation multi-tenant comprend :
- **Tenant** : entreprise cliente (cycle de vie : TRIAL → ACTIVE → SUSPENDED…)
- **User** : utilisateur Platform (Daccord Situation) ou Business (entreprise cliente)

Le schéma sera enrichi lors des incréments suivants (Phase B).

---

## Conventions Git

- Aucun secret dans Git (`.env` ignoré).
- Commits descriptifs et atomiques.
- Revue croisée avec Atou Diagne avant fusion.
- Tout blocage technique → remonter immédiatement au VNR – Responsable.
