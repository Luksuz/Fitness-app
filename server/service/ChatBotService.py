from utils.DBUtils import DBUtils
import excersisesData as excersises
from datasource.dto.UserPlanDto import UserPlanDto
import openai

# api config
from dotenv import load_dotenv
import os
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

class ChatBotService:
    dBUtils = DBUtils()
    def interactWithChatbot(self, messagesHistory):
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messagesHistory
        )
        message = response.choices[0].message
        print(message.content)
        if ":" in message.content:
            print("entered extracting preferences")
            preferencesDto = self.extractPreferences(message.content)
            print(preferencesDto)
            dietPlan = self.createDietPlan(preferencesDto)
            trainingPlan = self.createTrainingPlan(preferencesDto)
            return (message, 
                    dietPlan, 
                    trainingPlan, 
                    preferencesDto.maintananceCalories, 
                    preferencesDto.goal, 
                    preferencesDto.cutBulkRate, 
                    preferencesDto.workoutExperience, 
                    preferencesDto.healthIssues)
        else:
            return message, None, None, None, None, None, None, None

    # helper method to extract preferences from chatbot response
    def extractPreferences(self, lastMessage):
        userPlanDto = UserPlanDto()
        userPlanDto.maintananceCalories = lastMessage.split(":")[2].strip("Goal")
        userPlanDto.goal = lastMessage.split(":")[3].strip("Cut/Bulk Rate")
        userPlanDto.cutBulkRate = lastMessage.split(":")[4].strip("Workout Experience")
        userPlanDto.workoutExperience = lastMessage.split(":")[5].strip("Health Issues")
        for i in lastMessage.split(":")[6]:
            string = ""
            if i == "/":
                userPlanDto.healthIssues = string
                break
            else:
                string += i
        print(userPlanDto)
        return userPlanDto

    def createTrainingPlan(self, userLifestyleDto):
        """userID = userLifestyleDto.userID
        user = self.dBUtils.findUserById(userID)
        if user is None:
            return f"User with id {userID} does not exist."
        else:"""
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=f"You are a personal trainer and based on users daily activity and preferences "
                    f"you have to create their training plan based on their preferences and health issues."
                    f"these are the available excersises: {excersises}"
                    f"Here are some exapmles of training plans:"
                    f"###"
                    f"Workout Experience: advanced"
                    f"Health Issues: none"
                    f"Workout Plan:"
                    """Bro Split
                    Day 1: 
                        Excersise 1: Bench Press
                        Sets: 4
                        Reps: 8
                    Excersise 2: Incline Bench Press
                        Sets: 4
                        Reps: 8
                    Excersise 3: Dumbbell Flyes
                        Sets: 4
                        Reps: 10-12
                    Excersise 4: Cable Flyes
                        Sets: 4
                        Reps: 12-15
                    Excersise 5: Dips
                        Sets: 4
                        Reps: 12-15
                    Excersise 6: Push Ups
                        Sets: 4
                        Reps: max

                    Day 2: 
                        Excersise 1: Deadlift
                            Sets: 4
                            Reps: 6-8
                        Excersise 2: Barbell Row
                            Sets: 4
                            Reps: 8-10
                        Excersise 3: T-Bar Row
                            Sets: 4
                            Reps: 10-12
                        Excersise 4: Lat Pulldown
                            Sets: 5
                            Reps: 10-12
                        Excersise 5: Seated Cable Row
                            Sets: 5
                            Reps: 12-15
                    Day 3: 
                        Excersise 1: Squat
                            Sets: 4
                            Reps: 6-8
                        Excersise 2: Romanian Deadlift
                            Sets: 4
                            Reps: 6-8
                        Excersise 3: Leg Press
                            Sets: 4
                            Reps: 8-10
                        Excersise 4: Leg Extension
                            Sets: 4
                            Reps: 10-12
                        Excersise 5: Leg Curl
                            Sets: 5
                            Reps: 10-12
                        Excersise 6: Calf Raises
                            Sets: 5
                            Reps: 12-15
                    Day 4: 
                        Excersise 1: Overhead Pres
                            Sets: 4
                            Reps: 6-8
                        Excersise 2: Arnold Press
                            Sets: 4"
                            Reps: 8-10
                        Excersise 3: Lateral Raises
                            Sets: 4
                            Reps: 10-12
                        Excersise 4: Front Raises
                            Sets: 4
                            Reps: 10-12
                        Excersise 5: Rear Delt Flyes
                            Sets: 4
                            Reps: 10-12
                        Excersise 6: Dumbell Shrugs
                            Sets: 4
                            Reps: 10-12
                    Day 5: 
                        Excersise 1: Barbell Curl
                            Sets: 4
                            Reps: 10-12
                        Excersise 3: Hammer Curl
                            Sets: 4
                            Reps: 10-12
                        Excersise 2: Concentration Curl
                            Sets: 4
                            Reps: 10-15
                        Excersise 4: Skullcrusher
                            Sets: 4
                            Reps: 10-12
                        Excersise 5: Tricep Pushdown
                            Sets: 4
                            Reps: 10-12
                        Excersise 6: Tricep Extension
                            Sets: 4
                            Reps: 10-12"""
                    f"###"
                    f"Workout Experience: none"
                    f"Health Issues: lower back pain"
                    f"Workout Plan:"
                    """Full Body
                    Day 1: 
                        Excersise 1: Bench Press
                            Sets: 4
                            Reps: 8-10"
                        Excersise 2: Pec Deck
                            Sets: 4
                            Reps: 12-10
                        Excersise 3: Barbell Row
                            Sets: 4
                            Reps: 8-10
                        Excersise 4: Pull Ups
                            Sets: 4
                            Reps: max
                        Excersise 5: Lunges
                            Sets: 4
                            Reps: 10-12
                        Excersise 6: Leg Curl
                            Sets: 4
                            Reps: 10-12
                    Day 2: 
                        Excersise 1: (normally this excersise would be Deadlift but due to lower back pain the excersise will be replaced with Rack Pulls)Rack Pulls
                            Sets: 4
                            Reps: 8-10
                        Excersise 2: Lat Pulldown
                            Sets: 4
                            Reps: 10-12
                        Excersise 3: Incline dumbell press
                            Sets: 4
                            Reps: 10-12
                        Excersise 4: Dips
                            Sets: 4
                            Reps: 12-15
                        Excersise 5: Bulgarian Split Squat
                            Sets: 4
                            Reps: 10-12
                        Excersise 6: Leg Extension
                            Sets: 4
                            Reps: 10-12
                    Day 3: 
                        Excersise 1: Squat
                            Sets: 4
                            Reps: 6-8
                        Excersise 2: Leg Curl
                            Sets: 4
                            Reps: 10-12
                        Excersise 3: Overhead Press
                            Sets: 4
                            Reps: 8-10
                        Excersise 4: Lateral Raises
                            Sets: 4
                            Reps: 10-12
                        Excersise 5: Rear Delt Flyes
                            Sets: 4
                            Reps: 10-12
                        Excersise 6: T-Bar Row
                            Sets: 4
                            Reps: 10-12
                        Excersise 7: Pull Ups
                            Sets: 4
                            Reps: max"""
                    "###"
                    f"Workout Experience: {userLifestyleDto.workoutExperience}"
                    f"Health Issues: {userLifestyleDto.healthIssues}"
                    f"Workout Plan:",
            max_tokens=2000,
            temperature=0
            )
        message = response.choices[0].text
        print(message)
        return message

    def createDietPlan(self, userLifestyleDto):
        """userID = userLifestyleDto.userID
        user = self.dBUtils.findUserById(userID)
        if user is None:
            return f"User with id {userID} does not exist."
        else:"""
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=f"You are a dietician and based on users daily calories you have to create their meal plan based on their preferences."
                f"dont use any exotic or expensive foods."
                
                f"###"
                f"maintanance calories: 2000"
                f"foodPreferences: vegan"
                f"goal: cut"
                f"cut/bulk rate: 0.2 kg/week"
                f"meal plan:  "
            """Breakfast:
                Oatmeal (dry weight) - 50g (~190 calories)
                Topped with:
                    Bananas - 100g (96 calories)
                    Almonds - 20g (109 calories)
                    
                    Chia seeds - 10g (49 calories)
                    
                Total Breakfast Calories: ~451 calories
    
            Mid-Morning Snack:
                Carrots - 100g (41 calories)
                Hummus - 35g (116 calories)
                
                Total Mid-Morning Snack Calories: ~157 calories
    
            Lunch:
                Quinoa - 50g (180 calories)
                Lentils - 50g (165 calories)
                Broccoli - 100g (34 calories)
                Bell Peppers - 100g (20 calories)
                Olive Oil (for dressing) - 10g (80 calories)
                
                Total Lunch Calories: ~478 calories
    
            Afternoon Snack:
                Apples - 150g (78 calories)
                Walnuts - 20g (131 calories)
                
                Total Afternoon Snack Calories: ~209 calories
    
            Dinner:
                Brown Rice(dry weight) - 50g (175 calories)
                Black Beans(dry weight) - 50g (140 calories)
                Avocado - 75g (120 calories)
                Kale - 100g (49 calories)
                Mushrooms - 100g (22 calories)
                
                Total Dinner Calories: ~506 calories
            
            Grand Total Daily Calories: ~1698 calories
            """
            f"###"
            f"maintanaance calories: 2000"
            f"foodPreferences: None"
            f"goal: bulk"
            f"cut/bulk rate: 1 kg/week"
            f"meal plan:  "
            """
            Breakfast:
                Oatmeal (dry weight) - 70g (~266 calories)
                    Topped with:
                        Bananas - 100g (96 calories)
                        Almonds - 20g (~116 calories)
                        Chia seeds - 15g (73 calories)
                        Honey - 1 tbsp (64 calories)
                Whole Eggs - 2 large eggs (140 calories)
                Whole Wheat Bread - 2 slices (160 calories)
                    Cooked wih:
                        Olive Oil - 1/2 tbsp (60 calories)
                Breakfast Calories: ~815 calories
                
            Mid-Morning Snack:
                Greek Yogurt - 200g (190 calories)
                Mixed Berries - 150g (60 calories)
                Walnuts - 30g (196 calories) 
                
                Total Snack Calories: ~446 calories
                        
            Lunch:
                Grilled Chicken Breast - 150g (~248 calories)
                Brown Rice - 150g (167 calories)
                Steamed Broccoli - 150g (51 calories)
                Avocado -  (120 calories)
                Olive Oil (for dressing) - 1 tbsp (119 calories) 
                        
                Lunch Calories: ~705 calories
    
            Afternoon Snack:
                Whole Wheat Bread - 2 slices (160 calories)
                Peanut Butter - 2 tbsp (188 calories)
                Milk - 1 cup (150 calories)
                
                Total Snack Calories: ~498 calories
    
            Dinner:
                Salmon - 125g (~306 calories)
                Quinoa - 125g (178 calories)
                Mixed Vegetables (carrots, peas, corn) - 150g (120 calories)
                Butter (for cooking) - 1/2 tbsp (51 calories)
                
                Dinner Calories: ~655 calories
                
            Total Daily Calories: ~3119 calories
            """
            f"###"
            f"calories: {userLifestyleDto.maintananceCalories}"
            f"foodPreferences: None"
            f"goal: {userLifestyleDto.goal}"
            f"cut/bulk rate: {userLifestyleDto.cutBulkRate}"
            f"meal plan: ",
            max_tokens=2000,
            temperature=0
        )
        message = response.choices[0].text
        print(message)
        return message




