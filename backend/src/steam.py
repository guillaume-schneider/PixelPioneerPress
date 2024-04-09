import requests


def get_game_by_id(id: int):
    url = f"https://store.steampowered.com/api/appdetails/?appids={id}"
    response = requests.get(url)
    return response.json()
