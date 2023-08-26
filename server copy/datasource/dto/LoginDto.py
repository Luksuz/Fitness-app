
class LoginDto:
    def __init__(self):
        self.username = None
        self.password = None

    def getJson(self):
        model = {
            "username": self.username,
            "password": self.password,
        }
        return model
