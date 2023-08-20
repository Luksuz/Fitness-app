
class Config():
    SQLALCHEMY_TRACK_MODIFICATIONS = True



class ProdConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///prod_movie_management.sqlite3"
    DEBUG = False
    SECRET_KEY = "a98s7df98a7sd9f87as98df7"

class DevConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///movie_management.sqlite3"
    DEBUG = True
    SECRET_KEY = "a908s7df09as7df0a98sd7f6a5sdf"