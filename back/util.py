import json
import random
def bytes_to_object(bytestring):
    string = bytestring.decode("utf-8")
    obj = json.loads(string)
    return obj

def random_password():
    with open("./10-million-password-list-top-1000.txt") as f:
        lines = f.readlines()
        partone = random.choice(lines)[:-1]
        parttwo = random.choice(lines)[:-1]
        return partone+parttwo
