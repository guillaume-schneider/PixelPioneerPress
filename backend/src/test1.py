# from flask import Flask, jsonify
# from dataclasses import dataclass

# app = Flask(__name__)


# @dataclass
# class Game:
#     def __init__(self, title, genre, platform):
#         self.title = title
#         self.genre = genre
#         self.platform = platform


# games = [
#     Game('Super Mario Bros.', 'Platformer', 'NES').__dict__,
#     Game('The Legend of Zelda', 'Action-adventure', 'NES').__dict__
# ]
# test1 = Game('Super Mario Bros.', 'Platformer', 'NES')

# @app.route('/api/data', methods=['GET'])
# def get_data():
#     return jsonify(games)

# if __name__ == '__main__':
#     app.run(debug=True)
# import os
# from steam_web_api import Steam

# KEY = os.environ.get("STEAM_API_KEY")

# # terraria_app_id = 105600
# steam = Steam(KEY)

# # arguments: app_id
# user = steam.apps.get_app_details("terr",  filters="genres")
# user = steam.apps.search_games("terr")
# print(user)
