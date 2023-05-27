from typing import Annotated
from fastapi import UploadFile,APIRouter,Request
import subprocess as sp
from pydantic import BaseModel


from .drive import connectGDrive

from .config import BASE_DIR,fire_store,fire_auth,fire_db as db
router = APIRouter()




class RawCode(BaseModel):
    code:str

@router.post('/api/code/exe_raw')
def exe_raw(req:RawCode):
    code = req.code
    try:
        print(code)
        code_path = str(BASE_DIR/'temp/temp.py')
        print(code_path)
        with open(code_path,'w') as f:
            f.write(code)        
        result = sp.run(["python", code_path],capture_output=True, text=True)
        return {"result":{'output':result.stdout, "error":result.stderr},'success':True,'error':None}
    except:
        return {'result':None, 'success':False,'error':"e"}
    




# @router.post("/code/files/")
# async def create_file(file: Annotated[bytes, File()]):
#     print(file)
#     return {"file_size": len(file)}


class CodeFile(BaseModel):
    headers:dict
    content:str
    filename:str
@router.post("/code/uploadfile/")
async def create_upload_file(req: CodeFile):
    
    token= req.headers['token']
    uid = req.headers['uid']
    # user = fire_auth.get_user(uid=uid)
    fire_store.child("users").child(f'{uid}').child(f'{req.filename}').upload(file = req.content, _from = 'string', token=token)
    return {"filename": req.filename}




@router.post('/code/getx/')
async def store(req:Request):
    token="eyJhbGciOiJSUzI1NiIsImtpZCI6IjFiYjI2MzY4YTNkMWExNDg1YmNhNTJiNGY4M2JkYjQ5YjY0ZWM2MmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZWlnZW5mbG93MXgiLCJhdWQiOiJlaWdlbmZsb3cxeCIsImF1dGhfdGltZSI6MTY4NDM4NjMzNiwidXNlcl9pZCI6IlZETjAxZjJpQ1ZjVk9wSkNUV2dUa2JaeVJTQjMiLCJzdWIiOiJWRE4wMWYyaUNWY1ZPcEpDVFdnVGtiWnlSU0IzIiwiaWF0IjoxNjg0Mzg2MzM2LCJleHAiOjE2ODQzODk5MzYsImVtYWlsIjoiYXJpdHJhMTM5M0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYXJpdHJhMTM5M0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.oen7yYFo4I3fk9dWyu8BN26RKM9dG96HF61iGV82cO-0qhXS8tC3S41dtD2Vhptp2KwDNq-SVO-Vlx_TVx8IUhExsxgepug1rc85V8CDTr577pMq1L4oCiUGoflpC247UeLwRvJaq_ObXSGkOrrv0WBhH-M0a9ZR69OtWoInF0RsWWjLvg8JkUr5ZnjP-CaH5i05VOQetY2ahC3bvObriUtAc0e2epcA774hhNHwHps-efb-02IUkL5u6_RTxMngvJp6iFSlfaPyMwY3cHxeEtvzJzP990aLGpsWh60rSKR5Fp6rs5PNkn3MVmJ8N03p2ICMqLaM2kLU2vYsLGXYEw"
    data={'name':"Aritra",'age':21}
    db.push(data=data,token=token)
    return {'data':req.headers}


@router.get('/api/drive')
def connect():
    # connectGDrive()
    pass