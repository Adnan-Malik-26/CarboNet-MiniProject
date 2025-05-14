const { ethers } = require("ethers");
const abi = require("../abi/CarbonMarketplace.json");

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_API_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.MARKETPLACE_ADDRESS, abi, wallet);

module.exports = contract;
