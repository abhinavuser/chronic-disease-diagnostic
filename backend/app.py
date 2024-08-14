from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load the pre-trained model and scaler
model = joblib.load('hiv_model.pkl')
scaler = joblib.load('scaler.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    df = pd.DataFrame([data])
    
    # Preprocess data
    features = df[['ELISA_Result', 'CD4_Count', 'HIV_RNA_PCR']]
    features_scaled = scaler.transform(features)
    
    # Make prediction
    prediction = model.predict(features_scaled)
    result = 'Positive' if prediction[0] == 1 else 'Negative'
    
    return jsonify({'HIV_Status': result})

if __name__ == '__main__':
    app.run(debug=True)
