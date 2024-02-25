import requests

def get_game_stats(app_id, api_key):
    # URL pour obtenir des statistiques pour un jeu spécifique
    url = f"http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key={api_key}&appid={app_id}"

    # Faire la requête à l'API
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        # Traitez les données selon vos besoins
        return data
    else:
        print(f"Erreur de requête: {response.status_code}")
        return None
    
def get_user_reviews(app_id, api_key):
    # URL pour obtenir les statistiques (y compris les avis) pour un jeu spécifique
    url = f"http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?key={api_key}&appid={app_id}"

    # Faire la requête à l'API
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        # Vérifier si les données sur les avis sont présentes
        if 'playerstats' in data and 'steamdb' in data['playerstats']:
            reviews = data['playerstats']['steamdb'].get('reviews', [])
            return reviews
        else:
            print("Aucune information sur les avis trouvée.")
            return None
    else:
        print(f"Erreur de requête: {response.status_code}")
        return None

# Exemple d'utilisation
app_id = 1966720  # ID de Counter-Strike: Global Offensive comme exemple
api_key = "DE1D86C082218A16D3F689A2A4F42D4B"

game_stats = get_game_stats(app_id, api_key)

if game_stats:
    print(f"Statistiques du jeu : {game_stats}")
else:
    print("Impossible d'obtenir des statistiques.")

reviews_count = get_user_reviews(app_id, api_key)

if reviews_count is not None:
    print(f"Nombre d'avis pour le jeu : {reviews_count}")
else:
    print("Impossible d'obtenir le nombre d'avis.")
