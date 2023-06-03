from fastapi import APIRouter
from fastapi.requests import Request
import os
# from pydantic import BaseModel
# from .config import fire_auth
# import json
router = APIRouter()
# class LoginUser(BaseModel):
#     email:str;passwd:str;    
# class SignupUser(BaseModel):
#     username:str;email:str;password:str;    
    
# @router.post('/api/auth/signup',)
# def signup(req: SignupUser):    
#     try : 
#         user = fire_auth.create_user_with_email_and_password(req.email,req.passwd) 
#         print(user)
#         res = {"success":True,'session_id':user['idToken'],'uid':user['localId'],'error':"none"}
#     except Exception as e :
#         m = json.loads(e.strerror)["error"]["message"]
#         res = {"success":False,'error':m}       
#         print(type(e.strerror))
#     return res    
# @router.post('/api/auth/login',)
# def login(req:LoginUser):
#     # print(req)
#     res={}   
#     try :
#         user = fire_auth.sign_in_with_email_and_password(req.email,  req.passwd)      
#         # res = {"success":True,'session_id':user['idToken'],'error':"none"}
#         res = {'user':user}
#     except :
#         res = {"success":False,'error':"Invalid Cradentils"}
#     return res



from fastapi import FastAPI, Depends
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2AuthorizationCodeBearer
from dotenv import load_dotenv
import httpx
load_dotenv()
@router.get("/api/auth/google")
async def auth_google(request: Request = None):
    try:code = request.query_params.get("code")
    except:code=None
    if code is None:
        # Redirect the user to Google's authorization page
        redirect_uri = "http://localhost:8000/api/auth/google"
        auth_url = f"https://accounts.google.com/o/oauth2/auth?response_type=code&client_id={os.getenv('GOOGLE_CLIENT_ID')}&redirect_uri={redirect_uri}&scope=openid%20email%20profile"
        return RedirectResponse(auth_url)
    else:
        # Exchange the authorization code for an access token
        token_url = "https://accounts.google.com/o/oauth2/token"
        redirect_uri = "http://localhost:8000/api/auth/google"
        data = {
            "code": code,
            "client_id": os.getenv("GOOGLE_CLIENT_ID"),
            "client_secret": os.getenv("GOOGLE_CLIENT_SECRET"),
            "redirect_uri": redirect_uri,
            "grant_type": "authorization_code",
        }
        async with httpx.AsyncClient() as client:
            response = await client.post(token_url, data=data)
            token_data = response.json()
            access_token = token_data["access_token"]
            
            # Retrieve user information from the access token
            userinfo_url = "https://www.googleapis.com/oauth2/v1/userinfo"
            headers = {"Authorization": access_token}
            # response = await client.get(userinfo_url, headers=headers)
            # user_info = response.json()

            return RedirectResponse(url =f'/base/home/?auth={access_token}',headers=headers)
        
# @router.get('/auth/google/callback/')
# async def callback(request: Request):
#     code = request.query_params.get("code")
#     print('code')
#     token_url = "https://accounts.google.com/o/oauth2/token"
#     redirect_uri = "http://localhost:8000/auth/google/callback"

#     data = {
#             "code": code,
#             "client_id": os.getenv("GOOGLE_CLIENT_ID"),
#             "client_secret": os.getenv("GOOGLE_CLIENT_SECRET"),
#             "redirect_uri": redirect_uri,
#             "grant_type": "authorization_code",
#         }
#     async with httpx.AsyncClient() as client:
#         response = await client.post(token_url, data=data)
#         token_data = response.json()
#         return RedirectResponse('/base/home',headers="token")
#         return{"token":token_data}
#         access_token = token_data["access_token"]
        
#         # Retrieve user information from the access token
#         userinfo_url = "https://www.googleapis.com/oauth2/v1/userinfo"
#         headers = {"Authorization": f"Bearer {access_token}"}
#         response = await client.get(userinfo_url, headers=headers)
#         user_info = response.json()
        
#         # You can process the user information or store it in the session as needed
#         # ...
#         print(user_info)
#         # Return a response to the client
#         return {"access_token": access_token}



    # credentials = flow.credentials

    # You can now use the `credentials` to access the user's information

    # return "Success"