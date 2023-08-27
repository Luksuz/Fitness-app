from pymongo import MongoClient

client = MongoClient('localhost', 27017)  # Connect to the default MongoDB instance running on localhost

# Create or select a database
db = client['DietAndExerciseApp']

# Create or select collections
users_collection = db['users']
userPlans= db['userPlans']
