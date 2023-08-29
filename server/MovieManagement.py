from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["*"])

from endpoints.UserEndpoint import users
app.register_blueprint(users, url_prefix="/users")

from endpoints.ChatBotEndpoint import chatbot
app.register_blueprint(chatbot, url_prefix="/chatbot")


