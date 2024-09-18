import os
from PIL import Image
from torch.utils.data import Dataset, DataLoader, random_split
import torchvision.transforms as transforms
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import models
import numpy as np

class CombinedLungsDataset(Dataset):
    def __init__(self, normal_dir, tb_dir, transform=None):
        self.transform = transform
        self.image_paths = []
        self.labels = []

        # Load normal lung images
        for fname in os.listdir(normal_dir):
            self.image_paths.append(os.path.join(normal_dir, fname))
            self.labels.append(0)  # Label 0 for normal lungs
        print(f"Loaded {len(self.image_paths)} images:")
        print(f"  - {self.labels.count(0)} normal lung images")

        # Load TB-affected lung images
        for fname in os.listdir(tb_dir):
            self.image_paths.append(os.path.join(tb_dir, fname))
            self.labels.append(1)  # Label 1 for TB-affected lungs
        print(f"  - {self.labels.count(1)} TB-affected lung images")

    def __len__(self):
        return len(self.image_paths)

    def __getitem__(self, idx):
        img_path = self.image_paths[idx]
        image = Image.open(img_path).convert('L')  # Ensure all images are converted to grayscale
        label = self.labels[idx]
        if self.transform:
            image = self.transform(image)
        return image, label

# Define transformations
transform = transforms.Compose([
    transforms.RandomHorizontalFlip(),
    transforms.RandomVerticalFlip(),
    transforms.RandomRotation(30),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5], std=[0.5]),  # Normalization for grayscale
])

# Data directories
normal_dir = 'D:/machine learning/Tuberculosis/TB_Chest_Radiography_Database/Normal'
tb_dir = 'D:/machine learning/Tuberculosis/TB_Chest_Radiography_Database/Tuberculosis'

# Create dataset
print("Creating dataset...")
full_dataset = CombinedLungsDataset(normal_dir=normal_dir, tb_dir=tb_dir, transform=transform)
print("Dataset created.")

# Split dataset into training, validation, and testing
total_size = len(full_dataset)
train_size = int(0.7 * total_size)  # 70% for training
val_size = int(0.15 * total_size)   # 15% for validation
test_size = total_size - train_size - val_size  # Remaining 15% for testing

train_dataset, val_dataset, test_dataset = random_split(full_dataset, [train_size, val_size, test_size])

print(f"Dataset split into:")
print(f"  - Training set: {train_size} images")
print(f"  - Validation set: {val_size} images")
print(f"  - Test set: {test_size} images")

train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=32, shuffle=False)
test_loader = DataLoader(test_dataset, batch_size=32, shuffle=False)

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

# Check for GPU availability
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"Using device: {device}")

model = TBModel().to(device)
criterion = nn.BCELoss()
optimizer = optim.Adam(model.parameters(), lr=1e-4)

num_epochs = 20

for epoch in range(num_epochs):
    model.train()
    running_loss = 0.0
    for batch_idx, (images, labels) in enumerate(train_loader):
        images = images.to(device)
        labels = labels.float().unsqueeze(1).to(device)
        
        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        
        running_loss += loss.item() * images.size(0)
        
        if batch_idx % 10 == 9:  # Print every 10 batches
            print(f'Epoch [{epoch + 1}/{num_epochs}], Batch [{batch_idx + 1}/{len(train_loader)}], Loss: {running_loss / ((batch_idx + 1) * 32):.4f}')
    
    epoch_loss = running_loss / len(train_loader.dataset)
    print(f'Epoch {epoch + 1}/{num_epochs}, Loss: {epoch_loss:.4f}')
    
    # Validation
    model.eval()
    val_corrects = 0
    val_total = 0
    with torch.no_grad():
        for images, labels in val_loader:
            images = images.to(device)
            labels = labels.to(device)
            outputs = model(images)
            predicted = (outputs > 0.5).float()
            val_corrects += (predicted.squeeze() == labels).sum().item()
            val_total += labels.size(0)
    
    val_accuracy = val_corrects / val_total
    print(f'Validation Accuracy: {val_accuracy:.4f}')
    
    # Test
    corrects = 0
    total = 0
    all_probabilities = []
    with torch.no_grad():
        for images, labels in test_loader:
            images = images.to(device)
            labels = labels.to(device)
            outputs = model(images)
            probabilities = outputs.cpu().numpy()  # Get probabilities
            all_probabilities.extend(probabilities)
            
            predicted = (outputs > 0.5).float()
            corrects += (predicted.squeeze() == labels).sum().item()
            total += labels.size(0)
    
    test_accuracy = corrects / total
    print(f'Test Accuracy: {test_accuracy:.4f}')

    # Save probabilities to a file
    np.savetxt('predicted_probabilities.txt', all_probabilities)
    print("Probabilities saved to 'predicted_probabilities.txt'.")

# Save the model
torch.save(model.state_dict(), 'tuberculosis_diagnosis_model.pth')
print("Model saved to 'tuberculosis_diagnosis_model.pth'.")
