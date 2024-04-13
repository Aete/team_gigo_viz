import pandas as pd

from flask import Flask
from flask import render_template, request, jsonify

import joblib

# create an app and load the model
app = Flask(__name__)
## model = joblib.load('model.pkl')

@app.route('/predict', method=['GET'])
def predict():
    try:
        # get the query parameters
        data = request.get_json()
        df_input = pd.DataFrame(data, index=[0])
        ## prediction = model.predict(df_input)
        prediction = [1]
        return jsonify({'prediction': prediction[0]})
    except Exception as e:
        return jsonify({'error': str(e)})
    
if __name__ == '__main__':
    app.run()