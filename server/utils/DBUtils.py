from pymongo import MongoClient
from bson import ObjectId

connection_string = "mongodb+srv://admin:admin@lukacluster.cf5yzeq.mongodb.net/fitnessAppDB?retryWrites=true&w=majority"

class DBUtils():

    def __init__(self):
        self.client = client = MongoClient(connection_string)
        self.db = client['fitnessAppDB']
        self.users_collection = self.db['users']
        self.diet_plans_collection = self.db['userPlans']

    def insertUser(self, user):
        self.users_collection.insert_one(user)
        return user

    def findUserByUsername(self, username):
        user = self.users_collection.find_one({"username": username})
        return user

    def findUserById(self, id):
        user = self.users_collection.find_one({"_id": id})
        return user

    def insertUserPlan(self, userPlanDto):
        self.diet_plans_collection.insert_one(userPlanDto)
        return userPlanDto

    def getUserPlans(self, userID):
        dietPlansCursor = self.diet_plans_collection.find({"userID": userID})
        dietPlansList = list(dietPlansCursor)
        return dietPlansList
    
    def changePassword(self, id, password):
        userData = self.users_collection.update_one({"_id": ObjectId(id)}, {"$set": {"password": password}})
        if userData:
            return "Password changed successfully."
        if userData.matched_count == 0:
            print("No user found with the given ID")
        return None
    
    def deleteUser(self, id, password):
        validatedUser = self.validatePassword(id, password)
        if validatedUser:
            userData = self.users_collection.delete_one({"_id": ObjectId(id)})
            self.deleteUserPlans(id)
            if userData:
                return "User deleted successfully."
            if userData.deleted_count == 0:
                print("No user found with the given ID")
        return None
    
    def validatePassword(self, id, password):
        user = self.users_collection.find_one({"_id": ObjectId(id)})
        if user["password"] == password:
            return True
        return False
    
    def deleteUserPlans(self, id):
        userData = self.diet_plans_collection.delete_many({"userID": ObjectId(id)})
        if userData:
            return "User plans deleted successfully."
        return None