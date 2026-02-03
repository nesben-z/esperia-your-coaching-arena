# 🎮 Esperia - Plateforme de Coaching E-Sports

Plateforme professionnelle de coaching e-sports permettant aux joueurs de se connecter avec des coachs d'élite pour améliorer leurs compétences de jeu compétitif.

## 🚀 Technologies Utilisées

- **React 18** - Bibliothèque UI moderne
- **TypeScript** - Typage statique pour une meilleure qualité de code
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **shadcn/ui** - Composants UI accessibles et personnalisables
- **React Router** - Navigation et routage
- **TanStack Query** - Gestion des données et cache

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 18 ou supérieure) - [Télécharger Node.js](https://nodejs.org/)
- **npm** (généralement inclus avec Node.js)

Pour vérifier vos installations :

```bash
node --version
npm --version
```

## 🛠️ Installation

1. **Cloner le repository** (si vous ne l'avez pas déjà fait)

```bash
git clone <VOTRE_URL_GIT>
cd esperia-your-coaching-arena
```

2. **Installer les dépendances**

```bash
npm install
```

Cette commande installera toutes les dépendances nécessaires listées dans `package.json`.

## ▶️ Lancer le Projet

### Mode Développement

Pour lancer le serveur de développement avec rechargement automatique :

```bash
npm run dev
```

ou simplement :

```bash
npm start
```

Le projet sera accessible à l'adresse : **http://localhost:8080**

### Build de Production

Pour créer une version optimisée pour la production :

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`.

### Prévisualiser le Build

Pour prévisualiser la version de production localement :

```bash
npm run preview
```

## 📁 Structure du Projet

```
esperia-your-coaching-arena/
├── public/              # Fichiers statiques
├── src/
│   ├── assets/         # Images et ressources
│   ├── components/      # Composants React
│   │   ├── home/       # Composants de la page d'accueil
│   │   ├── layout/     # Navbar, Footer
│   │   └── ui/         # Composants UI (shadcn)
│   ├── contexts/       # Contextes React (Auth, etc.)
│   ├── data/           # Données mockées
│   ├── hooks/          # Hooks personnalisés
│   ├── lib/            # Utilitaires
│   ├── pages/          # Pages de l'application
│   ├── types/          # Types TypeScript
│   ├── App.tsx         # Composant principal
│   ├── main.tsx        # Point d'entrée
│   └── index.css       # Styles globaux
├── index.html          # Template HTML
├── package.json        # Dépendances et scripts
├── vite.config.ts      # Configuration Vite
└── tailwind.config.ts  # Configuration Tailwind
```

## 🎨 Fonctionnalités

- ✅ Page d'accueil avec hero section
- ✅ Liste des coachs disponibles
- ✅ Profils de coachs détaillés
- ✅ Système d'authentification (frontend)
- ✅ Espace étudiant
- ✅ Espace administrateur
- ✅ Design responsive et moderne
- ✅ Mode sombre (préparé)

## 🔧 Scripts Disponibles

- `npm run dev` - Lance le serveur de développement
- `npm start` - Alias pour `npm run dev`
- `npm run build` - Crée un build de production
- `npm run build:dev` - Crée un build en mode développement
- `npm run preview` - Prévisualise le build de production
- `npm run lint` - Vérifie le code avec ESLint

## 📝 Notes Importantes

⚠️ **Backend non connecté** : Pour l'instant, l'application fonctionne uniquement en frontend avec des données mockées. La connexion au backend sera ajoutée ultérieurement.

## 🐛 Dépannage

### Problème : `npm install` échoue

- Vérifiez que vous avez Node.js 18+ installé
- Supprimez `node_modules` et `package-lock.json`, puis réessayez :
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

### Problème : Le serveur ne démarre pas

- Vérifiez que le port 8080 n'est pas déjà utilisé
- Modifiez le port dans `vite.config.ts` si nécessaire

### Problème : Erreurs TypeScript

- Vérifiez que toutes les dépendances sont installées
- Exécutez `npm install` à nouveau

## 📄 Licence

Ce projet est privé. Tous droits réservés.

## 👥 Contribution

Pour l'instant, ce projet est en développement. Les contributions seront les bienvenues une fois le backend connecté.

---

**Développé avec ❤️ pour les passionnés d'e-sports**
