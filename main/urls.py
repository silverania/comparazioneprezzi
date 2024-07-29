from django.urls import path, include
from django.contrib import admin
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('', views.homePage.as_view(),name="main")
]