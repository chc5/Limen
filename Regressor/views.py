from django.shortcuts import render

from django.http import HttpRequest

from django.http import HttpResponse
from Regressor.utils import GraphGenerator
# Create your views here.
def request_graph(x, y):
    request = HttpRequest()
    request.method = 'POST'
    request.POST['x'], request.POST['y'] = x, y
    # print(request.POST['y'])
    return graph(request)


def graph(request):
    if not 'x' in request.POST or not 'y' in request.POST:
        return HttpResponse('There is no x or y in GET when making a graph.')
    gg = GraphGenerator()
    buffer = gg.plot(request.POST['x'], request.POST['y'])
    response = HttpResponse(buffer.getvalue(), content_type="image/png")
    return response

def predict(request):
    pass
