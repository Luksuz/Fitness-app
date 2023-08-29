from flask import Blueprint, request, Response
from datasource.dto.UserDto import UserDto
from datasource.dto.LoginDto import LoginDto
from service.UserService import UserService
from service.UserPlanService import UserPlanService
from datasource.dto.UserPlanDto import UserPlanDto
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
    @users.route("/insertPlan", methods=['POST'])
    def insertUserPlan():
        userPlanDto = UserPlanDto()
        userPlanService = UserPlanService()
        userPlanDto.userID = request.json["userID"]
        userPlanDto.maintananceCalories = request.json["maintananceCalories"]
        userPlanDto.goal = request.json["goal"]
        userPlanDto.cutBulkRate = request.json["cutBulkRate"]
        userPlanDto.workoutExperience = request.json["workoutExperience"]
        userPlanDto.healthIssues = request.json["healthIssues"]
        userPlanDto.trainingPlan = request.json["trainingPlan"]
        userPlanDto.dietPlan = request.json["dietPlan"]
        userPlanService.insertUserPlan(userPlanDto)
        return ResponseUtil.buildResponse("User plan inserted successfully.")


    @staticmethod
    @users.route("/getPlans/<id>", methods=['GET'])
    def getUserPlan(id):
        userPlanService = UserPlanService()
        userPlans = userPlanService.findUserPlans(id)
        print("user plans: ", userPlans)
        return ResponseUtil.buildResponse(userPlans)

    @staticmethod
    @users.route("/login", methods=['POST'])
    def login():
        user = LoginDto()
        user.username = request.json["username"]
        user.password = request.json["password"]
        loggedUser = userService.login(user)
        return ResponseUtil.buildResponse(loggedUser)

    @staticmethod
    @users.route("/changePassword", methods=['PUT'])
    def changePassword():
        id = request.json["id"]
        password = request.json["password"]
        user = userService.changePassword(id, password)
        return ResponseUtil.buildResponse(user)


    @staticmethod
    @users.route('/deleteUser', methods=['DELETE'])
    def deleteUser():
        id = request.json["id"]
        password = request.json["password"]
        deletedUser = userService.deleteUser(id, password)
        return ResponseUtil.buildResponse(deletedUser)





















