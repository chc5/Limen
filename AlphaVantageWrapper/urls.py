from django.urls import path, re_path
from . import views

urlpatterns = [
    # path('', views.index)
    path('get', views.retrieve_data),
    path('', views.index)
]
