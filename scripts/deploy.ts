import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  // Deploy CarbonCreditToken
  const CarbonCreditToken = await ethers.getContractFactory("CarbonCreditToken");
  const carbonCreditToken = await CarbonCreditToken.deploy("0x34aC1D4FA2CFF01E82E8639115b421b5cbb194E6");
  console.log("CarbonCreditToken deployed at:", await carbonCreditToken.getAddress());

  // Deploy RewardToken
  const RewardToken = await ethers.getContractFactory("RewardToken");
  const rewardToken = await RewardToken.deploy("0x34aC1D4FA2CFF01E82E8639115b421b5cbb194E6");
  console.log("RewardToken deployed at:", await rewardToken.getAddress());

  // Deploy CarbonMarketplace
  const CarbonMarketplace = await ethers.getContractFactory("CarbonMarketplace");
  const carbonMarketplace = await CarbonMarketplace.deploy(await carbonCreditToken.getAddress());
  console.log("CarbonMarketplace deployed at:", await carbonMarketplace.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
