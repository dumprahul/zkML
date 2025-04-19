# export_onnx.py
import torch
from carbon_model import CarbonRegressor
import numpy as np

model = CarbonRegressor()
model.load_state_dict(torch.load("carbon_model.pt"))
model.eval()

# Example input
dummy_input = torch.randn(1, 5)  # shape: [batch_size, features]

torch.onnx.export(
    model,
    dummy_input,
    "network.onnx",
    input_names=["input"],
    output_names=["output"],
    dynamic_axes={"input": {0: "batch_size"}, "output": {0: "batch_size"}},
    opset_version=11
)
