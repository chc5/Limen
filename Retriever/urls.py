from django.urls import path, re_path
from . import views

urlpatterns = [
    # path('', views.index),
    path('get', views.get),
    path('get_weekly', views.get_weekly),
    path('function', views.lookup_function),
    path('parameter', views.lookup_parameters),
    path('lookup', views.lookup),
    path('import', views.import_m),
    path('verify', views.verify)
]
