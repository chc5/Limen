import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io

class GraphGenerator():
    xlabel = 'X'
    ylabel = 'Y'
    title = 'Title'
    def __init__(self):
        pass
    def plot(self, x, y):
        buffer = io.BytesIO()
        x_set = np.asarray(x)
        y_set = np.asarray(y)
        plt.clf()
        plt.scatter(x_set, y_set)
        plt.xlabel(self.xlabel)
        plt.ylabel(self.ylabel)
        plt.savefig(buffer, format="png")
        return buffer
