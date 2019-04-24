from flask import Flask
from flask import request
from flask_cors import CORS
from util import *
from db import *


app = Flask(__name__)

#CORS(app)

@app.route("/authenticate", methods = ['POST'])
def login_process():
    data = bytes_to_object(request.data)
    if request.method == 'POST':
        if check_credentials(data):
            if check_behavior(data):
                return "True"
        return "False"
    return "Error"

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/post", methods = ['POST'])
def post_route():
    if request.method == 'POST':
        data = bytes_to_object(request.data)
        if authenticate(data):
            saveData(data)
            print(data)
            return "True"
    return "False"

@app.route("/add", methods= ['POST'])
def train_db():
    if request.method == 'POST':
        data = bytes_to_object(request.data)
        saveData(data)
        return "Redirect"

