from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.
datax = {
        'username':'Kabir',
        'email':'ilab.kabir@gmail.com',
        'password':'qwertgfdsa'}


@api_view(['post']) 
def p(req):
    data = req.data   
    uname = data["username"]        
    email=data["email"]
    passwd = data["password"]       
    if uname == datax['username'] and email == datax['email'] and passwd == datax['password'] :
        res = {"success":True,'error':"none"}
    else: res = {"success":False,'error':"Invalid Cradentils"}
    return Response(res)
    
@api_view(['get']) 
def signin(req):
    print(req)
    return Response(datax)
