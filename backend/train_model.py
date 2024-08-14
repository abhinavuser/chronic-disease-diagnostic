import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report
import joblib

# Load data
data = pd.read_csv('lab_report.csv')  # Replace with your actual data file

features = data[['ELISA_Result', 'CD4_Count', 'HIV_RNA_PCR']]
# Preprocess data
labels = data['HIV_Status']  # Binary: 0 for negative, 1 for positive

# Scale features
scaler = StandardScaler()
features_scaled = scaler.fit_transform(features)

# Split data
X_train, X_test, y_train, y_test = train_test_split(features_scaled, labels, test_size=0.3, random_state=42)

# Train model
model = LogisticRegression()
model.fit(X_train, y_train)

# Evaluate model
y_pred = model.predict(X_test)
print('Accuracy:', accuracy_score(y_test, y_pred))
print('Classification Report:\n', classification_report(y_test, y_pred))

# Save the model and scaler
joblib.dump(model, 'hiv_model.pkl')
joblib.dump(scaler, 'scaler.pkl')
