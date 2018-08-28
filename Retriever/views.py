from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from Retriever.models import TimeSeries
from Retriever.utils import URLBuilder
from Retriever.utils import DataRetriever
from Retriever.utils import AlphaVantageParser
from Retriever.utils import AlphaVantageErrorHandler
from Limen.settings import ALPHA_VANTAGE_API_KEY
import json
import re

# Create your views here.
def index(request):
    context = {
        'title': 'Limen',
        'functions': Function.objects.all()
    }
    return render(request, 'form/index.html', context)

def get(request):
    if not 'symbol' in request.GET:
        return HttpResponseNotFound('Symbol does not exist.')
    url_builder = URLBuilder(ALPHA_VANTAGE_API_KEY)
    url_builder.append_parameters(request.GET)
    data = {}
    for symbol in TimeSeries.objects.all():
        name = str(symbol)
        url_builder.append_parameter('function', name)
        url = str(url_builder)
        print(url)
        result = json.loads(DataRetriever().get_data_from(url))
        errorHandler = AlphaVantageErrorHandler(result)
        if errorHandler.isAnError():
            return JsonResponse({ 'error': errorHandler.message() })
        parser = AlphaVantageParser(result)
        data[name] = parser.get_data()
    return JsonResponse({ 'data': data })

def get_weekly(request):
    if not 'symbol' in request.GET:
        return HttpRequestNotFound('Symbol does not exist.')
    url_builder = URLBuilder(ALPHA_VANTAGE_API_KEY)
    url_builder.append_parameters(request.GET)
    data = {}
    name = 'TIME_SERIES_WEEKLY_ADJUSTED'
    url_builder.append_parameter('function', name)
    url = str(url_builder)
    print(url)
    result = json.loads(DataRetriever().get_data_from(url))
    parser = AlphaVantageParser(result)
    data[name] = parser.get_data()
    return JsonResponse({ 'data': data })
