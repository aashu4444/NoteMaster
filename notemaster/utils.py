from venv import create
from pymongo import MongoClient
import jwt
from notemaster.settings import SECRET_KEY
import hashlib

def get_db():
    client = MongoClient('localhost', 27017)
    db = client["notemaster"]
    
    return db

def loggedin(request):
    authToken = request.headers.get("authToken")
    
    if authToken != None:
        try: 
            # Decode user payload
            payload = jwt.decode(authToken, SECRET_KEY, "HS256")
        
            return payload
        except Exception as e:
            return None
    
    else:
        return None


def createHash(plainText):
    hash = hashlib.sha256(bytes(plainText, "utf-8")).hexdigest()
    
    return hash

def checkHash(plainText, hash):
    if hashlib.sha256(bytes(plainText, "utf-8")).hexdigest() == hash:
        return True
    
    else:
        return False