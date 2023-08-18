
class UserDto():

    def __init__(self):
        self.username = None
        self.email = None
        self.age = None
        self.password = None

    def getJson(self):
        model = {
            "email": self.email,
            "username": self.username,
            "age": self.age,
            "password": self.password,
        }
        return model

    @staticmethod
    def mapFromEntity(entity):
        dto = UserDto()
        print(entity)
        dto.username = entity.username
        dto.email = entity.email
        dto.age = entity.age
        dto.password = entity.password
        return dto