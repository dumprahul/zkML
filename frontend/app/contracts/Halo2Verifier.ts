export const Halo2VerifierABI = [
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "proof",
        "type": "bytes"
      },
      {
        "internalType": "uint256[]",
        "name": "instances",
        "type": "uint256[]"
      }
    ],
    "name": "verifyProof",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

export const Halo2VerifierAddress = "0xBD8e1748BE54775d32Cbd2Cbe193F2FD6Cd017a4"; // Replace with actual deployed contract address 