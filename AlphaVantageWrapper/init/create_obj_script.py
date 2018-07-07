import pandas as pd
from AlphaVantageWrapper.models import Function as Function
from AlphaVantageWrapper.models import FunctionParameter as FunctionParameter
from AlphaVantageWrapper.models import Parameter as Parameter

def insert_to_functions_table(function_set):
    # print(function_set)
    functions = function_set.iloc[ : , : ].values
    for function in functions:
        f = Function(name=function[0])
        f.save()

def insert_to_parameters_table(parameter_set):
    parameters = parameter_set.iloc[ : , : ].values
    for param in parameters:
        p = Parameter(name=param[0].strip(), regexp_verifier=param[1].strip())
        p.save()


def insert_to_function_parameters_table(function_parameter_set):
    function_parameters = function_parameter_set.iloc[ : , : ].values
    for f_param in function_parameters:
        f = Function.objects.filter(name=f_param[0].strip())[0]
        p = Parameter.objects.filter(name=f_param[1].strip())[0]
        f_p = FunctionParameter(function=f, parameter=p, required=f_param[2].strip())
        f_p.save()

function_set = pd.read_csv('AlphaVantageWrapper/init/list_of_functions.csv')
parameter_set = pd.read_csv('AlphaVantageWrapper/init/list_of_parameters.txt', delimiter='\t')
function_parameter_set = pd.read_csv('AlphaVantageWrapper/init/list_of_function_parameters.csv')
insert_to_functions_table(function_set)
insert_to_parameters_table(parameter_set)
insert_to_function_parameters_table(function_parameter_set)
