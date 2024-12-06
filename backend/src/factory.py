from game import Game, GameBatch
import steam
import steamspy


def create_game_component():
    batch = GameBatch()
    games = steamspy.get_top100in2weeks()
    for game_data in games.values():
        game_id = game_data['appid']
        steam_info = steam.get_game_by_id(game_id)
        steampsy_info = steamspy.get_game_by_steam_id(game_id)
        print("Getting game info...")

        if steam_info is None or steampsy_info is None:
            continue

        print(f"{game_id}: starting...")

        if 'data' not in steam_info[str(game_id)]:
            continue

        steam_info = steam_info[str(game_id)]['data']
        linux_requirement = steam_info['linux_requirements']['minimum'] if 'minimum' in steam_info['linux_requirements'] else ""
        mac_requirement = steam_info['mac_requirements']['minimum'] if 'minimum' in steam_info['mac_requirements'] else ""
        pc_requirement = steam_info['pc_requirements']['minimum'] if 'minimum' in steam_info['pc_requirements'] else ""
        video = steam_info['movies'][0]['mp4']['480'] if 'movies' in steam_info else ""

        game = Game(id=game_id, title=steam_info['name'],
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
        batch.add_game(game)
        print(f"{game_id}: finishing...")
    return batch
