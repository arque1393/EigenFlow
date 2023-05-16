from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from routers import auth,code
from fastapi.middleware.cors import CORSMiddleware

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

@app.get("/base", response_class=HTMLResponse)
async def base(request: Request):
    return templates.TemplateResponse("index.html",{"request": request,})
app.include_router(auth.router)
app.include_router(code.router)
# print(fire_store.list_files())