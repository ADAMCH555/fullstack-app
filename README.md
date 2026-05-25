# Application Fullstack

Une application web fullstack moderne comprenant un frontend basé sur React et un backend Node.js/Express connecté à une base de données MongoDB.

---

## Structure du Projet

Le projet est structuré comme suit :
* **[backend/](file:///c:/Users/HP/Desktop/fullstack_app/backend)** - Serveur Express gérant la connexion à la base de données, l'authentification et les routes de l'API REST.
* **[frontend/](file:///c:/Users/HP/Desktop/fullstack_app/frontend)** - Application React générée et packagée avec Vite.

---

## Prérequis

Avant de lancer l'application, assurez-vous d'avoir installé sur votre machine :
* **Node.js** (v18 ou supérieur recommandé)
* **npm** (installé automatiquement avec Node.js)
* **MongoDB** (exécuté localement sur `mongodb://127.0.0.1:27017` ou via une instance dans le cloud comme MongoDB Atlas)

---

## Configuration et Lancement de l'Application

Suivez ces étapes pour exécuter l'application dans un environnement de développement local.

### 1. Configuration du Serveur Backend

1. Accédez au répertoire backend :
   ```bash
   cd backend
   ```
2. Installez les dépendances du backend :
   ```bash
   npm install
   ```
3. Configurez les variables d'environnement dans le fichier **[backend/.env](file:///c:/Users/HP/Desktop/fullstack_app/backend/.env)** :
   * `PORT` : Le port sur lequel le serveur Express va écouter (par défaut : `5000`).
   * `MONGO_URI` : L'URI de connexion à votre base de données MongoDB (par défaut : `mongodb://127.0.0.1:27017/fullstack_app`).
   * `JWT_SECRET` : Une clé secrète utilisée pour signer les JSON Web Tokens (JWT).
4. Démarrez le serveur backend :
   ```bash
   npm start
   ```
   Le serveur backend sera lancé sur le port `5000`.

### 2. Configuration de l'Application Frontend

1. Ouvrez un nouveau terminal et accédez au répertoire frontend :
   ```bash
   cd frontend
   ```
2. Installez les dépendances du frontend :
   ```bash
   npm install
   ```
3. Lancez le serveur de développement Vite :
   ```bash
   npm run dev
   ```
   L'application frontend sera accessible, généralement à l'adresse `http://localhost:5173`.

---

## Lancement en Mode Production

Le backend est configuré pour servir les fichiers statiques de l'application frontend compilée en production.

1. Compilez l'application frontend :
   ```bash
   cd frontend
   npm run build
   ```
   Cela va générer les fichiers de production dans le dossier **[frontend/dist/](file:///c:/Users/HP/Desktop/fullstack_app/frontend/dist)**.
2. Démarrez le serveur backend :
   ```bash
   cd backend
   npm start
   ```
3. Accédez à l'application en ouvrant l'adresse `http://localhost:5000` (ou le port défini dans votre fichier `.env`). Le serveur Express ([backend/server.js](file:///c:/Users/HP/Desktop/fullstack_app/backend/server.js)) servira directement l'application React.