from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permet les requêtes depuis le frontend

# Stockage temporaire en mémoire
messages = []

# www.mon-site.com/messages 
# HTTP GET -> www.mon-site.com/messages
# HTTP
# POST -> Creation de quelque chose
# GET -> Lecture de qqch
# PUT -> Mettre a jour qqch 
# DELETE -> Supprime

@app.route("/messages", methods=["GET"]) # decorateur
def get_messages():
    receiver = request.args.get('receiver')
    if receiver:
        filtered = [msg for msg in messages if msg['receiver'] == receiver]
        return jsonify(filtered)
    return jsonify(messages)

@app.route("/send", methods=["POST"])
def send_message():
    data = request.get_json()
    message = {
        "sender": data.get("sender"),
        "receiver": data.get("receiver"),
        "text": data.get("text"),
    }
    messages.append(message)
    return jsonify({"status": "Message envoyé"}), 200

if __name__ == "__main__":
    app.run(debug=True)
