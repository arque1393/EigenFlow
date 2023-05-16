from typing import Annotated
from fastapi import UploadFile,APIRouter,Request
import subprocess as sp
from pydantic import BaseModel

from .config import BASE_DIR,fire_store,fire_auth
router = APIRouter()




class RawCode(BaseModel):
    code:str

@router.post('/code/exe_raw')
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
async def show_token(req:Request):
    print(req.headers)
    return {'data':req.headers}
