from django.urls import path, re_path
from . import views

urlpatterns = [
    path('get', views.get),
    path('get_weekly', views.get_weekly)
]
