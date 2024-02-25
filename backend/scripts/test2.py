import requests

def get_game_image(app_id, api_key):
    # Obtenez des détails spécifiques pour le jeu en utilisant l'ID du jeu
    url_game_details = f"http://store.steampowered.com/api/appdetails?appids={app_id}"
    response_details = requests.get(url_game_details)
    
    if response_details.status_code == 200:
        data_details = response_details.json()
        
        # Vérifiez si les détails existent et si l'image est disponible
        if data_details.get(str(app_id), {}).get("data", {}).get("header_image"):
            image_url = data_details[str(app_id)]["data"]["header_image"]
            return image_url
        else:
            return None
    else:
        print(f"Erreur de requête: {response_details.status_code}")
        return None

# Exemple d'utilisation
app_id = 1966720  # ID de Dota 2 comme exemple
api_key = "DE1D86C082218A16D3F689A2A4F42D4B"

image_url = get_game_image(app_id, api_key)

if image_url:
    print(f"URL de l'image de présentation : {image_url}")
else:
    print("Impossible d'obtenir l'image de présentation.")
