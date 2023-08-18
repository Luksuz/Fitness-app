from pymongo import MongoClient

connection_string = "mongodb+srv://admin:admin@lukacluster.cf5yzeq.mongodb.net/fitnessAppDB?retryWrites=true&w=majority"

class DBUtils():

    def __init__(self):
        self.client = client = MongoClient(connection_string)
        self.db = client['fitnessAppDB']
        self.users_collection = self.db['users']
        self.diet_plans_collection = self.db['dietPlans']
        self.exercise_plans_collection = self.db['exercisePlans']

    def insertUser(self, user):
        self.users_collection.insert_one(user)
        return user

    def findUserByUsername(self, username):
        self.users_collection.find_one({"username": username})
        return username

    def findUserById(self, id):
        user = self.users_collection.find_one({"_id": id})
        return user

    def insertMealPlan(self, dietDto):
        self.diet_plans_collection.insert_one(dietDto)
        return dietDto

    def getDietPlans(self, userID):
        dietPlansCursor = self.diet_plans_collection.find({"userID": userID})
        dietPlansList = list(dietPlansCursor)
        print(dietPlansList)
        return dietPlansList