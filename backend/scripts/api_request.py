import requests

api_key = "DE1D86C082218A16D3F689A2A4F42D4B"
url = f"http://api.steampowered.com/ISteamApps/GetAppList/v2/?key={api_key}"

response = requests.get(url)

if response.status_code == 200:
    data = response.json()
    app_list = data.get("applist", {}).get("apps", [])
    
    # app_list contient maintenant une liste d'informations sur chaque jeu
    for app in app_list:
        if "Lethal Company" in app['name']:
            print(f"id: {app['appid']}")
        # print(f"ID du jeu : {app['appid']}, Nom du jeu : {app['name']}")
else:
    print(f"Erreur de requête: {response.status_code}")
    print(response.text)
