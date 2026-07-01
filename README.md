# RoyalCity

## What is RoyalCity?

RoyalCity is a modern real estate investment platform that combines traditional property investing with cryptocurrency payments. Built with React (Vite) and Tailwind CSS, it mirrors the functionality of top real estate investment platforms while adding blockchain-based transaction capabilities through Ethereum Smart Contracts.

<img src="./public/royalcity00.png" alt="Royal City" style="width:100%; height:auto;" />

## Getting Started

### 1. Prerequisites
- Node.js (v18 or v22+)
- MetaMask Browser Extension

### 2. Install Dependencies
```bash
npm install
```

### 3. Running the Project Locally
Start the Vite development server:
```bash
npm run dev
```

---

## ⛓️ Smart Contract & Web3 Integration (Technical Assessment)

This project includes a fully functional **Investment Smart Contract** integrated into the frontend as part of the Blockchain Technical Assessment.

### Deployed Contract Details

- **Network**: Sepolia Testnet
- **Contract Address**: `0xd59C63D93cBADF62A8617E09153B337F75BCFd9b`

### Contract ABI

```json
[
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "investor", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "name": "InvestmentMade",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "uint256", "name": "totalAmount", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "name": "ReturnsDistributed",
    "type": "event"
  },
  { "inputs": [], "name": "distributeReturns", "outputs": [], "stateMutability": "payable", "type": "function" },
  { "inputs": [], "name": "getInvestorCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "getTotalInvested", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "invest", "outputs": [], "stateMutability": "payable", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "investorAddresses", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "investors", "outputs": [{ "internalType": "uint256", "name": "amountInvested", "type": "uint256" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "totalInvested", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }
]
```

### Demo Video
- **Loom Video**: [Loom demo link](https://www.loom.com/share/YOUR-LOOM-LINK)

---

## Smart Contract Setup (For Developers)

### 1. Environment Setup
Create a `.env` file (copy from `.env.example`):
```env
SEPOLIA_RPC_URL="https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY"
PRIVATE_KEY="your_private_key"
```

### 2. Compile & Deploy
```bash
npx hardhat compile
node scripts/deploy.js
```

### 3. Frontend
Update the contract address in `src/pages/PropertyDetail.jsx` after deployment.

---

## Key Features

- Cryptocurrency-enabled property investments via MetaMask & Ethers.js
- Interactive 3D property visualization with Three.js
- Smart contract integration for secure investments

## Tech Stack

- React (Vite) + Tailwind CSS
- Ethers.js v5
- Solidity 0.8.19
- Hardhat (for compilation)
