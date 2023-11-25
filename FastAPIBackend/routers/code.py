from typing import Annotated
from fastapi import UploadFile,APIRouter,Request
import subprocess as sp
from pydantic import BaseModel
from .ipyshell import IPySession

# from .drive import connectGDrive

from .config import BASE_DIR
router = APIRouter()
class RawCode(BaseModel):
    code:str
@router.post('/api/code/exe_raw', tags=['Interactive Execution'])
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
    
class Cred(BaseModel):
        uid:str
        # password:str
        shell_id:str
class IPyCode(BaseModel):
    codelines:str
    cred:Cred
    
@router.post('/api/code/exe_ipy', tags=['Interactive Execution'])
def exe_ipython(code:IPyCode ):
    try:
        ses = IPySession.get(code.cred)
        if(not ses):
            ses = IPySession.create(code.cred)
        shell_id=code.cred.shell_id
        obj = ses.exec(code.codelines,shell_id)        
        ses.restart()
        print(obj)
        return {"result":obj,'success':True,'error':None}
    except:
        return {'result':None, 'success':False,'error':"e"}
  
@router.post('/api/code/shell', tags=['Interactive Execution'])
def list_ipython(cred: Cred ):
    try:
        ses = IPySession.get(cred)
        if(not ses):
            return({'message':"session not found"})
        shells = list(ses.shells.keys())        
        return {"shells":shells,'success':True,'error':None}
    except:
        return {'success':False,'error':"e"}

@router.delete('/api/code/shell', tags=['Interactive Execution'])
def exe_ipython(cred:Cred ):
    try:
        ses = IPySession.get(cred)
        if(not ses):
            return({'message':"session not found"})
        ses.delete(cred)     
        return {'success':True,'error':None}
    except:
        return {'success':False,'error':"e"}


# class CodeFile(BaseModel):
#     headers:dict
#     content:str
#     filename:str
# @router.post("/api/code/uploadfile/")
# async def create_upload_file(req: CodeFile):
#     token= req.headers['token']
#     uid = req.headers['uid']
#     # user = fire_auth.get_user(uid=uid)
#     fire_store.child("users").child(f'{uid}').child(f'{req.filename}').upload(file = req.content, _from = 'string', token=token)
#     return {"filename": req.filename}

# @router.post('/api/code/getx/')
# async def store(req:Request):
#     # data={'name':"Aritra",'age':21}
#     # db.push(data=data,token=token)
#     return {'data':req.headers}

# @router.get('/api/drive')
# def connect():
#     # connectGDrive()
#     pass