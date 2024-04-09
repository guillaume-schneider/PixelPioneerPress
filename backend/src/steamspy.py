import requests


def get_top100in2weeks():
    url = "https://steamspy.com/api.php?request=top100in2weeks"
    response = requests.get(url)
    return response.json()


def get_game_by_steam_id(steam_id: int):
    url = f"https://steamspy.com/api.php?request=appdetails&appid={steam_id}"
    response = requests.get(url)
    return response.json()
