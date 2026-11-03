# VNR — Frontend

Interface utilisateur de la plateforme SaaS VNR.
**Sprint 0 — Incrément I1 : socle SaaS sécurisé.**
Développeur : **Taphsir Abdoulaye**

Stack validée : **React 18 · TypeScript · Vite 5**

---

## Prérequis

- Node.js v20+
- npm v10+

---

## Installation

```bash
cd frontend
npm install
```

---

## Démarrage en développement

```bash
npm run dev
# → http://localhost:5173
```

---

## Build de production

```bash
npm run build
# Génère le dossier dist/
```

---

## Vérification TypeScript

```bash
npm run lint
# tsc --noEmit : 0 erreur attendu
```

---

## Structure du projet

```
frontend/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── src/
    ├── main.tsx              ← point d'entrée React
    ├── App.tsx               ← routeur principal (Platform / Business)
    ├── styles/
    │   └── global.css        ← styles globaux + design tokens
    ├── layouts/
    │   ├── PlatformLayout.tsx ← shell Platform Side (bleu)
    │   └── BusinessLayout.tsx ← shell Business Side (vert)
    └── pages/
        ├── Home.tsx           ← sélection de l'espace
        ├── platform/
        │   ├── Dashboard.tsx  ← tableau de bord plateforme
        │   ├── Companies.tsx  ← entreprises clientes
        │   └── Subscriptions.tsx ← abonnements
        └── business/
            ├── Dashboard.tsx  ← tableau de bord entreprise
            ├── Sales.tsx      ← ventes
            └── Stock.tsx      ← stock
```

---

## Deux espaces distincts

| Espace | URL | Couleur | Utilisateur |
|---|---|---|---|
| **Platform Side** | `/platform` | Bleu (#1a2f5e) | Daccord Situation |
| **Business Side** | `/business` | Vert (#065f46) | Entreprise cliente |

La page d'accueil (`/`) permet de choisir l'espace.

---

## Limites du Sprint 0

- Données statiques (pas d'appel API réel).
- Pas d'authentification ni de gestion des permissions.
- Pas de modules métier ERP.
- Ces fonctionnalités seront développées à partir de la Phase B.
