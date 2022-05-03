from django.urls import path
from . import views

urlpatterns = [
    path('get-notes/', views.get_notess),
    path('post-notes/', views.post_notes),
    path('update-notes/<str:id>/', views.update_notes),
    path('delete-notes/<str:id>/', views.delete_notes)
]