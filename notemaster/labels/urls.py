from django.urls import path
from labels import views

urlpatterns = [
    path('notes/get/', views.getNotes, name="getNotes"),
    path('create/', views.createLabel, name="createLabel"),
    path('get/', views.getLabels, name="getLabels"),
    path('edit/', views.editLabel, name="editLabel"),
    path('delete/', views.deleteLabel, name="deleteLabel"),
    path('getNotesLength/', views.getNotesLength, name="getNotesLength"),
    path('getLabel/', views.getLabel, name="getLabel"),
]
