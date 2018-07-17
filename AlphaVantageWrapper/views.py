from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.core import serializers
from AlphaVantageWrapper.models import Function
from AlphaVantageWrapper.models import FunctionParameter
from AlphaVantageWrapper.utils import URLBuilder
from AlphaVantageWrapper.utils import DataRetriever
from Limen.settings import ALPHA_VANTAGE_API_KEY
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

def get(request):
    url_builder = URLBuilder(ALPHA_VANTAGE_API_KEY)
    print(request.GET)
    url_builder.append_parameters(request.GET)
    url = str(url_builder)
    data = json.loads(DataRetriever().get_data_from(url))
    context = {
        'url': url,
        'data': data['Meta Data']
    }
    return render(request, 'form/result.html', context)

def lookup_function(request):
    if not 'function' in request.GET:
        return HttpResponse('function key does not exist when looking for functions')
    f_name = request.GET['function'].upper()
    results = Function.objects.values('name').filter(name__contains=f_name.strip())[:5]
    data = [result['name'] for result in results]
    response = JsonResponse({'data':data})
    return response

def lookup_parameters(request):
    if not 'function' in request.GET:
        return HttpResponse('function key does not exist when looking for parameters')
    f_name = request.GET['function'].upper()
    results = FunctionParameter.objects.values('parameter','required').filter(function=f_name).exclude(parameter__in=['function','symbol'])
    data = [{'parameter' : result['parameter'], 'required' : result['required']} for result in results]
    response = JsonResponse({'data':data})
    return response

def lookup(request):
    if not 'var' in request.GET:
        return HttpResponse('var key not found')
    elif request.GET['var'] == 'function':
        return lookup_function(request)
    elif request.GET['var'] == 'parameter':
        return lookup_parameters(request)
    else:
        return HttpResponse('var '+request.GET['var']+' does not exist')

# parameterSet is a dictionary
def verify(request):
    if not request.POST['parameterSet']:
        return HttpResponse('Error: parameterSet does not exist.')
    parameterSet = request.POST['parameterSet']
    invalid_parameters = []
    for parameter in parameterSet.keys():
        search_result = Parameter.objects.filter(name=parameter)
        if len(search_result) != 1:
            return HttpResponse('Error: Parameter not found.')
        else:
            reg = re.compile(search_result[0].regexp_verifier)
            if not reg.match(parameterSet[parameter]):
                invalid_parameters.append(parameter)
    return invalid_parameters

def import_m(request):
    # return HttpResponse('Hello Worlllld')
    if not 'module' in request.GET:
        return HttpResponse('Module key not found')
    if request.GET['module'] == 'retrieve':
        return render(request, 'utils/retrieve.js')
    else:
        return  HttpResponse('Error: Module Not Found')
