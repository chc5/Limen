from django.shortcuts import render
from django.http import HttpResponse
from AlphaVantageWrapper.models import Function
from AlphaVantageWrapper.utils import URLBuilder
from AlphaVantageWrapper.utils import DataRetriever
import json
import re

# Create your views here.
def index(request):
    # return HttpResponse('Hello Worlllld')
    context = {
        'title': 'Limen',
        'functions': Function.objects.all()
    }
    return render(request, 'form/index.html', context)

def retrieve_data(request):
    url_builder = URLBuilder()
    url_builder.append_parameters(request.GET)
    url = str(url_builder)
    data = json.loads(DataRetriever().get_data_from(url))
    context = {
        'url': url,
        'data': data['Meta Data']
    }
    return render(request, 'form/result.html', context)

def get_function(request):
    if not request.GET['function']:
        return None
    f_name = request.GET['function'].upper()
    return json.dumps(Function.objects.filter(name__contains=f_name.strip()))

def get_parameters(request):
    if not request.GET['function']:
        return None
    f_name = request.GET['function'].upper()
    return json.dumps(FunctionParameter.objects.filter(function=f_name))

# parameterSet is a dictionary
def verify(request):
    if not request.POST['parameterSet']:
        return "Error: parameterSet does not exist."
    parameterSet = request.POST['parameterSet']
    invalid_parameters = []
    for parameter in parameterSet.keys():
        search_result = Parameter.objects.filter(name=parameter)
        if len(search_result) != 1:
            return "Error: Parameter not found."
        else:
            reg = re.compile(search_result[0].regexp_verifier)
            if not reg.match(parameterSet[parameter]):
                invalid_parameters.append(parameter)
    return invalid_parameters
