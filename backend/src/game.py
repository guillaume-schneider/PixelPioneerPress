from dataclasses import dataclass


@dataclass(init=True, repr=True, eq=True, order=True, unsafe_hash=True, frozen=True)
class Game:
    id: int
    title: str
    developer: str
    publisher: str
    positive_rating: int
    negative_rating: int
    genres: list[str]
    subgenres: list[str]
    description: str
    short_description: str
    image: str
    subimages: list[str]
    linux_requirement: str
    pc_requirement: str
    mac_requirement: str
    # screenshots: list[str]
    video: str
    release_date: str


@dataclass
class Movie:
    id: int
    name: str
    thumbnail: str
    webm: str
    mp4: str


@dataclass
class Screenshot:
    id: int
    full_path: str
    thumbnail_path: str


class GameBatch:
    def __init__(self) -> None:
        self.games: list[Game] = []

    def add_game(self, game: Game):
        self.games.append(game)

    def get_game(self, index: int) -> Game:
        return self.games[index]

    def get_game_by_id(self, game_id: int) -> Game:
        for game in self.games:
            if game.id == game_id:
                return game
        return None

    def get_game_by_title(self, title: str) -> Game:
        for game in self.games:
            if game.title == title:
                return game
        return None

    def get_game_by_steam_id(self, steam_id: int) -> Game:
        for game in self.games:
            if game.steam_id == steam_id:
                return game
        return None

    def remove_game(self, game_id: int):
        for game in self.games:
            if game.id == game_id:
                self.games.remove(game)
                return True
        return False

    def to_json(self):
        return {
            "games": [game.__dict__ for game in self.games]
        }
