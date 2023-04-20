from django.urls import path
from UserAuthAPI.views import signin,signup,signout
urlpatterns = [   
    path('signin/', signin),
    path('signup/', signup),
    path('signout/', signout),
]
