from django.urls import path, re_path
from . import views

urlpatterns = [
    # path('', views.index)
    path('get', views.retrieve_data),
    path('function', views.get_function),
    path('parameter', views.get_parameters),
    path('verify', views.verify),
    path('', views.index)
]
