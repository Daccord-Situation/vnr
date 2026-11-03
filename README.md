# VNR

**Plateforme SaaS de gestion et de pilotage d'entreprise**

Développée par **Daccord Situation**.

---

## 1. Présentation du projet

VNR est une plateforme SaaS destinée aux TPE et PME. Elle vise à permettre aux dirigeants de voir, suivre, comprendre, contrôler et optimiser leur activité, y compris à distance.

```text
Voir → Suivre → Comprendre → Contrôler → Décider → Optimiser
```

### Deux perspectives fonctionnelles

VNR repose sur deux perspectives strictement séparées :

| Perspective | Utilisateur | Responsabilité |
|---|---|---|
| Platform Side | Daccord Situation | Exploitation de la plateforme SaaS : entreprises clientes, plans, abonnements et support. |
| Business Side | Entreprise cliente (tenant) | Gestion de l'activité : ventes, stocks, ressources humaines, achats et finances. |

VNR est une plateforme multi-tenant. Chaque entreprise cliente constitue un tenant dont les données et les accès doivent être isolés.

Le backend constitue l'autorité finale pour les décisions d'autorisation.

---

## 2. Structure du dépôt

Le dépôt est organisé comme un monorepo :

```text
vnr/
├── README.md
├── .gitignore
├── .editorconfig
│
├── backend/
│   ├── src/
│   │   ├── index.ts
│   │   ├── app.ts
│   │   ├── routes/
│   │   │   ├── health.ts
│   │   │   └── health.test.ts
│   │   └── lib/
│   │       └── db.ts
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   │
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   └── README.md
│
└── frontend/
    └── README.md
```

**État des composants :**
- Backend : socle technique initial Express, TypeScript, Prisma et PostgreSQL.
- Frontend : React 18 · TypeScript · Vite 5 · React Router. Deux espaces (Platform Side / Business Side), layouts distincts, écrans de démonstration.

L'arborescence du backend évoluera avec les prochains incréments fonctionnels.

---

## 3. Stack technique

### Backend

| Composant | Technologie |
|---|---|
| Runtime | Node.js 20+ |
| Langage | TypeScript |
| Framework HTTP | Express.js 4 |
| Base de données | PostgreSQL |
| ORM | Prisma 6 |
| Tests | Jest |
| Tests HTTP | Supertest |

### Frontend

| Composant | Choix |
|---|---|
| Framework | React 18 |
| Langage | TypeScript (strict) |
| Bundler | Vite 5 |
| Routing | React Router DOM v6 |

Stack validée par VNR – Responsable. Deux espaces distincts : Platform Side (`/platform`) et Business Side (`/business`).

---

## 4. Prérequis

Pour travailler sur le backend, prévoir :

- Node.js 20 ou supérieur.
- npm 10 ou supérieur.
- PostgreSQL 17.
- Git.

---

## 5. Installation du backend

Depuis la racine du dépôt :

### 5.1. Accéder au backend

```bash
cd backend
```

### 5.2. Installer les dépendances

```bash
npm ci
```

### 5.3. Configurer les variables d'environnement

Copier le modèle :

```bash
cp .env.example .env
```

Renseigner les valeurs correspondant à l'environnement local.

Variables principales :

| Variable | Description | Exemple |
|---|---|---|
| NODE_ENV | Environnement d'exécution | development |
| PORT | Port du serveur | 3000 |
| DATABASE_URL | Connexion PostgreSQL | postgresql://user:password@localhost:5432/vnr_dev?schema=public |

Ne jamais publier le fichier `.env` ni ses secrets.

### 5.4. Appliquer les migrations

Pour construire la structure de la base à partir des migrations versionnées :

```bash
npx prisma migrate deploy
```

### 5.5. Générer Prisma Client

```bash
npx prisma generate
```

### 5.6. Démarrer le backend

```bash
npm run dev
```

API locale :

```text
http://localhost:3000
```

---

## 6. Gestion des migrations Prisma

Les migrations permettent de versionner les évolutions du schéma PostgreSQL et de reproduire la structure de la base de données.

### Créer une nouvelle migration en développement

Après une modification validée de `schema.prisma` :

```bash
npx prisma migrate dev --name nom_de_la_migration
```

### Appliquer les migrations existantes

Pour une installation ou un environnement de déploiement :

```bash
npx prisma migrate deploy
```

### Vérifier leur état

```bash
npx prisma migrate status
```

### Régénérer Prisma Client

```bash
npx prisma generate
```

Les fichiers de migration doivent être conservés et versionnés avec le code source.

Les migrations reproduisent la structure de la base, et non les données métier.

---

## 7. Commandes disponibles

Depuis le dossier `backend/` :

| Commande | Fonction |
|---|---|
| `npm run dev` | Démarrage en développement avec rechargement automatique |
| `npm run build` | Compilation TypeScript |
| `npm start` | Démarrage de la version compilée |
| `npm test` | Exécution des tests Jest |
| `npm run test:cov` | Exécution des tests avec couverture |

---

## 8. Routes actuellement disponibles

| Méthode | Route | Description |
|---|---|---|
| GET | `/` | Informations sur le service |
| GET | `/health` | État du backend et de sa connexion PostgreSQL |

### Vérifier la santé du backend

```bash
curl http://localhost:3000/health
```

Lorsque la base de données est accessible, le backend retourne un statut HTTP 200 avec `status: "ok"`.

Lorsque la base est inaccessible, il retourne un statut HTTP 503 avec `status: "degraded"`.

Cette route permet de vérifier l'état technique du service et sa connexion réelle à PostgreSQL.

---

## 9. Fondations de données multi-tenant

Le schéma Prisma initial comprend notamment :

- **Tenant** : représente une entreprise cliente et son cycle de vie.
- **User** : représente un utilisateur de la plateforme ou d'une entreprise cliente.
- **UserDomain** : distingue les domaines PLATFORM et BUSINESS.
- **TenantStatus** et **UserStatus** : définissent les états des entités concernées.

Ces éléments constituent la fondation du modèle multi-tenant. Le schéma sera enrichi progressivement selon les incréments fonctionnels validés.

---

## 10. Sécurité et conventions Git

### Protection des secrets

Règles obligatoires :

- Aucun secret dans le dépôt.
- Le fichier `.env` reste ignoré.
- Seuls les modèles sans secrets, comme `.env.example`, peuvent être versionnés.
- Les données réelles des entreprises clientes ne doivent pas être publiées dans le dépôt.

### Conventions de développement

- Utiliser des messages de commit explicites.
- Préserver la cohérence entre le schéma Prisma et les migrations.
- Ne pas intégrer de changement architectural non validé.
- Signaler les blocages techniques et les décisions structurantes à VNR – Responsable.
- Soumettre les changements selon le processus de revue et de validation du projet.

---

## 11. Références de conception

Les documents de référence du projet comprennent notamment :

- Vision et objectifs VNR.
- Cadrage global MVP.
- Cadrage Platform Side.
- Cadrage Business Side.
- Rôles et profils (A5).
- Matrice Rôles × Permissions (A6).
- Pack développeurs A6.
- Mandat Sprint 0.

Ces documents constituent les références fonctionnelles et techniques pour les évolutions du produit.

---

**Projet :** VNR  
**Organisation :** Daccord Situation  
**Incrément :** I1 — Socle SaaS sécurisé  
**Périmètre documentaire :** dépôt racine et backend.