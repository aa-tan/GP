from flask import Flask
from flask import request
from util import *
from db import *


app = Flask(__name__)

@app.route("/authenticate", methods = ['POST'])
def login_process():
    data = bytes_to_object(request.data)
    if request.method == 'POST':
        if check_credentials(data):
            if check_behavior(data):
                client.close()
                return "True"
        client.close()
        return "False"
    client.close()
    return "Error"

@app.route("/train", methods= ['POST'])
def train_db():
    if request.method == 'POST':
        data = bytes_to_object(request.data)
        if check_credentials(data):
            save_data(data)
            client.close()
            return "True"
        else:
            client.close()
            return "False"

@app.route("/new_user", methods= ['POST'])
def new_user():
    if request.method == 'POST':
        data = bytes_to_object(request.data)
        password = random_password()
        res = create_user(data['username'], password)
        client.close()
        return '{{"username": "{}", "password": "{}"}}'.format(res['username'], res['password'])
    else:
        client.close()
        return "False"
