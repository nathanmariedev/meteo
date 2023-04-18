# Météo projet

Voici un "meteo" pour Nestjs en TypeScript

Il contient :
- Knex (pg) pour la connexion à la base de donnée et la gestion des migrations/seeds
- Un module "auth" qui prends en charge un workflow de login/register/reset/activation
- Un module "email" avec un service permettant de générer des mails
- Une gestion des templates via Nunjucks (pour les emails ou autre)
- De la documentation Swagger automatique (introspection) disponible sur /doc
- Un exemple a dupliquer pour la gestion des modèles : src/common/models/user.model.ts
- Un exemple de test e2e : test/auth.e2e-spec.ts
- Quelques bonnes idées

Ce dépôt étant générique, il convient de l'utiliser comme ceci :
- cloner le dépôt
- ```npm i```
- renommer le projet via la commande "npm run setname"
- créer un dépôt pour le nouveau projet, et changer son origin
	- ```git remote set-url origin git@bitbucket.org:wecraftapps/NEWPROJECTNAME.git```
- ```docker-compose up``` pour lancer l'environnement de dev
- ```nvm use```
- activer les variables d'environnement en renommant le fichier `config.env.dist`
	- ```cp config.env.dist config.env```
- ```npm run start:dev```
- remplir la clé `JWT_LOGIN_SECRET` du fichier `config.env` pour finaliser le module d'authentification

### (Facultatif)
- lancer les migrations pour créer une table `User`d'exemple
	- ```npm run knex migrate:latest```
- lancer les seeds pour avoir des données d'exemple
	- ```npm run knex seed:run```
- lancer les tests
  - ```npm run knex seed:run && npm run test```
