import httpx


async def get_top100in2weeks():
    url = "https://steamspy.com/api.php?request=top100in2weeks"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        response.raise_for_status()
        return response.json()


async def get_game_by_steam_id(steam_id: int, client):
    url = f"https://steamspy.com/api.php?request=appdetails&appid={steam_id}"
    response = await client.get(url)
    response.raise_for_status()
    return response.json()
