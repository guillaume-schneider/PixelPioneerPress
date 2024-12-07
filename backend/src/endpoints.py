from flask import Flask
from src.game import GameBatch
from flask_cors import CORS
import src.factory as factory
import os
import json


app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    html = "<h1>List of Endpoints:</h1><ul>"
    for rule in app.url_map.iter_rules():
        if rule.endpoint != 'index':
            methods = ', '.join(sorted(rule.methods - {'HEAD', 'OPTIONS'}))
            html += f"<li><a href='{rule.rule}'>{rule.endpoint}</a> ({methods})</li>"
    html += "</ul>"
    return html


@app.route('/steam/games', methods=['GET'])
async def get_data():
    if not hasattr(app, 'game_batch'):
        app.game_batch = await load_game_data()
    return app.game_batch.to_json()


async def load_game_data():
    batch = GameBatch()
    file_path = './backend/res/data.json'

    if not os.path.isdir('./backend/res'):
        os.makedirs('./backend/res')

    if os.path.isfile(file_path):
        with open(file_path, 'r') as f:
            data = json.load(f)
            for game_data in data['games']:
                game = factory.Game(**game_data)
                batch.add_game(game)
    else:
        batch = await factory.create_game_component()
        with open(file_path, 'w') as f:
            json.dump(batch.to_json(), f)

    return batch


@app.route('/steam/game/<int:id>', methods=['GET'])
async def get_game_by_id(id):
    if not hasattr(app, 'game_batch'):
        app.game_batch = await load_game_data()

    game = app.game_batch.get_game_by_id(id)
    if game:
        return game.__dict__

    return {"error": "Game not found"}, 404


@app.errorhandler(404)
def not_found_error(error):
    return {"error": "Resource not found"}, 404


@app.errorhandler(500)
def internal_error(error):
    return {"error": "An internal error occurred"}, 500
