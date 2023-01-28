from django.urls import path
from blog import views
from django.contrib import admin

app_name = 'blog'
urlpatterns = [
    path('sendpost', views.newPost, name="newPost"),
    path('showposts', views.getPost, name="getPost"),
    ]
