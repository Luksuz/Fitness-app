
class DietDto:
    def __init__(self):
        self.userID = None
        self.calories = None
        self.foods = None

    def getJson(self):
        model = {
            "userID": self.userID,
            "calories": self.calories,
            "foods": self.foods
        }
        return model


    def __str__(self):
        return "MealPlanDto [calories=" + str(self.calories) + ", foods=" + str(self.foods) + "]"