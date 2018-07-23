from django.urls import path, re_path
from . import views

urlpatterns = [
    path('graph', views.graph),
    path('predict', views.predict)
]
