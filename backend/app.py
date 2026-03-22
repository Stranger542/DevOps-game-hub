from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Enables Cross-Origin Resource Sharing for frontend communication

# In-memory database for games
games_db = [
    {
        "id": 1,
        "title": "Counter-Strike 2",
        "description": "Tactical first-person shooter featuring objective-based multiplayer modes.",
        "download_link": "#"
    },
    {
        "id": 2,
        "title": "Minecraft",
        "description": "Sandbox video game consisting of procedurally generated 3D worlds.",
        "download_link": "#"
    }
]

@app.route('/student-details', methods=['GET'])
def get_student_details():
    """Returns the student details as required."""
    return jsonify({
        "name": "Sumit Hulke",
        "register_number": "2023BCD0026"
    }), 200

@app.route('/api/games', methods=['GET'])
def get_games():
    """Returns the list of available games."""
    return jsonify(games_db), 200

@app.route('/api/games', methods=['POST'])
def add_game():
    """Accepts a game request and adds it to the hub."""
    data = request.get_json()
    new_game = {
        "id": len(games_db) + 1,
        "title": data.get('title'),
        "description": data.get('description'),
        "download_link": "#" # Placeholder link for requested games
    }
    games_db.append(new_game)
    return jsonify(new_game), 201

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
