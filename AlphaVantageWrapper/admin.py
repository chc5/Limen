from django.contrib import admin

from AlphaVantageWrapper.models import *
admin.site.register(Function)
admin.site.register(Parameter)
admin.site.register(FunctionParameter)
