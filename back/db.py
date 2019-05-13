from pymongo import MongoClient
client = MongoClient()
db = client.gp

def authenticate(body):
    return True

def save_data(data):
    users = db.users
    user_id = users.find_one({"username":data["username"]})["_id"]
    user_data = db[str(user_id)]
    user_data.insert_one(data)


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
