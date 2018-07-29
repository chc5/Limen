import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io
import time
import random
from collections import deque

class GraphGenerator():
    processes = set()
    max_processes = 50
    def __init__(self, **kwargs):
        self.xlabel = 'X'
        self.ylabel = 'Y'
        self.title = 'Title'
        self.id = self.__get_id()
        self.__dict__.update(kwargs)

    def __get_id(self):
        while len(self.processes) == self.max_processes:
            time.sleep(1)
        id = random.randint(0, 10000)
        while id in self.processes:
            id = random.randint(0, 10000)
        self.processes.add(id)
        return id

    def plot(self, x, y):
        x_set = np.asarray(x)
        y_set = np.asarray(y)
        buffer = io.BytesIO()
        plt.figure(self.id)
        plt.clf()
        plt.scatter(x, y)
        plt.xlabel(self.xlabel)
        plt.ylabel(self.ylabel)
        plt.title(self.title)
        plt.savefig(buffer, format="png")
        return buffer
