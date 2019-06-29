from db import *
from util import *
import itertools
import pandas as pd
import numpy as np
from config import DELTA_PRECISION
from statistics import mean
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt
from sklearn.preprocessing import PolynomialFeatures
from sklearn.metrics import mean_squared_error, r2_score

def is_NaN(n):
    try:
        float(n)
        return False
    except ValueError:
        return True

def get_standard_deviation(collection_name, data_name):
    data = [float(item) for item in get_user_data(collection_name, data_name)]
    dataframe = pd.DataFrame(data)
    return dataframe.std(0)[0]

def get_average(collection_name, data_name):
    data = []
    for item in get_user_data(collection_name, data_name):
        if is_NaN(item):
            continue
        else:
            data.append(float(item))
    return mean(data)

def calculate_precision(accepted, actual):
    return abs(((float(actual)-float(accepted)) / float(actual)) * 100)

def format_coordinates(collection_name, data_name):
    x = []
    y = []
    ylist=[]
    data = get_user_data(collection_name, data_name)
    dataset = []
    for item in data:
        arr = item.split(",")
        ylist.append([float(val) for val in arr])
    y = [[mean(i)] for i in itertools.zip_longest(*ylist, fillvalue=0)]
    for i in range(len(y)):
        x.append([i+1])

    return (x, y)

def calculate_delta_accuracy(collection_name, data_type, test_data):
    x, y = format_coordinates(collection_name, data_type)
    # Model initialization
    lin_reg = LinearRegression()
    poly_reg = PolynomialFeatures(degree=4)
    # Fit the data(train the model)    
    X_poly = poly_reg.fit_transform(x)
    poly_reg.fit(X_poly, y)
    lin_reg.fit(X_poly,y)
    y_predict = lin_reg.predict(poly_reg.fit_transform(x))
    print(f'test_data = {test_data}')
    print(f'predict = {y_predict}')
    precision = 0
    total = 0
    for index, value in enumerate(test_data):
        precision += calculate_precision(y_predict[index][0], value)
        total += 1
    print("Combined ", precision/total)
    if (precision / total) >= DELTA_PRECISION:
        print("IMPRECISE, ", data_type)
        return False
    print("PRECISE ", data_type)
    return True

def get_collection_name(data):
    return f"{data['username']}_{data['OS']}"

def calculate_stdev_accuracy(collection_name, data_type, test_data):
    std = get_standard_deviation(collection_name, data_type);
    avg = get_average(collection_name, data_type);
    if(test_data >= avg-std and test_data <= avg+std):
        print(f"{data_type} within standard dev")
        print(f"avg {avg}\nstd {std}\ntest_data {test_data}")
        return True
    else:
        print(f"{data_type} not within standard dev")
        print(f"avg {avg}\nstd {std}\ntest_data {test_data}")
        return False

def check_behavior(data):
    collection_name = get_collection_name(data)
    deltaPass = calculate_delta_accuracy(collection_name, "deltaPass", string_to_list(data["deltaPass"]))
    deltaUser = calculate_delta_accuracy(collection_name, "deltaUser", string_to_list(data["deltaUser"]))
    speedUser = calculate_stdev_accuracy(collection_name, "speedUser", float(data['speedUser']))

    speedPass = calculate_stdev_accuracy(collection_name, "speedPass", float(data['speedPass']))

    mouseMoveEvents = calculate_stdev_accuracy(collection_name, "mouseMoveEvents", float(data['mouseMoveEvents']))

    return deltaPass and deltaUser and speedUser and speedPass and mouseMoveEvents
