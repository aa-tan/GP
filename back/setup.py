from flask import Flask
from flask import request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/post", methods = ['POST'])
def post_route():
    if request.method == 'POST':
        authenticate(request.form)
        print(request.data)
        return "True"
    elif request.method == 'GET':
        return "get"
def authenticate(body):
    pass
