from note import views
from django.urls import path

urlpatterns = [
    path('create/', views.createNote),
    path('delete/', views.deleteNote),
    path('edit/', views.editNote),
    path('getNotes/', views.getNotes),
    path('addToLabel/', views.addToLabel),
    path('removeFromLabel/', views.removeFromLabel),
    path('search/', views.searchNotes),
]
