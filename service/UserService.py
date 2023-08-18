from utils.DBUtils import DBUtils
from datasource.dto.UserDto import UserDto
from datasource.dto.LoginDto import LoginDto


class UserService:
    dBUtil = DBUtils()

    def registerUser(self, dto):
        user = UserDto.getJson(dto)
        return self.dBUtil.insertUser(user)

    def login(self, dto):
        user = LoginDto.getJson(dto)
        username = user["username"]
        password = user["password"]
        if username is not None and username != "" and password is not None and password != "":
            user = self.dBUtil.findUserByUsername(username)
            if user is not None:
                if password == dto.password:
                    print("login successful")
                    return user
                else:
                    print("User with username/password does not exist.")
                    return None
            else:
                print("User not found.")
                return None

        return None

    def findById(self, id):
        pass

    def findAll(self):
        pass

    def updateUser(self, id, dto):
        pass

    def findByUsername(self, username):
        pass

    def findAllByType(self, type):
        pass

    def findByEmail(self, email):
        pass
















