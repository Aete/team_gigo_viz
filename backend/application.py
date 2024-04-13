import pandas as pd

from flask import Flask
from flask import render_template, request, jsonify
from flask_cors import CORS

import joblib

# create an app and load the model
app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": ["https://teamgigo.netlify.app"]}})

## model = joblib.load('model.pkl')

@app.route('/predict', methods=['GET'])
def predict():
    try:
        # get the query parameters
        # data = request.get_json()
        # df_input = pd.DataFrame(data, index=[0])
        # ## prediction = model.predict(df_input)
        prediction = [1]
        return jsonify({'prediction': prediction[0]})
    except Exception as e:
        return jsonify({'error': str(e)})
    
if __name__ == '__main__':
    app.run()