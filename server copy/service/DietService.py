from utils.DBUtils import DBUtils

class DietService:
    dBUtils = DBUtils()

    def createMealPlan(self, dto):
        userID = dto.userID
        user = self.dBUtils.findUserById(userID)
        if user is None:
            return f"User with id {userID} does not exist."

        return self.dBUtils.insertMealPlan(dto.getJson())

    def findMealPlans(self, userID):
        print(userID)
        return self.dBUtils.getDietPlans(userID)


