from venv import create
from pymongo import MongoClient
from pymongo.server_api import ServerApi
import jwt
from notemaster.settings import SECRET_KEY
import hashlib
from secrets import DB_PASSWORD
from notemaster.settings import DEBUG

def get_db():
    client = None
    if DEBUG == True:
        uri = "mongodb+srv://ashu:" + DB_PASSWORD + "@cluster0.3ofil.mongodb.net/?retryWrites=true&w=majority"

        # Create a new client and connect to the server
        client = MongoClient(uri, server_api=ServerApi('1'))

        # Send a ping to confirm a successful connection
        try:
            client.admin.command('ping')
            db = client["notemaster"]

            return db
            print("Pinged your deployment. You successfully connected to MongoDB!")

        except Exception as e:
            
            return "Unable to connect to databse"

    else:
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