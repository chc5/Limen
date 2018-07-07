
from AlphaVantageWrapper.models import Function as Function
from AlphaVantageWrapper.models import FunctionParameter as FunctionParameter
from AlphaVantageWrapper.models import Parameter as Parameter
import re
import urllib.request
import urllib.parse


class DataRetriever():
    def get_data_from(self, url):
        f = urllib.request.urlopen(url)
        return f.read().decode('utf-8')

class URLBuilder():
    def __init__(self, api_key):
        self.base_url = 'https://www.alphavantage.co/query?'
        self.parameters = {'apikey': api_key}
        self.url = self.base_url
        self.valid_url = False

    def append_parameters(self, parameters):
        self.valid_url = False
        for key in parameters.keys():
            self.parameters[key] = parameters[key]

    def append_parameter(self, key, value):
        self.parameters[key] = value
        self.valid_url = False

    def remove_parameter(self, key):
        try:
            del self.parameter[key]
            self.valid_url = False
        except KeyError:
            print(key+"does not exist in parameters in URL")

    def __str__(self):
        if self.valid_url:
            return self.url
        else:
            self.valid_url = True
            self.url = self.base_url
            for key in self.parameters.keys():
                self.url += '&' + key + '=' + self.parameters[key]
            return self.url
class FunctionVerifier():
    def is_function(function):
        result = Function.objects.filter(name=function.strip())
        if len(result) == 1:
            return True
        return False
    def find_functions(expression):
        result = Function.objects.filter(name__contains=function.strip())
        return result
    def get_parameters_from(funct):
        result = FunctionParameter.objects.filter(function=funct.strip())
        return result
class ParameterVerifier():
    # parameter is a string
    def is_parameter(parameter):
        result = Parameter.objects.filter(name=parameter.strip())
        if len(result) == 1:
            return True
        return False

    # parameters are a list of parameters
    def are_valid_parameters(parameters):
        for parameter in parameters:
            result = Parameter.objects.filter(name=parameter)
            if len(result) != 1:
                return False
        return True

    # parameterSet is a dictionary of parameters and its values.
    def find_invalid_parameters(parameterSet):
        find_invalid_parameters = []
        for parameter in parameterSet.keys():
            result = Parameter.objects.filter(name=parameter)
            if len(result) != 1:
                find_invalid_parameters.append(parameter)
            else:
                reg = re.compile(result.regexp_verifier)
                if not reg.match(parameterSet[parameter]):
                    find_invalid_parameters.append(parameter)
        return find_invalid_parameters
