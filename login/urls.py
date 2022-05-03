from django.urls import path 
from rest_framework.authtoken import views as v
from . import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api-auth/', v.obtain_auth_token),
    path('get-details/', views.user_detail_api),
    path('register/',views.RegisterUserAPIView.as_view()),
    path('login/', views.login)
]

if settings.DEBUG:
        urlpatterns += static(settings.MEDIA_URL,
                              document_root=settings.MEDIA_ROOT)    

