import requests

def get_all_games(api_key):
    # URL pour obtenir la liste complète des jeux
    url = f"http://api.steampowered.com/ISteamApps/GetAppList/v2"

    # Faire la requête à l'API
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        apps = data.get("applist", {}).get("apps", [])
        return apps
    else:
        print(f"Erreur de requête: {response.status_code}")
        return None

def filter_games_by_genre(apps, genre):
    # Filtrer les jeux par genre
    filtered_games = [app for app in apps if 'genres' in app and genre.lower() in [g.lower() for g in app['genres']]]
    return filtered_games

# Exemple d'utilisation
api_key = "DE1D86C082218A16D3F689A2A4F42D4B"

all_games = get_all_games(api_key)
for app in all_games:
    print(f"name: {app['name']} and genre: {app['genres']}")
print(all_games)

if all_games is not None:
    genre_to_filter = "Horror"  # Remplacez par le genre spécifique que vous recherchez
    filtered_games = filter_games_by_genre(all_games, genre_to_filter)

    if filtered_games:
        print(f"Jeux du genre '{genre_to_filter}':")
        for game in filtered_games:
            print(f"ID : {game['appid']}, Nom : {game['name']}")
    else:
        print(f"Aucun jeu trouvé pour le genre '{genre_to_filter}'.")
else:
    print("Impossible d'obtenir la liste des jeux.")
