import json
from django.shortcuts import render, HttpResponse
from utils import get_db, loggedin
from django.views.decorators.csrf import csrf_exempt
from bson import json_util
import jwt
from notemaster.settings import SECRET_KEY

db = get_db()

def getUser(request):
    try:
        if request.method == "GET":
            user = loggedin(request)
            
            if user:
                return HttpResponse(json.dumps(user))
            
            else:
                return HttpResponse("Unauthorized access!")
        
    except Exception as e:
        print(e)
        return HttpResponse("Internal server error")


@csrf_exempt
def create_user(request):
    try:
        if request.method == "POST":
            # TODO: Create hash of the password
            password = request.POST["password"]
            
            newUserData = {
                "firstName":request.POST["firstName"],
                "lastName":request.POST["lastName"],
                "email":request.POST["email"],
                "password":password,
                'userId':f"{request.POST['firstName']}{len(list(db.users.find()))}",
            }
            
            # Insert new user to the database
            user = db.users.insert_one(newUserData)
            
            return HttpResponse(json_util.dumps(user.inserted_id))
        
    except Exception as e:
        print(e)
        return HttpResponse("Internal server error")
    

    
@csrf_exempt
def login_user(request):
    try:
        if request.method == "POST":
            # TODO: Create hash of the password
            password = request.POST["password"]
            
            query = {
                "email":request.POST["email"],
                "password":password,
            }
            
            # Insert new user to the database
            user = db.users.find_one(query, {'password': 0})
            
            if user:
                user["_id"] = str(user["_id"])
                
                # Encode user payload using json web tokens
                auth_token = jwt.encode(payload=user, key=SECRET_KEY)
                
                return HttpResponse(auth_token)
            
            else:
                return HttpResponse("Invalid credentials") 
        
    except Exception as e:
        return HttpResponse("Internal server error")


    
@csrf_exempt
def delete_user(request):
    try:
        if request.method == "DELETE":
            user = loggedin(request)
            
            if user:         
                # TODO: Create hash of password
                data = json.loads(request.body)
                
                password = data["password"]
                
                db.users.delete_one({"password":password})
                
                
                return HttpResponse("User deleted")
            
            else:
                return HttpResponse("Authentication failed!") 
        
    except Exception as e:
        return HttpResponse("Internal server error")
    