from src.game import Game, GameBatch
import src.steam as steam
import src.steamspy as steamspy
import asyncio
import httpx


async def fetch_game_data(game_id):
    try:
        # Remove the `client` parameter if unnecessary
        steam_info_task = asyncio.create_task(steam.get_game_by_id(game_id))
        steampsy_info_task = asyncio.create_task(steamspy.get_game_by_steam_id(game_id))

        steam_info, steampsy_info = await asyncio.gather(steam_info_task,
                                                         steampsy_info_task)

        if steam_info is None or steampsy_info is None \
                or 'data' not in steam_info[str(game_id)]:
            return None

        steam_info = steam_info[str(game_id)]['data']
        linux_requirement = steam_info['linux_requirements'].get('minimum', "")
        mac_requirement = steam_info['mac_requirements'].get('minimum', "")
        pc_requirement = steam_info['pc_requirements'].get('minimum', "")
        video = steam_info['movies'][0]['mp4']['480'] \
            if 'movies' in steam_info else ""

        game = Game(
            id=game_id,
            title=steam_info['name'],
            developer=steam_info['developers'][0],
            publisher=steampsy_info['publisher'][0],
            positive_rating=steampsy_info['positive'],
            negative_rating=steampsy_info['negative'],
            genres=steampsy_info['genre'],
            subgenres=steampsy_info['tags'],
            description=steam_info['detailed_description'],
            short_description=steam_info['short_description'],
            image=steam_info['header_image'],
            subimages=steam_info['screenshots'],
            linux_requirement=linux_requirement,
            pc_requirement=pc_requirement,
            mac_requirement=mac_requirement,
            release_date=steam_info['release_date']['date'],
            video=video,
        )
        return game
    except Exception as e:
        print(f"Error fetching data for game {game_id}: {e}")
        return None


async def create_game_component():
    batch = GameBatch()
    games = await steamspy.get_top100in2weeks()
    game_ids = [game_data['appid'] for game_data in games.values()]

    async with httpx.AsyncClient() as client:
        tasks = [fetch_game_data(game_id, client) for game_id in game_ids]
        results = await asyncio.gather(*tasks)

    for game in results:
        if game:
            batch.add_game(game)

    return batch
