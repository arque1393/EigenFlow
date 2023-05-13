from typing import Annotated
from fastapi import UploadFile,APIRouter,Request
import subprocess as sp
from pydantic import BaseModel

from .config import BASE_DIR,fire_store,fire_auth
router = APIRouter()






@router.get('code/exe_raw')
def exe_raw(code:str):
    try:
        print(code)
        code_path = str(BASE_DIR/'temp/temp.py')
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



@router.post("/code/uploadfile/")
async def create_upload_file(req: UploadFile):
    
    token= "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFiYjI2MzY4YTNkMWExNDg1YmNhNTJiNGY4M2JkYjQ5YjY0ZWM2MmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZWlnZW5mbG93MXgiLCJhdWQiOiJlaWdlbmZsb3cxeCIsImF1dGhfdGltZSI6MTY4MzkwNzAxOSwidXNlcl9pZCI6IjVqTkRZR1FqNVdQcXVpMGRSeFVkaDJMRzFlSTMiLCJzdWIiOiI1ak5EWUdRajVXUHF1aTBkUnhVZGgyTEcxZUkzIiwiaWF0IjoxNjgzOTA3MDE5LCJleHAiOjE2ODM5MTA2MTksImVtYWlsIjoiYXJpdHJhMTM5M0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYXJpdHJhMTM5M0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.MoxLfK-xMKgS8IE7at51iqLD6BR3L0BuFH07DsbJi2sQ0oW7mTVq4RpWT799Yvw4vfiUsZEVSHINPdW290O7ILcxpJfnWLsxzeUwVHGMiBtbwv-WMly0GOWLeNDP2f5cTSFUM8vd2zEoP7RFsuzzBj8eMDRgIiPL3FpkHN786x8zxloAafgXh8YgxWvJg2gPbNIH8G8Yq6t9GLXdfhJ-cjpragVU2ygnGS9NSjvRURoJvk-LUC8tQWChOEc8KWazP-RQrZ6DIzfh1ZgVwnH9B29DUfodJY7NlLdPdFWxHrrlTjM_ezC2ild46WcG8_0ija7yd9-SZocOCNLjLTzuFg"
    uid = "5jNDYGQj5WPqui0dRxUdh2LG1eI3"
    # user = fire_auth.get_user(uid=uid)
    fire_store.child("users").child(f'{uid}').child(f'somefolder/{req.filename}').upload(file = req.file, _from = 'file', token=token)
    return {"filename": req.filename}



class trymodel(BaseModel):
    name:str
    
@router.post('/code/getx/')
async def show_token(req:Request):
    print(req.headers)
    return {'data':req.user}