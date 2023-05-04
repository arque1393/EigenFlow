from django.urls import path
from UserAuthAPI.views import signin,signup,signout,execute_raw
urlpatterns = [   
    path('signin/', signin),
    path('signup/', signup),
    path('signout/', signout),
    path('execute_raw/', execute_raw),
]
