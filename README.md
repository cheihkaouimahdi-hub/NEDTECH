# Employee Hub — Dashboard de Gestion des Employés

Bienvenue dans le projet **Employee Hub**, une application web moderne, performante et sécurisée conçue pour simplifier la gestion des collaborateurs au sein d'une entreprise.

Cette application est structurée sous forme de monorepo séparant distinctement le Frontend (application client React) et le Backend (API NestJS).

---

## 🚀 1. Description du Projet

L'application **Employee Hub** permet aux administrateurs de se connecter de façon sécurisée et de gérer le cycle de vie des employés à travers les fonctionnalités clés suivantes :
- **Authentification Sécurisée (JWT)** : Connexion avec validation rigoureuse des formulaires, stockage sécurisé du jeton d'accès, et gestion des redirections automatiques pour les routes protégées.
- **Tableau de Bord Dynamique** : Visualisation globale des employés sous forme de tableau paginé avec badges de statut colorés.
- **Filtres Avancés & Recherche** : Barre de recherche dynamique sur les champs Nom, Prénom et Email avec débogage des saisies (Debounce de 300ms) et filtre par département.
- **Gestion CRUD complète** : Ajout, modification et suppression d'employés via des composants modaux unifiés et réutilisables.
- **Alertes en Temps Réel** : Notifications contextuelles animées (Succès / Erreur) à chaque action utilisateur importante.

---

## 🛠️ 2. Stack Technique & Justifications

### Frontend (`apps/web`)
*   **React 19** : Utilisation de la toute dernière version majeure pour bénéficier des optimisations de rendu et de la gestion moderne des états concurrents.
*   **TypeScript** : Sécurité de typage statique stricte sur l'ensemble des entités de l'application (pas de type `any`).
*   **Vite** : Outil de build ultra-rapide garantissant un retour à chaud immédiat en développement (HMR) et un bundling de production optimisé.
*   **React Router DOM v6** : Gestion robuste du routage client avec des gardes de routes imperméables (`ProtectedRoute`).
*   **Axios** : Centralisation des appels réseau avec intercepteurs globaux pour attacher automatiquement l'en-tête `Authorization: Bearer <token>` et intercepter globalement les erreurs `401` afin de déconnecter l'utilisateur.
*   **React Hook Form + Zod** : Gestion déclarative et performante des formulaires avec validation par schéma Zod (zéro rendu inutile).
*   **React Hot Toast** : Système de toast dynamique et moderne s'intégrant parfaitement au thème visuel sombre.
*   **Vanilla CSS (Custom Properties)** : Contrôle total et grande flexibilité du design sombre, moderne et épuré, avec des effets de glassmorphisme et des transitions fluides.

### Backend (`apps/api`)
*   **NestJS** : Framework robuste basé sur une architecture modulaire propre, facilitant la maintenabilité et la testabilité du code.
*   **Prisma ORM** : ORM TypeScript natif pour des requêtes de base de données typées et une gestion de schéma simplifiée.
*   **PostgreSQL** : Système de gestion de base de données relationnelle robuste et éprouvé.
*   **Passport.js & JWT** : Protocole standard et sécurisé pour l'authentification.

---

## ⚙️ 3. Variables d'Environnement

Créez un fichier `.env` à la racine du projet (en vous basant sur `.env.example`) :

```env
# Paramètres du Backend
API_PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

# Paramètres du Frontend
VITE_API_URL="http://localhost:3000"
```

Créez également un fichier `.env` dans `apps/api/.env` pour configurer l'URL de connexion directe à Prisma si vous lancez les services localement.

---

## 💿 4. Installation et Lancement

### Prérequis
- **Node.js** (v18+)
- **npm** (v9+)
- **PostgreSQL** ou **Docker** installé

---

### Étape 1 : Installer les dépendances
À la racine du projet, installez toutes les dépendances :
```bash
# Dans le dossier racine du projet
npm install
```

Installez également les dépendances spécifiques à chaque application :
```bash
# Installer pour le Backend NestJS
cd apps/api
npm install

# Installer pour le Frontend React
cd ../web
npm install
```

---

