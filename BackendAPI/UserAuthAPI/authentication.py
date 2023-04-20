# from django.contrib.auth.models import User
# from rest_framework import authentication
# from rest_framework import exceptions
# import firebase_admin.auth as auth





# class FirebaseAuthentication(authentication.BaseAuthentication):
#     def authenticate(self, request):

#         token = request.headers.get('Authorization')
#         if not token:
#             return None

#         try:
#             decoded_token = auth.verify_id_token(token)
#             uid = decoded_token["uid"]
#         except:
#             return None
            
#         try:
#             user = User.objects.get(username=uid)
#             return user

#         except exceptions.ObjectDoesNotExist:
#             return None
import pyrebase

config = {
  'apiKey': "AIzaSyAVljbt_KDb0TzRM1qi5kwhMxuoKU_PqkE",
  'authDomain': "eigenflow1x.firebaseapp.com",
  'projectId': "eigenflow1x",
  'storageBucket': "eigenflow1x.appspot.com",
  'messagingSenderId': "116513511154",
  'appId': "1:116513511154:web:b238c221566082353aa26b",
  'measurementId': "G-YES9CXCS7E",
   "databaseURL": "https://databaseName.firebaseio.com",
}

app = pyrebase.initialize_app(config)

auth = app.auth()
db = app.database()
