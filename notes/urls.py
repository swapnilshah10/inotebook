from django.urls import path
from . import views

urlpatterns = [
    path('get-notes/', views.get_notess),
    path('post-notes/', views.post_notes)
]