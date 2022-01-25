import json
from django.shortcuts import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
from utils import get_db, loggedin
from bson import json_util
from bson.objectid import ObjectId

db = get_db()


def createNote(request):
    try:
        if request.method == 'POST':
            user = loggedin(request)
            
            # If the user is logged in
            if user:            
                # TODO : Save attachments and add the src to newNote dict
                newNote = {
                    "user":ObjectId(user["_id"]),
                    "title": request.POST["newNoteTitle"],
                    "note": request.POST["newNote"],
                    "timestamp": datetime.now().strftime("%d %B, %Y at %I:%M %p"),
                    "createdDate": datetime.now().strftime("%d %B, %Y"),
                    "createdTime": datetime.now().strftime("%I:%M %p"),
                }
                
                note = db.notes.insert_one(newNote)
                
                # Add the id of inserted note to the newNote dict
                newNote.update({"_id":ObjectId(note.inserted_id)})
                
                
                return HttpResponse(json_util.dumps(newNote))
            else:
                return HttpResponse("Unauthorized access!", status=401)
            
        
    except Exception as e:
        return HttpResponse("Internal server error")
    


def deleteNote(request):
    try:
        if request.method == 'DELETE':
            user = loggedin(request)
            
            # If the user is logged in
            if user:
                noteId = json.loads(request.body)["noteId"]
                
                db.notes.delete_one({"_id": ObjectId(noteId)})
                
                return HttpResponse("Note Deleted")
            
            else:
                return HttpResponse("Unauthorized access!", status=401)
            
        
    except Exception as e:
        return HttpResponse("Internal server error")
    


def editNote(request):
    try:
        if request.method == 'PUT':
            user = loggedin(request)
            
            # If the user is logged in
            if user:
                data = json.loads(request.body)

                noteId = data["noteId"]
                title = data["title"]
                note = data["note"]
                
                db.notes.update_one({"_id": ObjectId(noteId)}, {
                    "$set": {
                        "title":title,
                        "note": note,
                    }
                })
                
                return HttpResponse("Note Updated")
            else:
                return HttpResponse("Unauthorized access!", status=401)
            
        
    except Exception as e:
        return HttpResponse("Internal server error")
    


def getNotes(request):
    try:
        if request.method == 'GET':
            user = loggedin(request)
            
            # If the user is logged in
            if user:  
                notes = db.notes.find({"user": ObjectId(user["_id"])})
                
                return HttpResponse(json_util.dumps(notes))
            
            else:
                return HttpResponse("Unauthorized access!", status=401)
            
        
    except Exception as e:
        return HttpResponse("Internal server error")
    


def addToLabel(request):
    try:
        if request.method == 'PUT':
            user = loggedin(request)
            
            # If the user is logged in
            if user:  
                data = json.loads(request.body)
                
                noteId = ObjectId(data["noteId"])
                labelId = ObjectId(data["labelId"])
                
                db.notes.update_one({"_id":noteId}, {
                    "$addToSet": {"labels": labelId}
                })
                
                return HttpResponse(noteId)
            
            else:
                return HttpResponse("Unauthorized access!", status=401)
            
        
    except Exception as e:
        return HttpResponse("Internal server error")



def removeFromLabel(request):
    try:
        if request.method == 'DELETE':
            user = loggedin(request)
            
            # If the user is logged in
            if user:  
                data = json.loads(request.body)
                
                noteId = ObjectId(data["noteId"])
                labelId = ObjectId(data["labelId"])
                
                db.notes.update_one({"_id":noteId}, {
                    "$pull": {"labels": labelId},
                })
                
                return HttpResponse(noteId)
            
            else:
                return HttpResponse("Unauthorized access!", status=401)
            
        
    except Exception as e:
        return HttpResponse("Internal server error")
    
def searchNotes(request):
    try:
        if request.method == 'GET':
            user = loggedin(request)
            
            # If the user is logged in
            if user:  
                query = request.GET["query"].lower()
                
                notes = db.notes.find({
                    "$or": [
                        {"title": {"$regex": f".*{query}.*", "$options": "i"}},
                        {"note": {"$regex": f".*{query}.*", "$options": "i"}},
                    ]
                })
                
                
                return HttpResponse(json_util.dumps(notes))
            else:
                return HttpResponse("Unauthorized access!", status=401)
            
        
    except Exception as e:
        return HttpResponse("Internal server error")