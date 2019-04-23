import json
def bytes_to_object(bytestring):
    string = bytestring.decode("utf-8")
    obj = json.loads(string)
    return obj

