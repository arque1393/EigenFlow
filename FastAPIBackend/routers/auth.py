from fastapi import APIRouter
from pydantic import BaseModel
from .config import fire_auth
import json
router = APIRouter()
class LoginUser(BaseModel):
    email:str;passwd:str;    
class SignupUser(BaseModel):
    username:str;email:str;password:str;    
    
@router.post('/api/auth/signup',)
def signup(req: SignupUser):    
    try : 
        user = fire_auth.create_user_with_email_and_password(req.email,req.passwd) 
        print(user)
        res = {"success":True,'session_id':user['idToken'],'uid':user['localId'],'error':"none"}
    except Exception as e :
        m = json.loads(e.strerror)["error"]["message"]
        res = {"success":False,'error':m}       
        print(type(e.strerror))
    return res    
@router.post('/api/auth/login',)
def login(req:LoginUser):
    # print(req)
    res={}   
    try :
        user = fire_auth.sign_in_with_email_and_password(req.email,  req.passwd)      
        # res = {"success":True,'session_id':user['idToken'],'error':"none"}
        res = {'user':user}
    except :
        res = {"success":False,'error':"Invalid Cradentils"}
    return res

