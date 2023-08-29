
class UserDto():

    def __init__(self):
        self.username = None
        self.email = None
        self.password = None

    def getJson(self):
        model = {
            "email": self.email,
            "username": self.username,
            "password": self.password,
        }
        return model
