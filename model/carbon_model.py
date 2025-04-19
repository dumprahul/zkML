# carbon_model.py
import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Sample synthetic dataset
# Features: [electricity_kWh, fuel_liters, travel_km, water_usage_liters, solar_percent]
X = np.array([
    [200, 10, 50, 300, 20],
    [400, 25, 100, 500, 5],
    [150, 5, 40, 200, 60],
    [250, 12, 80, 400, 30],
    [300, 20, 60, 450, 10],
    [100, 3, 30, 150, 70],
    [220, 15, 90, 350, 25],
    [180, 8, 70, 270, 40],
])

# Labels: [carbon_score_kg]
y = np.array([
    [120],
    [220],
    [90],
    [160],
    [180],
    [60],
    [150],
    [110]
])

# Preprocess
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Torch tensors
X_train = torch.FloatTensor(X_train)
y_train = torch.FloatTensor(y_train)
X_test = torch.FloatTensor(X_test)
y_test = torch.FloatTensor(y_test)

# Define model
class CarbonRegressor(nn.Module):
    def __init__(self):
        super(CarbonRegressor, self).__init__()
        self.fc1 = nn.Linear(5, 8)
        self.fc2 = nn.Linear(8, 4)
        self.fc3 = nn.Linear(4, 1)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        return self.fc3(x)

model = CarbonRegressor()
criterion = nn.MSELoss()
optimizer = optim.Adam(model.parameters(), lr=0.01)

# Train
for epoch in range(300):
    model.train()
    optimizer.zero_grad()
    outputs = model(X_train)
    loss = criterion(outputs, y_train)
    loss.backward()
    optimizer.step()

    if (epoch + 1) % 50 == 0:
        print(f'Epoch {epoch+1}, Loss: {loss.item():.4f}')

# Save model and scaler
torch.save(model.state_dict(), "carbon_model.pt")
np.save("scaler_mean.npy", scaler.mean_)
np.save("scaler_scale.npy", scaler.scale_)
