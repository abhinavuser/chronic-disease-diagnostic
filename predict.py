import torch
from PIL import Image
import torchvision.transforms as transforms
from torchvision import models
import torch.nn as nn

# Define the model class
class TBModel(nn.Module):
    def __init__(self):
        super(TBModel, self).__init__()
        self.model = models.resnet18(pretrained=True)
        num_ftrs = self.model.fc.in_features
        self.model.conv1 = nn.Conv2d(1, 64, kernel_size=(7, 7), stride=(2, 2), padding=(3, 3), bias=False)  # Adjust input channels to 1
        self.model.fc = nn.Sequential(
            nn.Linear(num_ftrs, 512),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(512, 1),
            nn.Sigmoid()
        )

    def forward(self, x):
        return self.model(x)

# Load the trained model
def load_model(model_path, device):
    model = TBModel().to(device)
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.eval()
    return model

# Preprocess the input image
def preprocess_image(image_path, transform):
    image = Image.open(image_path).convert('L')  # Convert to grayscale
    if transform:
        image = transform(image)
    return image.unsqueeze(0)  # Add batch dimension

# Predict whether the image is normal or TB affected
def predict(image_path, model, transform, device):
    image = preprocess_image(image_path, transform).to(device)
    with torch.no_grad():
        output = model(image)
        probability = output.item()
        prediction = "TB affected" if probability > 0.5 else "Normal"
        return prediction, probability

# Define transformations (same as used during training)
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5], std=[0.5]),  # Normalization for grayscale
])

# Device configuration
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Load the trained model
model_path = '.venv/tuberculosis_diagnosis_model.pth'  # Path to your trained model
model = load_model(model_path, device)

# Test the model with a new image
image_path = 'D:/pro/.venv/TB_Chest_Radiography_Database/Normal/test.jpeg'  # Path to the image you want to classify
prediction, probability = predict(image_path, model, transform, device)

print(f"Prediction: {prediction}")
print(f"Probability: {probability:.4f}")
