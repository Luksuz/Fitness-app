from flask import Flask
from config.Config import DevConfig, ProdConfig

app = Flask(__name__)
app.config.from_object(DevConfig)

from endpoints.UserEndpoint import users
app.register_blueprint(users, url_prefix="/users")

from endpoints.DietEndpoint import diet
app.register_blueprint(diet, url_prefix="/diet")

from endpoints.OpenAIEndpoint import OpenAI

