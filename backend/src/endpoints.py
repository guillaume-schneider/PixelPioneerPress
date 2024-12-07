from flask import Flask
from src.game import GameBatch
from flask_cors import CORS
import src.factory
import os
import json


app = Flask(__name__)
CORS(app)


# @app.route('/')
# def index():
#     # Initialize an empty list to store the endpoints
#     endpoints = []
    
#     # Iterate through the rules and gather the endpoints
#     for rule in app.url_map.iter_rules():
#         # Exclude the index route itself
#         if rule.endpoint != 'index':
#             endpoints.append({
#                 "endpoint": rule.endpoint,
#                 "methods": sorted(rule.methods),
#                 "url": str(rule)
#             })

#     # Return the JSON representation of the endpoints
#     return jsonify(endpoints)

@app.route('/')
def index():
    # Initialize an empty string to store the HTML
    html = "<h1>List of Endpoints:</h1><ul>"
    
    # Iterate through the rules and generate HTML links for each endpoint
    for rule in app.url_map.iter_rules():
        # Exclude the index route itself
        if rule.endpoint != 'index':
            html += f"<li><a href='{rule.rule}'>{rule.endpoint}</a></li>"

    html += "</ul>"
    # Return the HTML
    return html

@app.route('/steam/games', methods=['GET'])
def get_data():
    batch = GameBatch()
    if not os.path.isdir('./backend/res'):
        os.makedirs('./backend/res')
    if not os.path.isfile('./backend/res/data.json'):
        batch = factory.create_game_component()
        with open('./backend/res/data.json', 'w') as f:
            json.dump(batch.to_json(), f)
    else:
        with open('./backend/res/data.json', 'r') as f:
            data = json.load(f)
            for game_data in data['games']:
                game = factory.Game(**game_data)
                batch.add_game(game)
    return batch.to_json()

@app.route('/steam/game/<int:id>')
def get_game_by_id(id):
    batch = GameBatch()
    if not os.path.isdir('./backend/res'):
        os.makedirs('./backend/res')
    if not os.path.isfile('./backend/res/data.json'):
        batch = factory.create_game_component()
        with open('./backend/res/data.json', 'w') as f:
            json.dump(batch.to_json(), f)
    else:
        with open('./backend/res/data.json', 'r') as f:
            data = json.load(f)
            for game_data in data['games']:
                game = factory.Game(**game_data)
                batch.add_game(game)
    game = batch.get_game_by_id(id)
    if game:
        return game.__dict__
    return {"error": "Game not found"}
