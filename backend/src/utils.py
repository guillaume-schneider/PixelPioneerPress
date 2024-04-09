# import requests

# def find_appid_by_name(game_name):
#     url = "https://steamspy.com/api.php"
#     params = {"request": "all", "page": 1}
#     response = requests.get(url, params=params)
#     data = response.json()
    
#     for game in data.values():
#         print(game)
#         if game.get("name") == game_name:
#             return game["appid"]
    
#     return None

# # Example usage
# game_name = "Lethal Company"
# appid = find_appid_by_name(game_name)
# if appid:
#     print(f"App ID of {game_name}: {appid}")
# else:
#     print(f"Game '{game_name}' not found.")

import requests

API_KEY = "YOUR_API_KEY"


def get_appid_by_name(game_name):
    url = "http://api.steampowered.com/ISteamApps/GetAppList/v2/"
    response = requests.get(url)
    data = response.json()

    if "applist" in data and "apps" in data["applist"]:
        apps = data["applist"]["apps"]
        for i in range(0, 10):
            app = apps[i]
            
        for app in apps:
            if app["name"] == game_name:
                return app["appid"]
    return None

def get_first_game(nb: int):
    url = "http://api.steampowered.com/ISteamApps/GetAppList/v2/"
    response = requests.get(url)
    data = response.json()['applist']['apps']
    
    res = []
    index = 0
    for app in data:
        if len(app["name"]) > 0:
            res.append(app)
            index += 1
        if index == nb:
            break

    return res


url = "http://api.steampowered.com/ISteamApps/GetAppList/v2/"
response = requests.get(url)
data = response.json()['applist']['apps']
print(data[0])
