import sys
import json
import torch
from PIL import Image
import torchvision.transforms as transforms
from torchvision import models
import torch.nn as nn

class TBModel(nn.Module):
    def __init__(self):
        super(TBModel, self).__init__()
        self.model = models.resnet18(pretrained=True)
        num_ftrs = self.model.fc.in_features
        self.model.conv1 = nn.Conv2d(1, 64, kernel_size=(7, 7), stride=(2, 2), padding=(3, 3), bias=False)
        self.model.fc = nn.Sequential(
            nn.Linear(num_ftrs, 512),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(512, 1),
            nn.Sigmoid()
        )

    def forward(self, x):
        return self.model(x)

def load_model(model_path):
    model = TBModel()
    model.load_state_dict(torch.load(model_path))
    model.eval()
    return model

def preprocess_image(image_path):
    image = Image.open(image_path).convert('L')
    transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.5], std=[0.5]),
    ])
    return transform(image).unsqueeze(0)

def predict(image_path, model):
    image = preprocess_image(image_path)
    with torch.no_grad():
        output = model(image)
        probability = output.item()
        prediction = "TB affected" if probability > 0.5 else "Normal"
        return prediction, probability

if __name__ == "__main__":
    try:
        model_path = 'path_to_your_model.pth'  # Update this to your model path
        model = load_model(model_path)

        image_path = sys.argv[1]
        prediction, probability = predict(image_path, model)

        result = {
            'prediction': prediction,
            'probability': probability
        }

        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({'error': str(e)}))
        sys.exit(1)
