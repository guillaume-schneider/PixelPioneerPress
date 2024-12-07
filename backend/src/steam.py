import httpx


async def get_game_by_id(id: int, client):
    url = f"https://store.steampowered.com/api/appdetails/?appids={id}"
    try:
        response = await client.get(url)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching Steam data for {id}: {e}")
        return None
