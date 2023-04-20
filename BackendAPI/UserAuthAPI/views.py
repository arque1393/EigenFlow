from rest_framework.decorators import api_view
from rest_framework.response import Response
from .authentication import auth, db
from django.contrib.auth import logout
import json

# Create your views here.


@api_view(['post']) 
def signup(req):
    data = req.data   
    uname = data["username"]        
    email=data["email"]
    passwd = data["password"] 
    try : 
        user = auth.create_user_with_email_and_password(email,passwd) 
        print(user)
        res = {"success":True,'session_id':user['idToken'],'uid':user['localId'],'error':"none"}
    except Exception as e :
        m = json.loads(e.strerror)["error"]["message"]
        res = {"success":False,'error':m}       
        print(type(e.strerror))

    return Response(res)


@api_view(['post']) 
def signin(req):
    data = req.data   
    # uname = data["username"]        
    email=data["email"]
    passwd = data["password"]  
    res={}   
    try :
        user = auth.sign_in_with_email_and_password(email,  passwd)        
        res = {"success":True,'session_id':user['idToken'],'error':"none"}
    except :
        res = {"success":False,'error':"Invalid Cradentils"}
    return Response(res)
    
@api_view(['get']) 
def signout(req):
    logout(req)
    return Response({"message":"Logout Success"})