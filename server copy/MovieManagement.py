from flask import Flask
from flask_cors import CORS
from config.Config import DevConfig, ProdConfig

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
app.config.from_object(DevConfig)

from endpoints.UserEndpoint import users
app.register_blueprint(users, url_prefix="/users")

from endpoints.ChatBotEndpoint import chatbot
app.register_blueprint(chatbot, url_prefix="/chatbot")


