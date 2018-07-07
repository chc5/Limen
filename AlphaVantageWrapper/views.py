from django.shortcuts import render
from django.http import HttpResponse
from AlphaVantageWrapper.models import Function
from AlphaVantageWrapper.utils import URLBuilder
from AlphaVantageWrapper.utils import DataRetriever
import json
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
