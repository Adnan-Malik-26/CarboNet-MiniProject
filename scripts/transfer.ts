import { ethers } from "hardhat";

async function main() {
  const contractAddress = "0x6489f01D94CB0068cd86F1bE84A9278Df099c3e9";
  const recipient = "0x34aC1D4FA2CFF01E82E8639115b421b5cbb194E6"; // Replace with MetaMask address
  const amount = ethers.parseUnits("100", 18); // 100 tokens (with 18 decimals)

  const [deployer] = await ethers.getSigners();
  console.log(`Using deployer: ${deployer.address}`);

  // Load the contract
  const CarbonCreditToken = await ethers.getContractAt("CarbonCreditToken", contractAddress, deployer);

  // Mint tokens to the recipient
  const tx = await CarbonCreditToken.mint(recipient, amount);
  console.log(`Minting 100 CO2 tokens to ${recipient}...`);

  await tx.wait();
  console.log(`✅ Minted successfully! TX Hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
