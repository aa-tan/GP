from flask import Flask
from flask import request
from flask_cors import CORS
from util import *
from db import *
from analysis import *
import logging

logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
CORS(app)

@app.route("/authenticate", methods = ['POST'])
def login_process():
    data = bytes_to_object(request.data)
    if request.method == 'POST':
        logging.info("Logging in")
        if check_credentials(data):
            logging.info("Credentials checked")
            if check_behavior(data):
                logging.info("Behavior checked\nLogin Succeeded")
                client.close()
                return "True"
            else:
                client.close()
                return "False"
        client.close()
        return "Invalid"
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
