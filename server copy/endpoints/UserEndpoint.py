from flask import Blueprint, request, Response
from datasource.dto.UserDto import UserDto
from datasource.dto.LoginDto import LoginDto
from service.UserService import UserService
from utils.ResponseUtil import ResponseUtil
import json

users = Blueprint('users', __name__)
userService = UserService()

class UserEndpoint:

    @staticmethod
    @users.route("/registration", methods=['POST'])
    def createUser():
        user = UserDto()
        user.username = request.json["username"]
        user.email = request.json["email"]
        user.password = request.json["password"]
        registeredUser = userService.registerUser(user)
        return ResponseUtil.buildResponse(registeredUser)

    @staticmethod
    @users.route("/<int:id>", methods=['GET'])
    def getUserById(id):
        pass


    @staticmethod
    @users.route("/<int:id>", methods=['PUT'])
    def updateUser(id):
        pass


    @staticmethod
    @users.route("/login", methods=['POST'])
    def login():
        user = LoginDto()
        user.username = request.json["username"]
        user.password = request.json["password"]
        loggedUser = userService.login(user)
        return ResponseUtil.buildResponse(loggedUser)

    @staticmethod
    @users.route("/test-token", methods=['GET'])
    def testToken():
        pass


    @staticmethod
    @users.route('/test-user-type', methods=['GET'])
    def testUserType():
        pass




















