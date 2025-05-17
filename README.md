# CarboNet 🌍

A blockchain-powered platform to **track**, **offset**, and **reward** eco-friendly actions in real-time using IoT integration and tokenized carbon credits.

## 🚀 Overview

CarboNet is a decentralized platform designed to help individuals and companies monitor their **carbon emissions** in real time, **offset** their environmental impact through a **carbon credit marketplace**, and receive **rewards** for sustainable practices.

## 🔧 Features

* **Real-Time Carbon Tracking**: Integrates with IoT sensors to track emissions.
* **Carbon Credit Marketplace**: Buy/sell verified carbon credits.
* **Gamification & Rewards**: Users earn tokens for reducing emissions.
* **Data Visualization Dashboard**: Interactive graphs and logs.

## 📊 Dashboard Widgets

1. **This Month's Emissions** – View total emissions and offset them.
2. **Carbon Credits** – Track and buy/sell credits.
3. **Emission Sources** – Visualize sources with a pie chart.
4. **Emissions Over Time** – Line graph showing trends.
5. **Tokens** – Manage and view token rewards.
6. **Recent Activity** – Log of all key user actions.
7. **Rewards** – Total eco-points or tokens earned.

## 🛠️ Tech Stack

* **Frontend**: Html, CSS, JS
* **Backend**: Node.js
* **Blockchain**: Solidity, Hardhat, Ethereum (or BNB Testnet)
* **IoT Integration**: Simulated
* **Others**: Chart.js, Ethers.js

## 📁 Project Structure

```
CarboNet-MiniProject/
├── contracts/            # Solidity smart contracts
├── frontend/             # React frontend app
├── scripts/              # Deployment and interaction scripts
├── test/                 # Contract tests using TypeScript + Chai
├── hardhat.config.js     # Hardhat configuration
└── README.md             # Project documentation
```

## 🔒 Smart Contracts

* **CarbonCredit.sol** – Manages carbon credit minting and transfers.
* **CarboNetRewards.sol** – Issues reward tokens for eco-friendly actions.
* **Marketplace.sol** – Buy/sell carbon credits.

## 🧪 Testing

Run tests using Hardhat:

```bash
npx hardhat test
```

## 🧑‍💻 Running Locally

```bash
# Install dependencies
npm install

# Compile contracts
npx hardhat compile

# Deploy contracts (local network)
npx hardhat run scripts/deploy.js --network localhost

# Start the frontend (inside /frontend)
cd frontend
npm install
npm run dev
```

## 🌐 Deployment

Deployed on: `BNB Testnet`

## Contributors

## 📝 License

MIT License

---

> Developed as a mini project by Adnan Malik, Riya Warikoo & Lakshiyta Bhatti @ Model Institute of Engineering and Technology, Jammu
