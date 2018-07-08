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
