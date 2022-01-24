from django.urls import path
from user import views

urlpatterns = [
    path('get/', views.getUser, name="getUser"),
    path('create/', views.create_user, name="create_user"),
    path('login/', views.login_user, name="login_user"),
    path('delete/', views.delete_user, name="delete_user"),
]
