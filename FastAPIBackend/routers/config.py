# Path Config
from pathlib import Path
import json 


BASE_DIR = Path(__file__).resolve().parent.parent.parent
TEMPLATE_DIR = BASE_DIR/'ReactBuild'
STATIC_DIR = TEMPLATE_DIR/'static'
SESSION_TIME = 600 # in second 
# Fire Base Config 
import pyrebase
### Firebase Web app Connection config
firebaseConfig = {
    'apiKey': "AIzaSyAVljbt_KDb0TzRM1qi5kwhMxuoKU_PqkE",
    'authDomain': "eigenflow1x.firebaseapp.com",
    'projectId': "eigenflow1x",
    'storageBucket': "eigenflow1x.appspot.com",
    'messagingSenderId': "116513511154",
    'appId': "1:116513511154:web:b238c221566082353aa26b",
    'measurementId': "G-YES9CXCS7E",
    "databaseURL": "https://eigenflow1x-default-rtdb.asia-southeast1.firebasedatabase.app",
}
# Frebase app instance 
app = pyrebase.initialize_app(firebaseConfig)

fire_auth = app.auth()
fire_db = app.database()
fire_store = app.storage()

# Middle ware
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8000",
    "https://eigen-flow.onrender.com"
]


