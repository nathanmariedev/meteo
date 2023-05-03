# vuejs-starterkit

Bienvenue dans le starterkit Vue.js

## Intro
--- Styles ---
Dans /src/assets/sass vous pourrez trouver les variables globales de styles du projet (variable.scss)
Ces variables sont injectées globalement et donc accessibles partout dans le projet.

Le fichier /src/assets/sass/app.sass permet de gérer de façon globale quelques styles généraux.
La librairie Fondation est partiellement importée pour l'utilisation de la GrilleXY.

--- Basics ---
Dans /src/basics on retrouve des éléments de base d'un framework front.
On enrichira cette partie au fur et à mesure.
Les components peuvent ensuite être facilement personnalisés pour correspondre aux besoins et styles du projet.
Vous pouvez en savoir un peu plus sur les utilisations possibles en consultant le fichier /src/views/Demo.vue .

--- Views ---
Dans /src/views, on retrouve les components proches d'une page web.
Ce dossier peut être divisé en sous-dossiers pour classer les components.

--- Components ---
On retrouve dans /src/components les components spécifiques à une zone du projet.
Ils sont classiquement importés dans les components views.
Ce dossier peut être divisé en sous-dossiers pour classer les components.

--- Services ---
On retrouve ici les services relatifs aux appels API et notamment à l'authentification.

En lancant le projet, vous pourrez tester les différents éléments présentés ici.

## Use the correct version of Node / Always launch this line before "npm install" and "npm run serve"
```
nvm use
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```
