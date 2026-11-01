# VNR — Backend

Backend de la plateforme SaaS VNR.

**Sprint 0 — Incrément I1 : Socle SaaS sécurisé**

Stack technique : **Node.js · TypeScript · Express 4 · PostgreSQL · Prisma 6 · Jest · Supertest**

---

## 1. Présentation

Le backend constitue le socle technique de la plateforme SaaS VNR.

VNR repose sur deux perspectives fonctionnelles :

- **Platform Side :** exploitation de la plateforme SaaS par Daccord Situation.
- **Business Side :** gestion de l'activité des entreprises clientes (tenants).

Le backend est responsable de la gestion des données, de leur intégrité et des décisions d'autorisation.

L'architecture est conçue pour évoluer progressivement avec les incréments fonctionnels du projet.

---

## 2. Prérequis

Environnement nécessaire :

- Node.js 20 ou supérieur.
- npm.
- PostgreSQL.
- Git.

---

## 3. Stack technique

| Composant | Technologie |
|---|---|
| Runtime | Node.js 20+ |
| Langage | TypeScript |
| Framework HTTP | Express 4 |
| Base de données | PostgreSQL |
| ORM | Prisma 6 |
| Tests | Jest |
| Tests HTTP | Supertest |

---

## 4. Installation

Depuis la racine du dépôt :

```bash
cd backend
```

Installer les dépendances :

```bash
npm ci
```

Configurer les variables d'environnement :

```bash
cp .env.example .env
```

Générer le client Prisma :

```bash
npx prisma generate
```

Configurer ensuite la connexion PostgreSQL dans le fichier `.env`.

---

## 5. Configuration de l'environnement

Le fichier `.env.example` contient le modèle de configuration :

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://vnr_user:vnr_password@localhost:5432/vnr_dev?schema=public
```

| Variable | Description |
|---|---|
| `NODE_ENV` | Environnement d'exécution |
| `PORT` | Port d'écoute du serveur |
| `DATABASE_URL` | URL de connexion à PostgreSQL |

**Sécurité :** le fichier `.env` contient les informations confidentielles de connexion. Il ne doit jamais être versionné sur GitHub.

---

## 6. Base de données et migrations Prisma

Le backend utilise PostgreSQL avec Prisma comme ORM.

### Première installation

Après avoir configuré PostgreSQL et `DATABASE_URL`, appliquer les migrations versionnées :

```bash
npx prisma migrate deploy
```

Puis générer le client Prisma :

```bash
npx prisma generate
```

### Gestion des migrations

| Commande | Fonction |
|---|---|
| `npx prisma migrate dev --name nom_migration` | Créer une nouvelle migration en développement |
| `npx prisma migrate deploy` | Appliquer les migrations existantes |
| `npx prisma migrate status` | Vérifier l'état des migrations |
| `npx prisma generate` | Générer le client Prisma |

**Convention :**

- `migrate dev` est réservé au développement et à la création de nouvelles migrations.
- `migrate deploy` applique les migrations déjà versionnées, notamment dans les environnements de déploiement.
- Les fichiers de migration doivent être conservés et versionnés dans Git.

### Schéma initial — Sprint 0

Le schéma initial comprend deux entités principales :

**Tenant**
- Identifiant unique.
- Nom de l'entreprise.
- Statut du tenant.
- Dates de création et de mise à jour.

**User**
- Identifiant unique.
- Adresse e-mail unique.
- Nom complet.
- Domaine utilisateur (`PLATFORM` ou `BUSINESS`).
- Statut utilisateur.
- Relation facultative avec un tenant.

Les énumérations initiales sont :

- `TenantStatus`
- `UserDomain`
- `UserStatus`

Cette structure constitue la fondation initiale du modèle multi-tenant.

---

## 7. Démarrage du serveur

### Mode développement

```bash
npm run dev
```

Le serveur est accessible par défaut à :

```text
http://localhost:3000
```

### Compilation TypeScript

```bash
npm run build
```

### Mode production

Après compilation :

```bash
npm start
```

---

## 8. Routes disponibles

| Méthode | Route | Description |
|---|---|---|
| GET | `/` | Informations générales du service |
| GET | `/health` | Vérification de l'état du backend et de PostgreSQL |

### Vérification de santé

```bash
curl http://localhost:3000/health
```

Lorsque PostgreSQL est accessible, la route retourne HTTP 200 :

```json
{
  "status": "ok",
  "service": "vnr-backend",
  "timestamp": "2026-11-01T12:00:00.000Z",
  "uptime": 30,
  "database": {
    "connected": true
  }
}
```

Lorsque PostgreSQL est inaccessible, la route retourne HTTP 503 avec le statut `degraded`.

Cette vérification permet de distinguer un backend opérationnel d'un backend dont la base de données est indisponible.

---

## 9. Tests automatisés

Les tests utilisent Jest et Supertest.

Exécuter les tests :

```bash
npm test
```

Exécuter les tests avec couverture :

```bash
npm run test:cov
```

### Tests du Sprint 0

Les cinq tests initiaux couvrent :

1. HTTP 200 lorsque PostgreSQL est accessible.
2. HTTP 503 lorsque PostgreSQL est inaccessible.
3. Validité du timestamp ISO 8601.
4. Fonctionnement de la route principale `/`.
5. Retour HTTP 404 pour une route inexistante.

La connexion à la base de données est mockée dans les tests de santé afin de rendre les tests indépendants d'une base PostgreSQL réelle.

**Résultat validé localement :**

```text
Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
```

---

## 10. Structure du backend

```text
backend/
├── src/
│   ├── index.ts
│   ├── app.ts
│   ├── routes/
│   │   ├── health.ts
│   │   └── health.test.ts
│   └── lib/
│       └── db.ts
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│       ├── migration_lock.toml
│       └── 20261101112731_init/
│           └── migration.sql
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
└── tsconfig.test.json
```

---

## 11. Scripts disponibles

| Commande | Fonction |
|---|---|
| `npm run dev` | Démarrage en développement |
| `npm run build` | Compilation TypeScript |
| `npm start` | Démarrage en production |
| `npm test` | Exécution des tests |
| `npm run test:cov` | Tests avec couverture |

---

## 12. Conventions de développement et sécurité

- Utiliser TypeScript en mode strict.
- Ne jamais versionner les secrets ou le fichier `.env`.
- Conserver `.env.example` comme modèle de configuration.
- Versionner les migrations Prisma.
- Écrire des tests pour les nouvelles fonctionnalités.
- Préserver l'intégrité des données.
- Respecter l'isolation des données entre tenants.
- Toute décision technique structurante doit être remontée à VNR – Responsable.

---

## 13. Périmètre Sprint 0

Le Sprint 0 établit la fondation technique du backend :

- Initialisation de l'application Express avec TypeScript.
- Configuration de PostgreSQL.
- Intégration de Prisma.
- Mise en place du schéma initial Tenant/User.
- Création et validation des migrations Prisma.
- Mise en place de la route de santé `/health`.
- Configuration des tests Jest et Supertest.
- Compilation TypeScript et vérification du fonctionnement du serveur.

Ce socle constitue la base technique des prochains incréments fonctionnels de VNR.

---

**Projet :** VNR  
**Organisation :** Daccord Situation  
**Incrément :** I1 — Socle SaaS sécurisé  
**Périmètre :** Sprint 0