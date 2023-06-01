from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse,RedirectResponse,Any
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from routers import auth,code
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from routers.config import STATIC_DIR,TEMPLATE_DIR,origins,fire_store
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    
)
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
templates = Jinja2Templates(directory=TEMPLATE_DIR)

@app.get('/')
async def base(req:Request):
    return RedirectResponse('/base/home',headers=req.headers)
@app.get('/base')
async def base(req:Request):
    return RedirectResponse('/base/home',headers=req.headers)

@app.get("/base/{path}", response_class=HTMLResponse, tags=['Base'])
async def base(request: Request, args:Optional[str]=None):
    try:acc_token = request.query_params.get('auth')
    except:acc_token=None
    
    print(acc_token) 
    return templates.TemplateResponse("index.html",{"request": request,"headers":{'Auth':acc_token}})
app.include_router(auth.router)
app.include_router(code.router)
# print(fire_store.list_files())
