from django.test import TestCase

# Create your tests here.
from AlphaVantageWrapper.models import *

def print_all_functions():
    functions = Function.objects.all()
    for function in functions:
        print(function)
def print_all_parameters():
    parameters = Parameter.objects.all()
    for parameter in parameters:
        print(parameter)
def print_all_function_parameters():
    funct_parameters = FunctionParameter.objects.all()
    for funct_parameter in funct_parameters:
        print(funct_parameter)
# print_all_functions()
# print_all_parameters()
# print_all_function_parameters()
