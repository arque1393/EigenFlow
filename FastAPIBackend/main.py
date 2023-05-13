from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from routers import auth,code
from routers.config import STATIC_DIR,TEMPLATE_DIR
app = FastAPI()


app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
templates = Jinja2Templates(directory=TEMPLATE_DIR)

@app.get("/base", response_class=HTMLResponse)
async def base(request: Request):
    return templates.TemplateResponse("index.html",{"request": request,})
app.include_router(auth.router)
app.include_router(code.router)
