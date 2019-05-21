import os
from pymongo import MongoClient

client = MongoClient(os.getenv('DB_SERVICE', 'localhost'), int(os.getenv('DB_PORT', 27017)))
db = client.gp

def authenticate(body):
    return True

def save_data(data):
    users = db.users
    collection_name = f"{data['username']}_{data['OS']}"
    collection = db[collection_name]
    collection.insert_one(data)


def create_user(name, pword):
    users = db.users
    users.insert_one({"username":name, "password":pword});
    return users.find_one({"username":name})


def check_credentials(data):
    users = db.users
    user = users.find_one({"username":data['username']})
    if user and user['password'] == data['password']:
        return True
    return False

def check_behavior(data):
    return True
