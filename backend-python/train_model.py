# train_model.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
import joblib

print("Script started: Training defect prediction model...")

# 1. Load the Dataset from our CSV file
try:
    data = pd.read_csv('kc1.csv')
    print("Dataset 'kc1.csv' loaded successfully.")
except FileNotFoundError:
    print("Error: kc1.csv not found. Make sure the file is in the 'backend-python' folder.")
    exit()

# 2. Prepare the Data
# The 'defects' column is our target (y), the rest are features (X).
# The last column in the kc1.csv is the 'defects' column.
features = data.iloc[:, 1:-1] # Select all rows, and all columns except the last one
labels = data.iloc[:, -1]   # Select all rows, and only the last column

print(f"Data prepared. Number of features: {len(features.columns)}")

# 3. Split Data for Training and Testing (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.2, random_state=42)
print("Data split into training and testing sets.")

# 4. Scale the Features
# This standardizes our data to have a mean of 0 and standard deviation of 1.
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
print("Features scaled.")

# 5. Train the Logistic Regression Model
model = LogisticRegression(max_iter=1000, class_weight='balanced')
model.fit(X_train_scaled, y_train)
print("Model training complete.")

# 6. Evaluate the Model's Accuracy on unseen test data
accuracy = model.score(X_test_scaled, y_test)
print(f"Model Accuracy on Test Data: {accuracy * 100:.2f}%")

# 7. Save the trained model and the scaler to files
joblib.dump(model, 'defect_model.pkl')
joblib.dump(scaler, 'scaler.pkl')
print("Model and scaler have been saved to 'defect_model.pkl' and 'scaler.pkl'")
print("Script finished successfully!")