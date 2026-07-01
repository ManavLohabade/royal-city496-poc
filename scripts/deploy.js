const hre = require("hardhat");

async function main() {
  console.log("Starting deployment...");

  const Investment = await hre.ethers.getContractFactory("Investment");
  const investment = await Investment.deploy();

  await investment.deployed();

  console.log(`Investment contract deployed to: ${investment.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
