import json
from django.shortcuts import HttpResponse
from utils import loggedin, get_db
from datetime import datetime
from bson import json_util
from bson.objectid import ObjectId
from django.views.decorators.csrf import csrf_exempt

db = get_db()

@csrf_exempt
def createLabel(request):
    try:
        if request.method == "POST":
            user = loggedin(request)
            
            if user:
                data = request.POST
                
                newLabel = {
                    "user": ObjectId(user["_id"]),
                    "name": data["newLabelName"],
                    "timestamp": datetime.now(),
                }
                
                label = db.labels.insert_one(newLabel)

                newLabel.update({"_id": label.inserted_id})
                
                return HttpResponse(json_util.dumps(newLabel))   
            
            else:
                return HttpResponse("Unauthorized access!", status=401)        
        
    except Exception as e:
        return HttpResponse("Internal server error!")
   

def getNotes(request):
    try:
        if request.method == "GET":
            user = loggedin(request)
            
            if user:
                labelId = ObjectId(request.GET["labelId"])
                
                notes = db.notes.find({
                    "labels": {"$in": [labelId]}
                })
                
                return HttpResponse(json_util.dumps(notes))
            
    except Exception as e:
        return HttpResponse("Internal server error!")   
 

def getLabels(request):
    try:
        user = loggedin(request)
        
        if user:            
            labels = db.labels.find({"user":ObjectId(user["_id"])})
            
            return HttpResponse(json_util.dumps(labels))
        
        else:
            return HttpResponse("Not logged in!", status=401)
            
    except Exception as e:
        return HttpResponse("Internal server error!")
    

@csrf_exempt
def editLabel(request):
    try:
        if request.method == "PUT":
            user = loggedin(request)
            
            if user:
                data = json.loads(request.body)
                
                newLabelData = {
                    "name":data["name"]
                }
                
                db.labels.update_one({"_id": ObjectId(data["labelId"])}, {
                    "$set": newLabelData
                })
                
                return HttpResponse("Label updated")
            
            else:
                return HttpResponse("Unauthorized access!", status=401)
            
    except Exception as e:
        return HttpResponse("Internal server error!")


@csrf_exempt
def deleteLabel(request):
    try:
        if request.method == "DELETE":
            user = loggedin(request)
            
            if user:
                data = json.loads(request.body)
                labelId = ObjectId(data["labelId"])
                
                
                db.labels.delete_one({"_id": ObjectId(data["labelId"])})
                
                # Remove this label from all the documents that contains this label
                db.notes.update_one({
                    "labels": {"$in": [labelId]}
                }, {
                    "$pull": {'labels': labelId}
                })
                
                
                return HttpResponse("Label deleted")
            
            else:
                return HttpResponse("Unauthorized access!", status=401)
            
    except Exception as e:
        return HttpResponse("Internal server error!", status=500)
    

def getNotesLength(request):
    try:
        if request.method == "GET":
            user = loggedin(request)
            
            if user:
                labelId = ObjectId(request.GET['labelId'])
                
                notes = db.notes.find({
                    "labels": {"$in": [labelId]}
                })
                
                
                return HttpResponse(len(list(notes)))
            
    except Exception as e:
        return HttpResponse("Internal server error!")


def getLabel(request):
    try:
        if request.method == "GET":
            user = loggedin(request)
            
            if user:
                labelId = ObjectId(request.GET['labelId'])
                
                label = db.labels.find_one({
                    "_id": ObjectId(labelId)
                })
                
                
                return HttpResponse(json_util.dumps(label))
            else:
                return HttpResponse("Unauthorized access!", status=401)
            
    except Exception as e:
        return HttpResponse("Internal server error!", status=500)
    