# app.py
import joblib
from flask import Flask, request, jsonify
from feature_extractor import analyze_java_code
import numpy as np
import json

print("Loading the trained model and scaler...")
# 1. LOAD THE TRAINED MODEL AND SCALER
# We load the .pkl files that we created with our training script.
# These are now stored in memory for the life of the application.
try:
    model = joblib.load("defect_model.pkl")
    scaler = joblib.load("scaler.pkl")
    print("Model and scaler loaded successfully.")
except FileNotFoundError:
    print("Error. Model or scaler file is not found. Please run train_model.py first.")
    # We exit because the app is useless without the the model.
    exit()

# 2. CREATE THE FLASK APP
app = Flask(__name__)

# 3. DEFINE THE PREDICTION ENDPOINT
@app.route("/predict", methods = ["POST"])
def predict():
    # 1. GET THE CODE FROM THE REQUEST
    try:
        # Get the raw request body as bytes
        raw_data = request.get_data()
        # Decode the bytes into a string, then parse the string as JSON
        data = json.loads(raw_data)
    except Exception as e:
        # This will catch errors if the body isn't valid JSON
        print(f"Error decoding JSON: {e}")
        return jsonify({"error": "Invalid JSON format in request body"}), 400

    if 'code' not in data:
        return jsonify({"error": "Missing 'code' key in JSON request"}), 400
    
    java_code = data["code"]

    # 2. USE THE FEATURE EXTRACTOR
    try:
        methods = analyze_java_code(java_code)
        if not methods:
            return jsonify({"error": "No methods found or code could not be analyzed."})
    except Exception as e:
        # Log the error
        print(f"An error occurred during feature extraction: {e}")
        return jsonify({"error": "An internal error occurred during code analysis."}), 500
    
    # 3. MAKE PREDICTIONS FOR EACH METHODS
    predictions = []
    for method in methods:
        features = method["features"]

        # Reshape the data
        features_array = np.array(features).reshape(1, -1)

        # Scale the features
        scaled_features = scaler.transform(features_array)

        # Make the predictions!
        probability = model.predict_proba(scaled_features)[0][1]

        predictions.append({
            "methodName": method["methodName"],
            "defectProbability": f"{probability * 100:.2f}%"
        })

    return jsonify({"analysisResults": predictions})


if __name__ == "__main__":
    app.run(debug = True)
