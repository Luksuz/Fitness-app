from utils.DBUtils import DBUtils
from datasource.dto.UserPlanDto import UserPlanDto

class UserPlanService():
    dBUtils = DBUtils()

    def insertUserPlan(self, userPlanDto):
        user = self.dBUtils.insertUserPlan(userPlanDto.getJson())
        return user

    def findUserPlans(self, userID):
        print(userID)
        return self.dBUtils.getUserPlans(userID)


