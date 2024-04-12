#!/bin/bash

# Lancement du serveur Python
echo "Lancement du serveur Python..."
cmd /c start cmd /k "backend\venv\Scripts\activate && python backend/src/main.py"

# Lancement de json-server
echo "Lancement de json-server..."
cmd /c start cmd /k "json-server --watch frontend/db.json --port 3000 --host localhost"

# Lancement du serveur Angular
echo "Lancement du serveur Angular..."
cmd /c start cmd /k "cd frontend && ng serve --open --port 4200 --host localhost"
