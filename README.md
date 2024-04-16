# Pixel Pioneer

## Introduction
Bienvenue dans le répertoire du Pixel Pioneer, un hub social multiplateforme pour les amateurs de jeux vidéo. Ce projet utilise Angular pour le frontend, Flask pour le backend, et Firebase pour la gestion des données utilisateurs.

## Prérequis
Assurez-vous d'avoir les outils suivants installés sur votre machine :
- Python 3.8 ou plus récent
- pip et virtualenv
- Node.js et npm
- Angular CLI
- Firebase CLI (si nécessaire pour des commandes spécifiques)

## Installation

### Cloner le dépôt

git clone https://github.com/guillaume-schneider/PixelPioneerPress.git
cd pixelpioneerpress


### Configurer l'environnement virtuel et installer les dépendances du backend

cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
cd ..


### Installer les dépendances du frontend

cd frontend
npm install
cd ..


## Lancement des serveurs
Chaque serveur doit être lancé manuellement depuis la racine du projet. Voici les étapes à suivre :

### Lancer le serveur Flask (Backend Python)
Ouvrez un terminal et exécutez :

echo "Lancement du serveur Python..."
cmd /c start cmd /k "backend\venv\Scripts\activate && python backend/src/main.py"


### Lancer le JSON Server (Pour développement frontend)
Ouvrez un autre terminal et exécutez :

echo "Lancement de json-server..."
cmd /c start cmd /k "json-server --watch frontend/db.json --port 3000 --host localhost"


### Lancer le serveur Angular (Frontend)
Ouvrez un troisième terminal et exécutez :

echo "Lancement du serveur Angular..."
cmd /c start cmd /k "cd frontend && ng serve --open --port 4200 --host localhost"


## Premier Lancement
Lors du premier accès aux pages telles que /home, /top, ou la recherche de jeux, le backend Flask peut prendre du temps pour récupérer les données, car elles sont hébergées sur un serveur local. De plus, la logique de recommandation de jeux intégrée au frontend peut rendre le chargement de la page /home particulièrement lent lors de la première visite. Il peut être nécessaire de relancer la page deux à trois fois.

## Utilisation
Naviguez sur `http://localhost:4200` pour accéder à l'interface du Pixel Pioneer.
