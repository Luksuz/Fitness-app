from flask import Blueprint, request, jsonify
import json
from service.UserService import UserService
from datasource.dto.DietDto import DietDto
from utils.ResponseUtil import ResponseUtil
from service.DietService import DietService
from bson import ObjectId

diet = Blueprint("diet", __name__)
userService = UserService()
dietService = DietService()

class DietPlanEndpoint:

    @staticmethod
    @dietBlueprint.route("/<string:mongo_id>/create", methods=["POST"])
    def createMealPlan(mongo_id):
        dietDto = DietDto()
        try:
            obj_id = ObjectId(mongo_id)
        except:
            return ResponseUtil.buildResponse({"error": "Invalid ObjectId"}, code=400)

        dietDto.userID = obj_id
        dietDto.calories = request.json["calories"]
        dietDto.foods = request.json["foods"]
        dietPlan = dietService.createMealPlan(dietDto)
        return ResponseUtil.buildResponse(dietPlan)




    @staticmethod
    @dietBlueprint.route("/<string:mongo_id>/get", methods=['GET'])
    def getUserMealPlans(mongo_id):
        print(mongo_id)
        try:
            obj_id = ObjectId(mongo_id)
            print(obj_id)
        except:
            return ResponseUtil.buildResponse({"error": "Invalid ObjectId"}, code=400)

        dietPlans = dietService.findMealPlans(obj_id)
        if dietPlans:
            return ResponseUtil.buildResponse(dietPlans)
        else:
            notFoundModel = {
                "data": "No diet plans found for this user"
            }
            return ResponseUtil.buildResponse(notFoundModel)
