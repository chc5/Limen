import numpy as np
import pandas as pd
import math
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
import statsmodels.formula.api as sm

class Regressor():
    DATE_FORMAT = '%Y-%m-%d'

    def __init__(self):
        self.model = LinearRegression()
        self.x_set = None
        self.y_set = None

    def fit_time_series(self, x, y):
        encoder = [i for i in range(len(x))]
        self.x_set = np.array(encoder).reshape(1, -1).T
        self.y_set = np.array(y)

        self.poly_reg = PolynomialFeatures(degree = 3)
        x_poly = self.poly_reg.fit_transform(self.x_set)
        self.poly_reg.fit(x_poly, self.y_set)
        self.model.fit(x_poly, self.y_set)

        # Note: the coefficients are in orders of 1, x, x^2, x^3
        self.coefficients = [coef for coef in self.model.coef_]
        self.score = '{:0.2f}'.format(self.model.score(x_poly, self.y_set) * 100)

    def get_risk_score(self):
        return self.score

    # Used quadratic formula.
    def get_potential_score(self):
        if len(self.x_set) <= 1:
            return 0
        d, c, b, a = self.coefficients
        discriminant = 4 * (b**2) - 12*a*c
        if discriminant < 0 or a == 0:
            x1 = self.x_set[0][0]
        else:
            x1 = ((-2*b) + math.sqrt(discriminant)) / (6 * a)
        y1 = self.model.predict(self.poly_reg.fit_transform(x1))[0]
        x2 = self.x_set[-1][0]
        y2 = self.model.predict(self.poly_reg.fit_transform(x2))[0]
        slope = (y2 - y1) / (x2 - x1)
        return '{:0.2f}'.format(slope)

    def get_coefficients(self):
        return self.coefficients

    def fit_poly(self, x_set, y_set):
        pass

    def predict(self, x):
        pass

    def __to_list_of_str(self, date_list):
        new_list = []
        for i in range(len(date_list)):
            date = pd.todatetime(str(date_list[i]))
            new_list.append(date.strftime(self.DATE_FORMAT))
        return new_list

    def predict_time_series(self):
        # x_oldest = np.datetime64(min(self.x_set))
        # x_newest = np.datetime64(max(self.x_set))
        # interval = x_newest - x_oldest
        # x_future = x_newest + interval // 7
        # predicted_x_set = np.arange(x_oldest, x_future, dtype='datetime64[W]')
        predicted_y_set = []
        for i in range(len(self.x_set)):
            y = self.model.predict(self.poly_reg.fit_transform(i))[0]
            predicted_y_set.append('{:0.2f}'.format(y))
        return predicted_y_set
