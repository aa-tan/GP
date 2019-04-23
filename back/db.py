from pymongo import MongoClient
client = MongoClient()
db = client.gp

def authenticate(body):
    return True

def saveData(data):
    user_data = db[data["id"]]
    user_data.insert_one(data)

