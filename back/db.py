# Library imports
import os
import urllib.parse
from pymongo import MongoClient

# Local imports
from config import *

# Formatting DB username and password
username = urllib.parse.quote_plus(DB_USER)
password = urllib.parse.quote_plus(DB_PWD)

# Connecting to DB client with credentials & URI
client = MongoClient(f"mongodb://{username}:{password}@{os.getenv('DB_SERVICE', 'localhost')}:{int(os.getenv('DB_PORT', 27017))}")
# Accessing GP database
db = client.gp


# TODO: Authentication task for logging in
def authenticate(body):
    return True

# Saves data to collection
def save_data(data):
    users = db.users
    collection_name = f"{data['username']}_{data['OS']}"
    collection = db[collection_name]
    collection.insert_one(data)

# Creates a new user in collection
def create_user(name, pword):
    users = db.users
    users.insert_one({"username":name, "password":pword});
    return users.find_one({"username":name})

# Checks if credentials matches those in collection
def check_credentials(data):
    users = db.users
    user = users.find_one({"username":data['username']})
    if user and user['password'] == data['password']:
        return True
    return False

# TODO: Checks behavior patterns
def check_behavior(data):
    return True
