import numpy as np
import matplotlib.pyplot as plt
import pandas as pd 





# dataset = pd.read_csv('50_Startups.csv')
# X = dataset.iloc[:,:-1].values 
# Y = dataset.iloc[:,-1].values

# from sklearn.compose import ColumnTransformer 
# from sklearn.preprocessing import OneHotEncoder 
# ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder(), [3])], remainder='passthrough')
# X = np.array(ct.fit_transform(X))

# from sklearn.model_selection import train_test_split 
# X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=0)

# from sklearn.linear_model import LinearRegression
# regressor = LinearRegression()
# regressor.fit(X_train, Y_train)

# Y_pred = regressor.predict(X_test)
# np.set_printoptions(precision=2)
# # print(np.concatenate((Y_pred.reshape(len(Y_pred),1), Y_test.reshape(len(Y_test),1)), 1))

# print(regressor.predict([[1, 0, 0, 160000, 130000, 300000]]))