### Étape 2 : Lancer la Base de Données (Docker)
Si vous souhaitez lancer rapidement une base de données PostgreSQL via Docker, utilisez le fichier `docker-compose` à la racine :
```bash
docker-compose up -d postgres
```

---

### Étape 3 : Lancer les Migrations Prisma
Pour créer les tables de la base de données PostgreSQL (User, Employee) :
```bash
cd apps/api
npx prisma migrate dev
```

---

### Étape 4 : Lancer les Applications

#### Lancer le Backend (API) :
```bash
cd apps/api
npm run start:dev
```
L'API démarrera sur [http://localhost:3000](http://localhost:3000).

#### Lancer le Frontend (Web) :
```bash
cd apps/web
npm run dev
```
L'application client démarrera sur [http://localhost:5173](http://localhost:5173).

---

## 🔍 5. Visualiser la Base de Données

Pour inspecter ou manipuler la base de données directement sans installer de client tiers, lancez Prisma Studio :
```bash
cd apps/api
npx prisma studio
```
L'interface d'administration s'ouvrira sur [http://localhost:5555](http://localhost:5555).

---

## 📐 6. Décisions d'Architecture

Le projet repose sur une **Architecture orientée Fonctionnalités (Feature-Based)** couplée à une **Architecture en Couches (Layered Architecture)** pour assurer une extensibilité maximale et un code propre.

### A. Structure Monorepo (Séparation Physique)
Le code est divisé en deux packages indépendants :
- **`apps/api/`** : Backend NestJS gérant la logique métier, la persistance avec PostgreSQL et la sécurité JWT.
- **`apps/web/`** : Frontend React 19 / TypeScript assurant l'interaction utilisateur.

### B. Architecture par Fonctionnalités (Feature-Based)
Dans le dossier `src/features/`, le code est segmenté par domaine fonctionnel :
*   `features/auth/` : Gestion des accès, de la session et de la page de connexion.
*   `features/employees/` : Gestion du tableau, de la recherche, des formulaires de modification et de la suppression.

Cette organisation garantit que l'ajout futur d'un domaine (ex: *Congés*, *Factures*) n'impacte pas le code existant et se fait simplement par ajout d'un nouveau dossier autonome.

### C. Séparation des Responsabilités en Couches (SoC)
Chaque fonctionnalité respecte un flux en couches unidirectionnel :

1.  **Couche UI / Présentation (`components/`, `pages/`)** :
    *   *Rôle* : Affichage HTML, structure et design CSS.
    *   *Règle* : Zéro requête réseau directe, aucun timeout ou debounce logique. Elle consomme uniquement les hooks.
2.  **Couche Logique Métier (`hooks/`)** :
    *   *Rôle* : Les hooks personnalisés (`useEmployees`, `useAuth`, `useEmployeeMutations`) encapsulent les états locaux, la pagination et les appels API.
3.  **Couche Validation (`schemas/`)** :
    *   *Rôle* : Validation des données entrantes par schéma Zod couplé à `react-hook-form` pour garantir l'absence d'erreurs de type avant la soumission HTTP.
4.  **Couche Réseau (`api/`)** :
    *   *Rôle* : Services Axios d'échange de données. Les intercepteurs injectent le JWT et redirigent automatiquement vers `/login` en cas de réponse `401 Unauthorized`.

---

## ⚠️ 7. Limitations Connues

1.  **Gestion de session légère** : L'authentification utilise actuellement un jeton d'accès simple stocké dans le `localStorage`. Pour un environnement de production hautement sécurisé, il est préférable d'utiliser des cookies sécurisés `httpOnly` et un système de Refresh Token.
2.  **Gestion des rôles (ACL)** : L'application gère les rôles `ADMIN` et `EMPLOYEE` dans son modèle de données, mais le menu client affiche les mêmes actions pour tous les utilisateurs connectés. Des restrictions visuelles supplémentaires basées sur le rôle décodé du JWT pourront être ajoutées.
3.  **Pas de cache global persistant** : L'état des employés est rechargé depuis le serveur à chaque changement de page/filtre. L'utilisation d'outils comme React Query (TanStack Query) permettrait d'optimiser l'expérience en ajoutant de la mise en cache.
