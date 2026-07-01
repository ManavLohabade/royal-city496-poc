import fs from "fs";
import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  console.log("Starting pure Node.js deployment (bypassing Hardhat plugins)...");

  const rpcUrl = process.env.SEPOLIA_RPC_URL;
  const privateKey = process.env.PRIVATE_KEY;

  if (!rpcUrl || !privateKey) {
    throw new Error("Missing SEPOLIA_RPC_URL or PRIVATE_KEY in .env");
  }

  // 1. Setup Provider and Wallet using pure ethers v5
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  console.log("Connected to wallet:", wallet.address);
  const balance = await wallet.getBalance();
  console.log("Wallet Balance:", ethers.utils.formatEther(balance), "ETH");

  if (balance.eq(0)) {
    throw new Error("\n❌ INSUFFICIENT FUNDS: Your wallet has 0 Sepolia ETH. You need ETH to pay for gas to deploy the contract. Get some from a faucet (e.g. alchemy.com/faucets/ethereum-sepolia)!\n");
  }

  // 2. Read the compiled artifact directly from the file system
  const artifactPath = "./artifacts/contracts/Investment.sol/Investment.json";
  
  if (!fs.existsSync(artifactPath)) {
      throw new Error("Artifact not found! Please run 'npx hardhat compile' first.");
  }

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

  // 3. Deploy using ContractFactory
  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
  console.log("Sending deployment transaction...");
  
  try {
    const contract = await factory.deploy();
    await contract.deployed();
    console.log(`\n✅ SUCCESS! Investment contract deployed to: ${contract.address}\n`);
  } catch (err) {
    console.error("\n❌ DEPLOYMENT FAILED during transaction broadcast. This is usually due to network issues or insufficient gas.");
    console.error("Exact Error:", err.reason || err.message);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Deployment failed:");
  console.error(error);
  process.exitCode = 1;
});
