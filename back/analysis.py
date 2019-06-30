from db import *
from util import *
import itertools
import pandas as pd
import numpy as np
import config
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
    data = []
    for item in get_user_data(collection_name, data_name):
        if is_NaN(item):
            data.append(0.0)
        else:
            data.append(item)
    return np.std(np.array(data).astype(np.float))

def within_stdev(collection_name, data_name, test_data):
    stdev = get_standard_deviation(collection_name, data_name)
    avg = get_average(collection_name, data_name)
    return test_data <= avg + stdev and test_data >= avg - stdev



def get_average(collection_name, data_name):
    data = []
    for item in get_user_data(collection_name, data_name):
        if is_NaN(item):
            data.append(0.0)
        else:
            data.append(float(item))
    return mean(data)

def calculate_percent_accuracy(accepted, actual):
    return abs(((float(accepted)-float(actual)) / float(accepted)) * 100)

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
        precision += calculate_percent_accuracy(y_predict[index][0], value)
        total += 1
    mean_precision = precision/total
    print("Combined ", precision/total)
    return mean_precision
    '''if (precision / total) >= DELTA_PRECISION:
        print("IMPRECISE, ", data_type)
        return False
    print("PRECISE ", data_type)
    return True
    '''
def get_collection_name(data):
    return f"{data['username']}_{data['OS']}"

def calculate_stdev_accuracy(collection_name, data_type, test_data):
    std = get_standard_deviation(collection_name, data_type);
    avg = get_average(collection_name, data_type);
    if(test_data >= avg-std and test_data <= avg+std):
        print(f"{data_type} within standard dev")
        print(f"avg {avg}\nstd {std}\ntest_data {test_data}\n---")
        if(test_data == 0.0):
            return 0.0
        else:
            return calculate_percent_accuracy(avg, test_data)
    else:
        print(f"{data_type} not within standard dev")
        print(f"avg {avg}\nstd {std}\ntest_data {test_data}\n---")
        return 100.0

def check_behavior(data):
    totalPasses = 0
    collection_name = get_collection_name(data)
    deltaUser = calculate_delta_accuracy(collection_name, "deltaUser", string_to_list(data["deltaUser"]))
    deltaPass = calculate_delta_accuracy(collection_name, "deltaPass", string_to_list(data["deltaPass"]))

    speedUser = calculate_stdev_accuracy(collection_name, "speedUser", float(data['speedUser']))
    speedPass = calculate_stdev_accuracy(collection_name, "speedPass", float(data['speedPass']))
    speedMouse = calculate_stdev_accuracy(collection_name, "speedMouse", float(data['speedMouse']))

    keypresses = calculate_stdev_accuracy(collection_name, "keypresses", float(data['keypresses']))

    mouseMoveEvents = calculate_stdev_accuracy(collection_name, "mouseMoveEvents", float(data['mouseMoveEvents']))

    if compare_accuracy(config.EXPECTED_DELTA, deltaUser):
        totalPasses += 1
        print("Success deltaUser")
    else:
        print("Failed deltaUser: ", deltauser, config.EXPECTED_DELTA)
        config.EXPECTED_STDEV += 10
    if compare_accuracy(config.EXPECTED_DELTA, deltaPass):
        totalPasses += 1
        print("Success deltaPass")
    else:
        print("Failed deltaPass: ", deltaPass, config.EXPECTED_DELTA)
        config.EXPECTED_STDEV += 10

    if compare_accuracy(config.EXPECTED_STDEV, speedUser):
        totalPasses += 1
        print("Success speedUser")
    else:
        print("Failed speedUser: ", speedUser, config.EXPECTED_STDEV)
        # TODO: add all the other ones
        pass
    if compare_accuracy(config.EXPECTED_STDEV, speedPass):
        totalPasses += 1
        print("Success speedPass")
    else:
        print("Failed speedPass: ", speedPass, config.EXPECTED_STDEV)
        # TODO: add all the other ones
        pass
    if compare_accuracy(config.EXPECTED_STDEV, speedMouse):
        totalPasses += 1
        print("Success speedMouse")
    else:
        print("Failed speedMouse: ", speedMouse, config.EXPECTED_STDEV)
        # TODO: add all the other ones
        pass

    if compare_accuracy(config.EXPECTED_STDEV, keypresses):
        totalPasses += 1
        print("Success keypresses")
    else:
        print("Failed keypresses ", keypresses, config.EXPECTED_STDEV)
        # TODO: add all the other ones

    if compare_accuracy(config.EXPECTED_STDEV, mouseMoveEvents):
        totalPasses += 1
        print("Success mouseMoveEvents")
    else:
        print("Failed mouseMoveEvents: ", mouseMoveEvents)
        # TODO: add all the other ones
        pass




    return True if totalPasses >= 4 else False

def compare_accuracy(EXPECTED, ACTUAL):
    return True if ACTUAL <= EXPECTED else False
