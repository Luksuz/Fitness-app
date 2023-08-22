

class UserLifestyleDto:

    def __init__(self):
        self.userID = None
        self.maintananceCalories = None
        self.goal = None
        self.cutBulkRate = None
        self.workoutExperience = None
        self.healthIssues = None

    def getJson(self):
        model = {
            "userID": self.userID,
            "maintananceCalories": self.maintananceCalories,
            "goal": self.goal,
            "cutBulkRate": self.cutBulkRate,
            "workoutExperience": self.workoutExperience,
            "healthIssues": self.healthIssues
        }
        return model

    def __str__(self):
        return str(self.getJson())