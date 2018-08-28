import urllib.request
import urllib.parse
from django.http import HttpRequest
from Regressor.utils import Regressor
from Limen.BatchHandler import BatchHandler

class AlphaVantageParser():
    meta_tag = 'Meta Data'
    predict_tag = 'PREDICT'

    def __init__(self, json_result):
        self.data = {}
        for key in json_result.keys():
            if not key == self.meta_tag:
                for date in json_result[key].keys():
                    self.data[date] = json_result[key][date]
        if self.meta_tag in json_result.keys():
            self.metadata = json_result[self.meta_tag]
        self.data = self.__divide_into_groups()
        self.predict_groups()
        if self.metadata:
            self.data[self.meta_tag] = self.metadata;

    def __divide_into_groups(self):
        groups = {}
        for date in self.data.keys():
            for group in self.data[date].keys():
                if group not in groups:
                    groups[group] = {'data':{'x': [], 'y': []}}
                groups[group]['data']['x'].append(date)
                y = float(self.data[date][group])
                groups[group]['data']['y'].append(y)
        for group in groups:
            groups[group]['data']['x'], groups[group]['data']['y'] = zip(*sorted(zip(groups[group]['data']['x'], groups[group]['data']['y'])))
        return groups

    def predict_groups(self):
        for group in self.data:
            regressor = Regressor()
            regressor.fit_time_series(self.data[group]['data']['x'], self.data[group]['data']['y'])
            y_set = regressor.predict_time_series()
            self.data[group]['predicted'] = {'y': y_set}
            self.data[group]['summary'] = {}
            self.data[group]['summary']['risk_score'] = regressor.get_risk_score()
            x1, x2, y1, y2 = regressor.get_trendline()
            self.data[group]['trendline'] = {'x': [x1, x2], 'y': [y1, y2]}
            # self.data[group]['summary']['coefficients'] = regressor.get_coefficients()
            self.data[group]['summary']['potential_score'] = regressor.get_potential_score()
    def get_data(self):
        return self.data

class AlphaVantageErrorHandler():
    INVALID_SYMBOL_KEY = "Error Message"
    API_OVERLOAD = "Information"

    def __init__(self, json_result):
        self.error = False
        self.msg = ""
        self.checkInvalidSymbolKey(json_result)
        self.checkAPIOverload(json_result)

    def checkInvalidSymbolKey(self, json_result):
        if self.INVALID_SYMBOL_KEY in json_result:
            self.error = True
            self.msg = "Invalid symbol, please reenter a correct symbol name. Thank you!"

    def checkAPIOverload(self, json_result):
        if self.API_OVERLOAD in json_result:
            self.error = True
            self.msg = "AlphaVantage have denied access to their data. I'm sorry for your inconvenience and please try again."
        
    def isAnError(self):
        return self.error

    def message(self):
        return self.msg

class DataRetriever():

    @staticmethod
    def get_data_from(url):
        BatchHandler.request_access()
        try:
            f = urllib.request.urlopen(url)
        except Exception:
            return {'Error':'The error has occured '}
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
